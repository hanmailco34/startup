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

        var markerPosition  = new kakao.maps.LatLng(33.450701, 126.570667); 

        var marker = new kakao.maps.Marker({
          position: markerPosition
        });

        marker.setMap(map);

        // event 종류 click, dragend, zoom_changed, center_changed, bounds_changed, tilesloaded

        kakao.maps.event.addListener(map, 'click', function(mouseEvent) {
          var latlng = mouseEvent.latLng;

          marker.setPosition(latlng);
        });

        /* kakao.maps.event.addListener(map, 'center_changed', function() {
          marker.setPosition(map.getCenter());
        }); */

      }, function(error) {
        console.error(error);
      }, {
        enableHighAccuracy: false,
        maximumAge: 0,
        timeout: Infinity
      });
    } else {
      common.alert('GPS를 지원하지 않습니다');
    }
  }

  getLocation();

  $('#move').click(function() {
    var moveLatLon = new kakao.maps.LatLng(33.450580, 126.574942);
    map.panTo(moveLatLon);
  });
});