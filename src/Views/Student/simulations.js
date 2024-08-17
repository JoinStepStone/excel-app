import { useState, useEffect } from "react";
import { Table } from 'react-bootstrap';
import { toast } from 'react-toastify';
import { Spin } from "antd";
import moment from 'moment';

import { getAllSimulations } from "../../API/Student";
import MetricDisplay from "../../Components/metric";
import ModalRegister from "./registerModal";

const SimulationStudents = () => {

    const [show, setShow] = useState(false);
    const [isLoading, setIsLoading] = useState(true);
    const [userSimulations, setUserSimulations] = useState([]);
    const [simulations, setSimulations] = useState([]);

    const getAllSimulationsHandler = async () => {
        setIsLoading(true)
        const response = await getAllSimulations()
        if(response.code == 201){
        //   toast.success(response.message)
          setSimulations(response.data)
        }else{
          toast.error(response.message)
        }
        setIsLoading(false)
    }

    useEffect(() => {
        getAllSimulationsHandler()
    },[])

    const formatDateTimeHandler = (dateString) => {

        // Parse the date string using moment
        const date = moment(dateString).subtract(2, 'hours');

        // Format the result to display the updated time
        const updatedDate = date.format("M/D/YYYY h:mm:ss A");

        return updatedDate
    }

    const getDurationHandler = (dateString) => {
        return moment.duration(dateString).asMinutes() + " minutes";
    }

    const modalToggle = (loadData = false) => {
        if(loadData){
            getAllSimulationsHandler()
        }
        setShow(!show)
    };
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
            {isLoading ? <div className="d-flex justify-content-center"><Spin size="large"/> </div>:
                <Table striped bordered hover>
                    <thead>
                    <tr>
                        <th className="text-center tablePlaceContent">Simulations</th>
                        <th className="text-center tablePlaceContent">Status</th>
                        <th className="text-center tablePlaceContent">Grade</th>
                        <th className="text-center tablePlaceContent">Date Administered</th>
                        <th className="text-center tablePlaceContent">Date Closed</th>
                        <th className="text-center tablePlaceContent">Duration</th>
                        <th className="text-center tablePlaceContent">Student Participated</th>
                        <th className="text-center tablePlaceContent"></th>
                    </tr>
                    </thead>
                    <tbody>
                        {
                            simulations.length ? 
                            simulations.map((simulation) =>
                            <tr>
                                <td className="text-center tablePlaceContent"><a className="underline-offset pointer" href={`/student/simulation/detail/${simulation._id}`}>{simulation.simulationName}</a></td>
                                <td className="text-center tablePlaceContent">{simulation.status ? "Active" : "Inactive"}</td>
                                <td className="text-center tablePlaceContent">{simulation.grade}</td>
                                <td className="text-center tablePlaceContent">{formatDateTimeHandler(simulation.startTime)}</td>
                                <td className="text-center tablePlaceContent">{formatDateTimeHandler(simulation.endTime)}</td>
                                <td className="text-center tablePlaceContent">{getDurationHandler(simulation.duration)}</td>
                                <td className="text-center tablePlaceContent">{simulation.participants}</td>
                                <td className="text-center tablePlaceContent"><a className="underline-offset pointer">Start</a></td>
                            </tr>
                        )
                        : null
                        }
                    </tbody>
                </Table>
            }
        </div>
      </div>
    );
  };
  
  export default SimulationStudents;