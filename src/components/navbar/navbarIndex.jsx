import React, { useState, useEffect } from "react";
import { Menu } from 'antd';
import { MailOutlined, AppstoreOutlined, SettingOutlined, ShoppingCartOutlined,CaretDownOutlined } from '@ant-design/icons';

const { SubMenu } = Menu;
const navbarIndex = (props) => {
 const handleClick = e => {
    console.log('click ', e);
    this.setState({ current: e.key });
  };
    return(
    <div className="menuBar" style={{width:"90%", display:'flex', background:'#fff',textAlign:'center',marginLeft: "7%"}}>
    <div className="Logo" style={{width:"10%"}}>
    <img src="https://winmagictoys.com/wp-content/uploads/2018/09/dummy-logo.png" width="80px" alt="logo"/>
    </div>
    <div className="menuItems" style={{width:"80%"}}>
      <Menu onClick={handleClick}  mode="horizontal">
        <Menu.Item key="mail" icon={<MailOutlined />}>
        <a href="#" target="_blank" rel="noopener noreferrer"style={{color: "#45ab67",fontSize:'1.2em'}}>
            Home
          </a>
        </Menu.Item>
        <Menu.Item key="app" >
        <a href="#" target="_blank" rel="noopener noreferrer" style={{color: "#45ab67",fontSize:'1.2em'}}>
            Pages
          </a>
        </Menu.Item>
        <SubMenu  title="Category" icon={<CaretDownOutlined style={{color: "#45ab67",fontSize:'1.2em'}}/>}>
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
          <a href="#" target="_blank" rel="noopener noreferrer" style={{color: "#45ab67",fontSize:'1.2em'}}>
            Daily Deals
          </a>
        </Menu.Item>
      </Menu>
      </div>

     <div className="Logo" style={{width:"10%"}}>
    <ShoppingCartOutlined  style={{fontSize:"40px",marginTop:'10%'}}/>
    <span>My Cart</span>
    </div>
      </div>
    );
  }
export default navbarIndex;