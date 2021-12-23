import common from './common.js';
import '../css/join.css';

$(function(){
    $('#loginBtn').on('click',()=>{
        common.includeHTML('login');
    })
})