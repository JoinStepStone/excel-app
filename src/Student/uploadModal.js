import { useState, useRef, useEffect } from "react";
import { Modal, Button, Input } from 'react-bootstrap';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faTrash, faSync } from '@fortawesome/free-solid-svg-icons';
import { generateRandomCode } from '../utilities/common';
import ExcelPreview from "../Components/PreviewExcel";

const ModalScreen = ({ show, modalToggle }) => {
    const [fileName, setFileName] = useState("Upload File...");
    const [file, setFile] = useState(null);
    const [formData, setFormData] = useState({
        category: '',
        name: '',
        organization: '',
        startDateTime: '',
        closeDateTime: '',
      });

      const fileInput = useRef(null)

      useEffect(() => {
        
      }, [])

      const handleChange = (e) => {
        const { name, value } = e.target;
        setFormData((prevData) => ({
          ...prevData,
          [name]: value
        }));
      };
      

      const handleFileChange = (event) => {
        console.log("handleFileChange")
        if (event.target.files.length > 0) {
          setFileName(event.target.files[0].name);
          setFile(event)
        }
      };

      return (
        <Modal show={show} onHide={modalToggle}>
            <Modal.Header closeButton>
                <Modal.Title>Simulation Details</Modal.Title>
            </Modal.Header>
            <Modal.Body>
                <div>
                    <div className="h-75 row my-5">
                        <div className="col-6 m-auto ">
                            <div 
                            className={file ? "border border-dark text-center mx-4 w-75 max-height-100 rounded pointer" :
                                      "border border-dark text-center mx-4 w-75 rounded p-5 pointer"
                                      }
                            onClick={file? () => {} : () => fileInput.current.click()}
                            > 
                                {file && <ExcelPreview file={file}/>}
                                {!file && "Upload File"}
                            </div>
                            <input className="d-none" type="file" accept=".csv, .xlsx" ref={fileInput} onChange={handleFileChange}/>
                            <div className="mt-2">
                                <span className="mx-3 w-75">File Name: {fileName} </span>
                                <FontAwesomeIcon icon={faTrash} className="pointer" onClick={() => {setFileName(""); setFile(null);}}/> 
                            </div>                            
                        </div>
                    </div>
                    <div className="h-75 row">
                        <div className="col-6 m-auto ">
                          <div className="h-75 row">
                              <div className="col-4">
                                <div className="border border-dark text-center rounded pointer p-2" > 
                                    score
                                </div>
                              </div>
                              <div className="col-4 m-auto">
                                <div className="row min-content-width">
                                  <div className="border border-dark text-center w-100 rounded pointer p-2" > 
                                      Share score with Employees
                                  </div>
                                  <div className="d-flex min-content-width justify-content-around mt-2">
                                    <div className="border border-dark text-center  pointer px-3 py-1 mx-3" > 
                                        Yes
                                    </div>
                                    <div className="border border-dark text-center  pointer px-3 py-1 mx-3" > 
                                        No
                                    </div>
                                  </div>
                                </div>
                              </div>
                          </div>
                        </div>
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
  
  export default ModalScreen;