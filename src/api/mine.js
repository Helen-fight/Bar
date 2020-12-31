import request from "@/assets/js/request";
let r = request.request

// 用户自动登录
export function login(options) {
    options.url = '/api/v1/user/getUserInfoByCode';
    options.loading = options.loading === false? options.loading : true;
    options.successFn = (res) => {
        resolve(res);
    };
    options.failFn = (res) => {
        reject(res);
    };
    options.errorFn = (res) => {
        reject(res);
    };

    r(options);
}
// 会员卡列表
export function getCard(options){
    return new Promise((resolve, reject) => {
        options.url = '/api/v1/coupon/index';
        options.loading = options.loading === false? options.loading : true;
        options.successFn = (res) => {
            resolve(res);
        };
        options.failFn = (res) => {
            reject(res);
        };
        options.errorFn = (res) => {
            reject(res);
        };

        r(options);
    })
}
// 我的会员卡
export function getMyCard(options){
    return new Promise((resolve, reject) => {
        options.url = '/api/v1/x';
        options.loading = options.loading === false? options.loading : true;
        options.successFn = (res) => {
            resolve(res);
        };
        options.failFn = (res) => {
            reject(res);
        };
        options.errorFn = (res) => {
            reject(res);
        };

        r(options);
    })
}
// 优惠券列表
export function getCoupon(options){
    return new Promise((resolve, reject) => {
        options.url = '/api/v1/coupon/index';
        options.successFn = (res) => {
            resolve(res);
        };
        options.failFn = (res) => {
            reject(res);
        };
        options.errorFn = (res) => {
            reject(res);
        };

        r(options);
    })
}
// 优惠券领取
export function receiveCoupon(options){
    return new Promise((resolve, reject) => {
        options.url = '/api/v1/coupon/receive';
        options.successFn = (res) => {
            resolve(res);
        };
        options.failFn = (res) => {
            reject(res);
        };
        options.errorFn = (res) => {
            reject(res);
        };

        r(options);
    })
}
// 用户优惠券
export function myCoupon(options){
    return new Promise((resolve, reject) => {
        options.url = '/api/v1/coupon/user';
        options.successFn = (res) => {
            resolve(res);
        };
        options.failFn = (res) => {
            reject(res);
        };
        options.errorFn = (res) => {
            reject(res);
        };

        r(options);
    })
}