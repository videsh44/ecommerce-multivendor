import crmApi from "../apis";

export const adminLogin = async (formValues) => {
  const response = await crmApi().post("/user/login", formValues);
  return response;
};

export const adminSignup = async (formValues) => {
  const response = await crmApi().post("/user/signup", formValues);
  return response;
};

export const getProductsData = async () => {
  const response = await crmApi().get("/products/");
  return response;
};

export const getCreateNewProduct = async (formValues) => {
  let formData = new FormData();
  formData.append("name", formValues.name);
  // formData.append("description", formValues.description);
  formData.append("price", formValues.price);
  formData.append("category", formValues.category);

  formData.append("is_discount", formValues.is_discount);
  formData.append("productImage", formValues.productImage);
  formData.append("discount", formValues.discount);

  const response = await crmApi().post("/products/", formData);
  return response.data;
};
