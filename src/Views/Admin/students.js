import { useState, useEffect, useRef } from "react";
import { Table } from 'react-bootstrap';
import { getAllStudents, deleteStudentById } from "../../API/Admin";
import { toast } from 'react-toastify';
import { Spin } from "antd";
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faEdit, faTrash, faRefresh } from '@fortawesome/free-solid-svg-icons';
import EditModalScreen from "./editModal";
import { Dropdown, DropdownButton } from 'react-bootstrap';

const Student = ({ uniListNames }) => {

  const [show, setShow] = useState(false);
  const [isLoading, setIsLoading] = useState(true);
  const [studentToShow, setStudentToShow] = useState([]);
  const [students, setStudents] = useState([]);
  const [filters, setFilters] = useState({}); // State to store all filter conditions

  const selectedId = useRef(null);

  const getAllStudentsHandler = async () => {
    setIsLoading(true);
    const response = await getAllStudents();
    if (response.code === 201) {
      setStudents(response.data);
      setStudentToShow(response.data);
    } else {
      toast.error(response.message);
    }
    setIsLoading(false);
  };

  useEffect(() => {
    getAllStudentsHandler();
  }, []);

  const modalToggle = (loadData = false, id = null) => {
    selectedId.current = id;
    if (loadData) {
      getAllStudentsHandler();
    }
    setShow(!show);
  };

  const deleteStudentHandler = async (id = null) => {
    const response = await deleteStudentById({ "userId": id });
    if (response.code === 201) {
      toast.success(response.message);
      getAllStudentsHandler();
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

  const onChangeMinMaxHandler = (e) => {
    const { name, value } = e;
    const newFilters = { ...filters, [name]: value }; // Update filters with min/max condition
    setFilters(newFilters);
    applyFilters(newFilters); // Reapply filters
  };

  const applyFilters = (activeFilters) => {
    let filteredStudents = students;
    
    Object.keys(activeFilters).forEach((key) => {
      if (activeFilters[key]) {
        if (key === "examTaken" || key === "avgScore" || key === "maxScore" || key === "gpaScore") {
          if (activeFilters[key] === "Highest") {
            filteredStudents = [filteredStudents.reduce((prev, current) => {
              return (current[key] || 0) > (prev[key] || 0) ? current : prev;
            }, filteredStudents[0])];
          } else if (activeFilters[key] === "Lowest") {
            filteredStudents = [filteredStudents.reduce((prev, current) => {
              return (current[key] || 0) < (prev[key] || 0) ? current : prev;
            }, filteredStudents[0])];
          }
        } else {
          filteredStudents = filteredStudents.filter((student) => {
            return student[key] && student[key].toString().toLowerCase().includes(activeFilters[key].toLowerCase());
          });
        }
      }
    });

    setStudentToShow(filteredStudents);
  };

  return (
    <div className="pt-5">
      {show && <EditModalScreen show={show} modalToggle={modalToggle} selectedId={selectedId} uniListNames={uniListNames} />}
      <div className="d-flex justify-content-center">
        <div className="mx-0 border border-dark rounded px-5 py-2 w-50 text-center">
          <h1>All Students</h1>
        </div>
      </div>
      <div className="mt-5 px-5">
        {isLoading ? <div className="d-flex justify-content-center"><Spin size="large" /> </div> :
          <Table striped bordered hover responsive style={{ width: "150%" }}>
            <thead>
              <tr>
                <th className="text-center tablePlaceContent"><input name="firstName" onChange={onChangeHandler} className="rounded px-2 py-1" placeholder={"First Name"} /></th>
                <th className="text-center tablePlaceContent"><input name="lastName" onChange={onChangeHandler} className="rounded px-2 py-1" placeholder={"Last Name"} /></th>
                <th className="text-center tablePlaceContent"><input name="email" onChange={onChangeHandler} className="rounded px-2 py-1" placeholder={"Email"} /></th>
                <th className="text-center tablePlaceContent">
                  <DropdownButton
                    id={"dropdown-ethnicity-button"}
                    title={"High/Low"}
                    onSelect={(props) => onChangeMinMaxHandler({ name: "examTaken", value: props })}
                  >
                    <Dropdown.Item eventKey="Highest">Highest</Dropdown.Item>
                    <Dropdown.Item eventKey="Lowest">Lowest</Dropdown.Item>
                  </DropdownButton>
                </th>
                <th className="text-center tablePlaceContent">
                  <DropdownButton
                    id={"dropdown-avgScore-button"}
                    title={"Average Score"}
                    onSelect={(props) => onChangeMinMaxHandler({ name: "avgScore", value: props })}
                  >
                    <Dropdown.Item eventKey="Highest">Highest</Dropdown.Item>
                    <Dropdown.Item eventKey="Lowest">Lowest</Dropdown.Item>
                  </DropdownButton>
                </th>
                <th className="text-center tablePlaceContent">
                  <DropdownButton
                    id={"dropdown-maxScore-button"}
                    title={"Max Score"}
                    onSelect={(props) => onChangeMinMaxHandler({ name: "maxScore", value: props })}
                  >
                    <Dropdown.Item eventKey="Highest">Highest</Dropdown.Item>
                    <Dropdown.Item eventKey="Lowest">Lowest</Dropdown.Item>
                  </DropdownButton>
                </th>
                <th className="text-center tablePlaceContent"><input name="university" onChange={onChangeHandler} className="rounded px-2 py-1" placeholder={"University Name"} /></th>
                <th className="text-center tablePlaceContent">
                  <DropdownButton
                    id={"dropdown-ethnicity-button"}
                    title={"High/Low"}
                    onSelect={(props) => onChangeMinMaxHandler({ name: "gpaScore", value: props })}
                  >
                    <Dropdown.Item eventKey="Highest">Highest</Dropdown.Item>
                    <Dropdown.Item eventKey="Lowest">Lowest</Dropdown.Item>
                  </DropdownButton>
                </th>
                <th className="text-center tablePlaceContent"><input name="gradYear" onChange={onChangeHandler} className="rounded px-2 py-1" placeholder={"Graduation Year"} /></th>
                <th className="text-center tablePlaceContent">
                  <DropdownButton
                    id={"dropdown-gender-button"}
                    title={"Gender"}
                    onSelect={(props) => onChangeHandler({ name: "gender", value: props })}
                  >
                    <Dropdown.Item eventKey={"Female"}>Female</Dropdown.Item>
                    <Dropdown.Item eventKey={"Not Disclosed"}>I do not wish to disclose</Dropdown.Item>
                    <Dropdown.Item eventKey={"Male"}>Male</Dropdown.Item>
                  </DropdownButton>
                </th>
                <th className="text-center tablePlaceContent">
                  <DropdownButton
                    style={{ zIndex: 1 }}
                    id={"dropdown-race-button"}
                    title={"Race"}
                    onSelect={(props) => onChangeHandler({ name: "race", value: props })}
                  >
                    <Dropdown.Item eventKey={"American Indian or Alaska Native"}>American Indian or Alaska Native</Dropdown.Item>
                    <Dropdown.Item eventKey={"Asian"}>Asian</Dropdown.Item>
                    <Dropdown.Item eventKey={"Black or African American"}>Black or African American</Dropdown.Item>
                    <Dropdown.Item eventKey={"Native Hawaiian or other Pacific Islander"}>Native Hawaiian or other Pacific Islander</Dropdown.Item>
                    <Dropdown.Item eventKey={"White"}>White</Dropdown.Item>
                    <Dropdown.Item eventKey={"Other"}>Other</Dropdown.Item>
                  </DropdownButton>
                </th>
                <th className="text-center tablePlaceContent">
                  <DropdownButton
                    id={"dropdown-ethnicity-button"}
                    title={"Ethnicity"}
                    onSelect={(props) => onChangeHandler({ name: "ethnicity", value: props })}
                  >
                    <Dropdown.Item eventKey={"Hispanic"}>Hispanic</Dropdown.Item>
                    <Dropdown.Item eventKey={"Latino"}>Latino</Dropdown.Item>
                    <Dropdown.Item eventKey={"Not Applicable"}>Not Applicable</Dropdown.Item>
                  </DropdownButton>
                </th>
                <th className="text-center tablePlaceContent">
                  Reset
                  <FontAwesomeIcon icon={faRefresh} className="mx-2 pointer" onClick={() => {setStudentToShow(students); setFilters({})}} />
                </th>
              </tr>
              <tr>
                <th className="text-center tablePlaceContent">First Name</th>
                <th className="text-center tablePlaceContent">Last Name</th>
                <th className="text-center tablePlaceContent">Email</th>
                <th className="text-center tablePlaceContent">Exams Taken</th>
                <th className="text-center tablePlaceContent">Average Score</th>
                <th className="text-center tablePlaceContent">Max Score</th>
                <th className="text-center tablePlaceContent">University Name</th>
                <th className="text-center tablePlaceContent">GPA</th>
                <th className="text-center tablePlaceContent">Graduation Year</th>
                <th className="text-center tablePlaceContent">Gender</th>
                <th className="text-center tablePlaceContent">Race</th>
                <th className="text-center tablePlaceContent">Ethnicity</th>
                <th className="text-center tablePlaceContent">Actions</th>
              </tr>
            </thead>
            <tbody>
              {studentToShow.length ?
                studentToShow.map((student, index) =>
                  <tr key={index}>
                    <td className="text-center tablePlaceContent">{student.firstName}</td>
                    <td className="text-center tablePlaceContent">{student.lastName}</td>
                    <td className="text-center tablePlaceContent">{student.email}</td>
                    <td className="text-center tablePlaceContent">{student.examTaken}</td>
                    <td className="text-center tablePlaceContent">{student.avgScore}</td>
                    <td className="text-center tablePlaceContent">{student.maxScore}</td>
                    <td className="text-center tablePlaceContent">{student.university}</td>
                    <td className="text-center tablePlaceContent">{student.gpaScore}</td>
                    <td className="text-center tablePlaceContent">{student.gradYear}</td>
                    <td className="text-center tablePlaceContent">{student.gender === "Select Gender" ? "" : student.gender}</td>
                    <td className="text-center tablePlaceContent">{student.race === "Select the Race(s) You Identify With" ? "" : student.race}</td>
                    <td className="text-center tablePlaceContent">{student.ethnicity === "Select Ethnicity" ? "" : student.ethnicity}</td>
                    <td className="text-center">
                      <div className="d-flex justify-content-center align-items-center">
                        <FontAwesomeIcon
                          icon={faEdit}
                          className="mx-2 pointer"
                          onClick={() => modalToggle(false, student.id)}
                        />
                        <FontAwesomeIcon
                          icon={faTrash}
                          className="mx-2 icon-color pointer"
                          onClick={() => deleteStudentHandler(student.id)}
                        />
                      </div>
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

export default Student;
