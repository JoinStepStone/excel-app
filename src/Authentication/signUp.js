import { useState } from "react";
import { Modal, Button, Input, Dropdown, DropdownButton } from 'react-bootstrap';
import { useNavigate } from 'react-router-dom';
import { signUp } from "../API/Authorization";
import { toast } from 'react-toastify';
import { hasEmptyValues } from "../utilities/common";
import { Spin } from "antd";


const SignUP = () => {
  
  const navigate = useNavigate();
  const [isLoading, setIsLoading] = useState(false);
  const [ethnicity, setEthnicity] = useState("Select Ethnicity");
  const [race, setRace] = useState("Select the races you identify with");
  const [gender, setGender] = useState("Select Gender");
  const [formData, setFormData] = useState({});

  const handleSelectEthnicity = (eventKey) => {
    // alert(`Selected: ${eventKey}`);
    setEthnicity(eventKey)
  };

  const handleSelectRace = (eventKey) => {
    // alert(`Selected: ${eventKey}`);
    setRace(eventKey)
  };

  const handleSelectGender = (eventKey) => {
    // alert(`Selected: ${eventKey}`);
    setGender(eventKey)
  };

  const handleChange = (e) => {
    const { name, value } = e.target;
    if(name == "confirmPassword"){
      const dummy = {...formData}
      console.log(dummy,name,value)
    }
    setFormData((prevData) => ({
      ...prevData,
      [name]: value
    }));
  };

  const handleSubmitForm = async () => {
    setIsLoading(true)
    let requestData = {...formData}
    requestData["ethnicity"] = ethnicity
    requestData["race"] = race
    requestData["gender"] = gender
    delete requestData.confirmPassword;

    if(hasEmptyValues(requestData)){
      setIsLoading(false)
      return toast.error("There are empty values")
    }

    const response = await signUp(requestData)
    if(response.code == 201){
      toast.success(response.message)
      navigate('/login')
    }else{
      toast.error(response.message)
    }
    
    setIsLoading(false)

  };

  return (
      <div className="pt-5 h-100 m-0 d-flex justify-content-center  align-items-center">
        <div class="w-50 h-75">
          <div className="row">
            <div className="col-6 mx-auto">
              <div className="d-flex flex-column justify-content-around">
                <input
                  onChange={(e) => handleChange(e)}
                  type="text"
                  className="form-control my-1"
                  id="firstName"
                  name="firstName"
                  autocomplete="off" 
                  placeholder="Enter your First Name"
                />
                <input
                  onChange={(e) => handleChange(e)}
                  type="text"
                  className="form-control my-1"
                  id="lastName"
                  name="lastName"
                  autocomplete="off" 
                  placeholder="Enter your Last Name"
                />
                <input
                  onChange={(e) => handleChange(e)}
                  type="text"
                  className="form-control my-1"
                  id="email"
                  name="email"
                  autocomplete="off" 
                  placeholder="Enter your Email"
                />
                <input
                  onChange={(e) => handleChange(e)}
                  type="password"
                  className="form-control my-1"
                  id="password"
                  name="password"
                  autocomplete="off" 
                  placeholder="Enter your password"
                />
                <input
                  onChange={(e) => handleChange(e)}
                  type="password"
                  className="form-control my-1"
                  id="confirmPassword"
                  name="confirmPassword"
                  autocomplete="off" 
                  placeholder="Enter your Confirm Password"
                />
                <input
                  onChange={(e) => handleChange(e)}
                  type="text"
                  className="form-control my-1"
                  id="university"
                  name="university"
                  autocomplete="off" 
                  placeholder="Enter your University"
                />
                <input
                  onChange={(e) => handleChange(e)}
                  type="text"
                  className="form-control my-1"
                  id="gradYear"
                  name="gradYear"
                  autocomplete="off" 
                  placeholder="Enter your Graduation Year"
                />
                <DropdownButton id="dropdown-ethnicity-button" className="my-2" title={ethnicity} onSelect={handleSelectEthnicity}>
                  <Dropdown.Item eventKey="Hispanic">Hispanic</Dropdown.Item>
                  <Dropdown.Item eventKey="Latin">Latin</Dropdown.Item>
                </DropdownButton>
                <DropdownButton id="dropdown-race-button" className="my-2" title={race} onSelect={handleSelectRace}>
                  <Dropdown.Item eventKey="Indian">American Indian or Alaska Nativ</Dropdown.Item>
                  <Dropdown.Item eventKey="Asian">Asian</Dropdown.Item>
                  <Dropdown.Item eventKey="Black">Black or African American</Dropdown.Item>
                  <Dropdown.Item eventKey="Hawaiian">Native Hawaiian or other Pacific Islander</Dropdown.Item>
                  <Dropdown.Item eventKey="White">White</Dropdown.Item>
                  <Dropdown.Item eventKey="Other">Other</Dropdown.Item>
                </DropdownButton>
                <DropdownButton id="dropdown-gender-button" className="my-2" title={gender} onSelect={handleSelectGender}>
                  <Dropdown.Item eventKey="Female">Female</Dropdown.Item>
                  <Dropdown.Item eventKey="Not Disclosed">I do not wish to disclose</Dropdown.Item>
                  <Dropdown.Item eventKey="Male">Male</Dropdown.Item>
                </DropdownButton>
              </div>
            </div>
          </div>
          <div className="row ">
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
          </div>
        </div>
      </div>
    );
  };
  
  export default SignUP;