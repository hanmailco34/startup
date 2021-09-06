import common from './common';
import '../css/login.css';

$(function(){
    $('#joinBtn').on("click",()=>{
        common.includeHTML('join');
    });
})