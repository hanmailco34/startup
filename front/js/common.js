function rpcGet(url,param,CBF,CBP) {
    showLoading();
    $.get(url,param)
    .done((res)=>CBF(res,CBP))
    .fail(rpcFail)
    .always(hideLoading)
}

function includeHTML(title) {
    rpcGet(hostUrl+'/html/'+title+'.html','',CBHTML);
}

function clearHead() {
    const head = $('head')[0];
    console.log(head);
}

function includeJS(title) {
    
}

function includeCSS(title) {
    
}

const CBHTML = (res) => {
    clearHead();
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