import { useRef } from "react";
import { useNavigate } from "react-router-dom";
import { Menu } from "primereact/menu";
export default function AuthDropdown() {
  const navigate = useNavigate();
  const menuRight = useRef(null);
  const items = [
    {
      label: "Sign In",
      command: () => {
        navigate("/signin");
      },
    },

    {
      label: "Sign Up",
      ccommand: () => {
        navigate("/signup");
      },
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
        className="cursor-pointer p-4 mr-2"
      >
        <i className="pi pi-user"></i>
      </div>
    </div>
  );
}
