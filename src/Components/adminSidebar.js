import { useState } from "react";
import MenuItems from "./menuItems";
import Logout from "./logout";
import ProfileIcon from "./profileIcon";
import EditAdminModalScreen from "../Views/Admin/editAdminModal";

const SidebarAdmin = () => {
    const [show, setShow] = useState(false);
    const modalToggle = () => {
      setShow(!show)
  };
    return (
      <div className="h-100 bg-purple" style={{ width: "25%" }}>
        {show && <EditAdminModalScreen show={show} modalToggle={modalToggle}/>}
        <ProfileIcon modalToggle={modalToggle} />
        <div className="h-50 d-flex align-items-center justify-content-center">
          <div>
            <MenuItems title="Dashboard" path="/" />
            <MenuItems title="Students" path="/admin/students" />
            <MenuItems title="Simulations" path="/admin/simulation" />
          </div>
        </div>
        <div className="h-25 d-flex align-items-end justify-content-center">
          <Logout />
        </div>
      </div>
    );
  };
  
  export default SidebarAdmin;