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
