#!/usr/bin/env python3
"""Compare the guide against GitHub: the rimfrost-* repo list and what changed in the
umbrella repo `rimfrost` since the last check. Read-only; prints a Markdown report.

Uses the public GitHub API. Set GITHUB_TOKEN (or be logged in with `gh`) to avoid the
60 requests/hour limit for anonymous calls.
"""
import json
import os
import re
import subprocess
import sys
from pathlib import Path

ORG = "Forsakringskassan"
UMBRELLA = "rimfrost"
ROOT = Path(__file__).resolve().parents[3]
REPOS_TS = ROOT / "src/data/repos.ts"
HERO = ROOT / "src/sections/HeroSection.vue"
STATE = Path(__file__).with_name("state.json")
# Public repos deliberately left out of the repo map. The umbrella repo is described in the prose.
EXCLUDED = {
    UMBRELLA,
    "rimfrost-regel-beraknaersattning",  # untouched stub, not part of any flow (2026-10-06)
}


def token() -> str | None:
    if os.environ.get("GITHUB_TOKEN"):
        return os.environ["GITHUB_TOKEN"]
    try:
        out = subprocess.run(["gh", "auth", "token"], capture_output=True, text=True, encoding="utf-8", timeout=10)
        return out.stdout.strip() or None
    except (OSError, subprocess.TimeoutExpired):
        return None


TOKEN = token()


def api(path: str):
    """GET via curl, which uses the system's certificates (python.org builds often lack them)."""
    global TOKEN
    cmd = ["curl", "-sSL", "-w", "\n%{http_code}", "-H", "Accept: application/vnd.github+json"]
    if TOKEN:
        cmd += ["-H", f"Authorization: Bearer {TOKEN}"]
    out = subprocess.run(cmd + [f"https://api.github.com{path}"], capture_output=True, text=True, encoding="utf-8", timeout=60)
    if out.returncode != 0:
        sys.exit(f"curl misslyckades: {out.stderr.strip()}")
    body, _, code = out.stdout.rpartition("\n")
    if code == "401" and TOKEN:
        # A stale `gh` token is worse than none: fall back to anonymous calls.
        print("> Obs: GitHub-token ogiltig, fortsätter utan (max 60 anrop/timme).\n", file=sys.stderr)
        TOKEN = None
        return api(path)
    if code == "403":
        sys.exit("GitHub svarade 403, troligen rate limit. Sätt GITHUB_TOKEN eller vänta en timme.")
    if code == "404":
        return None
    if code != "200":
        sys.exit(f"GitHub svarade {code} för {path}")
    return json.loads(body)


def org_repos() -> list[dict]:
    repos, page = [], 1
    while True:
        batch = api(f"/orgs/{ORG}/repos?per_page=100&page={page}&type=public")
        if not batch:
            return repos
        repos += batch
        page += 1


def git(repo: str, *args: str) -> str:
    return subprocess.run(["git", "-C", repo, *args], capture_output=True, text=True, encoding="utf-8", check=True).stdout.strip()


def umbrella_clone() -> str:
    """A cached, blob-less bare clone of the umbrella repo; fetched on every run."""
    cache = Path.home() / ".cache/rimfrost-guide" / f"{UMBRELLA}.git"
    url = f"https://github.com/{ORG}/{UMBRELLA}.git"
    if not cache.exists():
        cache.parent.mkdir(parents=True, exist_ok=True)
        subprocess.run(["git", "clone", "-q", "--bare", "--filter=blob:none", url, str(cache)], check=True)
    else:
        subprocess.run(["git", "-C", str(cache), "fetch", "-q", "origin", "+main:main"], check=True)
    return str(cache)


def main() -> None:
    # The report is Swedish; don't depend on the console's code page (e.g. cp1252 on Windows).
    sys.stdout.reconfigure(encoding="utf-8")
    gh = {r["name"]: r for r in org_repos() if r["name"].startswith("rimfrost")}
    active = {n for n, r in gh.items() if not r["archived"]}
    archived = {n for n, r in gh.items() if r["archived"]}
    guide = {f"rimfrost-{n}" for n in re.findall(r'name: "([^"]+)"', REPOS_TS.read_text(encoding="utf-8"))}
    active_mapped = active - EXCLUDED

    print(f"# Guidekontroll\n\nPublika rimfrost-repon på GitHub: **{len(active)} aktiva**, {len(archived)} arkiverade.")
    print(f"Repo-kartan har {len(guide)} repon.\n")

    hero = re.search(r"<b>(\d+)</b>repon", HERO.read_text(encoding="utf-8"))
    if hero:
        print(f"Inledningen säger **{hero.group(1)} repon**. Aktiva i repo-kartan efter en uppdatering: {len(active_mapped)}.\n")

    print("## Saknas i repo-kartan (aktiva på GitHub)\n")
    print("\n".join(f"- {n}" for n in sorted(active_mapped - guide)) or "Inga.")

    print("\n## Arkiverade på GitHub men kvar i repo-kartan\n")
    print("\n".join(f"- {n}" for n in sorted(guide & archived)) or "Inga.")

    print("\n## I repo-kartan men inte bland publika repon\n")
    missing = sorted(guide - active - archived)
    if not missing:
        print("Inga.")
    for n in missing:
        # GitHub redirects renamed repos, so this reveals the new name.
        r = api(f"/repos/{ORG}/{n}")
        if r is None:
            print(f"- {n}: finns inte publikt (privat eller borttaget)")
        else:
            print(f"- {n}: heter nu **{r['name']}**{' (arkiverat)' if r['archived'] else ''}")

    print(f"\n## Ändringar i `{UMBRELLA}` sedan förra kontrollen\n")
    state = json.loads(STATE.read_text(encoding="utf-8")) if STATE.exists() else {}
    last = state.get("rimfrost_sha")
    # Plain git instead of the API: no rate limit, and full diffs for the reader.
    clone = umbrella_clone()
    head = git(clone, "rev-parse", "main")
    if not last:
        print(f"Ingen tidigare kontroll. Nuvarande main: `{head[:7]}`.")
    elif last == head:
        print(f"Inget nytt sedan `{last[:7]}` ({state.get('checked', '?')}).")
    elif subprocess.run(["git", "-C", clone, "cat-file", "-e", f"{last}^{{commit}}"], capture_output=True).returncode:
        sys.exit(f"`{last[:7]}` från state.json finns inte på main. Rätta state.json.")
    else:
        print(f"`{last[:7]}` → `{head[:7]}`:\n")
        print(git(clone, "log", "--no-merges", "--format=- `%h` %s (%as)", f"{last}..main"))
        print("\nÄndrade filer:\n")
        print(git(clone, "diff", "--stat=120", f"{last}..main"))
        print(f"\nSe en fil: `git -C {clone} diff {last[:7]}..main -- <fil>`")
    print(f"\n<!-- head={head} -->")

if __name__ == "__main__":
    main()
