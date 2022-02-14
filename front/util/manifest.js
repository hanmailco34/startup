var manifestObj = {};

var environment = 'development';
alert(environment);
/* for(var i = 0; i < document.cookie.split(';').length; i++) {
    var item = document.cookie.split(';')[i].split('=');
    if('environment' === item[0].trim()) environment = item[1];
} */
window.onload = function() {
    alert(environment);
    var sc1 = document.createElement('script');
        sc1.src = '../js/index.js';
        sc1.type = 'text/javascript';
        $('head').append(sc1);
}

$(async function(){
    alert(environment);
    if(environment === 'development') {
        var sc1 = document.createElement('script');
        sc1.src = '../js/index.js';
        sc1.type = 'text/javascript';
        //sc1.type = 'module';
        $('head').append(sc1);
    }
    else {
        const mani_port = (location.port !== '')? ':' + location.port : location.port;

        const mani_hostUrl = location.protocol + '//' + location.hostname + mani_port;

        manifestObj = await $.get(mani_hostUrl+'/js/manifest.json');
        var sc1 = document.createElement('script');
        sc1.src = '/js/manifest.json';
        sc1.type = 'application/json';
        $('head').append(sc1);
        var sc2 = document.createElement('script');
        sc2.src = manifestObj.index;
        $('head').append(sc2);
    }    
})