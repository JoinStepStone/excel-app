// src/App.js
import React, { useState, useEffect } from 'react';
import { Routes, Route, useLocation, useNavigate } from "react-router-dom";
import './App.css';
import 'bootstrap/dist/css/bootstrap.min.css';

import SidebarAdmin from './Components/adminSidebar';
import Admin from "./Views/Admin"
import Student from './Views/Admin/students';
import Simulations from './Views/Admin/simulations';
import SimulationDetails from './Views/Admin/simulationDetails';
import NoPage from './Components/noPage';

import SidebarStudent from './Components/studentSidebar';
import StudentDashboard from "./Views/Student"
import SimulationStudents from './Views/Student/simulations';
import SimulationDetailsStudents from './Views/Student/simulationDetails';
import UpComingEvent from './Views/Student/upComingEvent';

import Login from './Views/Authentication';
import SignUP from './Views/Authentication/signUp';

import { checkAuth } from "./API/Authorization"
import { toast } from 'react-toastify';

function App() { 

  const [path, setPath] = useState(null); //Admin Student Not
  const [userRole, setUserRole] = useState("Not"); //Admin Student Not
  const location = useLocation();

  const getSession = async () => {
    try {
      // const response = await checkAuth()
      // if(response.code == 201){
        const role = JSON.parse(localStorage.getItem("accessToken"))
        setPath(location.pathname)
        if(role){
          setUserRole(role.role)
        }else{
          setUserRole("Not")
        }
      // }else{
      //   // toast.error(response.message)
      //   setUserRole("Not")
      // }
      
    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => {
    if(path !== location.pathname){
      getSession()
    }
  },[location])

  return (
    <div className="app">
      {userRole == "Admin" && <SidebarAdmin/> }
      {userRole == "Student" && <SidebarStudent/> }
        {userRole == "Not" &&
          <main className="content">
          <Routes>
            <Route path="/login" element={<Login />} />
            <Route path="/signUp" element={<SignUP />} />
            <Route path="*" element={<NoPage />} />
          </Routes>
          </main>
        }
        {userRole == "Admin" &&
          <main className="content" style={{ width: "85%" }}>
          <Routes>
            <Route path="/" element={<Admin />} />
            <Route path="/admin/students" element={<Student />} />
            <Route path="/admin/simulation" element={<Simulations />} />
            <Route path="/admin/simulation/detail/:id" element={<SimulationDetails />} />
            <Route path="*" element={<NoPage />} />
          </Routes>
          </main>
        }
        {userRole == "Student" &&
          <main className="content" style={{ width: "85%" }}>
          <Routes>
            <Route path="/" element={<StudentDashboard />} />
            <Route path="/student/simulation" element={<SimulationStudents />} />
            <Route path="/student/simulation/detail/:id" element={<SimulationDetailsStudents />} />
            <Route path="/student/upComingEvents" element={<UpComingEvent />} />
            <Route path="*" element={<NoPage />} />
          </Routes>
          </main>
        }
    </div>
  );
}

export default App;
