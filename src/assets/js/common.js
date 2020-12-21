var checkPhone = phone => {
  // 手机号校验
  let reg = /^1([38][0-9]|4[579]|5[0-3,5-9]|6[6]|7[0135678]|9[89])\d{8}$/;
  if (reg.test(phone)) {
    return true;
  } else {
    return false;
  }
};
var checkPassword = password => {
  // 密码校验
  let reg = /^(?![A-Z]+$)(?![a-z]+$)(?!\d+$)(?![\W_]+$)\S{8,20}$/;
  if (reg.test(password)) {
    return true;
  } else {
    return false;
  }
};

var checkIdentity = code => {
  //身份证校验
  var city = {
    11: "北京",
    12: "天津",
    13: "河北",
    14: "山西",
    15: "内蒙古",
    21: "辽宁",
    22: "吉林",
    23: "黑龙江 ",
    31: "上海",
    32: "江苏",
    33: "浙江",
    34: "安徽",
    35: "福建",
    36: "江西",
    37: "山东",
    41: "河南",
    42: "湖北 ",
    43: "湖南",
    44: "广东",
    45: "广西",
    46: "海南",
    50: "重庆",
    51: "四川",
    52: "贵州",
    53: "云南",
    54: "西藏 ",
    61: "陕西",
    62: "甘肃",
    63: "青海",
    64: "宁夏",
    65: "新疆",
    71: "台湾",
    81: "香港",
    82: "澳门",
    91: "国外 "
  };
  var tip = "";
  var pass = true;

  if (
    !code ||
    !/^\d{6}(18|19|20)?\d{2}(0[1-9]|1[012])(0[1-9]|[12]\d|3[01])\d{3}(\d|X)$/i.test(
      code
    )
  ) {
    tip = "身份证号格式错误";
    pass = false;
  } else if (!city[code.substr(0, 2)]) {
    tip = "地址编码错误";
    pass = false;
  } else {
    //18位身份证需要验证最后一位校验位
    if (code.length == 18) {
      code = code.split("");
      //∑(ai×Wi)(mod 11)
      //加权因子
      var factor = [7, 9, 10, 5, 8, 4, 2, 1, 6, 3, 7, 9, 10, 5, 8, 4, 2];
      //校验位
      var parity = [1, 0, "X", 9, 8, 7, 6, 5, 4, 3, 2];
      var sum = 0;
      var ai = 0;
      var wi = 0;
      for (var i = 0; i < 17; i++) {
        ai = code[i];
        wi = factor[i];
        sum += ai * wi;
      }
      var last = parity[sum % 11];
      if (parity[sum % 11] != code[17]) {
        tip = "校验位错误";
        pass = false;
      }
    }
  }
  if (!pass) console.log(tip);
  return pass;
};

var checkBank = bankno => {
  //银行卡校验
  let regex = /^([1-9]{1})(\d{14}|\d{15}|\d{16}|\d{17}|\d{18})$/;
  if (regex.test(bankno)) {
    return true;
  }
  return false;
};
var isphonex = () => {
  let isphoneFale = false;
  window.isMobile = /mobile/i.test(navigator.userAgent);
  var ipx =
    /iphone/gi.test(navigator.userAgent) &&
    screen.height === 812 && screen.width === 375;
  var ipxr =
    /iphone/gi.test(navigator.userAgent) &&
    screen.height === 896 && screen.width === 414;
  if (ipx || ipxr) {
    isphoneFale = true;
  } else {
    isphoneFale = false;
  }
  return isphoneFale;
};

export default {
  checkPhone,
  checkPassword,
  checkIdentity,
  checkBank,
  isphonex
};
