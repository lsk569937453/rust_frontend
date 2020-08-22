modules.exports = {
    devServer: {
        proxy: {
            '/api': {
                target: 'http://localhost:9394/api',
                changeOrigin: true,
                pathRewrite: {
                    '^/api': ''
                }
            }
        }
    }
}
