import axios from "axios";


export const axiosInstance = axios.create();

axiosInstance.interceptors.request.use(
  (config) => {
    return config;
  },
  (error) => {
    return Promise.reject(error);
  }
);

axiosInstance.interceptors.response.use(
  (response) => {
    return response;
  },
  (error) => {
    switch (error.config.url) {
      case "/setUser":
        return Promise.resolve('handleSetUserDb(error.config.data)');
    }
  }
);
