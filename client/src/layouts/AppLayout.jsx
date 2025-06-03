import { Link, Outlet } from "react-router-dom";
import { Menubar } from "primereact/menubar";
// import { useRouter } from "next/router";
export default function AppLayout() {
  // const router = useRouter();
  const items = [
    {
      label: "Home",
      icon: "pi pi-home",
      url: "/unstyled",
    },
    {
      label: "Programmatic",
      icon: "pi pi-link",
      url: "/unstyled",
    },
    {
      label: "",
      icon: "pi pi-user",
      items: [
        {
          label: "Sign In",
          url: "signin",
        },
        {
          label: "Sign Up",
          url: "signup",
        },
      ],
    },
  ];
  return (
    <>
      <header className="bg-sky-500">
        <div className="container mx-auto">
          <Menubar model={items} />
        </div>
      </header>
      <main>
        <Outlet />
      </main>
    </>
  );
}
