import { useState } from "react";
import MenuItems from "./menuItems";
import Logout from "./logout";

const SidebarAdmin = () => {
    return (
      <div className="w-25 h-100 bg-purple">
        <div className="h-75 d-flex align-items-center justify-content-center">
          <div>
            <MenuItems title="Dashboard" path="/" />
            <MenuItems title="Students" path="/admin/students" />
            <MenuItems title="Simulations" path="/admin/simulation" />
          </div>
        </div>
        <div className="h-25 d-flex align-items-center justify-content-center">
          <Logout />
        </div>
      </div>
    );
  };
  
  export default SidebarAdmin;