modules.exports = {
    devServer: {
        proxy: {
            '/api': {
                target: 'http://localhost:9393/api',
                changeOrigin: true,
                pathRewrite: {
                    '^/api': ''
                }
            }
        }
    }
}
