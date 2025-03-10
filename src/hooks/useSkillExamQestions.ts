import { useEffect, useState } from "react";
import {
  fetchSkillExamData,
  fetchSkillExamQuestions,
  MatchingQuestion,
  Question,
  Topic,
} from "../api/services/exams.services";

export type TopicWithQuestions = {
  topic: Topic;
  questions: (Question | MatchingQuestion)[];
};
export const useSkillExamQestions = (
  skillNumber: number | string,
  examId: string
) => {
  const [topicsWithQuestions, setTopicsWithQuestions] = useState<
    TopicWithQuestions[]
  >([]);
  const [Questions, setQuestions] = useState<
    (Question | MatchingQuestion)[] | null
  >(null);
  const [isLoading, setLoading] = useState<boolean>(true);
  const [isError, setError] = useState<string | null>(null);

  useEffect(() => {
    if (!skillNumber || !examId) return;

    const fetchTopicsAndQuestions = async () => {
      try {
        setLoading(true);
        // Fetch exam data which includes topics
        const response = await fetchSkillExamData(skillNumber, examId);

        if (response.StatusCode !== 200 || !response.Data?.Topics) {
          throw new Error("Invalid API response format");
        }

        const topics = response.Data.Topics;

        // Fetch questions for each topic
        const topicsWithQuestionsData = await Promise.all(
          topics.map(async (topic) => {
            const questionResponse = await fetchSkillExamQuestions(
              skillNumber,
              topic.Id
            );
            // Ensure valid question response
            const questions =
              questionResponse.StatusCode === 200 &&
              questionResponse.Data?.GetQuestions
                ? questionResponse.Data.GetQuestions
                : [];

            const matchingQuestion =
              questionResponse.StatusCode === 200 &&
              questionResponse.Data?.GetMatchingQuestions
                ? questionResponse.Data.GetMatchingQuestions
                : [];

            return { topic, questions: [...questions, ...matchingQuestion] };
          })
        );

        setTopicsWithQuestions(topicsWithQuestionsData);
        setQuestions(topicsWithQuestionsData.flatMap((item) => item.questions));
      } catch (err) {
        setError(`Failed to load topics or questions.${err}`);
      } finally {
        setLoading(false);
      }
    };

    fetchTopicsAndQuestions();
  }, [skillNumber, examId]);

  return { topicsWithQuestions, Questions, isLoading, isError };
};
