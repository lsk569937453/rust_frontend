import axios from 'axios'; // 引入axios


var Request = axios.create(
    {

        timeout: 1000000,
        headers: {'X-Custom-Header': 'foobar', 'userAgent': navigator.userAgent}
    }
);
Request.all = axios.all;
Request.spread = axios.spread;
export default Request
