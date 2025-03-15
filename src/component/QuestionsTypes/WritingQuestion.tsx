import { useCallback, useEffect, useState } from "react";
import { WritingQuestion as WritingQuestionType } from "../../api/services/exams.services";
import FormController from "../FormController/FormController";
import { useDebounce } from "../../hooks/useDebounce";
import { QuestionAnswer } from "../reading/ReadingExam";

type WritingQuestionProps = {
  question: WritingQuestionType;
  SubmitQuestionAnswer: (QuestionAnswer: QuestionAnswer) => void;
  index: number;
};

export default function WritingQuestion({
  question,
  SubmitQuestionAnswer,
  index,
}: WritingQuestionProps) {
  const [inputValue, setInputValue] = useState<string | null>(null);
  const debouncedValue = useDebounce(inputValue, 500);

  const handleChange = useCallback(
    (e: React.ChangeEvent<HTMLTextAreaElement>) => {
      setInputValue(e.target.value);
    },
    []
  );

  useEffect(() => {
    if (debouncedValue || debouncedValue == "") {
      SubmitQuestionAnswer({
        QuestionType: 2,
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
        Write Your Answer
      </h2>

      {/* Question Content */}
      <p className="font-medium mb-3">{question.ContentQuestion}</p>

      {/* Text Area for Answer */}
      <FormController
        name={question.Id}
        type="textarea"
        placeholder="Type your answer here..."
        onChange={handleChange}
      />
    </div>
  );
}
