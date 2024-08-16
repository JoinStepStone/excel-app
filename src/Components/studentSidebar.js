import { useState } from "react";
import MenuItems from "./menuItems";
import Logout from "./logout";
import ProfileIcon from "./profileIcon";

const SidebarStudent = () => {
    return (
      <div className="w-25 h-100 bg-purple">
        <ProfileIcon />
        <div className="h-50 d-flex align-items-center justify-content-center">
          <div>
            <MenuItems title="Dashboard" path="/"/>
            <MenuItems title="My Simulations" path="/student/simulation" />
            <MenuItems title="Up Coming Events" path="/student/upComingEvents" />
          </div>
        </div>
        <div className="h-25 d-flex align-items-end justify-content-center">
          <Logout />
        </div>
      </div>
    );
  };
  
  export default SidebarStudent;