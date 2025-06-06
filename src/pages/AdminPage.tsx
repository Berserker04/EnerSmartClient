import { useEffect } from "react";
import { Plus } from "lucide-react";
import CartItem from "@/components/CartItem";
import AddProductModal from "@/components/modals/AddProductModal";
import { useRecommendationStore } from "@/store/recommendationStore";
import { useCartStore } from "@/store/cartStore";

const AdminPage = () => {
  const { isAddProductModalOpen, setIsAddProductModalOpen } = useCartStore();
  const { recommendations, fetchRecommendations } = useRecommendationStore();
  const { setRecommendation } = useCartStore();

  const handleCreate = () => {
    setRecommendation(null);
    setIsAddProductModalOpen(true);
  };

  useEffect(() => {
    fetchRecommendations();
  }, []);

  return (
    <div>
      <div className="flex justify-between mb-4">
        <h2 className="font-bold text-xl">Diagnosticos registrados</h2>
        <button
          title="-"
          onClick={() => handleCreate()}
          className="p-2 text-gray-700 bg-green-50 font-bold rounded-xl shadow-md hover:bg-gray-100 flex items-center gap-4"
        >
          Registrar nueva recomendación
          <Plus size={20} />
        </button>
      </div>
      <hr />
      <section>
        <div className="flex flex-col ">
          {recommendations.map((r, i) => (
            <CartItem key={i} item={r} index={i}></CartItem>
          ))}
        </div>
      </section>
      <AddProductModal
        isOpen={isAddProductModalOpen}
        onClose={() => setIsAddProductModalOpen(false)}
      />
    </div>
  );
};

export default AdminPage;
