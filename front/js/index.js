$(function(){
    var testCB = (data,cp) => {
        console.log(data);
        console.log(cp);
    }
    var testCBP = {
        'test':'dd'
    }
    console.log(location);
    rpcGet(testGetUrl,'',testCB,testCBP);
    includeHTML('login');
})