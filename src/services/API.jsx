import axios from "axios";

const API = axios.create({
  baseURL: "http://localhost:8080/api",
});

export const fetchProducts = () => API.get("/products");
export const fetchProductById = (id) => API.get(`/products/id/${id}`);
