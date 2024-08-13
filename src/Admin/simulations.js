import { useState, useEffect } from "react";
import MetricDisplay from "../Components/metric";
import ModalScreen from "./modal";
import { Table } from 'react-bootstrap';
import { getAllSimulations } from "../API/Admin";
import { toast } from 'react-toastify';
import { Spin } from "antd";
import moment from 'moment';

const Simulations = () => {

    const [show, setShow] = useState(false);
    const [isLoading, setIsLoading] = useState(true);
    const [simulations, setSimulations] = useState([]);

    const getAllSimulationsHandler = async () => {
        setIsLoading(true)
        const response = await getAllSimulations()
        if(response.code == 201){
          toast.success(response.message)
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

        // Create a Date object from the date string
        const date = new Date(dateString);

        // Extract the components
        const year = date.getUTCFullYear();
        const month = date.getUTCMonth() + 1; // Months are zero-based, so add 1
        const day = date.getUTCDate();
        let hours = date.getUTCHours();
        const minutes = date.getUTCMinutes();
        const seconds = date.getUTCSeconds();

        // Determine AM/PM
        const ampm = hours >= 12 ? 'PM' : 'AM';

        // Convert to 12-hour format
        hours = hours % 12;
        hours = hours ? hours : 12; // If hour is 0, set it to 12 (for 12 AM)

        // Format the date and time
        const formattedDate = `${month}/${day}/${year} ${hours}:${minutes.toString().padStart(2, '0')}:${seconds.toString().padStart(2, '0')} ${ampm}`;
        return formattedDate
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
        <ModalScreen show={show} modalToggle={modalToggle}/>
        <div className="d-flex justify-content-center align-items-center">
            <div className="mx-0 border border-dark rounded px-5 py-2 w-50 text-center ">
                <h1>Simulation Dashboard</h1>
            </div>
            <button type="button" class="btn btn-primary h-25 mx-5" onClick={() => modalToggle()}>+</button>
        </div>
        <div className="mt-5 px-5">
            {isLoading ? <div className="d-flex justify-content-center"><Spin size="large"/> </div>:
                <Table striped bordered hover>
                    <thead>
                    <tr>
                        <th className="text-center tablePlaceContent">Category</th>
                        <th className="text-center tablePlaceContent">Simulations</th>
                        <th className="text-center tablePlaceContent">Status</th>
                        <th className="text-center tablePlaceContent">Organization</th>
                        <th className="text-center tablePlaceContent">Date Administered</th>
                        <th className="text-center tablePlaceContent">Date Closed</th>
                        <th className="text-center tablePlaceContent">Duration</th>
                        <th className="text-center tablePlaceContent">Student Participated</th>
                    </tr>
                    </thead>
                    <tbody>
                    {
                        simulations.length && 
                        simulations.map((simulation) =>
                        <tr>
                            <td className="text-center tablePlaceContent"><a className="underline-offset pointer">{simulation.category}</a></td>
                            <td className="text-center tablePlaceContent"><a className="underline-offset pointer" href={`/admin/simulation/detail/${simulation.id}`}>{simulation.simulationName}</a></td>
                            <td className="text-center tablePlaceContent">{simulation.status ? "Active" : "Inactive"}</td>
                            <td className="text-center tablePlaceContent">{simulation.organizationName}</td>
                            <td className="text-center tablePlaceContent">{formatDateTimeHandler(simulation.startTime)}</td>
                            <td className="text-center tablePlaceContent">{formatDateTimeHandler(simulation.endTime)}</td>
                            <td className="text-center tablePlaceContent">{getDurationHandler(simulation.duration)}</td>
                            <td className="text-center tablePlaceContent">{simulation.participants}</td>
                        </tr>
                        )
                    }
                    </tbody>
                </Table>
            }
        </div>
      </div>
    );
  };
  
  export default Simulations;