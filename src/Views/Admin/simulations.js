import { useState, useEffect } from "react";
import MetricDisplay from "../../Components/metric";
import { useNavigate } from 'react-router-dom';
import ModalScreen from "./modal";
import { Table } from 'react-bootstrap';
import { getAllSimulations, downloadFileAPI } from "../../API/Admin";
import { toast } from 'react-toastify';
import { Spin } from "antd";
import moment from 'moment';

const Simulations = () => {

    const navigate = useNavigate();
    const [show, setShow] = useState(false);
    const [isLoading, setIsLoading] = useState(true);
    const [simulations, setSimulations] = useState([]);

    const getAllSimulationsHandler = async () => {
        setIsLoading(true)
        const response = await getAllSimulations()
        console.log("setIsLoading",response)
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
    
    const downloadFile = (id) => {
        // Open a new window
        const downloadWindow = window.open(
          "http://127.0.0.1:5000/admin/downloadSimulationFile/"+id,
          "_blank"
        );
    
        // Check if the window opened successfully
        if (downloadWindow) {
          // Poll the window for its 'closed' status
          const interval = setInterval(() => {
            // If the window is closed, clear the interval
            if (downloadWindow.closed) {
              clearInterval(interval);
            }
          }, 1000);
    
          // Close the window after a brief delay (assuming the download has started)
          setTimeout(() => {
            downloadWindow.close();
          }, 3000); // 3000ms (3 seconds) is usually enough time for the download to start
        } else {
          console.error("Failed to open the download window.");
        }
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
                        <th className="text-center tablePlaceContent">Download File</th>
                    </tr>
                    </thead>
                    <tbody>
                    {
                        simulations.length ? 
                        simulations.map((simulation) =>
                        <tr>
                            <td className="text-center tablePlaceContent"><a className="underline-offset pointer">{simulation.category}</a></td>
                            <td className="text-center tablePlaceContent" onClick={() => navigate("/admin/simulation/detail/"+simulation.id)}><a className="underline-offset pointer">{simulation.simulationName}</a></td>
                            <td className="text-center tablePlaceContent">{simulation.status ? "Active" : "Inactive"}</td>
                            <td className="text-center tablePlaceContent">{simulation.organizationName}</td>
                            <td className="text-center tablePlaceContent">{formatDateTimeHandler(simulation.startTime)}</td>
                            <td className="text-center tablePlaceContent">{formatDateTimeHandler(simulation.endTime)}</td>
                            <td className="text-center tablePlaceContent">{getDurationHandler(simulation.duration)}</td>
                            <td className="text-center tablePlaceContent">{simulation.participants}</td>
                            <td className="text-center tablePlaceContent" onClick={() => downloadFile(simulation.fileId)}><a className="underline-offset pointer">{simulation.fileName}</a></td>
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
  
  export default Simulations;