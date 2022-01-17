$.fn.createRadio = function(obj) {
    this.empty();
    var count_checked = 0;

    for(var i = 0; i < obj.length; i++) {
        var item = obj[i];
        if(!item.name || !item.value || !item.text) {
            alert('형식을 지켜주세요');
            this.empty();
            break;
        }
        if(item.checked) count_checked++;
        if(count_checked > 1) {
            alert('라디오의 체크값은 복수개의 값이 될 수 없습니다.');
            this.empty();
            break;
        }
        var _html = `
        <div class="radio_box">
            <div class="radio_circle" name="${item.name}" value="${item.value}" onclick="clickRadio(this)">
                ${(item.checked)? `<div class="radio_sub_circle" data-value=${item.value}></div>` : ''}
            </div>
            <div onclick="clickRadioText(this)">${item.text}</div>
        </div>
        `;
        this.append(_html);
    }    
}

function clickRadio(_this) {
    var _name   = $(_this).attr('name');
    var _value  = $(_this).attr('value'); 
    $(`[name=${_name}`).empty();
    $(_this).append(`<div class="radio_sub_circle" data-value=${_value}></div>`);
}

function clickRadioText(_this) {
    var circle = _this.previousElementSibling;
    clickRadio(circle);
}

function getRadioValue(_name) {
    return $(`[name=${_name}] .radio_sub_circle`).data('value');
}