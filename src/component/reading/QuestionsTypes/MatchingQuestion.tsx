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
  MatchingAnswer,
  MatchingQuestionItem,
  MatchingQuestion as MatchingQuestionType,
} from "../../../api/services/exams.services";
import { useDebounce } from "../../../hooks/useDebounce";

interface MatchingQuestionProps {
  question: MatchingQuestionType;
  index: number;
}

export default function MatchingQuestion({
  question,
  index,
}: MatchingQuestionProps) {
  const {
    setValue,
    trigger,
    getFieldState,
    formState: { isSubmitted },
  } = useFormContext();
  const isError = question.MatchingQuestion.some((matchQuestion) => {
    return getFieldState(matchQuestion?.Id)?.error !== undefined;
  });

  const [AnswersOptions, setAnswersOptions] = useState(question.Answers);
  const [MatchedQuestions, setMatchedQuestions] = useState(
    mapQuestions(question.MatchingQuestion)
  );
  //dangerous code
  const handleDragEnd = (event: DragEndEvent) => {
    const { active, over } = event;
    if (!over) return;
    if (over.id === "AvailableAnswersArea") {
      let inTopAnswers = AnswersOptions.find((Item) => Item.Id == active.id);
      if (inTopAnswers) return;
      let x = Object.keys(MatchedQuestions).find(
        (key) => MatchedQuestions[key]?.Id === active.id
      );
      let y = MatchedQuestions[x];
      setMatchedQuestions((prev) => {
        prev[x] = null;
        return { ...prev };
      });
      let z = [...AnswersOptions, y];
      setAnswersOptions(z);
      return;
    }
    if (!MatchedQuestions[over.id] && over.id !== "AvailableAnswersArea") {
      let mm = null;

      mm = Object.keys(MatchedQuestions).find(
        (key) => MatchedQuestions[key]?.Id === active.id
      );

      setMatchedQuestions((prev) => {
        /* from drop slot to drop slot*/
        if (mm) {
          prev[over.id] = prev[mm];
          prev[mm] = null;
        } else {
          /*from area to drop */
          prev[over.id] = AnswersOptions.find((item) => item.Id === active.id);
        }
        return { ...prev };
      });
      setAnswersOptions((prev) => {
        return prev.filter((item) => item.Id !== active.id);
      });
      return;
    }
    if (MatchedQuestions[over.id]) {
      let mm = null;

      mm = Object.keys(MatchedQuestions).find(
        (key) => MatchedQuestions[key]?.Id === active.id
      );

      if (mm) {
        setMatchedQuestions((prev) => {
          /* from drop slot to drop slot*/
          let as = prev[over.id];
          prev[over.id] = prev[mm];
          prev[mm] = as;
          return { ...prev };
        });
      } else {
        let sourFilm = MatchedQuestions[over.id];
        let tragAnswer = AnswersOptions.find((item) => item.Id === active.id);
        let sad = AnswersOptions.filter((item) => item.Id !== tragAnswer.Id);
        setAnswersOptions([...sad, sourFilm]);
        let asds = Object.keys(MatchedQuestions).find(
          (key) => MatchedQuestions[key]?.Id === sourFilm.Id
        );
        setMatchedQuestions((prev) => {
          prev[asds] = tragAnswer;
          return { ...prev };
        });
      }
    }
  };

  useEffect(() => {
    async function updateFormValue() {
      Object.keys(MatchedQuestions).map(async (key) => {
        await setValue(key, MatchedQuestions[key]);
      });
      //to run vaildation for this question after submit and if one answer not answered
      const isMatchingQuestionFull = Object.keys(MatchedQuestions).some(
        (key) => {
          return MatchedQuestions[key] != null;
        }
      );
      if (isMatchingQuestionFull && isSubmitted) {
        Object.keys(MatchedQuestions).map((key) => {
          trigger(key);
        });
      }
    }
    updateFormValue();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [MatchedQuestions]);

  // Debounced MatchedQuestions
  const debouncedPlacedAnswers = useDebounce(MatchedQuestions, 1000);
  useEffect(() => {
    console.log(`Debounced Arrange Answer :`, debouncedPlacedAnswers);
  }, [debouncedPlacedAnswers]);
  return (
    <div>
      <h2 className="text-lg font-bold flex items-center mb-3">
        <span className="bg-black text-white rounded-full w-6 h-6 flex items-center justify-center text-sm mr-2">
          {index}
        </span>
        Match the right answers
      </h2>
      <div
        className={`p-4 border  rounded-xl shadow-sm ${
          isError && "border-red-500"
        }`}
      >
        <DndContext onDragEnd={handleDragEnd}>
          {/* Render Available Answers in Top List */}
          <AvailableAnswersArea answers={AnswersOptions} />

          {/* Matching Questions as Drop Targets */}
          <ul className="flex flex-col justify-center items-center ">
            {question.MatchingQuestion.map((q) => (
              <li className="w-full flex items-center p-2 border-b last:border-b-0">
                <p className="font-medium flex-1">{q.ContentQuestion}</p>
                <DroppableSlot
                  slotId={q.Id}
                  MatchedQuestions={MatchedQuestions}
                />
              </li>
            ))}
          </ul>
        </DndContext>
      </div>
    </div>
  );
}
// Draggable Answer Component
function AnswerCard({ answer }: { answer: MatchingAnswer }) {
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
// Droppable Answer Slot (For Drop Area)
function DroppableSlot({
  slotId,
  MatchedQuestions,
}: {
  slotId: string;
  MatchedQuestions: MappedQuestions;
}) {
  const { isOver, setNodeRef } = useDroppable({ id: slotId });
  const matchedAnswer = MatchedQuestions[slotId];
  return (
    <div
      ref={setNodeRef}
      className=" rounded-lg w-32 h-10 flex items-center justify-center cursor-pointer"
      // ${
      //   matchedAnswer && "border-none"
      // } ${isOver ? "bg-purple-400" : ""}`}
    >
      {matchedAnswer ? (
        <AnswerCard answer={matchedAnswer} />
      ) : (
        <div className="bg-gray-100 rounded flex justify-center items-center w-[90%] h-[95%]">
          drop here
        </div>
      )}
    </div>
  );
}
function AvailableAnswersArea({ answers }: { answers: MatchingAnswer[] }) {
  const { setNodeRef } = useDroppable({
    id: "AvailableAnswersArea",
  });

  return (
    <div className="bg-gray-200 min-w-50 min-h-[4.5rem] py-4 flex flex-wrap justify-center rounded ">
      <div
        ref={setNodeRef}
        className="flex flex-wrap justify-center gap-4 h-full w-full"
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
type MappedQuestions = Record<string, null>;
function mapQuestions(questions: MatchingQuestionItem[]): MappedQuestions {
  return questions.reduce((acc, question) => {
    acc[question.Id] = null;
    return acc;
  }, {} as MappedQuestions);
}
