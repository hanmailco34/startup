import common from './common.js';
import rpc from './rpc.js';

$(function(){
    var tokenCheck = (res) => {
        if(res.status === 'OK') {
            const sessionData = {
                name    : res.data.name,
                point   : res.data.point
            }
            common.session(sessionData);
            const includeOption = {
                title   : 'header',
                tag     : 'header'
            };
            common.includeHTML(includeOption);
            common.includeHTML('home');
        }
        else {
            common.includeHTML('login');
        }
    }

    common.rpcPost(rpc.checkUrl,'',tokenCheck);
})