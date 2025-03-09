import { Controller, useFormContext } from "react-hook-form";
import { MCQQuestion } from "../../../api/services/exams.services";

type MultipleChoiceQuestionProps = {
  question: MCQQuestion;
  index: number;
};

export default function MultipleChoiceQuestion({
  question,
  index,
}: MultipleChoiceQuestionProps) {
  const { control } = useFormContext();

  return (
    <div>
      {/* Question Header */}
      <h2 className="text-lg font-bold flex items-center mb-3">
        <span className="bg-black text-white rounded-full w-6 h-6 flex items-center justify-center text-sm mr-2">
          {index}
        </span>
        Choose the correct answer
      </h2>

      {/* Question Box */}
      <div className="p-4 border rounded-xl shadow-sm">
        <p className="mt-2 text-gray-600">{question.ContentQuestion.trim()}</p>

        {/* Multiple Choice Options */}
        <Controller
          name={question.Id}
          control={control}
          render={({ field }) => (
            <div className="mt-3 space-y-2">
              {question.Answers.map((answer) => (
                <label
                  key={answer.Id}
                  className="flex items-center space-x-2 cursor-pointer"
                >
                  <input
                    type="radio"
                    {...field}
                    value={answer.Id}
                    checked={field.value === answer.Id}
                    className="hidden peer"
                  />
                  <span className="w-4 h-4 border border-gray-400 rounded-full peer-checked:bg-blue-500"></span>
                  <span className="text-gray-700 font-medium">
                    {answer.Answer}
                  </span>
                </label>
              ))}
            </div>
          )}
        />
      </div>
    </div>
  );
}
