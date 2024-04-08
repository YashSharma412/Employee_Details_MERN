import React, { useEffect, useState } from "react";
import axios from "axios";
import "./styles.css";
import { TfiMenu } from "react-icons/tfi";
import BASE_URL from "../../URL/BASE_URL";

const Navbar = () => {
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
      <div></div>
    </div>
  );
};

export default Navbar;
