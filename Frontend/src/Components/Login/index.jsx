import React, { useState, useContext, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import "./styles.css"
import BASE_URL from "../../URL/BASE_URL";
import UserContext from "../../Context/User/UserContext";

function Login() {
  const navigate = useNavigate();
  const {user, setUser} = useContext(UserContext)
  const [userCredentials, setUserCredentials] = useState(() => {
    return {
      loginId: "",
      password: "",
    };
  });
  const [displayMsg, setDisplayMsg] = useState(()=>{
    return {msg: "", color: "red"}
  });
  useEffect(()=>{
    console.log("user logged in: ", user);
  }, [user])

  async function handleLogin(event) {
    event.preventDefault();
    // console.log(userCredentials);
    if(userCredentials.loginId === "") {
      setDisplayMsg({msg: "Please enter a loginId", color: "red"});
      setTimeout(()=>{
        setDisplayMsg({msg: "", color: "red"})
      }, 1200);
      return;
    } else if(userCredentials.password === "") {
      setDisplayMsg({msg: "Please enter a password", color: "red"});
      setTimeout(()=>{
        setDisplayMsg({msg: "", color: "red"})
      }, 1200);
      return;
    }
    
    try {
      const response = await axios.post(`${BASE_URL}/api/auth/login`, {
        loginId: userCredentials.loginId,
        password: userCredentials.password,
      });
      console.log(response.data);
      if(response.status === 200) {
        setDisplayMsg({msg: response.data.msg, color: "green"});
        setTimeout(()=>{
          setDisplayMsg({...displayMsg, msg: ""})
          // navigate to profile page
          setUser(response.data.data)
          navigate("/dashboard");
        }, 700);
        setUserCredentials({loginId: "", password: "",})
      }
    } catch (err) {
      console.log(err.response.data);
      setDisplayMsg({msg: err.response.data.message  + " " +err.response.data.error, color: "red"});
      setTimeout(()=>{
        setDisplayMsg({...displayMsg, msg: ""})
      }, 2500);
    }

  }

  return (
    <section className="signIn-container">
      <h5>Welcome back! 👋</h5>
      <h1>Log in to your account</h1>
      <form onSubmit={handleLogin}>
        <div className="input-container">
          <label htmlFor="email">Your loginId</label>
          <input
            type="text"
            id="loginId"
            name="loginId"
            placeholder="Enter Email or Username"
            onChange={(e) =>
              setUserCredentials({
                ...userCredentials,
                loginId: e.target.value.trim(),
              })
            }
            value={userCredentials.loginId}
          />
        </div>

        <div className="input-container">
          <label htmlFor="password">Your Password</label>
          <input
            type="password"
            id="password"
            name="password"
            placeholder="Enter password"
            onChange={(e) =>
              setUserCredentials({
                ...userCredentials,
                password: e.target.value.trim(),
              })
            }
            value={userCredentials.password}
          />
        </div>
        <p className="msgDisplay" style={{content: "", color: displayMsg.color, visibility: displayMsg.msg === "" ? "hidden":"visible"}}>
          {displayMsg.msg}
        </p>
        <button type="submit">Login</button>
        <h5>Don't have an account yet? <span style={{color: "blue", cursor: "pointer"}} onClick={()=>navigate("/signUp")}>Sign Up !</span></h5>
      </form>
    </section>
  );
}

export default Login;