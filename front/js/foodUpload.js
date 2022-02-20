import '../css/foodUpload.css' assert { type: "css" };
import rpc from './rpc.js';
import global from './global.js';
import common from './common.js';

$(function() {
    var img_id = 0;
    // 선택영역 클릭시 파일업로드 나타남
    $('#file_upload').click(function() {
        $('#file_data').click();
    });

    // 파일 드래그 앤 드랍
    $('#file_upload').on({
        'dragover'  : function(e) {
            e.preventDefault();    
        },
        'drop'      : function(e) {
            e.preventDefault();
            var file = e.originalEvent.dataTransfer.files[0];
            imgCheck(file);
        }
    });

    // 파일 업로드 후 로직
    $('#file_data').change(function() {
        for(var i = 0; i < this.files.length; i++) {
            var file = this.files[i];
            imgCheck(file);
        }
        $("#file_data").val("");
    });

    // 이미지 판별 로직
    function imgCheck(file) {
        if(file.type.indexOf('image') !== -1) {
            img_id++;
            readURL(file,img_id);
        }
        else {
            common.alert('이미지 아님!','이미지를 업로드해주세요','warning');
        }
    }

    // 썸네일 이미지 읽기
    function readURL(file,id) {        
        createFileDiv(id);
        var reader = new FileReader();        
        reader.onload = function (e) {
            $(`#img_${id}`).attr('src', e.target.result);  
        }
        reader.readAsDataURL(file);
        $("#file_box").sortable();
    }

    // 썸네일 생성
    function createFileDiv(id) {
        var div     = document.createElement('div');
        var c_div   = document.createElement('div');
        var close   = document.createTextNode('X');
        var img     = document.createElement('img');
        div.setAttribute('id',`img_box_${id}`);
        div.setAttribute('class',`drag_div`);
        img.setAttribute('id',`img_${id}`);
        div.append(img);
        c_div.setAttribute('class','img_close');
        c_div.setAttribute('data-id',id);
        c_div.appendChild(close);
        div.append(c_div);
        $('#file_box').append(div);
        
        // 썸네일 이미지 삭제
        $('.img_close').off().on('click', function() {
            var t_img_id = $(this).data('id');
            $(`#img_box_${t_img_id}`).remove();
        });

        // 대표 썸네일 선택
        $('.drag_div').off().on('click', function() {
            $('.rep_box').remove();
            $('.drag_div').removeClass('rep_img');
            $(this).addClass('rep_img');
            var rep_box     = document.createElement('span');
            var rep         = document.createElement('span');
            var rep_txt     = document.createTextNode('대표');
            rep_box.setAttribute('class', 'rep_box');
            rep.setAttribute('class', 'rep');
            rep.appendChild(rep_txt);
            rep_box.appendChild(rep);
            $(this).append(rep_box);
        });
    }    

    // 텍스트 높이 조절
    $('#file_text').on('keydown keyup', function () {
        $(this).height(1).height( $(this).prop('scrollHeight')+12 );
    });
    
});