/*
 * ATTENTION: The "eval" devtool has been used (maybe by default in mode: "development").
 * This devtool is neither made for production nor for readable output files.
 * It uses "eval()" calls to create a separate source file in the browser devtools.
 * If you are trying to read the output file, select a different devtool (https://webpack.js.org/configuration/devtool/)
 * or disable the default devtool with "devtool: false".
 * If you are looking for production-ready output files, see mode: "production" (https://webpack.js.org/configuration/mode/).
 */
/******/ (() => { // webpackBootstrap
/******/ 	"use strict";
/******/ 	var __webpack_modules__ = ({

/***/ "./front/js/common.js":
/*!****************************!*\
  !*** ./front/js/common.js ***!
  \****************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

eval("__webpack_require__.r(__webpack_exports__);\n/* harmony export */ __webpack_require__.d(__webpack_exports__, {\n/* harmony export */   \"default\": () => (__WEBPACK_DEFAULT_EXPORT__)\n/* harmony export */ });\n/* harmony import */ var _rpc_js__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./rpc.js */ \"./front/js/rpc.js\");\n\r\n\r\nfunction clearHead(head) {\r\n    var cmd = false;\r\n    var tempArr = [];\r\n    \r\n    head.childNodes.forEach((e)=>{ \r\n        if((e.src || e.name === 'common' || e.tagName === 'LINK')) {\r\n            if(cmd) tempArr.push(e);\r\n            if(e.name === 'common') cmd = true;\r\n        }\r\n    });\r\n    tempArr.forEach(e=>{\r\n        head.removeChild(e);\r\n    })\r\n}\r\n\r\nfunction includeJS(head,title) {\r\n    const sc = document.createElement('script');\r\n    if(environment === 'develope') sc.src = `js/${title}.js`;\r\n    else sc.src = `${manifestObj[title]}`;    \r\n    sc.type = 'module';\r\n    head.appendChild(sc);\r\n}\r\n\r\nfunction includeCSS(head,title) {\r\n    const link = document.createElement('link');\r\n    link.rel = 'stylesheet';\r\n    link.href = `css/${title}.css`;\r\n    head.appendChild(link);\r\n}\r\n\r\nfunction CBHTML(res,title) {\r\n    const head = $('head')[0];\r\n    clearHead(head);\r\n    includeJS(head,title);\r\n    includeCSS(head,title);\r\n    $('#app').html(res);\r\n}\r\n\r\nfunction rpcFail() {\r\n    alert('서버 관리자에게 문의해주세요');\r\n}\r\n\r\nfunction showLoading() {\r\n    $(\"#loading\").show();\r\n}\r\n\r\nfunction hideLoading() {\r\n    $(\"#loading\").hide();\r\n}\r\n\r\nconst commonFunc = {\r\n    rpcGet(url,param,CBF,CBP) {\r\n        showLoading();\r\n        $.get(url,param)\r\n        .done((res)=>CBF(res,CBP))\r\n        .fail(rpcFail)\r\n        .always(hideLoading)\r\n    },\r\n    rpcPost(url,param,CBF,CBP) {\r\n        showLoading();\r\n        $.post(url,param)\r\n        .done((res)=>CBF(res,CBP))\r\n        .fail(rpcFail)\r\n        .always(hideLoading)\r\n    },\r\n    includeHTML(title) {\r\n        this.rpcGet(_rpc_js__WEBPACK_IMPORTED_MODULE_0__.default.hostUrl+'/html/'+title+'.html','',CBHTML,title);\r\n    },\r\n    randomString(type,length) {\r\n        if(!type) type = 'stringNumber';\r\n        if(!length) length = 32;\r\n\r\n        var res = '';\r\n        var target = '';\r\n        const str = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz';\r\n        const num = '0123456789';\r\n\r\n        if(type === 'string') {\r\n            target = str;\r\n        }\r\n        else if(type === 'number') {\r\n            target = num;\r\n        }\r\n        else if(type === 'stringNumber') {\r\n            target = str + num;\r\n        }\r\n        else if(type === 'hex') {\r\n            target = num + 'abcdef';\r\n        }\r\n\r\n        for(var i = 0; i < length; i++) {\r\n            res += target.charAt(Math.floor(Math.random() * target.length));\r\n        }\r\n\r\n        return res;\r\n    },\r\n}\r\n\r\n/* harmony default export */ const __WEBPACK_DEFAULT_EXPORT__ = (commonFunc);\n\n//# sourceURL=webpack://startup/./front/js/common.js?");

/***/ }),

/***/ "./front/js/login.js":
/*!***************************!*\
  !*** ./front/js/login.js ***!
  \***************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

<<<<<<< HEAD:public/js/login.4ae85d174e37fd032c43.js
eval("__webpack_require__.r(__webpack_exports__);\n/* harmony import */ var _common__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./common */ \"./front/js/common.js\");\n/* harmony import */ var _rpc__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ./rpc */ \"./front/js/rpc.js\");\n/* harmony import */ var _css_login_css__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ../css/login.css */ \"./front/css/login.css\");\n\r\n\r\n\r\n\r\n$(function(){\r\n    var naver_client_id = 'qZEYV_9Dnf7uxDSIELMm';\r\n    var state = _common__WEBPACK_IMPORTED_MODULE_0__.default.randomString();\r\n    var naver_redirectURI = encodeURI(_rpc__WEBPACK_IMPORTED_MODULE_1__.default.snsCBUrl);\r\n    \r\n    var naver_api_url = 'https://nid.naver.com/oauth2.0/authorize?response_type=code&client_id=' + naver_client_id + '&redirect_uri=' + naver_redirectURI + '&state=' + state;\r\n    $('#naverLoginBtn').click(function() {\r\n        location.href = naver_api_url\r\n    })\r\n});\n\n//# sourceURL=webpack://startup/./front/js/login.js?");
=======
eval("__webpack_require__.r(__webpack_exports__);\n/* harmony import */ var _common_js__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./common.js */ \"./front/js/common.js\");\n/* harmony import */ var _rpc_js__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ./rpc.js */ \"./front/js/rpc.js\");\n/* harmony import */ var _css_login_css__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ../css/login.css */ \"./front/css/login.css\");\n\r\n\r\n\r\n\r\n$(function(){\r\n    $('#joinBtn').on(\"click\",()=>{\r\n        _common_js__WEBPACK_IMPORTED_MODULE_0__.default.includeHTML('join');\r\n    });\r\n    var naver_client_id = 'qZEYV_9Dnf7uxDSIELMm';\r\n    var state = _common_js__WEBPACK_IMPORTED_MODULE_0__.default.randomString();\r\n    var naver_redirectURI = encodeURI(_rpc_js__WEBPACK_IMPORTED_MODULE_1__.default.snsCBUrl);\r\n    \r\n    var naver_api_url = 'https://nid.naver.com/oauth2.0/authorize?response_type=code&client_id=' + naver_client_id + '&redirect_uri=' + naver_redirectURI + '&state=' + state;\r\n    $('#naver_id_login').click(function() {\r\n        location.href = naver_api_url\r\n    })\r\n});\n\n//# sourceURL=webpack://startup/./front/js/login.js?");
>>>>>>> 15af048 (이제 npm run build안하고 node run.js실행만하면 프론트 바뀜):public/js/login.7c9d056875b5fd56608f.js

/***/ }),

/***/ "./front/js/rpc.js":
/*!*************************!*\
  !*** ./front/js/rpc.js ***!
  \*************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

eval("__webpack_require__.r(__webpack_exports__);\n/* harmony export */ __webpack_require__.d(__webpack_exports__, {\n/* harmony export */   \"default\": () => (__WEBPACK_DEFAULT_EXPORT__)\n/* harmony export */ });\nconst protocol = location.protocol;\r\nconst hostName = location.hostname;\r\nconst port = (location.port !== '')? ':' + location.port : location.port;\r\n\r\nconst hostUrl   = protocol + '//' + hostName + port;\r\n\r\nconst snsUrl    = hostUrl + '/sns';\r\nconst snsCBUrl  = snsUrl + '/cb';\r\n\r\nconst tokenUrl  = hostUrl + '/token';\r\nconst checkUrl  = tokenUrl + '/check';\r\n\r\nconst crosswordUrl = hostUrl + '/crossword';\r\n\r\nconst rpc = {\r\n    hostUrl : hostUrl,\r\n    crosswordSearchUrl : crosswordUrl + '/search',\r\n    snsCBUrl : snsCBUrl,\r\n    checkUrl : checkUrl\r\n}\r\n\r\n/* harmony default export */ const __WEBPACK_DEFAULT_EXPORT__ = (rpc);\n\n//# sourceURL=webpack://startup/./front/js/rpc.js?");

/***/ }),

/***/ "./front/css/login.css":
/*!*****************************!*\
  !*** ./front/css/login.css ***!
  \*****************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

eval("__webpack_require__.r(__webpack_exports__);\n// extracted by mini-css-extract-plugin\n\n\n//# sourceURL=webpack://startup/./front/css/login.css?");

/***/ })

/******/ 	});
/************************************************************************/
/******/ 	// The module cache
/******/ 	var __webpack_module_cache__ = {};
/******/ 	
/******/ 	// The require function
/******/ 	function __webpack_require__(moduleId) {
/******/ 		// Check if module is in cache
/******/ 		var cachedModule = __webpack_module_cache__[moduleId];
/******/ 		if (cachedModule !== undefined) {
/******/ 			return cachedModule.exports;
/******/ 		}
/******/ 		// Create a new module (and put it into the cache)
/******/ 		var module = __webpack_module_cache__[moduleId] = {
/******/ 			// no module.id needed
/******/ 			// no module.loaded needed
/******/ 			exports: {}
/******/ 		};
/******/ 	
/******/ 		// Execute the module function
/******/ 		__webpack_modules__[moduleId](module, module.exports, __webpack_require__);
/******/ 	
/******/ 		// Return the exports of the module
/******/ 		return module.exports;
/******/ 	}
/******/ 	
/************************************************************************/
/******/ 	/* webpack/runtime/define property getters */
/******/ 	(() => {
/******/ 		// define getter functions for harmony exports
/******/ 		__webpack_require__.d = (exports, definition) => {
/******/ 			for(var key in definition) {
/******/ 				if(__webpack_require__.o(definition, key) && !__webpack_require__.o(exports, key)) {
/******/ 					Object.defineProperty(exports, key, { enumerable: true, get: definition[key] });
/******/ 				}
/******/ 			}
/******/ 		};
/******/ 	})();
/******/ 	
/******/ 	/* webpack/runtime/hasOwnProperty shorthand */
/******/ 	(() => {
/******/ 		__webpack_require__.o = (obj, prop) => (Object.prototype.hasOwnProperty.call(obj, prop))
/******/ 	})();
/******/ 	
/******/ 	/* webpack/runtime/make namespace object */
/******/ 	(() => {
/******/ 		// define __esModule on exports
/******/ 		__webpack_require__.r = (exports) => {
/******/ 			if(typeof Symbol !== 'undefined' && Symbol.toStringTag) {
/******/ 				Object.defineProperty(exports, Symbol.toStringTag, { value: 'Module' });
/******/ 			}
/******/ 			Object.defineProperty(exports, '__esModule', { value: true });
/******/ 		};
/******/ 	})();
/******/ 	
/************************************************************************/
/******/ 	
/******/ 	// startup
/******/ 	// Load entry module and return exports
/******/ 	// This entry module can't be inlined because the eval devtool is used.
/******/ 	var __webpack_exports__ = __webpack_require__("./front/js/login.js");
/******/ 	
/******/ })()
;