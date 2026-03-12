import React from "react";
import { motion } from "framer-motion";
import { cn } from "@/services/libs/cn";

interface CardProps {
  className?: string;
  children: React.ReactNode;
  delay?: number;
}

export const Card: React.FC<CardProps> = ({
  className,
  children,
  delay = 0,
}) => {
  return (
    <motion.div
      className={cn(
        "bg-bg-card rounded-lg shadow-sm border border-border-secondary",
        className,
      )}
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.3, delay, ease: "easeOut" }}
    >
      {children}
    </motion.div>
  );
};
