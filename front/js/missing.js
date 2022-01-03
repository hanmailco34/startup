import '../css/missing.css' assert { type: "css" };
import common from './common.js';

var map;

$(function() {
  function getLocation() {
    if (navigator.geolocation) { // GPS를 지원하면
      navigator.geolocation.getCurrentPosition(function(position) {
        var container = document.getElementById('map'); //지도를 담을 영역의 DOM 레퍼런스
        var options = { //지도를 생성할 때 필요한 기본 옵션
            center: new kakao.maps.LatLng(position.coords.latitude, position.coords.longitude), //지도의 중심좌표.
            level: 3 //지도의 레벨(확대, 축소 정도)
        };

        map = new kakao.maps.Map(container, options); //지도 생성 및 객체 리턴

        var mapTypeControl = new kakao.maps.MapTypeControl();
        map.addControl(mapTypeControl, kakao.maps.ControlPosition.TOPRIGHT);

        var zoomControl = new kakao.maps.ZoomControl();
        map.addControl(zoomControl, kakao.maps.ControlPosition.RIGHT);

        var markerPosition  = new kakao.maps.LatLng(position.coords.latitude, position.coords.longitude); 

        var marker = new kakao.maps.Marker({
          position: markerPosition
        });

        //marker.setMap(map);

        

        var clickMaker = new kakao.maps.Marker({
          position: markerPosition
        });

        var infowindow = new kakao.maps.InfoWindow({
          position: markerPosition
        });        

        kakao.maps.event.addListener(map, 'click', function(mouseEvent) {
          infowindow.close();
          var latlng  = mouseEvent.latLng;
          var content = `
          <div class="if_content">
            <span id="disappearance">신고하기</span>
            <div class="close" id="ifClose">X</div>
          </div>
          `;
          infowindow = new kakao.maps.InfoWindow({
            position : latlng, 
            content : content
          });
          var clickMakerImage = new kakao.maps.MarkerImage(
            '../img/flasher.png',
            new kakao.maps.Size(41, 45), new kakao.maps.Point(20, 40)
          );
          clickMaker.setImage(clickMakerImage);
          clickMaker.setPosition(latlng);
          clickMaker.setMap(map);
          clickMaker.setVisible(true);
          infowindow.open(map, clickMaker);
          $('#disappearance').off().on('click', function() {
            alert(1);
          });
          $('#ifClose').off().on('click', function() {
            clickMaker.setVisible(false);
            infowindow.close();
          });
        });

        map.relayout();
      }, function(error) {
        console.error(error);
      }, {
        enableHighAccuracy: false,
        maximumAge: 0,
        timeout: Infinity
      });
    } else {
      common.alert('GPS를 지원하지 않습니다','','error');
    }
  }

  getLocation();
});

