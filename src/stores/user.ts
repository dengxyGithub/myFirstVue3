import { defineStore } from 'pinia'
import router from '@/router'
import { ElLoading } from 'element-plus'
let  loadingInstance:any=null
let userStore = defineStore('User', {
    state: () => {
        return {}
    },
    actions: {
        //模拟登录接口
        userLogin(data: any) {
            if (data.name == 1) {
                loadingInstance = ElLoading.service({ fullscreen: true })
                setTimeout(() => {
                    router.push({name:'layout'})
                    loadingInstance.close()
                }, 2000);
            }
        }
    },
    getters: {
        
    },
    // persist: {
    //     enabled: true // true 表示开启持久化保存
    //   }
})
export default userStore