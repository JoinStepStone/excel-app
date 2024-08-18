import { useState, useEffect, useRef } from "react";
import { Table } from 'react-bootstrap';
import { getAllStudents, deleteStudentById } from "../../API/Admin";
import { toast } from 'react-toastify';
import { Spin } from "antd";
import MetricDisplay from "../../Components/metric";
import { faL } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faEdit, faTrash } from '@fortawesome/free-solid-svg-icons';
import EditModalScreen from "./editModal";

const Student = () => {

  const [show, setShow] = useState(false);
  const [isLoading, setIsLoading] = useState(true);
  const [students, setStudents] = useState([]);

  const selectedId = useRef(null);

  const getAllStudentsHandler = async () => {
    setIsLoading(true)
    const response = await getAllStudents()
    if(response.code == 201){
      // toast.success(response.message)
      setStudents(response.data)
    }else{
      toast.error(response.message)
    }
    setIsLoading(false)
  }

  useEffect(() => {
    getAllStudentsHandler()
  },[])

  const modalToggle = (loadData = false, id = null) => {
    selectedId.current = id
    if(loadData){
      getAllStudentsHandler()
    }
    setShow(!show)
  };

  const deleteStudentHandler = async (id = null) => {
    
    const response = await deleteStudentById({
      "userId": id
    })
    if(response.code == 201){
      toast.success(response.message)
      getAllStudentsHandler()
    }else{
      toast.error(response.message)
    }
    
  };

  return (
    <div className="pt-5 ">
      {show && <EditModalScreen show={show} modalToggle={modalToggle} selectedId={selectedId}/>}
      <div className="d-flex justify-content-center">
        <div className="mx-0 border border-dark rounded px-5 py-2 w-50 text-center ">
          <h1>All Students</h1>
        </div>
      </div>
      <div className="mt-5 px-5">
        {isLoading ? <div className="d-flex justify-content-center"><Spin size="large"/> </div>:
          <Table striped bordered hover responsive style={{ width: "150%" }}>
            <thead>
              <tr>
                <th className="text-center tablePlaceContent">First Name</th>
                <th className="text-center tablePlaceContent">Last Name</th>
                <th className="text-center tablePlaceContent">Email</th>
                <th className="text-center tablePlaceContent">Exams Taken</th>
                <th className="text-center tablePlaceContent">Average Score</th>
                <th className="text-center tablePlaceContent">Max Score</th>
                <th className="text-center tablePlaceContent">University</th>
                <th className="text-center tablePlaceContent">Graduation Year</th>
                <th className="text-center tablePlaceContent">Gender</th>
                <th className="text-center tablePlaceContent">Race</th>
                <th className="text-center tablePlaceContent">Ethnicity</th>
                <th className="text-center tablePlaceContent">Actions</th>
              </tr>
            </thead>
            <tbody>
              {
                students.length ? 
                students.map((student) =>
                <tr>
                  <td className="text-center tablePlaceContent">{student.firstName}</td>
                  <td className="text-center tablePlaceContent">{student.lastName}</td>
                  <td className="text-center tablePlaceContent">{student.email}</td>
                  <td className="text-center tablePlaceContent">{student.examTaken}</td>
                  <td className="text-center tablePlaceContent">{student.avgScore}</td>
                  <td className="text-center tablePlaceContent">{student.avgScore}</td>
                  <td className="text-center tablePlaceContent">{student.university}</td>
                  <td className="text-center tablePlaceContent">{student.gradYear}</td>
                  <td className="text-center tablePlaceContent">{student.gender}</td>
                  <td className="text-center tablePlaceContent">{student.race}</td>
                  <td className="text-center tablePlaceContent">{student.ethnicity}</td>
                  <td className="d-flex text-center tablePlaceContent">
                    <FontAwesomeIcon icon={faEdit} className="mx-2 pointer" onClick={() => modalToggle(false, student.id)}/> 
                    <FontAwesomeIcon icon={faTrash} className="mx-2 icon-color pointer"onClick={() => deleteStudentHandler(student.id)}/> 
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
  
  export default Student;