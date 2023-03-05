import { useState } from "react";
import { useQuiz } from "../State/Store";

const Question = ({ title, answers, id, setAnswer }) => {
  const { phase, correctAnswers, userAnswers } = useQuiz((s) => ({
    phase: s.phase,
    correctAnswers: s.correctAnswers,
    userAnswers: s.userAnswers,
  }));

  const [active, setActive] = useState(null);
  const handleActiveClass = (e) => {
    if (e.target.tagName !== "LI") return;
    const choosed = answers.find((el) => el.id === e.target.id);
    if (phase === 1) {
      setActive(e.target.id);
      setAnswer({
        id: id,
        answer: choosed.answer,
      });
    }
  };

  let ans;
  return (
    <>
      <div>
        <strong
          className="mb-3 block font-Karla text-sm xs:text-base"
          dangerouslySetInnerHTML={{ __html: title }}
        />
        <ul
          onClick={handleActiveClass}
          className="flex w-full flex-col flex-wrap gap-3 xs:flex-row"
        >
          {answers.map((e) => {
            let ON = active === e.id ? " activeVal" : "";
            let cr = "";
            let incr = "";
            if (phase === 2) {
              ON = "";
              if (
                userAnswers.find((el) => el.answer === e.answer)?.answer !==
                correctAnswers.find((el) => el.answer === e.answer)?.answer
              ) {
                incr = "bg-incorrectColor opacity-50";
                ans = "✕";
              }
              if (correctAnswers.find((el) => el.answer === e.answer)) {
                incr = "";
                cr = "bg-correctColor opacity-100";
                if (!ans) ans = "✔";
              }
            }

            return (
              <li
                key={e.id}
                id={e.id}
                className={`flex cursor-pointer items-center justify-center rounded-lg border border-borderColor bg-OffWhite py-2 px-4 text-xs font-medium leading-[12px] transition-all ${ON} ${incr} ${cr}`}
                dangerouslySetInnerHTML={{ __html: e.answer }}
              />
            );
          })}
          {ans && (
            <span
              className={`ml-auto flex  h-8 w-8 items-center justify-center rounded-full ${
                ans === "✕"
                  ? "bg-incorrectColor text-white"
                  : "bg-correctColor text-white"
              }`}
            >
              {ans}
            </span>
          )}
        </ul>
      </div>
      <hr />
    </>
  );
};

export default Question;
