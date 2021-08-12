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

eval("__webpack_require__.r(__webpack_exports__);\n/* harmony export */ __webpack_require__.d(__webpack_exports__, {\n/* harmony export */   \"default\": () => (__WEBPACK_DEFAULT_EXPORT__)\n/* harmony export */ });\n/* harmony import */ var _css_common_css__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ../css/common.css */ \"./front/css/common.css\");\n/* harmony import */ var _rpc__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ./rpc */ \"./front/js/rpc.js\");\n\r\n\r\n\r\nfunction clearHead(head) {\r\n    var cmd = false;\r\n    var tempArr = [];\r\n    \r\n    head.childNodes.forEach((e,idx)=>{        \r\n        if(idx % 2 === 1 && e.src) {\r\n            if(cmd) tempArr.push(e);\r\n            if(e.src.indexOf('index') !== -1) cmd = true;\r\n        }\r\n    });\r\n    tempArr.forEach(e=>{\r\n        head.removeChild(e);\r\n    })\r\n}\r\n\r\nfunction includeCSS(head,title) {\r\n    const link = document.createElement('link');\r\n    link.rel = 'stylesheet';\r\n    link.href = `css/${title}.css`;\r\n    head.appendChild(link);\r\n}\r\n\r\nfunction CBHTML(res,title) {\r\n    const head = $('head')[0];\r\n    clearHead(head);\r\n    includeCSS(head,title)\r\n    $('#app').html(res);\r\n}\r\n\r\nfunction rpcFail() {\r\n    alert('서버 관리자에게 문의해주세요');\r\n}\r\n\r\nfunction showLoading() {\r\n    $(\"#loading\").show();\r\n}\r\n\r\nfunction hideLoading() {\r\n    $(\"#loading\").hide();\r\n}\r\n\r\nconst commonFunc = {\r\n    rpcGet(url,param,CBF,CBP) {\r\n        showLoading();\r\n        $.get(url,param)\r\n        .done((res)=>CBF(res,CBP))\r\n        .fail(rpcFail)\r\n        .always(hideLoading)\r\n    },\r\n    includeHTML(title) {\r\n        this.rpcGet(_rpc__WEBPACK_IMPORTED_MODULE_1__.default.hostUrl+'/html/'+title+'.html','',CBHTML,title);\r\n    },    \r\n}\r\n\r\n/* harmony default export */ const __WEBPACK_DEFAULT_EXPORT__ = (commonFunc);\n\n//# sourceURL=webpack://startup/./front/js/common.js?");

/***/ }),

/***/ "./front/js/login.js":
/*!***************************!*\
  !*** ./front/js/login.js ***!
  \***************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

eval("__webpack_require__.r(__webpack_exports__);\n/* harmony import */ var _common_js__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./common.js */ \"./front/js/common.js\");\n/* harmony import */ var _html_login_html__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ../html/login.html */ \"./front/html/login.html\");\n\r\n\r\n\r\nfunction go(title) {\r\n    _common_js__WEBPACK_IMPORTED_MODULE_0__.default.includeHTML(title);\r\n}\n\n//# sourceURL=webpack://startup/./front/js/login.js?");

/***/ }),

/***/ "./front/js/rpc.js":
/*!*************************!*\
  !*** ./front/js/rpc.js ***!
  \*************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

eval("__webpack_require__.r(__webpack_exports__);\n/* harmony export */ __webpack_require__.d(__webpack_exports__, {\n/* harmony export */   \"default\": () => (__WEBPACK_DEFAULT_EXPORT__)\n/* harmony export */ });\nconst protocol = location.protocol;\r\nconst hostName = location.hostname;\r\nconst port = (location.port !== '')? ':' + location.port : location.port;\r\n\r\nconst hostUrl = protocol + '//' + hostName + port;\r\n\r\nconst testUrl = hostUrl + '/test';\r\n\r\nconst rpc = {\r\n    hostUrl : hostUrl,\r\n    testGetUrl : testUrl + '/get'\r\n}\r\n\r\n/* harmony default export */ const __WEBPACK_DEFAULT_EXPORT__ = (rpc);\n\n//# sourceURL=webpack://startup/./front/js/rpc.js?");

/***/ }),

/***/ "./front/html/login.html":
/*!*******************************!*\
  !*** ./front/html/login.html ***!
  \*******************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

eval("__webpack_require__.r(__webpack_exports__);\n/* harmony export */ __webpack_require__.d(__webpack_exports__, {\n/* harmony export */   \"default\": () => (__WEBPACK_DEFAULT_EXPORT__)\n/* harmony export */ });\n// Module\nvar code = \"<div> 로그인페이지 </div> <button onclick='includeHTML(\\\"join\\\")'>회원가입이동</button>\";\n// Exports\n/* harmony default export */ const __WEBPACK_DEFAULT_EXPORT__ = (code);\n\n//# sourceURL=webpack://startup/./front/html/login.html?");

/***/ }),

/***/ "./front/css/common.css":
/*!******************************!*\
  !*** ./front/css/common.css ***!
  \******************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

eval("__webpack_require__.r(__webpack_exports__);\n// extracted by mini-css-extract-plugin\n\n\n//# sourceURL=webpack://startup/./front/css/common.css?");

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