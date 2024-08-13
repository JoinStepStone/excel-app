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
      return true; 
    }
    for (const key in obj) {
      if (isEmpty(obj[key])) {
        return true; // Return true if any value is empty
      }
    }
    return false; // Return false if no values are empty
  }