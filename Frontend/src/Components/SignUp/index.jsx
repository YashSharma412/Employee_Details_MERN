import React, { useEffect, useState } from "react";
import axios from "axios";
import "./styles.css";
import { useNavigate } from "react-router-dom";
import BASE_URL from "../../URL/BASE_URL";
import { FaEye } from "react-icons/fa";
import { FaEyeSlash } from "react-icons/fa6";

function SignUp() {
  const navigate = useNavigate();
  const [passwordVisible, setpasswordVisible] = useState(false);
  const [userCredentials, setUserCredentials] = useState(() => {
    return {
      name: "",
      email: "",
      username: "",
      password: "",
      cnfPassword: "",
      role: "",
      department: "",
    };
  });
  const [displayMsg, setDisplayMsg] = useState(() => {
    return { msg: "", color: "red" };
  });

  async function validateFormData({ name, email, username, password, cnfPassword, role, department}){
    return new Promise((resolve, reject) =>{
      if (!name.trim()) reject("name is missing");
      if (!username) reject("username is missing");
      if (!email) reject("email is missing");
      if (!password) reject("password is missing");
      if (!cnfPassword) reject("cnfPassword is missing");
      if (!role) reject("role is missing, please set a role");
      if (!department) reject("department is missing, please set your department");
      if (password!== cnfPassword) reject("Passwords do not match");
      resolve()
    })
  }

  async function handleSignUp(event) {
    event.preventDefault();
    try{
      await validateFormData(userCredentials);
    } catch(err){
      setDisplayMsg({ msg: err, color: "red" });
      setTimeout(() => {
        setDisplayMsg({ msg: "", color: "red" });
      }, 2500);
      return;
    }
    console.log(userCredentials);
    try {
      const response =  await axios.post(`${BASE_URL}/api/auth/signup`, {
        name: userCredentials.name,
        email: userCredentials.email,
        username: userCredentials.username,
        password: userCredentials.password,
        role: userCredentials.role,
        department: userCredentials.department,
      })

      console.log(response.data.message)
      setDisplayMsg({ msg: response.data.message + "redirecting to login page! ", color: "green" });
      setTimeout(() => {
        setDisplayMsg({ msg: "", color: "red" });
        navigate("/");
      }, 3500);
      console.log(response.data.data.role)
    } catch (err){
      console.log(err.response.data);
      setDisplayMsg({ msg: err.response.data.message + ", " + err.response.data.error, color: "red" });
      setTimeout(() => {
        setDisplayMsg({ msg: "", color: "red" });
      }, 3500);
    }
    
  }
  function handleRoleChange(event) {
    setUserCredentials({ ...userCredentials, role: event.target.value });
  }

  function handleDepartmentChange(event) {
    setUserCredentials({ ...userCredentials, department: event.target.value });
  }
  return (
    <section className="signUp-container">
      <h1>Sign Up</h1>
      <form style={{position: "relative"}} onSubmit={handleSignUp}>
        <section className="formBody">
          <section className="left">
            <div className="input-container">
              <label htmlFor="email">Enter your name: </label>
              <input
                type="text"
                id="name"
                name="name"
                placeholder="Enter your full name"
                onChange={(e) =>
                  setUserCredentials({
                    ...userCredentials,
                    name: e.target.value,
                  })
                }
                value={userCredentials.name}
              />
            </div>
            <div className="input-container">
              <label htmlFor="email">Enter your email: </label>
              <input
                type="email"
                id="email"
                name="email"
                placeholder="Enter your email id"
                onChange={(e) =>
                  setUserCredentials({
                    ...userCredentials,
                    email: e.target.value.trim(),
                  })
                }
                value={userCredentials.email}
              />
            </div>
            <div>
              <label htmlFor="departmentSelect">
                <span style={{lineHeight: "1.8"}}>Select your department: </span>
                <select
                  value={userCredentials.department}
                  onChange={handleDepartmentChange}
                  style={{marginBottom: "18px"}}
                >
                  <option value="">-- Select --</option>
                  <option value="frontend">Frontend</option>
                  <option value="backend">Backend</option>
                  <option value="full-stack">Full-Stack</option>
                  <option value="hr">HR</option>
                  <option value="designer">Designer</option>
                  <option value="marketing">Marketing</option>
                  <option value="sales">Sales</option>
                </select>
              </label>
            </div>
            <div className="input-container" style={{marginBottom: "18px"}}>
              <label htmlFor="role">
                {" "}
                Select your role in company:
                <div className="roleSelect">
                  <label className="radio_label">
                    <span>Manager </span>
                    <input
                      type="radio"
                      name="role"
                      value={"manager"}
                      onChange={handleRoleChange}
                    />
                  </label>
                  <label className="radio_label">
                    <span>Employee </span>
                    <input
                      type="radio"
                      name="role"
                      value={"employee"}
                      onChange={handleRoleChange}
                    />
                  </label>
                </div>
              </label>
            </div>
          </section>
          <aside>
            <div className="input-container">
              <label htmlFor="username">Enter a username: </label>
              <input
                type="text"
                id="username"
                name="username"
                placeholder="Enter an username"
                onChange={(e) =>
                  setUserCredentials({
                    ...userCredentials,
                    username: e.target.value.trim(),
                  })
                }
                value={userCredentials.username}
              />
            </div>
            <div className="input-container password-container">
              <div className="password__eye_cont" onClick={()=>setpasswordVisible(!passwordVisible)}>
                {
                  passwordVisible ? 
                  <FaEye /> : 
                  <FaEyeSlash />
                }
              </div>
              <label htmlFor="password">Enter a strong Password: </label>
              <input
                type={passwordVisible?"text":"password"}
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
            <div className="input-container password-container">
              <div className="password__eye_cont" onClick={()=>setpasswordVisible(!passwordVisible)}>
                {
                  passwordVisible ? 
                  <FaEye /> : 
                  <FaEyeSlash />
                }
              </div>
              <label htmlFor="cnfPassword">Confirm Password: </label>
              <input
                type={passwordVisible?"text":"password"}
                id="cnfPassword"
                name="cnfPassword"
                placeholder="Re-Enter password"
                onChange={(e) =>
                  setUserCredentials({
                    ...userCredentials,
                    cnfPassword: e.target.value.trim(),
                  })
                }
                value={userCredentials.cnfPassword}
              />
            </div>
          </aside>
        </section>
        <p
          className="msgDisplay"
          style={{
            content: "",
            color: displayMsg.color,
            visibility: displayMsg.msg === "" ? "hidden" : "visible",
          }}
        >
            {displayMsg.msg}
        </p>
        <button className="submitBtn" type="submit">
          Sign Up
        </button>
        <h5>
          Already have an account? {" "}
          <span
            style={{ color: "blue", cursor: "pointer" }}
            onClick={() => navigate("/")}
          >
            Log In!
          </span>
        </h5>
      </form>
    </section>
  );
}

export default SignUp;
