import React from 'react';
import { motion, MotionProps } from 'framer-motion';
import { Loader2 } from 'lucide-react';
import { cn } from '@/services/libs/cn';

interface ButtonProps extends Omit<React.ButtonHTMLAttributes<HTMLButtonElement>, keyof MotionProps> {
  variant?: 'primary' | 'secondary' | 'ghost' | 'error'|'accept';
  size?: 'sm' | 'md' | 'lg';
  loading?: boolean;
  fullWidth?: boolean;
  icon?: React.ReactNode;
  children?: React.ReactNode;
}

const variants = {
  primary: 'bg-accent hover:cursor-pointer hover:bg-accent-hover text-white border-transparent',
  accept: 'bg-state-success hover:cursor-pointer hover:bg-state-success/80 text-white border-transparent',
  error: 'bg-state-error hover:cursor-pointer hover:bg-state-error/80 text-white border-transparent',
  secondary: 'bg-bg-secondary hover:bg-bg-tertiary text-text-primary border-border-primary',
  ghost: 'bg-transparent hover:bg-bg-tertiary/70 text-text-secondary border-transparent'
};

const sizes = {
  sm: 'px-3 py-2 text-sm',
  md: 'px-4 py-3 text-base',
  lg: 'px-6 py-4 text-lg'
};

export const Button: React.FC<ButtonProps> = ({
  variant = 'primary',
  size = 'md',
  loading = false,
  fullWidth = false,
  icon,
  className,
  children,
  disabled,
  onClick,
  type,
  ...props
}) => {
  return (
    <motion.button
      type={type}
      disabled={disabled || loading}
      onClick={onClick}
      className={cn(
        'inline-flex items-center justify-center font-medium rounded-lg border transition-all text-center duration-200 ease-out',
        'focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-accent/50',
        'focus:ring-offset-bg-primary',
        'disabled:opacity-60 disabled:bg-bg-tertiary! disabled:text-text-muted! disabled:cursor-not-allowed',
        variants[variant],
        sizes[size],
        fullWidth && 'w-full',
        className
      )}
      whileHover={!disabled && !loading ? { scale: 1.01 } : {}}
      whileTap={!disabled && !loading ? { scale: 0.99 } : {}}
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{
        duration: 0.3,
        ease: "easeOut"
      }}
      {...props}
    >
      <motion.div
        className="flex items-center"
        animate={loading ? { opacity: 0.8 } : { opacity: 1 }}
        transition={{ duration: 0.2 }}
      >
        {loading ? (
          <motion.div
            className="flex items-center"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.3 }}
          >
            <Loader2 className="w-5 h-5 mr-2 animate-spin" />
            {children}
          </motion.div>
        ) : (
          <motion.div
            className="flex items-center"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.3 }}
          >
            {icon && (
              <motion.span
                initial={{ x: -10, opacity: 0 }}
                animate={{ x: 0, opacity: 1 }}
                transition={{ delay: 0.1, duration: 0.3 }}
              >
                {icon}
              </motion.span>
            )}
            {children}
          </motion.div>
        )}
      </motion.div>
    </motion.button>
  );
};