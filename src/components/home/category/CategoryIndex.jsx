import React, { useState, useEffect } from 'react';
import { getProductsByCategoryData, getAddToCart } from '../../../actions';

import { Empty, notification } from 'antd';
import history from '../../../history';
import './category.css';
import { useDispatch, useSelector } from 'react-redux';
import CommonProduct from '../../elements/CommonProduct';
import SkeletonContainer from '../../../elements/loader/SkeletonContainer';

const CategoryIndex = (props) => {
  const category = props.match.params.category;
  const dispatch = useDispatch();
  const productCategory = useSelector((state) => state.productCategory);

  const user = useSelector((state) => state.userAuth);

  const userId = user.userId;

  const { productData, loading, count } = productCategory;

  const [offSet, setOffSet] = useState(0);

  const limit = 8;

  useEffect(() => {
    if (loading) dispatch(getProductsByCategoryData(limit, offSet, category));

    return () => {};
    // eslint-disable-next-line
  }, [category, loading]);

  const onGoToDetailsClick = (data) => {
    let id = data._id;
    history.push(`/product/${id}`);
  };

  const fetchData = async () => {
    let temp_offset = offSet + limit;
    setOffSet(temp_offset);
    dispatch(getProductsByCategoryData(limit, temp_offset, category));
  };

  const onAddToCartClick = async (data) => {
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
    <div>
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
    </div>
  );
};

export default CategoryIndex;
