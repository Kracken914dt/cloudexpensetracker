import React from "react";
import { motion } from "framer-motion";

interface FormSectionProps {
  title: string;
  children: React.ReactNode;
  delay?: number;
}

export const FormSection: React.FC<FormSectionProps> = ({
  title,
  children,
  delay = 0,
}) => {
  return (
    <motion.div
      initial={{ opacity: 0, y: 30 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{
        duration: 0.5,
        delay: delay,
        ease: "easeOut",
      }}
    >
      <motion.h3
        className="text-lg font-medium text-text-primary mb-4"
        initial={{ opacity: 0, x: -20 }}
        animate={{ opacity: 1, x: 0 }}
        transition={{
          delay: delay + 0.1,
          duration: 0.4,
          ease: "easeOut",
        }}
      >
        {title}
      </motion.h3>
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{
          delay: delay + 0.2,
          duration: 0.4,
        }}
      >
        {children}
      </motion.div>
    </motion.div>
  );
};
