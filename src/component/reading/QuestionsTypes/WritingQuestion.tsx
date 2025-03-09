import { Controller, useFormContext } from "react-hook-form";
import { WritingQuestion as WritingQuestionType } from "../../../api/services/exams.services";

type WritingQuestionProps = {
  question: WritingQuestionType;
  index: number;
};

export default function WritingQuestion({
  question,
  index,
}: WritingQuestionProps) {
  const { control } = useFormContext();

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
      <p className="text-gray-600 mb-3">{question.ContentQuestion}</p>

      {/* Text Area for Answer */}
      <Controller
        name={question.Id}
        control={control}
        render={({ field }) => (
          <textarea
            {...field}
            rows={5}
            className="w-full h-40 resize-none p-3 border rounded-xl shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500"
            placeholder="Type your answer here..."
          />
        )}
      />
    </div>
  );
}
