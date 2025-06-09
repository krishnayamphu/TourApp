import { useNavigate } from "react-router-dom";
import { PanelMenu } from "primereact/panelmenu";
export default function SideNav(props) {
  //   const posts = props.posts;
  const navigate = useNavigate();
  const sideNavItems = [
    {
      label: "My Bookings",
      icon: "pi pi-shopping-bag",
      command: () => navigate("/my-booking"),
    },
  ];
  return (
    <>
      <PanelMenu model={sideNavItems} className="w-full" />
    </>
  );
}
