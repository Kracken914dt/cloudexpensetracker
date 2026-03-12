"use client";
import React from "react";
import { AlertTriangle, Trash2 } from "lucide-react";
import { Modal } from "@/components/ui/Modal";
import { Button } from "@/components/ui/Button";

interface DeleteConfirmationModalProps {
  isOpen: boolean;
  onClose: () => void;
  onConfirm: () => void;
  transactionId: string;
  isDeleting?: boolean;
}

export const DeleteConfirmationModal: React.FC<
  DeleteConfirmationModalProps
> = ({ isOpen, onClose, onConfirm, transactionId, isDeleting = false }) => {
  return (
    <Modal
      isOpen={isOpen}
      onClose={onClose}
      title="Confirmar Eliminación"
      size="md"
      showCloseButton={!isDeleting}
    >
      <div className="space-y-4">
        {/* Icono de advertencia */}
        <div className="flex items-center justify-center w-16 h-16 mx-auto bg-red-100 dark:bg-red-900/20 rounded-full">
          <AlertTriangle className="w-8 h-8 text-red-600 dark:text-red-400" />
        </div>

        {/* Mensaje de confirmación */}
        <div className="text-center">
          <h3 className="text-lg font-semibold text-text-primary mb-2">
            ¿Eliminar Transacción Abierta?
          </h3>
          <p className="text-sm text-text-secondary mb-4">
            Estás a punto de eliminar la transacción con ID:
          </p>
          <div className="bg-bg-secondary rounded-lg p-3 mb-4">
            <code className="text-sm font-mono text-text-primary">
              {transactionId}
            </code>
          </div>
          <p className="text-sm text-red-600 dark:text-red-400 font-medium">
            Esta acción no se puede deshacer.
          </p>
        </div>

        {/* Botones de acción */}
        <div className="flex gap-3 pt-4">
          <Button
            variant="secondary"
            fullWidth
            onClick={onClose}
            disabled={isDeleting}
          >
            Cancelar
          </Button>
          <Button
            variant="ghost"
            fullWidth
            onClick={onConfirm}
            loading={isDeleting}
            disabled={isDeleting}
            className="bg-red-600 hover:bg-red-700 text-white hover:text-white border-red-600 hover:border-red-700"
          >
            <Trash2 size={16} className="mr-2" />
            {isDeleting ? "Eliminando..." : "Eliminar Transacción"}
          </Button>
        </div>
      </div>
    </Modal>
  );
};
