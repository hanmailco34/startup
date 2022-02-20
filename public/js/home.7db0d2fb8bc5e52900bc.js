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

eval("__webpack_require__.r(__webpack_exports__);\n/* harmony export */ __webpack_require__.d(__webpack_exports__, {\n/* harmony export */   \"default\": () => (__WEBPACK_DEFAULT_EXPORT__)\n/* harmony export */ });\n/* harmony import */ var _rpc_js__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./rpc.js */ \"./front/js/rpc.js\");\n/* harmony import */ var _global_js__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ./global.js */ \"./front/js/global.js\");\n\r\n\r\n\r\nfunction clearHead(head) {\r\n    var cmd = false;\r\n    var tempArr = [];\r\n    \r\n    head.childNodes.forEach((e)=>{ \r\n        if((e.src || e.name === 'common' || e.tagName === 'LINK')) {\r\n            if(cmd) tempArr.push(e);\r\n            if(e.name === 'common') cmd = true;\r\n        }\r\n    });\r\n    tempArr.forEach(e=>{\r\n        head.removeChild(e);\r\n    })\r\n}\r\n\r\nfunction includeJS(head,title,module) {\r\n    if(module === undefined) module = true;\r\n    const sc = document.createElement('script');\r\n    //TODO\r\n    if(environment === 'development' || title.indexOf('component/js') >= 0) {\r\n        if(title.indexOf('/') === -1) sc.src = `js/${title}.js`;\r\n        else sc.src = title + '.js';\r\n    }\r\n    else sc.src = `${manifestObj[title]}`;    \r\n    if(module) sc.type = 'module';\r\n    head.appendChild(sc);\r\n}\r\n\r\nfunction includeCSS(head,title) {\r\n    const link = document.createElement('link');\r\n    link.rel = 'stylesheet';\r\n    if(title.indexOf('/') === -1) link.href = `css/${title}.css`;\r\n    else link.href = title + '.css';\r\n    head.appendChild(link);\r\n}\r\n\r\nfunction CBHTML(res,param) {\r\n    var tag, container, title = '';\r\n    \r\n    if(typeof param === 'string') {\r\n        tag             = $('head')[0];\r\n        container       = 'app';\r\n        title           = param;\r\n        _global_js__WEBPACK_IMPORTED_MODULE_1__.default.history  = title;\r\n        if(title !== 'login') {\r\n            var sessionData = {\r\n                'history' : title\r\n            }\r\n            commonFunc.session(sessionData);\r\n        }\r\n        backShowHeader(title);\r\n        clearHead(tag);\r\n    }\r\n    else {\r\n        tag       = $(param.tag)[0];\r\n        container = param.tag;\r\n        title     = param.title;\r\n    }\r\n    \r\n    includeJS(tag,title);\r\n    includeCSS(tag,title);\r\n    $(`#${container}`).html(res);\r\n}\r\n\r\nfunction rpcFail() {\r\n    alert('서버 관리자에게 문의해주세요');\r\n}\r\n\r\nfunction showLoading() {\r\n    $(\"#loading\").show();\r\n}\r\n\r\nfunction hideLoading() {\r\n    $(\"#loading\").hide();\r\n}\r\n\r\nfunction showAlert(obj) {\r\n    $('#alert_container').addClass('show');\r\n\r\n    for(const [k,v] of Object.entries(obj)) {\r\n        if(v) {\r\n            $(`#alert_${k}`).addClass('show');\r\n            if(k === 'icon') {\r\n                $('#alert_icon').addClass(v);\r\n                $(`#alert_${v}`).addClass('show');       \r\n            }\r\n        }\r\n    }\r\n\r\n    if(obj.confirm !== false) $('#alert_confirm').addClass('show');\r\n}\r\n\r\nfunction hideAlert(_id, obj) {\r\n    $('#alert_container').removeClass('show');\r\n\r\n    for(const [k,v] of Object.entries(obj)) {\r\n        if(v) {\r\n            $(`#alert_${k}`).removeClass('show');\r\n            if(k === 'icon') {\r\n                $('#alert_icon').removeClass(v);\r\n                $(`#alert_${v}`).removeClass('show');       \r\n            }\r\n        }\r\n    }\r\n\r\n    if(obj.confirm !== false) $('#alert_confirm').removeClass('show');\r\n\r\n    if(_id === 'alert_confirm' && typeof obj.isConfirmed === 'function') {\r\n        obj.isConfirmed();\r\n    }\r\n\r\n    if(_id === 'alert_deny' && typeof obj.isDenied === 'function') {\r\n        obj.isDenied();\r\n    }\r\n}\r\n\r\nfunction backShowHeader(title) {\r\n    if(title === 'home') $('#header_back').hide();\r\n    else $('#header_back').show();\r\n}\r\n\r\nconst commonFunc = {\r\n    rpcCall(option) {\r\n        const token = this.getCookie('access_token');\r\n        var param = {\r\n            url     : option.url\r\n        }\r\n\r\n        if(option.headers)  param['headers'] = option.headers;\r\n        \r\n        if(option.method)   param['method'] = option.method;\r\n        else                param['method'] = 'POST';\r\n\r\n        if(option.data)     param['data'] = options.data;\r\n\r\n        $.ajax(param)\r\n        .done((res)=>option.CBF(res,option.CBP))\r\n        .fail(rpcFail)\r\n        .always(hideLoading)\r\n    },\r\n    includeJavascript(param) {\r\n        includeJS($(param.tag)[0], param.title, param.module)\r\n    },\r\n    includeStyleSheet(param) {\r\n        includeCSS($(param.tag)[0], param.title)\r\n    },\r\n    includeHTML(param) {\r\n        var rpcOption = {\r\n            CBF : CBHTML,\r\n            CBP : param,\r\n            method : 'get'\r\n        };\r\n        if(typeof param === 'string') {\r\n            rpcOption['url'] = _rpc_js__WEBPACK_IMPORTED_MODULE_0__.default.hostUrl+'/html/'+param+'.html';\r\n        }\r\n        else {\r\n            rpcOption['url'] = _rpc_js__WEBPACK_IMPORTED_MODULE_0__.default.hostUrl+'/html/'+param.title+'.html';\r\n        }\r\n        this.rpcCall(rpcOption);\r\n    },\r\n    randomString(type,length) {\r\n        if(!type) type = 'stringNumber';\r\n        if(!length) length = 32;\r\n\r\n        var res = '';\r\n        var target = '';\r\n        const str = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz';\r\n        const num = '0123456789';\r\n\r\n        if(type === 'string') {\r\n            target = str;\r\n        }\r\n        else if(type === 'number') {\r\n            target = num;\r\n        }\r\n        else if(type === 'stringNumber') {\r\n            target = str + num;\r\n        }\r\n        else if(type === 'hex') {\r\n            target = num + 'abcdef';\r\n        }\r\n\r\n        for(var i = 0; i < length; i++) {\r\n            res += target.charAt(Math.floor(Math.random() * target.length));\r\n        }\r\n\r\n        return res;\r\n    },\r\n    alert(title,content,icon) {\r\n        \r\n        const obj = {};\r\n\r\n        if(typeof title === 'string') {\r\n            obj['title'] = title;\r\n            obj['content'] = content;\r\n            obj['icon'] = icon;            \r\n        }\r\n        else {\r\n            Object.assign(obj, title);\r\n        }        \r\n\r\n        $('#alert_title').html(obj.title);\r\n        $('#alert_content').html(obj.content);\r\n        $('#alert_footer').html(obj.footer);\r\n        $('#alert_confirm').html('OK');\r\n        $('#alert_deny').html('NO');\r\n        $('#alert_cancel').html('CANCEL');\r\n\r\n        if(obj.confirmText) {\r\n            $('#alert_confirm').html(obj.confirmText);\r\n        }\r\n\r\n        if(obj.denyText) {\r\n            $('#alert_deny').html(obj.denyText);\r\n        }\r\n\r\n        if(obj.cancelText) {\r\n            $('#alert_cancel').html(obj.cancelText);\r\n        }\r\n\r\n        if(obj.image) {\r\n            $('#alert_image').css('width','');\r\n            $('#alert_image').css('height','');\r\n            $('#alert_image').attr('src',obj.image);\r\n            if(obj.imageWidth) $('#alert_image').css('width',obj.imageWidth);\r\n            if(obj.imageHeight) $('#alert_image').css('width',obj.imageHeight);\r\n        }\r\n\r\n        showAlert(obj);\r\n\r\n        $(\"[name='alert_btn']\").off().on('click', function() {\r\n            hideAlert(this.id, obj);\r\n        });\r\n\r\n        if(obj.time) {\r\n            setTimeout(() => hideAlert('time', obj),obj.time);\r\n        }\r\n\r\n        $('#alert_container').off().on('click', function(e) {\r\n            if(e.target.id === 'alert_container') hideAlert('container', obj);\r\n        });        \r\n    },\r\n    session(data, cmd) {\r\n        if(!cmd) cmd = 'insert';\r\n\r\n        if(cmd === 'insert') {\r\n            for(const [k,v] of Object.entries(data)) {\r\n                sessionStorage.setItem(k, v);\r\n            }\r\n        }\r\n        else if(cmd === 'delete') {\r\n            if(typeof data === 'string') {\r\n                sessionStorage.removeItem(data);\r\n            }\r\n            else {\r\n                for(let i = 0; i < data.length; i++) {\r\n                    let key = data[i];\r\n                    sessionStorage.removeItem(key);\r\n                }\r\n            }            \r\n        }\r\n        else if(cmd === 'get') {\r\n            var obj = {};\r\n            if(typeof data === 'string') {\r\n                obj[data] = sessionStorage.getItem(data);\r\n            }\r\n            else {\r\n                for(let i = 0; i < data.length; i++) {\r\n                    let key = data[i];\r\n                    obj[key] = sessionStorage.getItem(key);\r\n                }\r\n            }\r\n            return obj;\r\n        }\r\n    },\r\n    numberFormat(num) {\r\n        if(typeof num === 'number') {\r\n            return num.toString().replace(/\\B(?<!\\.\\d*)(?=(\\d{3})+(?!\\d))/g,\",\");\r\n        }\r\n        else if(typeof num === 'string') {\r\n            return parseFloat(num.replace(/,/g,\"\"));\r\n        }\r\n    },\r\n    getCookie(key) {\r\n        var cookie = document.cookie.split(';');\r\n        for(var i = 0; i < cookie.length; i++) {\r\n            var item = cookie[i].split('=');\r\n            if(key === item[0]) return item[1];\r\n        }\r\n        return null;\r\n    }\r\n}\r\n\r\n/* harmony default export */ const __WEBPACK_DEFAULT_EXPORT__ = (commonFunc);\n\n//# sourceURL=webpack://startup/./front/js/common.js?");

/***/ }),

/***/ "./front/js/global.js":
/*!****************************!*\
  !*** ./front/js/global.js ***!
  \****************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

eval("__webpack_require__.r(__webpack_exports__);\n/* harmony export */ __webpack_require__.d(__webpack_exports__, {\n/* harmony export */   \"default\": () => (__WEBPACK_DEFAULT_EXPORT__)\n/* harmony export */ });\nvar history;\r\nvar latlng;\r\nconst backHistory = [\r\n    'home',\r\n    ['missing','food'],\r\n    [['disappearance'],['foodUpload']]\r\n]\r\n\r\nvar global = {\r\n    history : history,\r\n    latlng : latlng,\r\n    backHistory : backHistory\r\n}\r\n\r\n/* harmony default export */ const __WEBPACK_DEFAULT_EXPORT__ = (global);\n\n//# sourceURL=webpack://startup/./front/js/global.js?");

/***/ }),

/***/ "./front/js/home.js":
/*!**************************!*\
  !*** ./front/js/home.js ***!
  \**************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

eval("__webpack_require__.r(__webpack_exports__);\n/* harmony import */ var _css_home_css__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ../css/home.css */ \"./front/css/home.css\");\n/* harmony import */ var _common_js__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ./common.js */ \"./front/js/common.js\");\n\r\n\r\n\r\n$(function() {\r\n    $('.home_box').off().on('click', function() {\r\n        const id = $(this).data('id');\r\n        if(!id) {\r\n            _common_js__WEBPACK_IMPORTED_MODULE_1__.default.alert('서비스 준비중','다른 서비스를 이용해주세요','info');\r\n        }\r\n        else {\r\n            _common_js__WEBPACK_IMPORTED_MODULE_1__.default.includeHTML(id);\r\n        }\r\n    });\r\n});\n\n//# sourceURL=webpack://startup/./front/js/home.js?");

/***/ }),

/***/ "./front/js/rpc.js":
/*!*************************!*\
  !*** ./front/js/rpc.js ***!
  \*************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

eval("__webpack_require__.r(__webpack_exports__);\n/* harmony export */ __webpack_require__.d(__webpack_exports__, {\n/* harmony export */   \"default\": () => (__WEBPACK_DEFAULT_EXPORT__)\n/* harmony export */ });\nconst protocol = location.protocol;\r\nconst hostName = location.hostname;\r\nconst port = (location.port !== '')? ':' + location.port : location.port;\r\n\r\nconst hostUrl   = protocol + '//' + hostName + port;\r\n\r\nconst snsUrl    = hostUrl + '/sns';\r\nconst snsCBUrl  = snsUrl + '/cb';\r\n\r\nconst tokenUrl  = hostUrl + '/token';\r\nconst checkUrl  = tokenUrl + '/check';\r\n\r\nconst crosswordUrl = hostUrl + '/crossword';\r\n\r\nconst rpc = {\r\n    hostUrl : hostUrl,\r\n    crosswordSearchUrl : crosswordUrl + '/search',\r\n    snsCBUrl : snsCBUrl,\r\n    checkUrl : checkUrl\r\n}\r\n\r\n/* harmony default export */ const __WEBPACK_DEFAULT_EXPORT__ = (rpc);\n\n//# sourceURL=webpack://startup/./front/js/rpc.js?");

/***/ }),

/***/ "./front/css/home.css":
/*!****************************!*\
  !*** ./front/css/home.css ***!
  \****************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

eval("__webpack_require__.r(__webpack_exports__);\n// extracted by mini-css-extract-plugin\n\n\n//# sourceURL=webpack://startup/./front/css/home.css?");

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
/******/ 	var __webpack_exports__ = __webpack_require__("./front/js/home.js");
/******/ 	
/******/ })()
;