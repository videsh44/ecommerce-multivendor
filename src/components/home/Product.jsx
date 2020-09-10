import React, { useState, useEffect } from "react";
import { getProductsData } from "../../actions";
import history from "../../history";

import { Card, Col, Row, Button } from "antd";
import { ShoppingCartOutlined } from "@ant-design/icons";
import "./product.css";

const Product = () => {
  const [data, setData] = useState([]);
  const [productId, setProductId] = useState(null);
  const [loading, setLoading] = useState(false);


  useEffect(() => {
    const callApi = async () => {
      const response = await getProductsData();
      setData(response.data.products);
      /*setProductId(selectedProductData._id);*/
    };
    callApi();
    return () => {};
  }, []);

  const onProductDetailClick = (data) => {
    let id = data._id;
     console.log(data);/**/
      history.push(`/product/${id}`)
  }

  return (
    <>
      <div
        className="site-card-wrapper"
        style={{ textAlign: "center", marginTop: "5%" }}
      >
        <h1>Our Products</h1>

        <Row gutter={[48, 24]} justify="space-around" style={{ margin: 0 }}>
          {data.map((item, i) => (
            <Col
              span={6}
              xs={24}
              sm={24}
              md={12}
              lg={12}
              xl={6}
              xxl={6}
              key={i}
            >
              <Card
                hoverable
                className="product__card"
                bordered={false}
                style={{ marginTop: "20px" }}
                
                loading={loading}
              >
                {item.is_discount ? (
                  <div className="product__discount__header">
                    {item.discount}%
                  </div>
                ) : null}
                <img
                  style={{
                    maxWidth: "100%",
                    height: "200px",
                  }}
                  src={item.productImage}
                />
                <div className="product__name" onClick = { () => onProductDetailClick(item)}>{item.name}</div>

                <div
                  className="product__price__container"
                  style={{ marginTop: "3%" }}
                >
                  {item.is_discount ? (
                    <span>
                      <span className="product__price__fixed">
                        Rs {item.price - (item.price * item.discount) / 100}
                      </span>
                      <span
                        style={{
                          marginLeft: "4px",
                          textDecoration: "line-through",
                          color: "grey",
                        }}
                      >
                        Rs {item.price}
                      </span>
                    </span>
                  ) : (
                    <span className="product__price__fixed">
                      Rs {item.price}
                    </span>
                  )}
                </div>
                <div style={{ marginTop: "3%" }}>
                  <Button className="addcart">
                    <ShoppingCartOutlined />
                    Add To Cart
                  </Button>
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
