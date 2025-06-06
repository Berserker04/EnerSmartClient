"use client";

import { useEffect, useState } from "react";
import { Controller, useForm } from "react-hook-form";
import { toast } from "react-hot-toast";
import Modal from "@/components/ui/modal";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { useUserStore } from "@/store/userStore";
import { useCartStore } from "@/store/cartStore";
import { useRecommendationStore } from "@/store/recommendationStore";
import { CreateDiagnosticForm } from "@/types/diagnostic";
import { CheckboxCards, Flex } from "@radix-ui/themes";
import { fetchCreateDiagnostic } from "@/services/diagnosticService";
import { fetchUserById } from "@/services/userService";

interface NewDiagnosticProps {
  onClose: () => void;
  isOpen: boolean;
}

const NewDiagnosticModal = ({ onClose, isOpen }: NewDiagnosticProps) => {
  const [isLoading, setIsLoading] = useState(false);
  const { recommendation } =
    useCartStore();
  const { user, setUser } = useUserStore();
  const { recommendations } = useRecommendationStore();

  const {
    register,
    handleSubmit,
    reset,
    control,
    formState: { errors },
  } = useForm<CreateDiagnosticForm>({
    defaultValues: {
      selected_ids: [],
      current_kwh: 0,
    },
  });

  const onSubmit = async (productData: CreateDiagnosticForm) => {
    setIsLoading(true);
    console.log(productData);
    try {
      let res = await fetchCreateDiagnostic(user?.id || "", productData);

      if (res) {
        toast.success(`Diagnostico realizado con existo`);
        let upUser = await fetchUserById(user?.id || "");
        setUser(upUser);
      } else {
        toast.error(`Error al realizar el diagnostico`);
      }

      onClose();
    } catch (error) {
      console.log(error);
      toast.error("Error al crear el producto. Inténtalo de nuevo.");
    } finally {
      setIsLoading(false);
    }
  };

  useEffect(() => {
    reset({
      selected_ids: [],
      current_kwh: 0,
    });
  }, [recommendation, reset]);

  console.log(recommendation);

  return (
    <Modal isOpen={isOpen} onClose={onClose} title={`Realizar diagnostico`}>
      <form onSubmit={handleSubmit(onSubmit)} className="space-y-4">
        <div className="space-y-2">
          <Label htmlFor="current_kwh">kWh actuales</Label>
          <Input
            id="current_kwh"
            type="text"
            {...register("current_kwh", {
              required: "La pregunta es obligatorio",
            })}
            placeholder="Pregunta..."
          />
          {errors.current_kwh && (
            <p className="text-sm text-red-500">{errors.current_kwh.message}</p>
          )}
        </div>

        <div className="space-y-2">
          <Label htmlFor="sku">Selecciona los casos a los que aplicas</Label>
          <Flex direction="column" gap="2" width="100%">
            <Controller
              control={control}
              name="selected_ids"
              rules={{ required: "Selecciona al menos una opción" }}
              render={({ field }) => (
                <>
                  <CheckboxCards.Root
                    variant="classic"
                    value={field.value?.map(String) ?? []}
                    onValueChange={(val) => {
                      field.onChange(val.map(Number));
                    }}
                  >
                    {recommendations.map((r, i) => (
                      <CheckboxCards.Item key={i} value={`${r.id}`}>
                        {r.question}
                      </CheckboxCards.Item>
                    ))}
                  </CheckboxCards.Root>
                  {errors.selected_ids && (
                    <p className="text-sm text-red-500">
                      {errors.selected_ids.message}
                    </p>
                  )}
                </>
              )}
            />
          </Flex>
        </div>

        <Button type="submit" className="w-full" disabled={isLoading}>
          {isLoading ? `Realizando diagnostico...` : `Calcular`}
        </Button>
      </form>
    </Modal>
  );
};

export default NewDiagnosticModal;
