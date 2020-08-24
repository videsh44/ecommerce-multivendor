import React, { useState } from "react";
import { Layout } from "antd";

import AdminMenu from "./AdminMenu";
import ProductIndex from "./products/ProductIndex";
import NotFound from "../NotFound";

const { Header, Sider, Content } = Layout;

const AdminIndex = () => {
  const userType =
    localStorage.getItem("user_type") === null ||
    localStorage.getItem("user_type") === undefined
      ? ""
      : localStorage.getItem("user_type");

  const [screenType, setScreenType] = useState("product");

  return (
    <>
      <div>
        {userType === "admin" ? (
          <Layout>
            <Sider className="admin-sider" theme="light">
              <AdminMenu setScreenType={setScreenType} />
            </Sider>
            <Content
              className="site-layout-background"
              style={{
                margin: "24px 16px",
                padding: 24,
                minHeight: 280,
              }}
            >
              {screenType === "product" ? (
                <ProductIndex />
              ) : screenType === "order" ? (
                <div>ORDER PAGE</div>
              ) : null}
            </Content>
          </Layout>
        ) : (
          <NotFound status="500" title="500" subTitle="Access Denied" />
        )}
      </div>
    </>
  );
};

export default AdminIndex;
