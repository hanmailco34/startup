const protocol = location.protocol;
const hostName = location.hostname;
const port = (location.port !== '')? ':' + location.port : location.port;

const hostUrl   = protocol + '//' + hostName + port;

const snsUrl    = hostUrl + '/sns';
const snsCBUrl  = snsUrl + '/cb';

const tokenUrl  = hostUrl + '/token';
const checkUrl  = tokenUrl + '/check';

const crosswordUrl = hostUrl + '/crossword';

const rpc = {
    hostUrl : hostUrl,
    crosswordSearchUrl : crosswordUrl + '/search',
    snsCBUrl : snsCBUrl,
    checkUrl : checkUrl
}

export default rpc;