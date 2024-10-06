import { useState, useEffect } from "react";
import { Table } from 'react-bootstrap';
import { useParams, useNavigate } from 'react-router-dom';
import { getAllUserSimulations } from "../../API/Admin";
import ModalScreen from "./modal";
import { toast } from 'react-toastify';
import { Spin } from "antd";
import moment from 'moment';
import { downloadFile } from "../../utilities/common";
import { Dropdown, DropdownButton } from 'react-bootstrap';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faRefresh } from '@fortawesome/free-solid-svg-icons';

const SimulationDetails = () => {
    
    const navigate = useNavigate()

    const { id } = useParams();
    const [show, setShow] = useState(false);
    const [isLoading, setIsLoading] = useState(true);
    const [userSimulations, setUserSimulations] = useState([]);
    const [userSimulationsToShow, setUserSimulationsToShow] = useState([]);
    const [simulation, setSimulation] = useState({});
    const [filters, setFilters] = useState({}); // State to store all filter conditions

    const getAllUserSimulationsHandler = async () => {
        setIsLoading(true)
        const response = await getAllUserSimulations({
            "simulationId": id
        })
        if(response.code == 201){
        //   toast.success(response.message)
          setSimulation(response.data.simulationDetails)
          setUserSimulations(response.data.result)
          setUserSimulationsToShow(response.data.result)
        }else{
          toast.error(response.message)
        //   navigate("/admin/simulation")
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

    const calculateDurationHandler = (endDate,startDate) => { 
        // Create a Date object from the date string
        const endDateDummy = moment(endDate)
        const currentDate = moment(startDate)
        const differenceInMinutes = endDateDummy.diff(currentDate, 'minutes');
        return Math.abs(differenceInMinutes.toFixed(0)) + " minutes";
    }

    const getDurationHandler = (dateString) => { 
        
        return moment.duration(dateString).asMinutes() + " minutes";
    }

    const getFilePathHandler = (filePath) => {
        // const filePathArray = filePath.split("/")
        return filePath
    }

    const modalToggle = (loadData = false) => {
        if(loadData){
            getAllUserSimulationsHandler()
        }
        setShow(!show)
    };
    
    const onChangeSimulationHandler = (e) => {
        let filteretUserSimulations;
        let { name, value } = e.target ? e.target : e;

        if(!value){
            return setUserSimulationsToShow(userSimulations)
        }
        const newFilters = { ...filters, [name]: value }; // Update filters with the new condition
        setFilters(newFilters);
        applyFilters(newFilters); // Reapply filters
        
        // if(name == "timeToComplete"){
        //     filteretUserSimulations = userSimulations.filter(userSimulation => {
        //         return calculateDurationHandler(userSimulation.endTime,userSimulation.startTime).toLowerCase().includes(value.toLowerCase())
        //     });
        // }else if(name == "sharingScore"){
        //     filteretUserSimulations = userSimulations.filter((userSimulation) => userSimulation[name].toString() == value );
        // }else{
        //   filteretUserSimulations = userSimulations.filter((userSimulation) => userSimulation[name].toLowerCase().includes(value.toLowerCase()) );
        // }
        // setUserSimulationsToShow(filteretUserSimulations)
    }

    const onChangeUserHandler = (e) => {
        let filteredUserSimulations;
        let { name, value } = e.target ? e.target : e;
        if(!value){
            return setUserSimulationsToShow(userSimulations)
        }

        const newFilters = { ...filters, [name]: value }; // Update filters with the new condition
        setFilters(newFilters);
        applyFilters(newFilters); // Reapply filters
        
        // filteredUserSimulations = userSimulations.filter((userSimulation) => userSimulation["userId"][name].toLowerCase().startsWith(value.toLowerCase() ));
        // setUserSimulationsToShow(filteredUserSimulations)
    }

    const onChangeMinMaxHandler = (e) => {
        let { name, value } = e;
        const newFilters = { ...filters, [name]: value }; // Update filters with the new condition
        setFilters(newFilters);
        applyFilters(newFilters); // Reapply filters

        // if(value == "Highest"){
        //     const highestScoreStudent = userSimulations.reduce((prev, current) => {
        //         return (current[name] > prev[name]) ? current : prev;
        //     }, userSimulations[0]);
        //     setUserSimulationsToShow([highestScoreStudent])
        // }else{
        //     const lowestScoreStudent = userSimulations.reduce((prev, current) => {
        //         return (current[name] < prev[name]) ? current : prev;
        //     }, userSimulations[0]);
        //     setUserSimulationsToShow([lowestScoreStudent])
        // }
    }

    const applyFilters = (activeFilters) => {
        let filteredUserSimulations = userSimulations;

        Object.keys(activeFilters).forEach((key) => {
            if(key == "rank" || key == "grade"){
                if (activeFilters[key] === "Highest") {
                    filteredUserSimulations = filteredUserSimulations.sort((a, b) => parseFloat(b[key]) - parseFloat(a[key]));
                } else if (activeFilters[key] === "Lowest") {
                    filteredUserSimulations = filteredUserSimulations.sort((a, b) => parseFloat(a[key]) - parseFloat(b[key]));
                }
                // if(activeFilters[key] == "Highest"){
                //     const filteredUserSimulationsDummy = filteredUserSimulations.reduce((prev, current) => {
                //         return (current[key] || 0) > (prev[key] || 0) ? current : prev;
                //     }, filteredUserSimulations[0]);
                //     filteredUserSimulations = [filteredUserSimulationsDummy]
                // }else{
                //     const filteredUserSimulationsDummy = filteredUserSimulations.reduce((prev, current) => {
                //         return (current[key] || 0) < (prev[key] || 0) ? current : prev;
                //     }, filteredUserSimulations[0]);
                //     filteredUserSimulations = [filteredUserSimulationsDummy]
                // }
            }else if(key == "firstName" || key == "university" || key == "gradYear"){
                filteredUserSimulations = filteredUserSimulations.filter((userSimulation) => userSimulation["userId"][key].toLowerCase().startsWith(activeFilters[key].toLowerCase() ));
            }else if(key == "fileName" || key == "sharingScore" || key == "duation" || key == "timeToComplete"){
                if(key == "timeToComplete"){
                    filteredUserSimulations = filteredUserSimulations.filter(userSimulation => {
                        return calculateDurationHandler(userSimulation.endTime,userSimulation.startTime).toLowerCase().includes(activeFilters[key].toLowerCase())
                });
                }else if(key == "sharingScore"){
                    filteredUserSimulations = filteredUserSimulations.filter((userSimulation) => userSimulation[key].toString() == activeFilters[key] );
                }else{
                    filteredUserSimulations = filteredUserSimulations.filter((userSimulation) => userSimulation[key].toLowerCase().includes(activeFilters[key].toLowerCase()) );
                }
            }
        });

        setUserSimulationsToShow(filteredUserSimulations)
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
            <div  className="col-4 d-flex justify-content-between">
                <div>
                  <h5 className="font-semi-bold">Student Participated</h5>
                </div>
                <div>
                    {simulation.participants}
                </div>
            </div>
        </div>
        <div className="mt-5 px-5" style={{ width: "100%", overflow: "auto" }}>
            {isLoading ? <div className="d-flex justify-content-center"><Spin size="large"/> </div>:
                <Table striped bordered hover responsiveness style={{ width: "150%" }}>
                    <thead>
                    
                    <tr>
                        <th className="text-center tablePlaceContent">
                            Reset
                            <FontAwesomeIcon icon={faRefresh} className="mx-2 pointer" onClick={() => {setUserSimulationsToShow(userSimulations); setFilters({})}} />
                        </th>
                        <th className="text-center tablePlaceContent"><input name="firstName" onChange={onChangeUserHandler} className="rounded px-2 py-1" placeholder={"Student"} /></th>
                        <th className="text-center tablePlaceContent">
                            <DropdownButton 
                                id={"dropdown-rank-button"} 
                                title={"Rank"} 
                                onSelect={(props) => onChangeMinMaxHandler({name: "rank", value: props})}
                            >
                                <Dropdown.Item eventKey="Highest">Highest</Dropdown.Item>
                                <Dropdown.Item eventKey="Lowest">Lowest</Dropdown.Item>
                            </DropdownButton>
                        </th>
                        <th className="text-center tablePlaceContent">
                            <DropdownButton 
                                id={"dropdown-grade-button"} 
                                title={"Grade"} 
                                onSelect={(props) => onChangeMinMaxHandler({name: "grade", value: props})}
                            >
                                <Dropdown.Item eventKey="Highest">Highest</Dropdown.Item>
                                <Dropdown.Item eventKey="Lowest">Lowest</Dropdown.Item>
                            </DropdownButton>
                        </th>
                        <th className="text-center tablePlaceContent"><input name="timeToComplete" onChange={onChangeSimulationHandler} className="rounded px-2 py-1" placeholder={"Time to Complete"} /></th>
                        <th className="text-center tablePlaceContent"><input disabled name="duation" onChange={onChangeSimulationHandler} className="rounded px-2 py-1" placeholder={"Duration"} /></th>
                        <th className="text-center tablePlaceContent"><input name="university" onChange={onChangeUserHandler} className="rounded px-2 py-1" placeholder={"University Name"} /></th>
                        <th className="text-center tablePlaceContent"><input name="gradYear" onChange={onChangeUserHandler} className="rounded px-2 py-1" placeholder={"Graduation Year"} /></th>
                        <th className="text-center tablePlaceContent">
                            <DropdownButton 
                                id={"dropdown-sharingScore-button"} 
                                title={"Sharing Score"} 
                                onSelect={(props) => onChangeSimulationHandler({name: "sharingScore", value: props})}
                            >
                                <Dropdown.Item eventKey={true}>Yes</Dropdown.Item>
                                <Dropdown.Item eventKey={false}>No</Dropdown.Item>
                            </DropdownButton>
                        </th>
                        <th className="text-center tablePlaceContent"><input name="fileName" onChange={onChangeSimulationHandler} className="rounded px-2 py-1" placeholder={"File Download"} /></th>
                    </tr>

                    <tr>
                        <th className="text-center tablePlaceContent"></th>
                        <th className="text-center tablePlaceContent">Student Name</th>
                        <th className="text-center tablePlaceContent">Rank</th>
                        <th className="text-center tablePlaceContent">Grade</th>
                        <th className="text-center tablePlaceContent">Time to Complete</th>
                        <th className="text-center tablePlaceContent">Duration</th>
                        <th className="text-center tablePlaceContent">University Name</th>
                        <th className="text-center tablePlaceContent">Graduation Year</th>
                        <th className="text-center tablePlaceContent">Sharing Score</th>
                        <th className="text-center tablePlaceContent">File Download</th>
                    </tr>

                    </thead>

                    <tbody>
                        {
                            userSimulationsToShow.length ? 
                            userSimulationsToShow.map((userSimulation) =>               
                            <tr>
                                <td className="text-center tablePlaceContent"></td>
                                <td className="text-center tablePlaceContent"><a className="underline-offset">{userSimulation.userId.firstName} {userSimulation.userId.lastName}</a></td>
                                <td className="text-center tablePlaceContent"><a className="underline-offset">{userSimulation.rank}</a></td>
                                <td className="text-center tablePlaceContent">{userSimulation.grade}%</td>
                                <td className="text-center tablePlaceContent">{calculateDurationHandler(userSimulation.endTime,userSimulation.startTime)}</td>
                                <td className="text-center tablePlaceContent">{getDurationHandler(simulation.duration)}</td>
                                <td className="text-center tablePlaceContent">{userSimulation.userId.university}</td>
                                <td className="text-center tablePlaceContent">{userSimulation.userId.gradYear}</td>
                                <td className="text-center tablePlaceContent">{userSimulation.sharingScore ? "Yes" : "No"}</td>
                                <td className="text-center tablePlaceContent"><a className="underline-offset pointer" onClick={() => downloadFile(userSimulation.fileId)}>{getFilePathHandler(userSimulation.fileName)}</a></td>
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