import React from "react";
import { cn } from "@/services/libs/cn";

interface BadgeProps {
  variant?: "primary" | "secondary" | "success" | "warning" | "danger" | "info";
  size?: "sm" | "md" | "lg";
  className?: string;
  children: React.ReactNode;
}

const variants = {
  primary: "bg-accent-light text-accent",
  secondary: "bg-bg-tertiary text-text-secondary",
  success: "bg-state-success-light text-state-success",
  warning: "bg-state-warning-light text-state-warning",
  danger: "bg-state-error-light text-state-error",
  info: "bg-state-info-light text-state-info",
};

const sizes = {
  sm: "px-2 py-1 text-xs",
  md: "px-2.5 py-0.5 text-xs",
  lg: "px-3 py-1 text-sm",
};

export const Badge: React.FC<BadgeProps> = ({
  variant = "secondary",
  size = "md",
  className,
  children,
}) => {
  return (
    <span
      className={cn(
        "inline-flex items-center rounded-full font-medium",
        variants[variant],
        sizes[size],
        className,
      )}
    >
      {children}
    </span>
  );
};
