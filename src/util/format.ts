/** Korean won formatter: 480170000 -> "4억 8,017만" */
export const koWon = (won: number): string => {
  const eok = Math.floor(won / 100_000_000);
  const man = Math.floor((won % 100_000_000) / 10_000);
  if (eok <= 0) return `${man.toLocaleString("ko-KR")}만`;
  if (man <= 0) return `${eok}억`;
  return `${eok}억 ${man.toLocaleString("ko-KR")}만`;
};

/** 970000 -> "97만", 12000 -> "1만 2,000" */
export const koCount = (n: number): string => {
  const man = Math.floor(n / 10_000);
  const rest = n % 10_000;
  if (man <= 0) return n.toLocaleString("ko-KR");
  if (rest === 0) return `${man.toLocaleString("ko-KR")}만`;
  return `${man.toLocaleString("ko-KR")}만 ${rest.toLocaleString("ko-KR")}`;
};

export const pct = (n: number): string => `${n.toLocaleString("ko-KR")}%`;
