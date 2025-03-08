import React, { useState } from "react";

interface ArrangeWordsQuestionProps {
  question: {
    ContentQuestion: string;
    Answers: { Answer: string }[];
  };
  onBlur: (slots: (string | null)[]) => void;
}

const ArrangeWordsQuestion: React.FC<ArrangeWordsQuestionProps> = ({
  question,
  onBlur,
}) => {
  const [words, setWords] = useState<string[]>(
    question.Answers.map((a) => a.Answer)
  );
  const [usedWords, setUsedWords] = useState<string[]>([]);
  const [slots, setSlots] = useState<(string | null)[]>(
    Array(question.Answers.length).fill(null)
  );

  const handleWordDragStart = (
    event: React.DragEvent<HTMLDivElement>,
    word: string
  ) => {
    event.dataTransfer.setData("text/plain", word);
    event.dataTransfer.effectAllowed = "move";
  };

  const handleSlotDrop = (
    event: React.DragEvent<HTMLDivElement>,
    index: number
  ) => {
    event.preventDefault();
    const word = event.dataTransfer.getData("text");

    const newSlots = [...slots];
    const newUsedWords = new Set(usedWords);

    const replacedWord = newSlots[index];
    if (replacedWord) {
      newUsedWords.delete(replacedWord);
    }

    const previousIndex = newSlots.findIndex((slotWord) => slotWord === word);
    if (previousIndex !== -1) {
      newSlots[previousIndex] = null;
    }

    newSlots[index] = word;
    newUsedWords.add(word);

    setSlots(newSlots);
    setUsedWords(Array.from(newUsedWords));
    onBlur(newSlots);

    if (replacedWord && !words.includes(replacedWord)) {
      setWords((prevWords) => [...prevWords, replacedWord]);
    }
  };

  const handleListDrop = (event: React.DragEvent<HTMLDivElement>) => {
    event.preventDefault();
    const word = event.dataTransfer.getData("text");
    const newSlots = slots.map((slot) => (slot === word ? null : slot));
    const newUsedWords = usedWords.filter((w) => w !== word);
    if (!words.includes(word)) {
      setWords((prevWords) => [...prevWords, word]);
    }

    setSlots(newSlots);
    setUsedWords(newUsedWords);
    onBlur(newSlots);
  };

  const allowDrop = (event: React.DragEvent<HTMLDivElement>) => {
    event.preventDefault();
  };

  return (
    <div className="arrange-words">
      <p className="section-title">{question?.ContentQuestion}</p>
      <div className="arrange-words-question">
        <div
          className="words-to-arrange"
          onDrop={handleListDrop}
          onDragOver={allowDrop}
        >
          {words.map((word) => (
            <p
              key={word}
              className={`word ${usedWords.includes(word) ? "used-word" : ""}`}
              draggable
              onDragStart={(event) => handleWordDragStart(event, word)}
            >
              {word}
            </p>
          ))}
        </div>
        <div className="words-place">
          {slots.map((slot, index) => (
            <div
              className="gray-box-slot"
              key={index}
              onDrop={(event) => handleSlotDrop(event, index)}
              onDragOver={(event) => event.preventDefault()}
              onBlur={() => onBlur(slots)}
            >
              {slot ? (
                <p
                  className="word-in-slot"
                  draggable
                  onDragStart={(event) => handleWordDragStart(event, slot)}
                >
                  {slot}
                </p>
              ) : (
                ""
              )}
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default ArrangeWordsQuestion;
