import { useState, useRef, useEffect } from "react";
import { Modal, Button, Input } from 'react-bootstrap';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faTrash, faSync } from '@fortawesome/free-solid-svg-icons';
import { generateRandomCode } from '../utilities/common';

const ModalRegister = ({ show, modalToggle }) => {
    const [code, setCode] = useState(generateRandomCode());
    const [fileName, setFileName] = useState("Upload File...");
    const [formData, setFormData] = useState({
        simulation: '',
        classCode: ''
      });

      const fileInput = useRef(null)

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
      
      const handleGenerateCode = () => {
        setCode(generateRandomCode());
      };

      const handleFileChange = (event) => {
        if (event.target.files.length > 0) {
          setFileName(event.target.files[0].name);
        }
      };

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
                            id="simulation"
                            name="simulation"
                            value={formData.simulation}
                            placeholder="Select your simulation"
                        />
                        <input
                            onChange={(e) => handleChange(e)}
                            type="text"
                            className="form-control mb-2"
                            id="classCode"
                            name="classCode"
                            value={formData.classCode}
                            placeholder="Enter class code"
                        />
                    </div>
                </div>
            </Modal.Body>
            <Modal.Footer>
                <Button variant="secondary" onClick={modalToggle}>
                    Close
                </Button>
                <Button variant="primary" onClick={modalToggle}>
                    Save Changes
                </Button>
            </Modal.Footer>
        </Modal>
    );
  };
  
  export default ModalRegister;