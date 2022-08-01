<template>
  <div class="box">
    <div class="wrapper">
      <div id="main"></div>
      <div id="main2"></div>
      <div class="mainchart" id="main3"></div>
    </div>
  </div>
</template>

<script>
import { defineComponent, onMounted, inject } from "vue"; // 主要
import * as echarts from 'echarts' // 使用echarts
export default ({
  setup(props, ctx) {
    onMounted(() => {
      echart1()
      echart2()
      echarts3()
    })


    // 柱状图
    const echart1 = () => {
      var myChart = echarts.init(document.getElementById('main'))
      var option = {
        title: {
          top: "5%",
          left: "5%",
          text: '2022商店销量表',
        },
        grid: {
          left: "10%",
          top: "20%",
          right: "10%",
          bottom: "10%",
          containLabel: true
        },
        tooltip: {},
        legend: {
          top: "10%",
          right: "10%",
          data: ['销量'],
        },
        xAxis: {
          data: ['衬衫', '羊毛衫', '雪纺衫', '裤子', '高跟鞋', '袜子'],
        },
        yAxis: {},
        series: [
          {
            name: '销量',
            type: 'bar',
            data: [5, 20, 36, 10, 10, 20],
          },
        ],
      }
      // 使用刚指定的配置项和数据显示图表。
      myChart.setOption(option)
    }

    //折线图
    const echart2 = () => {
      // 获取组件实例
      const machart = echarts.init(document.getElementById("main2"));
      // 设置配置项
      const option = {
        title: {
          top: "5%",
          left: "5%",
          text: '2022年夏季利润折线图',
        },
        grid: {
          left: "10%",
          top: "20%",
          right: "10%",
          bottom: "10%",
          containLabel: true
        },
        xAxis: {
          data: ["A", "B", "C", "D", "E"],
        },
        yAxis: {},
        series: [
          {
            data: [10, 22, 28, 43, 49],
            type: "line",
            stack: "x",
          },
          {
            data: [5, 4, 3, 5, 10],
            type: "line",
            stack: "x",
          },
          {
            data: [51, 14, 23, 35, 14],
            type: "line",
            stack: "x",
          },
        ],
      };
      // 复制
      machart.setOption(option);
      // 根据页面大小自动响应图表大小
      window.addEventListener("resize", function () {
        machart.resize();
      });
    };


    // 热力
    const echarts3 = () => {
      var myChart = echarts.init(document.getElementById('main3'))
      let base = +new Date(1968, 9, 3);
      let oneDay = 24 * 3600 * 1000;
      let date = [];
      let data = [Math.random() * 300];
      for (let i = 1; i < 20000; i++) {
        var now = new Date((base += oneDay));
        date.push([now.getFullYear(), now.getMonth() + 1, now.getDate()].join('/'));
        data.push(Math.round((Math.random() - 0.5) * 20 + data[i - 1]));
      }

      const option = {
        tooltip: {
          trigger: 'axis',
          position: function (pt) {
            return [pt[0], '10%'];
          }
        },
        title: {
          top:'5px',
          left: 'center',
          text: '年度地区热力图'
        },
        toolbox: {
          feature: {
            dataZoom: {
              yAxisIndex: 'none'
            },
            restore: {},
            saveAsImage: {}
          }
        },
        grid: {
          left: "1%",
          top: "10%",
          right: "1%",
          bottom: "8%",
          containLabel: true
        },
        xAxis: {
          type: 'category',
          boundaryGap: false,
          data: date
        },
        yAxis: {
          type: 'value',
          boundaryGap: [0, '100%']
        },
        dataZoom: [
          {
            type: 'inside',
            start: 0,
            end: 10
          },
          {
            start: 0,
            end: 10
          }
        ],
        series: [
          {
            name: 'Fake Data',
            type: 'line',
            symbol: 'none',
            sampling: 'lttb',
            itemStyle: {
              color: 'rgb(255, 70, 131)'
            },
            areaStyle: {
              color: new echarts.graphic.LinearGradient(0, 0, 0, 1, [
                {
                  offset: 0,
                  color: 'rgb(255, 158, 68)'
                },
                {
                  offset: 1,
                  color: 'rgb(255, 70, 131)'
                }
              ])
            },
            data: data
          }
        ]
      };
      myChart.setOption(option);
      // 根据页面大小自动响应图表大小
      window.addEventListener("resize", function () {
      machart.resize();
      });
    }
  },
})
</script>

<style lang="less" scoped>
.box {
  width: 100%;
  height: 100%;
}
.wrapper {
  margin: 0px;
  /* 声明一个容器 */
  display: grid;
  /* 声明列的宽度,数字3表示的重复3次，即有3列宽度为200px*/
  grid-template-columns: 1fr 2fr;
  /* 声明行间距和列间距 */
  grid-gap: 20px;
  /* 分别表示两行的高度 */
  grid-template-rows: 1fr 1fr;
  height: 100%;
  width: 100%;
}
.mainchart {
  grid-column-start: span 2;
}
.wrapper * > {
  background-color: #fff;
  border-radius: 10px;
}
</style>
