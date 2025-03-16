import React from "react";

import { useParams } from "react-router-dom";
import ListingQuestions from "../component/listening/listening";
import ReadingExam from "../component/reading/ReadingExam";
import SpeakingQuestions from "../component/speaking/speaking-questions";
import WritingQuestions from "../component/writing/writing-questions";
import NotFound from "./not-found";
import Exam from "../component/Exam/Exam";

const Questions: React.FC = () => {
  const { skill, examId } = useParams<{
    skill: string;
    examId: string;
  }>();
  function renderExam() {
    switch (skill?.toLowerCase()) {
      case "reading":
        // return <Exam examId={examId} skillNumber={1} />;
      return <ReadingExam examId={examId} skillNumber={1} />;
      case "writing":
        return <WritingQuestions />;
      case "speaking":
        return <SpeakingQuestions />;
      case "listening":
        return <ListingQuestions />;
      default:
        return <NotFound />;
    }
  }
  return <>{renderExam()}</>;
};

export default Questions;
