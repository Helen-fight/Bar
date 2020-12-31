export function authorize() {
  // 微信授权登录
  let redirect_uri = encodeURI(window.location.href),
    appid = "wxad9d0975b0193c43";
  let wx_url =
    "https://open.weixin.qq.com/connect/oauth2/authorize?appid=" +
    appid +
    "&redirect_uri=" +
    redirect_uri +
    "&response_type=code&scope=snsapi_userinfo&state=STATE#wechat_redirect";
  window.location.href = wx_url;
}
