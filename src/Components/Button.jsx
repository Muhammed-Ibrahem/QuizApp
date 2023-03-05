import React from "react";

const Button = ({ children, extra, onClick, disabled }) => {
  return (
    <button
      disabled={disabled}
      onClick={onClick}
      className={`${extra} flex items-center justify-center rounded-2xl bg-btnBg tracking-wider text-white ${
        disabled ? "opacity-50" : "opacity-100"
      }`}
    >
      {children}
    </button>
  );
};

export default Button;
