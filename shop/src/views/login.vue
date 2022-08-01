<template>
  <div class="loginForm">
    <div class="loginBox">

      <el-form ref="formRef" :model="loginData" v-loading="loading" :rules="rules" label-width="auto" style="max-width: 460px">

        <el-form-item prop="username" label="用户名" style="width:100%" class="item">
          <el-input v-model="loginData.username" />
        </el-form-item>
        <el-form-item prop="password" label="密码" class="item">
          <el-input type="password" v-model="loginData.password" />
        </el-form-item>
        <el-form-item>
          <el-button type="primary" @click="userLogin">登录</el-button>
        </el-form-item>
        <el-form-item>
          <el-button type="primary" @click="openFullScreen2">测试</el-button>
        </el-form-item>
      </el-form>

    </div>
  </div>
</template>

<script >
import { reactive, toRefs, ref } from 'vue';
import { useStore } from 'vuex';
import { useRouter } from 'vue-router';
import { loginApi } from '@/util/request.js';
import { ElLoading } from 'element-plus';

export default {
  name: "login",
  setup() {

    const store = useStore()
    const router = useRouter()

    let loginData = ref({
      username: '',
      password: '',
    })

    const rules = ref({
      username: [{
        required: true,
        message: '用户名不能为空!',
        trigger: 'blur',
      }],
      password: [{
        required: true,
        message: '密码不能为空!',
        trigger: 'blur',
      }]
    })


    //登录
    const userLogin = () => {

      const loading = ElLoading.service({
        lock: true,
        text: 'Loading',
        background: 'rgba(0, 0, 0, 0.7)',
      })
      setTimeout(() => {
        let loginData2 = JSON.stringify(loginData.value);//返回对象

        loginApi(loginData2).then((result) => {
          if (result.data) {
            store.commit('setUserInfo', result.data);
            // 存储到本地local 转化为字符串,因为ref 返回的对象是RefImpl 实例对象，通过.value来获取值
            localStorage.setItem("loginData", JSON.stringify(result.data));
            router.push(
              {
                path: "/"
              });
          }
          console.log("登录返回", result);
        }).catch((err) => {
          console.log(err);
        });
        loading.close()
      }, 1000)
    }

    const openFullScreen2 = () => {
      const loading = ElLoading.service({
        lock: true,
        text: 'Loading',
        background: 'rgba(0, 0, 0, 0.7)',
      })
      setTimeout(() => {
        loading.close()
      }, 1000)
    }


    return {
      loginData,
      userLogin,
      rules,
      openFullScreen2,
    }
  }
}

</script>

<style lang="less" scoped>
.loginForm {
  display: flex;
  justify-content: center;
  align-items: center;
  width: 100vw;
  height: 100vh;
  background-image: url("../assets/cropped-1920-1080-1249460.png");
}
.loginBox {
  display: flex;
  justify-content: center;
  align-items: center;
  flex-wrap: wrap;
  position: absolute;
  width: 32rem;
  height: 20rem;
  background-color: rgba(32, 32, 32, 0.788);
  border-radius: 5px;
}
.el-form {
  position: absolute;
  left: 9%;
  width: 25rem;
}

/deep/ .item .el-form-item__label {
  color: rgb(255, 255, 255);
}

.el-button {
  width: 100%;
}
.el-input {
  width: 100%;
}
</style>