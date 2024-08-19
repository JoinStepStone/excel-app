export function getMinutes(dateString) {
  // Create a Date object from the date string
  const date = new Date(dateString);

  // Extract the components
  const year = date.getUTCFullYear();
  const month = date.getUTCMonth() + 1; // Months are zero-based, so add 1
  const day = date.getUTCDate();
  let hours = date.getUTCHours();
  const minutes = date.getUTCMinutes();
  
  return minutes;
}

export function generateRandomCode(length = 8) {
    const characters = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789';
    let result = '';
    const charactersLength = characters.length;
    
    for (let i = 0; i < length; i++) {
      result += characters.charAt(Math.floor(Math.random() * charactersLength));
    }
    
    return result;
  }

export function getRandomNumber(min, max) {
    return (Math.random() * (max - min) + min).toFixed(2);
}

function isEmpty(value) {
    return (
      value === null ||
      value === undefined ||
      value === '' ||
      (Array.isArray(value) && value.length === 0) ||
      (typeof value === 'object' && Object.keys(value).length === 0)
    );
  }
  
export function hasEmptyValues(obj) {
    
    if(typeof obj === 'object' && Object.keys(obj).length === 0){
      return "All fields are empty"; 
    }
    for (const key in obj) {
      if (isEmpty(obj[key])) {
        return { msg: " is empty", key }; 
      }
    }

    return { msg: false, key: false };
  }

export const formValidationHandler = (data) => {

  // Regular expression for validating an Email
    const regex = /^[a-zA-Z0-9_.+-]+@[a-zA-Z0-9-]+\.[a-zA-Z0-9-.]+$/;
    const hasUpperCase = /[A-Z]/;
    const hasNumber = /\d/;
    if(data.firstName == null || data.firstName == ""){
      return { key: "firstName", msg: "First name is empty"}
    }
    else if(data.lastName == null || data.lastName == ""){
      return { key: "lastName", msg: "Last name field is empty"}
    }
    else if(data.email == null || data.email == "" || !regex.test(data.email)){
      return { key: "email", msg: "Email field is empty"}
    }
    else if(data.password == null || data.password == "" ){
      return { key: "password", msg: "Password field is empty"}
    }
    else if(!hasUpperCase.test(data.password)){
      return { key: "password", msg: "Password should have atleast one capital letter"}
    }
    else if(data.confirmPassword == null || data.confirmPassword == ""){
      return { key: "confirmPassword", msg: "Confirm password field is empty"}
    }
    else if(data.confirmPassword !== data.password){
      return { key: "confirmPassword", msg: "Confirm password field does not match"}
    }
    else if(data.university == null || data.university == ""){ 
      return { key: "university", msg: "University field is empty"}
    }
    else if(data.gradYear == null || data.gradYear == ""){
      return { key: "gradYear", msg: "Graduation year field is empty"}
    }
    // else if(data.ethnicity == "Select Ethnicity"){
    //   return { key: "ethnicity", msg: "Please select Ethnicity field"}
    // }
    // else if(data.race == "Select the Race(s) You Identify With"){
    //   return { key: "race", msg:"Please select race field"}
    // }
    // else if(data.gender == "Select Gender"){
    //   return { key: "gender", msg: "Please select gender field"}
    // }
   
    return false

  }

  export const updateFormValidationHandler = (data) => {

    // Regular expression for validating an Email
      const regex = /^[a-zA-Z0-9_.+-]+@[a-zA-Z0-9-]+\.[a-zA-Z0-9-.]+$/;
      const hasUpperCase = /[A-Z]/;
      const hasNumber = /\d/;
      if(data.firstName == null || data.firstName == ""){
        return { key: "firstName", msg: "First name is empty"}
      }
      else if(data.lastName == null || data.lastName == ""){
        return { key: "lastName", msg: "Last name field is empty"}
      }
      else if(data.email == null || data.email == "" || !regex.test(data.email)){
        return { key: "email", msg: "Email field is empty"}
      }
      else if(data.university == null || data.university == ""){
        return { key: "university", msg: "University field is empty"}
      }
      else if(data.gradYear == null || data.gradYear == ""){
        return { key: "gradYear", msg: "Graduation year field is empty"}
      }
      // else if(data.ethnicity == "Select Ethnicity"){
      //   return { key: "ethnicity", msg: "Please select Ethnicity field"}
      // }
      // else if(data.race == "Select the Race(s) You Identify With"){
      //   return { key: "race", msg:"Please select race field"}
      // }
      // else if(data.gender == "Select Gender"){
      //   return { key: "gender", msg: "Please select gender field"}
      // }
     
      return false
  
    }

export const updateAdminFormValidationHandler = (data) => {

    const regex = /^[a-zA-Z0-9_.+-]+@[a-zA-Z0-9-]+\.[a-zA-Z0-9-.]+$/;
    const hasUpperCase = /[A-Z]/;
   
    if(data.firstName == null || data.firstName == ""){
      return { key: "firstName", msg: "First name is empty"}
    }
    else if(data.lastName == null || data.lastName == ""){
      return { key: "lastName", msg: "Last name field is empty"}
    }
    else if(data.email == null || data.email == "" || !regex.test(data.email)){
      return { key: "email", msg: "Email field is empty"}
    }
    else if(data.password == null || data.password == "" ){
      return { key: "password", msg: "Password field is empty"}
    }
    else if(!hasUpperCase.test(data.password)){
      return { key: "password", msg: "Password should have atleast one capital letter"}
    }
    else if(data.confirmPassword == null || data.confirmPassword == ""){
      return { key: "confirmPassword", msg: "Confirm password field is empty"}
    }
    else if(data.confirmPassword !== data.password){
      return { key: "confirmPassword", msg: "Confirm password field does not match"}
    }
    else if(data.gender == "Select Gender"){
      return { key: "gender", msg: "Please select gender field"}
    }
   
    return false
    
      }

export const loginFormValidationHandler = (data) => {

  // Regular expression for validating an Email
    const regex = /^[a-zA-Z0-9_.+-]+@[a-zA-Z0-9-]+\.[a-zA-Z0-9-.]+$/;
    const hasUpperCase = /[A-Z]/;
    const hasNumber = /\d/;

    if(data.email == null || data.email == "" || !regex.test(data.email)){
      return { key: "email", msg: "Email field is empty"}
    }
    else if(data.password == null || data.password == "" ){
      return { key: "password", msg: "Password field is empty"}
    }
    // else if(!hasUpperCase.test(data.password)){
    //   return { key: "password", msg: "Password should have atleast one capital letter"}
    // }
    
    return false

  }

export const registerModalalidationHandler = (data) => {

  if(data.category == null || data.category == ""){
    return { key: "category", msg: "Category field is empty"}
  }
  else if(data.simulationName == null || data.simulationName == "" ){
    return { key: "simulationName", msg: "Simulation name field is empty"}
  }
  else if(data.organizationName == null || data.organizationName == "" ){
    return { key: "organizationName", msg: "Organization name field is empty"}
  }
  else if(data.startTime == null || data.startTime == "" ){
    return { key: "startTime", msg: "Start time field is empty"}
  }
  else if(data.endTime == null || data.endTime == "" ){
    return { key: "endTime", msg: "End time field is empty"}
  }
  
  return false

  }

  export const downloadFile = (id) => {
    // Open a new window
    const downloadWindow = window.open(
      "http://127.0.0.1:5000/admin/downloadSimulationFile/"+id,
      "_blank"
    );

    // Check if the window opened successfully
    if (downloadWindow) {
      // Poll the window for its 'closed' status
      const interval = setInterval(() => {
        // If the window is closed, clear the interval
        if (downloadWindow.closed) {
          clearInterval(interval);
        }
      }, 1000);

      // Close the window after a brief delay (assuming the download has started)
      setTimeout(() => {
        downloadWindow.close();
      }, 3000); // 3000ms (3 seconds) is usually enough time for the download to start
    } else {
      console.error("Failed to open the download window.");
    }
  };