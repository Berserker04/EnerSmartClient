"use client";

import { useUserStore } from "@/store/userStore";
import { ROLES } from "@/config/constants";
import BannerHome from "@/components/BannerHome";
import AdminPage from "./AdminPage";
import ClientPage from "./ClientPage";

const HomePage = () => {
  const { user } = useUserStore();

  return (
    <div className="grid grid-cols-1 gap-6">
      {!user ? (
        <BannerHome />
      ) : user?.rol == ROLES.Admin.value ? (
        <AdminPage />
      ) : (
        <ClientPage />
      )}
    </div>
  );
};

export default HomePage;
