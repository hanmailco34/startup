const protocol = location.protocol;
const hostName = location.hostname;
const port = (location.port !== '')? ':' + location.port : location.port;

const hostUrl = protocol + '//' + hostName + port;

const snsUrl = hostUrl + '/sns';
const snsCBUrl = snsUrl + '/cb';

const crosswordUrl = hostUrl + '/crossword';

const rpc = {
    hostUrl : hostUrl,
    crosswordSearchUrl : crosswordUrl + '/search',
    snsCBUrl : snsCBUrl
}

export default rpc;