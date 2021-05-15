import { Col, Row } from 'antd';
import React from 'react';
import ProductSkeleton from './ProductCardSkeleton';

const SkeletonContainer = () => {
  const arr = [1, 2, 3, 4];
  return (
    <div>
      <Row gutter={[48, 24]} justify="space-around" style={{ margin: 0 }}>
        {arr.map((item, i) => (
          <Col span={6} xs={24} sm={24} md={12} lg={12} xl={6} xxl={6} key={i}>
            {' '}
            <ProductSkeleton />
          </Col>
        ))}
      </Row>
    </div>
  );
};

export default SkeletonContainer;
