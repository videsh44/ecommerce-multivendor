import axios from "axios";

const crmApi = () => {
  return axios.create({
    baseURL: "http://localhost:8080",
  });
};

export default crmApi;
