import axios from "axios";
import { apiList } from "@/api/list";
// import Cookies from "js-cookie";

// const accessToken = Cookies.get("pics_idea_token");

export const axiosApi = axios.create({
  baseURL: "/api/",
});

// if (accessToken)
//   axiosApi.defaults.headers.common["Authorization"] = `Bearer ${
//     accessToken ?? null
//   }`;

axiosApi.interceptors.response.use(
  (response) => response,
  (error) => Promise.reject(error)
);

const getApi = ({ parameters = [], module = "", action = "" }) => {
  return apiList.common(module)[action].url(...parameters);
};

export async function get(props) {
  const { config = {} } = props;
  return await axiosApi
    .get(getApi(props), { ...config })
    .then((response) => response.data);
}

export async function post(props) {
  const { data, config = {} } = props;
  return await axiosApi
    .post(getApi(props), { ...data }, { ...config })
    .then((response) => response.data);
}

export async function put(props) {
  const { data, config = {} } = props;
  return axiosApi
    .put(getApi(props), { ...data }, { ...config })
    .then((response) => response.data);
}

export async function del(props) {
  const { config = {} } = props;
  return await axiosApi
    .delete(getApi(props), { ...config })
    .then((response) => response.data);
}
