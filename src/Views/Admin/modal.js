import { useState, useRef, useEffect } from "react";
import { Modal, Button, Input, Dropdown, DropdownButton } from 'react-bootstrap';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faTrash, faSync } from '@fortawesome/free-solid-svg-icons';
import { generateRandomCode } from '../../utilities/common';
import ExcelPreview from "../../Components/PreviewExcel";
import { postSimulationsData, getSimulationById, updateSimulationsData, getSuggestionLists } from "../../API/Admin";
import { toast } from 'react-toastify';
import { Spin } from "antd";
import { registerModalalidationHandler } from "../../utilities/common";
import moment from 'moment-timezone';
import SuggestionLists from "../../Components/suggestionLists";

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
      status: false
    });
  const [suggestions, setSuggestions] = useState({});
  const [suggestionLists, setSuggestionLists] = useState({});

  const fileInput = useRef(null)

  useEffect(() => {
    const fetchData = async () => {
      try {
        const suggList = await getSuggestionLists();
        if (suggList.code === 201) {
          setSuggestionLists(suggList.data)
        } else {
          toast.error(suggList.message);
        }
        if(selectedId){
          const response = await getSimulationById({
          "simulationId": selectedId
          });
          if (response.code === 201) {
            response.data["startTime"] = moment.tz(response.data["startTime"], "Etc/GMT-0").format('YYYY-MM-DDTHH:mm')
            response.data["endTime"] = moment.tz(response.data["endTime"], "Etc/GMT-0").format('YYYY-MM-DDTHH:mm')
            setFormData({
              ...response.data,
            });
            setCode(response.data.classCode)
          } else {
            toast.error(response.message);
          }
        }else{
          setCode(generateRandomCode())
        }
      } catch (error) {
        toast.error('An error occurred while fetching the data.');
      }
    }
    fetchData();
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
    // Filter suggestions based on input
    if (value) {
      const filteredSuggestions = suggestionLists[name]?.filter((category) =>
        category.toLowerCase().startsWith(value.toLowerCase())
      );
      setSuggestions((prevData) =>({
        ...prevData,
        [name] : filteredSuggestions
      }));
    } else {
      setSuggestions({});
    }
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

  const handleSelectStatus = (event) => {
    setFormData((prevData) => ({
      ...prevData,
      "status": event == "true" ? true : false
    }));
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
    requestData.append('status', formData["status"]);
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
    requestData.append('status', formData["status"]);
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

    // handleGenerateCode()
    setIsLoading(false)
  };

  const handleSuggestionClick = (key, value) => {
    setFormData((prevData) => ({
      ...prevData,
      [key]: value
    }));
    setSuggestions({});
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
                      <div className="position-relative" style={{ width: "50%" }}>
                        <input
                            onChange={(e) => handleChange(e)}
                            type="text"
                            className="form-control mb-2"
                            id="category"
                            name="category"
                            value={formData.category}
                            placeholder="Category"
                            autocomplete="off"
                            onBlur={() => setTimeout(() => setSuggestions({}), 100)}
                        />
                        <div className="position-relative">
                          {suggestions.category?.length > 0 && <SuggestionLists name={"category"} list={suggestions.category} handleSuggestionClick={handleSuggestionClick}/>}
                        </div>
                      </div>
                      </div>
                      <div className="d-flex align-items-center justify-content-between px-3">
                      <span className="mb-2 mx-2">Simulation(s): </span>
                      <div className="position-relative" style={{ width: "50%" }}>
                      <input
                          onChange={(e) => handleChange(e)}
                          type="text"
                          className="form-control mb-2"
                          id="simulationName"
                          name="simulationName"
                          value={formData.simulationName}
                          autocomplete="off" 
                          placeholder="Enter name"
                          onBlur={() => setTimeout(() => setSuggestions({}), 100)}
                          />
                        <div className="position-relative">
                          {suggestions.simulationName?.length > 0 && <SuggestionLists name={"simulationName"} list={suggestions.simulationName} handleSuggestionClick={handleSuggestionClick}/>}
                        </div>
                      </div>
                      </div>
                      <div className="d-flex align-items-center justify-content-between px-3">
                      <span className="mb-2 mx-2">Organization: </span>
                      <div className="position-relative" style={{ width: "50%" }}>
                      <input
                          onChange={(e) => handleChange(e)}
                          type="text"
                          className="form-control mb-2"
                          id="organizationName"
                          name="organizationName"
                          value={formData.organizationName}
                          autocomplete="off" 
                          placeholder="Enter organization name"
                          onBlur={() => setTimeout(() => setSuggestions({}), 100)}
                          />
                        <div className="position-relative">
                          {suggestions.organizationName?.length > 0 && <SuggestionLists name={"organizationName"} list={suggestions.organizationName} handleSuggestionClick={handleSuggestionClick}/>}
                        </div>
                      </div>
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
                          value={formData.startTime}
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
                          value={formData.endTime}
                          placeholder="Enter Close Date/Time"
                      />
                      </div>
                      <div className="d-flex align-items-center justify-content-between px-3">
                        <span className="mb-2 mx-2">Simulation Status:</span>
                        <DropdownButton 
                          style={{ width: "50%" }}
                          id={"dropdown-ethnicity-button"} 
                          className="my-2 p-0" 
                          title={formData?.status ? "Active" : "Inactive"} 
                          onSelect={handleSelectStatus}
                        >
                          <Dropdown.Item eventKey={true}>Active</Dropdown.Item>
                          <Dropdown.Item eventKey={false}>Inactive</Dropdown.Item>
                        </DropdownButton>
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
                      <input className="d-none" type="file" accept=".xlsm" ref={fileInput} onChange={handleFileChange}/>
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