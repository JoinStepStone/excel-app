import { useState } from "react";
import MenuItems from "./menuItems";
import Logout from "./logout";
import ProfileIcon from "./profileIcon";
import EditStudentModalScreen from "../Views/Student/editStudentModal";

const SidebarStudent = () => {
  const [show, setShow] = useState(false);
    const modalToggle = () => {
      setShow(!show)
  };

  return (
    <div className="h-100 bg-purple" style={{ width: "15%" }}>
      {show && <EditStudentModalScreen show={show} modalToggle={modalToggle}/>}
      <ProfileIcon modalToggle={modalToggle} />
      <div className="h-50 d-flex align-items-center justify-content-center">
        <div>
          {/* <MenuItems title="Dashboard" path="/"/> */}
          <MenuItems title="My Simulations" path="/student/simulation" />
          {/* <MenuItems title="Upcoming Events" path="/student/upComingEvents" /> */}
        </div>
      </div>
      <div className="h-25 d-flex align-items-end justify-content-center">
        <Logout />
      </div>
    </div>
  );
};
  
export default SidebarStudent;