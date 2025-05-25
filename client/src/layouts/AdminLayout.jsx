import { Outlet, useNavigate } from "react-router-dom";
import { Menubar } from "primereact/menubar";
import { PanelMenu } from "primereact/panelmenu";

export default function AdminLayout() {
  const navigate = useNavigate();

  // Top navigation (account-related)
  const topNavItems = [
    {
      label: "Admin Dashboard",
      icon: "pi pi-home",
      command: () => navigate("/admin"),
    },
    {
      label: "Logout",
      icon: "pi pi-sign-out",
      command: () => {
        localStorage.removeItem("user"); // Or dispatch logout
        navigate("/signin");
      },
    },
  ];

  // Sidebar navigation (admin section links)
  const sideNavItems = [
    {
      label: "Dashboard",
      icon: "pi pi-chart-bar",
      routerLink: "/admin",
    },
    {
      label: "Tours",
      icon: "pi pi-map-marker",
      routerLink: "/admin/tours",
    },
    {
      label: "Users",
      icon: "pi pi-users",
      routerLink: "/admin/users",
    },
  ];

  return (
    <>
      <header className="bg-sky-500">
        <div className="container mx-auto">
          <Menubar model={topNavItems} />
        </div>
      </header>

      <main className="flex p-4 gap-4">
        <div className="w-64">
          <PanelMenu model={sideNavItems} className="w-full" />
        </div>
        <div className="flex-1">
          <Outlet />
        </div>
      </main>
    </>
  );
}
