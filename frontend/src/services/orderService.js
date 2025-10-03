import api from "./api";

export const placeOrder = (user, cart) => {
  return api.post("/order", { ...user, items: cart });
};
