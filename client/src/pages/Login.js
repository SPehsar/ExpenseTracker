import axios from "axios";
import { Form, Input, message } from "antd";
import React, { useEffect } from "react";
import { Link, useNavigate } from "react-router-dom";
import background from "./images/Expense_Tracker.png";
import { RedEnvelopeOutlined, KeyOutlined } from "@ant-design/icons";

const Login = () => {
  // const [loading, setLoading] = useState(false);
  const navigate = useNavigate();

  // login submit handler ------------------------------------------------
  const submitHandler = async (values) => {
    try {
      const { data } = await axios.post("/users/login", values);

      message.success("login success");
      localStorage.setItem(
        "user",
        JSON.stringify({ ...data.user, password: "" })
      );
      navigate("/");
    } catch (error) {
      message.info("Pease compete all the fields!!!");
    }
  };
  // -------------------------------------------------------------------------

  // -------------------------------------------------------------------------
  useEffect(() => {
    if (localStorage.getItem("user")) {
      navigate("/");
    }
  }, [navigate]);
  // -------------------------------------------------------------------------

  return (
    <>
      {
        <>
          
          <div
            style={{
              backgroundImage: `url(${background})`,
              backgroundRepeat: "no-repeat",
              height: "100vh",
              marginTop: "-70px",
              fontSize: "50px",
              backgroundSize: "cover",
            }}
            className="resgister-page"
          >
            <Form
              layout="vertical"
              className="modal-content animate"
              onFinish={submitHandler}
            >
              <h1>Login Form</h1>

              <Form.Item
                style={{ fontSize: "16px" }}
                label="Email"
                name="email"
              >
                <Input
                  className="input-field"
                  type="email"
                  placeholder="Email Address"
                  suffix={
                    <RedEnvelopeOutlined
                      style={{
                        background: "#E5E4E2",
                        fontSize: "16px",
                        textAlign: "left",
                      }}
                    />
                  }
                />
              </Form.Item>

              <Form.Item
                style={{ fontSize: "16px" }}
                label="Password"
                name="password"
              >
                <Input
                  className="input-field"
                  type="password"
                  placeholder="Password"
                  suffix={
                    <KeyOutlined
                      style={{
                        background: "#E5E4E2",
                        fontSize: "16px",
                        textAlign: "left",
                      }}
                    />
                  }
                />
              </Form.Item>

              <div className="d-flex justify-content-between">
                <Link to="/register">
                  <h9>
                    Not a member - Go&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;
                    &nbsp;ahead&nbsp; &nbsp;&nbsp; to
                    &nbsp;&nbsp;&nbsp;&nbsp;regsiter
                  </h9>
                </Link>
                <button className="btn btn-warning">
                  <h5>Login</h5>
                </button>
              </div>
            </Form>
          </div>
        </>
      }
    </>
  );
};

export default Login;
