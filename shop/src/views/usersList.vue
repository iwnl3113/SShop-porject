<template>
  <div class="userList">
    <!-- 面包屑 -->
    <div class="bx" style="margin-bottom:10px; float:left">
      <el-breadcrumb separator="/">
        <el-breadcrumb-item :to="{ path: '/index' }">首页</el-breadcrumb-item>
        <el-breadcrumb-item><a href="/usersList">账号列表</a></el-breadcrumb-item>
      </el-breadcrumb>
    </div>

    <div class="page_content">
      <!-- 表头 -->
      <div class="search_box">
        <el-input v-model="searchParams.query" placeholder="搜索关键字" class="input-with-select" width="50px" maxlength="20">
          <template #append>
            <el-button type="primary" @click="searchList">
              <el-icon>
                <Search />
              </el-icon>
            </el-button>
          </template>
        </el-input>
        <el-button type="success" @click="openAddUserForm">新建用户</el-button>
      </div>

      <!-- 表单 -->
      <div>
        <el-table :data="userList" stripe style="width:100%">
          <el-table-column prop="create_time" label="创建日期" />
          <el-table-column prop="username" label="用户名" />
          <el-table-column prop="role_name" label="权限" />
          <el-table-column prop="mg_state" label="状态" width="100">
            <template #default="scope">
              <el-switch v-model="scope.row.mg_state" @change="switchChange(scope.row)" />
            </template>
          </el-table-column>
          <el-table-column prop="email" label="邮箱" />
          <el-table-column prop="mobile" label="机号" />
          <el-table-column prop="" label="操作">
            <template #default="scope">
              <el-button type="primary" @click="editBtn(scope.row)" size="small">编辑</el-button>
              <el-button type="danger" @click="delBtn(scope.row)" size="small">删除</el-button>
            </template>
          </el-table-column>
        </el-table>
      </div>
    </div>

    <!-- 新建弹窗 -->
    <el-dialog v-model="dialogFormVisible" title="新建用户">
      <!-- 表单 -->
      <el-form ref="addUserForm" :model="addForm" label-position="right" label-width="auto" :rules="rules">
        <el-form-item label="用户名" style="width:100%" prop="username">
          <el-input v-model="addForm.username" placeholder="请输入用户名!" />
        </el-form-item>
        <el-form-item label="密码" prop="password">
          <el-input v-model="addForm.password" placeholder="请输入密码!" />
        </el-form-item>
        <el-form-item label="手机号" prop="mobile">
          <el-input v-model="addForm.mobile" placeholder="请输入手机号!" />
        </el-form-item>
        <el-form-item label="邮箱地址" prop="email">
          <el-input v-model="addForm.email" placeholder="请输入邮箱!" />
        </el-form-item>
      </el-form>

      <template #footer>
        <el-button type="danger" @click="cancelAdd">取消</el-button>
        <el-button type="success" @click="submitForm(addUserForm)">确认</el-button>
      </template>
    </el-dialog>


    <!-- 编辑弹窗 -->
    <el-dialog v-model="dialogEditVisible" title="编辑用户">
      <!-- 表单 -->
      <!-- 
        | 参数名   | 参数说明 | 备注     
        | username | 用户名称 | 不能为空 
        | password | 用户密码 | 不能为空 
        | email    | 邮箱     | 可以为空 
        | mobile   | 手机号   | 可以为空 
       -->
      <el-form ref="userEForm" :model="userEditForm" label-position="right" label-width="auto" :rules="rules2">
        <el-form-item label="用户名" prop="username">
          <el-input v-model="userEditForm.username" disabled />
        </el-form-item>
        <el-form-item label="手机号" prop="mobile">
          <el-input v-model="userEditForm.mobile" placeholder="请输入手机号!" />
        </el-form-item>
        <el-form-item label="邮箱地址" prop="email">
          <el-input v-model="userEditForm.email" placeholder="请输入邮箱!" />
        </el-form-item>
      </el-form>

      <template #footer>
        <el-button type="danger" @click="cancelEdit">取消</el-button>
        <el-button type="success" @click="submitEForm(userEForm)">确认</el-button>
      </template>
    </el-dialog>


    <!-- 分页器 -->
    <div class="paginations">
      <el-pagination background @size-change="handleSizeChange" @current-change="handleCurrentChange" :current-page="pageData.pagenum" :page-size="pageData.pagesize" :total="pageData.total"
        :page-sizes="[1, 5, 10, 20]" layout="total, sizes, prev, pager, next, jumper">
      </el-pagination>
    </div>
  </div>
</template>

<script>

import { reactive, toRefs, ref } from 'vue'
import { userListApi, userAddApi, switchChangeApi, userEditChangeApi, userDelApi } from '../util/request.js'
import { ElMessage } from 'element-plus'

export default {
  setup(props) {
    const data = reactive({
      // userListApi接口对象
      searchParams: {
        query: '',
        pagesize: 10,
        pagenum: 1,
      },
      pageData: [],
      userList: [],
      // 新建弹窗
      dialogFormVisible: false,
      // 编辑弹窗
      dialogEditVisible: false,
      addForm: {
        username: "",
        password: "",
        email: "",
        mobile: ""
      },
      // 编辑弹窗获取数据
      userEditForm: {
        username: "",
        id: "",
        email: "",
        mobile: ""
      },
      rules: {
        username: [
          { required: true, message: "此处为必填项", trigger: "blur" }
        ],
        password: [
          { required: true, message: "此处为必填项", trigger: "blur" }
        ],
        mobile: [
          {
            required: true,
            pattern: /^1(3[0-9]|4[01456879]|5[0-35-9]|6[2567]|7[0-8]|8[0-9]|9[0-35-9])\d{8}$/,
            message: "请填写正确手机号",
            trigger: "blur"
          }
        ],
        email: [
          {
            required: true,
            pattern: /^([a-zA-Z0-9_-])+@([a-zA-Z0-9_-])+(.[a-zA-Z0-9_-])+/,
            message: "请填写正确邮箱地址",
            trigger: "blur"
          }
        ]
      },
      rules2: {
        mobile: [
          {
            required: true,
            pattern: /^1(3[0-9]|4[01456879]|5[0-35-9]|6[2567]|7[0-8]|8[0-9]|9[0-35-9])\d{8}$/,
            message: "请填写正确手机号",
            trigger: "blur"
          }
        ],
        email: [
          {
            required: true,
            pattern: /^([a-zA-Z0-9_-])+@([a-zA-Z0-9_-])+(.[a-zA-Z0-9_-])+/,
            message: "请填写正确邮箱地址",
            trigger: "blur"
          }
        ]
      },

    })

    const searchList = () => {
      userListApi(data.searchParams).then((result) => {
        console.log(result);
        if (result.data) {
          data.userList = result.data.users
          data.pageData = result.data
        }
      }).catch((err) => {
        console.log(err);
      });
    }

    // 新建用户方法
    const openAddUserForm = () => {
      data.dialogFormVisible = true
    }
    const addUserForm = ref()
    const submitForm = (addUserForm) => {
      //validate
      addUserForm.validate(res => {
        if (!res) {
          return
        }
        // 通过请求接口
        userAddApi(data.addForm).then((result) => {
          if (result.data) {
            data.dialogFormVisible = false;
            console.log('post请求通过');
            data.addForm = {
              username: "",
              password: "",
              email: "",
              mobile: ""
            }
            ElMessage({
              message: '用户新建成功',
              type: 'success',
            })
            searchList();
          }
        }).catch((err) => {

        });
      })
    }
    const cancelAdd = () => {
      data.dialogFormVisible = false;
      data.addForm = {
        username: "",
        password: "",
        email: "",
        mobile: ""
      }
    }
    const cancelEdit = () => {
      data.dialogEditVisible = false;
    }

    // 编辑表单方法
    const userEForm = ref()
    const submitEForm = (userEForm) => {
      userEForm.validate(res => {
        if (!res) {
          return
        }
        // 提交修改
        userEditChangeApi(data.userEditForm).then((result) => {
          if (result.data) {
            ElMessage({
              message: '编辑成功',
              type: 'success',
            })
            searchList()
            data.dialogEditVisible = false;
          }
        }).catch((err) => {

        });
      })
    }

    // 编辑按钮
    const editBtn = (row) => {
      console.log("编辑的那条数据", row)
      data.dialogEditVisible = true;
      const { username, email, mobile, id } = row
      data.userEditForm.username = username
      data.userEditForm.email = email
      data.userEditForm.mobile = mobile
      data.userEditForm.id = id
    }



    // 删除按钮
    const delBtn = (row) => {
      console.log("删除", row)
      userDelApi(row).then((result) => {
        if (result.data) {
        }
        searchList()
        ElMessage({
          message: '删除成功',
          type: 'success',
        })
        searchList()
      })
    }

    // 状态更改
    const switchChange = (row) => {
      switchChangeApi(row).then((result) => {
        if (result.data) {
          searchList()
        }
      })
    }


    // 条数改变触发的函数
    const handleSizeChange = (val) => {
      // 重新给条数赋值
      data.searchParams.pagesize = val;
      searchList();
    }

    // 页数改变触发的函数
    const handleCurrentChange = (val) => {
      // 重新赋值
      data.searchParams.pagenum = val;
      searchList();
    }



    // 初始化方法
    searchList()

    return {
      ...toRefs(data),
      searchList,
      submitForm,
      openAddUserForm,
      cancelAdd,
      addUserForm,
      editBtn,
      delBtn,
      handleCurrentChange,
      handleSizeChange,
      switchChange,
      submitEForm,
      userEForm,
      cancelEdit,
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