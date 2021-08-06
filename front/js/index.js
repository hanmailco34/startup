import css from '../css/index.css';

$(function(){
    var testCB = (data,cp) => {
        console.log(data);
        console.log(cp);
    }
    var testCBP = {
        'test':'dd'
    }

    rpcGet(testGetUrl,'',testCB,testCBP);
    
    includeHTML('login');
})

console.log(css);