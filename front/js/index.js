import common from './common';
import rpc from './rpc';

$(function(){
    var testCB = (data,cp) => {
        console.log(data);
        console.log(cp);
    }
    var testCBP = {
        'test':'dd'
    }

    common.rpcGet(rpc.testGetUrl,'',testCB,testCBP);   
    
    common.includeHTML('login');
})