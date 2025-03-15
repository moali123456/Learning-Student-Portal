import { useFormContext } from "react-hook-form";
import { MCQQuestion } from "../../api/services/exams.services";
import FormController from "../FormController/FormController";
import { useCallback, useEffect, useState } from "react";
import { useDebounce } from "../../hooks/useDebounce";
import { QuestionAnswer } from "../reading/ReadingExam";

type MultipleChoiceQuestionProps = {
  question: MCQQuestion;
  SubmitQuestionAnswer: (QuestionAnswer: QuestionAnswer) => void;
  index: number;
};

export default function MultipleChoiceQuestion({
  question,
  SubmitQuestionAnswer,
  index,
}: MultipleChoiceQuestionProps) {
  const { getFieldState } = useFormContext();
  const isError = getFieldState(question?.Id)?.error;

  const [inputValue, setInputValue] = useState<"true" | "false" | "">("");
  const debouncedValue = useDebounce(inputValue, 500);
  const handleChange = useCallback(
    (e: React.ChangeEvent<HTMLTextAreaElement>) => {
      setInputValue(e.target.value as "true" | "false");
    },
    []
  );

  useEffect(() => {
    if (debouncedValue) {
      SubmitQuestionAnswer({
        QuestionType: 1,
        questionId: question.Id,
        answer: debouncedValue,
      });
    }
  }, [debouncedValue, question.Id, SubmitQuestionAnswer]);
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
      <div
        className={`p-4 border  rounded-xl shadow-sm ${
          isError && "border-red-500"
        }`}
      >
        <p className="mt-2  font-medium">{question.ContentQuestion.trim()}</p>

        {/* Multiple Choice Options */}
        <FormController
          name={question.Id}
          type="radio"
          onChange={handleChange}
          options={question.Answers.map((answer) => ({
            value: answer.Id,
            label: answer.Answer,
            style: {
              text: "peer-checked:text-green-600",
              peer: "peer-checked:bg-green-500",
            },
          }))}
        />
      </div>
    </div>
  );
}
