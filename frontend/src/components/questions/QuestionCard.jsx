import Button from "../common/Button";
import { useState } from "react";

export default function QuestionCard({question, onAnswer}){
  const [open, setOpen] = useState(false);

  return (
    <div className="bg-white shadow-md rounded-lg p-5 mt-4 hover:shadow-lg transition-shadow">
      <div
        className="flex justify-between items-start cursor-pointer gap-4"
        onClick={() => setOpen(!open)}
      >
        <div className="flex-1">
          <h3 className="font-semibold text-gray-900 text-lg">{question.text}</h3>
          <p className="text-sm text-gray-500 mt-1">{question.answers.length} answer(s)</p>
        </div>
        <Button
          onClick={(e) => {
            e.stopPropagation();
            onAnswer(question._id);
          }}
        >
          Answer
        </Button>
      </div>

      {open && (
        <div className="mt-4 space-y-3 border-t pt-4">
          {question.answers.length === 0 ? (
            <p className="text-gray-500 italic">No answers yet</p>
          ) : (
            question.answers.map(a => (
              <div key={a._id} className="bg-blue-50 p-3 rounded-lg border-l-4 border-blue-400">
                <p className="text-gray-800">{a.text}</p>
              </div>
            ))
          )}
        </div>
      )}
    </div>
  );
}


