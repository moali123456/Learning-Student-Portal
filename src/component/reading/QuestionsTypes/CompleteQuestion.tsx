import {
  DndContext,
  DragEndEvent,
  useDraggable,
  useDroppable,
} from "@dnd-kit/core";
import { CSS } from "@dnd-kit/utilities";
import { useEffect, useState } from "react";
import { useFormContext } from "react-hook-form";
import {
  Answer,
  CompleteQuestion as CompleteQuestionType,
} from "../../../api/services/exams.services";

interface CompleteQuestionProps {
  question: CompleteQuestionType;
  index: number;
}

export default function CompleteQuestion({
  question,
  index,
}: CompleteQuestionProps) {
  const {
    setValue,
    trigger,
    getFieldState,
    formState: { isSubmitted },
  } = useFormContext();
  const isError = getFieldState(question?.Id)?.error;
  const [contentSections] = useState(question.ContentQuestion.split("...."));
  const [availableAnswers, setAvailableAnswers] = useState(question.Answers);
  const [placedAnswers, setPlacedAnswers] = useState<(Answer | null)[]>(
    new Array(question.Answers.length).fill(null)
  );
  const handleDragEnd = (event: DragEndEvent) => {
    const { active, over } = event;
    if (!over) return;
    const draggedAnswer: Answer | undefined | null =
      availableAnswers.find((ans) => ans.Id === active.id) ||
      placedAnswers.find((ans) => ans?.Id === active.id);
    const dropIndexSe3a =
      over.id === "AvailableAnswersArea"
        ? -1
        : parseInt(String(over.id).replace("slot-", ""), 10);
    const placedAnswerIndex = placedAnswers.findIndex(
      (item) => item?.Id === active.id
    );

    //drag from slots to AvailableAnswersArea
    if (dropIndexSe3a === -1) {
      const answer = placedAnswers.findIndex((item) => item?.Id === active.id);
      if (answer > -1 && draggedAnswer) {
        setPlacedAnswers((prev) =>
          prev.map((ans) => (ans?.Id === active.id ? null : ans))
        );
        setAvailableAnswers((prev) => [...prev, draggedAnswer]);
        return;
      }
      return;
    }
    // if   -> drag slot to another slot (empty , switch between)
    // else -> drag from AvailableAnswersArea to slots
    if (placedAnswerIndex > -1) {
      setPlacedAnswers((prev) => {
        const updated = [...prev];
        [updated[placedAnswerIndex], updated[dropIndexSe3a]] = [
          updated[dropIndexSe3a],
          updated[placedAnswerIndex],
        ];
        return updated;
      });
      return;
    } else {
      if (!draggedAnswer) return;
      // drop in empty slot
      if (!placedAnswers[dropIndexSe3a]) {
        setPlacedAnswers((prev) => {
          const newPlaced = [...prev];
          newPlaced[dropIndexSe3a] = draggedAnswer;
          return newPlaced;
        });
        setAvailableAnswers((prev) =>
          prev.filter((ans) => ans.Id !== active.id)
        );
      } else {
        const tempAvailableAnswer = availableAnswers.filter(
          (ans) => ans.Id === active.id
        )[0];
        const tempPlacedAnswer = placedAnswers[dropIndexSe3a];
        setPlacedAnswers((prev) => {
          prev[dropIndexSe3a] = tempAvailableAnswer;
          return [...prev];
        });
        setAvailableAnswers((prev) => {
          prev = prev.filter((ans) => ans.Id !== active.id);
          return [...prev, tempPlacedAnswer];
        });
      }
      return;
    }
  };

  useEffect(() => {
    console.log("arrange question error", { isSubmitted });
    async function updateFormValue() {
      await setValue(question.Id, placedAnswers);
      //to run vaildation for this question after submit and if one answer not answered
      const isPlacedAnswerFull = placedAnswers.some((item) => item != null);
      if (isPlacedAnswerFull && isSubmitted) {
        trigger(question.Id);
      }
    }
    updateFormValue();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [placedAnswers, question.Id, setValue]);

  return (
    <div>
      {/* Question Number & Title */}
      <h2 className="text-lg font-bold flex items-center mb-3">
        <span className="bg-black text-white rounded-full w-6 h-6 flex items-center justify-center text-sm mr-2">
          {index}
        </span>
        Complete
      </h2>
      <div
        className={`p-4 border  rounded-xl shadow-sm ${
          isError && "border-red-500"
        }`}
      >
        <DndContext onDragEnd={handleDragEnd}>
          {/* Top Available Answers */}
          <AvailableAnswersArea answers={availableAnswers} />

          {/* Drop Area */}
          <div className="flex flex-wrap justify-center items-center  mt-4 p-4 rounded-md">
            {contentSections.map((answer, index) => (
              <>
                <span>{answer}</span>
                {placedAnswers.length > index ? (
                  <DroppableSlot
                    key={index}
                    slotId={`slot-${index}`}
                    answer={placedAnswers[index]}
                    index={index}
                  />
                ) : (
                  ""
                )}
              </>
            ))}
          </div>
        </DndContext>
      </div>
    </div>
  );
}

function AnswerCard({ answer }: { answer: Answer }) {
  const { attributes, listeners, setNodeRef, transform } = useDraggable({
    id: answer.Id,
  });

  const style = {
    transform: CSS.Transform.toString(transform),
  };

  return (
    <div
      ref={setNodeRef}
      style={style}
      {...attributes}
      {...listeners}
      className="px-4 py-2 rounded bg-purple-500 text-white cursor-pointer"
    >
      {answer.Answer}
    </div>
  );
}

function DroppableSlot({
  slotId,
  answer,
  index,
}: {
  slotId: string;
  answer: Answer | null;
  index: number;
}) {
  const { setNodeRef } = useDroppable({ id: slotId });

  return (
    <div
      ref={setNodeRef}
      className=" rounded-lg w-32 h-10 flex items-center justify-center cursor-pointer"
    >
      {answer ? (
        <AnswerCard answer={answer} />
      ) : (
        <div className="bg-gray-100 rounded flex justify-center items-center w-[90%] h-[95%]">
          {index + 1}
        </div>
      )}
    </div>
  );
}
function AvailableAnswersArea({ answers }: { answers: Answer[] }) {
  const { setNodeRef } = useDroppable({
    id: "AvailableAnswersArea",
  });

  return (
    <div className="bg-gray-200 min-w-50 min-h-[4.5rem] py-4 flex flex-wrap justify-center rounded ">
      <div
        ref={setNodeRef}
        className="flex justify-center flex-wrap gap-4 h-full w-full"
      >
        {answers.length ? (
          answers.map((answers) => {
            return <AnswerCard key={answers.Id} answer={answers} />;
          })
        ) : (
          <div className="w-full h-full inline-block text-transparent">0</div>
        )}
      </div>
    </div>
  );
}
