export function generateRandomCode(length = 8) {
    const characters = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789';
    let result = '';
    const charactersLength = characters.length;
    
    for (let i = 0; i < length; i++) {
      result += characters.charAt(Math.floor(Math.random() * charactersLength));
    }
    
    return result;
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
      return true; 
    }
    for (const key in obj) {
      if (isEmpty(obj[key])) {
        return true; // Return true if any value is empty
      }
    }
    return false; // Return false if no values are empty
  }