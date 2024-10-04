import { useState } from "react";
import { Routes, Route, useLocation, useNavigate } from "react-router-dom";

const Logout = ({ margin, icon }) => {

  const navigate = useNavigate();

  const naavigationHandler = () => {
    localStorage.removeItem("accessToken")
    navigate('/login')
  }
  
  return (
    <div className={margin ? "border border-dark  text-center p-2 mt-2 bg-button-color pointer" : "border border-dark  text-center p-2 m-2 bg-button-color pointer"} onClick={() => naavigationHandler()}>
      Logout
      {icon && icon}
    </div>
  );
  };
  
  export default Logout;