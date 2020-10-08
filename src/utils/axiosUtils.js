import axios from 'axios'; // 引入axios


var Request = axios.create(
    {

        timeout: 1000000,
        headers: {'X-Custom-Header': 'foobar', 'userAgent': navigator.userAgent}
    }
);

Request.interceptors.request.use((config) => {
    // config.headers['request-startTime'] = process.hrtime()
    console.log("send req:" + new Date())
    return config
})
//
// Request.interceptors.response.use((response) => {
//     const start = response.config.headers['request-startTime']
//     const end = process.hrtime(start)
//     const milliseconds = Math.round((end[0] * 1000) + (end[1] / 1000000))
//     response.headers['request-duration'] = milliseconds
//     return response
// })

Request.all = axios.all;
Request.spread = axios.spread;
export default Request
