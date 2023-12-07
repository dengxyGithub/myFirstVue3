import request from '@/utils/request'
import QS from 'qs'

/**
 * get方法，对应get请求
 * @param {String} url [请求的url地址]
 * @param {Object} params [请求时携带的参数]
 * @param {String} responseType [服务器响应的数据类型， 'arraybuffer', 'blob', 'document', 'json', 'text', 'stream']，默认json
 */
export function get(url, param = {}, responseType = 'json') {
  return new Promise((resolve, reject) => {
    request
      .get(url, {
        params: param,
        responseType: responseType,
        // 用于发送这种格式的请求，url?ids=1&ids=2&id=3
        paramsSerializer: params => {
          return QS.stringify(params, { indices: false })
        }
      })
      .then(res => {
        resolve(res)
      })
      .catch(err => {
        reject(err)
      })
  })
}

/**
 * post方法，对应post请求
 * @param {String} url [请求的url地址]
 * @param {Object} params [请求时携带的参数]
 * @param {Boolean} json [true：json格式请求头；false：FormData格式请求头]
 * @param {Boolean} showLoading [全局 loading 效果]
 */
export function post(url, params = {}, json = false, showLoading = true) {
  // json格式请求头
  const headerJSON = {
    'Content-Type': 'application/json'
  }
  // FormData格式请求头
  const headerFormData = {
    'Content-Type': 'application/x-www-form-urlencoded;charset=UTF-8'
  }
  return new Promise((resolve, reject) => {
    request
      .post(url, json ? JSON.stringify(params) : QS.stringify(params), {
        headers: json ? headerJSON : headerFormData, showLoading
      })
      .then(res => {
        resolve(res)
      })
      .catch(err => {
        reject(err)
      })
  })
}

/**
 * put方法，对应put请求
 * @param {String} url [请求的url地址]
 * @param {Object} params [请求时携带的参数]
 * @param {Boolean} showLoading [全局 loading 效果]
 */
export function put(url, params = {}, json = false, showLoading = true) {
  // json格式请求头
  const headerJSON = {
    'Content-Type': 'application/json'
  }
  // FormData格式请求头
  const headerFormData = {
    'Content-Type': 'application/x-www-form-urlencoded;charset=UTF-8'
  }
  return new Promise((resolve, reject) => {
    request
      .put(url, json ? JSON.stringify(params) : QS.stringify(params), {
        headers: json ? headerJSON : headerFormData, showLoading
      })
      .then(res => {
        resolve(res)
      })
      .catch(err => {
        reject(err)
      })
  })
}

/**
 * del方法，对应Delete请求
 * @param {String} url [请求的url地址]
 * @param {Object} param [请求时携带的参数]
 * @param {Boolean} showLoading [全局 loading 效果]
 */
export function del(url, param = {}, showLoading = true) {
  return new Promise((resolve, reject) => {
    request
      .delete(url, {
        params: param,
        showLoading,
        // 用于发送这种格式的请求，url?ids=1&ids=2&id=3
        paramsSerializer: params => {
          return QS.stringify(params, { indices: false })
        }
      })
      .then(res => {
        resolve(res)
      })
      .catch(err => {
        reject(err)
      })
  })
}
