"use client";

import { AnimatePresence, motion } from "framer-motion";
import {
  ChevronLeft,
  ChevronRight,
  Edit2,
  Filter,
  Loader2,
  Plus,
  Search,
  Trash2,
  X,
} from "lucide-react";
import { useCallback, useEffect, useState } from "react";

import { Button } from "@/components/ui/Button";
import { Card } from "@/components/ui/Card";
import { Input } from "@/components/ui/Input";
import { Modal } from "@/components/ui/Modal";
import { PageTitle } from "@/components/ui/PageTitle";
import { Skeleton } from "@/components/ui/Skeleton";
import { TableSkeleton } from "@/components/ui/TableSkeleton";
import { useToast } from "@/context/ToastContext";
import { ExpenseService } from "@/services/expense/ExpenseService";
import { cn } from "@/services/libs/cn";
import type {
  ICreateExpenseInput,
  IExpense,
  IUpdateExpenseInput,
} from "@/types/expense";

const CATEGORIES = [
  "Food",
  "Transport",
  "Entertainment",
  "Shopping",
  "Bills",
  "Health",
  "Education",
  "Other",
];

export default function ExpensesPage() {
  const [expenses, setExpenses] = useState<IExpense[]>([]);
  const [loading, setLoading] = useState(true);
  const [searchTerm, setSearchTerm] = useState("");
  const [categoryFilter, setCategoryFilter] = useState("");
  const [dateFrom, setDateFrom] = useState("");
  const [dateTo, setDateTo] = useState("");

  const [isModalOpen, setIsModalOpen] = useState(false);
  const [editingExpense, setEditingExpense] = useState<IExpense | null>(null);
  const [isSubmitting, setIsSubmitting] = useState(false);

  const [deleteModalOpen, setDeleteModalOpen] = useState(false);
  const [expenseToDelete, setExpenseToDelete] = useState<IExpense | null>(null);
  const [isDeleting, setIsDeleting] = useState(false);

  const [formData, setFormData] = useState<ICreateExpenseInput>({
    amount: 0,
    category: "Food",
    description: "",
    date: new Date().toISOString().split("T")[0],
  });

  const { addToast } = useToast();

  const fetchExpenses = useCallback(async () => {
    try {
      setLoading(true);
      const params: Record<string, string> = {};
      if (categoryFilter) params.category = categoryFilter;
      if (dateFrom) params.from = dateFrom;
      if (dateTo) params.to = dateTo;

      const data = await ExpenseService.getAll(params);
      setExpenses(data);
    } catch (error) {
      console.error("Error fetching expenses:", error);
      addToast("Error al cargar los gastos", "error");
    } finally {
      setLoading(false);
    }
  }, [categoryFilter, dateFrom, dateTo, addToast]);

  useEffect(() => {
    fetchExpenses();
  }, [fetchExpenses]);

  const filteredExpenses = expenses.filter((expense) => {
    if (
      searchTerm &&
      !expense.description.toLowerCase().includes(searchTerm.toLowerCase()) &&
      !expense.category.toLowerCase().includes(searchTerm.toLowerCase())
    ) {
      return false;
    }
    return true;
  });

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);

    try {
      if (editingExpense) {
        await ExpenseService.update(editingExpense._id, formData);
        addToast("Gasto actualizado correctamente", "success");
      } else {
        await ExpenseService.create(formData);
        addToast("Gasto creado correctamente", "success");
      }
      setIsModalOpen(false);
      resetForm();
      fetchExpenses();
    } catch (error: any) {
      const message =
        error?.response?.data?.message || "Error al guardar el gasto";
      addToast(message, "error");
    } finally {
      setIsSubmitting(false);
    }
  };

  const handleDelete = async () => {
    if (!expenseToDelete) return;

    setIsDeleting(true);
    try {
      await ExpenseService.delete(expenseToDelete._id);
      addToast("Gasto eliminado correctamente", "success");
      setDeleteModalOpen(false);
      setExpenseToDelete(null);
      fetchExpenses();
    } catch (error) {
      addToast("Error al eliminar el gasto", "error");
    } finally {
      setIsDeleting(false);
    }
  };

  const openEditModal = (expense: IExpense) => {
    setEditingExpense(expense);
    setFormData({
      amount: expense.amount,
      category: expense.category,
      description: expense.description,
      date: expense.date.split("T")[0],
    });
    setIsModalOpen(true);
  };

  const resetForm = () => {
    setEditingExpense(null);
    setFormData({
      amount: 0,
      category: "Food",
      description: "",
      date: new Date().toISOString().split("T")[0],
    });
  };

  const openModal = () => {
    resetForm();
    setIsModalOpen(true);
  };

  return (
    <div className="space-y-6">
      <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
        <PageTitle title="Gastos" subtitle="Gestiona tus gastos personales" />
        <Button onClick={openModal} className="gap-2">
          <Plus className="w-4 h-4" />
          Nuevo Gasto
        </Button>
      </div>

      <Card className="p-4">
        <div className="flex flex-col lg:flex-row gap-4">
          <div className="flex-1">
            <div className="relative">
              <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-muted-foreground" />
              <input
                type="text"
                placeholder="Buscar gastos..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className="w-full pl-10 pr-4 py-2 rounded-lg border bg-background text-foreground focus:outline-none focus:ring-2 focus:ring-primary"
              />
            </div>
          </div>

          <div className="flex flex-wrap gap-2">
            <select
              value={categoryFilter}
              onChange={(e) => setCategoryFilter(e.target.value)}
              className="px-3 py-2 rounded-lg border bg-background text-foreground focus:outline-none focus:ring-2 focus:ring-primary"
            >
              <option value="">Todas las categorías</option>
              {CATEGORIES.map((cat) => (
                <option key={cat} value={cat}>
                  {cat}
                </option>
              ))}
            </select>

            <input
              type="date"
              value={dateFrom}
              onChange={(e) => setDateFrom(e.target.value)}
              className="px-3 py-2 rounded-lg border bg-background text-foreground focus:outline-none focus:ring-2 focus:ring-primary"
              placeholder="Desde"
            />

            <input
              type="date"
              value={dateTo}
              onChange={(e) => setDateTo(e.target.value)}
              className="px-3 py-2 rounded-lg border bg-background text-foreground focus:outline-none focus:ring-2 focus:ring-primary"
              placeholder="Hasta"
            />
          </div>
        </div>
      </Card>

      <Card className="overflow-hidden">
        {loading ? (
          <div className="p-6">
            <TableSkeleton rows={8} columns={5} />
          </div>
        ) : filteredExpenses.length === 0 ? (
          <div className="p-12 text-center">
            <p className="text-muted-foreground">No se encontraron gastos</p>
            <Button variant="secondary" className="mt-4" onClick={openModal}>
              <Plus className="w-4 h-4 mr-2" />
              Agregar tu primer gasto
            </Button>
          </div>
        ) : (
          <div className="overflow-x-auto">
            <table className="w-full">
              <thead className="bg-muted/50">
                <tr>
                  <th className="px-6 py-3 text-left text-sm font-medium text-muted-foreground">
                    Fecha
                  </th>
                  <th className="px-6 py-3 text-left text-sm font-medium text-muted-foreground">
                    Descripción
                  </th>
                  <th className="px-6 py-3 text-left text-sm font-medium text-muted-foreground">
                    Categoría
                  </th>
                  <th className="px-6 py-3 text-right text-sm font-medium text-muted-foreground">
                    Monto
                  </th>
                  <th className="px-6 py-3 text-right text-sm font-medium text-muted-foreground">
                    Acciones
                  </th>
                </tr>
              </thead>
              <tbody className="divide-y divide-border">
                {filteredExpenses.map((expense, index) => (
                  <motion.tr
                    key={expense._id}
                    initial={{ opacity: 0, y: 10 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: index * 0.05 }}
                    className="hover:bg-muted/50 transition-colors"
                  >
                    <td className="px-6 py-4 text-sm">
                      {new Date(expense.date).toLocaleDateString("es-ES")}
                    </td>
                    <td className="px-6 py-4 text-sm font-medium">
                      {expense.description}
                    </td>
                    <td className="px-6 py-4">
                      <span className="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-primary/10 text-primary">
                        {expense.category}
                      </span>
                    </td>
                    <td className="px-6 py-4 text-sm font-bold text-right text-red-500">
                      -${expense.amount.toFixed(2)}
                    </td>
                    <td className="px-6 py-4 text-right">
                      <div className="flex items-center justify-end gap-2">
                        <Button
                          variant="ghost"
                          size="sm"
                          onClick={() => openEditModal(expense)}
                          className="h-8 w-8 p-0"
                        >
                          <Edit2 className="w-4 h-4" />
                        </Button>
                        <Button
                          variant="ghost"
                          size="sm"
                          onClick={() => {
                            setExpenseToDelete(expense);
                            setDeleteModalOpen(true);
                          }}
                          className="h-8 w-8 p-0 text-red-500 hover:text-red-600"
                        >
                          <Trash2 className="w-4 h-4" />
                        </Button>
                      </div>
                    </td>
                  </motion.tr>
                ))}
              </tbody>
            </table>
          </div>
        )}
      </Card>

      <AnimatePresence>
        {isModalOpen && (
          <Modal
            onClose={() => setIsModalOpen(false)}
            title={editingExpense ? "Editar Gasto" : "Nuevo Gasto"}
          >
            <form onSubmit={handleSubmit} className="space-y-4">
              <div>
                <label className="block text-sm font-medium mb-1">Monto</label>
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

              <div>
                <label className="block text-sm font-medium mb-1">
                  Descripción
                </label>
                <Input
                  type="text"
                  value={formData.description}
                  onChange={(e) =>
                    setFormData({ ...formData, description: e.target.value })
                  }
                  placeholder="Descripción del gasto"
                  required
                />
              </div>

              <div>
                <label className="block text-sm font-medium mb-1">
                  Categoría
                </label>
                <select
                  value={formData.category}
                  onChange={(e) =>
                    setFormData({ ...formData, category: e.target.value })
                  }
                  className="w-full px-3 py-2 rounded-lg border bg-background text-foreground focus:outline-none focus:ring-2 focus:ring-primary"
                >
                  {CATEGORIES.map((cat) => (
                    <option key={cat} value={cat}>
                      {cat}
                    </option>
                  ))}
                </select>
              </div>

              <div>
                <label className="block text-sm font-medium mb-1">Fecha</label>
                <Input
                  type="date"
                  value={formData.date}
                  onChange={(e) =>
                    setFormData({ ...formData, date: e.target.value })
                  }
                  required
                />
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
                <Button
                  type="submit"
                  disabled={isSubmitting}
                  className="flex-1"
                >
                  {isSubmitting ? (
                    <Loader2 className="w-4 h-4 animate-spin" />
                  ) : editingExpense ? (
                    "Actualizar"
                  ) : (
                    "Crear"
                  )}
                </Button>
              </div>
            </form>
          </Modal>
        )}
      </AnimatePresence>

      <AnimatePresence>
        {deleteModalOpen && (
          <Modal
            onClose={() => setDeleteModalOpen(false)}
            title="Confirmar eliminación"
          >
            <div className="text-center">
              <p className="mb-6">
                ¿Estás seguro de que deseas eliminar el gasto{" "}
                <strong className="text-foreground">
                  {expenseToDelete?.description}
                </strong>
                ?
              </p>
              <div className="flex gap-3">
                <Button
                  variant="secondary"
                  onClick={() => setDeleteModalOpen(false)}
                  className="flex-1"
                >
                  Cancelar
                </Button>
                <Button
                  variant="error"
                  onClick={handleDelete}
                  disabled={isDeleting}
                  className="flex-1"
                >
                  {isDeleting ? (
                    <Loader2 className="w-4 h-4 animate-spin" />
                  ) : (
                    "Eliminar"
                  )}
                </Button>
              </div>
            </div>
          </Modal>
        )}
      </AnimatePresence>
    </div>
  );
}
