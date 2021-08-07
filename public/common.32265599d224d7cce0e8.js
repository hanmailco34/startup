/*
 * ATTENTION: The "eval" devtool has been used (maybe by default in mode: "development").
 * This devtool is neither made for production nor for readable output files.
 * It uses "eval()" calls to create a separate source file in the browser devtools.
 * If you are trying to read the output file, select a different devtool (https://webpack.js.org/configuration/devtool/)
 * or disable the default devtool with "devtool: false".
 * If you are looking for production-ready output files, see mode: "production" (https://webpack.js.org/configuration/mode/).
 */
/******/ (() => { // webpackBootstrap
/******/ 	var __webpack_modules__ = ({

/***/ "./front/js/common.js":
/*!****************************!*\
  !*** ./front/js/common.js ***!
  \****************************/
/***/ (() => {

eval("function rpcGet(url,param,CBF,CBP) {\r\n    showLoading();\r\n    $.get(url,param)\r\n    .done((res)=>CBF(res,CBP))\r\n    .fail(rpcFail)\r\n    .always(hideLoading)\r\n}\r\n\r\nfunction includeHTML(title) {\r\n    rpcGet(hostUrl+'/html/'+title+'.html','',CBHTML,title);\r\n}\r\n\r\nfunction clearHead(head) {\r\n    var cmd = false;\r\n    var tempArr = [];\r\n    \r\n    head.childNodes.forEach((e,idx)=>{        \r\n        if(idx %2 === 1) {\r\n            if(cmd) tempArr.push(e);\r\n            if(e.nodeName === '#comment') cmd = true;\r\n        }\r\n    });\r\n    tempArr.forEach(e=>{\r\n        head.removeChild(e);\r\n    })\r\n}\r\n\r\nfunction includeJS(head,title) {\r\n    const sc = document.createElement('script');\r\n    sc.src = `../js/${title}.js`;\r\n    head.appendChild(sc);\r\n}\r\n\r\nfunction includeCSS(head,title) {\r\n    const link = document.createElement('link');\r\n    link.rel = 'stylesheet';\r\n    link.href = `../css/${title}.css`;\r\n    head.appendChild(link);\r\n}\r\n\r\nconst CBHTML = (res,title) => {\r\n    const head = $('head')[0];\r\n    clearHead(head);\r\n    includeJS(head,title);\r\n    includeCSS(head,title)\r\n    $('#app').html(res);\r\n}\r\n\r\nfunction rpcFail() {\r\n    alert('서버 관리자에게 문의해주세요');\r\n}\r\n\r\nfunction showLoading() {\r\n    $(\"#loading\").show();\r\n}\r\n\r\nfunction hideLoading() {\r\n    $(\"#loading\").hide();\r\n}\n\n//# sourceURL=webpack://startup/./front/js/common.js?");

/***/ })

/******/ 	});
/************************************************************************/
/******/ 	
/******/ 	// startup
/******/ 	// Load entry module and return exports
/******/ 	// This entry module can't be inlined because the eval devtool is used.
/******/ 	var __webpack_exports__ = {};
/******/ 	__webpack_modules__["./front/js/common.js"]();
/******/ 	
/******/ })()
;