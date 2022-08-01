<template>
  <div class="goodsList">
    <!-- 面包屑 -->
    <div class="bx" style="margin-bottom:10px; float:left">
      <el-breadcrumb separator="/">
        <el-breadcrumb-item :to="{ path: '/index' }">首页</el-breadcrumb-item>
        <el-breadcrumb-item :to="{ path :'/rolesList' }">商品列表</el-breadcrumb-item>
      </el-breadcrumb>
    </div>

    <div class="page_content">
      <!-- 表头 -->
      <div class="search_box">
        <el-input v-model="searchParams.query" placeholder="搜索商品关键字" class="input-with-select" width="50px" maxlength="20">
          <template #append>
            <el-button type="primary" @click="getGoodsList()">
              <el-icon>
                <Search />
              </el-icon>
            </el-button>
          </template>
        </el-input>
      </div>

      <!-- 表单 -->
      <div>
        <el-table :data="goodsList" border stripe style="width:100%" highlight-current-row>
          <el-table-column prop="goods_id" label="商品id" width="80" />
          <el-table-column prop="goods_name" label="商品名称" width="500" />
          <el-table-column prop="" label="商品详情">
            <template #default="" width="200">
              <el-table-column prop="goods_price" label="价格(￥)" width="80" />
              <el-table-column prop="goods_number" label="数量" width="80" />
              <el-table-column prop="goods_weight" label="重量(Kg)" width="80" />
            </template>
          </el-table-column>
          <el-table-column prop="" label="商品状态">
            <el-table-column prop="goods_state" label="状态" class="goodsCode" width="100">
              <template #default="scope">
                <p>{{switchState(scope.row.goods_state)}}</p>
              </template>
            </el-table-column>
            <el-table-column prop="add_time" label="添加时间" width="200">
              <template #default="scope">
                <p>{{changeTimeFormat(scope.row.add_time)}}</p>
              </template>
            </el-table-column>
            <el-table-column prop="upd_time" label="更新时间" width="200">
              <template #default="scope">
                <p>{{changeTimeFormat(scope.row.upd_time)}}</p>
              </template>
            </el-table-column>
          </el-table-column>
          <el-table-column prop="" label="热销详情">
            <template #default="">
              <el-table-column prop="hot_mumber" label="热销数量" width="100" />
              <el-table-column prop="is_promote" label="是否热销">
                {{goodsList.is_promote === false? '是':'否'}}
              </el-table-column>
            </template>
          </el-table-column>
        </el-table>
      </div>
    </div>

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
import { goodsListApi } from '../util/request.js'
import { ElMessage } from 'element-plus'

export default {

  setup(props) {
    const data = reactive({
      goodsList: [],
      pageData: [],
      searchParams: {
        query: '',
        pagesize: [10, 15, 30],
        pagenum: 1,
      },
      dialogFormVisible: false,
      dialogFormEVisible: false,
    })


    // 日期格式
    const changeTimeFormat = (d) => {
      let now = new Date(parseFloat(d * 1095));
      let year = now.getFullYear();
      let month = now.getMonth() + 1;
      let date = now.getDate();
      if (month >= 1 && month <= 9) {
        month = "0" + month;
      }
      if (date >= 0 && date <= 9) {
        date = "0" + date;
      }
      let hour = now.getHours();
      let minute = now.getMinutes();
      let second = now.getSeconds();
      if (hour >= 1 && hour <= 9) {
        hour = "0" + hour;
      }
      if (minute >= 0 && minute <= 9) {
        minute = "0" + minute;
      }
      if (second >= 0 && second <= 9) {
        second = "0" + second;
      }
      return year + "-" + month + "-" + date + " " + hour + ":" + minute + ":" + second;
    }

    const getGoodsList = () => {
      goodsListApi(data.searchParams).then((result) => {
        if (result.data) {

          data.goodsList = result.data.goods
          data.pageData = result.data
          console.log(data.goodsList);
        }
      }).catch((err) => {
        console.log(err);
      });
    }
    getGoodsList()

    const switchState = (state) => {
      switch (state) {
        case 0:
          return "未通过"
          break;
        case 1:
          return "审核中"
          break;
        case 2:
          return "已审核"
          break;
      }
    }

    // 条数改变触发的函数
    const handleSizeChange = (val) => {
      data.searchParams.pagesize = val;
      getGoodsList();
    }

    // 页数改变触发的函数
    const handleCurrentChange = (val) => {
      data.searchParams.pagenum = val;
      getGoodsList();
      console.log('页面改变');
    }

    return {
      ...toRefs(data),
      getGoodsList,
      handleSizeChange,
      handleCurrentChange,
      changeTimeFormat,
      switchState
    }
  }
}
</script>

<style lang="less" scoped>
.goodsList {
  display: flex;
  flex-wrap: wrap;
  width: 100%;
  flex: 1;
}
.page_content {
  box-sizing: border-box;
  width: 100%;
  padding: 10px;
  background: white;
  margin: auto;
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