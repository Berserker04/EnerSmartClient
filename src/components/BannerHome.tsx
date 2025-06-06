"use client";

import { Button } from "@/components/ui/button";
import Banner from "@/assets/banner.jpg";
import { useAuthStore } from "@/store/auth";

const BannerHome = () => {
  const { setIsLoginModalOpen } = useAuthStore();

  return (
    <div className="bg-red-600 relative">
      <img src={Banner} alt="-" className="w-full" />
      <div className="w-96 h-40  absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 flex justify-center items-center">
        <Button
          type="submit"
          className="bg-green-600 text-white hover:text-black hover:bg-white z-10 rounded-xl"
          onClick={() => setIsLoginModalOpen(true)}
        >
          Iniciar ahorro de energia
        </Button>
        <div className="absolute w-full h-full bg-black rounded-xl opacity-55"></div>
      </div>
    </div>
  );
};

export default BannerHome;
