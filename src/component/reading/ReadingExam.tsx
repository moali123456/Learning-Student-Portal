import { zodResolver } from "@hookform/resolvers/zod";
import { useEffect, useRef } from "react";
import { FormProvider, useForm } from "react-hook-form";
import { z } from "zod";
import { useSkillExamQestions } from "../../hooks/useSkillExamQestions";
import QuestionRenderer from "./QuestionsTypes/QuestionRenderer";
import {
  generateDefaultValues,
  generateSchema,
} from "./QuestionsTypes/ValidationSchema";
type ReadingExamProps = {
  examId: string | undefined;
  skillNumber: number;
};
export default function ReadingExam({ examId, skillNumber }: ReadingExamProps) {
  const { topicsWithQuestions, Questions, isLoading, isError } =
    useSkillExamQestions(skillNumber!, examId!);

  const examSchema = z.object({
    ...generateSchema(Questions),
  });
  const methods = useForm({
    resolver: zodResolver(examSchema),
  });
  const {
    handleSubmit,
    watch,
    formState: { errors },
    getValues,
  } = methods;
  const fromValues = watch();

  const watchedValues = watch();
  const previousValues = useRef({
    ...generateDefaultValues(Questions),
  });

  const onSubmit = (data: unknown) => {
    console.log("Form Data:", data);
  };
  useEffect(() => {
    console.log("fromValues", fromValues);
  }, [fromValues]);
  // const onChangeForm = () => {
  //   Object.keys(watchedValues).forEach((key) => {
  //     const field = key as keyof FormValues;
  //     if (watchedValues[field] !== previousValues.current[field]) {
  //       console.log(
  //         `Changed Field: ${field}, New Value: ${watchedValues[field]}`
  //       );
  //       previousValues.current[field] = watchedValues[field]; // Update previous value
  //     }
  //   });
  // };
  // console.log("topicsWithQuestions", { Questions });
  if (isLoading) return <div>Loading...</div>;
  if (isError) return <div>Error: {isError}</div>;
  return (
    <div className="questions-wrapper">
      {/* <ExamHeader /> */}
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
        {/* <div
          onClick={() => {
            console.log("errrors", errors);
            console.log("values", getValues());
          }}
        >
          debig
        </div> */}
      </FormProvider>
    </div>
  );
}

// function ExamHeader() {
//   return (
//     <>
//       <div className="reading-instructions">
//         <div className="left-side">
//           <img src="/assets/home/highlight.svg" alt="" />
//           <div className="main-points">
//             <p className="title">Reading</p>
//             <ul className="points">
//               <li>
//                 Lorem Ipsum is simply dummy text of the printing and typesetting
//                 industry.
//               </li>
//               <li>
//                 Lorem Ipsum is simply dummy text of the printing and typesetting
//                 industry.
//               </li>
//               <li>
//                 Lorem Ipsum is simply dummy text of the printing and typesetting
//                 industry.
//               </li>
//             </ul>
//           </div>
//         </div>
//         <div className="right-side-img">
//           <div className="whole-img">
//             <div className="img-bg">
//               <img src="/assets/home/reading-a-book.svg" alt="" />
//             </div>
//           </div>
//           <div className="extra-writing-instruction">
//             <div className="instruction-item">
//               <img src="/assets/exams/keyboard.svg" alt="" />
//               <p className="keyboard">Write with Keyboard</p>
//             </div>
//             <div className="instruction-item">
//               <img src="/assets/exams/write.svg" alt="" />
//               <p>Hand writing</p>
//             </div>
//           </div>
//         </div>
//       </div>
//       <div className="reading-timer">
//         <img src="/assets/home/timer.svg" alt="" />
//       </div>
//     </>
//   );
// }
