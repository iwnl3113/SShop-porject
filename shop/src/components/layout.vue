<template>
  <el-menu
  background-color="#3d5a80"
  text-color="#fff"
  :router="true"
  style="height:91vh"
  >
    <!-- 一级Menu -->
    <el-sub-menu index="1">
      <template #title>
        <el-icon><FolderOpened /></el-icon>
        <span>账号管理</span>
      </template>
      <!-- 二级Menu -->
      <el-menu-item-group>
        <el-menu-item index="/usersList">账号列表</el-menu-item>
      </el-menu-item-group>
    </el-sub-menu>

    <el-sub-menu index="2">
      <template #title>
        <el-icon><Avatar /></el-icon>
        <span>角色管理</span>
      </template>
      <el-menu-item-group>
        <el-menu-item index="rolesList">角色列表</el-menu-item>
      </el-menu-item-group>
    </el-sub-menu>

    <el-sub-menu index="3">
      <template #title>
        <el-icon><Box /></el-icon>
        <span>商品管理</span>
      </template>
      <el-menu-item-group>
        <el-menu-item index="/goodsList">商品列表</el-menu-item>
      </el-menu-item-group>
    </el-sub-menu>

    <el-sub-menu index="4">
      <template #title>
        <el-icon><DocumentCopy /></el-icon>
        <span>订单管理</span>
      </template>
      <el-menu-item-group>
        <el-menu-item index="4-1">订单列表</el-menu-item>
      </el-menu-item-group>
    </el-sub-menu>

    <el-sub-menu index="5">
      <template #title>
        <el-icon><TrendCharts /></el-icon>
        <span>数据统计</span>
      </template>
      <el-menu-item-group>
        <el-menu-item index="5-1">数据列表</el-menu-item>
      </el-menu-item-group>
    </el-sub-menu>

  </el-menu>
</template>

<script>
export default {

}
</script>