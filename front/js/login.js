import common from './common';
import '../css/login.css';

$(function(){
    $('#joinBtn').on("click",()=>{
        common.includeHTML('join');
    });
    var client_id = 'qZEYV_9Dnf7uxDSIELMm';
    var state = common.randomString();
    var redirectURI = encodeURI("http://localhost:5000/sns/cb");
    
    var api_url = 'https://nid.naver.com/oauth2.0/authorize?response_type=code&client_id=' + client_id + '&redirect_uri=' + redirectURI + '&state=' + state;
    $('#naver_id_login').click(function() {
        location.href = api_url
    })
});