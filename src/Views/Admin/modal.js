import { useState, useRef, useEffect } from "react";
import { Modal, Button, Input } from 'react-bootstrap';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faTrash, faSync } from '@fortawesome/free-solid-svg-icons';
import { generateRandomCode } from '../../utilities/common';
import ExcelPreview from "../../Components/PreviewExcel";
import { postSimulationsData } from "../../API/Admin";
import { toast } from 'react-toastify';
import { Spin } from "antd";
import moment from 'moment';

const ModalScreen = ({ show, modalToggle }) => {
    const [isLoading, setIsLoading] = useState(false);
    const [code, setCode] = useState(generateRandomCode());
    const [fileName, setFileName] = useState("Upload File...");
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
        handleGenerateCode()
      }, [file])

      const handleChange = (e) => {
        const { name, value } = e.target;
        setFormData((prevData) => ({
          ...prevData,
          [name]: value
        }));
      };
      
      const handleGenerateCode = () => {
        setCode(generateRandomCode());
      };

      const handleFileChange = (event) => {
        if (event.target.files.length > 0) {
          setFileName(event.target.files[0].name);
          setFile(event.target.files[0])
        }
      };

      const handleSubmitForm = async () => { 
        setIsLoading(true)
        
        const requestData = new FormData();
        // Append form data
        requestData.append('category', formData['category']);
        requestData.append('simulationName', formData["name"]);
        requestData.append('organizationName', formData["organization"]);
        requestData.append('startTime', formData["startDateTime"]);
        requestData.append('endTime', formData["closeDateTime"]);
        requestData.append('classCode', code);
        requestData.append('file', file);
        
        const response = await postSimulationsData(requestData)
        console.log("setIsLoading",response)
        if(response.code == 201){
          toast.success(response.message)
          setFormData({
            category: '',
            name: '',
            organization: '',
            startDateTime: '',
            closeDateTime: '',
          })
          setFile(null)
          setFileName("Upload File...")
          modalToggle(true)
        }else{
          toast.error(response.message)
          // modalToggle()
        }
        handleGenerateCode()
        setIsLoading(false)
      };

      return (
        <Modal show={show} onHide={modalToggle}>
            <Modal.Header closeButton>
                <Modal.Title>Simulation Details</Modal.Title>
            </Modal.Header>
            <Modal.Body>
                <div>
                    <div className="h-75 row">
                        <div className="col-6 d-flex justify-content-center">
                            <div>
                                <input
                                    onChange={(e) => handleChange(e)}
                                    type="text"
                                    className="form-control mb-2"
                                    id="category"
                                    name="category"
                                    value={formData.category}
                                    placeholder="Enter your category"
                                />
                                <input
                                    onChange={(e) => handleChange(e)}
                                    type="text"
                                    className="form-control mb-2"
                                    id="name"
                                    name="name"
                                    value={formData.name}
                                    placeholder="Enter name"
                                />
                                <input
                                    onChange={(e) => handleChange(e)}
                                    type="text"
                                    className="form-control mb-2"
                                    id="organization"
                                    name="organization"
                                    value={formData.organization}
                                    placeholder="Enter organization name"
                                />
                                <input
                                    onChange={(e) => handleChange(e)}
                                    type="datetime-local"
                                    className="form-control mb-2"
                                    id="startDateTime"
                                    name="startDateTime"
                                    value={formData.startDateTime}
                                    placeholder="Enter Start Date/Time"
                                />
                                <input
                                    onChange={(e) => handleChange(e)}
                                    type="datetime-local"
                                    className="form-control mb-2"
                                    id="closeDateTime"
                                    name="closeDateTime"
                                    value={formData.closeDateTime}
                                    placeholder="Enter Close Date/Time"
                                />
                            </div>
                        </div>
                        <div className="col-6 m-auto ">
                            <div 
                                // className={file ? "border border-dark text-center mx-4 w-75 max-height-100 rounded pointer" :
                                //         "border border-dark text-center mx-4 w-75 rounded p-5 pointer"
                                //         }
                                className="border border-dark text-center mx-4 w-75 rounded p-5 pointer"
                                onClick={() => fileInput.current.click()}
                                > 
                                {/* {file && <ExcelPreview file={file}/>} */}
                                {"Upload File"}
                            </div>
                            <input className="d-none" type="file" accept=".csv, .xlsx" ref={fileInput} onChange={handleFileChange}/>
                            <div className="mt-3 d-flex justify-content-around align-items-center">
                                <span className="mx-3 w-75">File Name: {fileName} </span>
                                <FontAwesomeIcon icon={faTrash} className="pointer" onClick={() => setFileName("")}/> 
                            </div>                            
                        </div>

                    </div>
                    <div className="h-25 mt-25 ">
                        <div className="mt-3 d-flex justify-content-around align-items-center w-50">
                            <span className="mx-3 ">Class Code: {code}</span>
                            <FontAwesomeIcon icon={faSync} className="pointer" onClick={() => handleGenerateCode()}/> 
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