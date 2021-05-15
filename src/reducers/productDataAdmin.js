const initialState = {
  productData: [],
  loading: true,
  count: null,
};

const productDataAdmin = (state = initialState, action) => {
  switch (action.type) {
    case 'GET_PRODUCT_DATA_FOR_ADMIN':
      return {
        ...state,
        productData: action.payload.products,
        loading: false,
        count: action.payload.count,
      };
    case 'RELOAD_PRODUCT_DATA_FOR_ADMIN':
      return {
        ...state,
        loading: true,
      };

    default:
      return state;
  }
};

export default productDataAdmin;
