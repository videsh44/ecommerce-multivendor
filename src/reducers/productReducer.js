const initialState = {
  productData: [],
  loading: true,
  count: null,
};

const productReducer = (state = initialState, action) => {
  switch (action.type) {
    case 'GET_PRODUCT_DATA':
      return {
        ...state,
        productData: [...state.productData, ...action.payload.products],
        loading: false,
        count: action.payload.count,
      };
    case 'RELOAD_PRODUCT_DATA_FOR_ADMIN':
      return {
        ...state,
        loading: true,
        productData: [],
        count: null,
      };
    default:
      return state;
  }
};

export default productReducer;
