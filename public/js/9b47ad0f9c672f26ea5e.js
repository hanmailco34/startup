var manifestObj = {};

$(async function(){
    const mani_port = (location.port !== '')? ':' + location.port : location.port;

    const mani_hostUrl = location.protocol + '//' + location.hostname + mani_port;

    manifestObj = await $.get(mani_hostUrl+'/js/manifest.json')
    var sc = document.createElement('script');
    sc.src = manifestObj.index;
    $('head').append(sc);
})