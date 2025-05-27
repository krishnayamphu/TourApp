import { useContext } from "react";
import { Outlet, useNavigate } from "react-router-dom";
import { AuthContext } from "../context/AuthContext";
import { Menubar } from "primereact/menubar";
import { PanelMenu } from "primereact/panelmenu";
import ProfileDropdown from "../components/ProfileDropdown";

export default function AdminLayout() {
  const navigate = useNavigate();
  const { dispatch } = useContext(AuthContext);
  const handleSignOut = () => {
    dispatch({ type: "LOGOUT" });
    console.log("Signing out...");
  };
  const start = (
    <img
      alt="logo"
      src="https://primefaces.org/cdn/primereact/images/logo.png"
      className="h-8 mr-2"
    ></img>
  );
  const end = (
    <div className="flex align-items-center gap-2">
      <ProfileDropdown onSignOut={handleSignOut} />
    </div>
  );

  // Top navigation (account-related)
  const topNavItems = [
    {
      label: "Admin Dashboard",
      icon: "pi pi-home",
      command: () => navigate("/admin"),
    },
  ];

  // Sidebar navigation (admin section links)
  const sideNavItems = [
    {
      label: "Dashboard",
      icon: "pi pi-chart-bar",
      command: () => navigate("/admin"),
    },
    {
      label: "Bookings",
      icon: "pi pi-shopping-bag",
      command: () => navigate("/admin/bookings"),
    },
    {
      label: "Tours",
      icon: "pi pi-copy",
      command: () => navigate("/admin/tours"),
    },
    {
      label: "Users",
      icon: "pi pi-users",
      command: () => navigate("/admin/users"),
    },
  ];

  return (
    <>
      <header className="bg-gray-500">
        <Menubar
          className="rounded-none!"
          model={topNavItems}
          start={start}
          end={end}
        />
      </header>

      <main className="flex gap-4">
        <div className="w-64 p-2 bg-gray-100 min-h-screen">
          <PanelMenu model={sideNavItems} className="w-full" />
        </div>
        <div className="flex-1 p-4">
          <Outlet />
        </div>
      </main>
    </>
  );
}
