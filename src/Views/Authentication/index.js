import { useState, useEffect } from "react";
import { Modal, Button, Input } from 'react-bootstrap';
import { useNavigate } from 'react-router-dom';
import { hasEmptyValues } from "../../utilities/common";
import { Spin } from "antd";
import { toast } from 'react-toastify';
import { signIn } from "../../API/Authorization";
import { loginFormValidationHandler } from "../../utilities/common";
import { Tooltop } from "../../Components/tooltip";
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faEye, faEyeSlash } from '@fortawesome/free-solid-svg-icons';
import { FaHome } from "react-icons/fa";
import ModalRegister from "./forgetModal";

const Login = () => {

  const navigate = useNavigate();
  const [show, setShow] = useState(false);
  const [isFormSubmitted, setIsFormSubmitted] = useState(false);
  const [showPassword, setShowPassword] = useState(false);
  const [errorKey, setErrorKey] = useState({ key: null, msg: ""});
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
  
  useEffect(() => {
    if(isFormSubmitted){
      const error = loginFormValidationHandler(formData)
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

    const error = loginFormValidationHandler(formData)
    if(error){
      setErrorKey(error)
      setIsLoading(false)
      toast.error(error.msg)
    }else{
      setErrorKey({ key: null, msg: ""})
      const response = await signIn(formData)
      if(response.code == 201){
        localStorage.setItem("accessToken", JSON.stringify(response.data));
        setIsFormSubmitted(false)
        toast.success(response.message)
        navigate('/')
      }else{
        toast.error(response.message)
      }
    }


    setIsLoading(false)

  };

  const modalToggle = () => {
    setShow(!show)
};

  return (
    <div className="pt-5 h-100 m-0 d-flex justify-content-center  align-items-center"> 
      <ModalRegister show={show} modalToggle={modalToggle}/>
      <div class="h-50 bg-white p-5" style={{ width: "30%" }}>
        <div className="d-flex justify-content-start align-items-center" style={{ marginTop: "-20px", marginBottom: "20px"}}>
          <FaHome />
          <a className="underline-offset pointer" style={{ fontSize: "7px", marginLeft: "5px" }} href="https://joinstepstone.com/">Return to StepStone Home</a>
        </div>
        <div className="d-flex justify-content-center mb-2 mt-1" >
          <img src="/Artboard 2.png" width={100} />
        </div>
        <div className="row">
          <div className="col-12 mx-auto">
            <div className="d-flex flex-column justify-content-around">
              <span className="font-semi-bold">Email: </span>
              <div className={`border border-solid rounded-2 my-1 ${errorKey.key == "email" ? "form-border-error-color" : "form-border-color"}  d-flex px-2 align-items-center`}>
                <input
                  onChange={(e) => handleChange(e)}
                  type="text"
                  className="form-control border-0 no-focus-outline"
                  id="email"
                  name="email"
                  value={formData["email"]}
                  autocomplete="off" 
                  placeholder="Email"
                />
                { errorKey.key == "email" && <Tooltop msg={errorKey.msg} className = {"icon-color pointer"} />}
                </div>
            </div>

            <div className="mt-2 d-flex flex-column justify-content-around">
              <span className="font-semi-bold">Password: </span>
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
          </div>
        </div>
        <div className="row">
          <div className="my-2 col-12 mx-auto">
            <div className="d-flex justify-content-around">
                <Button variant="primary" className="w-50 border-raduis-zero button-color" onClick={() => handleSubmitForm()}>
                  {isLoading ? <Spin size="small" className="custom-spin"/> : "Login"}
                </Button>
            </div>
          </div>
        </div>
        <div className="row">
          <div className="my-2 col-12 mx-auto">
            <div className="d-grid justify-content-start">
                <a className="underline-offset-none pointer font-semi-bold" style={{ fontSize: "13px" }} onClick={() => modalToggle()} >Forgot your password?</a>
                <a className="underline-offset-none pointer font-semi-bold" style={{ fontSize: "13px" }} onClick={() => navigate('/signUp')} >Create an account</a>
            </div>
          </div>
        </div>
      </div>
    </div>
  );

};

export default Login;