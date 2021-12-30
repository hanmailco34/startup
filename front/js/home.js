import '../css/home.css' assert { type: "css" };
import common from './common.js';

$(function() {

    $('#button').click(function() {
      const alert = {
        title:'사라져라',
        confirm: false,
        time: 1500
      }
      common.alert(alert);
    });

    $('#button2').click(function() {
      const alert = {
        image: 'test.jpg'
      }
      common.alert(alert);
    });
});


/* function getLocation() {
    if (navigator.geolocation) { // GPS를 지원하면
      navigator.geolocation.getCurrentPosition(function(position) {
        var container = document.getElementById('map'); //지도를 담을 영역의 DOM 레퍼런스
        var options = { //지도를 생성할 때 필요한 기본 옵션
            center: new kakao.maps.LatLng(position.coords.latitude, position.coords.longitude), //지도의 중심좌표.
            level: 3 //지도의 레벨(확대, 축소 정도)
        };

        var map = new kakao.maps.Map(container, options); //지도 생성 및 객체 리턴
      }, function(error) {
        console.error(error);
      }, {
        enableHighAccuracy: false,
        maximumAge: 0,
        timeout: Infinity
      });
    } else {
      alert('GPS를 지원하지 않습니다');
    }
  }

  getLocation(); */