import '../css/header.css' assert { type: "css" };
import common from './common.js';
import rpc from './rpc.js';
import global from './global.js';

$(function() {
    const headerData = common.session(['point','name'],'get');
    const point = common.numberFormat(headerData.point);
    $('#header #header_point').text(point+'P');
    $('#header #header_name').text(headerData.name + '님');

    $('#header_title').click(function() {
        common.session('history','delete');
        location.href = rpc.hostUrl;
    });
    $('#header_back').click(function() {
        console.log(global.backHistory);
        global.history = common.session('history','get').history;
        console.log(global);
        if(global.backHistory[1].indexOf(global.history) >= 0) $('#header_title').click();
        else {
            for(var i = 0; i < global.backHistory[2].length; i++) {
                var item = global.backHistory[2][i];
                if(item.indexOf(global.history) >= 0) {
                    var history = global.backHistory[1][i];
                    common.session({'history':history});
                    location.href = rpc.hostUrl;
                }
            }
        }
    });
})