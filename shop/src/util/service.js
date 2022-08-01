import axios from 'axios';
import { ElLoading,ElMessage } from 'element-plus';
import store from '../store/index.js';

// 创建实例
let loadingObj = null
const Service = axios.create({
    timeout: 8000,
    baseURL: "http://127.0.0.1:8888/api/private/v1/",//接口文档
    headers: {
        "Content-type": "application/json;charset=utf-8",
        // token
        "Authorization":store.state.userInfo.userInfo.token
    }
})

// 请求拦截
Service.interceptors.request.use(config => {
    // 使用el-loading加载
    loadingObj = ElLoading.service({
        lock: true,
        text: 'Loading',
        background: 'rgba(0, 0, 0, 0.7)',
    })
    return config
})

// 响应拦截---对返回值做统一处理
Service.interceptors.response.use(response=>{
    loadingObj.close()
    const data = response.data
    if(data.meta.status!=200){
        // 出错
        ElMessage.error(data.meta.msg||"服务器出错")
        return data
    }
    return data
},error=>{
    loadingObj.close()
    ElMessage({
        message:"服务器错误",
        type:"error",
        duration:2000
    })
})


// post
export const post=config=>{
    return Service({
        ...config,
        method:"post",
        data:config.data
    })
}
// get
export const get=config=>{
    return Service({
        ...config,
        method:"get",
        params:config.data
    })
}

export const put=config=>{
    return Service({
        ...config,
        method:"put",
        data:config.data
    })
}

export const deleteUser=config=>{
    return Service({
        ...config,
        method:"delete",
    })
}