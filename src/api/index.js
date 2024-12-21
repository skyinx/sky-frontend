import axios from "axios";
import { apiList } from "@/api/list";
import { toast } from "react-toastify";

export const axiosApi = axios.create({
  baseURL: `${process.env.NEXT_PUBLIC_API_URL}/api/`,
});

const isWindow = typeof window !== "undefined";

export const logout = async () => {
  await axios.post("/api/auth/signout", { token: "" }).then(({ message }) => {
    toast.success(message);
    axiosApi.defaults.headers.common["Authorization"] = undefined;
    localStorage.removeItem("token");
    window.location.replace("/");
  });
};

const token = isWindow ? localStorage.getItem("token") : null;

if (token) {
  axiosApi.defaults.headers.common["Authorization"] = `Bearer ${token}`;
}

axiosApi.interceptors.response.use(
  (response) => response,
  (error) => {
    if (error.status === 401) {
      logout();
    }
    return Promise.reject(error);
  },
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
  const { data = {}, config = {} } = props;
  return await axiosApi
    .post(getApi(props), { ...data }, { ...config })
    .then((response) => response.data)
    .catch(({ response }) => {
      if (response?.data?.message) {
        toast.error(response.data.message);
      }
      return { status: "failure" };
    });
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
