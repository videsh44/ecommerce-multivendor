import crmApi from "../apis";

export const adminLogin = async (formValues) => {
  const response = await crmApi().post("/auth/login", formValues);
  return response;
};
