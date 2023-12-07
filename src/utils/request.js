import axios from 'axios'
import { ElMessage, Loading } from 'element-plus'
import store from '@/store'
import { getToken } from '@/utils/auth'
import Router from '@/router/index'

// axios接口请求地址--线上环境会根据当前访问的地址作为接口地址
export const baseURL =
  process.env.NODE_ENV === 'production'
    ? document.location.protocol + '//' + document.location.host + '/eoms'
    : ''

// 全局loading实例
let loadingInstance = null

// 是否提示过认证失败，默认没有提示，提示一次之后不再提示
let authFail = false;
// create an axios instance
//报错提示框默认显示
let isMsgHidden = false;
const service = axios.create({
  baseURL: baseURL, // url = base url + request url
  withCredentials: true, // send cookies when cross-domain requests
  timeout: 500000 // request timeout
})

// 请求拦截
service.interceptors.request.use(
  config => {
    // do something before request is sent
    // 除了get请求自己处理loading，其他类型请求默认会使用全局loading
    isMsgHidden = config.isMsgHidden || false;
    if (config.method !== 'get' && config.showLoading) {
      loadingInstance = Loading.service({ fullscreen: true })
    }
    // 用户已登录且已有权限
    const hasToken = getToken();
    if (hasToken) {
      config.headers['access-token'] = hasToken;
    }
    config.params = {
      _t: Date.parse(new Date()) / 1000,
      ...config.params
    }
    return config
  },
  error => {
    // do something with request error
    console.log(error) // for debug
    return Promise.reject(error)
  }
)

// 响应拦截
service.interceptors.response.use(
  /**
   * If you want to get http information such as headers or status
   * Please return  response => response
   */

  /**
   * Determine the request status by custom code
   * Here is just an example
   * You can also judge the status by HTTP Status Code
   */
  response => {
    const res = response.data

    // 关闭全局loading
    setTimeout(() => {
      loadingInstance && loadingInstance.close()
    }, 500)

    // if the custom code is not 0, it is judged as an error.
    if (res.code !== 200 && res.code !== 0 && response.config.url.indexOf('/topology') === -1) {
      console.log('response', response)
      // 认证失败，清除token，跳转登录页
      if (res.code == 401) {
        if (!authFail) {
          authFail = true;
          ElMessage({
            message: res.msg || "Error",
            type: "error",
            duration: 5 * 1000,
            showClose: true,
          });
        }
        store.dispatch('user/resetToken').then(() => {
          setTimeout(() => {
            Router.push({
              path: '/login'
            })
          }, 1000)
        })
      } else {
        if (!isMsgHidden) {
          ElMessage({
            message: res.msg || "Error",
            type: "error",
            duration: 5 * 1000,
            dangerouslyUseHTMLString: true,
            showClose: true,
          });
        }
      }
      return res
    } else {
      console.log('进入return')
      authFail = false;
      return res
    }
  },
  error => {
    console.log('err' + error) // for debug
    if (error.response === undefined) {
      ElMessage({
        message: '网络错误，请稍后再试',
        duration: 5000,
        type: 'error',
        showClose: true
      })
    }
    if (error.response.status) {
      switch (error.response.status) {
        // 401: 未登录
        case 401:
          // 认证失败，跳转登录页，只提示一次
          if (!authFail) {
            authFail = true;
            ElMessage({
              message: '登录过期，请重新登录',
              duration: 5000,
              type: 'warning',
              showClose: true
            })
            setTimeout(() => {
              Router.push({
                path: '/login'
              })
            }, 1000)
          }
          break
        // 403 token过期
        // 登录过期对用户进行提示
        // 清除本地token和清空vuex中token对象
        // 跳转登录页面
        case 403:
          break
        // 404请求不存在
        case 404:
          ElMessage({
            message: '网络请求不存在',
            duration: 5000,
            type: 'error',
            showClose: true
          })
          break
        case 500:
          ElMessage({
            message: '网络错误，请稍后再试',
            duration: 5000,
            type: 'error',
            showClose: true
          })
          break
        // 其他错误，直接抛出错误提示
        default:
          ElMessage({
            message: error,
            duration: 5000,
            type: 'error',
            showClose: true
          })
      }
    } else {
      ElMessage({
        message: error.msg,
        type: 'error',
        duration: 5 * 1000,
        showClose: true,
      })
    }
    // 关闭全局loading
    setTimeout(() => {
      loadingInstance && loadingInstance.close()
    }, 500)
    return Promise.reject(error)
  }
)

export default service
