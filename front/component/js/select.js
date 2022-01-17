$.fn.createSelect = function(obj) {
    $(this).empty();   
    $(this).css('position','relative');
    $(this).attr('onclick','clickSelect(this,event)');
    $(this).append(`<div style="float:left;width:80%" selectBox="create_select_title">${obj.title}</div>`);
    $(this).append(`<div style="float:left;width:20%">▼</div>`);
    $(this).append(`<div style="position:absolute; width:100%;top: 46px; left:-1px;display:none" selectBox="create_select_data"></div>`);
    if(obj.css) {
        var css = Object.entries(obj.css);
        for(var i = 0; i < css.length; i++) {
            $(this).css(css[i][0],css[i][1]);
            $(this).children('[selectBox="create_select_data"]').css(css[i][0],css[i][1]);
        }
    }
    
    for(var i = 0; i < obj.data.length; i++) {
        if(obj.cd) {
            $(this).children('[selectBox="create_select_data"]').append(`<div onclick="clickSelectData(this)" selCd=${obj.cd[i]}>${obj.data[i]}</div>`);
        }
        else {
            $(this).children('[selectBox="create_select_data"]').append(`<div onclick="clickSelectData(this)">${obj.data[i]}</div>`);
        }
        
    }

    if(obj.hover) {        
        $(this).children('[selectBox="create_select_data"]').children('div').hover(
            function() {
                var hover = Object.entries(obj.hover);
                for(var i = 0; i < hover.length; i++) {
                    $(this).css(hover[i][0],hover[i][1]);
                }            
            },function(){
                var hover = Object.entries(obj.hover);
                for(var i = 0; i < hover.length; i++) {
                    $(this).css(hover[i][0],'');
                }  
            });
    }
}

function clickSelect(_this,e) {
    e.stopPropagation();
    var t = $(_this).children('[selectBox="create_select_data"]');
    if(t.css('display') == 'block') {
        t.slideUp();
    }
    else {
        t.slideDown();
    }
}

function clickSelectData(_this) {
    var t = $(_this).text();
    var c = $(_this).attr('selCd');

    if(c) {
        $(_this).parent().parent().children('[selectBox="create_select_title"]').attr('selCd',c);
    }

    $(_this).parent().parent().children('[selectBox="create_select_title"]').text(t);
}

$(document).off().click(function(){
    $('[selectBox="create_select_data"]').slideUp();
})