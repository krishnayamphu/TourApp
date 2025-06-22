import { useContext } from "react";
import { Outlet, useNavigate } from "react-router-dom";
import { Menubar } from "primereact/menubar";
import { AuthContext } from "../context/AuthContext";
import ProfileDropdown from "../components/ProfileDropdown";
import AuthDropdown from "../components/auth/AuthDropdown";
import UserProfileDropdown from "../components/UserProfileDropdown";
import ClientNotificationBell from "../components/ClientNotificationBell";

export default function AppLayout() {
  const navigate = useNavigate();
  const { user, token, dispatch } = useContext(AuthContext);
  const isAuthenticated = !!token; // Convert token to boolean

  const handleSignOut = () => {
    dispatch({ type: "LOGOUT" });
    console.log("Signing out...");
  };

  // const router = useRouter();
  const items = [
    {
      label: "Home",
      icon: "pi pi-home",
      url: "/",
    },
    {
      label: "Tours",
      url: "/",
    },
  ];

  const end = (
    <div className="flex align-items-center gap-2">
      {isAuthenticated ? (
        <div className="flex items-center gap-8">
          <ClientNotificationBell userId={user.id} />
          <UserProfileDropdown user={user} onSignOut={handleSignOut} />
        </div>
      ) : (
        <AuthDropdown />
      )}
    </div>
  );
  return (
    <>
      <header className="bg-[#f9fafb]! border border-[#e5e7eb]!">
        <div className="container mx-auto">
          <Menubar
            className="rounded-none! border-none!"
            model={items}
            end={end}
          />
        </div>
      </header>
      <main>
        <Outlet />
      </main>
    </>
  );
}
