"use client";

import { useState } from "react";
import { useForm } from "react-hook-form";
import { register as registerUser } from "@/services/authService";
import { toast } from "react-hot-toast";
import Modal from "@/components/ui/modal";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { CreateUserForm } from "@/types/forms.types";
import { useAuthStore } from "@/store/auth";
import { useUserStore } from "@/store/userStore";

const RegisterModal = () => {
  const [isLoading, setIsLoading] = useState(false);
  const { isRegisterModalOpen, setIsRegisterModalOpen, setIsLoginModalOpen } =
    useAuthStore();
  const { setUser } = useUserStore();

  const {
    register,
    handleSubmit,
    watch,
    formState: { errors },
  } = useForm<CreateUserForm>({
    defaultValues: {},
  });

  const password = watch("password");

  const onSubmit = async (data: CreateUserForm) => {
    setIsLoading(true);

    try {
      const userData = await registerUser(data);
      setUser(userData);
      toast.success("Registro exitoso");
      onClose();
    } catch (error) {
      toast.error("Error al registrarse. Inténtalo de nuevo.");
    } finally {
      setIsLoading(false);
    }
  };

  const onClose = () => {
    setIsRegisterModalOpen(false);
  };

  return (
    <Modal
      isOpen={isRegisterModalOpen}
      onClose={() => onClose()}
      title="Registrarse"
    >
      <form onSubmit={handleSubmit(onSubmit)} className="space-y-4">
        <div className="space-y-2">
          <Label htmlFor="fullName">Nombre</Label>
          <Input
            id="fullName"
            type="text"
            {...register("fullName", {
              required: "El nombre es obligatorio",
            })}
            placeholder="Tu nombre"
          />
          {errors.fullName && (
            <p className="text-sm text-red-500">{errors.fullName.message}</p>
          )}
        </div>

        <div className="space-y-2">
          <Label htmlFor="userName">Correo electrónico</Label>
          <Input
            id="userName"
            type="text"
            {...register("userName", {
              required: "El correo es obligatorio",
            })}
            placeholder="tu@userName.com"
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

        <div className="space-y-2">
          <Label htmlFor="confirmPassword">Confirmar contraseña</Label>
          <Input
            id="confirmPassword"
            type="password"
            {...register("confirmPassword", {
              required: "Confirma la contraseña",
              validate: (value) =>
                value === password || "Las contraseñas no coinciden",
            })}
            placeholder="********"
          />
          {errors.confirmPassword && (
            <p className="text-sm text-red-500">
              {errors.confirmPassword.message}
            </p>
          )}
        </div>

        <Button
          type="submit"
          className="w-full bg-green-600 text-white hover:text-black"
          disabled={isLoading}
        >
          {isLoading ? "Registrando..." : "Registrarse"}
        </Button>
        <Button
          type="button"
          className="w-full "
          disabled={isLoading}
          onClick={() => {
            setIsLoginModalOpen(true);
            setIsRegisterModalOpen(false);
          }}
        >
          Iniciar sesión
        </Button>
      </form>
    </Modal>
  );
};

export default RegisterModal;
