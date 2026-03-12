import React, { forwardRef } from "react";
import { motion } from "framer-motion";
import { ChevronDown } from "lucide-react";
import { cn } from "@/services/libs/cn";

interface SelectProps
  extends Omit<React.SelectHTMLAttributes<HTMLSelectElement>, "size"> {
  label?: string;
  error?: string;
  variant?: "default" | "outline" | "filled";
  selectSize?: "sm" | "md" | "lg";
}

const selectVariants = {
  default:
    "bg-bg-card border-border-primary focus:ring-accent/50 focus:border-accent",
  outline:
    "bg-transparent border-2 border-border-primary focus:ring-accent/30 focus:border-accent",
  filled:
    "bg-bg-secondary border-transparent focus:bg-bg-card focus:ring-accent/50",
};

const selectSizes = {
  sm: "px-3 py-1.5 text-sm pr-8",
  md: "px-3 py-2 text-sm pr-9",
  lg: "px-4 py-3 text-base pr-10",
};

const chevronSizes = {
  sm: "right-2 w-4 h-4",
  md: "right-2.5 w-4 h-4",
  lg: "right-3 w-5 h-5",
};

export const Select = forwardRef<HTMLSelectElement, SelectProps>(
  (
    {
      label,
      error,
      variant = "default",
      selectSize = "md",
      className,
      children,
      ...props
    },
    ref,
  ) => {
    return (
      <motion.div
        initial={{ opacity: 0, y: 10 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.3 }}
      >
        {label && (
          <label className="block text-sm font-medium text-text-secondary mb-1">
            {label}
          </label>
        )}

        <div className="relative">
          <select
            ref={ref}
            className={cn(
              "w-full border rounded-lg transition-all duration-200 appearance-none",
              "text-text-primary",
              "focus:outline-none focus:ring-2",
              selectVariants[variant],
              selectSizes[selectSize],
              error &&
                "border-state-error focus:ring-state-error/50 focus:border-state-error",
              className,
            )}
            {...props}
          >
            {children}
          </select>

          <div
            className={cn(
              "absolute top-1/2 transform -translate-y-1/2 pointer-events-none text-text-muted",
              chevronSizes[selectSize],
            )}
          >
            <ChevronDown />
          </div>
        </div>

        {error && (
          <motion.p
            className="mt-1 text-sm text-state-error"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.3 }}
          >
            {error}
          </motion.p>
        )}
      </motion.div>
    );
  },
);

Select.displayName = "Select";
