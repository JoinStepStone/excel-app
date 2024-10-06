import { useState, useEffect, useRef } from "react";
import { useNavigate } from 'react-router-dom';
import ModalScreen from "./modal";
import { Table } from 'react-bootstrap';
import { getAllSimulations, deleteSimulationById } from "../../API/Admin";
import { toast } from 'react-toastify';
import { Spin } from "antd";
import moment from 'moment';
import { downloadFile } from "../../utilities/common";
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faEdit, faTrash, faRefresh } from '@fortawesome/free-solid-svg-icons';
import { Dropdown, DropdownButton } from 'react-bootstrap';

const Simulations = () => {

    const navigate = useNavigate();
    const [show, setShow] = useState(false);
    const [isLoading, setIsLoading] = useState(true);
    const [simulations, setSimulations] = useState([]);
    const [simulationsToShow, setSimulationsToShow] = useState([]);
    const [filters, setFilters] = useState({}); // State to store all filter conditions

    const selectedId = useRef(null);

    const getAllSimulationsHandler = async () => {
        setIsLoading(true);
        const response = await getAllSimulations();
        if (response.code === 201) {
            setSimulations(response.data);
            setSimulationsToShow(response.data);
        } else {
            toast.error(response.message);
        }
        setIsLoading(false);
    };

    useEffect(() => {
        getAllSimulationsHandler();
    }, []);

    const formatDateTimeHandler = (dateString) => { 
        const date = moment(dateString);
        return date.format("M/D/YYYY h:mm:ss A");
    };

    const getDurationHandler = (dateString) => { 
        return moment.duration(dateString).asMinutes() + " minutes";
    };

    const modalToggle = (loadData = false, id = null) => {
        if (loadData) {
            getAllSimulationsHandler();
        }
        selectedId.current = id;
        setShow(!show);
    };
    
    const deleteSimulationHandler = async (id = null) => {
        const response = await deleteSimulationById({ "simulationId": id });
        if (response.code === 201) {
            toast.success(response.message);
            getAllSimulationsHandler();
        } else {
            toast.error(response.message);
        }
    };

    const onChangeHandler = (e) => {
        const { name, value } = e.target ? e.target : e;
        const newFilters = { ...filters, [name]: value }; // Update filters with the new condition
        setFilters(newFilters);
        applyFilters(newFilters); // Reapply filters
    };

    const applyFilters = (activeFilters) => {
        let filteredSimulations = simulations;

        Object.keys(activeFilters).forEach((key) => {
            if (activeFilters[key]) {
                if (key === "participants" || key === "status") {
                    filteredSimulations = filteredSimulations.filter(simulation => {
                        return simulation[key].toString() === activeFilters[key];
                    });
                } else if (key === "duration") {
                    filteredSimulations = filteredSimulations.filter(simulation => {
                        return getDurationHandler(simulation[key]).toLowerCase().includes(activeFilters[key].toLowerCase());
                    });
                } else if (key === "startTime" || key === "endTime") {
                    filteredSimulations = filteredSimulations.filter(simulation => {
                        return moment(activeFilters[key]).isSame(simulation[key], 'day');
                    });
                } else {
                    filteredSimulations = filteredSimulations.filter(simulation => {
                        return simulation[key].toLowerCase().startsWith(activeFilters[key].toLowerCase());
                    });
                }
            }
        });

        setSimulationsToShow(filteredSimulations);
    };

    return (
        <div className="pt-5 ">
            {show && <ModalScreen show={show} modalToggle={modalToggle} selectedId={selectedId.current}/>}
            <div className="d-flex justify-content-center align-items-center">
                <div className="mx-0 border border-dark rounded px-5 py-2 w-50 text-center ">
                    <h1>Simulation Dashboard</h1>
                </div>
                <button type="button" className="btn btn-primary h-25 mx-5" onClick={modalToggle}>+</button>
            </div>
            <div className="mt-5 px-5">
                {isLoading ? <div className="d-flex justify-content-center"><Spin size="large"/> </div> :
                    <Table striped bordered hover responsive style={{ width: "150%" }}>
                        <thead>
                            <tr>
                                <th className="text-center tablePlaceContent"><input name="category" onChange={onChangeHandler} className="rounded px-2 py-1" placeholder={"Category"} /></th>
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
                                <th className="text-center tablePlaceContent"><input name="organizationName" onChange={onChangeHandler} className="rounded px-2 py-1" placeholder={"Organization Name"} /></th>
                                <th className="text-center tablePlaceContent"><input name="startTime" type="date" onChange={onChangeHandler} className="rounded px-2 py-1" placeholder={"Start Time"} /></th>
                                <th className="text-center tablePlaceContent"><input name="endTime" type="date" onChange={onChangeHandler} className="rounded px-2 py-1" placeholder={"End Time"} /></th>
                                <th className="text-center tablePlaceContent"><input name="duration" onChange={onChangeHandler} className="rounded px-2 py-1" placeholder={"Duration"} /></th>
                                <th className="text-center tablePlaceContent"><input disabled name="participants" onChange={onChangeHandler} className="rounded px-2 py-1" placeholder={"Participants"} /></th>
                                <th className="text-center tablePlaceContent"><input name="fileName" onChange={onChangeHandler} className="rounded px-2 py-1" placeholder={"File Name"} /></th>
                                <th className="text-center tablePlaceContent">
                                    Reset
                                    <FontAwesomeIcon icon={faRefresh} className="mx-2 pointer" onClick={() => {setSimulationsToShow(simulations); setFilters({})}}/> 
                                </th>
                            </tr>

                            <tr>
                                <th className="text-center tablePlaceContent">Category</th>
                                <th className="text-center tablePlaceContent">Simulations</th>
                                <th className="text-center tablePlaceContent">Status</th>
                                <th className="text-center tablePlaceContent">Organization Name</th>
                                <th className="text-center tablePlaceContent">Date Administered</th>
                                <th className="text-center tablePlaceContent">Date Closed</th>
                                <th className="text-center tablePlaceContent">Duration</th>
                                <th className="text-center tablePlaceContent">Participants</th>
                                <th className="text-center tablePlaceContent">Download File</th>
                                <th className="text-center tablePlaceContent">Actions</th>
                            </tr>
                        </thead>
                        <tbody> 
                            {simulationsToShow.length ? 
                                simulationsToShow.map((simulation, index) =>
                                    <tr key={index}>
                                        <td className="text-center tablePlaceContent">{simulation.category}</td>
                                        <td className="text-center tablePlaceContent" onClick={() => navigate("/admin/simulation/detail/"+simulation.id)}><a className="underline-offset pointer">{simulation.simulationName}</a></td>
                                        <td className="text-center tablePlaceContent">{simulation.status ? "Active" : "Inactive"}</td>
                                        <td className="text-center tablePlaceContent">{simulation.organizationName}</td>
                                        <td className="text-center tablePlaceContent">{formatDateTimeHandler(simulation.startTime)}</td>
                                        <td className="text-center tablePlaceContent">{formatDateTimeHandler(simulation.endTime)}</td>
                                        <td className="text-center tablePlaceContent">{getDurationHandler(simulation.duration)}</td>
                                        <td className="text-center tablePlaceContent">{simulation.participants}</td>
                                        <td className="text-center tablePlaceContent" onClick={() => downloadFile(simulation.fileId)}><a className="underline-offset pointer">{simulation.fileName}</a></td>
                                        <td className="text-center tablePlaceContent">
                                            <FontAwesomeIcon icon={faEdit} className="mx-2 pointer" onClick={() => modalToggle(false, simulation.id)} /> 
                                            <FontAwesomeIcon icon={faTrash} className="mx-2 icon-color pointer" onClick={() => deleteSimulationHandler(simulation.id)} /> 
                                        </td>
                                    </tr>
                                )
                            : null}
                        </tbody>
                    </Table>
                }
            </div>
        </div>
    );
};

export default Simulations;
