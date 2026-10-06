/** A run of text that either matches the query (`hit`) or doesn't. */
export interface Segment {
  text: string;
  hit: boolean;
}

/**
 * Lower-cases and strips diacritics character by character, so the result has
 * the same length as the input and indices map 1:1 ("Handläggning" → "handlaggning").
 */
export function fold(s: string): string {
  let out = "";
  for (const ch of s) {
    out += (ch.normalize("NFD")[0] ?? ch).toLowerCase();
  }
  return out;
}

export function tokenize(query: string): string[] {
  return fold(query).split(/\s+/).filter(Boolean);
}

/**
 * Every word must occur in the title or the text. Title hits weigh more,
 * and a title that starts with the word weighs most. Returns null on no match.
 */
export function score(title: string, text: string, words: string[]): number | null {
  if (words.length === 0) return null;
  const ft = fold(title);
  const fd = fold(text);
  let total = 0;
  for (const w of words) {
    const inTitle = ft.indexOf(w);
    if (inTitle === 0) total += 6;
    else if (inTitle > 0) total += 4;
    else if (fd.includes(w)) total += 1;
    else return null;
  }
  return total;
}

/**
 * Splits `s` into hit / non-hit segments. With `max`, cuts a window of that
 * length around the first hit and marks the cut ends with "…".
 */
export function highlight(s: string, words: string[], max?: number): Segment[] {
  const chars = Array.from(s);
  const folded = Array.from(fold(s));
  let start = 0;
  let end = chars.length;

  if (max !== undefined && chars.length > max) {
    const f = folded.join("");
    const firsts = words.map((w) => f.indexOf(w)).filter((i) => i > -1);
    const first = firsts.length ? Math.min(...firsts) : 0;
    start = Math.max(0, Math.min(first - 30, chars.length - max));
    end = start + max;
  }

  const win = chars.slice(start, end);
  const fwin = folded.slice(start, end).join("");
  const on = new Array<boolean>(win.length).fill(false);
  for (const w of words) {
    let i = fwin.indexOf(w);
    while (i > -1) {
      for (let k = i; k < i + w.length; k++) on[k] = true;
      i = fwin.indexOf(w, i + w.length);
    }
  }

  const segments: Segment[] = [];
  win.forEach((ch, i) => {
    const hit = on[i] ?? false;
    const last = segments[segments.length - 1];
    if (last && last.hit === hit) last.text += ch;
    else segments.push({ text: ch, hit });
  });
  if (start > 0) segments.unshift({ text: "… ", hit: false });
  if (end < chars.length) segments.push({ text: " …", hit: false });
  return segments;
}
