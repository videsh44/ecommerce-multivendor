import React, { useState, useEffect } from 'react';
import { getProductsByCategoryData, getAddToCart } from '../../../actions';

import { Spin, Empty, notification } from 'antd';
import history from '../../../history';
import './category.css';
import { useSelector } from 'react-redux';
import CommonProduct from '../../elements/CommonProduct';

const CategoryIndex = (props) => {
  const category = props.match.params.category;

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
        const response = await getProductsByCategoryData(
          limit,
          offSet,
          category
        );
        //  console.log(response.data.products);
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
  }, [category]);

  const onGoToDetailsClick = (data) => {
    let id = data._id;
    history.push(`/product/${id}`);
  };

  const handlePageChange = async (pageNumber) => {
    const temp_offset = pageNumber * limit - limit;
    setOffSet(temp_offset);
    setLoading(true);
    try {
      const response = await getProductsByCategoryData(
        limit,
        temp_offset,
        category
      );
      // console.log(response.data.data);
      setData(response.data.products);
      setCount(response.data.count);
      setLoading(false);
    } catch (error) {
      setLoading(false);
    }
  };

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
      // message.success("added to cart");
    } catch (error) {}
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
    <div>
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
    </div>
  );
};

export default CategoryIndex;
