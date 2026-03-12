import React from "react";
import { motion } from "framer-motion";
import { cn } from "@/services/libs/cn";

interface TableProps {
  className?: string;
  children: React.ReactNode;
}

interface TableHeaderProps {
  children: React.ReactNode;
}

interface TableBodyProps {
  children: React.ReactNode;
}

interface TableRowProps {
  className?: string;
  children: React.ReactNode;
  onClick?: () => void;
}

interface TableHeadProps {
  className?: string;
  style?: React.CSSProperties;
  children: React.ReactNode;
}

interface TableCellProps {
  className?: string;
  style?: React.CSSProperties;
  children: React.ReactNode;
  rowSpan?: number;
  colSpan?: number;
}

export const Table: React.FC<TableProps> = ({ className, children }) => {
  return (
    <div className="w-full overflow-x-auto">
      <table
        className={cn("min-w-full divide-y divide-border-secondary", className)}
      >
        {children}
      </table>
    </div>
  );
};

export const TableHeader: React.FC<TableHeaderProps> = ({ children }) => {
  return <thead className="bg-bg-secondary/50">{children}</thead>;
};

export const TableBody: React.FC<TableBodyProps> = ({ children }) => {
  return (
    <tbody className="bg-bg-card divide-y divide-border-secondary">
      {children}
    </tbody>
  );
};

export const TableRow: React.FC<TableRowProps> = ({
  className,
  children,
  onClick,
}) => {
  return (
    <motion.tr
      className={cn(
        "hover:bg-bg-secondary/50 transition-colors duration-150",
        className,
      )}
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ duration: 0.2 }}
      onClick={onClick}
    >
      {children}
    </motion.tr>
  );
};

export const TableHead: React.FC<TableHeadProps> = ({
  className,
  style,
  children,
}) => {
  return (
    <th
      className={cn(
        "px-4 py-3 text-left text-xs font-medium text-text-muted uppercase tracking-wider",
        className,
      )}
      style={style}
    >
      {children}
    </th>
  );
};

export const TableCell: React.FC<TableCellProps> = ({
  className,
  style,
  children,
  rowSpan,
  colSpan,
}) => {
  return (
    <td
      className={cn("px-4 py-4 text-sm text-text-primary", className)}
      style={style}
      rowSpan={rowSpan}
      colSpan={colSpan}
    >
      {children}
    </td>
  );
};
