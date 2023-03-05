import Start from "./Pages/Start";
import Test from "./Pages/Test";

import { useQuiz } from "./State/Store";

import yellowBlol from "./assets/yellowBlob.svg";
import blueBlob from "./assets/blueBlob.svg";
function App() {
  const currentPhase = useQuiz((s) => s.phase);

  return (
    <>
      <img
        src={yellowBlol}
        alt="yellow blob image"
        className="absolute right-0 w-[30vw]"
      />
      <img
        src={blueBlob}
        alt="yellow blob image"
        className="absolute left-0 bottom-0 w-[30vw]"
      />
      {currentPhase === 0 && <Start />}
      {currentPhase > 0 && <Test />}
      <strong className="pointer-events-none fixed bottom-0 left-0 w-full text-center text-xs opacity-50">
        Developed by: Muhammed Ibrahem
      </strong>
    </>
  );
}

export default App;
