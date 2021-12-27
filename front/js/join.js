import common from './common';
import '../css/join.css';

$(function(){
    $('#loginBtn').on('click',()=>{
        common.includeHTML('login');
    })
})