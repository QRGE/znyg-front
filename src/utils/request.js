import axios from "axios";
import { Message } from "element-ui";
import { getToken, clearCookies } from "@/utils/auth";
import { MessageBox } from "element-ui";

// create an axios instance
const service = axios.create({
  baseURL: process.env.VUE_APP_BASE_API, // url = base url + request url
  // withCredentials: true, // send cookies when cross-domain requests
  headers: {
    "Content-Type": "application/json;charset=UTF-8",
    // withCredentials 未 true 时不允许 access-control-allow-origin 为 *
    "Access-Control-Allow-Origin": "*",
  },
  timeout: 5000, // request timeout
});

// 错误消息
const error = "发生错误!";

// request interceptor
service.interceptors.request.use(
  (config) => {
    // if (store.getters.token) {} 暂时不懂
    config.headers["X-Access-Token"] = getToken();
    return config;
  },
  (error) => {
    return Promise.reject(error);
  }
);

// 接口响应拦截
service.interceptors.response.use(
  (response) => {
    const res = response.data;
    // 只有 code == 200 是正确的, 其他都是错误的
    if (res.code !== 200) {
      if (res.code == 10006) {
        clearCookies(); // 清除 cookie
        MessageBox.alert("身份校验失败，请重新登录", "提示", {
          confirmButtonText: "确定",
          type: "error",
        }).then(() => {
          window.location.reload();
        });
        return Promise.reject(null);
      } else {
        Message({
          message: res.message || error,
          type: "error",
          duration: 1000,
        });
        return Promise.reject(new Error(res.message || error));
      }
    } else {
      return res;
    }
  },
  (error) => {
    Message({
      title: "警告",
      message: "发生错误!",
      type: "error",
    });
    return Promise.reject(error);
  }
);

export default service;
