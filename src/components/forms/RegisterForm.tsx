"use client";

import { Eye, EyeOff, Lock, Mail, User } from "lucide-react";
import { useState } from "react";
import { useForm } from "react-hook-form";

import { Button } from "@/components/ui/Button";
import { Input } from "@/components/ui/Input";
import { useAuthStore } from "@/context/stores/authStore";
import { useToast } from "@/context/ToastContext";
import { AuthService } from "@/services/auth/AuthService";
import type { IRegisterInput } from "@/types/auth";

export function RegisterForm() {
  const [showPassword, setShowPassword] = useState(false);
  const { addToast } = useToast();
  const login = useAuthStore((s) => s.login);

  const {
    register,
    handleSubmit,
    formState: { errors, isSubmitting },
  } = useForm<IRegisterInput>();

  const onSubmit = async (data: IRegisterInput) => {
    try {
      const res = await AuthService.register(data);
      login(res.token, res.user);
      addToast("Cuenta creada exitosamente", "success");
      window.location.assign("/dashboard");
    } catch (err: any) {
      const status = err?.response?.status || err?.status;
      const message = err?.response?.data?.message || err?.message;
      
      if (status === 400) {
        addToast(message ?? "Datos inválidos. Revisa los campos.", "error");
      } else if (status === 409) {
        addToast("Ya existe una cuenta con ese correo electrónico.", "error");
      } else {
        addToast("Error del servidor. Intenta más tarde.", "error");
      }
    }
  };

  return (
    <form onSubmit={handleSubmit(onSubmit)} className="space-y-5" noValidate>
      <Input
        id="name"
        type="text"
        label="Nombre completo"
        placeholder="Tu nombre"
        leftIcon={<User className="w-4 h-4" />}
        error={errors.name?.message}
        {...register("name", {
          required: "El nombre es requerido",
          minLength: { value: 2, message: "Mínimo 2 caracteres" },
        })}
      />

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
        {isSubmitting ? "Creando cuenta..." : "Crear cuenta"}
      </Button>

      <p className="text-center text-sm text-text-secondary">
        ¿Ya tienes cuenta?{" "}
        <a href="/login" className="font-medium text-accent hover:underline">
          Iniciar sesión
        </a>
      </p>
    </form>
  );
}
