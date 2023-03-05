import { useState } from "react";
import { useQuiz } from "../State/Store";
import Button from "../Components/Button";
import Question from "../Components/Question";

const Test = () => {
  let result = 0;
  const {
    Questions,
    loading,
    correctAnswers,
    userAnswers,
    phase,
    setPhase,
    setSubmitedAnswers,
  } = useQuiz();
  const [getAnswers, setGetAnswers] = useState([]);

  const handleAnswers = (e) => {
    e.preventDefault();
    if (phase === 1) {
      setSubmitedAnswers(getAnswers);
    }
    if (phase === 2) {
      setPhase(0);
    }
  };

  const getChoices = (choice) => {
    setGetAnswers((prevState) => {
      const exists = [...prevState].find((e) => e?.id === choice?.id);
      if (exists) {
        exists.answer = choice.answer;
        return [...prevState].map((el) => (el.id === exists.id ? exists : el));
      }

      return [...prevState, choice];
    });
  };

  for (let i = 0; i < 5; i++) {
    if (correctAnswers[i]?.answer === userAnswers[i]?.answer) result++;
  }

  return (
    <main className="flex min-h-screen items-center justify-center p-4">
      <form
        onSubmit={handleAnswers}
        className="mx-auto w-full max-w-[800px] space-y-3"
      >
        {!loading &&
          Questions.map((e) => {
            return <Question setAnswer={getChoices} key={e.id} {...e} />;
          })}
        <div
          className={`gap-4 ${
            phase === 2 ? "flex flex-col items-center sm:flex-row" : ""
          }`}
        >
          {phase === 2 && <p>You scored {result}/5 correct answers</p>}
          <Button
            disabled={getAnswers.length < 5}
            extra="py-2 px-[22px] mx-auto"
          >
            {phase === 1 ? "Check Answers" : "Play again"}
          </Button>
        </div>
      </form>
    </main>
  );
};

export default Test;
