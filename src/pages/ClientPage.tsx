import NewDiagnosticModal from "@/components/modals/NewDiagnosticModal";
import RecommendationCard from "@/components/RecommendationCard";
import { useCartStore } from "@/store/cartStore";
import { useRecommendationStore } from "@/store/recommendationStore";
import { useUserStore } from "@/store/userStore";
import { Diagnostic } from "@/types/diagnostic";
import { Callout } from "@radix-ui/themes";
import { Plus } from "lucide-react";
import { useEffect, useState } from "react";

const ClientPage = () => {
  const { isAddProductModalOpen, setIsAddProductModalOpen, setRecommendation } =
    useCartStore();
  const { fetchRecommendations } = useRecommendationStore();
  const { user } = useUserStore();
  const [diagnosticSelected, setDiagnosticSelected] = useState<Diagnostic>({
    create_date: "",
    current_kwh: 0,
    optimized_kwh: 0,
    recommendations: [],
    total_saving_percent: 0,
  });

  const handleCreate = () => {
    setRecommendation(null);
    setIsAddProductModalOpen(true);
  };

  const handleSelect = (item: Diagnostic) => {
    setDiagnosticSelected(item);
  };

  useEffect(() => {
    fetchRecommendations();
    if (user) {
      setDiagnosticSelected(user?.diagnostics[0]);
    }
  }, [user]);
  console.log(user);
  return (
    <div>
      <div className="flex justify-between mb-4">
        <h2 className="font-bold text-xl">Historial de recomendaciones</h2>
        <button
          title="-"
          onClick={() => handleCreate()}
          className="p-2 text-gray-700 bg-green-50 font-bold rounded-xl shadow-md hover:bg-gray-100 flex items-center gap-4"
        >
          Realizar nuevo calculo
          <Plus size={20} />
        </button>
      </div>
      <hr />
      <div className="flex  justify-between gap-2">
        <section className="p-4 shadow-lg min-h-[40rem] overflow-y-auto">
          <div className="flex flex-col gap-2">
            {user?.diagnostics.map((r, i) => (
              <RecommendationCard
                key={i}
                diagnostic={r}
                index={i}
                handleSelect={handleSelect}
                diagnosticSelected={diagnosticSelected}
              ></RecommendationCard>
            ))}
          </div>
        </section>
        <section className="w-full p-4 shadow-lg min-h-[40rem] overflow-y-auto">
          <h2 className="font-medium text-lg">Recomendaciones</h2>
          <hr />
          <br />
          <div className="flex flex-col gap-2">
            {diagnosticSelected?.recommendations.map((r, i) => (
              <Callout.Root color="gray" variant="soft" highContrast>
                <Callout.Icon>{i + 1}</Callout.Icon>
                <Callout.Text>{r}</Callout.Text>
              </Callout.Root>
            ))}
          </div>
        </section>
      </div>
      <NewDiagnosticModal
        isOpen={isAddProductModalOpen}
        onClose={() => setIsAddProductModalOpen(false)}
      />
    </div>
  );
};

export default ClientPage;
