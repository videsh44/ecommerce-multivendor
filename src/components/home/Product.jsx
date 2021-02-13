import React, { useState, useEffect } from 'react';
import { getProductsData, getAddToCart } from '../../actions';

import { Spin, Empty, notification } from 'antd';
import history from '../../history';
import './product.css';
import { useSelector } from 'react-redux';
import CommonProduct from '../elements/CommonProduct';

const Product = () => {
  const user = useSelector((state) => state.userAuth);

  const userId = user.userId;

  const [loading, setLoading] = useState(false);
  const [data, setData] = useState([]);
  const [offSet, setOffSet] = useState(0);
  const [count, setCount] = useState(null);
  const limit = 8;

  useEffect(() => {
    const callApi = async () => {
      try {
        setLoading(true);
        const response = await getProductsData(limit, offSet);
        setData(response.data.products);
        setCount(response.data.count);
        setLoading(false);
      } catch (error) {
        setLoading(false);
      }
    };
    callApi();
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

  const handlePageChange = async (pageNumber) => {
    const temp_offset = pageNumber * limit - limit;
    setOffSet(temp_offset);
    setLoading(true);
    try {
      const response = await getProductsData(limit, temp_offset);
      setData(response.data.products);
      setCount(response.data.count);
      setLoading(false);
    } catch (error) {
      setLoading(false);
    }
  };

  const openNotification = (selectedProductName) => {
    notification.info({
      message: `Added to Cart `,
      description: `${selectedProductName}`,
      placement: 'topRight',
      top: 150,
    });
  };

  return (
    <>
      <div
        className="site-card-wrapper"
        style={{ textAlign: 'center', marginTop: '5%' }}
      >
        <Spin spinning={loading}>
          {data.length > 0 ? (
            <CommonProduct
              data={data}
              onAddToCartClick={onAddToCartClick}
              onGoToDetailsClick={onGoToDetailsClick}
              offSet={offSet}
              limit={limit}
              handlePageChange={handlePageChange}
              count={count}
            />
          ) : (
            <Empty />
          )}
        </Spin>
      </div>
    </>
  );
};
export default Product;
