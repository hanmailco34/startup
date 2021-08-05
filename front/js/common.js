function rpcGet(url,param,CBF,CBP) {
    showLoading();
    $.get(url,param)
    .done((res)=>CBF(res,CBP))
    .fail(rpcFail)
    .always(hideLoading)
}

function includeHTML(title) {
    rpcGet(hostUrl+'/html/'+title+'.html','',CBHTML,title);
}

function clearHead(head) {
    var cmd = false;
    var tempArr = [];
    
    head.childNodes.forEach((e,idx)=>{        
        if(idx %2 === 1) {
            if(cmd) tempArr.push(e);
            if(e.nodeName === '#comment') cmd = true;
        }
    });
    tempArr.forEach(e=>{
        head.removeChild(e);
    })
}

function includeJS(head,title) {
    const sc = document.createElement('script');
    sc.src = `../js/${title}.js`;
    head.appendChild(sc);
}

function includeCSS(head,title) {
    const link = document.createElement('link');
    link.rel = 'stylesheet';
    link.href = `../css/${title}.css`;
    head.appendChild(link);
}

const CBHTML = (res,title) => {
    const head = $('head')[0];
    clearHead(head);
    includeJS(head,title);
    includeCSS(head,title)
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