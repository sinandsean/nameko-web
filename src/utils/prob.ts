import namesDataRaw from "../../public/names.json";

const PROBABILITY_BY_GRADE = {
  common: 0.9,
  uncommon: 0.1,
  rare: 0.01,
  unique: 0.001,
} as const;

type Grade = keyof typeof PROBABILITY_BY_GRADE;

interface NameInfo {
  ko: string;
  en: string;
  gender: "F" | "M";
  grade: Grade;
}

// JSON 데이터를 NameInfo 타입으로 캐스팅
const namesData = namesDataRaw as NameInfo[];

// 성별로 필터링하는 순수 함수
const filterByGender = (
  names: readonly NameInfo[],
  gender?: "F" | "M"
): readonly NameInfo[] =>
  gender ? names.filter((name) => name.gender === gender) : names;

// 등급별로 그룹화하는 순수 함수
const groupByGrade = (
  names: readonly NameInfo[]
): Record<Grade, readonly NameInfo[]> =>
  names.reduce(
    (acc, name) => ({
      ...acc,
      [name.grade]: [...acc[name.grade], name],
    }),
    { common: [], uncommon: [], rare: [], unique: [] } as Record<
      Grade,
      NameInfo[]
    >
  );

// 누적 확률로 등급을 선택하는 순수 함수
const selectGradeByProbability = (random: number): Grade => {
  const grades = Object.entries(PROBABILITY_BY_GRADE) as [Grade, number][];

  const selectedGrade = grades.reduce(
    (acc, [grade, probability]) => {
      const newCumulative = acc.cumulative + probability;
      if (acc.selected === null && random < newCumulative) {
        return { cumulative: newCumulative, selected: grade };
      }
      return { ...acc, cumulative: newCumulative };
    },
    { cumulative: 0, selected: null as Grade | null }
  );

  return selectedGrade.selected ?? "common";
};

// 배열에서 랜덤하게 선택하는 순수 함수
const selectRandom = <T>(items: readonly T[]): T =>
  items[Math.floor(Math.random() * items.length)];

// 메인 함수: 등급 확률에 따라 랜덤 이름 반환
export const getRandomNameByGrade = (gender?: "F" | "M"): NameInfo => {
  const filtered = filterByGender(namesData, gender);
  const grouped = groupByGrade(filtered);
  const selectedGrade = selectGradeByProbability(Math.random());
  const gradeNames = grouped[selectedGrade];

  // 해당 등급에 이름이 없으면 common 등급에서 선택
  const finalNames = gradeNames.length > 0 ? gradeNames : grouped.common;

  return selectRandom(finalNames);
};
