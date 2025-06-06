"use client";

import { Trash, TrendingUp } from "lucide-react";
import { useCartStore } from "@/store/cartStore";
import type { Recommendation } from "@/types/recommendation.types";
import { fetchDelRecommendations } from "@/services/recommedationService";
import toast from "react-hot-toast";
import { useRecommendationStore } from "@/store/recommendationStore";
import { Tooltip } from "@radix-ui/themes";

interface CartItemProps {
  item: Recommendation;
  index: number;
}

const CartItem = ({ item, index }: CartItemProps) => {
  const { fetchRecommendations } = useRecommendationStore();
  const { setRecommendation, setIsAddProductModalOpen } = useCartStore();

  const handleRemove = async (e: any) => {
    e.stopPropagation();
    const res = await fetchDelRecommendations(item.id);
    if (res?.message) {
      fetchRecommendations();
      toast.success(`Recomendación eliminada`);
    }
  };

  const handleUpdate = () => {
    setRecommendation(item);
    setIsAddProductModalOpen(true);
  };

  return (
    <div
      onClick={() => handleUpdate()}
      className="flex flex-col sm:flex-row items-start sm:items-center p-4 border-b hover:bg-green-50 cursor-pointer"
    >
      <div className="flex-shrink-0 w-full sm:w-auto mb-3 sm:mb-0">
        <div className="w-8 h-8 bg-gray-600 rounded-md flex items-center justify-center text-white">
          {index + 1}
        </div>
      </div>

      <div className="flex-grow sm:ml-4">
        <h3 className="font-semibold text-lg text-gray-800">{item.question}</h3>
        <p className="text-lg text-gray-950 mt-1">{item.description}</p>
      </div>

      <div className="flex items-center justify-between w-full sm:w-auto mt-3 sm:mt-0 sm:ml-6">
        <Tooltip content={`${item.estimated_saving}Kw de ahorro energético`}>
          <span className="font-medium sm:ml-4 sm:mr-6 text-green-600 text-lg flex items-center gap-2">
            <TrendingUp size={18} />
            {item.estimated_saving}Kw
          </span>
        </Tooltip>

        <button
          title="-"
          onClick={(e) => handleRemove(e)}
          className="text-red-500 hover:text-red-700 p-1 rounded-full hover:bg-red-50"
        >
          <Trash size={18} />
        </button>
      </div>
    </div>
  );
};

export default CartItem;
