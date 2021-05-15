const initialState = {
  productData: [],
  loading: true,
  count: null,
  selectedCategory: null,
};

const productCategory = (state = initialState, action) => {
  switch (action.type) {
    case 'GET_PRODUCT_DATA_BY_CATEGORY':
      return {
        ...state,
        productData: [...state.productData, ...action.payload.products],
        loading: false,
        count: action.payload.count,
      };
    case 'SELECT_CATEGORY':
      return {
        ...state,
        selectedCategory: action.payload,
        loading: true,
        productData: [],
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

export default productCategory;
