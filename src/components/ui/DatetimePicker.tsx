"use client";

import React, { useState, useRef, useEffect } from "react";
import {
  Calendar,
  Clock,
  ChevronDown,
  ChevronLeft,
  ChevronRight,
} from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";
import { getColombiaTime } from "@/services/libs/Dateutils";

interface DateTimePickerProps {
  value?: string;
  onChange: (value: string) => void;
  label?: string;
  error?: string;
  placeholder?: string;
  disabled?: boolean;
  className?: string;
  defaultDate?: Date;
}

const DateTimePicker: React.FC<DateTimePickerProps> = ({
  value = "",
  onChange,
  label,
  error,
  placeholder = "Seleccionar fecha y hora",
  disabled = false,
  className = "",
  defaultDate,
}) => {
  const getInitialDate = () => {
    if (value) return new Date(value);
    if (defaultDate) return defaultDate;
    return new Date();
  };

  const [isOpen, setIsOpen] = useState(false);
  const [activeTab, setActiveTab] = useState<"date" | "time">("date");
  const [selectedDate, setSelectedDate] = useState<Date>(getInitialDate());
  const [tempDate, setTempDate] = useState<Date>(getInitialDate());
  const [currentMonth, setCurrentMonth] = useState(getInitialDate());

  const containerRef = useRef<HTMLDivElement>(null);

  const months = [
    "Enero",
    "Febrero",
    "Marzo",
    "Abril",
    "Mayo",
    "Junio",
    "Julio",
    "Agosto",
    "Septiembre",
    "Octubre",
    "Noviembre",
    "Diciembre",
  ];

  const weekDays = ["Dom", "Lun", "Mar", "Mié", "Jue", "Vie", "Sáb"];

  useEffect(() => {
    if (value) {
      const date = new Date(value);
      setSelectedDate(date);
      setTempDate(date);
      setCurrentMonth(date);
    } else if (defaultDate) {
      setTempDate(defaultDate);
      setCurrentMonth(defaultDate);
    }
  }, [value, defaultDate]);

  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (
        containerRef.current &&
        !containerRef.current.contains(event.target as Node)
      ) {
        setIsOpen(false);
      }
    };

    if (isOpen) {
      document.addEventListener("mousedown", handleClickOutside);
    }

    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, [isOpen]);

  const formatDisplayValue = (date: Date) => {
    return date.toLocaleString("es-CO", {
      year: "numeric",
      month: "2-digit",
      day: "2-digit",
      hour: "2-digit",
      minute: "2-digit",
      hour12: true,
    });
  };

  const formatISOValue = (date: Date) => {
    const year = date.getFullYear();
    const month = String(date.getMonth() + 1).padStart(2, "0");
    const day = String(date.getDate()).padStart(2, "0");
    const hours = String(date.getHours()).padStart(2, "0");
    const minutes = String(date.getMinutes()).padStart(2, "0");

    return `${year}-${month}-${day}T${hours}:${minutes}:00`;
  };

  const getDaysInMonth = (date: Date) => {
    const year = date.getFullYear();
    const month = date.getMonth();
    const firstDay = new Date(year, month, 1);
    const lastDay = new Date(year, month + 1, 0);
    const daysInMonth = lastDay.getDate();
    const startingDayOfWeek = firstDay.getDay();

    const days = [];

    for (let i = startingDayOfWeek - 1; i >= 0; i--) {
      const day = new Date(year, month, -i);
      days.push({ date: day, isCurrentMonth: false });
    }

    for (let i = 1; i <= daysInMonth; i++) {
      const day = new Date(year, month, i);
      days.push({ date: day, isCurrentMonth: true });
    }

    const remainingCells = 42 - days.length;
    for (let i = 1; i <= remainingCells; i++) {
      const day = new Date(year, month + 1, i);
      days.push({ date: day, isCurrentMonth: false });
    }

    return days;
  };

  const handleDateClick = (date: Date) => {
    const newDate = new Date(tempDate);
    newDate.setFullYear(date.getFullYear());
    newDate.setMonth(date.getMonth());
    newDate.setDate(date.getDate());
    setTempDate(newDate);
  };

  const handleTimeChange = (type: "hour" | "minute", value: number) => {
    const newDate = new Date(tempDate);
    if (type === "hour") {
      newDate.setHours(value);
    } else {
      newDate.setMinutes(value);
    }
    setTempDate(newDate);
  };

  const handleConfirm = () => {
    setSelectedDate(tempDate);
    onChange(formatISOValue(tempDate));
    setIsOpen(false);
  };

  const handleCancel = () => {
    setTempDate(selectedDate);
    setIsOpen(false);
  };

  const navigateMonth = (direction: "prev" | "next") => {
    const newMonth = new Date(currentMonth);
    if (direction === "prev") {
      newMonth.setMonth(newMonth.getMonth() - 1);
    } else {
      newMonth.setMonth(newMonth.getMonth() + 1);
    }
    setCurrentMonth(newMonth);
  };

  const isToday = (date: Date) => {
    const today = new Date();
    return (
      date.getDate() === today.getDate() &&
      date.getMonth() === today.getMonth() &&
      date.getFullYear() === today.getFullYear()
    );
  };

  const isSelected = (date: Date) => {
    return (
      date.getDate() === tempDate.getDate() &&
      date.getMonth() === tempDate.getMonth() &&
      date.getFullYear() === tempDate.getFullYear()
    );
  };

  const renderDatePicker = () => (
    <div className="p-4">
      {/* Header del calendario */}
      <div className="flex items-center justify-between mb-4">
        <button
          type="button"
          onClick={() => navigateMonth("prev")}
          className="p-1 rounded-md hover:bg-bg-tertiary transition-colors"
        >
          <ChevronLeft size={20} />
        </button>

        <h3 className="text-lg font-semibold">
          {months[currentMonth.getMonth()]} {currentMonth.getFullYear()}
        </h3>

        <button
          type="button"
          onClick={() => navigateMonth("next")}
          className="p-1 rounded-md hover:bg-bg-tertiary transition-colors"
        >
          <ChevronRight size={20} />
        </button>
      </div>

      {/* Días de la semana */}
      <div className="grid grid-cols-7 gap-1 mb-2">
        {weekDays.map((day) => (
          <div
            key={day}
            className="h-10 flex items-center justify-center text-sm font-medium text-text-secondary"
          >
            {day}
          </div>
        ))}
      </div>

      {/* Calendario */}
      <div className="grid grid-cols-7 gap-1">
        {getDaysInMonth(currentMonth).map(({ date, isCurrentMonth }, index) => (
          <button
            key={index}
            type="button"
            onClick={() => handleDateClick(date)}
            className={`
              h-10 w-10 flex items-center justify-center text-sm rounded-md transition-all
              ${
                !isCurrentMonth
                  ? "text-text-muted hover:bg-bg-tertiary"
                  : "text-text-primary hover:bg-blue-50 dark:hover:bg-blue-900/20"
              }
              ${
                isSelected(date)
                  ? "bg-blue-600 text-white hover:bg-blue-700"
                  : ""
              }
              ${
                isToday(date) && !isSelected(date)
                  ? "bg-blue-100 dark:bg-blue-900/30 text-blue-700 dark:text-blue-300"
                  : ""
              }
            `}
          >
            {date.getDate()}
          </button>
        ))}
      </div>
    </div>
  );

  const renderTimePicker = () => (
    <div className="p-4">
      <div className="flex items-center justify-center space-x-4">
        {/* Selector de hora */}
        <div className="text-center">
          <label className="block text-sm font-medium text-text-secondary mb-2">
            Hora
          </label>
          <div className="flex flex-col items-center space-y-1">
            <button
              type="button"
              onClick={() => {
                const newHour =
                  tempDate.getHours() === 23 ? 0 : tempDate.getHours() + 1;
                handleTimeChange("hour", newHour);
              }}
              className="p-1 rounded-md hover:bg-bg-tertiary transition-colors"
            >
              <ChevronUp size={16} />
            </button>

            <div className="w-16 h-12 flex items-center justify-center bg-bg-tertiary rounded-md text-lg font-mono">
              {String(tempDate.getHours()).padStart(2, "0")}
            </div>

            <button
              type="button"
              onClick={() => {
                const newHour =
                  tempDate.getHours() === 0 ? 23 : tempDate.getHours() - 1;
                handleTimeChange("hour", newHour);
              }}
              className="p-1 rounded-md hover:bg-bg-tertiary transition-colors"
            >
              <ChevronDown size={16} />
            </button>
          </div>
        </div>

        <div className="text-2xl font-bold">:</div>

        {/* Selector de minutos */}
        <div className="text-center">
          <label className="block text-sm font-medium text-text-secondary mb-2">
            Minutos
          </label>
          <div className="flex flex-col items-center space-y-1">
            <button
              type="button"
              onClick={() => {
                const newMinute =
                  tempDate.getMinutes() === 59 ? 0 : tempDate.getMinutes() + 1;
                handleTimeChange("minute", newMinute);
              }}
              className="p-1 rounded-md hover:bg-bg-tertiary transition-colors"
            >
              <ChevronUp size={16} />
            </button>

            <div className="w-16 h-12 flex items-center justify-center bg-bg-tertiary rounded-md text-lg font-mono">
              {String(tempDate.getMinutes()).padStart(2, "0")}
            </div>

            <button
              type="button"
              onClick={() => {
                const newMinute =
                  tempDate.getMinutes() === 0 ? 59 : tempDate.getMinutes() - 1;
                handleTimeChange("minute", newMinute);
              }}
              className="p-1 rounded-md hover:bg-bg-tertiary transition-colors"
            >
              <ChevronDown size={16} />
            </button>
          </div>
        </div>
      </div>

      {/* Botones rápidos para tiempo */}
      <div className="mt-6 flex flex-wrap gap-2 justify-center">
        {[{ label: "Ahora", action: () => setTempDate(getColombiaTime()) }].map(
          (btn) => (
            <button
              key={btn.label}
              type="button"
              onClick={btn.action}
              className="px-3 py-1 text-sm rounded-md bg-bg-secondary hover:bg-bg-tertiary  transition-colors"
            >
              {btn.label}
            </button>
          ),
        )}
      </div>
    </div>
  );

  return (
    <div ref={containerRef} className={`relative ${className}`}>
      {label && (
        <label className="block text-sm font-medium text-text-secondary mb-2">
          {label}
        </label>
      )}

      <button
        type="button"
        onClick={() => !disabled && setIsOpen(!isOpen)}
        disabled={disabled}
        className={`
          w-full px-3 py-2 border rounded-lg text-left flex items-center justify-between
          transition-colors duration-200
          ${
            disabled
              ? "bg-bg-secondary text-text-muted cursor-not-allowed"
              : "bg-bg-tertiary hover:bg-bg-secondary  cursor-pointer"
          }
          ${
            error
              ? "border-red-300 dark:border-red-600"
              : "border-border-primary focus:border-blue-500 focus:ring-2 focus:ring-blue-200"
          }
        `}
      >
        <div className="flex items-center space-x-2">
          <Calendar size={16} className="text-text-muted" />
          <span className={value ? "text-text-muted" : "text-text-secondary"}>
            {value ? formatDisplayValue(selectedDate) : placeholder}
          </span>
        </div>
        <ChevronDown
          size={16}
          className={`text-text-muted transition-transform duration-200 ${
            isOpen ? "rotate-180" : ""
          }`}
        />
      </button>

      {error && (
        <p className="mt-1 text-sm text-red-600 dark:text-red-400">{error}</p>
      )}

      <AnimatePresence>
        {isOpen && (
          <motion.div
            initial={{ opacity: 0, y: -10 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -10 }}
            transition={{ duration: 0.2 }}
            className="absolute z-50 mt-1 bg-bg-card border border-border-primary rounded-lg shadow-xl"
            style={{ minWidth: "320px" }}
          >
            {/* Tabs */}
            <div className="flex border-b  border-border-primary">
              <button
                type="button"
                onClick={() => setActiveTab("date")}
                className={`flex-1 px-4 py-3 text-sm font-medium flex items-center justify-center space-x-2 transition-colors ${
                  activeTab === "date"
                    ? "bg-blue-50 dark:bg-blue-900/20 text-blue-700 dark:text-blue-300 border-b-2 border-blue-600"
                    : "text-text-secondary hover:text-text-primary dark:hover:text-text-primary"
                }`}
              >
                <Calendar size={16} />
                <span>Fecha</span>
              </button>
              <button
                type="button"
                onClick={() => setActiveTab("time")}
                className={`flex-1 px-4 py-3 text-sm font-medium flex items-center justify-center space-x-2 transition-colors ${
                  activeTab === "time"
                    ? "bg-blue-50 dark:bg-blue-900/20 text-blue-700 dark:text-blue-300 border-b-2 border-blue-600"
                    : "text-text-secondary hover:text-text-primary dark:hover:text-text-primary"
                }`}
              >
                <Clock size={16} />
                <span>Hora</span>
              </button>
            </div>

            {/* Content */}
            <motion.div
              key={activeTab}
              initial={{ opacity: 0, x: activeTab === "date" ? -20 : 20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.2 }}
            >
              {activeTab === "date" ? renderDatePicker() : renderTimePicker()}
            </motion.div>

            {/* Footer */}
            <div className="flex items-center justify-between px-4 py-3 bg-bg-secondary rounded-b-lg border-t border-border-primary ">
              <button
                type="button"
                onClick={handleCancel}
                className="px-3 py-1 text-sm text-text-secondary hover:text-text-primary dark:hover:text-text-primary transition-colors"
              >
                Cancelar
              </button>
              <button
                type="button"
                onClick={handleConfirm}
                className="px-4 py-2 bg-blue-600 text-white text-sm rounded-md hover:bg-blue-700 transition-colors"
              >
                Confirmar
              </button>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
};

// Componente ChevronUp que faltaba
const ChevronUp: React.FC<{ size: number; className?: string }> = ({
  size,
  className = "",
}) => (
  <svg
    width={size}
    height={size}
    viewBox="0 0 24 24"
    fill="none"
    stroke="currentColor"
    strokeWidth="2"
    strokeLinecap="round"
    strokeLinejoin="round"
    className={className}
  >
    <polyline points="18,15 12,9 6,15"></polyline>
  </svg>
);

export default DateTimePicker;
