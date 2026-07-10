/**
 * All numbers and their sources live here, separated from the visuals.
 * Figures are the Seoul-metropolitan self-employed data set discussed in planning.
 */

export const SRC = {
  loan: "자료: 자영업자 대출 통계 (2024 2Q 기준)",
  count: "자료: 자영업자 수 통계 (2025)",
  delinquency: "자료: 자영업자 연체 통계",
  closure: "자료: 폐업 사업자 통계 (2025)",
} as const;

export const debt = {
  seoul: 480_170_000, // 4억 8,017만원
  gyeonggi: 368_870_000, // 3억 6,887만원
  incheon: 339_180_000, // 3억 3,918만원
  nationalAvg: 339_120_000, // 3억 3,912만원
} as const;

export const growth = {
  seoul: 8.3,
  incheon: 5.9,
  gyeonggi: 4.3,
  nationalAvg: 4.7,
} as const;

export const risk = {
  delinquencyRate: 1.6, // % — 4년 만에 최고
  overdueGrowth: 50, // % — 못 갚는 대출 1년 증가폭
} as const;

export const closure = {
  count: 970_000, // 97만 곳
  rate: 0.09, // 폐업률 ~9%
} as const;

export const solutions = ["빚 재조정", "포화 업종 피하기", "온라인 병행"] as const;

/** Region shorthand used by the map + bar-race scenes. */
export const regions = [
  {key: "seoul", label: "서울", debt: debt.seoul, growth: growth.seoul},
  {key: "gyeonggi", label: "경기", debt: debt.gyeonggi, growth: growth.gyeonggi},
  {key: "incheon", label: "인천", debt: debt.incheon, growth: growth.incheon},
] as const;
