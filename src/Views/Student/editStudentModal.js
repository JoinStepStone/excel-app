import { useState, useRef, useEffect } from "react";
import { Modal, Button, Input, Dropdown, DropdownButton } from 'react-bootstrap';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faEye, faEyeSlash } from '@fortawesome/free-solid-svg-icons';
import { generateRandomCode } from '../../utilities/common';
import ExcelPreview from "../../Components/PreviewExcel";
import { updateMeById, getMeById } from "../../API/Student";
import { toast } from 'react-toastify';
import { Spin } from "antd";
import moment from 'moment';
import { Tooltop } from "../../Components/tooltip";
import { formValidationHandler } from "../../utilities/common";
import { useNavigate } from 'react-router-dom';

const EditStudentModalScreen = ({ show, modalToggle }) => {
  
  const navigate = useNavigate();
  const [isFormSubmitted, setIsFormSubmitted] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [showPassword, setShowPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);
  const [errorKey, setErrorKey] = useState({ key: null, msg: ""});
  const [formData, setFormData] = useState({
    "firstName":null,
    "lastName":null,
    "email":null,
    "password":null,
    "confirmPassword":null,
    "university":null,
    "gradYear":null,
    "ethnicity":"Select Ethnicity",
    "race": "Select the races you identify with",
    "gender": "Select Gender",
  });

  const handleSelectEthnicity = (eventKey) => {
    setFormData((prevData) => ({
      ...prevData,
      "ethnicity": eventKey
    }));
  };

  const handleSelectRace = (eventKey) => {
    setFormData((prevData) => ({
      ...prevData,
      "race": eventKey
    }));
  };

  const handleSelectGender = (eventKey) => {
    setFormData((prevData) => ({
      ...prevData,
      "gender": eventKey
    }));
  };

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prevData) => ({
      ...prevData,
      [name]: value
    }));

  };

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await getMeById();
        if (response.code === 201) {
          response.data["confirmPassword"] = response.data["password"]
          setFormData({
            ...response.data,
          });
        } else {
          toast.error(response.message);
        }
      } catch (error) {
        toast.error('An error occurred while fetching the data.');
      }
    };

    fetchData();
  }, []);

  useEffect(() => {
    if(isFormSubmitted){
      const error = formValidationHandler(formData)
      if(error){
        if(error.msg !== errorKey.msg){
          setErrorKey(error)
          setIsLoading(false)
          toast.error(error.msg)
        }
      }
    }
  }, [formData])

  const handleSubmitForm = async () => {
    setIsLoading(true)
    setIsFormSubmitted(true)

    const error = formValidationHandler(formData)
    if(error){
      setErrorKey(error)
      setIsLoading(false)
      toast.error(error.msg)
    }else{
      setErrorKey({ key: null, msg: ""})
      delete formData.confirmPassword;
    
      const response = await updateMeById(formData)
      if(response.code == 201){
        toast.success(response.message)
        setIsFormSubmitted(false)
        modalToggle(true)
      }else{
        toast.error(response.message)
      }
      
    }

    setIsLoading(false)

  };
      
  return (
    <Modal show={show} onHide={modalToggle}>
        <Modal.Header closeButton>
            <Modal.Title>Student Detail</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <div className="m-0 overflow-auto" style={{height: "500px"}}> 
            <div class="h-75">
              <div className="row">
                <div className="col-6 mx-auto">
                  <div className="d-flex flex-column justify-content-around">
                  <div className={`border border-solid rounded-2 my-1 ${errorKey.key == "firstName" ? "form-border-error-color" : "form-border-color"}  d-flex px-2 align-items-center`}>
                      <input
                        onChange={(e) => handleChange(e)}
                        type="text"
                        className="form-control border-0 no-focus-outline"
                        id="firstName"
                        name="firstName"
                        autocomplete="off" 
                        placeholder="Enter your First Name"
                        value={formData["firstName"]}
                      />
                      { errorKey.key == "firstName" && <Tooltop msg={errorKey.msg} className = {"icon-color pointer"} />}
                    </div>
                    <div className={`border border-solid rounded-2 my-1 ${errorKey.key == "lastName" ? "form-border-error-color" : "form-border-color"}  d-flex px-2 align-items-center`}>
                      <input
                        onChange={(e) => handleChange(e)}
                        type="text"
                        className="form-control border-0 no-focus-outline"
                        id="lastName"
                        name="lastName"
                        autocomplete="off" 
                        placeholder="Enter your Last Name"
                        value={formData["lastName"]}
                      />
                      { errorKey.key == "lastName" && <Tooltop msg={errorKey.msg} className = {"icon-color pointer"} />}
                    </div>
                    <div className={`border border-solid rounded-2 my-1 ${errorKey.key == "email" ? "form-border-error-color" : "form-border-color"}  d-flex px-2 align-items-center`}>
                      <input
                        onChange={(e) => handleChange(e)}
                        type="text"
                        className="form-control border-0 no-focus-outline"
                        id="email"
                        name="email"
                        autocomplete="off" 
                        placeholder="Enter your Email"
                        value={formData["email"]}
                      />
                      { errorKey.key == "email" && <Tooltop msg={errorKey.msg} className = {"icon-color pointer"} />}
                    </div>
                    <div className={`border border-solid rounded-2 my-1 ${errorKey.key == "password" ? "form-border-error-color" : "form-border-color"}  d-flex px-2 align-items-center`}>
                      <input
                        onChange={(e) => handleChange(e)}
                        type={showPassword ? "text" : "password"}
                        className="form-control border-0 no-focus-outline"
                        id="password"
                        name="password"
                        autocomplete="off" 
                        placeholder="Enter your password"
                        value={formData["password"]}
                      />
                      { errorKey.key == "password" && <Tooltop msg={errorKey.msg} className = {"icon-color pointer"} />}
                      <FontAwesomeIcon icon={showPassword ? faEye : faEyeSlash} className="mx-2 pointer" onClick={() => setShowPassword(!showPassword)}/> 
                    </div>
                    <div className={`border border-solid rounded-2 my-1 ${errorKey.key == "confirmPassword" ? "form-border-error-color" : "form-border-color"}  d-flex px-2 align-items-center`}>
                      <input
                        onChange={(e) => handleChange(e)}
                        type={showConfirmPassword ? "text" : "password"}
                        className="form-control border-0 no-focus-outline"
                        id="confirmPassword"
                        name="confirmPassword"
                        autocomplete="off" 
                        placeholder="Enter your Confirm Password"
                        value={formData["confirmPassword"]}
                      />
                      { errorKey.key == "confirmPassword" && <Tooltop msg={errorKey.msg} className = {"icon-color pointer"} />}
                      <FontAwesomeIcon icon={showConfirmPassword ? faEye : faEyeSlash} className="mx-2 pointer" onClick={() => setShowConfirmPassword(!showConfirmPassword)}/> 
                    </div>
                    <div className={`border border-solid rounded-2 my-1 ${errorKey.key == "university" ? "form-border-error-color" : "form-border-color"}  d-flex px-2 align-items-center`}>
                      <input
                        onChange={(e) => handleChange(e)}
                        type="text"
                        className="form-control border-0 no-focus-outline"
                        id="university"
                        name="university"
                        autocomplete="off" 
                        placeholder="Enter your University"
                        value={formData["university"]}
                      />
                      { errorKey.key == "university" && <Tooltop msg={errorKey.msg} className = {"icon-color pointer"} />}
                    </div>
                    <div className={`border border-solid rounded-2 my-1 ${errorKey.key == "gradYear" ? "form-border-error-color" : "form-border-color"}  d-flex px-2 align-items-center`}>
                      <input
                        onChange={(e) => handleChange(e)}
                        type="text"
                        className="form-control border-0 no-focus-outline"
                        id="gradYear"
                        name="gradYear"
                        autocomplete="off" 
                        placeholder="Enter your Graduation Year"
                        value={formData["gradYear"]}
                      />
                      { errorKey.key == "gradYear" && <Tooltop msg={errorKey.msg} className = {"icon-color pointer"} />}
                    </div>
                    <DropdownButton 
                      id="dropdown-ethnicity-button" 
                      className="my-2" 
                      variant={errorKey.key == "ethnicity" ? "danger" : "primary"} 
                      title={formData.ethnicity} 
                      onSelect={handleSelectEthnicity}
                    >
                      <Dropdown.Item eventKey="Hispanic">Hispanic</Dropdown.Item>
                      <Dropdown.Item eventKey="Latin">Latin</Dropdown.Item>
                    </DropdownButton>
                    <DropdownButton 
                      id="dropdown-race-button" 
                      className="my-2" 
                      variant={errorKey.key == "race" ? "danger" : "primary"} 
                      title={formData.race} 
                      onSelect={handleSelectRace}
                    >
                      <Dropdown.Item eventKey="Indian">American Indian or Alaska Nativ</Dropdown.Item>
                      <Dropdown.Item eventKey="Asian">Asian</Dropdown.Item>
                      <Dropdown.Item eventKey="Black">Black or African American</Dropdown.Item>
                      <Dropdown.Item eventKey="Hawaiian">Native Hawaiian or other Pacific Islander</Dropdown.Item>
                      <Dropdown.Item eventKey="White">White</Dropdown.Item>
                      <Dropdown.Item eventKey="Other">Other</Dropdown.Item>
                    </DropdownButton>
                    <DropdownButton 
                      id="dropdown-gender-button" 
                      className="my-2" 
                      variant={errorKey.key == "gender" ? "danger" : "primary"} 
                      title={formData.gender} 
                      onSelect={handleSelectGender}
                    >
                      <Dropdown.Item eventKey="Female">Female</Dropdown.Item>
                      <Dropdown.Item eventKey="Not Disclosed">I do not wish to disclose</Dropdown.Item>
                      <Dropdown.Item eventKey="Male">Male</Dropdown.Item>
                    </DropdownButton>
                  </div>
                </div>
              </div>
              {/* <div className="row ">
                <div className="my-2 col-12 mx-auto">
                  <div className="d-flex justify-content-around">
                      <Button variant="secondary" className="w-50" onClick={() => handleSubmitForm()}>
                        {isLoading ? <Spin size="small" className="custom-spin"/> : "Sign Up"}
                      </Button> 
                  </div>
                </div>
                <div className="col-12 mx-auto">
                  <div className="d-flex justify-content-around">
                      <Button variant="secondary" className="w-50"  onClick={() => navigate('/login')}>
                        Login
                      </Button>
                  </div>
                </div>
              </div> */}
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
  
  export default EditStudentModalScreen;