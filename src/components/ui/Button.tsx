import React from "react";

interface ButtonProps extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  variant?:
    | "primary"
    | "primary-soft"
    | "secondary"
    | "outline"
    | "warning"
    | "danger"
    | "danger-ghost"
    | "ghost";
  size?: "sm" | "md" | "lg";
}

export const Button: React.FC<ButtonProps> = ({
  children,
  className = "",
  variant = "primary",
  size = "md",
  ...props
}) => {
  // Slash buttons (DESIGN.md, Components): the accent fills only the one
  // primary button; secondary is a raised tint with a hairline; quiet buttons
  // are text only; destructive actions are quiet, never red-filled.
  const baseClasses =
    "font-semibold rounded-control border transition-colors focus:outline-none focus-visible:ring-2 focus-visible:ring-logo-primary/40 disabled:opacity-50 disabled:cursor-not-allowed cursor-pointer";

  const variantClasses = {
    primary:
      "text-on-accent bg-accent border-accent hover:bg-accent/90 hover:border-accent/90",
    "primary-soft": "text-text bg-wash border-line hover:bg-selected",
    secondary: "text-text bg-wash border-line hover:bg-selected",
    // For screens where secondary's grey fill reads as disabled (onboarding)
    outline: "text-text bg-transparent border-line-strong hover:bg-wash",
    // Secondary's resting look; hover uses the warning tint, for buttons
    // sitting on warning surfaces like SecureInputWarning
    warning:
      "text-text bg-wash border-line hover:bg-warning-wash hover:border-warning",
    danger: "text-error bg-error-wash border-error/40 hover:border-error",
    "danger-ghost":
      "text-error border-transparent hover:bg-error-wash focus:bg-error-wash",
    ghost: "text-current border-transparent hover:bg-wash focus:bg-wash",
  };

  const sizeClasses = {
    sm: "px-2 py-1 text-xs",
    md: "px-3 py-[5px] text-[12.5px]",
    lg: "px-[14px] py-[7px] text-[13px]",
  };

  return (
    <button
      className={`${baseClasses} ${variantClasses[variant]} ${sizeClasses[size]} ${className}`}
      {...props}
    >
      {children}
    </button>
  );
};
