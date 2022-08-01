import {post,get,put,deleteUser} from './service';

export const loginApi=data=>{
    return post({
        url:"/login",
        data
    })
}

// 获取列表
export const userListApi=(data)=>{
    return get({
        url:"/users",//接口文档地址
        data
    })
}

// post新增用户
export const userAddApi=(data)=>{
    return post({
        url:"/users",
        data
    })
}

// put switchChange
export const switchChangeApi=(data)=>{
    return put({
        // 模板
        url:`users/${data.id}/state/${data.mg_state}`,
        data
    })
}

// 编辑用户
export const userEditChangeApi=(data)=>{
    return put({
        // 模板
        url:`users/${data.id}`,
        data
    })
}

// 删除用户
export const userDelApi=(data)=>{
    return deleteUser({
        // 模板
        url:`users/${data.id}`,
        data
    })
}

// 获取角色列表
export const rolesListApi=(data)=>{
    return get({
        url:"/roles",//接口文档地址
        data
    })
}

// 新建员工
export const newRolesApi=(data)=>{
    return post({
        url:"/roles",//接口文档地址
        data
    })
}

// 编辑员工
export const rolesEditApi=(data)=>{
    return put({
        // 模板
        url:`roles/${data.id}`,
        data
    })
}

// 删除员工
export const rolesDelApi=(data)=>{
    return deleteUser({
        // 模板
        url:`roles/${data.id}`,
        data
    })
}

export const goodsListApi=(data)=>{
    return get({
        url:"/goods",//接口文档地址
        data
    })
}