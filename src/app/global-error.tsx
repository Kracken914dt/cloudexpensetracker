"use client";

import { motion } from "framer-motion";
import { AlertTriangle, Home, RefreshCw } from "lucide-react";
import { useEffect } from "react";

import { Button } from "@/components/ui/Button";

export default function GlobalError({
  error,
  reset,
}: {
  error: Error & { digest?: string };
  reset: () => void;
}) {
  useEffect(() => {
    console.error("Global error:", error);
  }, [error]);

  return (
    <html>
      <body>
        <div className="min-h-screen flex items-center justify-center p-6 bg-background">
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
              Ha ocurrido un error inesperado. Por favor, intenta de nuevo.
            </p>

            <div className="flex gap-3 justify-center">
              <Button variant="secondary" onClick={reset}>
                <RefreshCw className="w-4 h-4 mr-2" />
                Reintentar
              </Button>
              <Button onClick={() => (window.location.href = "/login")}>
                <Home className="w-4 h-4 mr-2" />
                Ir al inicio
              </Button>
            </div>
          </motion.div>
        </div>
      </body>
    </html>
  );
}
