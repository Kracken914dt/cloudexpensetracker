"use client";

import { Stat } from "@/components/ui/Stats";
import { SimpleBarChart } from "@/components/ui/SimpleChart";
import { Card } from "@/components/ui/Card";
import { DollarSign, TrendingDown, TrendingUp, Wallet } from "lucide-react";
import { motion } from "framer-motion";
import { Skeleton } from "@/components/ui/Skeleton";
import { useEffect, useState } from "react";
import { ExpenseService } from "@/services/expense/ExpenseService";
import type { IDashboardData, IExpense } from "@/types/expense";
import { useToast } from "@/context/ToastContext";

export default function DashboardPage() {
  const [loading, setLoading] = useState(true);
  const [stats, setStats] = useState<IDashboardData | null>(null);
  const [expenses, setExpenses] = useState<IExpense[]>([]);
  const { addToast } = useToast();

  useEffect(() => {
    const fetchData = async () => {
      try {
        setLoading(true);
        const [dashboardData, expensesData] = await Promise.all([
          ExpenseService.getDashboardStats(),
          ExpenseService.getAll({
            from: new Date(new Date().getFullYear(), new Date().getMonth(), 1)
              .toISOString()
              .split("T")[0],
          }),
        ]);

        setStats(dashboardData);
        setExpenses(expensesData.slice(0, 5)); // Take last 5 for recent transactions
      } catch (error) {
        console.error("Failed to fetch dashboard data:", error);
        addToast("Error al cargar los datos del dashboard", "error");
      } finally {
        setLoading(false);
      }
    };

    fetchData();
  }, [addToast]);

  const statsData = [
    {
      label: "Gasto Total (Mes)",
      value: stats ? `$${stats.monthlyTotal.toFixed(2)}` : "$0.00",
      icon: <Wallet className="w-6 h-6 text-primary" />,
      change: "Este mes",
    },
    // We can add more stats if the API provides them, for now just monthly total is confirmed
  ];

  const chartData =
    stats?.byCategory.map((cat) => ({
      label: cat.category,
      value: cat.total,
      color: "bg-primary",
    })) || [];

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <h2 className="text-3xl font-bold tracking-tight text-foreground">
          Dashboard
        </h2>
      </div>

      <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-4">
        {loading
          ? Array.from({ length: 1 }).map((_, i) => (
              <Card key={i} className="p-6 space-y-2">
                <div className="flex items-center gap-4">
                  <Skeleton className="h-12 w-12 rounded-full" />
                  <div className="space-y-2">
                    <Skeleton className="h-4 w-24" />
                    <Skeleton className="h-6 w-32" />
                  </div>
                </div>
              </Card>
            ))
          : statsData.map((stat, index) => (
              <Stat
                key={stat.label}
                label={stat.label}
                value={stat.value}
                icon={stat.icon}
                change={stat.change}
                delay={index * 0.1}
                className="bg-card text-card-foreground"
              />
            ))}
      </div>

      <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-7">
        <div className="col-span-4">
          {loading ? (
            <Card className="h-full p-6">
              <Skeleton className="h-8 w-48 mb-6" />
              <div className="flex items-end justify-between h-48 gap-4">
                {Array.from({ length: 6 }).map((_, i) => (
                  <Skeleton
                    key={i}
                    className="w-full h-full rounded-t-md opacity-50"
                    style={{ height: `${[40, 70, 30, 80, 50, 60][i]}%` }}
                  />
                ))}
              </div>
            </Card>
          ) : (
            <SimpleBarChart
              title="Gastos por Categoría"
              data={chartData}
              className="h-full"
            />
          )}
        </div>
        <Card className="col-span-3">
          <div className="p-6">
            <h3 className="text-lg font-semibold mb-4 text-foreground">
              Transacciones Recientes
            </h3>
            <div className="space-y-4">
              {loading ? (
                Array.from({ length: 5 }).map((_, i) => (
                  <div
                    key={i}
                    className="flex items-center justify-between p-4"
                  >
                    <div className="flex items-center gap-4">
                      <Skeleton className="h-10 w-10 rounded-full" />
                      <div className="space-y-2">
                        <Skeleton className="h-4 w-32" />
                        <Skeleton className="h-3 w-24" />
                      </div>
                    </div>
                    <div className="space-y-2">
                      <Skeleton className="h-4 w-20" />
                      <Skeleton className="h-3 w-16" />
                    </div>
                  </div>
                ))
              ) : expenses.length > 0 ? (
                expenses.map((tx, i) => (
                  <motion.div
                    key={tx._id}
                    initial={{ opacity: 0, x: -20 }}
                    animate={{ opacity: 1, x: 0 }}
                    transition={{ delay: i * 0.1 }}
                    className="flex items-center justify-between p-4 rounded-lg bg-muted/50 hover:bg-muted transition-colors"
                  >
                    <div className="flex items-center gap-4">
                      <div
                        className={`p-2 rounded-full bg-red-100 text-red-600 dark:bg-red-900/30`}
                      >
                        <TrendingDown size={16} />
                      </div>
                      <div>
                        <p className="font-medium text-foreground">
                          {tx.description}
                        </p>
                        <p className="text-sm text-muted-foreground">
                          {tx.category}
                        </p>
                      </div>
                    </div>
                    <div className="text-right">
                      <p className="font-bold text-red-600">
                        -${tx.amount.toFixed(2)}
                      </p>
                      <p className="text-xs text-muted-foreground">
                        {new Date(tx.date).toLocaleDateString()}
                      </p>
                    </div>
                  </motion.div>
                ))
              ) : (
                <p className="text-center text-muted-foreground py-4">
                  No hay transacciones recientes
                </p>
              )}
            </div>
          </div>
        </Card>
      </div>
    </div>
  );
}
