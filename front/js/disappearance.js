import rpc from './rpc.js';
import global from './global.js';
import common from './common.js';

$(function() {    
    global.latlng = {LA:126.84900193636805,Ma:37.472331556684615}
    const radioOption = [
        {
            name    : 'sex',
            value   : 'M',
            text    : '수컷' 
        },
        {
            name    : 'sex',
            value   : 'F',
            text    : '암컷'
        }
    ]
    $('#sex').createRadio(radioOption);

    var option = {
        data: {
            dogBreed: '견종',
            name: '개이름',
            age: 18,
            sex: 'F',
            weight: 18.18,
            missingData: '2020-01-02 09:00:00',
            gratuity: 200,
            extra: '이쁘고 귀엽고 총명하다.그리고 오른쪽 뒤에 반점이 있습니다.',
            latitude: global.latlng.La,
            longitude: global.latlng.Ma
        }
    }
    console.log(option);
    $('#disapper').click(function() {
        var d = getRadioValue('sex');
        console.log(d);
    });
});
