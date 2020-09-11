import React, { useState, useEffect } from "react";
import { getCartData, getCartDelete } from "../../../actions";

import { Button, List, Divider, Popconfirm, message, notification } from "antd";
import { ShoppingCartOutlined, DeleteOutlined } from "@ant-design/icons";
import { useSelector } from "react-redux";
import "./cart.css";
import BackgroundBanner from "../../elements/BackgroundBanner";
import CartServicesBox from "../../elements/CartServicesBox";
import {
  reassuranceThreeLogo,
  reassuranceTwoLogo,
  truckLogo,
} from "../../../assets/IconAssets";

const CartIndex = () => {
  const user = useSelector((state) => state.userAuth);
  const userId = user.userId;

  const [data, setData] = useState([]);
  const [loadAgain, setLoadAgain] = useState(false);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    const callDataApi = async () => {
      //console.log(user.userId);
      const response = await getCartData(userId);
      //  console.log(response.data);
      setData(response.data.cart);
    };

    callDataApi();

    return () => {};
  }, [loadAgain]);

  const onDelete = async (item) => {
    try {
      let selectedId = item._id;
      setLoading(true);
      await getCartDelete(selectedId);
      openNotification();
      setLoading(false);
      setLoadAgain(!loadAgain);
    } catch (error) {
      setLoading(false);
    }
  };

  const openNotification = (selectedProductName) => {
    notification.success({
      message: `Product Deleted from Cart `,

      placement: "topRight",
      top: 150,
    });
  };

  return (
    <div
      style={{
        background: "#fff",
        //  height: "100vh"
      }}
    >
      {/**TOP BACKGROUND IMAGE STARTS */}
      <BackgroundBanner title="cart" />

      {/**TOP BACKGROUND IMAGE ENDS */}

      <div className="cart">
        <div className="cart__left">
          <List
            itemLayout="horizontal"
            loading={loading}
            dataSource={data}
            renderItem={(item) => (
              <List.Item
                actions={[
                  <Popconfirm
                    title="Are you sure you want to delete ?"
                    okText="Yes"
                    cancelText="No"
                    onConfirm={() => onDelete(item)}
                  >
                    <DeleteOutlined
                      style={{ fontSize: "25px", color: "red" }}
                    />
                  </Popconfirm>,
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
                  description={
                    item.product.is_discount ? (
                      <span>
                        Rs{" "}
                        {item.product.price -
                          (item.product.price * item.product.discount) / 100}
                      </span>
                    ) : (
                      <span>Rs {item.product.price}</span>
                    )
                  }
                />

                <div style={{ display: "flex" }}>
                  {/**TOTAL PRICE STARTS */}
                  <div
                    style={{
                      marginRight: "80px",
                      fontSize: "18px",
                      color: "#C64E4E",
                      fontWeight: 800,
                    }}
                  >
                    {item.product.is_discount ? (
                      <span>
                        Rs{" "}
                        {(item.product.price -
                          (item.product.price * item.product.discount) / 100) *
                          item.quantity}
                      </span>
                    ) : (
                      <span>Rs {item.product.price * item.quantity}</span>
                    )}
                  </div>
                  {/**TOTAL PRICE ENDS */}

                  <div
                    style={{
                      marginRight: "30px",
                      fontSize: "18px",
                      fontWeight: 700,
                    }}
                  >
                    {item.quantity}
                  </div>

                  <div>
                    <Button disabled type="primary" shape="round">
                      <ShoppingCartOutlined />
                      Place Order
                    </Button>
                    {/** 
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

                      
                      <div>
                        <PlusSquareOutlined
                          //  onClick={onIncreaseQuantityClick}
                          style={{ fontSize: "30px", color: "#45ab67" }}
                        />
                      </div>

                      
                    </div>
                  */}
                  </div>
                </div>
              </List.Item>
            )}
          />
          <Divider dashed />
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
          <div style={{ marginTop: "30px" }}>
            <CartServicesBox
              logo={truckLogo}
              text="Delivery policy - Edit with Customer reassurance module"
            />
            <CartServicesBox
              logo={reassuranceTwoLogo}
              text="Security Policy - Edit with Customer reassurance module"
            />
            <CartServicesBox
              logo={reassuranceThreeLogo}
              text="Return Policy - Edit with Customer reassurance module"
            />
          </div>
        </div>

        {/** RIGHT SIDE TOTAL/PLACE ORDER SECTION ENDS */}
      </div>
    </div>
  );
};

export default CartIndex;
