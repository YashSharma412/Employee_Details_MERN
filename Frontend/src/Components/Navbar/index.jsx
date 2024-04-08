import React, { useContext, useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";

import "./styles.css";
import { TfiMenu } from "react-icons/tfi";
import BASE_URL from "../../URL/BASE_URL";
import UtillsContext from "../../Context/Utills/UtillsContext";

const Navbar = () => {
  const navigate  = useNavigate()
  const [user, setUser] = useState(()=>getUser());
  const {showSidebar, setShowSidebar} = useContext(UtillsContext);

  async function getUser(){
    try{
      const response = await axios.get(`${BASE_URL}/api/users/getUser`, { withCredentials: true})
      setUser(response.data.data)
    } catch(err){
      console.log(err)
    }
  }

  async function handeLogout() {
    try{
      const response = await axios.get(`${BASE_URL}/api/auth/logout`, { withCredentials: true})
      console.log(response.data)
      if(response.status === 200) {
        alert("user logged out")
        navigate("/");
      }
    } catch (err){
      console.log(err.response.data)
    }
  }

  function handleNavigate(event) {
    console.log(event.target.getAttribute("data-route"));
    navigate(`${event.target.getAttribute("data-route")}`)
    setShowSidebar(false);
  }

  async function handleLogoutFromAll() {
    console.log("Attempting logout from all devices...")
  }

  return (
    <div className="navbar__container">
      <div className="menu__icon" onClick={()=>setShowSidebar(true)}>
          <TfiMenu />
      </div>
      {
        user && 
        <div className="logo">
          {"( "}{user.role}{" )"}, {user.name}
        </div>
      }
      <button onClick={handeLogout} className="logout_btn">
        Logout
      </button>
      {
        showSidebar && 
        <div className="drawer">
          <div className="drawer__menu-btn" onClick={()=>setShowSidebar(false)}>
            <TfiMenu style={{color: "white"}}/>
          </div>
          <ul className="pageLists">
            <li data-route={"departments"} onClick={handleNavigate}>Departments</li>
            <li data-route={"employees"} onClick={handleNavigate}>Employees</li>
            <li onClick={()=>handleLogoutFromAll()}>Logout from all devices</li>
          </ul>
        </div>
      }
    </div>
  );
};

export default Navbar;
