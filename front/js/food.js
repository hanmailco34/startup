import '../css/food.css' assert { type: "css" };
import rpc from './rpc.js';
import global from './global.js';
import common from './common.js';

$(function() {
    $('#upload').click(function() {
        common.includeHTML('foodUpload');
    });
});