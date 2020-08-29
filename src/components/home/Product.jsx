import React, { useState, useEffect } from "react";
import { getProductsData } from "../../actions";

import { Card, Col, Row, Button } from 'antd';
import {
 StarOutlined
} from "@ant-design/icons";

const Product = () => 
{
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

   return(
    <>
    <div className="site-card-wrapper" style={{textAlign:"center", marginTop:'5%'}}>
    <h1>Our Products</h1>
    <Row gutter={16} >
    { data.map((item, i) => (
      <Col span={4} key={i} >
        <Card bordered={false} style={{ marginTop: "20px" }}>
           <img style={{ width: "100%", height:'200px' }} src={item.productImage} />
           <b className="mix">{item.name}</b>
            <div style={{marginTop:'3%'}}>
           <StarOutlined />
           <StarOutlined />
            <StarOutlined />
           <StarOutlined />
           <StarOutlined />
         </div>
      <b style={{marginLeft:'5%',color:'grey'}}>{item.category}</b>
      <div className="price" style={{marginTop:'3%'}}>
      <b>Rs {item.price}</b>
      <b style={{marginLeft:'5%',textDecoration:'line-through',color:'grey'}}>Rs 50</b>
      <br />
      <b style={{marginLeft:'5%',color:'grey'}}>{item.category}</b>
      </div>
      <div style={{marginTop:'3%'}}>
      <Button className="addcart">Add To Cart</Button>
      </div>
      </Card>
      </Col>
      ))}
    </Row>
  </div>

    </>
    );
};
export default Product;
