import React, { useState, useEffect } from 'react';
import {
  Table,
  Pagination,
  Button,
  Modal,
  Popconfirm,
  Divider,
  message,
} from 'antd';
import { getProductDelete, getProductsDataForAdmin } from '../../../actions';
import AddNewProduct from './AddNewProduct';
import EditProduct from './EditProduct';
import { PlusCircleOutlined } from '@ant-design/icons';
import { useDispatch, useSelector } from 'react-redux';

const ProductIndex = () => {
  const dispatch = useDispatch();
  const productDataAdmin = useSelector((state) => state.productDataAdmin);

  const [createNewModalShow, setCreateNewModalShow] = useState(false);
  const [loadAgain, setLoadAgain] = useState(false);
  const [selectedProductData, setSelectedProductData] = useState([]);
  const [editModalShow, setEditModalShow] = useState(false);
  const [offSet, setOffSet] = useState(0);

  const limit = 6;

  const { productData, loading, count } = productDataAdmin;

  useEffect(() => {
    if (loading) dispatch(getProductsDataForAdmin(limit, offSet));

    return () => {};
    // eslint-disable-next-line
  }, [loading]);

  const columnName = [
    {
      title: 'Product Name',
      dataIndex: 'name',
      key: 'name',
      //  width: 150,
      render: (record) => {
        return (
          <div>
            {record === null || record === '' || record === undefined
              ? '-'
              : record}
          </div>
        );
      },
    },
    {
      title: 'category',
      dataIndex: 'category',
      key: 'category',
      // width: 150,
      render: (record) => {
        return (
          <div>
            {record === null || record === '' || record === undefined
              ? '-'
              : record}
          </div>
        );
      },
    },
    {
      title: 'Price',
      dataIndex: 'price',
      key: 'price',
      // width: 100,
      render: (record) => {
        return (
          <div>
            {record === null || record === '' || record === undefined
              ? '-'
              : record}
          </div>
        );
      },
    },
    {
      title: 'Discount',
      dataIndex: 'discount',
      key: 'discount',
      width: 100,
      render: (record) => {
        return (
          <div style={{ textAlign: 'center', fontWeight: 800 }}>
            {record === null || record === '' || record === undefined
              ? '-'
              : record}
            %
          </div>
        );
      },
    },

    {
      title: 'Actions',
      key: 'action',
      render: (record) => (
        <span>
          <span>
            <Popconfirm
              title="Are you sure you want to delete ?"
              okText="Yes"
              cancelText="No"
              onConfirm={() => onDelete(record)}
            >
              <Button
                type="link"
                style={{
                  color: 'red',
                  padding: 0,
                  marginRight: '10px',
                }}
              >
                Delete
              </Button>
            </Popconfirm>
            <Divider type="vertical" />
          </span>
          <span>
            <Button
              type="link"
              onClick={() => onEdit(record)}
              style={{ padding: 0, marginRight: '10px' }}
            >
              Update
            </Button>
          </span>
        </span>
      ),
    },
  ];

  const createNew = () => {
    setCreateNewModalShow(true);
  };

  const onEdit = (data) => {
    setSelectedProductData(data);
    setEditModalShow(true);
  };

  const onDelete = (item) => {
    try {
      let selectedId = item._id;

      dispatch(getProductDelete(selectedId));
      message.success('Product Deleted');
    } catch (error) {}
  };

  const handlePageChange = async (pageNumber) => {
    const temp_offset = pageNumber * limit - limit;
    setOffSet(temp_offset);
    dispatch(getProductsDataForAdmin(limit, temp_offset));
  };

  return (
    <div>
      <div style={{ textAlign: 'right', marginBottom: '40px' }}>
        <Button type="primary" onClick={() => createNew()}>
          <PlusCircleOutlined /> Add New Product
        </Button>
      </div>
      <div>
        <Table
          loading={loading}
          dataSource={productData}
          columns={columnName}
          pagination={false}
          scroll={{ x: 1300 }}
          rowKey={(row) => row._id}
        />
      </div>

      <div style={{ marginTop: '30px', textAlign: 'right' }}>
        <Pagination
          current={(offSet + limit) / limit}
          pageSize={limit}
          onChange={handlePageChange}
          total={count}
        />
      </div>

      {/* create new modal starts */}
      {createNewModalShow === true ? (
        <Modal
          style={{ minWidth: '600px' }}
          title="Add New Product"
          closable={true}
          footer={null}
          onCancel={() => setCreateNewModalShow(false)}
          visible={createNewModalShow}
          destroyOnClose={true}
        >
          <AddNewProduct
            setCreateNewModalShow={setCreateNewModalShow}
            setLoadAgain={setLoadAgain}
            loadAgain={loadAgain}
          />
        </Modal>
      ) : null}
      {/* create new modal end  */}

      {/*EDIT MODAL STARTS */}
      {editModalShow === true ? (
        <Modal
          style={{ minWidth: '700px' }}
          title="Edit Product"
          closable={true}
          footer={null}
          onCancel={() => setEditModalShow(false)}
          visible={editModalShow}
          destroyOnClose={true}
        >
          <EditProduct
            setEditModalShow={setEditModalShow}
            selectedProductData={selectedProductData}
            setLoadAgain={setLoadAgain}
            loadAgain={loadAgain}
          />
        </Modal>
      ) : null}

      {/*EDIT MODAL ENDS */}
    </div>
  );
};

export default ProductIndex;
