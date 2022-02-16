import '../css/foodUpload.css' assert { type: "css" };
import rpc from './rpc.js';
import global from './global.js';
import common from './common.js';

$(function() {
    $('#file_upload').click(function() {
        $('#file_data').click();
    });
});