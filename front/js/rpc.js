const protocol = location.protocol;
const hostName = location.hostname;
const port = (location.port !== '')? ':' + location.port : location.port;

const hostUrl = protocol + '//' + hostName + port;

const testUrl = hostUrl + '/test';

const rpc = {
    hostUrl : hostUrl,
    testGetUrl : testUrl + '/get'
}

export default rpc;