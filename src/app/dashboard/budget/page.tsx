"use client";

import { motion } from "framer-motion";
import {
  AlertTriangle,
  Edit2,
  Loader2,
  Plus,
  TrendingDown,
  TrendingUp,
  Wallet,
} from "lucide-react";
import { useCallback, useEffect, useState } from "react";
import { Button } from "@/components/ui/Button";
import { Card } from "@/components/ui/Card";
import { Input } from "@/components/ui/Input";
import { Modal } from "@/components/ui/Modal";
import { PageTitle } from "@/components/ui/PageTitle";
import { useToast } from "@/context/ToastContext";
import { BudgetService } from "@/services/budget/BudgetService";
import type { IBudgetResponse } from "@/types/budget";

const MONTHS = [
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

export default function BudgetPage() {
  const [budget, setBudget] = useState<IBudgetResponse | null>(null);
  const [loading, setLoading] = useState(true);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [formData, setFormData] = useState({
    amount: 0,
    month: new Date().getMonth() + 1,
    year: new Date().getFullYear(),
  });

  const { addToast } = useToast();

  const fetchBudget = useCallback(async () => {
    try {
      setLoading(true);
      const data = await BudgetService.getCurrent();
      setBudget(data);
    } catch (error: any) {
      if (error?.response?.status === 404) {
        setBudget(null);
      } else {
        console.error("Error fetching budget:", error);
        addToast("Error al cargar el presupuesto", "error");
      }
    } finally {
      setLoading(false);
    }
  }, [addToast]);

  useEffect(() => {
    fetchBudget();
  }, [fetchBudget]);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);

    try {
      await BudgetService.create({
        amount: formData.amount,
        month: formData.month,
        year: formData.year,
      });
      addToast("Presupuesto creado correctamente", "success");
      setIsModalOpen(false);
      fetchBudget();
    } catch (error: any) {
      const message =
        error?.response?.data?.message || "Error al crear el presupuesto";
      addToast(message, "error");
    } finally {
      setIsSubmitting(false);
    }
  };

  const percentage = budget?.percentageUsed ?? 0;
  const isExceeded = budget?.exceeded ?? false;
  const progressColor = isExceeded
    ? "bg-red-500"
    : percentage > 80
      ? "bg-yellow-500"
      : "bg-green-500";

  const currentMonth = MONTHS[new Date().getMonth()];
  const currentYear = new Date().getFullYear();

  return (
    <div className="space-y-6">
      <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
        <PageTitle
          title="Presupuesto"
          subtitle={`Gestiona tu presupuesto de ${currentMonth} ${currentYear}`}
        />
        <Button onClick={() => setIsModalOpen(true)} className="gap-2">
          <Plus className="w-4 h-4" />
          {budget ? "Actualizar Presupuesto" : "Crear Presupuesto"}
        </Button>
      </div>

      {loading ? (
        <div className="grid gap-6 md:grid-cols-3">
          {[1, 2, 3].map((i) => (
            <Card key={i} className="p-6">
              <div className="space-y-4">
                <div className="h-4 w-24 bg-muted animate-pulse rounded" />
                <div className="h-8 w-32 bg-muted animate-pulse rounded" />
              </div>
            </Card>
          ))}
        </div>
      ) : !budget ? (
        <Card className="p-12 text-center">
          <Wallet className="w-16 h-16 mx-auto text-muted-foreground mb-4" />
          <h3 className="text-xl font-semibold mb-2">
            No hay presupuesto configured
          </h3>
          <p className="text-muted-foreground mb-6">
            Crea un presupuesto para controlar tus gastos mensuales
          </p>
          <Button onClick={() => setIsModalOpen(true)}>
            <Plus className="w-4 h-4 mr-2" />
            Crear Presupuesto
          </Button>
        </Card>
      ) : (
        <div className="space-y-6">
          <div className="grid gap-6 md:grid-cols-3">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.1 }}
            >
              <Card className="p-6">
                <div className="flex items-center gap-4">
                  <div className="p-3 rounded-full bg-primary/10">
                    <Wallet className="w-6 h-6 text-primary" />
                  </div>
                  <div>
                    <p className="text-sm text-muted-foreground">
                      Presupuesto Mensual
                    </p>
                    <p className="text-2xl font-bold">
                      ${budget.budget.amount.toFixed(2)}
                    </p>
                  </div>
                </div>
              </Card>
            </motion.div>

            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.2 }}
            >
              <Card className="p-6">
                <div className="flex items-center gap-4">
                  <div className="p-3 rounded-full bg-red-100 dark:bg-red-900/30">
                    <TrendingDown className="w-6 h-6 text-red-500" />
                  </div>
                  <div>
                    <p className="text-sm text-muted-foreground">Gastado</p>
                    <p className="text-2xl font-bold text-red-500">
                      ${budget.spent.toFixed(2)}
                    </p>
                  </div>
                </div>
              </Card>
            </motion.div>

            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.3 }}
            >
              <Card className="p-6">
                <div className="flex items-center gap-4">
                  <div
                    className={`p-3 rounded-full ${budget.remaining >= 0 ? "bg-green-100 dark:bg-green-900/30" : "bg-red-100 dark:bg-red-900/30"}`}
                  >
                    {budget.remaining >= 0 ? (
                      <TrendingUp className="w-6 h-6 text-green-500" />
                    ) : (
                      <AlertTriangle className="w-6 h-6 text-red-500" />
                    )}
                  </div>
                  <div>
                    <p className="text-sm text-muted-foreground">Restante</p>
                    <p
                      className={`text-2xl font-bold ${budget.remaining >= 0 ? "text-green-500" : "text-red-500"}`}
                    >
                      ${Math.abs(budget.remaining).toFixed(2)}
                    </p>
                  </div>
                </div>
              </Card>
            </motion.div>
          </div>

          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.4 }}
          >
            <Card className="p-6">
              <div className="flex items-center justify-between mb-4">
                <h3 className="text-lg font-semibold">
                  Progreso del Presupuesto
                </h3>
                <span
                  className={`text-sm font-medium ${isExceeded ? "text-red-500" : percentage > 80 ? "text-yellow-500" : "text-green-500"}`}
                >
                  {percentage.toFixed(1)}%
                </span>
              </div>

              <div className="relative h-6 bg-muted rounded-full overflow-hidden">
                <motion.div
                  className={`absolute left-0 top-0 h-full ${progressColor} transition-all duration-500`}
                  initial={{ width: 0 }}
                  animate={{ width: `${Math.min(percentage, 100)}%` }}
                  transition={{ duration: 0.8, ease: "easeOut" }}
                />
                {isExceeded && (
                  <motion.div
                    className="absolute right-0 top-0 h-full w-1 bg-red-500"
                    initial={{ opacity: 0 }}
                    animate={{ opacity: [0.5, 1, 0.5] }}
                    transition={{ duration: 1, repeat: Infinity }}
                  />
                )}
              </div>

              {isExceeded && (
                <motion.div
                  initial={{ opacity: 0, height: 0 }}
                  animate={{ opacity: 1, height: "auto" }}
                  className="mt-4 p-4 bg-red-50 dark:bg-red-900/20 border border-red-200 dark:border-red-800 rounded-lg flex items-center gap-3"
                >
                  <AlertTriangle className="w-5 h-5 text-red-500 flex-shrink-0" />
                  <p className="text-sm text-red-700 dark:text-red-400">
                    Has excedido tu presupuesto por{" "}
                    <strong>${Math.abs(budget.remaining).toFixed(2)}</strong>.
                    Considera ajustar tus gastos para el resto del mes.
                  </p>
                </motion.div>
              )}

              {percentage > 80 && !isExceeded && (
                <motion.div
                  initial={{ opacity: 0, height: 0 }}
                  animate={{ opacity: 1, height: "auto" }}
                  className="mt-4 p-4 bg-yellow-50 dark:bg-yellow-900/20 border border-yellow-200 dark:border-yellow-800 rounded-lg flex items-center gap-3"
                >
                  <AlertTriangle className="w-5 h-5 text-yellow-500 flex-shrink-0" />
                  <p className="text-sm text-yellow-700 dark:text-yellow-400">
                    Has usado el <strong>{percentage.toFixed(1)}%</strong> de tu
                    presupuesto. Te quedan{" "}
                    <strong>${budget.remaining.toFixed(2)}</strong> para el
                    resto del mes.
                  </p>
                </motion.div>
              )}
            </Card>
          </motion.div>

          <Card className="p-6">
            <h3 className="text-lg font-semibold mb-4">
              Detalles del Presupuesto
            </h3>
            <div className="grid gap-4 sm:grid-cols-2">
              <div className="flex items-center justify-between p-4 bg-muted/50 rounded-lg">
                <span className="text-muted-foreground">Período</span>
                <span className="font-medium">
                  {MONTHS[budget.budget.month - 1]} {budget.budget.year}
                </span>
              </div>
              <div className="flex items-center justify-between p-4 bg-muted/50 rounded-lg">
                <span className="text-muted-foreground">Monto Original</span>
                <span className="font-medium">
                  ${budget.budget.amount.toFixed(2)}
                </span>
              </div>
              <div className="flex items-center justify-between p-4 bg-muted/50 rounded-lg">
                <span className="text-muted-foreground">Días restantes</span>
                <span className="font-medium">
                  {Math.max(0, 30 - new Date().getDate())} días
                </span>
              </div>
              <div className="flex items-center justify-between p-4 bg-muted/50 rounded-lg">
                <span className="text-muted-foreground">
                  Promedio diario disponible
                </span>
                <span className="font-medium">
                  $
                  {Math.max(
                    0,
                    budget.remaining / Math.max(1, 30 - new Date().getDate()),
                  ).toFixed(2)}
                </span>
              </div>
            </div>
          </Card>
        </div>
      )}

      <Modal
        onClose={() => setIsModalOpen(false)}
        title={budget ? "Actualizar Presupuesto" : "Crear Presupuesto"}
      >
        <form onSubmit={handleSubmit} className="space-y-4">
          <div>
            <label className="block text-sm font-medium mb-1">
              Monto del Presupuesto
            </label>
            <Input
              type="number"
              step="0.01"
              min="0"
              value={formData.amount}
              onChange={(e) =>
                setFormData({
                  ...formData,
                  amount: parseFloat(e.target.value) || 0,
                })
              }
              placeholder="0.00"
              required
            />
          </div>

          <div className="grid grid-cols-2 gap-4">
            <div>
              <label className="block text-sm font-medium mb-1">Mes</label>
              <select
                value={formData.month}
                onChange={(e) =>
                  setFormData({ ...formData, month: parseInt(e.target.value) })
                }
                className="w-full px-3 py-2 rounded-lg border bg-background text-foreground focus:outline-none focus:ring-2 focus:ring-primary"
              >
                {MONTHS.map((month, index) => (
                  <option key={month} value={index + 1}>
                    {month}
                  </option>
                ))}
              </select>
            </div>
            <div>
              <label className="block text-sm font-medium mb-1">Año</label>
              <select
                value={formData.year}
                onChange={(e) =>
                  setFormData({ ...formData, year: parseInt(e.target.value) })
                }
                className="w-full px-3 py-2 rounded-lg border bg-background text-foreground focus:outline-none focus:ring-2 focus:ring-primary"
              >
                {[currentYear - 1, currentYear, currentYear + 1].map((year) => (
                  <option key={year} value={year}>
                    {year}
                  </option>
                ))}
              </select>
            </div>
          </div>

          <div className="flex gap-3 pt-4">
            <Button
              type="button"
              variant="secondary"
              onClick={() => setIsModalOpen(false)}
              className="flex-1"
            >
              Cancelar
            </Button>
            <Button type="submit" disabled={isSubmitting} className="flex-1">
              {isSubmitting ? (
                <Loader2 className="w-4 h-4 animate-spin" />
              ) : budget ? (
                "Actualizar"
              ) : (
                "Crear"
              )}
            </Button>
          </div>
        </form>
      </Modal>
    </div>
  );
}
