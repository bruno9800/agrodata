import React from "react";
import { ComponentPropsWithoutRef } from "react";

type ButtonProps = ComponentPropsWithoutRef<"button">;

const Button = React.forwardRef<HTMLButtonElement, ButtonProps>(
  ({ children, ...props }, forwardRef) => {
    return (
      <button
        {...props}
        ref={forwardRef}
        className="px-4 py-2 rounded bg-green-400 text-white hover:bg-green-500"
      >
        {children}
      </button>
    );
  }
);

export { Button };
