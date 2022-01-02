import common from './common.js';
import rpc from './rpc.js';
import '../css/login.css' assert { type: "css" };

$(function(){
    var naver_client_id = 'qZEYV_9Dnf7uxDSIELMm';
    var google_client_id = '599329073244-l451mgtnohltugodvaa51j3b4o5ruhk3.apps.googleusercontent.com';
    var kakao_client_id = '14f2f8dfec49d3052f2c10888f4d26e9';
    var state = common.randomString();
    var naver_redirectURI = encodeURI(rpc.snsCBUrl + '?type=naver');
    var gogole_auth = '';
    var google_redirectURI = encodeURI(rpc.snsCBUrl + '?type=google');
    var kakao_redirectURI = encodeURI(rpc.snsCBUrl + '?type=kakao');
    
    var naver_api_url = 'https://nid.naver.com/oauth2.0/authorize?response_type=code&client_id=' + naver_client_id + '&redirect_uri=' + naver_redirectURI + '&state=' + state;
    var kakao_api_url = `https://kauth.kakao.com/oauth/authorize?response_type=code&client_id=${kakao_client_id}&redirect_uri=${kakao_redirectURI}`;
    
    $('#naverLoginBtn').click(function() {
        location.href = naver_api_url
    });
    $('#googleLoginBtn').click(function() {
        gapi.load('auth2', function() {
            gogole_auth = gapi.auth2.init({
                client_id : google_client_id
            });

            gogole_auth.signIn().then(result => {
                location.href = google_redirectURI+'&token='+result.getAuthResponse().id_token;
            });
        });
    });
    $('#kakaoLoginBtn').click(function() {
        location.href = kakao_api_url
    })
});