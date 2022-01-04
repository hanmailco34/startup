import common from './common.js';
import rpc from './rpc.js';

$(function(){
    var tokenCheck = (res) => {
        if(res.status === 'OK') {
            const sessionData = {
                name    : res.data.name,
                point   : res.data.point,
                environment : res.data.environment
            }
            common.session(sessionData);
            const includeOption = {
                title   : 'header',
                tag     : 'header'
            };
            common.includeHTML(includeOption);
            var data = common.session('history','get');
            if(data.history) {
                common.session('history','delete');
                common.includeHTML(data.history);
            }
            else {
                common.includeHTML('disappearance');
            }            
        }
        else {
            common.includeHTML('login');
        }
    }
    
    var rpcOption = {
        url : rpc.checkUrl,
        CBF : tokenCheck
    }
    common.rpcCall(rpcOption);
})