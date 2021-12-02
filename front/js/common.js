import rpc from './rpc';

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
    sc.src = `${manifestObj[title]}`;
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

const commonFunc = {
    rpcGet(url,param,CBF,CBP) {
        showLoading();
        $.get(url,param)
        .done((res)=>CBF(res,CBP))
        .fail(rpcFail)
        .always(hideLoading)
    },
    includeHTML(title) {
        this.rpcGet(rpc.hostUrl+'/html/'+title+'.html','',CBHTML,title);
    },
    randomString(type,lenth) {
        if(!type) type = 'stringNumber';
        if(!length) length = 32;

        var res,str = '';

        if(type === 'string') {
            str = Math.random().toString(36).replace(/[^a-z]+/g, '').substr(0,1);
        }
        else if(type === 'number') {
            str = Math.random().toString().substr(3,1);
        }
        else if(type === 'stringNumber') {
            str = Math.random().toString(36).substr(3,1);
        }
        else if(type === 'hex') {
            str = Math.random().toString(16).substr(3,1);
        }

        for(var i = 0; i < lenth; i++) {
            res += str;
        }

        return res;
    } 
}

export default commonFunc;