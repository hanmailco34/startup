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
        common.goHome();
    });
    $('#header_back').click(function() {
        common.back();
    });
})