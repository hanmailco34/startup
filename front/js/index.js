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
            
            console.log(common.session(['name','point'],'get'));
        }
        else {
            common.includeHTML('login');
        }
    }

    common.rpcPost(rpc.checkUrl,'',tokenCheck);
})