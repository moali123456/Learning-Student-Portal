import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import {
  getAllQuestionsTopicReading,
  getAllTopicsReading,
} from "../../api/adminApis";
import Footer from "../../layout/footer";
import Header from "../../layout/header";

// Importing Question Components
import ArrangeWordsQuestion from "./ArrangeWordsQuestion";
import MatchingQuestion from "./MatchingQuestion";
import MultipleChoiceQuestion from "./MultipleChoiceQuestion";
import PutInRightPlaceQuestion from "./PutInRightPlaceQuestion";
import TrueFalseQuestion from "./TrueFalseQuestion";
import WriteAnswerQuestion from "./WriteAnswerQuestion";

const Test: React.FC = () => {
  const { examId } = useParams();
  const [loading, setLoading] = useState<boolean>(true);
  const [error, setError] = useState<string | null>(null);
  const [topicsWithQuestions, setTopicsWithQuestions] = useState<any[]>([]);
  const [selectedAnswers, setSelectedAnswers] = useState<
    Record<string, string | null>
  >({});
  const [userData, setUserData] = useState<any>({});

  useEffect(() => {
    const fetchTopicsAndQuestions = async () => {
      try {
        setLoading(true);
        const topicsData = await getAllTopicsReading(examId, 1);
        const topics = topicsData?.Data?.Topics || [];

        const topicsWithQuestionsPromises = topics.map(async (topic: any) => {
          const questionsData = await getAllQuestionsTopicReading(topic?.Id);
          return {
            TitleAr: topic?.TitleAr,
            TitleEn: topic?.TitleEn,
            topicId: topic?.Id,
            TopicContent: topic?.TopicContent,
            questions: questionsData?.Data?.GetQuestions || [],
            matchingQuestions: questionsData?.Data?.GetMatchingQuestions || [],
          };
        });

        const topicsWithQuestions = await Promise.all(
          topicsWithQuestionsPromises
        );
        setTopicsWithQuestions(topicsWithQuestions);
      } catch (err: any) {
        setError(err.message || "Failed to fetch topics and questions");
      } finally {
        setLoading(false);
      }
    };

    fetchTopicsAndQuestions();
  }, [examId]);

  const handleBlur = (x) => {
    console.log("User Data:", x);
  };
  useEffect(() => {
    console.log({ selectedAnswers });
  }, [selectedAnswers]);

  if (loading) return <div>Loading...</div>;
  if (error) return <div>Error: {error}</div>;

  return (
    <div className="mt-5">
      <Header />
      <div className="questions-wrapper">
        <ExamHeader />
        yousssssssssssssefv
        {topicsWithQuestions.map((topic) => (
          <div className="reading-comprehension" key={topic?.topicId}>
            <p className="comprehension-title">{topic?.TitleAr}</p>
            <div className="comprehension-questions">
              <p className="question-title">Question Title</p>
              <div className="comprehension-paragraph">
                <p>
                  Lorem Ipsum is simply dummy text of the printing and
                  typesetting industry. Lorem Ipsum has been the industry's
                  standard dummy text ever since the 1500s, when an unknown
                  printer took a galley of type and scrambled it to make a type
                  specimen book. It has survived not only five centuries, but
                  also the leap into electronic typesetting, remaining
                  essentially unchanged. 
                </p>
                <p>
                  Lorem Ipsum is simply dummy text of the printing and
                  typesetting industry. Lorem Ipsum has been the industry's
                  standard dummy text ever since the 1500s, when an unknown
                  printer took a galley of type and scrambled it to make a type
                  specimen book. It has survived not only five centuries, but
                  also the leap into electronic typesetting, remaining
                  essentially unchanged. 
                </p>
              </div>
              {/* Matching Question Section */}
              {topic.matchingQuestions.length > 0 && (
                <MatchingQuestion
                  questions={topic.matchingQuestions}
                  setSelectedAnswers={setSelectedAnswers}
                  selectedAnswers={selectedAnswers}
                  onBlur={handleBlur}
                />
              )}

              {/* Other Question Types */}
              {topic.questions.map((question: any) => {
                switch (question?.QuestionType) {
                  case 1:
                    return (
                      <TrueFalseQuestion
                        key={question.Id}
                        question={question}
                        setSelectedAnswers={setSelectedAnswers}
                        onBlur={handleBlur}
                      />
                    );
                  case 2:
                    return (
                      <WriteAnswerQuestion
                        key={question.Id}
                        question={question}
                        onBlur={handleBlur}
                      />
                    );
                  case 3:
                    return (
                      <MultipleChoiceQuestion
                        key={question.Id}
                        question={question}
                        setSelectedAnswers={setSelectedAnswers}
                        onBlur={handleBlur}
                      />
                    );
                  case 4:
                    return (
                      <ArrangeWordsQuestion
                        key={question.Id}
                        question={question}
                        onBlur={handleBlur}
                      />
                    );
                  case 6:
                    return (
                      <PutInRightPlaceQuestion
                        key={question.Id}
                        question={question}
                        onBlur={handleBlur}
                      />
                    );
                  default:
                    return null;
                }
              })}
            </div>
          </div>
        ))}

        <div className="submit-and-move">
          <div></div>
          <button>Submit</button>
          <div className="next-arrow">
            <img src="/assets/assessment/next-arrow.svg" alt="" />
          </div>
        </div>
      </div>
      <Footer />
    </div>
  );
};

export default Test;
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
