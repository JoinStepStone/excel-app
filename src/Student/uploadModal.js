import { useState, useRef, useEffect } from "react";
import { Modal, Button, Input } from 'react-bootstrap';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faTrash, faSync } from '@fortawesome/free-solid-svg-icons';
import { getRandomNumber } from '../utilities/common';
import ExcelPreview from "../Components/PreviewExcel";
import { postSimulationsData } from "../API/Student";
import { toast } from 'react-toastify';
import { Spin } from "antd";
import moment from 'moment';

const ModalScreen = ({ show, modalToggle, simulationId, simulation }) => {
    const [isLoading, setIsLoading] = useState(false);
    const [fileName, setFileName] = useState("Upload File...");
    const [sharingScore, setSharingScore] = useState(false);
    const [grade, setGrade] = useState(null);
    const [file, setFile] = useState(null);
    const [formData, setFormData] = useState({
        category: '',
        name: '',
        organization: '',
        startDateTime: '',
        closeDateTime: '',
      });

      const fileInput = useRef(null)

      useEffect(() => {
      }, [show])

      const handleChange = (e) => {
        const { name, value } = e.target;
        setFormData((prevData) => ({
          ...prevData,
          [name]: value
        }));
      };
      

      const handleFileChange = (event) => {
        if (event.target.files.length > 0) {
          setFileName(event.target.files[0].name);
          setFile(event.target.files[0])
          setGrade(getRandomNumber(50, 98))
        }
      };

      const handleSubmitForm = async () => { 
        setIsLoading(true)
        console.log("handleSubmitForm",simulation)
      const accessToken = JSON.parse(localStorage.getItem("accessToken"))
      const requestData = new FormData();
        // Append form data
        requestData.append('status', "true");
        requestData.append('sharingScore', sharingScore);
        requestData.append('grade', grade);
        requestData.append("userId", accessToken._id);
        requestData.append('simulationId', simulationId);
        requestData.append('startTime', simulation.startTime);
        requestData.append('endTime', moment().subtract(2, 'hours'));
        requestData.append('file', file);
        
        const response = await postSimulationsData(requestData)
        if(response.code == 201){
          toast.success(response.message)
          setSharingScore(false)
          setGrade(null)
          setFile(null)
          setFileName("Upload File...")
          modalToggle(true)
      }else{
          toast.error(response.message)
          console.log("ERROR",response)
          // modalToggle()
        }
        setIsLoading(false)
      };

      return (
        <Modal show={show} onHide={modalToggle}>
            <Modal.Header closeButton>
                <Modal.Title>Simulation Details</Modal.Title>
            </Modal.Header>
            <Modal.Body>
                <div>
                    <div className="h-75 row my-5">
                        <div className="col-6 m-auto ">
                            <div 
                            className={"border border-dark text-center mx-4 w-75 rounded p-5 pointer"}
                            // className={file ? "border border-dark text-center mx-4 w-75 max-height-100 rounded pointer" :
                            //           "border border-dark text-center mx-4 w-75 rounded p-5 pointer"
                            //           }
                            onClick={file? () => {} : () => fileInput.current.click()}
                            > 
                                {/* {file && <ExcelPreview file={file}/>} */}
                                {"Upload File"}
                            </div>
                            <input className="d-none" type="file" accept=".csv, .xlsx" ref={fileInput} onChange={handleFileChange}/>
                            <div className="mt-2">
                                <span className="mx-3 w-75">File Name: {fileName} </span>
                                <FontAwesomeIcon icon={faTrash} className="pointer" onClick={() => {setFileName(""); setFile(null);}}/> 
                            </div>                            
                        </div>
                    </div>
                    <div className="h-75 row">
                        <div className="col-6 m-auto ">
                          <div className="h-75 row">
                              <div className="col-4">
                                <div className="border border-dark text-center rounded pointer p-2" > 
                                    {grade ? grade : "Score"}
                                </div>
                              </div>
                              <div className="col-4 m-auto">
                                <div className="row min-content-width">
                                  <div className="border border-dark text-center w-100 rounded pointer p-2" > 
                                      Share score with Employees
                                  </div>
                                  <div className="d-flex min-content-width justify-content-around mt-2">
                                    <div className={`border border-dark text-center pointer px-3 py-1 mx-3 ${sharingScore ? " bg-primary text-white": ""}`} onClick={() => setSharingScore(true)}> 
                                        Yes
                                    </div>
                                    <div className={`border border-dark text-center pointer px-3 py-1 mx-3 ${sharingScore ? "": " bg-primary text-white"}`} onClick={() => setSharingScore(false)}> 
                                        No
                                    </div>
                                  </div>
                                </div>
                              </div>
                          </div>
                        </div>
                    </div>
                </div>
            </Modal.Body>
            <Modal.Footer>
                <Button variant="secondary" onClick={modalToggle}>
                    Close
                </Button>
                <Button variant="primary" onClick={() => handleSubmitForm()}>
                    Save Changes
                </Button>
            </Modal.Footer>
        </Modal>
    );
  };
  
  export default ModalScreen;