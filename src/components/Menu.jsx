import React from 'react';
import { Layout, Menu, Dropdown, Popconfirm, Badge } from 'antd';
import {
  PhoneOutlined,
  MailOutlined,
  UserOutlined,
  ToolOutlined,
  LogoutOutlined,
} from '@ant-design/icons';
import { connect } from 'react-redux';
import { logoutUser } from '../actions/authActions';
import { withCookies } from 'react-cookie';
import NavbarIndex from './navbar/NavbarIndex';
import './App.css';

const MenuIndex = (props) => {
  const { Header, Content, Footer } = Layout;

  const onLogOutUser = () => {
    const { cookies } = props;
    cookies.remove('Authorization', { path: '/' });
    cookies.remove('isSignedIn', { path: '/' });
    cookies.remove('userId', { path: '/' });
    cookies.remove('user_type', { path: '/' });
    cookies.remove('userName', { path: '/' });

    localStorage.removeItem('user_type');

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
      <Layout style={{ background: '#fff' }}>
        <Header
          className="header"
          style={{ position: 'fixed', zIndex: 12345, width: '100%' }}
        >
          <div style={{ display: 'flex' }}>
            <div className="top__bar__info">
              <span>
                <PhoneOutlined className="menu-item-icon" />
                <span className="top-menu-items"> Helpline : 9811346435</span>
              </span>
              <span style={{ marginLeft: '15px' }}>
                <MailOutlined className="menu-item-icon" />
                <span className="top-menu-items">
                  Email : videshghodarop@gmail.com
                </span>
              </span>
            </div>
            <div className="top__right__logout">
              <Dropdown.Button
                className="top__right__logout__btn"
                // style={{ float: "right" }}
                overlay={userMenu}
                placement="bottomCenter"
                icon={<UserOutlined />}
              >
                <Badge color="#87d068" />
                {props.user.userName ? props.user.userName : 'My Account'}
              </Dropdown.Button>
            </div>
          </div>
        </Header>

        <div
          style={{
            //  position: "fixed",
            //  top: "48px",
            marginTop: 48,
            width: '100%',
            background: '#17A2B8',
            color: '#fff',
          }}
        >
          <NavbarIndex />
        </div>

        <Content
          className="site-layout"
          style={{
            // padding: '0 50px',
            background: '#E5EFF4',
          }}
        >
          <div>{props.children}</div>
        </Content>
        <Footer
          style={{ textAlign: 'center', background: '#45AB67', color: '#fff' }}
        >
          videsh gujjar Design ©2020 Created by unprofessional developers
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
