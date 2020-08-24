import React from "react";
import { Menu } from "antd";
import {
  AppstoreOutlined,
  ShopOutlined,
  ShoppingOutlined,
} from "@ant-design/icons";

const { SubMenu } = Menu;

const AdminMenu = (props) => {
  return (
    <>
      <div>
        <Menu
          mode="inline"
          // openKeys={this.state.openKeys}
          // onOpenChange={this.onOpenChange}
          style={{ width: 256 }}
        >
          <SubMenu
            key="sub1"
            title={
              <span>
                <ShopOutlined />
                <span>Products</span>
              </span>
            }
          >
            <Menu.Item onClick={() => props.setScreenType("product")} key="1">
              All Products
            </Menu.Item>
          </SubMenu>
          <SubMenu
            key="sub2"
            icon={<AppstoreOutlined />}
            title={
              <span>
                <ShoppingOutlined />
                <span>Orders</span>
              </span>
            }
          >
            <Menu.Item onClick={() => props.setScreenType("order")} key="5">
              All Orders
            </Menu.Item>
          </SubMenu>
        </Menu>
      </div>
    </>
  );
};

export default AdminMenu;
