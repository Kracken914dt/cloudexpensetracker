import { cookies } from "next/headers";
import { redirect } from "next/navigation";

import { RegisterForm } from "@/components/forms/RegisterForm";

export default async function RegisterPage() {
  const cookieStore = await cookies();
  if (cookieStore.get("jwt")) {
    redirect("/dashboard");
  }

  return (
    <div className="min-h-screen flex items-center justify-center bg-bg-primary px-4">
      <div className="w-full max-w-md">
        <div className="bg-bg-card border border-border-primary rounded-2xl shadow-lg p-8">
          <div className="mb-8 text-center">
            <h1 className="text-2xl font-bold text-text-primary">Crea tu cuenta</h1>
            <p className="mt-2 text-sm text-text-secondary">
              Regístrate para empezar a gestionar tus gastos
            </p>
          </div>

          <RegisterForm />
        </div>
      </div>
    </div>
  );
}
