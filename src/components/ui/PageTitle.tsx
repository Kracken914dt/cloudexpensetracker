'use client';

import React from 'react';
import { motion } from 'framer-motion';

interface PageTitleProps {
  title: string;
  subtitle?: string;
  actions?: React.ReactNode;
}

export const PageTitle: React.FC<PageTitleProps> = ({ 
  title, 
  subtitle, 
  actions 
}) => {
  return (
    <div className="mb-6">
      <div className="flex items-center justify-between">
        <div className="flex-1">
          <motion.h1
            className="text-3xl font-bold text-text-primary"
            initial={{ opacity: 0, y: -10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.3 }}
          >
            {title}
          </motion.h1>
          {subtitle && (
            <motion.p
              className="text-text-secondary mt-2"
              initial={{ opacity: 0, y: -10 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.3, delay: 0.1 }}
            >
              {subtitle}
            </motion.p>
          )}
        </div>

        {actions && (
          <motion.div
            initial={{ opacity: 0, x: 20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.3, delay: 0.2 }}
          >
            {actions}
          </motion.div>
        )}
      </div>
    </div>
  );
};