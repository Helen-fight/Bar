import axios from "axios";
import qs from "qs";
import { authorize } from "@/assets/js/authorize";

if (process.env.NODE_ENV === "production") {
  //设置生产环境域名，开发环境不需要域名
  axios.defaults.baseURL = process.env.API_ROOT;
}
axios.defaults.withCredentials = true;

let request = function(options) {
  if (!options.method) {
    options.method = "post";
  }
  if (options.loading) this.$indicator.open();

  if (!options.header) {
    if (options.method.toLowerCase() == "post") {
      options.header = {
        "Content-Type": "application/x-www-form-urlencoded"
      };
    }
  }
  if (!options.data) options.data = {};
  if (
    window.localStorage.getItem("userInfo") &&
    options.header["Content-Type"] != "multipart/form-data"
  ) {
    let userinfo = JSON.parse(window.localStorage.getItem("userInfo"));
    options.data.userid = userinfo.id;
    options.data.token = userinfo.token;
  }

  if (options.method.toLowerCase() == "get") {
    axios
      .get(options.url, {
        headers: options.header,
        params: options.data
      })
      .then(res => {
        requestOk(res, options, this);
      })
      .catch(error => {
        requestError(error, options, this);
      });
  } else if (options.method.toLowerCase() == "post") {
    if (options.header["Content-Type"] != "multipart/form-data")
      options.data = qs.stringify(options.data);
    axios
      .post(options.url, options.data, {
        headers: options.header
      })
      .then(res => {
        requestOk(res, options, this);
      })
      .catch(error => {
        requestError(error, options, this);
      });
  }
};

function requestOk(res, options, that) {
  if (options.loading) that.$indicator.close();

  if (res.data.code === 1) {
    if (options.successFn && typeof options.successFn == "function") {
      options.successFn(res.data);
    }
  } else {
    console.log(res, "+++++++++获取数据失败！！");
    if (options.failFn && typeof options.failFn == "function") {
      options.failFn(res);
      return false;
    }
    if (res.data.code === -1 || res.data.code === 1002) {
      // -1重新登录，1002token不存在或已过期；重新跳转授权登录
      window.localStorage.removeItem("userInfo");
      authorize();
    } else if (res.data.code === 1005) {
      //账号被封
      window.localStorage.removeItem("userInfo");
      that.$toast(res.data.msg);
    } else {
      that.$toast(res.data.msg);
    }
  }
}

function requestError(error, options, that) {
  if (options.loading) that.$indicator.close();
  if (options.errorFn && typeof options.errorFn == "function")
    options.errorFn();
  //console.log('网络问题请稍后重试')
  if (
    error.message.includes("timeout") ||
    error.message.includes("504") ||
    error.message === "Network Error"
  )
    that.$toast("请求超时，请稍后重试");
}

export default {
  request
};
