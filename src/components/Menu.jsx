import React, { useState, useEffect } from "react";
import {
  Layout,
  Menu,
  Dropdown,
  Button,
  message,
  Tooltip,
  Divider,
  Popconfirm,
  Badge,
} from "antd";
import {
  PhoneOutlined,
  MailOutlined,
  UserOutlined,
  ToolOutlined,
  LogoutOutlined,
} from "@ant-design/icons";

import history from "../history";
import { useSelector, useDispatch, connect } from "react-redux";
import { logoutUser } from "../actions/authActions";
import { withCookies } from "react-cookie";
import NavbarIndex from "./navbar/NavbarIndex";

const MenuIndex = (props) => {
  const { Header, Content, Footer } = Layout;
  const dispatch = useDispatch();

  //console.log("props.userAuth", props.user.userName);

  const onLogOutUser = () => {
    const { cookies } = props;
    cookies.remove("Authorization", { path: "/" });
    cookies.remove("isSignedIn", { path: "/" });
    cookies.remove("userId", { path: "/" });
    cookies.remove("userType", { path: "/" });
    cookies.remove("userName", { path: "/" });

    // dispatch(logoutUser());
    props.logoutUser();
  };

  const userMenu = (
    <Menu
    // onClick={handleMenuClick}
    >
      <Menu.Item key="1">
        <ToolOutlined className="menu-item-icon" /> My Account
      </Menu.Item>
      <Menu.Item key="2">
        <Popconfirm
          title="Are you sure you want log out ?"
          okText="Yes"
          cancelText="No"
          onConfirm={onLogOutUser}
        >
          <LogoutOutlined className="menu-item-icon" /> Sign out
        </Popconfirm>
      </Menu.Item>
    </Menu>
  );

  return (
    <div>
      <Layout style={{ background: "#fff" }}>
        <Header
          className="header"
          style={{ position: "fixed", zIndex: 12345, width: "100%" }}
        >
          <div style={{ display: "flex" }}>
            <div style={{ width: "48%" }}>
              <span>
                <PhoneOutlined className="menu-item-icon" />
                <span className="top-menu-items"> Hotline : 1234-567-899</span>
              </span>
              <span style={{ marginLeft: "15px" }}>
                <MailOutlined className="menu-item-icon" />
                <span className="top-menu-items">
                  Email : support@domain.com
                </span>
              </span>
            </div>
            <div style={{ width: "48%" }}>
              <Dropdown.Button
                style={{ float: "right" }}
                overlay={userMenu}
                placement="bottomCenter"
                icon={<UserOutlined />}
              >
                <Badge color="#87d068" />
                {props.user.userName ? props.user.userName : "My Account"}
              </Dropdown.Button>
            </div>
          </div>
        </Header>
        <Header
          style={{
            //  position: "fixed",
            //  top: "48px",
            marginTop: 48,
            width: "100%",
            background: "#FFFFFF",
          }}
        >
          <NavbarIndex />
        </Header>
        <Content
          className="site-layout"
          style={{
            padding: "0 50px",
            marginTop: 48,
            background: "#E5EFF4",
          }}
        >
          <div
            style={{
              height: "100vh",
              //  border: "1px solid red"
            }}
          >
            {props.children}
          </div>
        </Content>
        <Footer
          style={{ textAlign: "center", background: "#45AB67", color: "#fff" }}
        >
          videsh gujjar Design ©2020 Created by unprofessional
          developers(videsh,manish)
        </Footer>
      </Layout>
    </div>
  );
};

//export default MenuIndex;

const mapStateToProps = (state) => {
  return {
    user: state.userAuth,
  };
};

export default withCookies(connect(mapStateToProps, { logoutUser })(MenuIndex));
