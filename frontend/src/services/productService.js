import api from "./api";

export const getProducts = (limit = 9, offset = 0) => {
  return api.get(`/products?limit=${limit}&offset=${offset}`);
};
