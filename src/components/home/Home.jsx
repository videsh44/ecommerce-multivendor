import React, { useState, useEffect } from "react";
import { getProductsData } from "../../actions";
import { Row, Col } from "antd";

import SideBar from "./SideBar";
import Banner from "./Banner";
import Deal from "./Deal";

const Home = () => {
  const [data, setData] = useState([]);

  useEffect(() => {
    const callApi = async () => {
      const response = await getProductsData();
      console.log(response.data.products);
      setData(response.data.products);
    };
    callApi();
    return () => {};
  }, []);

  return (
    <>
      <Row
        style={{ margin: 0 }}
        gutter={24}
        // justify="center"
      >
        <Col span={1}></Col>
        <Col span={5}>
          <SideBar />
        </Col>
        <Col span={10}>
          <Banner />
        </Col>
        <Col span={6}>
          <Deal />
        </Col>
        <Col span={1}></Col>
      </Row>
      {/**
      <Row justify="center">
        <Col xs={24} sm={24} md={1} lg={1} xl={1}></Col>
        <Col xs={24} sm={24} md={3} lg={3} xl={3}>
          <SideBar />
        </Col>
        <Col xs={24} sm={24} md={14} lg={14} xl={14}>
          <Banner />
        </Col>
        <Col xs={24} sm={24} md={5} lg={5} xl={5}>
          <Deal />
        </Col>
        <Col xs={24} sm={24} md={1} lg={1} xl={1}></Col>
      </Row>
       */}
    </>
  );
};

export default Home;
