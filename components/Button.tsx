import React, { forwardRef } from "react";
import { twMerge } from "tailwind-merge";

interface ButtonProps extends React.ButtonHTMLAttributes<HTMLButtonElement> {}

const Button = forwardRef<HTMLButtonElement, ButtonProps>(
  // Destructure the props and assign default values
  ({ className, children, disabled, type = "button", ...props }, ref) => {
    return (
      <button
        // Assign the button type
        type={type}
        className={twMerge(
          // Merge the provided className with the default styles
          `
            w-full
            rounded-full
            bg-green-500
            border-border-transparent
            px-3
            py-3
            disabled:cursor-not-allowed
            disabled:opacity-50
            text-black
            font-bold
            hover:opacity-75
            transition
          `,
          className
        )}
        // Set the disabled state
        disabled={disabled}
        // Assign the ref to the button element
        ref={ref}
        // Spread the remaining props
        {...props}
      >
        {children}
      </button>
    );
  }
);

// Set the display name for the Button component
Button.displayName = "Button";

export default Button;
