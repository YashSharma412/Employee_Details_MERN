import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";

import "./styles.css";
import { TfiMenu } from "react-icons/tfi";
import BASE_URL from "../../URL/BASE_URL";

const Navbar = () => {
  const navigate  = useNavigate()
  const [user, setUser] = useState(()=>getUser());
  // useEffect(()=>{
  //   getUser()
  // }, [user])

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


  return (
    <div className="navbar__container">
      <div className="menu__icon">
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
    </div>
  );
};

export default Navbar;
