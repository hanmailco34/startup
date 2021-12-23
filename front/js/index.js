import common from './common.js';
import rpc from './rpc.js';

$(function(){
    var tokenCheck = (res) => {
        if(res.status === 'OK') {
            sessionStorage.setItem('name',res.data.name);
            common.includeHTML('home');
        }
        else {
            common.includeHTML('login');
        }
    }

    common.rpcPost(rpc.checkUrl,'',tokenCheck);
})