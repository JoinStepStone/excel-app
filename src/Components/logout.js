import { useState } from "react";
import { Routes, Route, useLocation, useNavigate } from "react-router-dom";

const Logout = () => {

  const navigate = useNavigate();

  const naavigationHandler = () => {
    localStorage.removeItem("accessToken")
    navigate('/login')
  }
  
  return (
    <div className="border border-dark rounded text-center p-2 m-2 bg-white pointer" onClick={() => naavigationHandler()}>
      Logout
    </div>
  );
  };
  
  export default Logout;