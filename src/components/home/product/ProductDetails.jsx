import React, { useState, useEffect } from "react";
import { getIndividualProductDetail } from "../../../actions";
import "./productDetail.css";
import { backGroundLogo } from "../../../assets/IconAssets";
import { Descriptions, Button, Rate, Modal } from "antd";
import {
  EditOutlined,
  ShareAltOutlined,
  PrinterOutlined,
  PlusOutlined,
  PlusSquareOutlined,
  MinusSquareOutlined,
  ShoppingCartOutlined,
} from "@ant-design/icons";
import PrintComponent from "./PrintComponent";
import Share from "./Share";
import BackgroundBanner from "../../elements/BackgroundBanner";

const ProductDetails = (props) => {
  //console.log(props.match.params.id);
  const productId = props.match.params.id;

  const [data, setData] = useState([]);
  const [quantity, setQuantity] = useState(1);
  const [shareModalShow, setShareModalShow] = useState(false);

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
    <div
      style={{
        background: "#fff",
        //  height: "100vh"
      }}
    >
      {/**TOP BACKGROUND IMAGE STARTS */}
      <BackgroundBanner title={data.name} />

      {/**TOP BACKGROUND IMAGE ENDS */}

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
            <Descriptions.Item label="Total Price" span={3}>
              {data.is_discount ? (
                <span>
                  <span className="product__price__fixed">
                    Rs{" "}
                    {Math.round(
                      (data.price - (data.price * data.discount) / 100) *
                        quantity
                    )}
                  </span>
                </span>
              ) : (
                <span className="product__price__fixed">
                  Rs {Math.round(data.price * quantity)}
                </span>
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
              <div style={{ display: "flex" }}>
                <div
                  onClick={() => setShareModalShow(true)}
                  style={{ cursor: "pointer" }}
                >
                  <ShareAltOutlined
                    style={{ color: "#FF8D37", fontSize: "17px" }}
                  />
                  <span style={{ marginLeft: "5px", fontWeight: 700 }}>
                    {" "}
                    Share
                  </span>
                </div>
                <div>
                  <PrintComponent
                    trigerItem={
                      <span style={{ marginLeft: "20px", cursor: "pointer" }}>
                        <PrinterOutlined
                          style={{ color: "#FF8D37", fontSize: "17px" }}
                        />
                        <span style={{ marginLeft: "5px", fontWeight: 700 }}>
                          Print
                        </span>
                      </span>
                    }
                  />
                </div>
              </div>
            </Descriptions.Item>
          </Descriptions>
        </div>
      </div>

      {/* SHARE modal starts */}
      {shareModalShow === true ? (
        <Modal
          style={{ minWidth: "600px" }}
          // title="Share"
          closable={false}
          footer={null}
          onCancel={() => setShareModalShow(false)}
          visible={shareModalShow}
          destroyOnClose={true}
        >
          <Share />
        </Modal>
      ) : null}
      {/* SHARE modal end  */}
    </div>
  );
};

export default ProductDetails;
