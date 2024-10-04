import { useState } from "react";
import MenuItems from "./menuItems";
import Logout from "./logout";
import ProfileIcon from "./profileIcon";
import EditStudentModalScreen from "../Views/Student/editStudentModal";
import { FaUser } from 'react-icons/fa';
import { FaComputer } from "react-icons/fa6";
import { CiLogout } from "react-icons/ci";
const SidebarStudent = () => {
  const [show, setShow] = useState(false);
    const modalToggle = () => {
      setShow(!show)
  };

  return (
    <div className="h-100 bg-purple" style={{ width: "15%" }}>
      {show && <EditStudentModalScreen show={show} modalToggle={modalToggle}/>}
      <ProfileIcon modalToggle={modalToggle} />
      <div className="h-50 d-flex align-items-center justify-content-center w-100">
        <div style={{ width:"100%" }} className="p-2">
          {/* <MenuItems title="Dashboard" path="/"/> */}
          <MenuItems title="My Simulations" path="/student/simulation" icon={<FaComputer style={{ fontSize: '20px' }} />}/>
          <Logout margin={true} icon={<CiLogout style={{ fontSize: '20px' }}/>}/>
          {/* <MenuItems title="Upcoming Events" path="/student/upComingEvents" /> */}
        </div>
      </div>
    </div>
  );
};
  
export default SidebarStudent;