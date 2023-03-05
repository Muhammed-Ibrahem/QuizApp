const Loading = () => {
  return (
    <div className="fixed inset-0 z-[100] flex items-center justify-center bg-black/20">
      <div className="h-16  w-16 animate-spin rounded-full border-2 border-txtColor border-y-transparent"></div>
    </div>
  );
};

export default Loading;
