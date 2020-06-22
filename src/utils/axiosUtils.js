import axios from 'axios'; // 引入axios


var Request = axios.create(
    {
      
        timeout: 10000,
        headers: {'X-Custom-Header': 'foobar'}
    }
);
export default Request
