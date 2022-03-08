const protocol = location.protocol;
const hostName = location.hostname;
const port = (location.port !== '')? ':' + location.port : location.port;

const hostUrl   = protocol + '//' + hostName + port;

const snsUrl    = hostUrl + '/sns';
const snsCBUrl  = snsUrl + '/cb';

const tokenUrl  = hostUrl + '/token';
const checkUrl  = tokenUrl + '/check';

const foodUrl       = hostUrl + '/food';
const getHashTagUrl = foodUrl + '/getTag';

const rpc = {
    hostUrl         : hostUrl,
    snsCBUrl        : snsCBUrl,
    checkUrl        : checkUrl,
    getHashTagUrl   : getHashTagUrl
}

export default rpc;