import { z } from "zod";
import { MatchingQuestion, Question } from "../../api/services/exams.services";
import { TopicWithQuestions } from "../../types/ExamQuestions";
const Answer = z.object({
  Id: z.string().uuid(),
  QuestionId: z.string().uuid(),
  Answer: z.string().min(1),
});
const MatchingAnswer = z.object({
  Id: z.string().uuid(),
  Answer: z.string().min(1),
});
export const generateSchema = (Questions: TopicWithQuestions[]) => {
  const schemaObject: Record<string, z.ZodTypeAny> = {};
  const modifiedQuestions = Questions?.flatMap((item) => item.questions);

  modifiedQuestions?.map((question) => {
    if ("Id" in question) {
      switch (question.QuestionType) {
        case 1: // MCQ Question
          schemaObject[question.Id] = z.string().min(1, "MCQ Required");
          break;
        case 2: // Writing Question
          schemaObject[question.Id] = z.string().min(1, "writing Required");
          break;
        case 4: // Arrange Question
          schemaObject[question.Id] = z
            .array(Answer)
            .nonempty("drag all data ");
          break;
        case 5: // Complete Question
          schemaObject[question.Id] = z
            .array(Answer)
            .nonempty("complete all data ");
          break;
        case 6: // True false Question
          schemaObject[question.Id] = z.string();
          break;
        default:
          schemaObject[question.Id] = z.string().optional();
      }
    } else if (question.QuestionType == 3) {
      question.MatchingQuestion.map((matchQuestion) => {
        schemaObject[matchQuestion.Id] = MatchingAnswer;
      });
    }
  });

  return schemaObject;
};
export const generateDefaultValues = (
  questions: (Question | MatchingQuestion)[] | null
) => {
  const defaultValueObj: Record<string, null> = {};

  questions?.map((question) => {
    if ("Id" in question) {
      switch (question.QuestionType) {
        case 1: // MCQ Question
          defaultValueObj[question.Id] = null;
          break;
        case 2: // Writing Question
          defaultValueObj[question.Id] = null;
          break;
        case 4: // Arrange Question
          defaultValueObj[question.Id] = null;
          break;
        case 5: // Complete Question
          defaultValueObj[question.Id] = null;
          break;
        case 6: // True false Question
          defaultValueObj[question.Id] = null;
          break;
        default:
          defaultValueObj[question.Id] = null;
      }
    } else if (question.QuestionType == 3) {
      question.MatchingQuestion.map((matchQuestion) => {
        defaultValueObj[matchQuestion.Id] = null;
      });
    }
  });

  return defaultValueObj;
};
