<template>
  <div class="userList">
    <!-- 面包屑 -->
    <div class="bx" style="margin-bottom:10px; float:left">
      <el-breadcrumb separator="/">
        <el-breadcrumb-item :to="{ path: '/index' }">首页</el-breadcrumb-item>
        <el-breadcrumb-item :to="{ path :'/rolesList' }">员工列表</el-breadcrumb-item>
      </el-breadcrumb>
    </div>

    <div class="page_content">
      <!-- 表头 -->
      <div class="search_box">
        <el-input v-model="searchParams.query" placeholder="搜索员工关键字" class="input-with-select" width="50px" maxlength="20">
          <template #append>
            <el-button type="primary" @click="searchList">
              <el-icon>
                <Search />
              </el-icon>
            </el-button>
          </template>
        </el-input>
        <el-button type="success" @click="newRoles">新建员工</el-button>
      </div>

      <!-- 表单 -->
      <div>
        <el-table :data="rolesList" border stripe style="width:100%">
          <el-table-column prop="id" label="id" />
          <el-table-column prop="roleName" label="员工名" />
          <el-table-column prop="roleDesc" label="员工描述" />
          <el-table-column label="操作">
            <template #default="scope">
              <el-button type="primary" @click="editBtn(scope.row)" size="small">编辑</el-button>
              <el-button type="danger" @click="delBtn(scope.row)" size="small">删除</el-button>
            </template>
          </el-table-column>
        </el-table>
      </div>
    </div>

    <!-- 新建弹窗 -->
    <el-dialog v-model="dialogFormVisible" title="新建用户" width="35rem">
      <!-- 表单 -->
      <el-form ref="addRolesForm" :model="addRoles" label-position="right" label-width="auto" :rules="rules">
        <el-form-item label="员工名" style="width:100%" prop="roleName">
          <el-input v-model="addRoles.roleName" placeholder="请输入员工名!" maxlength="25" />
        </el-form-item>
        <el-form-item label="描述" prop="roleDesc">
          <el-input v-model="addRoles.roleDesc" placeholder="请输入描述!" maxlength="20" />
        </el-form-item>
      </el-form>

      <template #footer>
        <el-button type="danger" @click="cancelAdd">取消</el-button>
        <el-button type="success" @click="submitForm(addRolesForm)">确认</el-button>
      </template>
    </el-dialog>

    <!-- 编辑弹窗 -->
    <el-dialog v-model="dialogEditVisible" title="编辑用户">
      <!-- 表单 -->
      <el-form ref="rolesEForm" :model="rolesEF" label-position="right" label-width="auto" :rules="rules2">
        <el-form-item label="id" prop="id">
          <el-input v-model="rolesEF.id" disabled />
        </el-form-item>
        <el-form-item label="员工名" prop="roleName">
          <el-input v-model="rolesEF.roleName" placeholder="请输入员工名!" />
        </el-form-item>
        <el-form-item label="员工描述" prop="roleDesc">
          <el-input v-model="rolesEF.roleDesc" placeholder="请输入员工描述!" />
        </el-form-item>
      </el-form>

      <template #footer>
        <el-button type="danger" @click="cancelEdit">取消</el-button>
        <el-button type="success" @click="submitEForm(rolesEForm)">确认</el-button>
      </template>
    </el-dialog>
  </div>
</template>

<script>

import { reactive, toRefs, ref } from 'vue'
import { userDelApi, rolesListApi, newRolesApi, rolesDelApi, rolesEditApi } from '../util/request.js'
import { ElMessage } from 'element-plus'

export default {
  setup(props) {

    const data = reactive({
      rolesList: [],
      pageData: [],
      rolesEF:{
        id:'',
        roleName: '',
        roleDesc: '',
      },
      addRoles: {
        roleName: '',
        roleDesc: '',
      },
      pageData: [],
      searchParams: {
        query: '',
        pagesize: 10,
        pagenum: 1,
      },
      pageData: [],
      dialogFormVisible: false,
      dialogEditVisible: false,
      rules: {
        roleName: [
          { required: true, message: "此处为必填项", trigger: "blur" }
        ],
        roleName: [
          {
            required: true,
            message: "此处为必填项",
            trigger: "blur"
          }
        ],
      },
      rules2: {
        id: [
          { required: true, message: "此处为必填项", trigger: "blur" }
        ],
        roleName: [
          { required: true, message: "此处为必填项", trigger: "blur" }
        ],
        roleName: [
          {
            required: true,
            pattern: "^([\u4e00-\u9fa5]|[.])*$",
            message:'只允许输入汉字和.',
            trigger: "blur"
          }
        ],
      },
    })

    //获取员工列表
    const getRolesList = () => {
      rolesListApi(data.searchParams).then((result) => {
        console.log(result);
        if (result.data) {
          data.rolesList = result.data
          data.pageData = result.data
        }
      }).catch((err) => {
        console.log(err);
      });
    }
    // 搜索列表
    const searchList = () => {
      rolesListApi(data.searchParams).then((result) => {
        console.log(result);
        if (result.data) {
          data.rolesList = result.data.roleName
          console.log(data.rolesList);
        }
      }).catch((err) => {
        console.log(err);
      });
    }


    // 打开新建弹窗
    const newRoles = () => {
      data.dialogFormVisible = true
    }
    const cancelAdd = () => {
      data.dialogFormVisible = false;
    }
    // 获取节点***
    const addRolesForm = ref()
    const submitForm = (addRolesForm) => {
      //validate
      addRolesForm.validate(res => {
        if (!res) {
          return
        }
        // 通过请求接口
        newRolesApi(data.addRoles).then((result) => {
          if (result.data) {
            data.dialogFormVisible = false;
            console.log('post请求通过');
            data.addRoles = {
              rolesName: '',
              rolesDesc: '',
            },
              ElMessage({
                message: '这个是前端新建成功的样式',
                type: 'success',
              })
            getRolesList();
          }
        }).catch((err) => {
          console.log(err);
        });
      })
    }


    // 编辑表单方法
    const rolesEForm = ref()
    const submitEForm = (rolesEForm) => {
      rolesEForm.validate(res => {
        if (!res) {
          return
        }
        // 提交修改
        rolesEditApi(data.rolesEF).then((result) => {
          getRolesList()
          if (result.data) {
            ElMessage({
              message: '编辑成功',
              type: 'success',
            })
            data.dialogEditVisible = false;
          }
        }).catch((err) => {
          ElMessage({
              message: '编辑失败',
              type: 'success',
            })
          console.log(err);
        });
      })
    }

    // 编辑按钮
    const editBtn = (row) => {
      console.log("编辑的那条数据", row)
      data.dialogEditVisible = true;
      const { id,roleName,roleDesc } = row
      data.rolesEF.roleName = roleName
      data.rolesEF.roleDesc = roleDesc
      data.rolesEF.id = id
    }

    const cancelEdit = () => {
      data.dialogEditVisible = false;
    }

    // 删除按钮
    const delBtn = (row) => {
      console.log("删除", row)
      rolesDelApi(row).then((result) => {
        getRolesList()
        if (result.data) {
          ElMessage({
            message: '删除失败',
            type: 'success',
          })
        } else {
          ElMessage({
            message: '删除成功',
            type: 'success',
          })
        }
      })
    }



    // 条数改变触发的函数
    const handleSizeChange = (val) => {
      // 重新给条数赋值
      data.searchParams.pagesize = val;
      getRolesList();
    }

    // 页数改变触发的函数
    const handleCurrentChange = (val) => {
      // 重新赋值
      data.searchParams.pagenum = val;
      getRolesList();
    }



    // 初始化方法
    getRolesList()
    return {
      ...toRefs(data),
      delBtn,
      cancelEdit,
      handleCurrentChange,
      handleSizeChange,
      newRoles,
      submitForm,
      cancelAdd,
      addRolesForm,
      searchList,
      rolesEForm,
      submitEForm,
      editBtn
    }
  }
};
</script>

<style lang="less" scoped>
.userList {
  display: flex;
  flex-wrap: wrap;
}
.page_content {
  width: 100%;
  padding: 10px;
  background: white;
  margin: 5px auto;
  border-radius: 5px;
}

.search_box {
  display: flex;
  margin-bottom: 1rem;
  .el-input {
    width: 30rem;
    margin-right: 20px;
  }
}
.el-table {
  border: 1px solid rgb(207, 207, 207);
  border-radius: 5px;
}
</style>