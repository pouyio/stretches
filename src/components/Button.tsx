import React, { PropsWithChildren } from "react";

export const Button: React.FC<
  PropsWithChildren<{
    onClick: React.DOMAttributes<HTMLButtonElement>["onClick"];
    className?: string;
    disabled?: boolean;
  }>
> = ({ children, onClick, className = "", disabled }) => {
  return (
    <button
      disabled={disabled}
      onClick={(e) => !disabled && onClick && onClick(e)}
      className={`border border-white rounded-full px-8 py-4 ${className} ${
        disabled ? " opacity-50" : ""
      }`}
    >
      {children}
    </button>
  );
};
