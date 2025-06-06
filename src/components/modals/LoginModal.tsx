"use client";

import { useState } from "react";
import { useForm } from "react-hook-form";
import { login } from "@/services/authService";
import { useUserStore } from "@/store/userStore";
import { toast } from "react-hot-toast";
import Modal from "@/components/ui/modal";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { LoginForm } from "@/types/forms.types";
import { useAuthStore } from "@/store/auth";

const LoginModal = () => {
  const [isLoading, setIsLoading] = useState(false);
  const { setUser } = useUserStore();
  const { isLoginModalOpen, setIsRegisterModalOpen, setIsLoginModalOpen } =
    useAuthStore();

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<LoginForm>();

  const onSubmit = async (data: LoginForm) => {
    setIsLoading(true);

    try {
      const userData = await login(data);
      
      setUser(userData);
      toast.success(`${userData.userName} inicio sessión`);
      onClose();
    } catch (error) {
      console.error("Error during login:", error);
      toast.error("Error al iniciar sesión. Verifica tus credenciales.");
    } finally {
      setIsLoading(false);
    }
  };

  const onClose = () => {
    setIsLoginModalOpen(false);
  };

  return (
    <Modal
      isOpen={isLoginModalOpen}
      onClose={() => onClose()}
      title="Iniciar Sesión"
    >
      <form onSubmit={handleSubmit(onSubmit)} className="space-y-4">
        <div className="space-y-2">
          <Label htmlFor="email">Correo electrónico</Label>
          <Input
            id="email"
            type="text"
            {...register("userName", {
              required: "El usuario es obligatorio",
            })}
            placeholder="tu usuario"
          />
          {errors.userName && (
            <p className="text-sm text-red-500">{errors.userName.message}</p>
          )}
        </div>

        <div className="space-y-2">
          <Label htmlFor="password">Contraseña</Label>
          <Input
            id="password"
            type="password"
            {...register("password", {
              required: "La contraseña es obligatoria",
            })}
            placeholder="********"
          />
          {errors.password && (
            <p className="text-sm text-red-500">{errors.password.message}</p>
          )}
        </div>

        <Button
          type="submit"
          className="w-full bg-green-600 text-white hover:text-black"
          disabled={isLoading}
        >
          {isLoading ? "Iniciando sesión..." : "Iniciar Sesión"}
        </Button>
        <Button
          type="button"
          className="w-full"
          disabled={isLoading}
          onClick={() => {
            setIsLoginModalOpen(false);
            setIsRegisterModalOpen(true);
          }}
        >
          Regístrate
        </Button>
      </form>
    </Modal>
  );
};

export default LoginModal;
