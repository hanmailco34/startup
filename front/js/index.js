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
            var data = common.session('location','get');
            if(data.location) {
                common.session('location','delete');
                common.includeHTML(location);
            }
            else {
                common.includeHTML('home');
            }            
        }
        else {
            common.includeHTML('login');
        }
    }

    common.rpcPost(rpc.checkUrl,'',tokenCheck);
})