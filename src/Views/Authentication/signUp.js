import "./authStyle.css"
import { useEffect, useState } from "react";
import { Modal, Button, Input, Dropdown, DropdownButton } from 'react-bootstrap';
import { useNavigate } from 'react-router-dom';
import { signUp, getUniListApi } from "../../API/Authorization";
import { toast } from 'react-toastify';
import { Spin } from "antd";
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faEye, faEyeSlash, faRefresh } from '@fortawesome/free-solid-svg-icons';
import { Tooltop } from "../../Components/tooltip";
import { formValidationHandler } from "../../utilities/common";
import SuggestionLists from "../../Components/suggestionLists";

const SignUP = () => {
  
  const navigate = useNavigate(); 
  const [isFormSubmitted, setIsFormSubmitted] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [showPassword, setShowPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);
  const [uniListNames, setUniListNames] = useState([]);
  const [suggestions, setSuggestions] = useState([]);
  const [errorKey, setErrorKey] = useState({ key: null, msg: ""});
  const [formData, setFormData] = useState({
    "firstName":null,
    "lastName":null,
    "email":null,
    "password":null,
    "confirmPassword":null,
    "university":null,
    "gpaScore":null,
    "gradYear":null,
    "ethnicity":"Select Ethnicity",
    "race": "Select the Race(s) You Identify With",
    "gender": "Select Gender",
  });

  useEffect(() => {

    const fetchData = async () => {
      const response = await getUniListApi()
      if(response.code == 201){
        setUniListNames(response.data.universityName)
      }else{
        toast.error("Error In Getting Universities List")
      }
    }

    fetchData()
  }, [])

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


    if(name == "university") {
      if (value) {
        const filteredSuggestions = uniListNames.filter((university) =>
        university.toLowerCase().startsWith(value.toLowerCase())
        );
        setSuggestions(filteredSuggestions);
      } else {
        setSuggestions([]);
      }
    }else if(name == "gpaScore") {
      
      // Regular expression to match the GPA format (x.xx)
      const regex = /^(?!0\d)(?:[0-3](?:\.\d{0,2})?|4(?:\.0{0,2})?)$/;

      // Validate the input value
      if (value === '' || regex.test(value)) {
        setFormData((prevData) => ({
          ...prevData,
          [name]: value
        }));
        setErrorKey({ key: null, msg: ""})
      }else{
        const error = { key: "gpaScore", msg: "Format is incorrect, ranges are 0.00 to 4.00"}
        setErrorKey(error)
        toast.error(error.msg)
        setFormData((prevData) => ({
          ...prevData,
          [name]: "0"
        }));
      }

    };
    
  }


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
      formData.gpaScore = formData.gpaScore.length == 3 ? formData.gpaScore + "0" : formData.gpaScore 
      if(formData.ethnicity == "Select Ethnicity"){
        delete formData.ethnicity;
      }
      if(formData.race == "Select the Race(s) You Identify With"){
        delete formData.race;
      }
      if(formData.gender ==  "Select Gender"){
        delete formData.gender;
      }
      const response = await signUp(formData)
      if(response.code == 201){
        toast.success(response.message)
        setIsFormSubmitted(false)
        navigate('/login')
      }else{
        toast.error(response.message)
      }
      
    }

    setIsLoading(false)

  };
  
  const handleSuggestionClick = (key, value) => {
    setFormData((prevData) => ({
      ...prevData,
      [key]: value
    }));
    setSuggestions([]);
  };

  return (
      <div className="h-100 m-0 d-flex justify-content-center align-items-center"> 
        <div class="w-75 h-75">
          <div className="row" style={{ marginTop: "-50px" }}>
            <div className="col-5 mx-auto">
              

                <div className="d-flex justify-content-between mb-1">
                  <div className="">
                    <span>First Name: </span>
                    <div className={`border border-solid rounded-2 my-1 ${errorKey.key == "firstName" ? "form-border-error-color" : "form-border-color"}  d-flex px-2 align-items-center`}>
                      <input
                        onChange={(e) => handleChange(e)}
                        type="text"
                        className="form-control border-0 no-focus-outline"
                        id="firstName"
                        name="firstName"
                        autocomplete="off" 
                        placeholder="First Name"
                      />
                      { errorKey.key == "firstName" && <Tooltop msg={errorKey.msg} className = {"icon-color pointer"} />}
                    </div>
                  </div>
                  <div className="">
                    <span>Last Name: </span>
                    <div className={`border border-solid rounded-2 my-1 ${errorKey.key == "lastName" ? "form-border-error-color" : "form-border-color"}  d-flex px-2 align-items-center`}>
                      <input
                        onChange={(e) => handleChange(e)}
                        type="text"
                        className="form-control border-0 no-focus-outline w-100"
                        id="lastName"
                        name="lastName"
                        autocomplete="off" 
                        placeholder="Last Name"
                      />
                      { errorKey.key == "lastName" && <Tooltop msg={errorKey.msg} className = {"icon-color pointer"} />}
                    </div>
                  </div>
                </div>

                <div className=" my-1">
                  <span>Email: </span>
                  <div className={`border border-solid rounded-2 my-1 ${errorKey.key == "email" ? "form-border-error-color" : "form-border-color"}  d-flex px-2 align-items-center`}>
                    <input
                      onChange={(e) => handleChange(e)}
                      type="text"
                      className="form-control border-0 no-focus-outline"
                      id="email"
                      name="email"
                      autocomplete="off" 
                      placeholder="Email"
                    />
                    { errorKey.key == "email" && <Tooltop msg={errorKey.msg} className = {"icon-color pointer"} />}
                  </div>
                </div>

                <div className="">
                  <span>Password: </span>
                  <div className={`border border-solid rounded-2 my-1 ${errorKey.key == "password" ? "form-border-error-color" : "form-border-color"}  d-flex px-2 align-items-center`}>
                    <input
                      onChange={(e) => handleChange(e)}
                      type={showPassword ? "text" : "password"}
                      className="form-control border-0 no-focus-outline"
                      id="password"
                      name="password"
                      autocomplete="off" 
                      placeholder="Password"
                    />
                    { errorKey.key == "password" && <Tooltop msg={errorKey.msg} className = {"icon-color pointer"} />}
                    <FontAwesomeIcon icon={showPassword ? faEye : faEyeSlash} className="mx-2 pointer" onClick={() => setShowPassword(!showPassword)}/> 
                  </div>
                </div>

                <div className="">
                  <span>Confirm Password: </span>
                  <div className={`border border-solid rounded-2 my-1 ${errorKey.key == "confirmPassword" ? "form-border-error-color" : "form-border-color"}  d-flex px-2 align-items-center`}>
                    <input
                      onChange={(e) => handleChange(e)}
                      type={showConfirmPassword ? "text" : "password"}
                      className="form-control border-0 no-focus-outline"
                      id="confirmPassword"
                      name="confirmPassword"
                      autocomplete="off" 
                      placeholder="Confirm Password"
                    />
                    { errorKey.key == "confirmPassword" && <Tooltop msg={errorKey.msg} className = {"icon-color pointer"} />}
                    <FontAwesomeIcon icon={showConfirmPassword ? faEye : faEyeSlash} className="mx-2 pointer" onClick={() => setShowConfirmPassword(!showConfirmPassword)}/> 
                  </div>
                </div>

                <div className="">
                  <span>University Name: </span>
                  <div className={`border border-solid rounded-2 my-1 ${errorKey.key == "confirmPassword" ? "form-border-error-color" : "form-border-color"}  d-flex px-2 align-items-center`}>
                    <input
                      onChange={(e) => handleChange(e)}
                      type="text"
                      className="form-control border-0 no-focus-outline"
                      id="university"
                      name="university"
                      autocomplete="off" 
                      placeholder="University Name"
                      value={formData.university}
                      onBlur={() => setTimeout(() => setSuggestions([]), 100)}
                    />
                    { errorKey.key == "university" && <Tooltop msg={errorKey.msg} className = {"icon-color pointer"} />}
                  </div>
                  <div className="position-relative">
                    {suggestions.length > 0 && <SuggestionLists name={"university"} list={suggestions} handleSuggestionClick={handleSuggestionClick}/>}
                  </div>
                </div>
                
                <div className="d-flex justify-content-between mb-1">
                  <div>
                    <span>Graduation Year: </span>
                    <div className={`border border-solid rounded-2 my-1 ${errorKey.key == "gradYear" ? "form-border-error-color" : "form-border-color"}  d-flex px-2 align-items-center`}>
                      <input
                        onChange={(e) => handleChange(e)}
                        type="text"
                        className="form-control border-0 no-focus-outline"
                        id="gradYear"
                        name="gradYear"
                        autocomplete="off" 
                        placeholder="Graduation Year"
                      />
                      { errorKey.key == "gradYear" && <Tooltop msg={errorKey.msg} className = {"icon-color pointer"} />}
                    </div>
                  </div>
                  <div>
                    <span>GPA: </span>
                    <div className={`border border-solid rounded-2 my-1 ${errorKey.key == "gpaScore" ? "form-border-error-color" : "form-border-color"}  d-flex px-2 align-items-center`}>
                      <input
                        onChange={(e) => handleChange(e)}
                        type="text"
                        className="form-control border-0 no-focus-outline"
                        id="gpaScore"
                        name="gpaScore"
                        autocomplete="off" 
                        placeholder="0.00"
                        value={formData.gpaScore}
                        />
                      { errorKey.key == "gpaScore" && <Tooltop msg={errorKey.msg} className = {"icon-color pointer"} />}
                    </div>
                  </div>
                </div>

                <div className=" my-1">
                  <span>Select Ethnicity: </span>
                  <div className="d-flex align-items-center">
                    <DropdownButton 
                      style={{ width: "95%" }}
                      id={errorKey.key === "ethnicity" ? "dropdown-ethnicity-button" : "dropdown-ethnicity-button-purple"} 
                      className="my-2 p-0" 
                      variant={errorKey.key === "ethnicity" ? "danger" : undefined} 
                      title={formData.ethnicity} 
                      onSelect={handleSelectEthnicity}
                    >
                      <Dropdown.Item className="custom-dropdown-item" eventKey="Hispanic">Hispanic</Dropdown.Item>
                      <Dropdown.Item className="custom-dropdown-item" eventKey="Latino">Latino</Dropdown.Item>
                    </DropdownButton>
                    <FontAwesomeIcon icon={faRefresh} className="mx-2 pointer" onClick={() => setFormData((prevData) => ({...prevData, "ethnicity": "Select Ethnicity"}))}/> 
                  </div>
                </div>
                <div className=" my-1">
                  <span>Select the Race(s) You Identify With: </span>
                  <div className="d-flex align-items-center">
                    <DropdownButton 
                      style={{ width: "95%" }}
                      id={errorKey.key === "race" ? "dropdown-race-button" : "dropdown-race-button-purple"} 
                      className="my-2 " 
                      variant={errorKey.key == "race" ? "danger" : "primary"} 
                      title={formData.race} 
                      onSelect={handleSelectRace}
                    >
                      <Dropdown.Item className="custom-dropdown-item" eventKey="American Indian or Alaska Native">American Indian or Alaska Native</Dropdown.Item>
                      <Dropdown.Item className="custom-dropdown-item" eventKey="Asian">Asian</Dropdown.Item>
                      <Dropdown.Item className="custom-dropdown-item" eventKey="Black or African American">Black or African American</Dropdown.Item>
                      <Dropdown.Item className="custom-dropdown-item" eventKey="Native Hawaiian or other Pacific Islander">Native Hawaiian or other Pacific Islander</Dropdown.Item>
                      <Dropdown.Item className="custom-dropdown-item" eventKey="White">White</Dropdown.Item>
                      <Dropdown.Item className="custom-dropdown-item" eventKey="Other">Other</Dropdown.Item>
                    </DropdownButton>
                    <FontAwesomeIcon icon={faRefresh} className="mx-2 pointer" onClick={() => setFormData((prevData) => ({...prevData, "race": "Select the Race(s) You Identify With"}))}/> 
                  </div>
                </div>
                <div className=" my-1">
                    <span>Select Gender: </span>
                    <div className="d-flex align-items-center">
                      <DropdownButton 
                        style={{ width: "95%" }}
                        id={errorKey.key === "gender" ? "dropdown-gender-button" : "dropdown-gender-button-purple"} 
                        className="my-2 w-100" 
                        variant={errorKey.key == "gender" ? "danger" : "primary"} 
                        title={formData.gender} 
                        onSelect={handleSelectGender}
                      >
                        <Dropdown.Item className="custom-dropdown-item" eventKey="Female">Female</Dropdown.Item>
                        <Dropdown.Item className="custom-dropdown-item" eventKey="Not Disclosed">I do not wish to disclose</Dropdown.Item>
                        <Dropdown.Item className="custom-dropdown-item" eventKey="Male">Male</Dropdown.Item>
                      </DropdownButton>
                      <FontAwesomeIcon icon={faRefresh} className="mx-2 pointer" onClick={() => setFormData((prevData) => ({...prevData, "gender": "Select Gender"}))}/> 
                    </div>
                </div>

            </div>
          </div>
          <div className="row">
            <div className="my-2 col-6 mx-auto">
              <div className="d-flex justify-content-around">
                  <Button variant="secondary" className="w-50" onClick={() => handleSubmitForm()}>
                    {isLoading ? <Spin size="small" className="custom-spin"/> : "Sign Up"}
                  </Button> 
              </div>
            </div>
          </div>
          <div className="row ">
              <div className="my-2 col-6 mx-auto">
                <div className="d-flex justify-content-around">
                    <Button variant="secondary" className="w-50"  onClick={() => navigate('/login')}>
                      Login
                    </Button>
                </div>
              </div>
            </div>
        </div>
      </div>
    );
  };
  
  export default SignUP;