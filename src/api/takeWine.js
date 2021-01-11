import request from "@/assets/js/request";
let r = request.request
// 我要存酒
export function saveWine(options){
    return new Promise((resolve, reject) => {
        options.url = '/api/v1/alcohol/index';
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
// 获取存酒列表
export function saveWineList(options){
    return new Promise((resolve, reject) => {
        options.url = '/api/v1/product/index';
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
// 获取取酒列表
export function takeWineList(options){
    
    return new Promise((resolve, reject) => {
        options.url = '/api/v1/alcohol/lists';
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
//  取酒
export function takeWine(options){
    return new Promise((resolve, reject) => {
        options.url = '/api/v1/alcohol/get_alcohol';
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
// 存酒记录
export function historySaveWine(options){
    options.url = '/api/v1/alcohol/record';
    return new Promise((resolve, reject) => {
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

// 过期酒水
export function overdueWine(options){
    options.url = '/api/v1/alcohol/expire_list';
    return new Promise((resolve, reject) => {
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