<template>
  <div class="common-layout">
    <el-container>
      <!-- 头部标题栏 -->
      <el-header>
        <img src="../assets/商店.png" alt="">
        <h1>SuperShop后台管理系统</h1>
        <el-button type="danger" class="quit" @click="quit">退出</el-button>
      </el-header>

      <el-container>
        <!-- 侧边栏 -->
        <el-aside>
          <Layout />
        </el-aside>

        <!-- 项目主体 -->
        <el-main>
          <router-view></router-view>
        </el-main>

      </el-container>
    </el-container>

  </div>
</template>

<script>

import Layout from '../components/layout.vue';
import { useStore } from 'vuex'
import { useRouter } from 'vue-router';

export default {
  name: 'HomeView',
  components: {
    Layout
  },
  setup() {
    const store = useStore()
    const router = useRouter()
    const quit = () => {
      localStorage.removeItem("loginData")
      store.commit('setUserInfo', {})
      router.push("/login")
    }
    return {
      quit,
    }
  }

}
</script>

<style lang="less" scoped>
.el-header {
  display: flex;
  align-items: center;
  width: 100vw;
  height: 9vh;
  background-color: #2b2d42;
  h1 {
    display: inline-block;
    color: aliceblue;
  }
  img {
    width: 80px;
    height: 80px;
    float: right;
  }
}
.el-aside {
  width: 13rem;
  height: 100%;
}

.el-main {
  width: 100%;
  height: 91vh;
  background-color: rgba(235, 235, 235, 0.616);
}

.el-container {
  height: auto;
}

.quit {
  position: absolute;
  right: 5%;
}
</style>

