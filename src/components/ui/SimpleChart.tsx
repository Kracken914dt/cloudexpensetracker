"use client";

import { motion } from "framer-motion";
import { cn } from "@/services/libs/cn";

interface DataPoint {
  label: string;
  value: number;
  color?: string;
}

interface SimpleBarChartProps {
  data: DataPoint[];
  title?: string;
  className?: string;
}

export function SimpleBarChart({
  data,
  title,
  className,
}: SimpleBarChartProps) {
  const maxValue = Math.max(...data.map((d) => d.value));

  return (
    <div
      className={cn(
        "bg-card p-6 rounded-lg shadow-sm border border-border",
        className,
      )}
    >
      {title && (
        <h3 className="text-lg font-semibold text-foreground mb-4">{title}</h3>
      )}
      <div className="flex items-end justify-between h-48 gap-4 mt-4">
        {data.map((item, index) => {
          const heightPercentage = (item.value / maxValue) * 100;
          return (
            <div
              key={index}
              className="flex flex-col items-center flex-1 group"
            >
              <div className="relative w-full flex items-end justify-center h-full">
                <motion.div
                  initial={{ height: 0 }}
                  animate={{ height: `${heightPercentage}%` }}
                  transition={{ duration: 0.5, delay: index * 0.1 }}
                  className={cn(
                    "w-full max-w-[40px] rounded-t-md opacity-80 hover:opacity-100 transition-opacity",
                    item.color || "bg-primary",
                  )}
                />
                <div className="absolute -top-8 left-1/2 -translate-x-1/2 bg-popover text-popover-foreground text-xs px-2 py-1 rounded shadow opacity-0 group-hover:opacity-100 transition-opacity whitespace-nowrap pointer-events-none z-10">
                  {item.value.toLocaleString()}
                </div>
              </div>
              <span className="mt-2 text-xs text-muted-foreground truncate w-full text-center">
                {item.label}
              </span>
            </div>
          );
        })}
      </div>
    </div>
  );
}
