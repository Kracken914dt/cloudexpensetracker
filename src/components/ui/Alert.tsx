import React from 'react';
import { motion } from 'framer-motion';
import { AlertCircle, CheckCircle } from 'lucide-react';
import { cn } from '@/services/libs/cn';

interface AlertProps {
  variant?: 'error' | 'success';
  title?: string;
  description?: string;
  className?: string;
}

export const Alert: React.FC<AlertProps> = ({
  variant = 'error',
  title,
  description,
  className
}) => {
  const isError = variant === 'error';
  const Icon = isError ? AlertCircle : CheckCircle;

  return (
    <motion.div
      className={cn(
        'p-4 border rounded-lg flex items-start space-x-3',
        isError
          ? 'bg-state-error-light/50 border-state-error/30'
          : 'bg-state-success-light/50 border-state-success/30',
        className
      )}
      initial={{ opacity: 0, scale: 0.95, y: -20 }}
      animate={{ opacity: 1, scale: 1, y: 0 }}
      exit={{ opacity: 0, scale: 0.95, y: -20 }}
      transition={{
        duration: 0.4,
        ease: "easeOut"
      }}
    >
      <motion.div
        initial={{ scale: 0, rotate: -180 }}
        animate={{ scale: 1, rotate: 0 }}
        transition={{
          delay: 0.2,
          duration: 0.5,
          ease: "easeOut"
        }}
      >
        <Icon className={cn(
          'w-5 h-5 mt-0.5 flex-shrink-0',
          isError ? 'text-state-error' : 'text-state-success'
        )} />
      </motion.div>
      <motion.div
        initial={{ opacity: 0, x: -20 }}
        animate={{ opacity: 1, x: 0 }}
        transition={{
          delay: 0.3,
          duration: 0.4,
          ease: "easeOut"
        }}
      >
        {title && (
          <motion.p
            className={cn(
              'text-sm font-semibold',
              isError ? 'text-state-error' : 'text-state-success'
            )}
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.4, duration: 0.3 }}
          >
            {title}
          </motion.p>
        )}
        {description && (
          <motion.p
            className={cn(
              'text-sm mt-1',
              isError ? 'text-state-error/80' : 'text-state-success/80'
            )}
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.5, duration: 0.3 }}
          >
            {description}
          </motion.p>
        )}
      </motion.div>
    </motion.div>
  );
};
