"use client";

import { useEffect, useState } from "react";
import { useForm } from "react-hook-form";
import { toast } from "react-hot-toast";
import Modal from "@/components/ui/modal";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { CreateRecommendationForm } from "@/types/forms.types";
import { fetchCreateRecommendation, fetchUpdateRecommendation } from "@/services/recommedationService";
import { useCartStore } from "@/store/cartStore";
import { useRecommendationStore } from "@/store/recommendationStore";

interface AddProductModalProps {
  onClose: () => void;
  isOpen: boolean;
}

const AddProductModal = ({ onClose, isOpen }: AddProductModalProps) => {
  const [isLoading, setIsLoading] = useState(false);
  const { recommendation } =
    useCartStore();
  const { fetchRecommendations } = useRecommendationStore();

  const {
    register,
    handleSubmit,
    reset,
    formState: { errors },
  } = useForm<CreateRecommendationForm>({
    defaultValues: {
      id: recommendation?.id ?? 0,
      question: recommendation?.question ?? "",
      description: recommendation?.description ?? "",
      estimated_saving: recommendation?.estimated_saving ?? 0,
    },
  });

  const onSubmit = async (productData: CreateRecommendationForm) => {
    setIsLoading(true);
    console.log("XD ", productData);
    try {
      let res = null;
      if (recommendation?.id) {
        res = await fetchUpdateRecommendation(productData);
      } else {
        res = await fetchCreateRecommendation(productData);
      }

      if (res?.id) {
        toast.success(
          `${recommendation?.id ? "Actualización exitosa" : "Registro exitoso"}`
        );
        fetchRecommendations();
      } else {
        toast.error(
          `${
            recommendation?.id
              ? "Error al actualizar la recommendación"
              : "Error al registrar recommendación"
          }`
        );
      }

      onClose();
    } catch (error) {
      toast.error("Error al crear el producto. Inténtalo de nuevo.");
    } finally {
      setIsLoading(false);
    }
  };

  useEffect(() => {
    reset({
      id: recommendation?.id ?? 0,
      question: recommendation?.question ?? "",
      description: recommendation?.description ?? "",
      estimated_saving: recommendation?.estimated_saving ?? 0,
    });
  }, [recommendation, reset]);

  console.log(recommendation);

  return (
    <Modal
      isOpen={isOpen}
      onClose={onClose}
      title={`${
        recommendation?.id
          ? "Actualizar recomendación"
          : "Agregar recomendación"
      }`}
    >
      <form onSubmit={handleSubmit(onSubmit)} className="space-y-4">
        <div className="space-y-2">
          <Label htmlFor="question">Pregunta para el usuario</Label>
          <Input
            id="question"
            type="text"
            {...register("question", {
              required: "La pregunta es obligatorio",
            })}
            placeholder="Pregunta..."
          />
          {errors.question && (
            <p className="text-sm text-red-500">{errors.question.message}</p>
          )}
        </div>

        <div className="space-y-2">
          <Label htmlFor="sku">Recomendación</Label>
          <Input
            id="sku"
            type="text"
            {...register("description", {
              required: "El SKU es obligatorio",
            })}
            placeholder="recomendación..."
          />
          {errors.description && (
            <p className="text-sm text-red-500">{errors.description.message}</p>
          )}
        </div>

        <div className="space-y-2">
          <Label htmlFor="estimated_saving">Ahorro estimado en Kw</Label>
          <Input
            id="estimated_saving"
            type="number"
            {...register("estimated_saving", {
              required: "La cantidad es obligatoria",
            })}
            placeholder="10Kw"
          />
          {errors.estimated_saving && (
            <p className="text-sm text-red-500">
              {errors.estimated_saving.message}
            </p>
          )}
        </div>

        <Button type="submit" className="w-full" disabled={isLoading}>
          {isLoading
            ? `${
                recommendation?.id
                  ? "Actualizando recomendación..."
                  : "Creando recomendación..."
              }`
            : `${recommendation?.id ? "Actualizar" : "Crear"}`}
        </Button>
      </form>
    </Modal>
  );
};

export default AddProductModal;
