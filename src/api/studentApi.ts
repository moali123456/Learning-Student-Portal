import { baseApi } from "./baseApi";
import {
  ExamApiResponse,
  QuestionResponse,
  TopicWithQuestions,
} from "../types/ExamQuestions";

export const studentApi = baseApi.injectEndpoints({
  endpoints: (builder) => ({
    // Fetch student exams
    getStudentExams: builder.query<unknown, void>({
      query: () => ({
        url: "/Exam/GetStudentExams",
        method: "GET",
      }),
    }),

    // Check skills exam availability
    checkSkillsExamsAvailability: builder.query<{ available: boolean }, string>(
      {
        query: (examId) => ({
          url: `/Exam/CheckSkillsExamsAvailability?examId=${examId}`,
          method: "GET",
        }),
      }
    ),

    // Fetch single exam data (topics only)
    getSkillExamData: builder.query<
      ExamApiResponse,
      { skillNumber: number | string; examId: string }
    >({
      query: ({ skillNumber, examId }) => ({
        url: `/Student/GetStudentModelExam?Skill=${skillNumber}&ExamId=${examId}`,
        method: "GET",
      }),
    }),

    // Fetch questions for a specific topic
    getSkillExamQuestions: builder.query<
      QuestionResponse,
      { skillNumber: number | string; topicId: string }
    >({
      query: ({ skillNumber, topicId }) => ({
        url: `/Student/GetStudentTopicsQuestions?Skill=${skillNumber}&topicId=${topicId}`,
        method: "GET",
      }),
    }),

    // Fetch topics and their respective questions (removes returning `Questions`)
    getSkillExamTopicsWithQuestions: builder.query<
      TopicWithQuestions[], // ✅ Only returning topicsWithQuestions now
      { skillNumber: number | string; examId: string | undefined }
    >({
      async queryFn({ skillNumber, examId }, _api, _extraOptions, fetchWithBQ) {
        try {
          if (!examId) {
            throw new Error("have no exam id");
          }
          // Fetch exam topics
          const examDataResponse = await fetchWithBQ({
            url: `/Student/GetStudentModelExam?Skill=${skillNumber}&ExamId=${examId}`,
            method: "GET",
          });
          if (examDataResponse.error) throw examDataResponse.error;

          const topics = (examDataResponse.data as ExamApiResponse).Data.Topics;

          // Fetch questions for each topic
          const topicQuestionsPromises = topics.map(async (topic) => {
            const questionResponse = await fetchWithBQ({
              url: `/Student/GetStudentTopicsQuestions?Skill=${skillNumber}&topicId=${topic.Id}`,
              method: "GET",
            });
            if (questionResponse.error) throw questionResponse.error;

            const questionData = questionResponse.data as QuestionResponse;
            return {
              topic,
              questions: [
                ...(questionData.Data.GetQuestions || []),
                ...(questionData.Data.GetMatchingQuestions || []),
              ],
            };
          });

          const topicsWithQuestions = await Promise.all(topicQuestionsPromises);

          return { data: topicsWithQuestions };
        } catch (error) {
          return { error };
        }
      },
    }),
    submitQuestionAnswer: builder.mutation<
      unknown,
      FormData // ✅ Accepts FormData
    >({
      query: (formData) => ({
        url: `/Student/SubmitStudentAnswer`,
        method: "POST",
        body: formData, 
      }),
    }),
  }),
});

export const {
  useGetStudentExamsQuery,
  useCheckSkillsExamsAvailabilityQuery,
  useGetSkillExamDataQuery,
  useGetSkillExamQuestionsQuery,
  useGetSkillExamTopicsWithQuestionsQuery,
  useSubmitQuestionAnswerMutation, // ✅ Exporting the new mutation
} = studentApi;
