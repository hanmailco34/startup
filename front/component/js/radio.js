$.fn.createRadio = function(obj) {
    this.empty();
    for(var i = 0; i < obj.length; i++) {
        var _html = `
        <div class="radio_box">
            <div class="radio_circle" name="${obj[i].name}" value="${obj[i].value}" onclick="clickRadio(this)"></div>
            <div onclick="clickRadioText(this)">${obj[i].text}</div>
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