import React from "react";

interface InputProps extends React.InputHTMLAttributes<HTMLInputElement> {
  variant?: "default" | "compact";
}

export const Input = React.forwardRef<HTMLInputElement, InputProps>(
  ({ className = "", variant = "default", disabled, ...props }, ref) => {
    // Direction C: a light outlined field in the body weight.
    const baseClasses =
      "text-[13px] font-normal text-text placeholder:text-ink-3 bg-transparent border border-line rounded-control text-start transition-colors duration-150";

    const interactiveClasses = disabled
      ? "opacity-60 cursor-not-allowed"
      : "hover:border-line-strong focus:outline-none focus:border-line-strong focus-visible:ring-2 focus-visible:ring-logo-primary/30";

    const variantClasses = {
      default: "h-[34px] px-3",
      compact: "h-[30px] px-[10px]",
    } as const;

    return (
      <input
        ref={ref}
        className={`${baseClasses} ${variantClasses[variant]} ${interactiveClasses} ${className}`}
        disabled={disabled}
        {...props}
      />
    );
  },
);

Input.displayName = "Input";
