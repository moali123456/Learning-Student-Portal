interface TrueFalseQuestionProps {
  question: {
    Id: string;
    ContentQuestion: string;
    Answers: { Answer: string }[];
  };
  setSelectedAnswers: React.Dispatch<
    React.SetStateAction<Record<string, string>>
  >;
  onBlur: (selectedAnswer: Record<string, string>) => void;
}

const TrueFalseQuestion: React.FC<TrueFalseQuestionProps> = ({
  question,
  setSelectedAnswers,
  onBlur,
}) => {
  return (
    <div className="true-or-false">
      <p className="section-title">{question?.ContentQuestion}</p>
      <div className="true-or-false-question">
        <p className="question">
          Lorem Ipsum is simply dummy text of the printing and typesetting
          industry. Lorem Ipsum has been the industry's standard dummy text ever
          since the 1500s, when an unknown printer took a galley of type and
          scrambled it to make a type specimen book. It has survived not only
          five centuries, but also the leap into electronic typesetting,
          remaining essentially unchanged. 
        </p>
        <div className="true-or-false-answer">
          {question?.Answers.map((answer, index) => (
            <label key={index}>
              <input
                type="radio"
                name={`question-${question.Id}`}
                value={answer.Answer}
                onChange={() => {
                  setSelectedAnswers((prev) => ({
                    ...prev,
                    [question.Id]: answer.Answer,
                  }));
                  onBlur({ [question.Id]: answer.Answer });
                }}
              />
              {answer.Answer}
            </label>
          ))}
        </div>
      </div>
    </div>
  );
};

export default TrueFalseQuestion;
