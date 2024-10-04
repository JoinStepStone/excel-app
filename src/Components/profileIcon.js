import { useState, useEffect } from "react";
import { Routes, Route, useLocation, useNavigate } from "react-router-dom";
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faEdit, faEyeSlash } from '@fortawesome/free-solid-svg-icons';

const ProfileIcon = ({ modalToggle }) => {

  const navigate = useNavigate();
  const [firstName, setFirstName] = useState(null);

  useEffect(() => {
    const details = JSON.parse(localStorage.getItem("accessToken"))
    setFirstName(details.name)
},[])

  return (
    <div className="d-flex rounded align-items-center justify-content-center border-purple-dark p-3 m-4">
      <div className="w-25 profile-icon d-flex justify-content-center flex-column position-relative pointer" >
        <img
          style={{ borderRadius: "20px", zIndex: "1" }}
          width={"30px"}
          height={"30px"}
          src="/profilePic.png"
        />
        <div
          class="position-absolute profile-dropdown"
          style={{ marginTop: "60px", marginLeft: "5px" }}
        >
          <div className="triangle" style={{ marginTop: "30px", }}/>
          <div 
            className="bg-button-color pointer px-2 d-flex align-items-center"
            style={{ width: "max-content" }}
            onClick={modalToggle}
          >
            <FontAwesomeIcon icon={faEdit}  /> 
            <h5 className="pt-2 mx-2">Edit Profile</h5>
          </div>
        </div>
      </div>
      <div className="d-flex rounded align-items-center justify-content-center mt-3 mx-1 w-75  pointer">
        <p className="text-white" style={{ fontSize: "15px" }}>{firstName}</p>
      </div>
      
    </div>
  );
  };
  
  export default ProfileIcon;