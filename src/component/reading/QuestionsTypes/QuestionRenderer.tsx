import {
  MatchingQuestion as MatchingQuestionType,
  Question,
} from "../../../api/services/exams.services";
import ArrangeQuestion from "./ArrangeQuestion";
import CompleteQuestion from "./CompleteQuestion";
import MatchingQuestion from "./MatchingQuestion";
import MultipleChoiceQuestion from "./MultipleChoiceQuestion";
import TrueFalseQuestion from "./TrueFalseQuestion";
import WritingQuestion from "./WritingQuestion";
type QuestionRendererProps = {
  question: Question | MatchingQuestionType;

  index: number;
};
export default function QuestionRenderer({
  question,
  index,
}: QuestionRendererProps) {
  return (
    <div>
      {question?.QuestionType === 1 && (
        <MultipleChoiceQuestion question={question} index={index} />
      )}
      {question?.QuestionType === 2 && (
        <WritingQuestion question={question} index={index} />
      )}
      {question?.QuestionType === 3 && (
        <MatchingQuestion question={question} index={index} />
      )}
      {question?.QuestionType === 4 && (
        <ArrangeQuestion question={question} index={index} />
      )}
      {question?.QuestionType === 5 && (
        <CompleteQuestion question={question} index={index} />
      )}
      {question?.QuestionType === 6 && (
        <TrueFalseQuestion question={question} index={index} />
      )}
    </div>
  );
}
