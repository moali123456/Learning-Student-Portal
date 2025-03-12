import {
  DndContext,
  DragEndEvent,
  useDraggable,
  useDroppable,
} from "@dnd-kit/core";
import { CSS } from "@dnd-kit/utilities";
import { useEffect, useState } from "react";
import {
  MatchingAnswer,
  MatchingQuestionItem,
  MatchingQuestion as MatchingQuestionType,
} from "../../../api/services/exams.services";
import { useFormContext } from "react-hook-form";

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
    return getFieldState(matchQuestion?.Id)?.error === null;
  });
  const [AnswersOptions, setAnswersOptions] = useState(question.Answers);
  const [MatchedQuestions, setMatchedQuestions] = useState(
    mapQuestions(question.MatchingQuestion)
  );
  //dangerous code
  const handleDragEnd = (event: DragEndEvent) => {
    const { active, over } = event;
    if (!over) return;
    console.log("oveeeer", over, active.id);
    if (over.id === "TopArea") {
      let inTopAnswers = AnswersOptions.find((Item) => Item.Id == active.id);
      if (inTopAnswers) return;
      let x = Object.keys(MatchedQuestions).find(
        (key) => MatchedQuestions[key]?.Id === active.id
      );
      let y = MatchedQuestions[x];
      console.log("xx", x, y, MatchedQuestions, active.id);
      setMatchedQuestions((prev) => {
        prev[x] = null;
        return { ...prev };
      });
      let z = [...AnswersOptions, y];
      console.log("xx topd", z);
      setAnswersOptions(z);
      return;
    }
    if (!MatchedQuestions[over.id] && over.id !== "TopArea") {
      let mm = null;
      console.log("fimal  strfzcvzd", over.id, active.id);
      console.log(
        "fimal mm",
        (mm = Object.keys(MatchedQuestions).find(
          (key) => MatchedQuestions[key]?.Id === active.id
        ))
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
      console.log("fimal strfzcvzd ", MatchedQuestions, over.id, active.id);
      console.log(
        "fimal strfzcvzd mm",
        (mm = Object.keys(MatchedQuestions).find(
          (key) => MatchedQuestions[key]?.Id === active.id
        ))
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
        console.log("fimal strfzcvzd mm ads", tragAnswer, sourFilm);
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
    console.log("fimaMatchedQuestions", MatchedQuestions);
  }, [MatchedQuestions]);
  useEffect(() => {
    // console.log("arrange question error", { isSubmitted });
    async function updateFormValue() {
      Object.keys(MatchedQuestions).map(async (key) => {
        await setValue(key, MatchedQuestions[key]);
      });
      //to run vaildation for this question after submit and if one answer not answered
      // const isPlacedAnswerFull = placedAnswers.some((item) => item != null);
      // if (isPlacedAnswerFull && isSubmitted) {
      //   trigger(question.Id);
      // }
    }
    updateFormValue();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [MatchedQuestions]);

  return (
    <div>
      <h2 className="text-lg font-bold flex items-center mb-3">
        <span className="bg-black text-white rounded-full w-6 h-6 flex items-center justify-center text-sm mr-2">
          {index}
        </span>
        Match the right answers
      </h2>
      <div className="p-4 border rounded-xl shadow-sm">
        <DndContext onDragEnd={handleDragEnd}>
          {/* Render Available Answers in Top List */}
          <AnswersOptionsArea answers={AnswersOptions} />

          {/* Matching Questions as Drop Targets */}
          <ul className="flex flex-col justify-center items-center ">
            {question.MatchingQuestion.map((q) => (
              <li className="w-full flex items-center p-2 border-b last:border-b-0">
                <p className="text-gray-600 flex-1">{q.ContentQuestion}</p>
                <QuestionAnswerDropArea
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
function QuestionAnswerDropArea({
  slotId,
  MatchedQuestions,
}: {
  slotId: string;
  MatchedQuestions: MappedQuestions;
}) {
  const { isOver, setNodeRef } = useDroppable({ id: slotId });
  const matchedAnswer = MatchedQuestions[slotId];
  console.log("DroppableSlot", slotId, MatchedQuestions);
  return (
    <div
      ref={setNodeRef}
      className={`border rounded min-w-36 h-10 flex items-center justify-center cursor-pointer ${
        matchedAnswer && "border-none"
      } ${isOver ? "bg-purple-400" : ""}`}
    >
      {matchedAnswer ? <AnswerCard answer={matchedAnswer} /> : "Drop here"}
    </div>
  );
}
function AnswersOptionsArea({ answers }: { answers: MatchingAnswer[] }) {
  const { setNodeRef } = useDroppable({
    id: "TopArea",
  });

  return (
    <div className="min-w-80 min-h-[4.5rem] py-4 flex justify-center rounded bg-[#EBEBEB]">
      <div ref={setNodeRef} className="flex justify-center gap-4 h-full w-full">
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
