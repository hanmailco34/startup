const protocol = location.protocol;
const hostName = location.hostname;
const port = (location.port !== '')? ':' + location.port : location.port;

const hostUrl = protocol + '//' + hostName + port;

const crosswordUrl = hostUrl + '/crossword';

const rpc = {
    hostUrl : hostUrl,
    crosswordSearchUrl : crosswordUrl + '/search'
}

export default rpc;