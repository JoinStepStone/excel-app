import { useState, useRef, useEffect } from "react";
import { Modal, Button, Input } from 'react-bootstrap';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faTrash, faSync } from '@fortawesome/free-solid-svg-icons';
import { generateRandomCode } from '../../utilities/common';
import ExcelPreview from "../../Components/PreviewExcel";
import { postSimulationsData, getSimulationById, updateSimulationsData } from "../../API/Admin";
import { toast } from 'react-toastify';
import { Spin } from "antd";
import { registerModalalidationHandler } from "../../utilities/common";
import moment from 'moment-timezone';

const ModalScreen = ({ show, modalToggle, selectedId }) => {
  const [isFormSubmitted, setIsFormSubmitted] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [code, setCode] = useState(null);
  const [errorKey, setErrorKey] = useState({ key: null, msg: ""});
  const [fileName, setFileName] = useState("Upload File...");
  const [file, setFile] = useState(null);
  const [formData, setFormData] = useState({ 
      category: '',
      simulationName: '',
      organizationName: '',
      startTime: '',
      endTime: '',
    });

  const fileInput = useRef(null)

  useEffect(() => {
    if(selectedId){
      const fetchData = async () => {
        try {
          const response = await getSimulationById({
            "simulationId": selectedId
          });
          if (response.code === 201) {
            setFormData({
              ...response.data,
            });
            setCode(response.data.classCode)
          } else {
            toast.error(response.message);
          }
        } catch (error) {
          toast.error('An error occurred while fetching the data.');
        }
      };
  
      fetchData();
    }
    setCode(generateRandomCode())
  }, [])

  useEffect(() => {
    if(isFormSubmitted){
      const error = registerModalalidationHandler(formData)
      if(error){
        if(error.msg !== errorKey.msg){
          setErrorKey(error)
          setIsLoading(false)
          toast.error(error.msg)
        }
      }
    }
  }, [formData, file])

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
    setIsFormSubmitted(true)
    
    const requestData = new FormData();
    // Append form data
    requestData.append('category', formData['category']);
    requestData.append('simulationName', formData["simulationName"]);
    requestData.append('organizationName', formData["organizationName"]);
    requestData.append('startTime', formData["startTime"]);
    requestData.append('endTime', formData["endTime"]);
    requestData.append('classCode', code);
    requestData.append('file', file);
    
    const error = registerModalalidationHandler(formData)
    if(error){
      setErrorKey(error)
      setIsLoading(false)
      toast.error(error.msg)
    }else{
      const response = await postSimulationsData(requestData)
      if(response.code == 201){
        toast.success(response.message)
        setIsFormSubmitted(false)
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
    }

    handleGenerateCode()
    setIsLoading(false)
  };

  const handleUpdateSubmitForm = async () => { 
    setIsLoading(true)
    setIsFormSubmitted(true)
    
    const requestData = new FormData();
    // Append form data
    requestData.append('_id', formData['_id']);
    requestData.append('category', formData['category']);
    requestData.append('simulationName', formData["simulationName"]);
    requestData.append('organizationName', formData["organizationName"]);
    requestData.append('startTime', formData["startTime"]);
    requestData.append('endTime', formData["endTime"]);
    requestData.append('classCode', code);
    requestData.append('fileId', formData["fileId"]);
    requestData.append('fileName', formData["fileName"]);
    requestData.append('participants', formData["participants"]);
    requestData.append('file', file);
    
    const error = registerModalalidationHandler(formData)
    if(error){
      setErrorKey(error)
      setIsLoading(false)
      toast.error(error.msg)
    }else{
      const response = await updateSimulationsData(requestData)
      if(response.code == 201){
        toast.success(response.message)
        setIsFormSubmitted(false)
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
    }

    handleGenerateCode()
    setIsLoading(false)
  };

  return (
    <Modal show={show} onHide={modalToggle} >
        <Modal.Header closeButton>
            <Modal.Title>Simulation Details</Modal.Title>
        </Modal.Header>
        <Modal.Body>
            <div >
                <div className="h-75 row" >
                    <div className="col-12 p-4">
                        
                      <div className="d-flex align-items-center justify-content-between px-3">
                      <span className="mb-2 mx-2">Category: </span>
                      <input
                          style={{ width: "50%" }}
                          onChange={(e) => handleChange(e)}
                          type="text"
                          className="form-control mb-2"
                          id="category"
                          name="category"
                          value={formData.category}
                          placeholder="Enter your category"
                      />
                      </div>
                      <div className="d-flex align-items-center justify-content-between px-3">
                      <span className="mb-2 mx-2">Simulation(s): </span>
                      <input
                          style={{ width: "50%" }}
                          onChange={(e) => handleChange(e)}
                          type="text"
                          className="form-control mb-2"
                          id="simulationName"
                          name="simulationName"
                          value={formData.simulationName}
                          placeholder="Enter name"
                      />
                      </div>
                      <div className="d-flex align-items-center justify-content-between px-3">
                      <span className="mb-2 mx-2">Organization: </span>
                      <input
                          style={{ width: "50%" }}
                          onChange={(e) => handleChange(e)}
                          type="text"
                          className="form-control mb-2"
                          id="organizationName"
                          name="organizationName"
                          value={formData.organizationName}
                          placeholder="Enter organization name"
                      />
                      </div>
                      <div className="d-flex align-items-center justify-content-between px-3">
                      <span className="mb-2 mx-2">Start Time: </span>
                      <input
                          style={{ width: "50%" }}
                          onChange={(e) => handleChange(e)}
                          type="datetime-local"
                          className="form-control mb-2"
                          id="startTime"
                          name="startTime"
                          value={selectedId && formData.startTime?  moment.tz(formData.startTime, "Etc/GMT-0").format('YYYY-MM-DDTHH:mm') : formData.startTime}
                          placeholder="Enter Start Date/Time"
                      />
                      </div>
                      <div className="d-flex align-items-center justify-content-between px-3">
                      <span className="mb-2 mx-2">End Time: </span>
                      <input
                          style={{ width: "50%" }}
                          onChange={(e) => handleChange(e)}
                          type="datetime-local"
                          className="form-control mb-2"
                          id="endTime"
                          name="endTime"
                          value={selectedId && formData.endTime?  moment.tz(formData.endTime, "Etc/GMT-0").format('YYYY-MM-DDTHH:mm') : formData.endTime}
                          placeholder="Enter Close Date/Time"
                      />
                      </div>
                    
                    </div>
                </div>
                <div className="h-25 row mt-25 ">
                  <div className="col-6 ">
                    <div className="d-flex justify-content-around align-items-center">
                        <span className="mx-3 ">Class Code: {code}</span>
                        <FontAwesomeIcon icon={faSync} className="pointer" onClick={() => { handleGenerateCode()}}/> 
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
            </div>
        </Modal.Body>
        <Modal.Footer>
            <Button variant="secondary" onClick={modalToggle}>
                Close
            </Button>
            <Button variant="primary" onClick={() => {selectedId ? handleUpdateSubmitForm() : handleSubmitForm()}}>
                Save Changes
            </Button>
        </Modal.Footer>
    </Modal>
  );
};
  
export default ModalScreen;