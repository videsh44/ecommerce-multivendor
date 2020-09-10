import React, { useState, useEffect } from "react";
import { Menu, Badge } from "antd";
import {
  MailOutlined,
  AppstoreOutlined,
  SettingOutlined,
  ShoppingCartOutlined,
  CaretDownOutlined,
} from "@ant-design/icons";
import { useSelector } from "react-redux";
import { appLogo } from "../../assets/IconAssets";
import history from "../../history";

const { SubMenu } = Menu;

const NavbarIndex = (props) => {
  const user = useSelector((state) => state.userAuth);

  // console.log("user", localStorage.getItem("user_type"));

  const userType =
    localStorage.getItem("user_type") === null ||
    localStorage.getItem("user_type") === undefined
      ? ""
      : localStorage.getItem("user_type");

  const onAdminPageClick = () => {
    history.push("/admin/product");
  };

  return (
    <div
      className="menuBar"
      style={{
        width: "80%",
        display: "flex",
        background: "#fff",
        textAlign: "center",
        margin: "auto",
        padding: "20px 0px 0px 0px",
        // marginLeft: "7%",
      }}
    >
      {/**.....................logo starts ............................ */}
      <div style={{ width: "20%" }}>
        <img src={appLogo} style={{ width: "100%", objectFit: "contain" }} />
        {/**  <div className="logo" /> */}
      </div>
      {/**.....................logo ends ............................ */}
      {/**.....................middle menu starts ............................ */}
      <div style={{ width: "60%", margin: "auto" }}>
        <Menu mode="horizontal" style={{ borderBottom: "none" }}>
          <Menu.Item onClick={() => history.push("/home")} key="mail">
            <span style={{ color: "#45ab67" }}>Home</span>
          </Menu.Item>
          <Menu.Item key="app">
            <span style={{ color: "#45ab67" }}>Pages</span>
          </Menu.Item>
          <SubMenu
            title="Category"
            icon={<CaretDownOutlined style={{ color: "#45ab67" }} />}
          >
            <Menu.ItemGroup title="Item 1">
              <Menu.Item key="setting:1">Option 1</Menu.Item>
              <Menu.Item key="setting:2">Option 2</Menu.Item>
            </Menu.ItemGroup>
            <Menu.ItemGroup title="Item 2">
              <Menu.Item key="setting:3">Option 3</Menu.Item>
              <Menu.Item key="setting:4">Option 4</Menu.Item>
            </Menu.ItemGroup>
          </SubMenu>
          <Menu.Item key="alipay">
            <span style={{ color: "#45ab67" }}>Daily Deals</span>
          </Menu.Item>
          {userType === "admin" ? (
            <Menu.Item key="admin" onClick={onAdminPageClick}>
              <span style={{ color: "#45ab67" }}>Admin</span>
            </Menu.Item>
          ) : null}
        </Menu>
      </div>
      {/**.....................middle menu ends ............................ */}

      {/**.....................CART menu starts ............................ */}
      <div style={{ width: "20%" }}>
        <Badge count={5}>
          <ShoppingCartOutlined
            style={{
              fontSize: "40px",
              cursor: "pointer",
              // marginTop: "10%"
            }}
          />
        </Badge>
        <span>My Cart</span>
      </div>

      {/**.....................CART menu ends ............................ */}
    </div>
  );
};
export default NavbarIndex;
