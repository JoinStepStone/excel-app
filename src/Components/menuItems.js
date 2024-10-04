import { useRef, useState } from "react";
import { Link, Switch } from 'react-router-dom';

const MenuItems = ({ title, path, icon }) => {

    const linkClick = useRef(null)
  
    return (
      <div className="border border-dark text-center p-2 mt-1 bg-button-color pointer"  onClick={() => linkClick.current.click()}>
        <Link to={path} className="text-dark text-decoration-none bg-button-color" ref={linkClick}>{title} </Link>
        {icon && icon} 
      </div>
    );
  };
  
  export default MenuItems;