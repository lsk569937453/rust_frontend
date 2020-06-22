modules.exports = {
    devServer: {
        proxy: {
            '/api': {
                target: 'http://localhost:5001/api',
                changeOrigin: true,
                pathRewrite: {
                    '^/api': ''
                }
            }
        }
    }
}
