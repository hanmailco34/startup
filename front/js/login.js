import common from './common';
import rpc from './rpc';
import '../css/login.css';

$(function(){
    $('#joinBtn').on("click",()=>{
        common.includeHTML('join');
    });
    var naver_client_id = 'qZEYV_9Dnf7uxDSIELMm';
    var state = common.randomString();
    var naver_redirectURI = encodeURI(rpc.snsCBUrl);
    
    var naver_api_url = 'https://nid.naver.com/oauth2.0/authorize?response_type=code&client_id=' + naver_client_id + '&redirect_uri=' + naver_redirectURI + '&state=' + state;
    $('#naver_id_login').click(function() {
        location.href = naver_api_url
    })
});