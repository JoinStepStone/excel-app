import { Modal, Button, Input } from 'react-bootstrap';
import { useState, useRef, useEffect } from "react";
import { useNavigate } from 'react-router-dom';
import { checkAuth } from '../API/Authorization';

const NoPage = () => {
    
    const [counter, setCounter] = useState(5);
    const navigate = useNavigate();

    useEffect(() => {

      const timer = setTimeout(() => {
        navigationHandler()
      }, 6000);


      const intervalId = setInterval(() => {
        setCounter(prevCounter => prevCounter - 1);
      }, 1000);
  
      return () => {
        clearInterval(intervalId)
        clearTimeout(timer)
      };
    }, []); 

    const navigationHandler = async () => {
      // const response = await checkAuth()
      // if(response.code == 201){
        const role = JSON.parse(localStorage.getItem("accessToken"))
        if(!role){
          return navigate('/login')
        }
        navigate('/')
      // }else{
      //   return navigate('/login')
      // }
    }

    return (
      <div className="h-100 d-flex justify-content-center align-items-center">
            <h1>No Page</h1>
            <Button variant="secondary" className='mx-5' onClick={() => navigationHandler()}>
              It will be redirected in {counter}
            </Button>
      </div>
    );
  };
  
  export default NoPage;