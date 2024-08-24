import { useState, useEffect } from "react";
import { Table } from 'react-bootstrap';
import { toast } from 'react-toastify';
import { Spin } from "antd";
import moment from 'moment';
import { Dropdown, DropdownButton } from 'react-bootstrap';

import { getAllSimulations } from "../../API/Student";
import MetricDisplay from "../../Components/metric";
import ModalRegister from "./registerModal";

const SimulationStudents = () => {

    const [show, setShow] = useState(false);
    const [isLoading, setIsLoading] = useState(true);
    const [userSimulations, setUserSimulations] = useState([]);
    const [simulations, setSimulations] = useState([]);
    const [simulationsToShow, setSimulationsToShow] = useState([]);

    const getAllSimulationsHandler = async () => {
        setIsLoading(true)
        const response = await getAllSimulations()
        if(response.code == 201){
        //   toast.success(response.message)
          setSimulations(response.data)
          setSimulationsToShow(response.data)
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

    const onChangeHandler = (e) => {
        let filteredSimulations;
        let { name, value } = e.target ? e.target : e;
        if(!value){
            return setSimulationsToShow(simulations)
        }
        
        if(name == "participants"){
          filteredSimulations = simulations.filter((simulation) => simulation[name] == value );
        }else if(name == "status"){
            filteredSimulations = simulations.filter((simulation) => simulation[name].toString() == value );
        }else if(name == "duration"){
            filteredSimulations = simulations.filter((simulation) => getDurationHandler(simulation[name]).toLowerCase().includes(value.toLowerCase()) );
        }else if(name == "startTime" || name == "endTime"){
            // Filter function using moment.js
            filteredSimulations = simulations.filter(simulation => {
                return moment(simulation.startTime).isSame(value, 'day');
            });
        }else{
          filteredSimulations = simulations.filter((simulation) => simulation[name].toLowerCase().startsWith(value.toLowerCase()) );
        }

        setSimulationsToShow(filteredSimulations)
    }

    const onChangeMinMaxHandler = (e) => {
        let { name, value } = e;
        if(value == "Highest"){
            const highestScoreStudent = simulations.reduce((prev, current) => {
                return (current[name] > prev[name]) ? current : prev;
            }, simulations[0]);
            setSimulationsToShow([highestScoreStudent])
        }else{
            const lowestScoreStudent = simulations.reduce((prev, current) => {
                return (current[name] < prev[name]) ? current : prev;
            }, simulations[0]);
            setSimulationsToShow([lowestScoreStudent])
        }
    }

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
                <Table striped bordered responsive hover style={{ width: "120%" }}> 
                    <thead>

                    <tr>
                        <th className="text-center tablePlaceContent"><input name="simulationName" onChange={onChangeHandler} className="rounded px-2 py-1" placeholder={"Simulation Name"} /></th>
                        <th className="text-center tablePlaceContent">
                            <DropdownButton 
                                id={"dropdown-status-button"} 
                                title={"Status"} 
                                onSelect={(props) => onChangeHandler({name: "status", value: props})}
                            >
                                <Dropdown.Item eventKey={true}>Active</Dropdown.Item>
                                <Dropdown.Item eventKey={false}>Inactive</Dropdown.Item>
                            </DropdownButton>
                        </th>
                        <th className="text-center tablePlaceContent">
                            <DropdownButton 
                                id={"dropdown-grade-button"} 
                                title={"Grade"} 
                                onSelect={(props) => onChangeMinMaxHandler({name: "status", value: props})}
                            >
                                <Dropdown.Item eventKey="Highest">Highest</Dropdown.Item>
                                <Dropdown.Item eventKey="Lowest">Lowest</Dropdown.Item>
                            </DropdownButton>
                        </th>
                        <th className="text-center tablePlaceContent"><input name="startTime" type="date" onChange={onChangeHandler} className="rounded px-2 py-1" placeholder={"Start Time"} /></th>
                        <th className="text-center tablePlaceContent"><input name="endTime" type="date" onChange={onChangeHandler} className="rounded px-2 py-1" placeholder={"End Time"} /></th>
                        <th className="text-center tablePlaceContent">
                            {/* <input name="duration" onChange={onChangeHandler} className="rounded px-2 py-1" placeholder={"Duration"} /> */}
                        </th>
                        {/* <th className="text-center tablePlaceContent"><input name="participants" onChange={onChangeHandler} className="rounded px-2 py-1" placeholder={"Participants"} /></th> */}
                        {/* <th className="text-center tablePlaceContent">
                            Reset
                            <FontAwesomeIcon icon={faRefresh} className="mx-2 pointer" onClick={() => setSimulationsToShow(simulations)}/> 
                        </th> */}
                    </tr>

                    <tr>
                        <th className="text-center tablePlaceContent">Simulations</th>
                        <th className="text-center tablePlaceContent">Status</th>
                        <th className="text-center tablePlaceContent">Grade</th>
                        <th className="text-center tablePlaceContent">Date Administered</th>
                        <th className="text-center tablePlaceContent">Date Closed</th>
                        <th className="text-center tablePlaceContent">Duration</th>
                        {/* <th className="text-center tablePlaceContent">Student Participated</th> */}
                        {/* <th className="text-center tablePlaceContent"></th> */}
                    </tr>

                    </thead>

                    <tbody>
                        {
                            simulationsToShow.length ? 
                            simulationsToShow.map((simulation) =>
                            <tr>
                                <td className="text-center tablePlaceContent"><a className="underline-offset pointer" href={`/student/simulation/detail/${simulation._id}`}>{simulation.simulationName}</a></td>
                                <td className="text-center tablePlaceContent">{simulation.status ? "Active" : "Inactive"}</td>
                                <td className="text-center tablePlaceContent">{simulation.grade}</td>
                                <td className="text-center tablePlaceContent">{formatDateTimeHandler(simulation.startTime)}</td>
                                <td className="text-center tablePlaceContent">{formatDateTimeHandler(simulation.endTime)}</td>
                                <td className="text-center tablePlaceContent">{getDurationHandler(simulation.duration)}</td>
                                {/* <td className="text-center tablePlaceContent">{simulation.participants}</td> */}
                                {/* <td className="text-center tablePlaceContent"><a className="underline-offset pointer">Start</a></td> */}
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