type Performance = {
  below: number;
  inline: number;
  above: number;
  total: number;
};

type GenderDistribution = {
  boys: {
    total: number;
    below: number;
    inline: number;
    above: number;
  };
  girls: {
    total: number;
    below: number;
    inline: number;
    above: number;
  };
};

type SpecialNeeds = {
  total: number;
  below: number;
  inline: number;
  above: number;
};

type TalentedStudents = {
  total: number;
  below: number;
  inline: number;
  above: number;
};

export type ExamResultType = {
  title: string;
  totalStudents: number;
  performance: Performance;
  reading: Performance;
  listening: Performance;
  writing: Performance;
  speaking: Performance;
  genderDistribution: GenderDistribution;
  specialNeeds: SpecialNeeds;
  talentedStudents: TalentedStudents;
};

export type ExamResultsResponse = {
  StatusCode: number;
  Message: string;
  Data: ExamResultType[];
};
export type FormData = {
  selectedYear: string;
  subject: string;
  grade: string;
  level: string;
  studentCode: string;
  reportType: string;
};
export type ChartDataParams = {
  title: string;
  total: number;
  inline: number;
  above: number;
  below: number;
};

export type Dataset = {
  label: string;
  data: number[];
  backgroundColor: string;
};

export type ChartData = {
  labels: string[];
  datasets: Dataset[];
};
export type DoughnutDataParams = {
  total: number;
  inline: number;
  above: number;
  below: number;
};

export type DoughnutDataset = {
  data: number[];
  backgroundColor: string[];
  borderWidth: number;
};

export type DoughnutData = {
  labels: string[];
  datasets: DoughnutDataset[];
};
