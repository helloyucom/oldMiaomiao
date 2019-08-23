// export default {     // 这是新的es6的写法，现在不支持
module.exports = {        // 使用模块化之前的写法
    devServer: {
        proxy: {
            '/api': {
                target: 'http://39.97.33.178',       // 反向代理的目标
                changeOrigin: true                  // 反向代理的时候是否要改变反向代理的地址
            }
        }
    }
}