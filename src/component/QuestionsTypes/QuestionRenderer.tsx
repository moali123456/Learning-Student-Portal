import {
  MatchingQuestion as MatchingQuestionType,
  Question
} from "../../api/services/exams.services";
import { QuestionAnswer } from "../reading/ReadingExam";
import ArrangeQuestion from "./ArrangeQuestion";
import CompleteQuestion from "./CompleteQuestion";
import MatchingQuestion from "./MatchingQuestion";
import MultipleChoiceQuestion from "./MultipleChoiceQuestion";
import TrueFalseQuestion from "./TrueFalseQuestion";
import WritingQuestion from "./WritingQuestion";

type QuestionRendererProps = {
  question: Question | MatchingQuestionType;
  SubmitQuestionAnswer: (QuestionAnswer: QuestionAnswer) => void;
  index: number;
};
export default function QuestionRenderer({
  question,
  SubmitQuestionAnswer,
  index,
}: QuestionRendererProps) {
  return (
    <div>
      {question?.QuestionType === 1 && (
        <MultipleChoiceQuestion
          SubmitQuestionAnswer={SubmitQuestionAnswer}
          question={question}
          index={index}
        />
      )}
      {question?.QuestionType === 2 && (
        <WritingQuestion
          SubmitQuestionAnswer={SubmitQuestionAnswer}
          question={question}
          index={index}
        />
      )}
      {question?.QuestionType === 3 && (
        <MatchingQuestion
          SubmitQuestionAnswer={SubmitQuestionAnswer}
          question={question}
          index={index}
        />
      )}
      {question?.QuestionType === 4 && (
        <ArrangeQuestion
          SubmitQuestionAnswer={SubmitQuestionAnswer}
          question={question}
          index={index}
        />
      )}
      {question?.QuestionType === 5 && (
        <CompleteQuestion
          SubmitQuestionAnswer={SubmitQuestionAnswer}
          question={question}
          index={index}
        />
      )}
      {question?.QuestionType === 6 && (
        <TrueFalseQuestion
          SubmitQuestionAnswer={SubmitQuestionAnswer}
          question={question}
          index={index}
        />
      )}
    </div>
  );
}
