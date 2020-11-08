import React, { useState, useEffect } from "react";

import {
  ShoppingCartOutlined,
  CaretDownOutlined,
  MenuOutlined,
  CloseCircleOutlined,
} from "@ant-design/icons";
import { useSelector } from "react-redux";
import { appLogo, logo } from "../../assets/IconAssets";
import ResponsiveMenu from "react-responsive-navbar";
import Dropdown, {
  DropdownToggle,
  DropdownMenu,
  DropdownMenuWrapper,
  MenuItem,
  DropdownButton,
} from "@trendmicro/react-dropdown";
import "@trendmicro/react-buttons/dist/react-buttons.css";
import "@trendmicro/react-dropdown/dist/react-dropdown.css";
import history from "../../history";
import { Badge } from "antd";

const NavbarIndex = (props) => {
  const user = useSelector((state) => state.userAuth);

  // console.log("user", localStorage.getItem("user_type"));
  const [selectedDropdownMenuKey, setSelectedDropdownMenuKey] = useState(null);

  const userType =
    localStorage.getItem("user_type") === null ||
    localStorage.getItem("user_type") === undefined
      ? ""
      : localStorage.getItem("user_type");

  const categoryOptions = [
    {
      category: "Phone",
      key: "phone",
    },
    {
      category: "Vegetable",
      key: "vegetable",
    },
    {
      category: "Electronics",
      key: "electronics",
    },
  ];

  const onCategoryClick = (cat) => {
    let category = cat;
    setSelectedDropdownMenuKey(cat);
    history.push(`/product/category/${category}`);
  };

  const onAdminPageClick = () => {
    history.push("/admin/product");
  };

  return (
    <>
      {/**
    <div
      className="menuBar"
      style={{
        width: "80%",
        display: "flex",
        background: "#fff",
        textAlign: "center",
        margin: "auto",
        padding: "20px 0px 0px 0px",
        // marginLeft: "7%",
      }}
    >
     */}
      <ResponsiveMenu
        menuOpenButton={
          <div className="small-menu-container">
            <div className="menu-brand-name">
              <img className="app__logo__small" src={logo} />
            </div>
            <div>
              <MenuOutlined className="menu-icon-close-open" />{" "}
            </div>
          </div>
        }
        menuCloseButton={
          <div className="small-menu-container">
            <div className="menu-brand-name">
              <img className="app__logo__small" src={logo} />
            </div>

            <div>
              <CloseCircleOutlined className="menu-icon-close-open" />
            </div>
          </div>
        }
        changeMenuOn="768px"
        // largeMenuClassName=""
        // smallMenuClassName=""
        menu={
          <div className="new__navbar__container">
            <div className="logo__container">
              <img className="app__logo" src={logo} />
            </div>
            <div className="menu__container">
              <div className="menu__item hvr-float-shadow">
                <span
                  onClick={() => history.push("/home")}
                  className="menu__name"
                >
                  Home
                </span>
              </div>
              {userType === "admin" ? (
                <div className="menu__item hvr-float-shadow">
                  <span className="menu__name" onClick={onAdminPageClick}>
                    Admin
                  </span>
                </div>
              ) : null}
              <div className="menu__item">
                <Dropdown
                  style={{ border: "none" }}
                  pullRight={false}
                  onSelect={(eventKey) => onCategoryClick(eventKey)}
                >
                  <Dropdown.Toggle
                    noCaret={true}
                    style={{
                      border: "none",
                      background: "transparent",
                      outline: "none",
                      color: "#fff",
                      fontSize: "14px",
                    }}
                  >
                    Select an Category
                    <CaretDownOutlined style={{ color: "#fff" }} />
                  </Dropdown.Toggle>
                  <Dropdown.Menu>
                    {categoryOptions.map((cat) => (
                      <MenuItem
                        active={cat.key === selectedDropdownMenuKey}
                        eventKey={cat.key}
                      >
                        {cat.category}
                      </MenuItem>
                    ))}

                    <MenuItem divider />
                    <MenuItem disabled>
                      Coming Soon...
                      <MenuItem disabled>Food</MenuItem>
                      <MenuItem disabled>Fashion</MenuItem>
                      <MenuItem disabled>
                        Supplements
                        <MenuItem disabled>Protien</MenuItem>
                        <MenuItem disabled>Mass Gainer</MenuItem>
                        <MenuItem disabled>Creatine</MenuItem>
                        <MenuItem disabled>Multivitamins</MenuItem>
                      </MenuItem>
                    </MenuItem>
                  </Dropdown.Menu>
                </Dropdown>
              </div>
            </div>
            <div className="cart__menu__container hvr-float-shadow">
              <Badge dot>
                <ShoppingCartOutlined
                  style={{
                    fontSize: "40px",
                    cursor: "pointer",
                    // marginTop: "10%"
                  }}
                  onClick={() => history.push("/cart")}
                />
              </Badge>
            </div>
          </div>
        }
      />
      {/**.....................logo starts ............................ 
      <div style={{ width: "20%" }}>
        <img src={logo} style={{ width: "100%", objectFit: "contain" }} />
        
      </div>
     
      <div style={{ width: "60%", margin: "auto" }}>
        <Menu mode="horizontal" style={{ borderBottom: "none" }}>
          <Menu.Item onClick={() => history.push("/home")} key="mail">
            <span style={{ color: "#45ab67" }}>Home</span>
          </Menu.Item>

          <SubMenu
            title="Category"
            icon={<CaretDownOutlined style={{ color: "#45ab67" }} />}
          >
            <Menu.ItemGroup
            //title="Item 1"
            >
              {categoryOptions.map((cat, i) => (
                <Menu.Item
                  onClick={() => onCategoryClick(cat.key)}
                  key={cat.key}
                >
                  {cat.category}
                </Menu.Item>
              ))}
            </Menu.ItemGroup>
          </SubMenu>

          {userType === "admin" ? (
            <Menu.Item key="admin" onClick={onAdminPageClick}>
              <span style={{ color: "#45ab67" }}>Admin</span>
            </Menu.Item>
          ) : null}
        </Menu>
      </div>
     
      <div onClick={() => history.push("/cart")} style={{ width: "20%" }}>
        <Badge dot>
          <ShoppingCartOutlined
            style={{
              fontSize: "40px",
              cursor: "pointer",
              // marginTop: "10%"
            }}
          />
        </Badge>
        <span>My Cart</span>
      </div>

       */}
      {/** </div> */}
    </>
  );
};
export default NavbarIndex;
