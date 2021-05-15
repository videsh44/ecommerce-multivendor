import { ShoppingCartOutlined } from '@ant-design/icons';
import { Button, Card, Col, Row } from 'antd';
import InfiniteScroll from 'react-infinite-scroll-component';
import React from 'react';
import SkeletonContainer from '../../elements/loader/SkeletonContainer';

const CommonProduct = ({
  data,
  onAddToCartClick,
  onGoToDetailsClick,

  fetchData,
  count,
}) => {
  return (
    <>
      <div>
        <Row gutter={[48, 24]} justify="space-around" style={{ margin: 0 }}>
          <InfiniteScroll
            dataLength={data.length}
            next={fetchData}
            hasMore={data.length < count ? true : false}
            loader={<SkeletonContainer />}
            // endMessage={
            //   <div style={{ textAlign: 'center' }}>
            //     <b>Yay! You have seen it all</b>
            //   </div>
            // }
          >
            {data.map((item, i) => (
              <Col
                span={6}
                xs={24}
                sm={24}
                md={12}
                lg={12}
                xl={6}
                xxl={6}
                key={i}
              >
                <Card
                  className="product__card"
                  bordered={false}
                  style={{ marginTop: '20px' }}
                >
                  {item.is_discount ? (
                    <div className="product__discount__header">
                      {item.discount}%
                    </div>
                  ) : null}
                  <img
                    alt=""
                    style={{
                      maxWidth: '100%',
                      height: '200px',
                    }}
                    src={item.productImage}
                  />
                  <div className="product__name">{item.name}</div>

                  <div
                    className="product__price__container"
                    style={{ marginTop: '3%' }}
                  >
                    {item.is_discount ? (
                      <span>
                        <span className="product__price__fixed">
                          Rs{' '}
                          {Math.round(
                            item.price - (item.price * item.discount) / 100
                          )}
                        </span>
                        <span
                          style={{
                            marginLeft: '4px',
                            textDecoration: 'line-through',
                            color: 'grey',
                          }}
                        >
                          Rs {item.price}
                        </span>
                      </span>
                    ) : (
                      <span className="product__price__fixed">
                        Rs {item.price}
                      </span>
                    )}
                  </div>
                  <div
                    style={{
                      marginTop: '3%',
                      display: 'flex',
                      flexWrap: 'wrap',
                      justifyContent: 'center',
                    }}
                  >
                    <Button
                      type="danger"
                      style={{ marginRight: '10px', marginBottom: '10px' }}
                      onClick={() => onAddToCartClick(item)}
                      //className="addcart"
                    >
                      <ShoppingCartOutlined />
                      Add To Cart
                    </Button>

                    <Button
                      onClick={() => onGoToDetailsClick(item)}
                      type="primary"
                    >
                      Details
                    </Button>
                  </div>
                </Card>
              </Col>
            ))}
          </InfiniteScroll>
        </Row>
      </div>
    </>
  );
};

export default CommonProduct;
