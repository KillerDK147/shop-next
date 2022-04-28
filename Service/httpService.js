import axios from "axios";
import { toast } from "react-toastify";

axios.defaults.baseURL = process.env.NEXT_PUBLIC_url;
console.log("process.env.NEXT_PUBLIC_url");
console.log(process.env.NEXT_PUBLIC_url);
axios.interceptors.response.use(null, (error) => {
  const expectedError =
    error.response &&
    error.response.status >= 400 &&
    error.response.status < 500;

  if (!expectedError) {
    toast.error("An unexpected error occurred.");
  }

  return Promise.reject(error);
});

function setJwt(jwt) {
  console.log("setJwt" + jwt);
  if (typeof window !== "undefined") {
    axios.defaults.headers.common["x-auth-token"] = jwt;
  }
}

// eslint-disable-next-line import/no-anonymous-default-export
export default {
  get: axios.get,
  post: axios.post,
  put: axios.put,
  delete: axios.delete,
  setJwt,
};
