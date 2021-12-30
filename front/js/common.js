import rpc from './rpc.js';

function clearHead(head) {
    var cmd = false;
    var tempArr = [];
    
    head.childNodes.forEach((e)=>{ 
        if((e.src || e.name === 'common' || e.tagName === 'LINK')) {
            if(cmd) tempArr.push(e);
            if(e.name === 'common') cmd = true;
        }
    });
    tempArr.forEach(e=>{
        head.removeChild(e);
    })
}

function includeJS(head,title) {
    const sc = document.createElement('script');
    if(environment === 'develope') sc.src = `js/${title}.js`;
    else sc.src = `${manifestObj[title]}`;    
    sc.type = 'module';
    head.appendChild(sc);
}

function includeCSS(head,title) {
    const link = document.createElement('link');
    link.rel = 'stylesheet';
    link.href = `css/${title}.css`;
    head.appendChild(link);
}

function CBHTML(res,title) {
    const head = $('head')[0];
    clearHead(head);
    includeJS(head,title);
    includeCSS(head,title);
    $('#app').html(res);
}

function rpcFail() {
    alert('서버 관리자에게 문의해주세요');
}

function showLoading() {
    $("#loading").show();
}

function hideLoading() {
    $("#loading").hide();
}

function showAlert(obj) {
    $('#alert_container').addClass('show');

    for(const [k,v] of Object.entries(obj)) {
        if(v) {
            $(`#alert_${k}`).addClass('show');
            if(k === 'icon') {
                $('#alert_icon').addClass(v);
                $(`#alert_${v}`).addClass('show');       
            }
        }
    }

    if(obj.confirm !== false) $('#alert_confirm').addClass('show');
}

function hideAlert(_id, obj) {
    $('#alert_container').removeClass('show');

    for(const [k,v] of Object.entries(obj)) {
        if(v) {
            $(`#alert_${k}`).removeClass('show');
            if(k === 'icon') {
                $('#alert_icon').removeClass(v);
                $(`#alert_${v}`).removeClass('show');       
            }
        }
    }

    if(obj.confirm !== false) $('#alert_confirm').removeClass('show');

    if(_id === 'alert_confirm' && typeof obj.isConfirmed === 'function') {
        obj.isConfirmed();
    }

    if(_id === 'alert_deny' && typeof obj.isDenied === 'function') {
        obj.isDenied();
    }
}

const commonFunc = {
    rpcGet(url,param,CBF,CBP) {
        showLoading();
        $.get(url,param)
        .done((res)=>CBF(res,CBP))
        .fail(rpcFail)
        .always(hideLoading)
    },
    rpcPost(url,param,CBF,CBP) {
        showLoading();
        $.post(url,param)
        .done((res)=>CBF(res,CBP))
        .fail(rpcFail)
        .always(hideLoading)
    },
    includeHTML(title) {
        this.rpcGet(rpc.hostUrl+'/html/'+title+'.html','',CBHTML,title);
    },
    randomString(type,length) {
        if(!type) type = 'stringNumber';
        if(!length) length = 32;

        var res = '';
        var target = '';
        const str = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz';
        const num = '0123456789';

        if(type === 'string') {
            target = str;
        }
        else if(type === 'number') {
            target = num;
        }
        else if(type === 'stringNumber') {
            target = str + num;
        }
        else if(type === 'hex') {
            target = num + 'abcdef';
        }

        for(var i = 0; i < length; i++) {
            res += target.charAt(Math.floor(Math.random() * target.length));
        }

        return res;
    },
    alert(title,content,icon) {
        
        const obj = {};

        if(typeof title === 'string') {
            obj['title'] = title;
            obj['content'] = content;
            obj['icon'] = icon;            
        }
        else {
            Object.assign(obj, title);
        }        

        $('#alert_title').html(obj.title);
        $('#alert_content').html(obj.content);
        $('#alert_footer').html(obj.footer);
        $('#alert_confirm').html('OK');
        $('#alert_deny').html('NO');
        $('#alert_cancel').html('CANCEL');

        if(obj.confirmText) {
            $('#alert_confirm').html(obj.confirmText);
        }

        if(obj.denyText) {
            $('#alert_deny').html(obj.denyText);
        }

        if(obj.cancelText) {
            $('#alert_cancel').html(obj.cancelText);
        }

        if(obj.image) {
            $('#alert_image').css('width','');
            $('#alert_image').css('height','');
            $('#alert_image').attr('src',obj.image);
            if(obj.imageWidth) $('#alert_image').css('width',obj.imageWidth);
            if(obj.imageHeight) $('#alert_image').css('width',obj.imageHeight);
        }

        showAlert(obj);

        $("[name='alert_btn']").off().on('click', function() {
            hideAlert(this.id, obj);
        });

        if(obj.time) {
            setTimeout(() => hideAlert('time', obj),obj.time);
        }

        $('#alert_container').off().on('click', function(e) {
            if(e.target.id === 'alert_container') hideAlert('container', obj);
        });        
    }
}

export default commonFunc;