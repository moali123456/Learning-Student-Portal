import { zodResolver } from "@hookform/resolvers/zod";
import { FormProvider, useForm } from "react-hook-form";
import { z } from "zod";
import {
  Answer,
  Type1Payload,
  Type2And6Payload,
  Type4And5Payload,
} from "../../api/services/exams.services";
import { useGetSkillExamTopicsWithQuestionsQuery } from "../../api/studentApi";
import { useSubmitQuestionAnswer } from "../../hooks/useSubmitQuestionAnswer";
import QuestionRenderer from "../QuestionsTypes/QuestionRenderer";
import { generateSchema } from "../Exam/ValidationSchema";
import Loader from "../Loader/Loader";
export type QuestionAnswer = {
  QuestionType: 1 | 2 | 3 | 4 | 5 | 6;
  questionId: string;
  answer:
    | string
    | (Answer | null)[]
    | Record<string, { Id: string; Answer: string }>
    | boolean;
};
type ReadingExamProps = {
  examId: string | undefined;
  skillNumber: number;
};
export default function ReadingExam({ examId, skillNumber }: ReadingExamProps) {
  const {
    data: topicsWithQuestions = [],
    error: isError,
    isLoading,
  } = useGetSkillExamTopicsWithQuestionsQuery({ skillNumber, examId });
  const { submitAnswer } = useSubmitQuestionAnswer();

  const examSchema = z.object({
    ...generateSchema(topicsWithQuestions),
  });
  const methods = useForm({
    resolver: zodResolver(examSchema),
  });
  const { handleSubmit } = methods;

  const SubmitQuestionAnswer = (QuestionAnswer: QuestionAnswer) => {
    if (examId && QuestionAnswer) {
      console.log("Payload Quesions", { QuestionAnswer });
      const payload = transformAnswer(QuestionAnswer, 1, examId);
      submitAnswer(payload);
    }
  };
  const onSubmit = (data: unknown) => {
    console.log("Form Data:", data);
  };
  if (isLoading) return <Loader />;
  if (isError) return <div>Error....</div>;
  return (
    <div className="questions-wrapper">
      <ExamHeader />
      <FormProvider {...methods}>
        <form onSubmit={handleSubmit(onSubmit)} className="space-y-4 px-10">
          {topicsWithQuestions.map(({ topic, questions }, index) => {
            return (
              <div className="mb-8" key={index}>
                <div className="text-[40px] text-[#785abe] font-bold">
                  {topic.TitleEn}
                </div>
                <div className="border-2 border-[#9a7ed9] rounded-[10px] p-8">
                  {topic.File || topic.TopicContent ? (
                    <div className="mb-8">
                      <div className="font-normal mb-3 flex flex-col gap-4">
                        {topic.TopicContent}
                      </div>
                      <div>{topic.File}</div>
                    </div>
                  ) : (
                    <></>
                  )}
                  {questions.map((question, indexQues) => {
                    indexQues = indexQues + 1;
                    return (
                      <div key={indexQues} className="mb-10">
                        <QuestionRenderer
                          question={question}
                          SubmitQuestionAnswer={SubmitQuestionAnswer}
                          index={indexQues}
                        />
                      </div>
                    );
                  })}
                </div>
              </div>
            );
          })}
          <div className="submit-and-move">
            <div></div>
            <button type="submit">Submit</button>
            <div className="next-arrow">
              <img src="/assets/assessment/next-arrow.svg" alt="" />
            </div>
          </div>
        </form>
      </FormProvider>
    </div>
  );
}

function ExamHeader() {
  return (
    <>
      <div className="reading-instructions">
        <div className="left-side">
          <img src="/assets/home/highlight.svg" alt="" />
          <div className="main-points">
            <p className="title">Reading</p>
            <ul className="points">
              <li>
                Lorem Ipsumis simply dummy text of the printing and typesetting
                industry.
              </li>
              <li>
                Lorem Ipsumis simply dummy text of the printing and typesetting
                industry.
              </li>
              <li>
                Lorem Ipsumis simply dummy text of the printing and typesetting
                industry.
              </li>
            </ul>
          </div>
        </div>
        <div className="right-side-img">
          <div className="whole-img">
            <div className="img-bg">
              <img src="/assets/home/reading-a-book.svg" alt="" />
            </div>
          </div>
          <div className="extra-writing-instruction">
            <div className="instruction-item">
              <img src="/assets/exams/keyboard.svg" alt="" />
              <p className="keyboard">Write with Keyboard</p>
            </div>
            <div className="instruction-item">
              <img src="/assets/exams/write.svg" alt="" />
              <p>Hand writing</p>
            </div>
          </div>
        </div>
      </div>
      <div className="reading-timer">
        <img src="/assets/home/timer.svg" alt="" />
      </div>
    </>
  );
}

function transformAnswer(
  input: QuestionAnswer,
  skill: number,
  examId: string
): Type2And6Payload | Type1Payload | Type4And5Payload {
  switch (input.QuestionType) {
    case 1:
    case 3:
      return {
        Skill: skill,
        ExamId: examId,
        QuestionId: input.questionId,
        AnswerId: input.answer as string,
      };

    case 2:
    case 6:
      return {
        Skill: skill,
        ExamId: examId,
        QuestionId: input.questionId,
        AnswerId: "string", // You may replace it with actual AnswerId if needed
        FreeWritingAnswer: input.answer as string,
        AnswerFile: "string", // Replace with actual file data if available
      };

    case 4:
    case 5:
      return {
        Skill: skill,
        ExamId: examId,
        QuestionId: input.questionId,
        CorrectAnswerOrder: (input.answer as Answer[]).map((ans, index) => ({
          AnswerId: ans?.Id,
          Order: index,
        })),
      };

    default:
      throw new Error("Invalid QuestionType");
  }
}

// function transformAnswer(
//   input: QuestionAnswer,
//   skill: number,
//   examId: string
// ): FormData {
//   const formData = new FormData();

//   formData.append("Skill", skill.toString());
//   formData.append("ExamId", examId);

//   switch (input.QuestionType) {
//     case 1:
//     case 6:
//       formData.append("QuestionId", input.questionId);
//       formData.append("AnswerId", input.answer as string);
//       break;

//     case 2:
//       formData.append("QuestionId", input.questionId);
//       formData.append("AnswerId", "string"); // Replace with actual AnswerId if needed
//       formData.append("FreeWritingAnswer", input.answer as string);
//       formData.append("AnswerFile", "string"); // Replace with actual file data if available
//       break;

//     case 3:
//       { console.log("Payload", input.answer);
//       const answers = input.answer as Record<string, { Id: string; Answer: string }>;
//       Object.keys(answers).forEach((QuestionID: string) => {
//         console.log("Payload", QuestionID, answers[QuestionID]);
//         // undefind == Question not touched yet sp no need to send it
//         // null == Question touched but has no value
//         if (answers[QuestionID] !== undefined) {
//           formData.append("QuestionId", QuestionID);
//           formData.append("AnswerId", answers[QuestionID]?.Id);
//         }
//       });
//       break; }

//     case 4:
//     case 5:
//       formData.append("QuestionId", input.questionId);
//       (input.answer as Answer[]).forEach((ans, index) => {
//         formData.append(`CorrectAnswerOrder[${index}][AnswerId]`, ans?.Id);
//         formData.append(
//           `CorrectAnswerOrder[${index}][Order]`,
//           index.toString()
//         );
//       });
//       break;

//     default:
//       throw new Error("Invalid QuestionType");
//   }

//   return formData;
// }
