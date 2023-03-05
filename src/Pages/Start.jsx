import { useEffect, useState, useRef } from "react";
import { createPortal } from "react-dom";

import Button from "../Components/Button";
import Choose from "../Components/Choose";
import { useQuiz } from "../State/Store";
import Loading from "../Components/Loading";
import Alert from "../Components/Alert";
const Difficulties = [
  {
    id: 1,
    value: "easy",
    name: "Easy",
  },
  {
    id: 2,
    value: "medium",
    name: "Medium",
  },
  {
    id: 3,
    value: "hard",
    name: "Hard",
  },
];
const types = [
  {
    id: 1,
    value: "multiple",
    name: "Multiple Choice",
  },
  {
    id: 2,
    value: "boolean",
    name: "True / False",
  },
];
const Start = () => {
  const setTest = useQuiz((state) => state.setTest);
  const loading = useQuiz((state) => state.loading);
  const responseFailed = useQuiz((s) => s.responseFailed);
  const [choose, setChoose] = useState({
    Difficulties,
    types,
    categories: [],
  });

  const CategoryRef = useRef();
  const DifficultyRef = useRef();

  const handleSubmit = (e) => {
    e.preventDefault();
    const choiceDataObj = {
      Cat: CategoryRef.current.value,
      Diff: DifficultyRef.current.value,
    };
    setTest(choiceDataObj);
  };

  useEffect(() => {
    fetch("https://opentdb.com/api_category.php")
      .then((res) => res.json())
      .then((data) =>
        setChoose((state) => ({
          ...state,
          categories: data.trivia_categories,
        }))
      );
  }, []);

  return (
    <>
      {loading && createPortal(<Loading />, document.getElementById("loader"))}
      {responseFailed &&
        createPortal(<Alert />, document.getElementById("Alert"))}
      <main className="flex h-screen w-full flex-col items-center justify-center gap-4 bg-bgColor p-4 text-txtColor">
        <header className="mb-2 font-Karla">
          <h1 className="text-4xl">Quiz App</h1>
        </header>
        <form
          onSubmit={handleSubmit}
          className="flex w-full max-w-[400px] flex-col gap-4"
        >
          <Choose
            ref={CategoryRef}
            title="Choose Category"
            options={choose.categories}
            defValue="Any Category"
          />
          <Choose
            ref={DifficultyRef}
            title="Quiz Difficulty"
            defValue="Any Difficulty"
            options={choose.Difficulties}
          />
          <div>
            <Button extra="py-4 px-8 w-[193px] h-[52px] block mx-auto mt-8">
              Start quiz
            </Button>
          </div>
        </form>
      </main>
    </>
  );
};

export default Start;
