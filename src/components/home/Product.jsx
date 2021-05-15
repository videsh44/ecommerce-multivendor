import React, { useState, useEffect } from 'react';
import { getProductsData, getAddToCart } from '../../actions';

import { Empty, notification } from 'antd';
import history from '../../history';
import './product.css';
import { useDispatch, useSelector } from 'react-redux';
import CommonProduct from '../elements/CommonProduct';

import SkeletonContainer from '../../elements/loader/SkeletonContainer';

const Product = () => {
  const dispatch = useDispatch();
  const user = useSelector((state) => state.userAuth);
  const products = useSelector((state) => state.products);

  const userId = user.userId;

  const { productData, loading, count } = products;

  const [offSet, setOffSet] = useState(0);
  const limit = 8;

  useEffect(() => {
    if (loading) dispatch(getProductsData(limit, offSet));
    return () => {};
    // eslint-disable-next-line
  }, []);

  const onAddToCartClick = async (data) => {
    // console.log("data", data);
    let selectedProductName = data.name;
    let product_id = data._id;
    let temp_quantity = 1;

    let values = {
      productId: product_id,
      userId: userId,
      quantity: temp_quantity,
    };
    try {
      // eslint-disable-next-line
      const response = await getAddToCart(values);
      openNotification(selectedProductName);
    } catch (error) {}
  };

  const onGoToDetailsClick = (data) => {
    let id = data._id;
    history.push(`/product/${id}`);
  };

  const fetchData = async (pageNumber) => {
    let temp_offset = offSet + limit;
    setOffSet(temp_offset);
    dispatch(getProductsData(limit, temp_offset));
  };

  const openNotification = (selectedProductName) => {
    notification.info({
      message: `Added to Cart `,
      description: `${selectedProductName}`,
      placement: 'topRight',
      top: 150,
    });
  };

  if (loading) {
    return (
      <div
        className="site-card-wrapper"
        style={{ textAlign: 'center', marginTop: '5%' }}
      >
        <SkeletonContainer />
      </div>
    );
  }

  return (
    <>
      <div
        className="site-card-wrapper"
        style={{ textAlign: 'center', marginTop: '5%' }}
      >
        {productData && productData.length > 0 ? (
          <CommonProduct
            data={productData}
            onAddToCartClick={onAddToCartClick}
            onGoToDetailsClick={onGoToDetailsClick}
            offSet={offSet}
            limit={limit}
            fetchData={fetchData}
            count={count}
          />
        ) : (
          <Empty />
        )}
      </div>
    </>
  );
};
export default Product;
