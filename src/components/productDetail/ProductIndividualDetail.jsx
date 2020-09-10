import React, { useState, useEffect } from "react";
import { getProductsData  } from "../../actions";
import { Product  } from "../home/Product";

const ProductIndividualDetail = async ( selected_id) => {
  const productId = props.match.params.id;
    const response = await crmApi().get(
      `/products/${selected_id}/`
    );
    return response;
    console.log(response)

  return (
    <div>
      </div>
  );
};
export default ProductIndividualDetail;
