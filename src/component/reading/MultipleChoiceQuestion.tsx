import React from "react";

const MultipleChoiceQuestion = ({ question, setSelectedAnswers }) => {
  return (
    <div className="choose-the-correct-answer">
      <p className="section-title">{question?.ContentQuestion}</p>
      <div className="answers">
        {question?.Answers.map((answer, index) => (
          <label key={index}>
            <input
              type="radio"
              name={`question-${question.Id}`}
              value={answer.Answer}
              onChange={() => setSelectedAnswers(prev => ({ ...prev, [question.Id]: answer.Answer }))}
            />
            {answer.Answer}
          </label>
        ))}
      </div>
    </div>
  );
};

export default MultipleChoiceQuestion;
