import rpc from './rpc';

function clearHead(head) {
    var cmd = false;
    var tempArr = [];
    
    head.childNodes.forEach((e)=>{ 
        if((e.src || e.name === 'common' || e.tagName === 'LINK')) {
            console.log(e);
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
}

export default commonFunc;