import React from "react";

interface MatchingQuestionProps {
  questions: {
    Id: string;
    MatchingQuestion: { Id: string; ContentQuestion: string }[];
    Answers: { Id: string; Answer: string }[];
  }[];
  selectedAnswers: Record<string, string>;
  setSelectedAnswers: React.Dispatch<
    React.SetStateAction<Record<string, string>>
  >;
  onBlur: (selectedAnswers: Record<string, string>) => void;
}

const MatchingQuestion: React.FC<MatchingQuestionProps> = ({
  questions,
  selectedAnswers,
  setSelectedAnswers,
  onBlur,
}) => {
  const handleBlur = () => {
    onBlur(selectedAnswers);
  };

  return (
    <div className="question-item" onBlur={handleBlur}>
      {questions.map((match, matchIndex) => (
        <div key={match.Id} className="choose-the-correct-answer">
          <p className="section-title">
            <span className="question-num">{matchIndex + 1}</span>
            Choose the correct answer
          </p>
          <div className="choose-questions">
            {match?.MatchingQuestion?.map((question, questionIndex) => (
              <div key={question?.Id} className="question-row">
                <p className="question">{question?.ContentQuestion}</p>
                <div className="answers">
                  {match?.Answers?.[questionIndex] && (
                    <label key={match.Answers[questionIndex].Id}>
                      <input
                        type="radio"
                        name={`question-${match.Id}-${questionIndex}`}
                        value={match.Answers[questionIndex].Answer}
                        onChange={() => {
                          setSelectedAnswers((prev) => ({
                            ...prev,
                            [match.Id]: match.Answers[questionIndex].Answer,
                          }));
                          onBlur({
                            ...selectedAnswers,
                            [match.Id]: match.Answers[questionIndex].Answer,
                          });
                        }}
                        checked={
                          selectedAnswers[match.Id] ===
                          match.Answers[questionIndex].Answer
                        }
                      />
                      {match.Answers[questionIndex].Answer}
                    </label>
                  )}
                </div>
              </div>
            ))}
          </div>
        </div>
      ))}
    </div>
  );
};

export default MatchingQuestion;
