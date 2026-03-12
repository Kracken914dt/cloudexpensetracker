"use client";

import { motion } from "framer-motion";
import { AlertTriangle, Home, RefreshCw } from "lucide-react";
import { useEffect } from "react";

import { Button } from "@/components/ui/Button";

export default function Error({
  error,
  reset,
}: {
  error: Error & { digest?: string };
  reset: () => void;
}) {
  useEffect(() => {
    console.error("Dashboard error:", error);
  }, [error]);

  return (
    <div className="min-h-[400px] flex items-center justify-center p-6">
      <motion.div
        initial={{ opacity: 0, scale: 0.95 }}
        animate={{ opacity: 1, scale: 1 }}
        className="text-center max-w-md"
      >
        <div className="inline-flex items-center justify-center w-16 h-16 rounded-full bg-red-100 dark:bg-red-900/30 mb-6">
          <AlertTriangle className="w-8 h-8 text-red-500" />
        </div>

        <h2 className="text-2xl font-bold mb-2">Algo salió mal</h2>
        <p className="text-muted-foreground mb-6">
          Hubo un error al cargar el dashboard. Por favor, intenta de nuevo.
        </p>

        <div className="flex gap-3 justify-center">
          <Button variant="secondary" onClick={reset}>
            <RefreshCw className="w-4 h-4 mr-2" />
            Reintentar
          </Button>
          <Button onClick={() => (window.location.href = "/dashboard")}>
            <Home className="w-4 h-4 mr-2" />
            Volver al inicio
          </Button>
        </div>
      </motion.div>
    </div>
  );
}
