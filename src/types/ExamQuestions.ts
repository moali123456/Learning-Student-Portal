/* eslint-disable @typescript-eslint/no-explicit-any */
export interface Answer {
  Id: string;
  QuestionId: string;
  Answer: string;
}

export type MatchingAnswer = {
  Id: string;
  Answer: string;
};

export type MatchingQuestionItem = {
  Id: string;
  ContentQuestion: string;
};

interface BaseQuestion {
  Id: string;
  ContentQuestion: string;
  QuestionType: QuestionType;
  File?: string | null;
  Score: number;
  Answers: Answer[];
}

export enum QuestionType {
  MCQ = 1,
  Writing = 2,
  Matching = 3,
  DragDrop = 4,
  Complete = 5,
  TrueFalse = 6,
}

export interface MCQQuestion extends BaseQuestion {
  QuestionType: QuestionType.MCQ;
  Answers: Answer[];
}

export interface WritingQuestion extends BaseQuestion {
  QuestionType: QuestionType.Writing;
  Answers: []; // No predefined answers
}

export type MatchingQuestion = {
  Score: number;
  TitleAr: string;
  TitleEn: string;
  QuestionType: QuestionType.Matching;
  MatchingQuestion: MatchingQuestionItem[]; // The left side of the match
  Answers: MatchingAnswer[]; // The right side options
};

export interface DragDropQuestion extends BaseQuestion {
  QuestionType: QuestionType.DragDrop;
  Answers: Answer[];
}

export interface CompleteQuestion extends BaseQuestion {
  QuestionType: QuestionType.Complete;
  Answers: Answer[];
}

export interface TrueFalseQuestion extends BaseQuestion {
  QuestionType: QuestionType.TrueFalse;
  Answers: [];
}

// Union Type for All Questions
export type Question =
  | MCQQuestion
  | WritingQuestion
  | DragDropQuestion
  | CompleteQuestion
  | TrueFalseQuestion;

export type Topic = {
  Id: string;
  TitleAr: string;
  TitleEn: string;
  File?: any;
  TopicContent?: any;
};

export type ExamData = {
  Id: string;
  StudentModelExamId?: string | null;
  NameAr: string;
  NameEn: string;
  Piece?: string | null;
  Skill: number;
  SubjectId: string;
  SubjectName: string;
  GradeId: string;
  GradeName: string;
  LevelId?: string | null;
  LevelName?: string | null;
  CreatedOn: string;
  NumberOfMandatoryQuestions: number;
  TimerPerMinutes?: number | null;
  Topics: Topic[];
};

// Represents the full API response structure
export type ExamApiResponse = {
  StatusCode: number;
  Message: string;
  Data: ExamData;
};

export type QuestionResponse = {
  StatusCode: number;
  Message: string;
  Data: {
    GetQuestions: Question[];
    GetMatchingQuestions?: MatchingQuestion[];
  };
};

export type TopicWithQuestions = {
  topic: Topic;
  questions: (Question | MatchingQuestion)[];
};
