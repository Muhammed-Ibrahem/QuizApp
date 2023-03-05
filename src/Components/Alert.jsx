import { useQuiz } from "../State/Store";
const Alert = () => {
  const res = useQuiz((s) => s.resetAlert);
  return (
    <div
      onClick={() => {
        res();
      }}
      className="absolute left-0 top-0 z-50  flex h-[50px] w-full animate-SlideDown cursor-pointer items-center justify-center bg-red-400 text-white transition-transform"
    >
      Something went wrong, try changing the options
    </div>
  );
};

export default Alert;
