import { useState } from "react";
import { Table } from 'react-bootstrap';

import MetricDisplay from "../Components/metric";
import ModalRegister from "./registerModal";

const SimulationStudents = () => {

    const [show, setShow] = useState(false);
    const modalToggle = () => setShow(!show);

    return (
      <div className="pt-5 ">
        <ModalRegister show={show} modalToggle={modalToggle}/>
        <div className="d-flex justify-content-center align-items-center">
            <div className="mx-0 border border-dark rounded px-5 py-2 w-50 text-center ">
                <h1>John's Simulation Dashboard</h1>
            </div>
            <button type="button" class="btn btn-primary h-25 mx-5" onClick={() => modalToggle()}>Register</button>
        </div>
        <div className="mt-5 px-5">
            <Table striped bordered hover>
                <thead>
                <tr>
                    <th className="text-center">Simulations</th>
                    <th className="text-center">Status</th>
                    <th className="text-center">Grade</th>
                    <th className="text-center">Date Administered</th>
                    <th className="text-center">Date Closed</th>
                    <th className="text-center">Duration</th>
                    <th className="text-center">Student Participated</th>
                    <th className="text-center"></th>
                </tr>
                </thead>
                <tbody>
                <tr>
                    <td className="text-center"><a className="underline-offset pointer" href="/student/simulation/detail/beginnerSimulations1">Beginner Simulations 1</a></td>
                    <td className="text-center">In Progress</td>
                    <td className="text-center">97.0</td>
                    <td className="text-center">Harvard University</td>
                    <td className="text-center">2026</td>
                    <td className="text-center">Female</td>
                    <td className="text-center">White</td>
                    <td className="text-center"><a className="underline-offset pointer">Start</a></td>
                </tr>
                <tr>
                    <td className="text-center"><a className="underline-offset pointer" href="/student/simulation/detail/beginnerSimulations2">Beginner Simulations 2</a></td>
                    <td className="text-center">In Progress</td>
                    <td className="text-center">97.0</td>
                    <td className="text-center">Harvard University</td>
                    <td className="text-center">2026</td>
                    <td className="text-center">Female</td>
                    <td className="text-center">White</td>
                    <td className="text-center"><a className="underline-offset pointer">Start</a></td>
                </tr>
                <tr>
                    <td className="text-center"><a className="underline-offset pointer" href="/student/simulation/detail/beginnerSimulations3">Beginner Simulations 3</a></td>
                    <td className="text-center">In Progress</td>
                    <td className="text-center">97.0</td>
                    <td className="text-center">Harvard University</td>
                    <td className="text-center">2026</td>
                    <td className="text-center">Female</td>
                    <td className="text-center">White</td>
                    <td className="text-center"><a className="underline-offset pointer">Start</a></td>
                </tr>
                </tbody>
            </Table>
        </div>
      </div>
    );
  };
  
  export default SimulationStudents;