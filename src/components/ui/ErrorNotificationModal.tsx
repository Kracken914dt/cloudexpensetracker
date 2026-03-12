"use client";

import React from "react";
import { motion, AnimatePresence } from "framer-motion";
import {
  X,
  AlertTriangle,
  AlertCircle,
  XCircle,
  Info,
  ExternalLink,
  Copy,
  CheckCircle,
} from "lucide-react";
import { Button } from "@/components/ui/Button";

export interface ErrorNotificationProps {
  isOpen: boolean;
  onClose: () => void;
  title?: string;
  message: string;
  type?: "error" | "warning" | "info";

  isDuplicateError?: boolean;
  duplicateTransactionId?: string;
  duplicateTransactionLink?: string;

  showCopyButton?: boolean;
  autoClose?: boolean;
  autoCloseDuration?: number;
  onAction?: () => void;
  actionLabel?: string;
  className?: string;
}

const ErrorNotificationModal: React.FC<ErrorNotificationProps> = ({
  isOpen,
  onClose,
  title,
  message,
  type = "error",
  isDuplicateError = false,
  duplicateTransactionId,
  duplicateTransactionLink,
  showCopyButton = false,
  autoClose = false,
  autoCloseDuration = 5000,
  onAction,
  actionLabel,
  className = "",
}) => {
  const [copied, setCopied] = React.useState(false);

  React.useEffect(() => {
    if (autoClose && isOpen) {
      const timer = setTimeout(() => {
        onClose();
      }, autoCloseDuration);

      return () => clearTimeout(timer);
    }
  }, [autoClose, autoCloseDuration, isOpen, onClose]);

  React.useEffect(() => {
    if (!isOpen) {
      setCopied(false);
    }
  }, [isOpen]);

  const getTypeConfig = () => {
    switch (type) {
      case "warning":
        return {
          icon: AlertTriangle,
          iconColor: "text-yellow-500",
          bgColor: "bg-yellow-50 dark:bg-yellow-900/20",
          borderColor: "border-yellow-200 dark:border-yellow-700",
          titleColor: "text-yellow-800 dark:text-yellow-200",
        };
      case "info":
        return {
          icon: Info,
          iconColor: "text-blue-500",
          bgColor: "bg-blue-50 dark:bg-blue-900/20",
          borderColor: "border-blue-200 dark:border-blue-700",
          titleColor: "text-blue-800 dark:text-blue-200",
        };
      default:
        return {
          icon: isDuplicateError ? AlertCircle : XCircle,
          iconColor: "text-red-500",
          bgColor: "bg-red-50 dark:bg-red-900/20",
          borderColor: "border-red-200 dark:border-red-700",
          titleColor: "text-red-800 dark:text-red-200",
        };
    }
  };

  const typeConfig = getTypeConfig();
  const IconComponent = typeConfig.icon;

  const getDefaultTitle = () => {
    if (isDuplicateError) {
      return "Transacción Duplicada";
    }

    switch (type) {
      case "warning":
        return "Advertencia";
      case "info":
        return "Información";
      default:
        return "Error";
    }
  };

  const handleCopyMessage = async () => {
    try {
      await navigator.clipboard.writeText(message);
      setCopied(true);
      setTimeout(() => setCopied(false), 2000);
    } catch (err) {
      console.error("Failed to copy message:", err);
    }
  };

  const handleCopyTransactionId = async () => {
    if (duplicateTransactionId) {
      try {
        await navigator.clipboard.writeText(duplicateTransactionId);
        setCopied(true);
        setTimeout(() => setCopied(false), 2000);
      } catch (err) {
        console.error("Failed to copy transaction ID:", err);
      }
    }
  };

  const handleLinkClick = () => {
    if (duplicateTransactionLink) {
      window.open(duplicateTransactionLink, "_blank");
    }
  };

  return (
    <AnimatePresence>
      {isOpen && (
        <>
          {/* Backdrop */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 bg-black/80 blur-50 z-50 flex items-center justify-center p-4"
            onClick={onClose}
          >
            {/* Modal */}
            <motion.div
              initial={{ opacity: 0, scale: 0.95, y: 20 }}
              animate={{ opacity: 1, scale: 1, y: 0 }}
              exit={{ opacity: 0, scale: 0.95, y: 20 }}
              transition={{ type: "spring", stiffness: 300, damping: 25 }}
              className={`
                bg-bg-card rounded-xl shadow-2xl border
                ${typeConfig.borderColor} ${typeConfig.bgColor}
                max-w-md w-full max-h-[90vh] overflow-y-auto
                ${className}
              `}
              onClick={(e) => e.stopPropagation()}
            >
              {/* Header */}
              <div className="flex items-start justify-between p-6 pb-4">
                <div className="flex items-center space-x-3">
                  <div className={`flex-shrink-0 ${typeConfig.iconColor}`}>
                    <IconComponent size={24} />
                  </div>
                  <div>
                    <h3
                      className={`text-lg font-semibold ${typeConfig.titleColor}`}
                    >
                      {title || getDefaultTitle()}
                    </h3>
                  </div>
                </div>

                <button
                  onClick={onClose}
                  className="flex-shrink-0 text-text-muted hover:text-text-secondary dark:hover:text-text-secondary transition-colors"
                >
                  <X size={20} />
                </button>
              </div>

              {/* Content */}
              <div className="px-6 pb-6">
                {/* Main message */}
                <div className="mb-4">
                  <p className="text-text-secondary text-sm leading-relaxed">
                    {message}
                  </p>

                  {showCopyButton && (
                    <button
                      onClick={handleCopyMessage}
                      className="mt-2 text-xs text-text-muted hover:text-text-secondary text-text-muted dark:hover:text-text-primary flex items-center space-x-1 transition-colors"
                    >
                      {copied ? (
                        <>
                          <CheckCircle size={12} />
                          <span>Copiado</span>
                        </>
                      ) : (
                        <>
                          <Copy size={12} />
                          <span>Copiar mensaje</span>
                        </>
                      )}
                    </button>
                  )}
                </div>

                {/* Duplicate transaction info */}
                {isDuplicateError &&
                  (duplicateTransactionId || duplicateTransactionLink) && (
                    <div className="mb-4 p-3 bg-bg-tertiary rounded-lg">
                      <p className="text-sm font-medium text-text-secondary mb-2">
                        Transacción existente:
                      </p>

                      {duplicateTransactionId && (
                        <div className="flex items-center justify-between mb-2">
                          <code className="text-xs bg-bg-tertiary bg-bg-tertiary px-2 py-1 rounded font-mono">
                            {duplicateTransactionId}
                          </code>
                          <button
                            onClick={handleCopyTransactionId}
                            className="text-text-muted hover:text-text-secondary text-text-muted dark:hover:text-text-primary ml-2"
                            title="Copiar ID"
                          >
                            {copied ? (
                              <CheckCircle size={14} />
                            ) : (
                              <Copy size={14} />
                            )}
                          </button>
                        </div>
                      )}

                      {duplicateTransactionLink && (
                        <button
                          onClick={handleLinkClick}
                          className="flex items-center space-x-1 text-blue-600 dark:text-blue-400 hover:text-blue-800 dark:hover:text-blue-300 text-sm transition-colors"
                        >
                          <ExternalLink size={14} />
                          <span>Ver transacción existente</span>
                        </button>
                      )}
                    </div>
                  )}

                {/* Auto close indicator */}
                {autoClose && (
                  <div className="mb-4">
                    <motion.div
                      initial={{ width: "100%" }}
                      animate={{ width: "0%" }}
                      transition={{
                        duration: autoCloseDuration / 1000,
                        ease: "linear",
                      }}
                      className="h-1 bg-bg-tertiary bg-bg-tertiary rounded-full overflow-hidden"
                    >
                      <div className="h-full bg-bg-tertiary bg-bg-tertiary"></div>
                    </motion.div>
                    <p className="text-xs text-text-muted mt-1">
                      Se cerrará automáticamente en{" "}
                      {Math.ceil(autoCloseDuration / 1000)}s
                    </p>
                  </div>
                )}

                {/* Action buttons */}
                <div className="flex justify-end space-x-3 pt-4 border-t border-border-primary border-border-primary">
                  {onAction && actionLabel && (
                    <Button
                      variant="secondary"
                      size="sm"
                      onClick={() => {
                        onAction();
                        onClose();
                      }}
                    >
                      {actionLabel}
                    </Button>
                  )}

                  <Button
                    variant={type === "error" ? "primary" : "secondary"}
                    size="sm"
                    onClick={onClose}
                  >
                    {isDuplicateError ? "Entendido" : "Cerrar"}
                  </Button>
                </div>
              </div>
            </motion.div>
          </motion.div>
        </>
      )}
    </AnimatePresence>
  );
};

export const useErrorNotification = () => {
  const [notification, setNotification] = React.useState<{
    isOpen: boolean;
    props: Partial<ErrorNotificationProps>;
  }>({
    isOpen: false,
    props: {},
  });

  const showError = React.useCallback(
    (props: Omit<ErrorNotificationProps, "isOpen" | "onClose">) => {
      setNotification({
        isOpen: true,
        props,
      });
    },
    [],
  );

  const showDuplicateError = React.useCallback(
    (
      message: string,
      transactionId?: string,
      transactionLink?: string,
      title?: string,
    ) => {
      setNotification({
        isOpen: true,
        props: {
          type: "error",
          title: title || "Transacción Duplicada",
          message,
          isDuplicateError: true,
          duplicateTransactionId: transactionId,
          duplicateTransactionLink: transactionLink,
        },
      });
    },
    [],
  );

  const hideNotification = React.useCallback(() => {
    setNotification((prev) => ({
      ...prev,
      isOpen: false,
    }));
  }, []);

  const NotificationComponent = React.useCallback(
    () => (
      <ErrorNotificationModal
        {...notification.props}
        isOpen={notification.isOpen}
        onClose={hideNotification}
        message={notification.props.message ?? ""}
      />
    ),
    [notification, hideNotification],
  );

  return {
    showError,
    showDuplicateError,
    hideNotification,
    NotificationComponent,
  };
};

export default ErrorNotificationModal;
