import { useState, } from "react";
import { Table } from 'react-bootstrap';
import { useParams, useNavigate } from 'react-router-dom';

import ModalScreen from "./modal";

const SimulationDetails = () => {
    
    const navigate = useNavigate()

    const { id } = useParams();
    const [show, setShow] = useState(false);
    const modalToggle = () => setShow(!show);

    return (
      <div className="pt-5 ">
        <ModalScreen show={show} modalToggle={modalToggle}/>
        <a className="underline-offset pointer mx-5" onClick={() => navigate("/admin/simulation")}>Simulation Home</a>
        <div className="d-flex justify-content-center align-items-center">
            <div className="mx-0 border border-dark rounded px-5 py-2 w-50 text-center ">
                <h1>{id}</h1>
            </div>
        </div>
        <div className="row mt-3 px-5">
            <div  className="col-4 d-flex justify-content-between">
                <div>
                    <h5>Status</h5>
                </div>
                <div>
                    Active
                </div>
            </div>
            <div  className="col-4 d-flex justify-content-between">
                <div>
                    <h5>Date Closed</h5>
                </div>
                <div>
                    7/26/2024 6:15:30 PM
                </div>
            </div>
            <div  className="col-4 d-flex justify-content-between">
                <div>
                  <h5>Class Code</h5>
                </div>
                <div>
                    Active
                </div>
            </div>
        </div>
        <div className="row mt-1 px-5">
            <div  className="col-4 d-flex justify-content-between">
                <div>
                  <h5>Organization</h5>
                </div>
                <div>
                    Tamid
                </div>
            </div>
            <div  className="col-4 d-flex justify-content-between">
                <div>
                  <h5>Duration</h5>
                </div>
                <div>
                    60 minutes
                </div>
            </div>
        </div>
        <div className="row mt-1 px-5">
            <div  className="col-4 d-flex justify-content-between">
                <div>
                  <h5>Date Administered</h5>
                </div>
                <div>
                    7/26/2024 6:15:30 PM
                </div>
            </div>
            <div  className="col-4 d-flex justify-content-between">
                <div>
                  <h5>Student Participated</h5>
                </div>
                <div>
                    5
                </div>
            </div>
        </div>
        <div className="mt-5 px-5">
            <Table striped bordered hover>
                <thead>
                <tr>
                    <th className="text-center">Student</th>
                    <th className="text-center">Rank</th>
                    <th className="text-center">Grade</th>
                    <th className="text-center">Time to Complete</th>
                    <th className="text-center">Duration</th>
                    <th className="text-center">University</th>
                    <th className="text-center">Graduation Year</th>
                    <th className="text-center">Sharing Score</th>
                    <th className="text-center">File Download</th>
                </tr>
                </thead>
                <tbody>
                <tr>
                    <td className="text-center"><a className="underline-offset">Beginner</a></td>
                    <td className="text-center"><a className="underline-offset">Beginner Simulations 1</a></td>
                    <td className="text-center">97.0</td>
                    <td className="text-center">Harvard University</td>
                    <td className="text-center">2026</td>
                    <td className="text-center">Female</td>
                    <td className="text-center">White</td>
                    <td className="text-center">Hispanic</td>
                    <td className="text-center">Hispanic</td>
                </tr>
                <tr>
                    <td className="text-center"><a className="underline-offset">Beginner</a></td>
                    <td className="text-center"><a className="underline-offset">Beginner Simulations 1</a></td>
                    <td className="text-center">97.0</td>
                    <td className="text-center">Harvard University</td>
                    <td className="text-center">2026</td>
                    <td className="text-center">Female</td>
                    <td className="text-center">White</td>
                    <td className="text-center">Hispanic</td>
                    <td className="text-center">Hispanic</td>
                </tr>
                <tr>
                    <td className="text-center"><a className="underline-offset">Beginner</a></td>
                    <td className="text-center"><a className="underline-offset">Beginner Simulations 1</a></td>
                    <td className="text-center">97.0</td>
                    <td className="text-center">Harvard University</td>
                    <td className="text-center">2026</td>
                    <td className="text-center">Female</td>
                    <td className="text-center">White</td>
                    <td className="text-center">Hispanic</td>
                    <td className="text-center">Hispanic</td>
                </tr>
                </tbody>
            </Table>
        </div>
      </div>
    );
  };
  
  export default SimulationDetails;