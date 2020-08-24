import React, { useState, useEffect } from "react";
import { getProductsData } from "../../actions";

const Home = () => {
  const [data, setData] = useState([]);

  useEffect(() => {
    const callApi = async () => {
      const response = await getProductsData();
      console.log(response.data.products);
      setData(response.data.products);
    };
    callApi();
    return () => {};
  }, []);

  return (
    <>
      <h1>Home </h1>
      {/**
      {data.map((item, i) => (
        <div key={i}>
          <img style={{ width: "50px" }} src={item.productImage} />
        </div>
      ))}

         */}
    </>
  );
};

export default Home;
