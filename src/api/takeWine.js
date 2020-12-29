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

// 我要取酒
export function takeWine(options){
    
    return new Promise((resolve, reject) => {
        options.url = '/api/v1/alcohol/record';
        options.successFn = (res) => {
            resolve(res);
        };
        options.failFn = (res) => {
            reject(res);
        };
        options.errorFn = (res) => {
            reject(res);
        };

        console.log(options);

        r(options);
    })
    
}

// 存酒记录
export function historySaveWine(options){
    options.url = '/api/v1/alcohol/over---';
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
    options.url = '/api/v1/alcohol/lists';
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