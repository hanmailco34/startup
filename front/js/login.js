import common from './common';
import '../css/login.css';

$(function(){
    $('#joinBtn').on("click",()=>{
        common.includeHTML('join');
    });
    var naver_login = new naver_id_login("qZEYV_9Dnf7uxDSIELMm", "http://localhost:5000/");
    var state = naver_login.getUniqState();
    naver_login.setButton("green", 3,40);
    naver_login.setDomain("http://localhost:5000/");
    naver_login.setState(state);
    naver_login.setPopup();
    naver_login.init_naver_id_login();
});