import { message } from "antd";
import React, { useState, useEffect } from "react";
import { Link, useNavigate } from "react-router-dom";


const Header = () => {

  const [loginUser, setLoginUser] = useState("");

  const navigate = useNavigate();

  useEffect(() => {
    const user = JSON.parse(localStorage.getItem("user"));
    if (user) {
      setLoginUser(user);
    }
  }, []);


// log out steps--------------------------------------------
  const logoutHandler = () => {
    localStorage.removeItem("user");
    message.success("Logout Successfully");
    navigate("/login");
  };
// log out steps--------------------------------------------

  return (
    <>
      <nav className="navbar navbar-expand-lg bg-light">
        <div className="hContainer">
          <div className="hItemTwo">
              <h1 className="headerFont">Expense Tracker</h1>
          </div>

          <div className="hItemOne">

            <div className="dropdown">
              
              <button className="dropbtn">
                {" "}
                <p>{loginUser && loginUser.name} logged in</p>{" "}
              </button>

              <div className="dropdown-content">
                <button className="btn" onClick={logoutHandler}>
                  Logout
                </button>
              </div>

            </div>
          </div>
        </div>
      </nav>
    </>
  );
};

export default Header;
