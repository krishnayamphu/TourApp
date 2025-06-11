import { useRef } from "react";
import { useNavigate } from "react-router-dom";
import { Menu } from "primereact/menu";
import { Avatar } from "primereact/avatar";
export default function UserProfileDropdown({ onSignOut }) {
  const menuRight = useRef(null);
  const navigate = useNavigate();

  const items = [
    {
      label: "My Bookings",
      icon: "pi pi-shopping-bag",
      command: () => {
        navigate("/my-booking");
      },
    },
    {
      label: "Profile",
      icon: "pi pi-user",
      command: () => {
        // Navigate to profile or show profile modal
        console.log("Go to profile");
      },
    },
    {
      separator: true,
    },
    {
      label: "Sign Out",
      icon: "pi pi-sign-out",
      command: onSignOut,
    },
  ];

  return (
    <div className="flex align-items-center justify-content-center">
      <Menu
        model={items}
        popup
        ref={menuRight}
        id="popup_menu_right"
        popupAlignment="right"
      />

      <div
        onClick={(e) => menuRight.current.toggle(e)}
        className="cursor-pointer mr-2"
      >
        <Avatar label="U" size="large" shape="circle" />
      </div>
    </div>
  );
}
