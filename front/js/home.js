import '../css/home.css' assert { type: "css" };
import common from './common.js';

$(function() {
    $('.home_box').off().on('click', function() {
        const id = $(this).data('id');
        if(!id) {
            common.alert('서비스 준비중','다른 서비스를 이용해주세요','info');
        }
        else {
            common.includeHTML(id);
        }
    });
});