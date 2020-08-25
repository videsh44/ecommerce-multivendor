import React, { useState, useEffect } from "react";
import { Table, Pagination, Button, Icon, Modal, Card } from "antd";
import { getProductsData } from "../../../actions";
import AddNewProduct from "./AddNewProduct";

const ProductIndex = () => {
  const [productList, setProductList] = useState([]);
  const [loading, setLoading] = useState(false);
  const [createNewModalShow, setCreateNewModalShow] = useState(false);
  const [loadAgain, setLoadAgain] = useState(false);
  // const [offSet, setOffSet] = useState(0);
  // const [count, setCount] = useState(null);
  // const limit = 10;

  useEffect(() => {
    const callApi = async () => {
      try {
        setLoading(true);
        const response = await getProductsData();
        // console.log(response.data.products);
        setProductList(response.data.products);
        setLoading(false);
      } catch (error) {
        setLoading(false);
      }
    };
    callApi();
    return () => {};
  }, [loadAgain]);

  const columnName = [
    {
      title: "Product Name",
      dataIndex: "name",
      key: "name",
      //  width: 150,
      render: (record) => {
        return (
          <div>
            {record === null || record === "" || record === undefined
              ? "-"
              : record}
          </div>
        );
      },
    },
    {
      title: "category",
      dataIndex: "category",
      key: "category",
      // width: 150,
      render: (record) => {
        return (
          <div>
            {record === null || record === "" || record === undefined
              ? "-"
              : record}
          </div>
        );
      },
    },
    {
      title: "Price",
      dataIndex: "price",
      key: "price",
      // width: 100,
      render: (record) => {
        return (
          <div>
            {record === null || record === "" || record === undefined
              ? "-"
              : record}
          </div>
        );
      },
    },
    {
      title: "Discount",
      dataIndex: "discount",
      key: "discount",
      width: 100,
      render: (record) => {
        return (
          <div style={{ textAlign: "center", fontWeight: 800 }}>
            {record === null || record === "" || record === undefined
              ? "-"
              : record}
            %
          </div>
        );
      },
    },

    {
      title: "Actions",
      key: "action",
      render: (record) => (
        <span>
          <span>Actions</span>
        </span>
      ),
    },
  ];

  const createNew = () => {
    setCreateNewModalShow(true);
  };

  return (
    <div>
      <div style={{ textAlign: "right", marginBottom: "40px" }}>
        <Button type="primary" onClick={() => createNew()}>
          <Icon type="plus-circle" /> Add New Product
        </Button>
      </div>
      <div>
        <Table
          loading={loading}
          dataSource={productList}
          pagination={true}
          columns={columnName}
          rowKey={(row) => row._id}
          pagination={false}
        />
      </div>
      {/**
      <div style={{ marginTop: "30px", textAlign: "right" }}>
        <Pagination
          current={(offSet + limit) / limit}
          total={count}
          //onChange={handlePageChange}
        />
      </div>
       */}

      {/* create new modal starts */}
      {createNewModalShow === true ? (
        <Modal
          style={{ minWidth: "600px" }}
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
    </div>
  );
};

export default ProductIndex;
