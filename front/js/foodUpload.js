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

    // 텍스트 높이 조절 & 해시태그
    $('#file_text').on('keyup', function (event) {
        var key     = event.key;
        var not_key = ['Shift', 'ArrowLeft', 'ArrowRight', 'ArrowUp', 'ArrowDown'];
        
        if(not_key.indexOf(key) === -1) {
            $('#hashtag_box').hide();
            $(this).height(1).height( $(this).prop('scrollHeight')+12);
            var option = {
                cmd : 2
            }
            findHashTag(rpcCallHashTag,option);
        }
    });

    // 해시태그 가져오고 나서 하는 함수
    function getHashTagCB(res) {
        if(res.data) {
            $('#hashtag_box').empty();

            if(res.data.length === 0) {
                var appendHtml = `
                <div>처음으로 해시태그 입력하는 사람</div>
                `;
                $('#hashtag_box').append(appendHtml);
            }

            res.data.forEach(e=>{
                var appendHtml = `
                <div class="get_tag">
                    #<span class="tag_name">${e.tag}</span>
                    <div>
                    ${(e.tag_count === '0')? '최근게시물' : `게시물 ${e.tag_count}개`}
                    </div>
                </div>
                `;
                $('#hashtag_box').append(appendHtml);
            });

            $('#hashtag_box').show();

            $('.get_tag').off().on('click', function() {
                var tag = $(this).find('.tag_name').text();
                var option = {
                    cmd : 1,
                    tag : tag
                }
                findHashTag(clickTag,option);
            });
        }

        $('#hashtag_loading').hide();
    }

    // TEXTAREA를 DIV로 변환 함수
    function textAreaToDiv(str) {
        str = str.replace(/\n/g, '<br>');
        str = str.replace(/#(([_a-zA-Z0-9]+)|([ㄱ-ㅎㅏ-ㅣ가-힣]+))/g,'<span class="hashtag">#$1</span>');
        $('#file_text_div').html(str);
    }

    // 해시태그 관련 공용 함수
    function findHashTag(CB,opt) {
        var textarea    = $('#file_text');
        var str         = textarea.val();
        var index       = textarea[0].selectionStart;

        // 단어로 배열에 나누고 현재 위치 찾은 후 해시태그있으면 콜백함수 실행
        str.split(/\n|\s/).reduce((acc,cur,idx,src)=>{
            var length = cur.length;
            if(idx !== 0) {
                length += 1;
            }
            if(acc < index && index <= acc + length) {
                if(src[idx].indexOf('#') !== -1 && src[idx].length > 1) {
                    if(opt.cmd === 1) str = CB(str,acc,idx,length,textarea,opt.tag);
                    else if(opt.cmd === 2) CB(src,idx);
                    src.splice(1);
                }
            }
            return acc + length;
        }, 0);

        textAreaToDiv(str);
    }

    // 클릭한 해시태그 가져오는 함수
    function clickTag(str,acc,idx,length,textarea,tag) {
        var textareaNew = '';        
        textareaNew += str.substr(0,acc+1);
        if(idx === 0) textareaNew += tag;
        else textareaNew += '#' + tag;
        textareaNew += str.substr(acc+length);
        textarea.val(textareaNew);
        $('#hashtag_box').hide();
        return textareaNew;
    }

    function rpcCallHashTag(src,idx) {
        $('#hashtag_loading').show();
        var query = src[idx].substr(1);
        var option = {
            url     : rpc.getHashTagUrl,
            data    : {
                "tag" : query,
                "id"  : 29
            },
            CBF     : getHashTagCB
        }
        common.rpcCall(option);
    }
});