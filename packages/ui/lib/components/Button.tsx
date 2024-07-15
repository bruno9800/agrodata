import { ComponentPropsWithoutRef, forwardRef } from "react";

type ButtonProps = ComponentPropsWithoutRef<"button">;

const Button = forwardRef<HTMLButtonElement, ButtonProps>(
  ({ children, ...props }, forwardRef) => {
    return (
      <button
        {...props}
        className="px-4 py-2 bg-green-400 rounded hover:bg-green-500"
        ref={forwardRef}
      >
        {children}
      </button>
    );
  }
);

export default Button;
