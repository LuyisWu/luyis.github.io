module.exports = {
    //页面入口文件配置
    entry: {
        index : './js/script.js'
    },
    //入口文件输出配置
    output: {
        path: '/dist/js',
        filename: '[name].bundle.js'
    }
};