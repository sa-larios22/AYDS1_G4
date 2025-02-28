import { HomeLayout } from "../components";
import { useAuth } from "../hooks";
import { AdminDashboard } from "./admin";
import StaffDashboard from "./personal/StaffDashboard";
import ClientDashboard from "./user/ClientDashboard";

export const Home = () => {

  const { user } = useAuth();

  if (user.role === 'ADMIN') {
    return (
      <HomeLayout>
        <AdminDashboard />
      </HomeLayout>
    )
  }

  if (user.role === 'USER') {
    return (
      <HomeLayout>
        <ClientDashboard />
      </HomeLayout>
    )
  }

  if (user.role === 'PERSONAL') {
    return (
      <HomeLayout>
        <StaffDashboard />
      </HomeLayout>
    )
  }


};

