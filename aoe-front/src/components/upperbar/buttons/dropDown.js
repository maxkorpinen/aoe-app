import React from "react";
import NewUser from '../login/NewUser'
import LoginForm from '../login/LoginForm'
import './Dropdown.css'

const Dropdown = () => {
  return (
    <div className="flex flex-col dropdown">
      <ul className="flex flex-col dropdown-content">
        <li><LoginForm/></li>
        <li><NewUser/></li>
      </ul>
    </div>
  );
};

export default Dropdown