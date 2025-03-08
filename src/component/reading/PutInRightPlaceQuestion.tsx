import React, { useState } from "react";

const PutInRightPlaceQuestion = ({ question }) => {
  const [placedWords, setPlacedWords] = useState(Array(question.Answers.length).fill(null));

  const handleDragStart = (word) => {
    localStorage.setItem("draggedWord", word);
  };

  const handleDrop = (index) => {
    const draggedWord = localStorage.getItem("draggedWord");
    if (draggedWord) {
      const updatedPlacedWords = [...placedWords];
      updatedPlacedWords[index] = draggedWord;
      setPlacedWords(updatedPlacedWords);
      localStorage.removeItem("draggedWord");
    }
  };

  return (
    <div className="put-in-right-place">
      <p className="section-title">{question?.ContentQuestion}</p>
      <div className="words-to-choose">
        {question?.Answers.map((word, index) => (
          <div key={index} draggable onDragStart={() => handleDragStart(word?.Answer)}>
            {word?.Answer}
          </div>
        ))}
      </div>
      {placedWords.map((word, index) => (
        <div key={index} className="drag-box" onDrop={() => handleDrop(index)} onDragOver={(event) => event.preventDefault()}>
          {word || ""}
        </div>
      ))}
    </div>
  );
};

export default PutInRightPlaceQuestion;
