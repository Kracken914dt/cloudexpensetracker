import React, { forwardRef, useState } from "react";
import { motion, AnimatePresence, MotionProps } from "framer-motion";
import { cn } from "@/services/libs/cn";

interface InputProps
  extends Omit<React.InputHTMLAttributes<HTMLInputElement>, keyof MotionProps> {
  label?: string;
  error?: string;
  leftIcon?: React.ReactNode;
  rightIcon?: React.ReactNode;
  onRightIconClick?: () => void;
}

export const Input = forwardRef<HTMLInputElement, InputProps>(
  (
    {
      label,
      error,
      leftIcon,
      rightIcon,
      onRightIconClick,
      className,
      onFocus,
      onBlur,
      ...props
    },
    ref,
  ) => {
    const [isFocused, setIsFocused] = useState(false);

    const handleFocus = (e: React.FocusEvent<HTMLInputElement>) => {
      setIsFocused(true);
      onFocus?.(e);
    };

    const handleBlur = (e: React.FocusEvent<HTMLInputElement>) => {
      setIsFocused(false);
      onBlur?.(e);
    };

    return (
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.3, ease: "easeOut" }}
      >
        {label && (
          <motion.label
            htmlFor={props.id}
            className="block text-sm font-medium text-text-secondary mb-2"
            initial={{ opacity: 0, x: -10 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ delay: 0.1, duration: 0.3 }}
          >
            {label}
          </motion.label>
        )}

        <div className="relative">
          {leftIcon && (
            <motion.div
              className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none z-10"
              initial={{ opacity: 0, scale: 0.8 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ delay: 0.2, duration: 0.3 }}
              aria-hidden
            >
              <span
                className={cn(
                  "h-5 w-5 transition-colors duration-200",
                  isFocused ? "text-accent" : "text-text-muted",
                )}
              >
                {leftIcon}
              </span>
            </motion.div>
          )}

          <motion.input
            ref={ref}
            className={cn(
              "relative z-0",
              "block w-full py-3 border rounded-lg transition-all duration-200",
              "bg-bg-card",
              "border-border-primary",
              "text-text-primary",
              "placeholder-text-muted",
              "focus:outline-none focus:ring-2 focus:ring-accent/50 focus:border-accent",
              leftIcon ? "pl-10" : "pl-3",
              rightIcon ? "pr-10" : "pr-3",
              error &&
                "border-state-error focus:ring-state-error/50 focus:border-state-error",
              className,
            )}
            onFocus={handleFocus}
            onBlur={handleBlur}
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.15, duration: 0.3 }}
            {...props}
          />

          {rightIcon && (
            <motion.div
              className="absolute inset-y-0 right-0 pr-3 flex items-center z-10"
              initial={{ opacity: 0, scale: 0.8 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ delay: 0.25, duration: 0.3 }}
            >
              {onRightIconClick ? (
                <motion.button
                  type="button"
                  className="text-text-muted hover:text-text-secondary focus:outline-none focus:text-text-secondary"
                  onClick={onRightIconClick}
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.98 }}
                  transition={{ duration: 0.2 }}
                >
                  {rightIcon}
                </motion.button>
              ) : (
                <span className="h-5 w-5 text-text-muted">{rightIcon}</span>
              )}
            </motion.div>
          )}
        </div>

        <AnimatePresence mode="wait">
          {error && (
            <motion.p
              className="mt-2 text-sm text-state-error"
              initial={{ opacity: 0, y: -10, height: 0 }}
              animate={{ opacity: 1, y: 0, height: "auto" }}
              exit={{ opacity: 0, y: -10, height: 0 }}
              transition={{ duration: 0.3, ease: "easeOut" }}
            >
              {error}
            </motion.p>
          )}
        </AnimatePresence>
      </motion.div>
    );
  },
);

Input.displayName = "Input";
