import { TrueFalseQuestion as TrueFalseQuestionType } from "../../../api/services/exams.services";

type TrueFalseQuestionProps = {
  question: TrueFalseQuestionType;
  index: number;
};

export default function TrueFalseQuestion({
  question,

  index,
}: TrueFalseQuestionProps) {
  console.log("firstquestion", question);
  return (
    <div className="mb-3">
      <p className="font-semibold flex mb-1">
        <span className="me-2 flex justify-center items-center w-5 h-5 rounded-full bg-black text-white">
          {index}
        </span>
        True or False
      </p>
      <div className="flex flex-col justify-start border border-[#ebebebeb] p-6 rounded-xl">
        <p>{question.ContentQuestion}</p>
        <div className="flex justify-start mt-2">
          <div className="w-1/4 ">
            <span className="flex justify-start items-center">
              <input
                type="radio"
                name={`question-${question.Id}`}
                value={"true"}
                className="me-1 w-5 h-5 text-purple-600 bg-gray-200 border-gray-300 focus:ring-purple-500"
                onChange={() => {
                  // setSelectedAnswers((prev) => ({
                  //   ...prev,
                  //   [question.Id]: "",
                  // }));
                  onBlur({ [question.Id]: true });
                }}
              />
              true
            </span>
          </div>
          <div className="w-1/4">
            <span className="flex justify-start items-center">
              <input
                type="radio"
                name={`question-${question.Id}`}
                value={"false"}
                className="me-1 w-5 h-5 text-purple-600 bg-gray-200 border-gray-300 focus:ring-purple-500"
                onChange={() => {
                  // setSelectedAnswers((prev) => ({
                  //   ...prev,
                  //   [question.Id]: "d",
                  // }));
                  onBlur({ [question.Id]: false });
                }}
              />
              false
            </span>
          </div>
        </div>
      </div>
    </div>
  );
}
