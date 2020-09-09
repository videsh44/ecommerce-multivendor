import React, { useState, useEffect } from "react";
import { getProductsData } from "../../actions";

import { Card, Col, Row, Button } from "antd";
import { ShoppingCartOutlined } from "@ant-design/icons";
import history from "../../history";
import "./product.css";

const Product = () => {
  const [data, setData] = useState([]);

  useEffect(() => {
    const callApi = async () => {
      const response = await getProductsData();
      //  console.log(response.data.products);
      setData(response.data.products);
    };
    callApi();
    return () => {};
  }, []);

  const onAddToCartClick = () => {
    console.log("ADD TO CART");
  };

  const onGoToDetailsClick = (data) => {
    let id = data._id;
    history.push(`/product/${id}`);
  };

  return (
    <>
      <div
        className="site-card-wrapper"
        style={{ textAlign: "center", marginTop: "5%" }}
      >
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
                // hoverable
                className="product__card"
                bordered={false}
                style={{ marginTop: "20px" }}
                // onClick={() => console.log("CARD CLICK")}
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
                <div className="product__name">{item.name}</div>

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
                <div
                  style={{
                    marginTop: "3%",
                    display: "flex",
                    flexWrap: "wrap",
                    justifyContent: "center",
                  }}
                >
                  <Button
                    type="danger"
                    style={{ marginRight: "10px" }}
                    onClick={() => onAddToCartClick(item)}
                    //className="addcart"
                  >
                    <ShoppingCartOutlined />
                    Add To Cart
                  </Button>

                  <Button
                    onClick={() => onGoToDetailsClick(item)}
                    type="primary"
                    //  className="addcart"
                  >
                    Details
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
