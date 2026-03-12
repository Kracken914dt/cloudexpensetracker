"use client";
import React from "react";
import { AlertTriangle, HelpCircle, Info } from "lucide-react";
import { Modal } from "@/components/ui/Modal";
import { Button } from "@/components/ui/Button";

export type ConfirmationType = "warning" | "info" | "question";

interface ConfirmationModalProps {
  isOpen: boolean;
  onClose: () => void;
  onConfirm: () => void;
  title: string;
  message: string;
  confirmText?: string;
  cancelText?: string;
  type?: ConfirmationType;
  isProcessing?: boolean;
}

export const ConfirmationModal: React.FC<ConfirmationModalProps> = ({
  isOpen,
  onClose,
  onConfirm,
  title,
  message,
  confirmText = "Confirmar",
  cancelText = "Cancelar",
  type = "question",
  isProcessing = false,
}) => {
  const getIconConfig = () => {
    switch (type) {
      case "warning":
        return {
          icon: AlertTriangle,
          bgColor: "bg-yellow-100 dark:bg-yellow-900/20",
          iconColor: "text-yellow-600 dark:text-yellow-400",
          buttonColor:
            "bg-yellow-600 hover:bg-yellow-700 border-yellow-600 hover:border-yellow-700",
        };
      case "info":
        return {
          icon: Info,
          bgColor: "bg-blue-100 dark:bg-blue-900/20",
          iconColor: "text-blue-600 dark:text-blue-400",
          buttonColor:
            "bg-blue-600 hover:bg-blue-700 border-blue-600 hover:border-blue-700",
        };
      case "question":
      default:
        return {
          icon: HelpCircle,
          bgColor: "bg-bg-secondary",
          iconColor: "text-text-secondary",
          buttonColor:
            "bg-blue-600 hover:bg-blue-700 border-blue-600 hover:border-blue-700",
        };
    }
  };

  const config = getIconConfig();
  const Icon = config.icon;

  return (
    <Modal
      isOpen={isOpen}
      onClose={onClose}
      title={title}
      size="md"
      showCloseButton={!isProcessing}
    >
      <div className="space-y-4">
        {/* Icono */}
        <div
          className={`flex items-center justify-center w-16 h-16 mx-auto rounded-full ${config.bgColor}`}
        >
          <Icon className={`w-8 h-8 ${config.iconColor}`} />
        </div>

        {/* Mensaje */}
        <div className="text-center">
          <p className="text-sm text-text-secondary">{message}</p>
        </div>

        {/* Botones de acción */}
        <div className="flex gap-3 pt-4">
          <Button
            variant="secondary"
            fullWidth
            onClick={onClose}
            disabled={isProcessing}
          >
            {cancelText}
          </Button>
          <Button
            variant="ghost"
            fullWidth
            onClick={onConfirm}
            loading={isProcessing}
            disabled={isProcessing}
            className={`text-white hover:text-white ${config.buttonColor}`}
          >
            {confirmText}
          </Button>
        </div>
      </div>
    </Modal>
  );
};
