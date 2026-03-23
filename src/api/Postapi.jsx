import axios from "axios";

const api = axios.create({
  baseURL: "https://jsonplaceholder.typicode.com",
});

// get data
export const getData = () => {
  return api.get("/posts");
};

// delete data
export const deleteData = (id) => {
  return api.delete(`/posts/${id}`);
};
