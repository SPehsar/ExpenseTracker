import { message } from "antd";
import React, { useState, useEffect } from "react";
import { Link, useNavigate } from "react-router-dom";


const Header = () => {

  const [loggedinUser, setLoggedinUser] = useState("");

  const navigate = useNavigate();

  useEffect(() => {
    const user = JSON.parse(localStorage.getItem("user"));
    if (user) {
      setLoggedinUser(user);
    }
  }, []);


// log out steps--------------------------------------------
  const logoutHandler = () => {
    localStorage.removeItem("user");
    message.success("Logout Successfully");
    navigate("/login");
  };
// log out steps--------------------------------------------
function printData()
{
   var divToPrint=document.getElementById("printTable");
   let newWin= window.open("");
   newWin.document.write(divToPrint.outerHTML);
   newWin.print();
   newWin.close();
}



  return (
    <>
      <nav className="headerTopBar">
          <div className="hContainer">
          <div className="hItemTwo">
              <h1 className="headerFont">Expense Tracker</h1>
          </div>

          <div className="hItemOne">

            <div className="dropdown">
              
              <button className="dropbtn">
                {" "}
                <p style={{fontSize:"large"}}>{loggedinUser && loggedinUser.name} logged in</p>{" "}
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
