import { useState, useEffect } from "react";
import { Table } from 'react-bootstrap';
import { useParams, useNavigate } from 'react-router-dom';
import { getAllUserSimulations } from "../API/Admin";
import ModalScreen from "./modal";
import { toast } from 'react-toastify';
import { Spin } from "antd";
import moment from 'moment';

const SimulationDetails = () => {
    
    const navigate = useNavigate()

    const { id } = useParams();
    const [show, setShow] = useState(false);
    const [isLoading, setIsLoading] = useState(true);
    const [userSimulations, setUserSimulations] = useState([]);
    const [simulation, setSimulation] = useState({});

    const getAllUserSimulationsHandler = async () => {
        setIsLoading(true)
        const response = await getAllUserSimulations({
            "simulationId": id
        })
        if(response.code == 201){
          toast.success(response.message)
          setSimulation(response.data.simulationDetails)
          setUserSimulations(response.data.result)
        }else{
          toast.error(response.message)
          navigate("/admin/students")
        }
        setIsLoading(false)
    }

    useEffect(() => {
        getAllUserSimulationsHandler()
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

    const calculateDurationHandler = (endDate,startDate) => { 
        // Create a Date object from the date string
        const endDateDummy = moment(endDate)
        const currentDate = moment(startDate)
        const differenceInMinutes = endDateDummy.diff(currentDate, 'minutes');
        console.log("calculateDurationHandler",endDateDummy, currentDate, differenceInMinutes)
        return Math.abs(differenceInMinutes.toFixed(0)) + " minutes";
    }

    const getDurationHandler = (dateString) => { 
        
        return moment.duration(dateString).asMinutes() + " minutes";
    }

    const getFilePathHandler = (filePath) => {
        const filePathArray = filePath.split("/")
        return filePathArray[filePathArray.length - 1]
    }

    const modalToggle = (loadData = false) => {
        if(loadData){
            getAllUserSimulationsHandler()
        }
        setShow(!show)
    };
 
    return (
      <div className="pt-5 ">
        <ModalScreen show={show} modalToggle={modalToggle}/>
        <a className="underline-offset pointer mx-5" onClick={() => navigate("/admin/simulation")}>Simulation Home</a>
        <div className="d-flex justify-content-center align-items-center">
            <div className="mx-0 border border-dark rounded px-5 py-2 w-50 text-center ">
                <h1>{simulation.simulationName}</h1>
            </div>
        </div>
        <div className="row mt-3 px-5">
            <div  className="col-4 d-flex justify-content-between">
                <div>
                    <h5>Status</h5>
                </div>
                <div>
                    {simulation.status ? "Active": "Inactive"}
                </div>
            </div>
            <div  className="col-4 d-flex justify-content-between">
                <div>
                    <h5>Date Closed</h5>
                </div>
                <div>
                    {formatDateTimeHandler(simulation.endTime)}
                </div>
            </div>
            <div  className="col-4 d-flex justify-content-between">
                <div>
                  <h5>Class Code</h5>
                </div>
                <div>
                    {simulation.classCode}
                </div>
            </div>
        </div>
        <div className="row mt-1 px-5">
            <div  className="col-4 d-flex justify-content-between">
                <div>
                  <h5>Organization</h5>
                </div>
                <div>
                    {simulation.organizationName}
                </div>
            </div>
            <div  className="col-4 d-flex justify-content-between">
                <div>
                  <h5>Duration</h5>
                </div>
                <div>
                    {getDurationHandler(simulation.duration)}
                </div>
            </div>
        </div>
        <div className="row mt-1 px-5">
            <div  className="col-4 d-flex justify-content-between">
                <div>
                  <h5>Date Administered</h5>
                </div>
                <div>
                    {formatDateTimeHandler(simulation.startTime)}
                </div>
            </div>
            <div  className="col-4 d-flex justify-content-between">
                <div>
                  <h5>Student Participated</h5>
                </div>
                <div>
                    {simulation.participants}
                </div>
            </div>
        </div>
        <div className="mt-5 px-5">
            {isLoading ? <div className="d-flex justify-content-center"><Spin size="large"/> </div>:
                <Table striped bordered hover responsiveness>
                    <thead>
                    <tr>
                        <th className="text-center tablePlaceContent">Student</th>
                        <th className="text-center tablePlaceContent">Rank</th>
                        <th className="text-center tablePlaceContent">Grade</th>
                        <th className="text-center tablePlaceContent">Time to Complete</th>
                        <th className="text-center tablePlaceContent">Duration</th>
                        <th className="text-center tablePlaceContent">University</th>
                        <th className="text-center tablePlaceContent">Graduation Year</th>
                        <th className="text-center tablePlaceContent">Sharing Score</th>
                        <th className="text-center tablePlaceContent">File Download</th>
                    </tr>
                    </thead>
                    <tbody>
                        {
                            userSimulations.length && 
                            userSimulations.map((userSimulation) =>               
                            <tr>
                                <td className="text-center tablePlaceContent"><a className="underline-offset">{userSimulation.userId.firstName} {userSimulation.userId.lastName}</a></td>
                                <td className="text-center tablePlaceContent"><a className="underline-offset">{userSimulation.rank}</a></td>
                                <td className="text-center tablePlaceContent">{userSimulation.grade}</td>
                                <td className="text-center tablePlaceContent">{calculateDurationHandler(userSimulation.endTime,userSimulation.startTime)}</td>
                                <td className="text-center tablePlaceContent">{getDurationHandler(simulation.duration)}</td>
                                <td className="text-center tablePlaceContent">{userSimulation.userId.university}</td>
                                <td className="text-center tablePlaceContent">{userSimulation.userId.gradYear}</td>
                                <td className="text-center tablePlaceContent">{userSimulation.sharingScore ? "Yes" : "No"}</td>
                                <td className="text-center tablePlaceContent">{getFilePathHandler(simulation.filePath)}</td>
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
  
  export default SimulationDetails;