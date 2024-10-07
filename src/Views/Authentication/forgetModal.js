import { useState, useRef, useEffect } from "react";
import { Modal, Button, Input } from 'react-bootstrap';
import { verifyEmailAddressApi, setNewPasswordApi } from "../../API/Authorization";
import { toast } from 'react-toastify';
import { Spin } from "antd";
import moment from 'moment';

const ModalScreen = ({ show, modalToggle }) => {
    
  const [isLoading, setIsLoading] = useState(false);
  const [updatePassword, setUpdatePassword] = useState(false);
  const [formData, setFormData] = useState({
    email: "",
    password: ""
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prevData) => ({
      ...prevData,
      [name]: value
    }));
  };

  const verifyEmailAddress = async () => {
    setIsLoading(true)
    const response = await verifyEmailAddressApi(formData)
    console.log("Response", response)
    if(response.code == 201){
      setUpdatePassword(true)
      toast.success(response.message)
    }else{
      toast.error(response.message)
    }
    setIsLoading(false)
  }

  const setNewPasswordHandler = async () => {
    setIsLoading(true)
    const response = await setNewPasswordApi(formData)
    console.log("Response 2", response)
    if(response.code == 201){
      toast.success(response.message)
      setUpdatePassword(false)
      modalToggle()
    }else{
      toast.error(response.message)
    }
    setIsLoading(false)
  }

  return (
    <Modal show={show} onHide={modalToggle} size="md">
        <Modal.Header closeButton>
            <Modal.Title>Forget Password</Modal.Title>
        </Modal.Header>
        <Modal.Body>
            <div>
              {isLoading ? <div className="d-flex position-absolute justify-content-center align-items-center" style={{ top: '50%', left: '50%', transform: 'translate(-50%, -50%)' }}><Spin size="large"/> </div> : null}
                <div className="h-75 row my-5">
                    <div className="col-8 m-auto ">
                      <div className="d-flex flex-column justify-content-around">
                        <span className="font-semi-bold">{updatePassword ? "New Password" :  "Verify Email:"} </span>
                        <div className={`border border-solid rounded-2 my-1 form-border-color  d-flex px-2 align-items-center`}>
                          <input
                            onChange={(e) => handleChange(e)}
                            type="text"
                            className="form-control border-0 no-focus-outline"
                            id={updatePassword ? "password" : "email"}
                            name={updatePassword ? "password" : "email"}
                            value={updatePassword ? formData["password"] : formData["email"]}
                            autocomplete="off" 
                            placeholder={updatePassword ? "New Password" : "Email"}
                          />
                          </div>
                      </div>
                    </div>
                </div>
            </div>
        </Modal.Body>
        <Modal.Footer>
            <Button variant="secondary" className="border-raduis-zero" onClick={modalToggle}>
                Close
            </Button>
            <Button disabled={isLoading} className="border-raduis-zero" variant="primary" onClick={() => {updatePassword ? setNewPasswordHandler() : verifyEmailAddress()}}>
                Continue
            </Button>
        </Modal.Footer>
    </Modal>
  );
};
  
  export default ModalScreen;