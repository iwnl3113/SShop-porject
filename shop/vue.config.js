const { defineConfig } = require('@vue/cli-service')
var webpack = require('webpack');
module.exports = defineConfig({
  transpileDependencies: true,
  lintOnSave:false,
  configureWebpack: {
		//支持jquery
		plugins: [
			new webpack.ProvidePlugin({
				$:"jquery",
				jQuery:"jquery",
				"windows.jQuery":"jquery"
			})
		]
	},
	devServer: {
        proxy: {
            '/api': {
                target: 'https://echarts.apache.org/examples/data-gl/asset/data/flights.json',  //请求对象
                ws: true,//代理websocked
                changeOrigin: true,//允许跨域
                secure: true, //target是否为https接口
                pathRewrite: {
                    '^/api': ''  //更改请求URL
                }
            }
        }
    }
})
