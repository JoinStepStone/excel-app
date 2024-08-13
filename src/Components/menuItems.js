import { useRef, useState } from "react";
import { Link, Switch } from 'react-router-dom';

const MenuItems = ({ title, path }) => {

    const linkClick = useRef(null)
  
    return (
      <div className="border border-dark rounded text-center p-2 m-2 bg-white pointer" onClick={() => linkClick.current.click()}>
        <Link to={path} className="text-dark text-decoration-none" ref={linkClick}>{title}</Link>
      </div>
    );
  };
  
  export default MenuItems;