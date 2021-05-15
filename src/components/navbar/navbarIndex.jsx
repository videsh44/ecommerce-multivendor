import React, { useState } from 'react';

import {
  ShoppingCartOutlined,
  CaretDownOutlined,
  MenuOutlined,
  CloseCircleOutlined,
} from '@ant-design/icons';

import ResponsiveMenu from 'react-responsive-navbar';
import Dropdown, { MenuItem } from '@trendmicro/react-dropdown';
import '@trendmicro/react-buttons/dist/react-buttons.css';
import '@trendmicro/react-dropdown/dist/react-dropdown.css';
import history from '../../history';
import { Badge } from 'antd';
import { useDispatch, useSelector } from 'react-redux';
import { onSelectCategoryAction } from '../../actions';

const NavbarIndex = () => {
  const dispatch = useDispatch();
  const selectedCategory = useSelector(
    (state) => state.productCategory.selectedCategory
  );
  const [selectedDropdownMenuKey, setSelectedDropdownMenuKey] = useState(null);

  const userType =
    localStorage.getItem('user_type') === null ||
    localStorage.getItem('user_type') === undefined
      ? ''
      : localStorage.getItem('user_type');

  const categoryOptions = [
    {
      category: 'Phone',
      key: 'phone',
    },
    {
      category: 'Vegetable',
      key: 'vegetable',
    },
    {
      category: 'Electronics',
      key: 'electronics',
    },
  ];

  const onCategoryClick = (cat) => {
    if (selectedCategory === cat) {
      setSelectedDropdownMenuKey(cat);
      history.push(`/product/category/${cat}`);
    } else {
      setSelectedDropdownMenuKey(cat);
      dispatch(onSelectCategoryAction(cat));
      history.push(`/product/category/${cat}`);
    }
  };

  const onAdminPageClick = () => {
    history.push('/admin/product');
  };

  return (
    <>
      <ResponsiveMenu
        menuOpenButton={
          <div className="small-menu-container">
            <div className="menu-brand-name">VIDESH G</div>
            <div>
              <MenuOutlined className="menu-icon-close-open" />{' '}
            </div>
          </div>
        }
        menuCloseButton={
          <div className="small-menu-container">
            <div className="menu-brand-name">VIDESH G</div>

            <div>
              <CloseCircleOutlined className="menu-icon-close-open" />
            </div>
          </div>
        }
        changeMenuOn="768px"
        menu={
          <div className="new__navbar__container">
            <div className="logo__container">VIDESH G</div>
            <div className="menu__container">
              <div className="menu__item hvr-float-shadow">
                <span
                  onClick={() => history.push('/home')}
                  className="menu__name"
                >
                  Home
                </span>
              </div>
              {userType === 'admin' ? (
                <div className="menu__item hvr-float-shadow">
                  <span className="menu__name" onClick={onAdminPageClick}>
                    Admin
                  </span>
                </div>
              ) : null}
              <div className="menu__item">
                <Dropdown
                  style={{ border: 'none' }}
                  pullRight={false}
                  onSelect={(eventKey) => onCategoryClick(eventKey)}
                >
                  <Dropdown.Toggle
                    noCaret={true}
                    style={{
                      border: 'none',
                      background: 'transparent',
                      outline: 'none',
                      color: '#fff',
                      fontSize: '14px',
                    }}
                  >
                    Select an Category
                    <CaretDownOutlined style={{ color: '#fff' }} />
                  </Dropdown.Toggle>
                  <Dropdown.Menu>
                    {categoryOptions.map((cat) => (
                      <MenuItem
                        active={cat.key === selectedDropdownMenuKey}
                        eventKey={cat.key}
                        key={cat.key}
                      >
                        {cat.category}
                      </MenuItem>
                    ))}
                  </Dropdown.Menu>
                </Dropdown>
              </div>
            </div>
            <div className="cart__menu__container hvr-float-shadow">
              <Badge dot>
                <ShoppingCartOutlined
                  style={{
                    fontSize: '40px',
                    cursor: 'pointer',
                  }}
                  onClick={() => history.push('/cart')}
                />
              </Badge>
            </div>
          </div>
        }
      />
    </>
  );
};
export default NavbarIndex;
