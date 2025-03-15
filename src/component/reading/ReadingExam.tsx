import { zodResolver } from "@hookform/resolvers/zod";
import { FormProvider, useForm } from "react-hook-form";
import { z } from "zod";
import {
  Answer,
  Type1And6Payload,
  Type2Payload,
  Type4And5Payload,
} from "../../api/services/exams.services";
import { useSkillExamQestions } from "../../hooks/useSkillExamQestions";
import { useSubmitQuestionAnswer } from "../../hooks/useSubmitQuestionAnswer";
import QuestionRenderer from "../QuestionsTypes/QuestionRenderer";
import { generateSchema } from "./ValidationSchema";
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
  const { topicsWithQuestions, Questions, isLoading, isError } =
    useSkillExamQestions(skillNumber!, examId!);
  const { submitAnswer } = useSubmitQuestionAnswer();

  const examSchema = z.object({
    ...generateSchema(Questions),
  });
  const methods = useForm({
    resolver: zodResolver(examSchema),
  });
  const { handleSubmit } = methods;

  const SubmitQuestionAnswer = (QuestionAnswer: QuestionAnswer) => {
    if (examId && QuestionAnswer) {
      const payload = transformAnswer(QuestionAnswer, 1, examId);
      submitAnswer(payload);
    }
  };
  const onSubmit = (data: unknown) => {
    console.log("Form Data:", data);
  };
  if (isLoading) return <div>Loading...</div>;
  if (isError) return <div>Error: {isError}</div>;
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
                Lorem Ipsum is simply dummy text of the printing and typesetting
                industry.
              </li>
              <li>
                Lorem Ipsum is simply dummy text of the printing and typesetting
                industry.
              </li>
              <li>
                Lorem Ipsum is simply dummy text of the printing and typesetting
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
): Type1And6Payload | Type2Payload | Type4And5Payload {
  switch (input.QuestionType) {
    case 1:
    case 6:
      return {
        Skill: skill,
        ExamId: examId,
        QuestionId: input.questionId,
        AnswerId: input.answer as string,
      };

    case 2:
      return {
        Skill: skill,
        ExamId: examId,
        QuestionId: input.questionId,
        AnswerId: "string", // You may replace it with actual AnswerId if needed
        FreeWritingAnswer: input.answer as string,
        AnswerFile: "string", // Replace with actual file data if available
      };

    case 3:
      return Object.entries(input.answer as Record<string, { Id: string }>).map(
        ([questionId, answerData]) => ({
          Skill: skill,
          ExamId: examId,
          QuestionId: questionId,
          AnswerId: answerData?.Id,
        })
      );

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
