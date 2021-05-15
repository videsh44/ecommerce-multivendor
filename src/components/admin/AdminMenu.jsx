import React from 'react';
import { Button, Drawer, Menu } from 'antd';
import {
  AppstoreOutlined,
  MenuUnfoldOutlined,
  ShopOutlined,
  ShoppingOutlined,
} from '@ant-design/icons';
import history from '../../history';
import { useState } from 'react';

const AdminMenu = (props) => {
  const [visible, setVisible] = useState(false);

  const showDrawer = () => {
    setVisible(true);
  };

  const onClose = () => {
    setVisible(false);
  };
  return (
    <>
      <div>
        <div style={{ position: 'absolute', top: '20px', left: '20px' }}>
          <Button onClick={showDrawer} type="primary">
            <MenuUnfoldOutlined style={{ fontSize: '20px' }} /> Open Menu
          </Button>
        </div>

        <Drawer
          placement="left"
          closable={false}
          onClose={onClose}
          visible={visible}
          key="left"
        >
          <Menu
            mode="inline"
            // openKeys={this.state.openKeys}
            // onOpenChange={this.onOpenChange}
            style={{ width: 220 }}
          >
            <Menu.Item
              onClick={() => history.push('/admin/product')}
              key="Products"
            >
              <ShopOutlined />
              Products
            </Menu.Item>
            <Menu.Item onClick={() => {}} key="Orders">
              <AppstoreOutlined />
              Orders
            </Menu.Item>

            <Menu.Item onClick={() => history.push('/home')} key="home">
              <ShoppingOutlined />
              Shop
            </Menu.Item>
          </Menu>
        </Drawer>
      </div>
    </>
  );
};

export default AdminMenu;
