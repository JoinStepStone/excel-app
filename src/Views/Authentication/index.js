import { useState } from "react";
import { Modal, Button, Input } from 'react-bootstrap';
import { useNavigate } from 'react-router-dom';
import { hasEmptyValues } from "../../utilities/common";
import { Spin } from "antd";
import { toast } from 'react-toastify';
import { signIn } from "../../API/Authorization";

const Login = () => {

  const navigate = useNavigate();
  const [formData, setFormData] = useState({
    email: "",
    password: ""
  });
  const [isLoading, setIsLoading] = useState(false);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prevData) => ({
      ...prevData,
      [name]: value
    }));
  };
  
  const handleSubmitForm = async () => {
    setIsLoading(true)
    let requestData = {...formData}

    if(hasEmptyValues(requestData)){
      setIsLoading(false)
      return toast.error("There are empty values")
    }

    const response = await signIn(requestData)
    if(response.code == 201){
      localStorage.setItem("accessToken", JSON.stringify(response.data));
      toast.success(response.message)
      navigate('/')
    }else{
      toast.error(response.message)
    }

    setIsLoading(false)

  };

  return (
    <div className="pt-5 h-100 m-0 d-flex justify-content-center  align-items-center">
      <div class="w-50 h-50">
        <div className="row">
          <div className="col-6 mx-auto">
            <div className="d-flex flex-column justify-content-around">
              <input
                onChange={(e) => handleChange(e)}
                type="text"
                className="form-control my-1"
                id="email"
                name="email"
                value={formData["email"]}
                autocomplete="off" 
                placeholder="Enter your email"
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
            </div>
          </div>
        </div>
        <div className="row">
          <div className="my-2 col-6 mx-auto">
            <div className="d-flex justify-content-around">
                <Button variant="primary" className="w-50" onClick={() => handleSubmitForm()}>
                  {isLoading ? <Spin size="small" className="custom-spin"/> : "Login"}
                </Button>
            </div>
          </div>
        </div>
        <div className="row">
          <div className="my-2 col-6 mx-auto">
            <div className="d-flex justify-content-around">
                <a className="underline-offset pointer">Forgot your password?</a>
                <a className="underline-offset pointer" onClick={() => navigate('/signUp')} >Create an account</a>
            </div>
          </div>
        </div>
      </div>
    </div>
  );

};

export default Login;