import axios from "axios";
axios.defaults.withCredentials = true;

const axiosInstance = (history = null) => {
  const instance = axios.create({
    baseURL: process.env.REACT_APP_BACKEND_URL,
    headers: {
      Authorization: localStorage.getItem("jwtToken"),
    },
    withCredentials: true,
  });

  // instance.interceptors.response.use(
  //   (response) => {
  //     return response;
  //   },
  //   (error) => {
  //     if (!error.response) {
  //       return Promise.reject(error);
  //     }
  //     if (error.response.status === 401) {
  //       localStorage.clear();
  //       if (history) {
  //         history.push("/student/login");
  //       } else {
  //         window.location = "/student/login";
  //       }
  //     } else {
  //       return Promise.reject(error);
  //     }
  //   }
  // );

  // instance.interceptors.request.use(
  //   (request) => {
  //     console.log(request, "request");
  //     return request;
  //   },
  //   (error) => {
  //     return Promise.reject(error);
  //   }
  // );

  return instance;
};

export default axiosInstance;
