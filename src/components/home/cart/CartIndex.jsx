import React, { useState, useEffect } from "react";
import { getCartData } from "../../../actions";

import { backGroundLogo } from "../../../assets/IconAssets";
import { Descriptions, Button, Rate, Modal, List, Avatar } from "antd";
import {
  EditOutlined,
  ShareAltOutlined,
  PrinterOutlined,
  PlusOutlined,
  PlusSquareOutlined,
  MinusSquareOutlined,
  ShoppingCartOutlined,
  DeleteOutlined,
} from "@ant-design/icons";
import { useSelector } from "react-redux";
import "./cart.css";

const CartIndex = () => {
  const user = useSelector((state) => state.userAuth);
  const userId = user.userId;

  const [data, setData] = useState([]);
  const [quantity, setQuantity] = useState(1);

  useEffect(() => {
    const callDataApi = async () => {
      //console.log(user.userId);
      const response = await getCartData(userId);
      //  console.log(response.data);
      setData(response.data.cart);
    };

    callDataApi();

    return () => {};
  }, []);

  return (
    <div
      style={{
        background: "#fff",
        //  height: "100vh"
      }}
    >
      {/**TOP BACKGROUND IMAGE STARTS */}
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
        <div className="banner__name">CART</div>
      </div>

      {/**TOP BACKGROUND IMAGE ENDS */}

      <div className="cart">
        <div className="cart__left">
          <List
            itemLayout="horizontal"
            dataSource={data}
            renderItem={(item) => (
              <List.Item
                actions={[
                  <DeleteOutlined style={{ fontSize: "25px", color: "red" }} />,
                ]}
              >
                <List.Item.Meta
                  avatar={
                    <img
                      style={{
                        width: "80px",
                        border: "1px solid black",
                        objectFit: "contain",
                      }}
                      src={item.product.productImage}
                    />
                  }
                  title={
                    <div style={{ fontSize: "18px", fontWeight: 700 }}>
                      {item.product.name}
                    </div>
                  }
                />
                <div style={{ display: "flex" }}>
                  <div
                    style={{
                      marginRight: "80px",
                      fontSize: "18px",
                      fontWeight: 800,
                    }}
                  >
                    {item.product.is_discount ? (
                      <span>
                        Rs{" "}
                        {item.product.price -
                          (item.product.price * item.product.discount) / 100}
                      </span>
                    ) : (
                      <span>Rs {item.product.price}</span>
                    )}
                  </div>

                  <div>
                    <div style={{ display: "flex" }}>
                      <div>
                        <MinusSquareOutlined
                          // onClick={onDecreaseQuantityClick}
                          style={{
                            fontSize: "30px",
                            color: "red",
                            cursor: quantity === 1 ? "not-allowed" : "pointer",
                          }}
                        />
                      </div>
                      <div
                        style={{
                          padding: "2px 20px",
                          border: "1px solid black",
                          fontWeight: 900,
                        }}
                      >
                        {quantity}
                      </div>

                      {/**  <div style={{ display: "flex", flexFlow: "column" }}>  */}
                      <div>
                        <PlusSquareOutlined
                          //  onClick={onIncreaseQuantityClick}
                          style={{ fontSize: "30px", color: "#45ab67" }}
                        />
                      </div>

                      {/** </div> */}
                    </div>
                  </div>
                </div>
              </List.Item>
            )}
          />
        </div>

        {/** RIGHT SIDE TOTAL/PLACE ORDER SECTION STARTS */}
        <div className="cart__right">
          <div
            style={{
              border: "1px solid silver",
              padding: "40px",
              marginTop: "30px",
            }}
          >
            <div
              style={{
                display: "flex",
                justifyContent: "space-evenly",
              }}
            >
              <div className="bold__text">Total : </div>
              <div className="bold__text">Rs 140000</div>
            </div>

            <div style={{ textAlign: "center", marginTop: "30px" }}>
              <Button disabled type="primary" shape="round" size="large">
                <ShoppingCartOutlined />
                Place Order
              </Button>
            </div>
          </div>
        </div>

        {/** RIGHT SIDE TOTAL/PLACE ORDER SECTION ENDS */}
      </div>
    </div>
  );
};

export default CartIndex;
