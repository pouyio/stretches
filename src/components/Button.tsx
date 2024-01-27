import React, { PropsWithChildren } from "react";

export const Button: React.FC<
  PropsWithChildren<{
    onClick: React.DOMAttributes<HTMLButtonElement>["onClick"];
    className?: string;
  }>
> = ({ children, onClick, className = "1" }) => {
  return (
    <button
      onClick={onClick}
      className={"border border-white rounded-full px-8 py-4 " + className}
    >
      {children}
    </button>
  );
};
