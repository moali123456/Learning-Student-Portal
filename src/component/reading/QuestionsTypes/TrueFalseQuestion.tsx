import { TrueFalseQuestion as TrueFalseQuestionType } from "../../../api/services/exams.services";
import FormController from "./FormController";
type TrueFalseQuestionProps = {
  question: TrueFalseQuestionType;
  index: number;
};

export default function TrueFalseQuestion({
  question,
  index,
}: TrueFalseQuestionProps) {


  return (
    <div>
      {/* Question Number & Title */}
      <h2 className="text-lg font-bold flex items-center mb-3">
        <span className="bg-black text-white rounded-full w-6 h-6 flex items-center justify-center text-sm mr-2">
          {index}
        </span>
        True or False?
      </h2>
      <div className="p-4 border rounded-xl shadow-sm">
        {/* Question Content */}
        <p className="mt-2 text-gray-600">{question.ContentQuestion}</p>

        {/* True/False Radio Buttons */}
        <FormController
          name={question.Id}
          type="radio"
          options={[
            {
              value: "true",
              label: "True",
              style: {
                text: "text-green-500",
                peer: "peer-checked:bg-green-500",
              },
            },
            {
              value: "false",
              label: "False",
              style: { text: "text-red-500", peer: "peer-checked:bg-red-500" },
            },
          ]}
        />
      </div>
    </div>
  );
}
