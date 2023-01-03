import axios from "axios";
import { 
  Form, 
  Input, 
  message 
} from "antd";
import React, { useState, useEffect } from "react";
import { Link, useNavigate } from "react-router-dom";
import background from "./images/Expense_Tracker.png";
import { 
  UserOutlined,
  RedEnvelopeOutlined, 
  KeyOutlined 
} from '@ant-design/icons';
const Register = () => {

  const navigate = useNavigate();

// Handeling registeration form --------------------------------------------
  const submitHandler = async (values) => {
    try {
      await axios.post("/users/register", values);
      message.success("Registeration Successfull");
      navigate("/login");
    } catch (error) {
      message.info("Pease compete all the fields!!!");
    }
  };
// --------------------------------------------------------------------------

// --------------------------------------------------------------------------
  useEffect(() => {
    if (localStorage.getItem("user")) {
      navigate("/");
    }
  }, [navigate]);
// --------------------------------------------------------------------------

  return (
    <>
      <div style={{ backgroundImage: `url(${background})`, backgroundRepeat: 'no-repeat', height:'100vh',
      marginTop:'-70px', fontSize:'50px', backgroundSize: 'cover', }}   className="resgister-page">
        
        <Form layout="vertical" className="modal-content animate" onFinish={submitHandler}>
          <h1>Register Form</h1>
          
          <Form.Item style={{fontSize:"16px"}}  label="Name" name="name">
            <Input placeholder="Your Name" suffix={<UserOutlined  style={{background: "#E5E4E2", fontSize:"16px", textAlign: "left"}}/>}/>
          </Form.Item>
          
          <Form.Item style={{fontSize:"16px"}}  label="Email" name="email">
            <Input className="input-field" type="email" placeholder="Email Address" suffix={<RedEnvelopeOutlined  style={{background: "#E5E4E2", fontSize:"16px", textAlign: "left"}}/>}/>
          </Form.Item>

          <Form.Item style={{fontSize:"16px"}}  label="Password" name="password">
          <Input className="input-field" type="password" placeholder="Password" suffix={<KeyOutlined style={{background: "#E5E4E2", fontSize:"16px", textAlign: "left"}}/>}/>
          </Form.Item>
          
          <div className="d-flex justify-content-between">
            <Link to="/login"><h9>Already Registered - Click &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp; Here to login</h9></Link>
            <button className="btn btn-warning">Register</button>
          </div>
        
        </Form>
      </div>
    </>
  );
};

export default Register;