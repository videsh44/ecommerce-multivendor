import crmApi from "../apis";

export const adminLogin = async (formValues) => {
  const response = await crmApi().post("/auth/login", formValues);
  return response;
};

export const getProductsData = async () => {
  const response = await crmApi().get("/products/");
  return response;
};
