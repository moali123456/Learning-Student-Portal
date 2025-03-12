import { useFormContext } from "react-hook-form";
import { WritingQuestion as WritingQuestionType } from "../../../api/services/exams.services";
import FormController from "./FormController";

type WritingQuestionProps = {
  question: WritingQuestionType;
  index: number;
};

export default function WritingQuestion({
  question,
  index,
}: WritingQuestionProps) {
  return (
    <div>
      {/* Question Header */}
      <h2 className="text-lg font-bold flex items-center mb-3">
        <span className="bg-black text-white rounded-full w-6 h-6 flex items-center justify-center text-sm mr-2">
          {index}
        </span>
        Write Your Answer
      </h2>

      {/* Question Content */}
      <p className="font-medium mb-3">{question.ContentQuestion}</p>

      {/* Text Area for Answer */}
      <FormController
        name={question.Id}
        type="textarea"
        placeholder="Type your answer here..."
      />
    </div>
  );
}
