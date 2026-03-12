"use client";

import { Eye, EyeOff, Lock, Mail } from "lucide-react";
import { useState } from "react";
import { useForm } from "react-hook-form";

import { Button } from "@/components/ui/Button";
import { Input } from "@/components/ui/Input";
import { useAuthStore } from "@/context/stores/authStore";
import { useToast } from "@/context/ToastContext";
import { AuthService } from "@/services/auth/AuthService";
import type { ILoginInput } from "@/types/auth";

export function LoginForm() {
  const [showPassword, setShowPassword] = useState(false);
  const { addToast } = useToast();
  const login = useAuthStore((s) => s.login);

  const {
    register,
    handleSubmit,
    formState: { errors, isSubmitting },
  } = useForm<ILoginInput>();

  const onSubmit = async (data: ILoginInput) => {
    try {
      const res = await AuthService.login(data);
      login(res.token, res.user);
      addToast("Inicio de sesión exitoso", "success");
      window.location.assign("/dashboard");
    } catch (err: any) {
      const status = err?.response?.status || err?.status;
      if (status === 401) {
        addToast("Credenciales inválidas. Verifica tu email y contraseña.", "error");
      } else if (status === 429) {
        addToast("Demasiados intentos. Intenta nuevamente en unos minutos.", "error");
      } else {
        addToast("Error del servidor. Intenta más tarde.", "error");
      }
    }
  };

  return (
    <form onSubmit={handleSubmit(onSubmit)} className="space-y-5" noValidate>
      <Input
        id="email"
        type="email"
        label="Correo electrónico"
        placeholder="correo@ejemplo.com"
        leftIcon={<Mail className="w-4 h-4" />}
        error={errors.email?.message}
        {...register("email", {
          required: "El correo es requerido",
          pattern: {
            value: /^[^\s@]+@[^\s@]+\.[^\s@]+$/,
            message: "Correo electrónico inválido",
          },
        })}
      />

      <Input
        id="password"
        type={showPassword ? "text" : "password"}
        label="Contraseña"
        placeholder="••••••••"
        leftIcon={<Lock className="w-4 h-4" />}
        rightIcon={showPassword ? <EyeOff className="w-4 h-4" /> : <Eye className="w-4 h-4" />}
        onRightIconClick={() => setShowPassword((v) => !v)}
        error={errors.password?.message}
        {...register("password", {
          required: "La contraseña es requerida",
          minLength: { value: 6, message: "Mínimo 6 caracteres" },
        })}
      />

      {/* Server error removed in favor of Toast */}

      <Button type="submit" fullWidth loading={isSubmitting} size="lg">
        {isSubmitting ? "Iniciando sesión..." : "Iniciar sesión"}
      </Button>

      <p className="text-center text-sm text-text-secondary">
        ¿No tienes cuenta?{" "}
        <a href="/register" className="font-medium text-accent hover:underline">
          Regístrate
        </a>
      </p>
    </form>
  );
}
