import React, { useState, useEffect } from "react";
import { getIndividualProductDetail } from "../../../actions";
import "./productDetail.css";
import { backGroundLogo } from "../../../assets/IconAssets";
import { Descriptions, Button, Rate } from "antd";
import {
  EditOutlined,
  ShareAltOutlined,
  PrinterOutlined,
  PlusOutlined,
  PlusSquareOutlined,
  MinusSquareOutlined,
  ShoppingCartOutlined,
} from "@ant-design/icons";

const ProductDetails = (props) => {
  //console.log(props.match.params.id);
  const productId = props.match.params.id;

  const [data, setData] = useState([]);
  const [quantity, setQuantity] = useState(1);

  useEffect(() => {
    const callDataApi = async () => {
      const response = await getIndividualProductDetail(productId);
      //  console.log(response.data);
      setData(response.data);
    };

    callDataApi();

    return () => {};
  }, [productId]);

  const onIncreaseQuantityClick = () => {
    setQuantity(quantity + 1);
  };

  const onDecreaseQuantityClick = () => {
    if (quantity <= 1) {
      return;
    }
    setQuantity(quantity - 1);
  };

  return (
    <div style={{ background: "#fff", height: "100vh" }}>
      <div
        style={{
          backgroundImage: `url(${backGroundLogo})`,
          backgroundSize: "100% 100%",
          backgroundRepeat: "no-repeat",
          width: "100%",
          height: "200px",
          display: "flex",
          justifyContent: "center",
          alignItems: "center",
        }}
      >
        <div className="banner__name">{data.name}</div>
      </div>
      <div className="ProductTitle">{data.name}</div>
      <div className="productContainer">
        <div className="productContainer__images">
          <div className="productContainer__imageContainer">
            <div className="productContainer__leftImage">
              <img src={data.productImage} />
            </div>
            <div className="productContainer__rightImage">
              <img src={data.productImage} />
            </div>
          </div>
        </div>
        <div className="productContainer__discription">
          <div></div>
          <Descriptions title="Product Info" bordered>
            <Descriptions.Item label="Price" span={3}>
              {data.is_discount ? (
                <span>
                  <span
                    style={{
                      marginRight: "10px",
                      textDecoration: "line-through",
                      color: "grey",
                      fontSize: "1.2em",
                      fontWeight: 800,
                    }}
                  >
                    Rs {data.price}
                  </span>
                  <span className="product__price__fixed">
                    Rs {data.price - (data.price * data.discount) / 100}
                  </span>
                </span>
              ) : (
                <span className="product__price__fixed">Rs {data.price}</span>
              )}
            </Descriptions.Item>
            <Descriptions.Item
              //label="Qty:"
              className="description__withoutLabel"
              span={3}
            >
              <div style={{ display: "flex", flexWrap: "wrap" }}>
                <div style={{ margin: "auto 20px auto 0px" }}>
                  <div style={{ display: "flex" }}>
                    <div
                      style={{
                        padding: "12px 14px",
                        border: "1px solid black",
                        fontWeight: 900,
                      }}
                    >
                      {quantity}
                    </div>
                    <div>
                      <div style={{ display: "flex", flexFlow: "column" }}>
                        <div>
                          <PlusSquareOutlined
                            onClick={onIncreaseQuantityClick}
                            style={{ fontSize: "25px", color: "#45ab67" }}
                          />
                        </div>
                        <div>
                          <MinusSquareOutlined
                            onClick={onDecreaseQuantityClick}
                            style={{
                              fontSize: "25px",
                              color: "red",
                              cursor:
                                quantity === 1 ? "not-allowed" : "pointer",
                            }}
                          />
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
                <div style={{ margin: "auto 20px auto 0px" }}>
                  <Button style={{ marginLeft: "20px" }} type="danger">
                    <ShoppingCartOutlined /> Add to Cart
                  </Button>
                </div>
              </div>
            </Descriptions.Item>
            <Descriptions.Item label="Review" span={3}>
              <span>
                <Rate allowHalf defaultValue={2.5} />
              </span>
              <span style={{ marginLeft: "20px", cursor: "pointer" }}>
                <EditOutlined style={{ color: "#FF8D37", fontSize: "17px" }} />
                <span style={{ marginLeft: "5px", fontWeight: 700 }}>
                  {" "}
                  Write Review
                </span>
              </span>
            </Descriptions.Item>
            <Descriptions.Item className="description__withoutLabel" span={3}>
              <span style={{ cursor: "pointer" }}>
                <ShareAltOutlined
                  style={{ color: "#FF8D37", fontSize: "17px" }}
                />
                <span style={{ marginLeft: "5px", fontWeight: 700 }}>
                  {" "}
                  Share
                </span>
              </span>
              <span style={{ marginLeft: "20px", cursor: "pointer" }}>
                <PrinterOutlined
                  style={{ color: "#FF8D37", fontSize: "17px" }}
                />
                <span style={{ marginLeft: "5px", fontWeight: 700 }}>
                  {" "}
                  Print
                </span>
              </span>
            </Descriptions.Item>
          </Descriptions>
        </div>
      </div>
    </div>
  );
};

export default ProductDetails;
