import { useState, useRef, useEffect } from "react";
import { Modal, Button, Input } from 'react-bootstrap';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faTrash, faSync } from '@fortawesome/free-solid-svg-icons';
import { generateRandomCode, hasEmptyValues } from '../../utilities/common';
import { Spin } from "antd";
import { toast } from 'react-toastify';
import { getSimulationClassCode, postSimulationClassCodeAndSimulation } from "../../API/Student";

const ModalRegister = ({ show, modalToggle }) => {

    const [isLoading, setIsLoading] = useState(false);
    const [simulationDetail, setSimulationDetail] = useState(null);
    const [formData, setFormData] = useState({
        classCode: '',
      });

      useEffect(() => {
        const modalContent = document.querySelector('.modal-content');
        if (modalContent) {
          modalContent.style.width = '100% !important';
        }
      }, []);

      const handleChange = (e) => {
        const { name, value } = e.target;
        setFormData((prevData) => ({
          ...prevData,
          [name]: value
        }));
      };
      
      const submitSearchHandler = async () => {
        setIsLoading(true)
        let requestData = {...formData}
    
        if(hasEmptyValues(requestData)){
          setIsLoading(false)
          return toast.error("There are empty values")
        }
        
        const response = await getSimulationClassCode(requestData)
        if(response.code == 201){
          toast.success(response.message)
          setSimulationDetail(response.data)
        }else{
          toast.error(response.message)
        }
    
        setIsLoading(false)
      }


      const submitSimulationHandler = async () => {
        setIsLoading(true)
        let requestData = {...simulationDetail}

        if(hasEmptyValues(requestData)){
          setIsLoading(false)
          return toast.error("There are empty values")
        }
        
        const response = await postSimulationClassCodeAndSimulation(requestData["_id"])
        if(response.code == 201){
          toast.success(response.message)
          setSimulationDetail(null)
          setFormData({
            classCode: '',
          })
          modalToggle(true)
        }else{
          toast.error(response.message)
          // modalToggle()
        }
    
        setIsLoading(false)
      }


      return (
        <Modal show={show} onHide={modalToggle}>
            <Modal.Header closeButton>
                <Modal.Title>Select Simulation</Modal.Title>
            </Modal.Header>
            <Modal.Body>
                <div className="h-75 row">
                    <div className="col-12">
                        
                        <input
                            onChange={(e) => handleChange(e)}
                            type="text"
                            className="form-control mb-2"
                            id="classCode"
                            name="classCode"
                            value={formData.classCode}
                            placeholder="Enter class code"
                        />
                        <input
                            type="text"
                            disabled={true}
                            className="form-control mb-2"
                            id="simulation"
                            name="simulation"
                            placeholder="Simulation Name"
                            value={simulationDetail?.simulationName}
                        />
                    </div>
                </div>
            </Modal.Body>
            <Modal.Footer>
                <Button variant="secondary" onClick={() => submitSearchHandler()}>
                    Search
                </Button>
                <Button variant="primary" onClick={() => submitSimulationHandler()}>
                    Add to simulation
                </Button>
            </Modal.Footer>
        </Modal>
    );
  };
  
  export default ModalRegister;