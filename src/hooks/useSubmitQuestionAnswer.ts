import {
  submitQuestionAnswer,
  Type1And6Payload,
  Type2Payload,
  Type4And5Payload,
} from "../api/services/exams.services";

export const useSubmitQuestionAnswer = () => {
  const submitAnswer = async (
    payload: Type1And6Payload | Type2Payload | Type4And5Payload
  ) => {
    try {
      return await submitQuestionAnswer(payload);
    } catch (error) {
      console.log(error);
      return "Failed to submit answer";
    }
  };

  return { submitAnswer };
};
