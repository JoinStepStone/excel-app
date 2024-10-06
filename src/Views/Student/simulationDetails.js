import { useState, useEffect, useRef } from "react";
import { Table } from 'react-bootstrap';
import { useParams, useNavigate } from 'react-router-dom';
import { toast } from 'react-toastify';
import { Spin } from "antd";
import moment from 'moment';
import ModalUpload from "./uploadModal";
import { getSimulationDetails, fileDeleteHandlerAPI, updateSharingScoreApi } from "../../API/Student";
import { downloadFile, showGradeNow } from "../../utilities/common";
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faEdit, faTrash } from '@fortawesome/free-solid-svg-icons';
import { Dropdown, DropdownButton } from 'react-bootstrap';

const SimulationDetails = () => {  
    
    const navigate = useNavigate()

    const { id } = useParams();
    const userSimulationUpdate = useRef(null);
    const [edit, setEdit] = useState(false);
    const [show, setShow] = useState(false);
    const [isLoading, setIsLoading] = useState(true);
    const [userDetails, setUserDetails] = useState({});
    const [userSimulations, setUserSimulations] = useState([]);
    const [simulation, setSimulation] = useState({});

    const getAllUserSimulationsHandler = async () => {
        setIsLoading(true)
        const response = await getSimulationDetails(id)
        if(response.code == 201){
            //   toast.success(response.message)
            setSimulation(response.data.simulationDetails)
            setUserSimulations(response.data.result)
            setUserDetails(response.data.userDetails)
        }else{
            toast.error(response.message)
            navigate("/student/simulation")
        }
        setIsLoading(false)
    }

    useEffect(() => {
        getAllUserSimulationsHandler()
    },[])

    const formatDateTimeHandler = (dateString) => {

        const date = moment(dateString)
        const updatedDate = date.format("M/D/YYYY h:mm:ss A");
        return updatedDate

    }

    const calculateDurationHandler = (dateString) => { 

        const endDate = moment(dateString)
        const currentDate = moment()
        const differenceInMinutes = endDate.diff(currentDate, 'minutes')
        if(differenceInMinutes.toFixed(0) < 0 ){
            return "0 minutes";
        }
        return differenceInMinutes.toFixed(0) + " minutes";

    }

    const getDurationHandler = (dateString) => { 
        return moment.duration(dateString).asMinutes() + " minutes";
    }

    const getFilePathHandler = (filePath) => {
        // const filePathArray = filePath.split("/")
        return filePath
    }

    const modalToggle = (loadData=false) => {
        if(loadData){
            getAllUserSimulationsHandler()
        }
        setShow(!show) 
    };

    const fileDeleteHandler = async(obj) => {
        setIsLoading(true)
        const response = await fileDeleteHandlerAPI(obj)
        if(response.code == 201){
            getAllUserSimulationsHandler()
        }else{
            toast.error(response.message)
        }
        setIsLoading(false)
    }

    const updateSharingScore = async (obj) => {
        setIsLoading(true)
        const response = await updateSharingScoreApi(obj)
        if(response.code == 201){
            getAllUserSimulationsHandler()
        }else{
            toast.error(response.message)
        }
        setIsLoading(false)
        setEdit(false)
    }

    return (
      <div className="pt-5 ">
        <ModalUpload 
            show={show} 
            modalToggle={modalToggle} 
            onClick={() => navigate("/student/simulation")} simulationId={id} simulation={simulation}
            userSimulationUpdate={userSimulationUpdate.current}
        />
        <a className="underline-offset pointer mx-5" onClick={() => navigate("/student/simulation")}>Simulation Home</a>
        <div className="d-flex justify-content-center align-items-center">
            <div className="mx-0 border border-dark rounded px-5 py-2 w-50 text-center ">
                <h1>Simulation Download</h1>
                {/* <h1>{simulation.simulationName}</h1> */}
            </div>
        </div>
        <div className="row mt-3 px-5">
            <div  className="col-4 d-flex justify-content-between">
                <div>
                    <h5 className="font-semi-bold">Status</h5>
                </div>
                <div>
                    {simulation.status ? "Active": "Inactive"}
                </div>
            </div>
            <div  className="col-4 d-flex justify-content-between">
                <div>
                    <h5 className="font-semi-bold">Date Closed</h5>
                </div>
                <div>
                    {formatDateTimeHandler(simulation.endTime)}
                </div>
            </div>
            <div  className="col-4 d-flex justify-content-between">
                <div>
                  <h5 className="font-semi-bold">Class Code</h5>
                </div>
                <div>
                    {simulation.classCode}
                </div>
            </div>
        </div>
        <div className="row mt-1 px-5">
            <div  className="col-4 d-flex justify-content-between">
                <div>
                  <h5 className="font-semi-bold">Organization</h5>
                </div>
                <div>
                    {simulation.organizationName}
                </div>
            </div>
            <div  className="col-4 d-flex justify-content-between">
                <div>
                  <h5 className="font-semi-bold">Duration</h5>
                </div>
                <div>
                  {getDurationHandler(simulation.duration)}
                </div>
            </div>
        </div>
        <div className="row mt-1 px-5">
            <div  className="col-4 d-flex justify-content-between">
                <div>
                  <span className="font-semi-bold">Date Administered</span>
                </div>
                <div>
                    {formatDateTimeHandler(simulation.startTime)}
                </div>
            </div>
        </div>
        <div className="mt-5 px-5"> 
            {isLoading ? <div className="d-flex justify-content-center"><Spin size="large"/> </div>:
                <Table striped bordered responsive hover >
                    <thead>
                    <tr>
                        <th className="text-center tablePlaceContent">Student</th>
                        <th className="text-center tablePlaceContent">Simulation Downloads</th>
                        <th className="text-center tablePlaceContent">Completed Simulation Upload</th>
                        <th className="text-center tablePlaceContent">Time Remaining</th>
                        <th className="text-center tablePlaceContent">Grade</th>
                        <th className="text-center tablePlaceContent">Sharing Score</th>
                        <th className="text-center tablePlaceContent">Action</th>
                    </tr>
                    </thead>
                    <tbody>
                    {
                        userSimulations.length ? 
                        userSimulations.map((userSimulation) =>        
                        <tr>
                            <td className="text-center tablePlaceContent">{userDetails.firstName} {userDetails.lastName}</td>
                            <td className="text-center tablePlaceContent"><a className="underline-offset pointer" onClick={() => downloadFile(simulation, true)}>{getFilePathHandler(simulation.fileName)}</a></td>
                            <td className="text-center tablePlaceContent">
                                <a className="underline-offset" 
                                // onClick={() => modalToggle()}
                                >
                                    {userSimulation.fileName ?
                                        <>
                                            {userSimulation.fileName} 
                                        </>
                                        :
                                        "Upload File"
                                    }
                                </a>
                                { userSimulation.fileName && 
                                    <span className="mx-2">
                                    {
                                    calculateDurationHandler(simulation.endTime) !== "0 minutes" ?
                                        <FontAwesomeIcon icon={faTrash} className="mx-2 icon-color pointer" onClick={() => fileDeleteHandler({_id : userSimulation._id , fileId : userSimulation.fileId})} /> 
                                        : null
                                    }
                                    </span> 
                                }
                            </td>
                            <td className="text-center tablePlaceContent">{calculateDurationHandler(simulation.endTime)}</td>
                            <td className="text-center tablePlaceContent">{showGradeNow(simulation.endTime) ? userSimulation.grade+"%" : "Active Simulation"}</td>
                            <td className="text-center tablePlaceContent">
                                {edit ? 
                                    <DropdownButton 
                                        id="dropdown-ethnicity-button" 
                                        className="my-2" 
                                        variant={"primary"} 
                                        title={userSimulation.sharingScore ? "Yes": "No"} 
                                        onSelect={(ans) => updateSharingScore({_id : userSimulation._id , sharingScore: ans == "Yes" ? true : false})}
                                        >
                                        <Dropdown.Item eventKey="Yes">Yes</Dropdown.Item>
                                        <Dropdown.Item eventKey="No">No</Dropdown.Item>
                                    </DropdownButton>
                                    :
                                    userSimulation.sharingScore ? "Yes": "No"
                                }
                            </td>
                            <td className="text-center tablePlaceContent">
                                <FontAwesomeIcon icon={faEdit} className="mx-2 pointer" onClick={() => { userSimulationUpdate.current = {_id : userSimulation._id}; modalToggle();}} /> 
                            </td>
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
  
  export default SimulationDetails;