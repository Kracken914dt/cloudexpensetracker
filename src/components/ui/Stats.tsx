import React from 'react';
import { motion } from 'framer-motion';
import { cn } from '@/services/libs/cn';

interface StatProps {
  label: string;
  value: string | number;
  icon?: React.ReactNode;
  iconColor?: string;
  delay?: number;
  className?: string;
}

export const Stat: React.FC<StatProps> = ({ 
  label, 
  value, 
  icon, 
  iconColor = 'text-blue-600 dark:text-blue-400', 
  delay = 0,
  className 
}) => {
  return (
    <motion.div
      className={cn(
        'bg-bg-card p-6 rounded-lg shadow-sm border border-border-primary',
        className
      )}
      initial={{ opacity: 0, scale: 0.95 }}
      animate={{ opacity: 1, scale: 1 }}
      transition={{ duration: 0.3, delay, ease: "easeOut" }}
    >
      <div className="flex items-center">
        {icon && (
          <div className={cn('h-8 w-8', iconColor)}>
            {icon}
          </div>
        )}
        <div className={cn('ml-4', !icon && 'ml-0')}>
          <p className="text-sm font-medium text-text-secondary">{label}</p>
          <p className="text-2xl font-bold text-text-primary">{value}</p>
        </div>
      </div>
    </motion.div>
  );
};