import React from "react";

import { useParams } from "react-router-dom";
import ListingQuestions from "../../component/listening/listening";
import ReadingQuestions from "../../component/reading/reading-questions";
import ReadingExam from "../../component/reading/ReadingExam";
import SpeakingQuestions from "../../component/speaking/speaking-questions";
import WritingQuestions from "../../component/writing/writing-questions";
import Header from "../../layout/header";
import Footer from "../../layout/footer";
import NotFound from "../not-found";

const Questions: React.FC = () => {
  const { skill, examId } = useParams<{
    skill: string;
    examId: string;
  }>();
  function renderExam() {
    switch (skill?.toLowerCase()) {
      case "reading":
        return (
          <div className="mt-5">
            <ReadingExam examId={examId} skillNumber={1} />
          </div>
        );
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
  return (
    <div className="min-h-[100vh] flex flex-col justify-between">
      <div className="mt-5">
        <Header />
      </div>
      {renderExam()}
      <Footer />
    </div>
  );
};

export default Questions;
