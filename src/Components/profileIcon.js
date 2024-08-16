import { useState } from "react";
import { Routes, Route, useLocation, useNavigate } from "react-router-dom";
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faEdit, faEyeSlash } from '@fortawesome/free-solid-svg-icons';

const ProfileIcon = ({ modalToggle }) => {

  const navigate = useNavigate();

  
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
            className="bg-white pointer px-2 d-flex align-items-center"
            style={{ width: "max-content" }}
            onClick={modalToggle}
          >
            <FontAwesomeIcon icon={faEdit}  /> 
            <h5 className="pt-2 mx-2">Edit Profile</h5>
          </div>
        </div>
      </div>
      <div className="d-flex rounded align-items-center justify-content-center mt-2 w-75 pointer">
        <h5 className="text-white">Nauman Ahmed</h5>
      </div>
      
    </div>
  );
  };
  
  export default ProfileIcon;