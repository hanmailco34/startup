import common from '../js/common.js';
import rpc from '../js/rpc.js';

$(function() {
    const getComponents = (res) => {
        if(res.status === 'OK') {
            for(var i = 0; i < res.data.components.length; i++) {
                var title = res.data.components[i];
                
                var includeOption = {
                    title   : `component/js/${title.substr(0,title.length-3)}`,
                    tag     : 'components',
                    module  : false
                };
                common.includeJavascript(includeOption);
                var includeOption = {
                    title   : `component/css/${title.substr(0,title.length-3)}`,
                    tag     : 'components'
                };
                common.includeStyleSheet(includeOption);
            }            
        }
    }

    const rpcOption = {
        url : rpc.hostUrl + '/components',
        method  : 'get',
        CBF : getComponents
    }
    common.rpcCall(rpcOption);

});