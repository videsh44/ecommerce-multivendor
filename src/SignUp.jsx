import React, { useState, useEffect } from "react";
import { message, Icon, Input, Button } from "antd";
import { adminLogin } from "../src/actions";
import history from "./history";

import "antd/dist/antd.css";

const SignUp = (props) => {
  const [userName, setUserName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  return(
     <div>
      <div style={{ textAlign: "center" }}>
                <img src="https://cdn.onlinewebfonts.com/svg/img_511289.png" width="100px"/>
              </div>
              <div style={{ margin: "30px" }}>
                <label>Username</label>
                <Input
                  /*onChange={onUserNameChange}*/
                  prefix={
                    <Icon type="user" style={{ color: "rgba(0,0,0,.25)" }} />
                  }
                  placeholder="username "
                />
              </div>
              <div style={{ margin: "30px" }}>
                <label>Email Address</label>
                <Input
                  /*onChange={onUserNameChange}*/
                  prefix={
                    <Icon type="user" style={{ color: "rgba(0,0,0,.25)" }} />
                  }
                  placeholder="Email Address "
                />
              </div>
              <div style={{ margin: "30px" }}>
                <label>Password</label>
                <Input
                  /*onChange={onPassChange}*/
                  prefix={
                    <Icon type="lock" style={{ color: "rgba(0,0,0,.25)" }} />
                  }
                  type="password"
                  placeholder="Password"
                />
              </div>
              <div style={{ textAlign: "center" }}>
                <Button
                 /* onClick={handleLogin}*/
                  type="primary"
                  className="login-form-button"
                 
                >
                  <Icon type="login" />
                  Log in
                </Button>
              </div>
              <div style={{ textAlign: "center", marginTop: "40px", fontSize:'16px'}}>
              <span style={{textAlign:'center', marginTop: "40px"}}><h6>OR</h6></span>
              </div>
            </div>
  );
}
export default SignUp;

