import React, { useState } from "react";

const WriteAnswerQuestion = ({ question }) => {
  const [text, setText] = useState("");

  return (
    <div className="write-about-wrapper">
      <p className="question-title">{question?.ContentQuestion}</p>
      <textarea value={text} onChange={(e) => setText(e.target.value)} maxLength={200} />
      <div className="count">{text.length} / 200</div>
    </div>
  );
};

export default WriteAnswerQuestion;
