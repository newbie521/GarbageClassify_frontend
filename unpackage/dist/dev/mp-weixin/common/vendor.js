(global["webpackJsonp"] = global["webpackJsonp"] || []).push([["common/vendor"],{

/***/ 1:
/*!************************************************************!*\
  !*** ./node_modules/@dcloudio/uni-mp-weixin/dist/index.js ***!
  \************************************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

"use strict";
/* WEBPACK VAR INJECTION */(function(global) {Object.defineProperty(exports, "__esModule", { value: true });exports.createApp = createApp;exports.createComponent = createComponent;exports.createPage = createPage;exports.createPlugin = createPlugin;exports.createSubpackageApp = createSubpackageApp;exports.default = void 0;var _vue = _interopRequireDefault(__webpack_require__(/*! vue */ 3));
var _uniI18n = __webpack_require__(/*! @dcloudio/uni-i18n */ 4);function _interopRequireDefault(obj) {return obj && obj.__esModule ? obj : { default: obj };}function ownKeys(object, enumerableOnly) {var keys = Object.keys(object);if (Object.getOwnPropertySymbols) {var symbols = Object.getOwnPropertySymbols(object);if (enumerableOnly) symbols = symbols.filter(function (sym) {return Object.getOwnPropertyDescriptor(object, sym).enumerable;});keys.push.apply(keys, symbols);}return keys;}function _objectSpread(target) {for (var i = 1; i < arguments.length; i++) {var source = arguments[i] != null ? arguments[i] : {};if (i % 2) {ownKeys(Object(source), true).forEach(function (key) {_defineProperty(target, key, source[key]);});} else if (Object.getOwnPropertyDescriptors) {Object.defineProperties(target, Object.getOwnPropertyDescriptors(source));} else {ownKeys(Object(source)).forEach(function (key) {Object.defineProperty(target, key, Object.getOwnPropertyDescriptor(source, key));});}}return target;}function _slicedToArray(arr, i) {return _arrayWithHoles(arr) || _iterableToArrayLimit(arr, i) || _unsupportedIterableToArray(arr, i) || _nonIterableRest();}function _nonIterableRest() {throw new TypeError("Invalid attempt to destructure non-iterable instance.\nIn order to be iterable, non-array objects must have a [Symbol.iterator]() method.");}function _iterableToArrayLimit(arr, i) {if (typeof Symbol === "undefined" || !(Symbol.iterator in Object(arr))) return;var _arr = [];var _n = true;var _d = false;var _e = undefined;try {for (var _i = arr[Symbol.iterator](), _s; !(_n = (_s = _i.next()).done); _n = true) {_arr.push(_s.value);if (i && _arr.length === i) break;}} catch (err) {_d = true;_e = err;} finally {try {if (!_n && _i["return"] != null) _i["return"]();} finally {if (_d) throw _e;}}return _arr;}function _arrayWithHoles(arr) {if (Array.isArray(arr)) return arr;}function _defineProperty(obj, key, value) {if (key in obj) {Object.defineProperty(obj, key, { value: value, enumerable: true, configurable: true, writable: true });} else {obj[key] = value;}return obj;}function _toConsumableArray(arr) {return _arrayWithoutHoles(arr) || _iterableToArray(arr) || _unsupportedIterableToArray(arr) || _nonIterableSpread();}function _nonIterableSpread() {throw new TypeError("Invalid attempt to spread non-iterable instance.\nIn order to be iterable, non-array objects must have a [Symbol.iterator]() method.");}function _unsupportedIterableToArray(o, minLen) {if (!o) return;if (typeof o === "string") return _arrayLikeToArray(o, minLen);var n = Object.prototype.toString.call(o).slice(8, -1);if (n === "Object" && o.constructor) n = o.constructor.name;if (n === "Map" || n === "Set") return Array.from(o);if (n === "Arguments" || /^(?:Ui|I)nt(?:8|16|32)(?:Clamped)?Array$/.test(n)) return _arrayLikeToArray(o, minLen);}function _iterableToArray(iter) {if (typeof Symbol !== "undefined" && Symbol.iterator in Object(iter)) return Array.from(iter);}function _arrayWithoutHoles(arr) {if (Array.isArray(arr)) return _arrayLikeToArray(arr);}function _arrayLikeToArray(arr, len) {if (len == null || len > arr.length) len = arr.length;for (var i = 0, arr2 = new Array(len); i < len; i++) {arr2[i] = arr[i];}return arr2;}

var realAtob;

var b64 = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789+/=';
var b64re = /^(?:[A-Za-z\d+/]{4})*?(?:[A-Za-z\d+/]{2}(?:==)?|[A-Za-z\d+/]{3}=?)?$/;

if (typeof atob !== 'function') {
  realAtob = function realAtob(str) {
    str = String(str).replace(/[\t\n\f\r ]+/g, '');
    if (!b64re.test(str)) {throw new Error("Failed to execute 'atob' on 'Window': The string to be decoded is not correctly encoded.");}

    // Adding the padding if missing, for semplicity
    str += '=='.slice(2 - (str.length & 3));
    var bitmap;var result = '';var r1;var r2;var i = 0;
    for (; i < str.length;) {
      bitmap = b64.indexOf(str.charAt(i++)) << 18 | b64.indexOf(str.charAt(i++)) << 12 |
      (r1 = b64.indexOf(str.charAt(i++))) << 6 | (r2 = b64.indexOf(str.charAt(i++)));

      result += r1 === 64 ? String.fromCharCode(bitmap >> 16 & 255) :
      r2 === 64 ? String.fromCharCode(bitmap >> 16 & 255, bitmap >> 8 & 255) :
      String.fromCharCode(bitmap >> 16 & 255, bitmap >> 8 & 255, bitmap & 255);
    }
    return result;
  };
} else {
  // 注意atob只能在全局对象上调用，例如：`const Base64 = {atob};Base64.atob('xxxx')`是错误的用法
  realAtob = atob;
}

function b64DecodeUnicode(str) {
  return decodeURIComponent(realAtob(str).split('').map(function (c) {
    return '%' + ('00' + c.charCodeAt(0).toString(16)).slice(-2);
  }).join(''));
}

function getCurrentUserInfo() {
  var token = wx.getStorageSync('uni_id_token') || '';
  var tokenArr = token.split('.');
  if (!token || tokenArr.length !== 3) {
    return {
      uid: null,
      role: [],
      permission: [],
      tokenExpired: 0 };

  }
  var userInfo;
  try {
    userInfo = JSON.parse(b64DecodeUnicode(tokenArr[1]));
  } catch (error) {
    throw new Error('获取当前用户信息出错，详细错误信息为：' + error.message);
  }
  userInfo.tokenExpired = userInfo.exp * 1000;
  delete userInfo.exp;
  delete userInfo.iat;
  return userInfo;
}

function uniIdMixin(Vue) {
  Vue.prototype.uniIDHasRole = function (roleId) {var _getCurrentUserInfo =


    getCurrentUserInfo(),role = _getCurrentUserInfo.role;
    return role.indexOf(roleId) > -1;
  };
  Vue.prototype.uniIDHasPermission = function (permissionId) {var _getCurrentUserInfo2 =


    getCurrentUserInfo(),permission = _getCurrentUserInfo2.permission;
    return this.uniIDHasRole('admin') || permission.indexOf(permissionId) > -1;
  };
  Vue.prototype.uniIDTokenValid = function () {var _getCurrentUserInfo3 =


    getCurrentUserInfo(),tokenExpired = _getCurrentUserInfo3.tokenExpired;
    return tokenExpired > Date.now();
  };
}

var _toString = Object.prototype.toString;
var hasOwnProperty = Object.prototype.hasOwnProperty;

function isFn(fn) {
  return typeof fn === 'function';
}

function isStr(str) {
  return typeof str === 'string';
}

function isPlainObject(obj) {
  return _toString.call(obj) === '[object Object]';
}

function hasOwn(obj, key) {
  return hasOwnProperty.call(obj, key);
}

function noop() {}

/**
                    * Create a cached version of a pure function.
                    */
function cached(fn) {
  var cache = Object.create(null);
  return function cachedFn(str) {
    var hit = cache[str];
    return hit || (cache[str] = fn(str));
  };
}

/**
   * Camelize a hyphen-delimited string.
   */
var camelizeRE = /-(\w)/g;
var camelize = cached(function (str) {
  return str.replace(camelizeRE, function (_, c) {return c ? c.toUpperCase() : '';});
});

var HOOKS = [
'invoke',
'success',
'fail',
'complete',
'returnValue'];


var globalInterceptors = {};
var scopedInterceptors = {};

function mergeHook(parentVal, childVal) {
  var res = childVal ?
  parentVal ?
  parentVal.concat(childVal) :
  Array.isArray(childVal) ?
  childVal : [childVal] :
  parentVal;
  return res ?
  dedupeHooks(res) :
  res;
}

function dedupeHooks(hooks) {
  var res = [];
  for (var i = 0; i < hooks.length; i++) {
    if (res.indexOf(hooks[i]) === -1) {
      res.push(hooks[i]);
    }
  }
  return res;
}

function removeHook(hooks, hook) {
  var index = hooks.indexOf(hook);
  if (index !== -1) {
    hooks.splice(index, 1);
  }
}

function mergeInterceptorHook(interceptor, option) {
  Object.keys(option).forEach(function (hook) {
    if (HOOKS.indexOf(hook) !== -1 && isFn(option[hook])) {
      interceptor[hook] = mergeHook(interceptor[hook], option[hook]);
    }
  });
}

function removeInterceptorHook(interceptor, option) {
  if (!interceptor || !option) {
    return;
  }
  Object.keys(option).forEach(function (hook) {
    if (HOOKS.indexOf(hook) !== -1 && isFn(option[hook])) {
      removeHook(interceptor[hook], option[hook]);
    }
  });
}

function addInterceptor(method, option) {
  if (typeof method === 'string' && isPlainObject(option)) {
    mergeInterceptorHook(scopedInterceptors[method] || (scopedInterceptors[method] = {}), option);
  } else if (isPlainObject(method)) {
    mergeInterceptorHook(globalInterceptors, method);
  }
}

function removeInterceptor(method, option) {
  if (typeof method === 'string') {
    if (isPlainObject(option)) {
      removeInterceptorHook(scopedInterceptors[method], option);
    } else {
      delete scopedInterceptors[method];
    }
  } else if (isPlainObject(method)) {
    removeInterceptorHook(globalInterceptors, method);
  }
}

function wrapperHook(hook) {
  return function (data) {
    return hook(data) || data;
  };
}

function isPromise(obj) {
  return !!obj && (typeof obj === 'object' || typeof obj === 'function') && typeof obj.then === 'function';
}

function queue(hooks, data) {
  var promise = false;
  for (var i = 0; i < hooks.length; i++) {
    var hook = hooks[i];
    if (promise) {
      promise = Promise.resolve(wrapperHook(hook));
    } else {
      var res = hook(data);
      if (isPromise(res)) {
        promise = Promise.resolve(res);
      }
      if (res === false) {
        return {
          then: function then() {} };

      }
    }
  }
  return promise || {
    then: function then(callback) {
      return callback(data);
    } };

}

function wrapperOptions(interceptor) {var options = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : {};
  ['success', 'fail', 'complete'].forEach(function (name) {
    if (Array.isArray(interceptor[name])) {
      var oldCallback = options[name];
      options[name] = function callbackInterceptor(res) {
        queue(interceptor[name], res).then(function (res) {
          /* eslint-disable no-mixed-operators */
          return isFn(oldCallback) && oldCallback(res) || res;
        });
      };
    }
  });
  return options;
}

function wrapperReturnValue(method, returnValue) {
  var returnValueHooks = [];
  if (Array.isArray(globalInterceptors.returnValue)) {
    returnValueHooks.push.apply(returnValueHooks, _toConsumableArray(globalInterceptors.returnValue));
  }
  var interceptor = scopedInterceptors[method];
  if (interceptor && Array.isArray(interceptor.returnValue)) {
    returnValueHooks.push.apply(returnValueHooks, _toConsumableArray(interceptor.returnValue));
  }
  returnValueHooks.forEach(function (hook) {
    returnValue = hook(returnValue) || returnValue;
  });
  return returnValue;
}

function getApiInterceptorHooks(method) {
  var interceptor = Object.create(null);
  Object.keys(globalInterceptors).forEach(function (hook) {
    if (hook !== 'returnValue') {
      interceptor[hook] = globalInterceptors[hook].slice();
    }
  });
  var scopedInterceptor = scopedInterceptors[method];
  if (scopedInterceptor) {
    Object.keys(scopedInterceptor).forEach(function (hook) {
      if (hook !== 'returnValue') {
        interceptor[hook] = (interceptor[hook] || []).concat(scopedInterceptor[hook]);
      }
    });
  }
  return interceptor;
}

function invokeApi(method, api, options) {for (var _len = arguments.length, params = new Array(_len > 3 ? _len - 3 : 0), _key = 3; _key < _len; _key++) {params[_key - 3] = arguments[_key];}
  var interceptor = getApiInterceptorHooks(method);
  if (interceptor && Object.keys(interceptor).length) {
    if (Array.isArray(interceptor.invoke)) {
      var res = queue(interceptor.invoke, options);
      return res.then(function (options) {
        return api.apply(void 0, [wrapperOptions(interceptor, options)].concat(params));
      });
    } else {
      return api.apply(void 0, [wrapperOptions(interceptor, options)].concat(params));
    }
  }
  return api.apply(void 0, [options].concat(params));
}

var promiseInterceptor = {
  returnValue: function returnValue(res) {
    if (!isPromise(res)) {
      return res;
    }
    return new Promise(function (resolve, reject) {
      res.then(function (res) {
        if (res[0]) {
          reject(res[0]);
        } else {
          resolve(res[1]);
        }
      });
    });
  } };


var SYNC_API_RE =
/^\$|Window$|WindowStyle$|sendHostEvent|sendNativeEvent|restoreGlobal|getCurrentSubNVue|getMenuButtonBoundingClientRect|^report|interceptors|Interceptor$|getSubNVueById|requireNativePlugin|upx2px|hideKeyboard|canIUse|^create|Sync$|Manager$|base64ToArrayBuffer|arrayBufferToBase64|getLocale|setLocale/;

var CONTEXT_API_RE = /^create|Manager$/;

// Context例外情况
var CONTEXT_API_RE_EXC = ['createBLEConnection'];

// 同步例外情况
var ASYNC_API = ['createBLEConnection'];

var CALLBACK_API_RE = /^on|^off/;

function isContextApi(name) {
  return CONTEXT_API_RE.test(name) && CONTEXT_API_RE_EXC.indexOf(name) === -1;
}
function isSyncApi(name) {
  return SYNC_API_RE.test(name) && ASYNC_API.indexOf(name) === -1;
}

function isCallbackApi(name) {
  return CALLBACK_API_RE.test(name) && name !== 'onPush';
}

function handlePromise(promise) {
  return promise.then(function (data) {
    return [null, data];
  }).
  catch(function (err) {return [err];});
}

function shouldPromise(name) {
  if (
  isContextApi(name) ||
  isSyncApi(name) ||
  isCallbackApi(name))
  {
    return false;
  }
  return true;
}

/* eslint-disable no-extend-native */
if (!Promise.prototype.finally) {
  Promise.prototype.finally = function (callback) {
    var promise = this.constructor;
    return this.then(
    function (value) {return promise.resolve(callback()).then(function () {return value;});},
    function (reason) {return promise.resolve(callback()).then(function () {
        throw reason;
      });});

  };
}

function promisify(name, api) {
  if (!shouldPromise(name)) {
    return api;
  }
  return function promiseApi() {var options = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : {};for (var _len2 = arguments.length, params = new Array(_len2 > 1 ? _len2 - 1 : 0), _key2 = 1; _key2 < _len2; _key2++) {params[_key2 - 1] = arguments[_key2];}
    if (isFn(options.success) || isFn(options.fail) || isFn(options.complete)) {
      return wrapperReturnValue(name, invokeApi.apply(void 0, [name, api, options].concat(params)));
    }
    return wrapperReturnValue(name, handlePromise(new Promise(function (resolve, reject) {
      invokeApi.apply(void 0, [name, api, Object.assign({}, options, {
        success: resolve,
        fail: reject })].concat(
      params));
    })));
  };
}

var EPS = 1e-4;
var BASE_DEVICE_WIDTH = 750;
var isIOS = false;
var deviceWidth = 0;
var deviceDPR = 0;

function checkDeviceWidth() {var _wx$getSystemInfoSync =




  wx.getSystemInfoSync(),platform = _wx$getSystemInfoSync.platform,pixelRatio = _wx$getSystemInfoSync.pixelRatio,windowWidth = _wx$getSystemInfoSync.windowWidth; // uni=>wx runtime 编译目标是 uni 对象，内部不允许直接使用 uni

  deviceWidth = windowWidth;
  deviceDPR = pixelRatio;
  isIOS = platform === 'ios';
}

function upx2px(number, newDeviceWidth) {
  if (deviceWidth === 0) {
    checkDeviceWidth();
  }

  number = Number(number);
  if (number === 0) {
    return 0;
  }
  var result = number / BASE_DEVICE_WIDTH * (newDeviceWidth || deviceWidth);
  if (result < 0) {
    result = -result;
  }
  result = Math.floor(result + EPS);
  if (result === 0) {
    if (deviceDPR === 1 || !isIOS) {
      result = 1;
    } else {
      result = 0.5;
    }
  }
  return number < 0 ? -result : result;
}

function getLocale() {
  // 优先使用 $locale
  var app = getApp({
    allowDefault: true });

  if (app && app.$vm) {
    return app.$vm.$locale;
  }
  return wx.getSystemInfoSync().language || 'zh-Hans';
}

function setLocale(locale) {
  var app = getApp();
  if (!app) {
    return false;
  }
  var oldLocale = app.$vm.$locale;
  if (oldLocale !== locale) {
    app.$vm.$locale = locale;
    onLocaleChangeCallbacks.forEach(function (fn) {return fn({
        locale: locale });});

    return true;
  }
  return false;
}

var onLocaleChangeCallbacks = [];
function onLocaleChange(fn) {
  if (onLocaleChangeCallbacks.indexOf(fn) === -1) {
    onLocaleChangeCallbacks.push(fn);
  }
}

if (typeof global !== 'undefined') {
  global.getLocale = getLocale;
}

var interceptors = {
  promiseInterceptor: promiseInterceptor };


var baseApi = /*#__PURE__*/Object.freeze({
  __proto__: null,
  upx2px: upx2px,
  getLocale: getLocale,
  setLocale: setLocale,
  onLocaleChange: onLocaleChange,
  addInterceptor: addInterceptor,
  removeInterceptor: removeInterceptor,
  interceptors: interceptors });


function findExistsPageIndex(url) {
  var pages = getCurrentPages();
  var len = pages.length;
  while (len--) {
    var page = pages[len];
    if (page.$page && page.$page.fullPath === url) {
      return len;
    }
  }
  return -1;
}

var redirectTo = {
  name: function name(fromArgs) {
    if (fromArgs.exists === 'back' && fromArgs.delta) {
      return 'navigateBack';
    }
    return 'redirectTo';
  },
  args: function args(fromArgs) {
    if (fromArgs.exists === 'back' && fromArgs.url) {
      var existsPageIndex = findExistsPageIndex(fromArgs.url);
      if (existsPageIndex !== -1) {
        var delta = getCurrentPages().length - 1 - existsPageIndex;
        if (delta > 0) {
          fromArgs.delta = delta;
        }
      }
    }
  } };


var previewImage = {
  args: function args(fromArgs) {
    var currentIndex = parseInt(fromArgs.current);
    if (isNaN(currentIndex)) {
      return;
    }
    var urls = fromArgs.urls;
    if (!Array.isArray(urls)) {
      return;
    }
    var len = urls.length;
    if (!len) {
      return;
    }
    if (currentIndex < 0) {
      currentIndex = 0;
    } else if (currentIndex >= len) {
      currentIndex = len - 1;
    }
    if (currentIndex > 0) {
      fromArgs.current = urls[currentIndex];
      fromArgs.urls = urls.filter(
      function (item, index) {return index < currentIndex ? item !== urls[currentIndex] : true;});

    } else {
      fromArgs.current = urls[0];
    }
    return {
      indicator: false,
      loop: false };

  } };


var UUID_KEY = '__DC_STAT_UUID';
var deviceId;
function addUuid(result) {
  deviceId = deviceId || wx.getStorageSync(UUID_KEY);
  if (!deviceId) {
    deviceId = Date.now() + '' + Math.floor(Math.random() * 1e7);
    wx.setStorage({
      key: UUID_KEY,
      data: deviceId });

  }
  result.deviceId = deviceId;
}

function addSafeAreaInsets(result) {
  if (result.safeArea) {
    var safeArea = result.safeArea;
    result.safeAreaInsets = {
      top: safeArea.top,
      left: safeArea.left,
      right: result.windowWidth - safeArea.right,
      bottom: result.windowHeight - safeArea.bottom };

  }
}

var getSystemInfo = {
  returnValue: function returnValue(result) {
    addUuid(result);
    addSafeAreaInsets(result);
  } };


// import navigateTo from 'uni-helpers/navigate-to'

var protocols = {
  redirectTo: redirectTo,
  // navigateTo,  // 由于在微信开发者工具的页面参数，会显示__id__参数，因此暂时关闭mp-weixin对于navigateTo的AOP
  previewImage: previewImage,
  getSystemInfo: getSystemInfo,
  getSystemInfoSync: getSystemInfo };

var todos = [
'vibrate',
'preloadPage',
'unPreloadPage',
'loadSubPackage'];

var canIUses = [];

var CALLBACKS = ['success', 'fail', 'cancel', 'complete'];

function processCallback(methodName, method, returnValue) {
  return function (res) {
    return method(processReturnValue(methodName, res, returnValue));
  };
}

function processArgs(methodName, fromArgs) {var argsOption = arguments.length > 2 && arguments[2] !== undefined ? arguments[2] : {};var returnValue = arguments.length > 3 && arguments[3] !== undefined ? arguments[3] : {};var keepFromArgs = arguments.length > 4 && arguments[4] !== undefined ? arguments[4] : false;
  if (isPlainObject(fromArgs)) {// 一般 api 的参数解析
    var toArgs = keepFromArgs === true ? fromArgs : {}; // returnValue 为 false 时，说明是格式化返回值，直接在返回值对象上修改赋值
    if (isFn(argsOption)) {
      argsOption = argsOption(fromArgs, toArgs) || {};
    }
    for (var key in fromArgs) {
      if (hasOwn(argsOption, key)) {
        var keyOption = argsOption[key];
        if (isFn(keyOption)) {
          keyOption = keyOption(fromArgs[key], fromArgs, toArgs);
        }
        if (!keyOption) {// 不支持的参数
          console.warn("The '".concat(methodName, "' method of platform '\u5FAE\u4FE1\u5C0F\u7A0B\u5E8F' does not support option '").concat(key, "'"));
        } else if (isStr(keyOption)) {// 重写参数 key
          toArgs[keyOption] = fromArgs[key];
        } else if (isPlainObject(keyOption)) {// {name:newName,value:value}可重新指定参数 key:value
          toArgs[keyOption.name ? keyOption.name : key] = keyOption.value;
        }
      } else if (CALLBACKS.indexOf(key) !== -1) {
        if (isFn(fromArgs[key])) {
          toArgs[key] = processCallback(methodName, fromArgs[key], returnValue);
        }
      } else {
        if (!keepFromArgs) {
          toArgs[key] = fromArgs[key];
        }
      }
    }
    return toArgs;
  } else if (isFn(fromArgs)) {
    fromArgs = processCallback(methodName, fromArgs, returnValue);
  }
  return fromArgs;
}

function processReturnValue(methodName, res, returnValue) {var keepReturnValue = arguments.length > 3 && arguments[3] !== undefined ? arguments[3] : false;
  if (isFn(protocols.returnValue)) {// 处理通用 returnValue
    res = protocols.returnValue(methodName, res);
  }
  return processArgs(methodName, res, returnValue, {}, keepReturnValue);
}

function wrapper(methodName, method) {
  if (hasOwn(protocols, methodName)) {
    var protocol = protocols[methodName];
    if (!protocol) {// 暂不支持的 api
      return function () {
        console.error("Platform '\u5FAE\u4FE1\u5C0F\u7A0B\u5E8F' does not support '".concat(methodName, "'."));
      };
    }
    return function (arg1, arg2) {// 目前 api 最多两个参数
      var options = protocol;
      if (isFn(protocol)) {
        options = protocol(arg1);
      }

      arg1 = processArgs(methodName, arg1, options.args, options.returnValue);

      var args = [arg1];
      if (typeof arg2 !== 'undefined') {
        args.push(arg2);
      }
      if (isFn(options.name)) {
        methodName = options.name(arg1);
      } else if (isStr(options.name)) {
        methodName = options.name;
      }
      var returnValue = wx[methodName].apply(wx, args);
      if (isSyncApi(methodName)) {// 同步 api
        return processReturnValue(methodName, returnValue, options.returnValue, isContextApi(methodName));
      }
      return returnValue;
    };
  }
  return method;
}

var todoApis = Object.create(null);

var TODOS = [
'onTabBarMidButtonTap',
'subscribePush',
'unsubscribePush',
'onPush',
'offPush',
'share'];


function createTodoApi(name) {
  return function todoApi(_ref)


  {var fail = _ref.fail,complete = _ref.complete;
    var res = {
      errMsg: "".concat(name, ":fail method '").concat(name, "' not supported") };

    isFn(fail) && fail(res);
    isFn(complete) && complete(res);
  };
}

TODOS.forEach(function (name) {
  todoApis[name] = createTodoApi(name);
});

var providers = {
  oauth: ['weixin'],
  share: ['weixin'],
  payment: ['wxpay'],
  push: ['weixin'] };


function getProvider(_ref2)




{var service = _ref2.service,success = _ref2.success,fail = _ref2.fail,complete = _ref2.complete;
  var res = false;
  if (providers[service]) {
    res = {
      errMsg: 'getProvider:ok',
      service: service,
      provider: providers[service] };

    isFn(success) && success(res);
  } else {
    res = {
      errMsg: 'getProvider:fail service not found' };

    isFn(fail) && fail(res);
  }
  isFn(complete) && complete(res);
}

var extraApi = /*#__PURE__*/Object.freeze({
  __proto__: null,
  getProvider: getProvider });


var getEmitter = function () {
  var Emitter;
  return function getUniEmitter() {
    if (!Emitter) {
      Emitter = new _vue.default();
    }
    return Emitter;
  };
}();

function apply(ctx, method, args) {
  return ctx[method].apply(ctx, args);
}

function $on() {
  return apply(getEmitter(), '$on', Array.prototype.slice.call(arguments));
}
function $off() {
  return apply(getEmitter(), '$off', Array.prototype.slice.call(arguments));
}
function $once() {
  return apply(getEmitter(), '$once', Array.prototype.slice.call(arguments));
}
function $emit() {
  return apply(getEmitter(), '$emit', Array.prototype.slice.call(arguments));
}

var eventApi = /*#__PURE__*/Object.freeze({
  __proto__: null,
  $on: $on,
  $off: $off,
  $once: $once,
  $emit: $emit });


var api = /*#__PURE__*/Object.freeze({
  __proto__: null });


var MPPage = Page;
var MPComponent = Component;

var customizeRE = /:/g;

var customize = cached(function (str) {
  return camelize(str.replace(customizeRE, '-'));
});

function initTriggerEvent(mpInstance) {
  var oldTriggerEvent = mpInstance.triggerEvent;
  var newTriggerEvent = function newTriggerEvent(event) {for (var _len3 = arguments.length, args = new Array(_len3 > 1 ? _len3 - 1 : 0), _key3 = 1; _key3 < _len3; _key3++) {args[_key3 - 1] = arguments[_key3];}
    return oldTriggerEvent.apply(mpInstance, [customize(event)].concat(args));
  };
  try {
    // 京东小程序 triggerEvent 为只读
    mpInstance.triggerEvent = newTriggerEvent;
  } catch (error) {
    mpInstance._triggerEvent = newTriggerEvent;
  }
}

function initHook(name, options, isComponent) {
  var oldHook = options[name];
  if (!oldHook) {
    options[name] = function () {
      initTriggerEvent(this);
    };
  } else {
    options[name] = function () {
      initTriggerEvent(this);for (var _len4 = arguments.length, args = new Array(_len4), _key4 = 0; _key4 < _len4; _key4++) {args[_key4] = arguments[_key4];}
      return oldHook.apply(this, args);
    };
  }
}
if (!MPPage.__$wrappered) {
  MPPage.__$wrappered = true;
  Page = function Page() {var options = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : {};
    initHook('onLoad', options);
    return MPPage(options);
  };
  Page.after = MPPage.after;

  Component = function Component() {var options = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : {};
    initHook('created', options);
    return MPComponent(options);
  };
}

var PAGE_EVENT_HOOKS = [
'onPullDownRefresh',
'onReachBottom',
'onAddToFavorites',
'onShareTimeline',
'onShareAppMessage',
'onPageScroll',
'onResize',
'onTabItemTap'];


function initMocks(vm, mocks) {
  var mpInstance = vm.$mp[vm.mpType];
  mocks.forEach(function (mock) {
    if (hasOwn(mpInstance, mock)) {
      vm[mock] = mpInstance[mock];
    }
  });
}

function hasHook(hook, vueOptions) {
  if (!vueOptions) {
    return true;
  }

  if (_vue.default.options && Array.isArray(_vue.default.options[hook])) {
    return true;
  }

  vueOptions = vueOptions.default || vueOptions;

  if (isFn(vueOptions)) {
    if (isFn(vueOptions.extendOptions[hook])) {
      return true;
    }
    if (vueOptions.super &&
    vueOptions.super.options &&
    Array.isArray(vueOptions.super.options[hook])) {
      return true;
    }
    return false;
  }

  if (isFn(vueOptions[hook])) {
    return true;
  }
  var mixins = vueOptions.mixins;
  if (Array.isArray(mixins)) {
    return !!mixins.find(function (mixin) {return hasHook(hook, mixin);});
  }
}

function initHooks(mpOptions, hooks, vueOptions) {
  hooks.forEach(function (hook) {
    if (hasHook(hook, vueOptions)) {
      mpOptions[hook] = function (args) {
        return this.$vm && this.$vm.__call_hook(hook, args);
      };
    }
  });
}

function initVueComponent(Vue, vueOptions) {
  vueOptions = vueOptions.default || vueOptions;
  var VueComponent;
  if (isFn(vueOptions)) {
    VueComponent = vueOptions;
  } else {
    VueComponent = Vue.extend(vueOptions);
  }
  vueOptions = VueComponent.options;
  return [VueComponent, vueOptions];
}

function initSlots(vm, vueSlots) {
  if (Array.isArray(vueSlots) && vueSlots.length) {
    var $slots = Object.create(null);
    vueSlots.forEach(function (slotName) {
      $slots[slotName] = true;
    });
    vm.$scopedSlots = vm.$slots = $slots;
  }
}

function initVueIds(vueIds, mpInstance) {
  vueIds = (vueIds || '').split(',');
  var len = vueIds.length;

  if (len === 1) {
    mpInstance._$vueId = vueIds[0];
  } else if (len === 2) {
    mpInstance._$vueId = vueIds[0];
    mpInstance._$vuePid = vueIds[1];
  }
}

function initData(vueOptions, context) {
  var data = vueOptions.data || {};
  var methods = vueOptions.methods || {};

  if (typeof data === 'function') {
    try {
      data = data.call(context); // 支持 Vue.prototype 上挂的数据
    } catch (e) {
      if (Object({"VUE_APP_NAME":"garbageSort","VUE_APP_PLATFORM":"mp-weixin","NODE_ENV":"development","BASE_URL":"/"}).VUE_APP_DEBUG) {
        console.warn('根据 Vue 的 data 函数初始化小程序 data 失败，请尽量确保 data 函数中不访问 vm 对象，否则可能影响首次数据渲染速度。', data);
      }
    }
  } else {
    try {
      // 对 data 格式化
      data = JSON.parse(JSON.stringify(data));
    } catch (e) {}
  }

  if (!isPlainObject(data)) {
    data = {};
  }

  Object.keys(methods).forEach(function (methodName) {
    if (context.__lifecycle_hooks__.indexOf(methodName) === -1 && !hasOwn(data, methodName)) {
      data[methodName] = methods[methodName];
    }
  });

  return data;
}

var PROP_TYPES = [String, Number, Boolean, Object, Array, null];

function createObserver(name) {
  return function observer(newVal, oldVal) {
    if (this.$vm) {
      this.$vm[name] = newVal; // 为了触发其他非 render watcher
    }
  };
}

function initBehaviors(vueOptions, initBehavior) {
  var vueBehaviors = vueOptions.behaviors;
  var vueExtends = vueOptions.extends;
  var vueMixins = vueOptions.mixins;

  var vueProps = vueOptions.props;

  if (!vueProps) {
    vueOptions.props = vueProps = [];
  }

  var behaviors = [];
  if (Array.isArray(vueBehaviors)) {
    vueBehaviors.forEach(function (behavior) {
      behaviors.push(behavior.replace('uni://', "wx".concat("://")));
      if (behavior === 'uni://form-field') {
        if (Array.isArray(vueProps)) {
          vueProps.push('name');
          vueProps.push('value');
        } else {
          vueProps.name = {
            type: String,
            default: '' };

          vueProps.value = {
            type: [String, Number, Boolean, Array, Object, Date],
            default: '' };

        }
      }
    });
  }
  if (isPlainObject(vueExtends) && vueExtends.props) {
    behaviors.push(
    initBehavior({
      properties: initProperties(vueExtends.props, true) }));


  }
  if (Array.isArray(vueMixins)) {
    vueMixins.forEach(function (vueMixin) {
      if (isPlainObject(vueMixin) && vueMixin.props) {
        behaviors.push(
        initBehavior({
          properties: initProperties(vueMixin.props, true) }));


      }
    });
  }
  return behaviors;
}

function parsePropType(key, type, defaultValue, file) {
  // [String]=>String
  if (Array.isArray(type) && type.length === 1) {
    return type[0];
  }
  return type;
}

function initProperties(props) {var isBehavior = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : false;var file = arguments.length > 2 && arguments[2] !== undefined ? arguments[2] : '';
  var properties = {};
  if (!isBehavior) {
    properties.vueId = {
      type: String,
      value: '' };

    // 用于字节跳动小程序模拟抽象节点
    properties.generic = {
      type: Object,
      value: null };

    // scopedSlotsCompiler auto
    properties.scopedSlotsCompiler = {
      type: String,
      value: '' };

    properties.vueSlots = { // 小程序不能直接定义 $slots 的 props，所以通过 vueSlots 转换到 $slots
      type: null,
      value: [],
      observer: function observer(newVal, oldVal) {
        var $slots = Object.create(null);
        newVal.forEach(function (slotName) {
          $slots[slotName] = true;
        });
        this.setData({
          $slots: $slots });

      } };

  }
  if (Array.isArray(props)) {// ['title']
    props.forEach(function (key) {
      properties[key] = {
        type: null,
        observer: createObserver(key) };

    });
  } else if (isPlainObject(props)) {// {title:{type:String,default:''},content:String}
    Object.keys(props).forEach(function (key) {
      var opts = props[key];
      if (isPlainObject(opts)) {// title:{type:String,default:''}
        var value = opts.default;
        if (isFn(value)) {
          value = value();
        }

        opts.type = parsePropType(key, opts.type);

        properties[key] = {
          type: PROP_TYPES.indexOf(opts.type) !== -1 ? opts.type : null,
          value: value,
          observer: createObserver(key) };

      } else {// content:String
        var type = parsePropType(key, opts);
        properties[key] = {
          type: PROP_TYPES.indexOf(type) !== -1 ? type : null,
          observer: createObserver(key) };

      }
    });
  }
  return properties;
}

function wrapper$1(event) {
  // TODO 又得兼容 mpvue 的 mp 对象
  try {
    event.mp = JSON.parse(JSON.stringify(event));
  } catch (e) {}

  event.stopPropagation = noop;
  event.preventDefault = noop;

  event.target = event.target || {};

  if (!hasOwn(event, 'detail')) {
    event.detail = {};
  }

  if (hasOwn(event, 'markerId')) {
    event.detail = typeof event.detail === 'object' ? event.detail : {};
    event.detail.markerId = event.markerId;
  }

  if (isPlainObject(event.detail)) {
    event.target = Object.assign({}, event.target, event.detail);
  }

  return event;
}

function getExtraValue(vm, dataPathsArray) {
  var context = vm;
  dataPathsArray.forEach(function (dataPathArray) {
    var dataPath = dataPathArray[0];
    var value = dataPathArray[2];
    if (dataPath || typeof value !== 'undefined') {// ['','',index,'disable']
      var propPath = dataPathArray[1];
      var valuePath = dataPathArray[3];

      var vFor;
      if (Number.isInteger(dataPath)) {
        vFor = dataPath;
      } else if (!dataPath) {
        vFor = context;
      } else if (typeof dataPath === 'string' && dataPath) {
        if (dataPath.indexOf('#s#') === 0) {
          vFor = dataPath.substr(3);
        } else {
          vFor = vm.__get_value(dataPath, context);
        }
      }

      if (Number.isInteger(vFor)) {
        context = value;
      } else if (!propPath) {
        context = vFor[value];
      } else {
        if (Array.isArray(vFor)) {
          context = vFor.find(function (vForItem) {
            return vm.__get_value(propPath, vForItem) === value;
          });
        } else if (isPlainObject(vFor)) {
          context = Object.keys(vFor).find(function (vForKey) {
            return vm.__get_value(propPath, vFor[vForKey]) === value;
          });
        } else {
          console.error('v-for 暂不支持循环数据：', vFor);
        }
      }

      if (valuePath) {
        context = vm.__get_value(valuePath, context);
      }
    }
  });
  return context;
}

function processEventExtra(vm, extra, event) {
  var extraObj = {};

  if (Array.isArray(extra) && extra.length) {
    /**
                                              *[
                                              *    ['data.items', 'data.id', item.data.id],
                                              *    ['metas', 'id', meta.id]
                                              *],
                                              *[
                                              *    ['data.items', 'data.id', item.data.id],
                                              *    ['metas', 'id', meta.id]
                                              *],
                                              *'test'
                                              */
    extra.forEach(function (dataPath, index) {
      if (typeof dataPath === 'string') {
        if (!dataPath) {// model,prop.sync
          extraObj['$' + index] = vm;
        } else {
          if (dataPath === '$event') {// $event
            extraObj['$' + index] = event;
          } else if (dataPath === 'arguments') {
            if (event.detail && event.detail.__args__) {
              extraObj['$' + index] = event.detail.__args__;
            } else {
              extraObj['$' + index] = [event];
            }
          } else if (dataPath.indexOf('$event.') === 0) {// $event.target.value
            extraObj['$' + index] = vm.__get_value(dataPath.replace('$event.', ''), event);
          } else {
            extraObj['$' + index] = vm.__get_value(dataPath);
          }
        }
      } else {
        extraObj['$' + index] = getExtraValue(vm, dataPath);
      }
    });
  }

  return extraObj;
}

function getObjByArray(arr) {
  var obj = {};
  for (var i = 1; i < arr.length; i++) {
    var element = arr[i];
    obj[element[0]] = element[1];
  }
  return obj;
}

function processEventArgs(vm, event) {var args = arguments.length > 2 && arguments[2] !== undefined ? arguments[2] : [];var extra = arguments.length > 3 && arguments[3] !== undefined ? arguments[3] : [];var isCustom = arguments.length > 4 ? arguments[4] : undefined;var methodName = arguments.length > 5 ? arguments[5] : undefined;
  var isCustomMPEvent = false; // wxcomponent 组件，传递原始 event 对象
  if (isCustom) {// 自定义事件
    isCustomMPEvent = event.currentTarget &&
    event.currentTarget.dataset &&
    event.currentTarget.dataset.comType === 'wx';
    if (!args.length) {// 无参数，直接传入 event 或 detail 数组
      if (isCustomMPEvent) {
        return [event];
      }
      return event.detail.__args__ || event.detail;
    }
  }

  var extraObj = processEventExtra(vm, extra, event);

  var ret = [];
  args.forEach(function (arg) {
    if (arg === '$event') {
      if (methodName === '__set_model' && !isCustom) {// input v-model value
        ret.push(event.target.value);
      } else {
        if (isCustom && !isCustomMPEvent) {
          ret.push(event.detail.__args__[0]);
        } else {// wxcomponent 组件或内置组件
          ret.push(event);
        }
      }
    } else {
      if (Array.isArray(arg) && arg[0] === 'o') {
        ret.push(getObjByArray(arg));
      } else if (typeof arg === 'string' && hasOwn(extraObj, arg)) {
        ret.push(extraObj[arg]);
      } else {
        ret.push(arg);
      }
    }
  });

  return ret;
}

var ONCE = '~';
var CUSTOM = '^';

function isMatchEventType(eventType, optType) {
  return eventType === optType ||

  optType === 'regionchange' && (

  eventType === 'begin' ||
  eventType === 'end');


}

function getContextVm(vm) {
  var $parent = vm.$parent;
  // 父组件是 scoped slots 或者其他自定义组件时继续查找
  while ($parent && $parent.$parent && ($parent.$options.generic || $parent.$parent.$options.generic || $parent.$scope._$vuePid)) {
    $parent = $parent.$parent;
  }
  return $parent && $parent.$parent;
}

function handleEvent(event) {var _this = this;
  event = wrapper$1(event);

  // [['tap',[['handle',[1,2,a]],['handle1',[1,2,a]]]]]
  var dataset = (event.currentTarget || event.target).dataset;
  if (!dataset) {
    return console.warn('事件信息不存在');
  }
  var eventOpts = dataset.eventOpts || dataset['event-opts']; // 支付宝 web-view 组件 dataset 非驼峰
  if (!eventOpts) {
    return console.warn('事件信息不存在');
  }

  // [['handle',[1,2,a]],['handle1',[1,2,a]]]
  var eventType = event.type;

  var ret = [];

  eventOpts.forEach(function (eventOpt) {
    var type = eventOpt[0];
    var eventsArray = eventOpt[1];

    var isCustom = type.charAt(0) === CUSTOM;
    type = isCustom ? type.slice(1) : type;
    var isOnce = type.charAt(0) === ONCE;
    type = isOnce ? type.slice(1) : type;

    if (eventsArray && isMatchEventType(eventType, type)) {
      eventsArray.forEach(function (eventArray) {
        var methodName = eventArray[0];
        if (methodName) {
          var handlerCtx = _this.$vm;
          if (handlerCtx.$options.generic) {// mp-weixin,mp-toutiao 抽象节点模拟 scoped slots
            handlerCtx = getContextVm(handlerCtx) || handlerCtx;
          }
          if (methodName === '$emit') {
            handlerCtx.$emit.apply(handlerCtx,
            processEventArgs(
            _this.$vm,
            event,
            eventArray[1],
            eventArray[2],
            isCustom,
            methodName));

            return;
          }
          var handler = handlerCtx[methodName];
          if (!isFn(handler)) {
            throw new Error(" _vm.".concat(methodName, " is not a function"));
          }
          if (isOnce) {
            if (handler.once) {
              return;
            }
            handler.once = true;
          }
          var params = processEventArgs(
          _this.$vm,
          event,
          eventArray[1],
          eventArray[2],
          isCustom,
          methodName);

          params = Array.isArray(params) ? params : [];
          // 参数尾部增加原始事件对象用于复杂表达式内获取额外数据
          if (/=\s*\S+\.eventParams\s*\|\|\s*\S+\[['"]event-params['"]\]/.test(handler.toString())) {
            // eslint-disable-next-line no-sparse-arrays
            params = params.concat([,,,,,,,,,, event]);
          }
          ret.push(handler.apply(handlerCtx, params));
        }
      });
    }
  });

  if (
  eventType === 'input' &&
  ret.length === 1 &&
  typeof ret[0] !== 'undefined')
  {
    return ret[0];
  }
}

var messages = {};

var locale;

{
  locale = wx.getSystemInfoSync().language;
}

function initI18nMessages() {
  if (!isEnableLocale()) {
    return;
  }
  var localeKeys = Object.keys(__uniConfig.locales);
  if (localeKeys.length) {
    localeKeys.forEach(function (locale) {
      var curMessages = messages[locale];
      var userMessages = __uniConfig.locales[locale];
      if (curMessages) {
        Object.assign(curMessages, userMessages);
      } else {
        messages[locale] = userMessages;
      }
    });
  }
}

initI18nMessages();

var i18n = (0, _uniI18n.initVueI18n)(
locale,
{});

var t = i18n.t;
var i18nMixin = i18n.mixin = {
  beforeCreate: function beforeCreate() {var _this2 = this;
    var unwatch = i18n.i18n.watchLocale(function () {
      _this2.$forceUpdate();
    });
    this.$once('hook:beforeDestroy', function () {
      unwatch();
    });
  },
  methods: {
    $$t: function $$t(key, values) {
      return t(key, values);
    } } };


var setLocale$1 = i18n.setLocale;
var getLocale$1 = i18n.getLocale;

function initAppLocale(Vue, appVm, locale) {
  var state = Vue.observable({
    locale: locale || i18n.getLocale() });

  var localeWatchers = [];
  appVm.$watchLocale = function (fn) {
    localeWatchers.push(fn);
  };
  Object.defineProperty(appVm, '$locale', {
    get: function get() {
      return state.locale;
    },
    set: function set(v) {
      state.locale = v;
      localeWatchers.forEach(function (watch) {return watch(v);});
    } });

}

function isEnableLocale() {
  return typeof __uniConfig !== 'undefined' && __uniConfig.locales && !!Object.keys(__uniConfig.locales).length;
}

// export function initI18n() {
//   const localeKeys = Object.keys(__uniConfig.locales || {})
//   if (localeKeys.length) {
//     localeKeys.forEach((locale) =>
//       i18n.add(locale, __uniConfig.locales[locale])
//     )
//   }
// }

var eventChannels = {};

var eventChannelStack = [];

function getEventChannel(id) {
  if (id) {
    var eventChannel = eventChannels[id];
    delete eventChannels[id];
    return eventChannel;
  }
  return eventChannelStack.shift();
}

var hooks = [
'onShow',
'onHide',
'onError',
'onPageNotFound',
'onThemeChange',
'onUnhandledRejection'];


function initEventChannel() {
  _vue.default.prototype.getOpenerEventChannel = function () {
    // 微信小程序使用自身getOpenerEventChannel
    {
      return this.$scope.getOpenerEventChannel();
    }
  };
  var callHook = _vue.default.prototype.__call_hook;
  _vue.default.prototype.__call_hook = function (hook, args) {
    if (hook === 'onLoad' && args && args.__id__) {
      this.__eventChannel__ = getEventChannel(args.__id__);
      delete args.__id__;
    }
    return callHook.call(this, hook, args);
  };
}

function initScopedSlotsParams() {
  var center = {};
  var parents = {};

  _vue.default.prototype.$hasScopedSlotsParams = function (vueId) {
    var has = center[vueId];
    if (!has) {
      parents[vueId] = this;
      this.$on('hook:destroyed', function () {
        delete parents[vueId];
      });
    }
    return has;
  };

  _vue.default.prototype.$getScopedSlotsParams = function (vueId, name, key) {
    var data = center[vueId];
    if (data) {
      var object = data[name] || {};
      return key ? object[key] : object;
    } else {
      parents[vueId] = this;
      this.$on('hook:destroyed', function () {
        delete parents[vueId];
      });
    }
  };

  _vue.default.prototype.$setScopedSlotsParams = function (name, value) {
    var vueIds = this.$options.propsData.vueId;
    if (vueIds) {
      var vueId = vueIds.split(',')[0];
      var object = center[vueId] = center[vueId] || {};
      object[name] = value;
      if (parents[vueId]) {
        parents[vueId].$forceUpdate();
      }
    }
  };

  _vue.default.mixin({
    destroyed: function destroyed() {
      var propsData = this.$options.propsData;
      var vueId = propsData && propsData.vueId;
      if (vueId) {
        delete center[vueId];
        delete parents[vueId];
      }
    } });

}

function parseBaseApp(vm, _ref3)


{var mocks = _ref3.mocks,initRefs = _ref3.initRefs;
  initEventChannel();
  {
    initScopedSlotsParams();
  }
  if (vm.$options.store) {
    _vue.default.prototype.$store = vm.$options.store;
  }
  uniIdMixin(_vue.default);

  _vue.default.prototype.mpHost = "mp-weixin";

  _vue.default.mixin({
    beforeCreate: function beforeCreate() {
      if (!this.$options.mpType) {
        return;
      }

      this.mpType = this.$options.mpType;

      this.$mp = _defineProperty({
        data: {} },
      this.mpType, this.$options.mpInstance);


      this.$scope = this.$options.mpInstance;

      delete this.$options.mpType;
      delete this.$options.mpInstance;
      if (this.mpType === 'page' && typeof getApp === 'function') {// hack vue-i18n
        var app = getApp();
        if (app.$vm && app.$vm.$i18n) {
          this._i18n = app.$vm.$i18n;
        }
      }
      if (this.mpType !== 'app') {
        initRefs(this);
        initMocks(this, mocks);
      }
    } });


  var appOptions = {
    onLaunch: function onLaunch(args) {
      if (this.$vm) {// 已经初始化过了，主要是为了百度，百度 onShow 在 onLaunch 之前
        return;
      }
      {
        if (wx.canIUse && !wx.canIUse('nextTick')) {// 事实 上2.2.3 即可，简单使用 2.3.0 的 nextTick 判断
          console.error('当前微信基础库版本过低，请将 微信开发者工具-详情-项目设置-调试基础库版本 更换为`2.3.0`以上');
        }
      }

      this.$vm = vm;

      this.$vm.$mp = {
        app: this };


      this.$vm.$scope = this;
      // vm 上也挂载 globalData
      this.$vm.globalData = this.globalData;

      this.$vm._isMounted = true;
      this.$vm.__call_hook('mounted', args);

      this.$vm.__call_hook('onLaunch', args);
    } };


  // 兼容旧版本 globalData
  appOptions.globalData = vm.$options.globalData || {};
  // 将 methods 中的方法挂在 getApp() 中
  var methods = vm.$options.methods;
  if (methods) {
    Object.keys(methods).forEach(function (name) {
      appOptions[name] = methods[name];
    });
  }

  initAppLocale(_vue.default, vm, wx.getSystemInfoSync().language || 'zh-Hans');

  initHooks(appOptions, hooks);

  return appOptions;
}

var mocks = ['__route__', '__wxExparserNodeId__', '__wxWebviewId__'];

function findVmByVueId(vm, vuePid) {
  var $children = vm.$children;
  // 优先查找直属(反向查找:https://github.com/dcloudio/uni-app/issues/1200)
  for (var i = $children.length - 1; i >= 0; i--) {
    var childVm = $children[i];
    if (childVm.$scope._$vueId === vuePid) {
      return childVm;
    }
  }
  // 反向递归查找
  var parentVm;
  for (var _i = $children.length - 1; _i >= 0; _i--) {
    parentVm = findVmByVueId($children[_i], vuePid);
    if (parentVm) {
      return parentVm;
    }
  }
}

function initBehavior(options) {
  return Behavior(options);
}

function isPage() {
  return !!this.route;
}

function initRelation(detail) {
  this.triggerEvent('__l', detail);
}

function selectAllComponents(mpInstance, selector, $refs) {
  var components = mpInstance.selectAllComponents(selector);
  components.forEach(function (component) {
    var ref = component.dataset.ref;
    $refs[ref] = component.$vm || component;
    {
      if (component.dataset.vueGeneric === 'scoped') {
        component.selectAllComponents('.scoped-ref').forEach(function (scopedComponent) {
          selectAllComponents(scopedComponent, selector, $refs);
        });
      }
    }
  });
}

function initRefs(vm) {
  var mpInstance = vm.$scope;
  Object.defineProperty(vm, '$refs', {
    get: function get() {
      var $refs = {};
      selectAllComponents(mpInstance, '.vue-ref', $refs);
      // TODO 暂不考虑 for 中的 scoped
      var forComponents = mpInstance.selectAllComponents('.vue-ref-in-for');
      forComponents.forEach(function (component) {
        var ref = component.dataset.ref;
        if (!$refs[ref]) {
          $refs[ref] = [];
        }
        $refs[ref].push(component.$vm || component);
      });
      return $refs;
    } });

}

function handleLink(event) {var _ref4 =



  event.detail || event.value,vuePid = _ref4.vuePid,vueOptions = _ref4.vueOptions; // detail 是微信,value 是百度(dipatch)

  var parentVm;

  if (vuePid) {
    parentVm = findVmByVueId(this.$vm, vuePid);
  }

  if (!parentVm) {
    parentVm = this.$vm;
  }

  vueOptions.parent = parentVm;
}

function parseApp(vm) {
  return parseBaseApp(vm, {
    mocks: mocks,
    initRefs: initRefs });

}

function createApp(vm) {
  App(parseApp(vm));
  return vm;
}

var encodeReserveRE = /[!'()*]/g;
var encodeReserveReplacer = function encodeReserveReplacer(c) {return '%' + c.charCodeAt(0).toString(16);};
var commaRE = /%2C/g;

// fixed encodeURIComponent which is more conformant to RFC3986:
// - escapes [!'()*]
// - preserve commas
var encode = function encode(str) {return encodeURIComponent(str).
  replace(encodeReserveRE, encodeReserveReplacer).
  replace(commaRE, ',');};

function stringifyQuery(obj) {var encodeStr = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : encode;
  var res = obj ? Object.keys(obj).map(function (key) {
    var val = obj[key];

    if (val === undefined) {
      return '';
    }

    if (val === null) {
      return encodeStr(key);
    }

    if (Array.isArray(val)) {
      var result = [];
      val.forEach(function (val2) {
        if (val2 === undefined) {
          return;
        }
        if (val2 === null) {
          result.push(encodeStr(key));
        } else {
          result.push(encodeStr(key) + '=' + encodeStr(val2));
        }
      });
      return result.join('&');
    }

    return encodeStr(key) + '=' + encodeStr(val);
  }).filter(function (x) {return x.length > 0;}).join('&') : null;
  return res ? "?".concat(res) : '';
}

function parseBaseComponent(vueComponentOptions)


{var _ref5 = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : {},isPage = _ref5.isPage,initRelation = _ref5.initRelation;var _initVueComponent =
  initVueComponent(_vue.default, vueComponentOptions),_initVueComponent2 = _slicedToArray(_initVueComponent, 2),VueComponent = _initVueComponent2[0],vueOptions = _initVueComponent2[1];

  var options = _objectSpread({
    multipleSlots: true,
    addGlobalClass: true },
  vueOptions.options || {});


  {
    // 微信 multipleSlots 部分情况有 bug，导致内容顺序错乱 如 u-list，提供覆盖选项
    if (vueOptions['mp-weixin'] && vueOptions['mp-weixin'].options) {
      Object.assign(options, vueOptions['mp-weixin'].options);
    }
  }

  var componentOptions = {
    options: options,
    data: initData(vueOptions, _vue.default.prototype),
    behaviors: initBehaviors(vueOptions, initBehavior),
    properties: initProperties(vueOptions.props, false, vueOptions.__file),
    lifetimes: {
      attached: function attached() {
        var properties = this.properties;

        var options = {
          mpType: isPage.call(this) ? 'page' : 'component',
          mpInstance: this,
          propsData: properties };


        initVueIds(properties.vueId, this);

        // 处理父子关系
        initRelation.call(this, {
          vuePid: this._$vuePid,
          vueOptions: options });


        // 初始化 vue 实例
        this.$vm = new VueComponent(options);

        // 处理$slots,$scopedSlots（暂不支持动态变化$slots）
        initSlots(this.$vm, properties.vueSlots);

        // 触发首次 setData
        this.$vm.$mount();
      },
      ready: function ready() {
        // 当组件 props 默认值为 true，初始化时传入 false 会导致 created,ready 触发, 但 attached 不触发
        // https://developers.weixin.qq.com/community/develop/doc/00066ae2844cc0f8eb883e2a557800
        if (this.$vm) {
          this.$vm._isMounted = true;
          this.$vm.__call_hook('mounted');
          this.$vm.__call_hook('onReady');
        }
      },
      detached: function detached() {
        this.$vm && this.$vm.$destroy();
      } },

    pageLifetimes: {
      show: function show(args) {
        this.$vm && this.$vm.__call_hook('onPageShow', args);
      },
      hide: function hide() {
        this.$vm && this.$vm.__call_hook('onPageHide');
      },
      resize: function resize(size) {
        this.$vm && this.$vm.__call_hook('onPageResize', size);
      } },

    methods: {
      __l: handleLink,
      __e: handleEvent } };


  // externalClasses
  if (vueOptions.externalClasses) {
    componentOptions.externalClasses = vueOptions.externalClasses;
  }

  if (Array.isArray(vueOptions.wxsCallMethods)) {
    vueOptions.wxsCallMethods.forEach(function (callMethod) {
      componentOptions.methods[callMethod] = function (args) {
        return this.$vm[callMethod](args);
      };
    });
  }

  if (isPage) {
    return componentOptions;
  }
  return [componentOptions, VueComponent];
}

function parseComponent(vueComponentOptions) {
  return parseBaseComponent(vueComponentOptions, {
    isPage: isPage,
    initRelation: initRelation });

}

var hooks$1 = [
'onShow',
'onHide',
'onUnload'];


hooks$1.push.apply(hooks$1, PAGE_EVENT_HOOKS);

function parseBasePage(vuePageOptions, _ref6)


{var isPage = _ref6.isPage,initRelation = _ref6.initRelation;
  var pageOptions = parseComponent(vuePageOptions);

  initHooks(pageOptions.methods, hooks$1, vuePageOptions);

  pageOptions.methods.onLoad = function (query) {
    this.options = query;
    var copyQuery = Object.assign({}, query);
    delete copyQuery.__id__;
    this.$page = {
      fullPath: '/' + (this.route || this.is) + stringifyQuery(copyQuery) };

    this.$vm.$mp.query = query; // 兼容 mpvue
    this.$vm.__call_hook('onLoad', query);
  };

  return pageOptions;
}

function parsePage(vuePageOptions) {
  return parseBasePage(vuePageOptions, {
    isPage: isPage,
    initRelation: initRelation });

}

function createPage(vuePageOptions) {
  {
    return Component(parsePage(vuePageOptions));
  }
}

function createComponent(vueOptions) {
  {
    return Component(parseComponent(vueOptions));
  }
}

function createSubpackageApp(vm) {
  var appOptions = parseApp(vm);
  var app = getApp({
    allowDefault: true });

  vm.$scope = app;
  var globalData = app.globalData;
  if (globalData) {
    Object.keys(appOptions.globalData).forEach(function (name) {
      if (!hasOwn(globalData, name)) {
        globalData[name] = appOptions.globalData[name];
      }
    });
  }
  Object.keys(appOptions).forEach(function (name) {
    if (!hasOwn(app, name)) {
      app[name] = appOptions[name];
    }
  });
  if (isFn(appOptions.onShow) && wx.onAppShow) {
    wx.onAppShow(function () {for (var _len5 = arguments.length, args = new Array(_len5), _key5 = 0; _key5 < _len5; _key5++) {args[_key5] = arguments[_key5];}
      vm.__call_hook('onShow', args);
    });
  }
  if (isFn(appOptions.onHide) && wx.onAppHide) {
    wx.onAppHide(function () {for (var _len6 = arguments.length, args = new Array(_len6), _key6 = 0; _key6 < _len6; _key6++) {args[_key6] = arguments[_key6];}
      vm.__call_hook('onHide', args);
    });
  }
  if (isFn(appOptions.onLaunch)) {
    var args = wx.getLaunchOptionsSync && wx.getLaunchOptionsSync();
    vm.__call_hook('onLaunch', args);
  }
  return vm;
}

function createPlugin(vm) {
  var appOptions = parseApp(vm);
  if (isFn(appOptions.onShow) && wx.onAppShow) {
    wx.onAppShow(function () {for (var _len7 = arguments.length, args = new Array(_len7), _key7 = 0; _key7 < _len7; _key7++) {args[_key7] = arguments[_key7];}
      vm.__call_hook('onShow', args);
    });
  }
  if (isFn(appOptions.onHide) && wx.onAppHide) {
    wx.onAppHide(function () {for (var _len8 = arguments.length, args = new Array(_len8), _key8 = 0; _key8 < _len8; _key8++) {args[_key8] = arguments[_key8];}
      vm.__call_hook('onHide', args);
    });
  }
  if (isFn(appOptions.onLaunch)) {
    var args = wx.getLaunchOptionsSync && wx.getLaunchOptionsSync();
    vm.__call_hook('onLaunch', args);
  }
  return vm;
}

todos.forEach(function (todoApi) {
  protocols[todoApi] = false;
});

canIUses.forEach(function (canIUseApi) {
  var apiName = protocols[canIUseApi] && protocols[canIUseApi].name ? protocols[canIUseApi].name :
  canIUseApi;
  if (!wx.canIUse(apiName)) {
    protocols[canIUseApi] = false;
  }
});

var uni = {};

if (typeof Proxy !== 'undefined' && "mp-weixin" !== 'app-plus') {
  uni = new Proxy({}, {
    get: function get(target, name) {
      if (hasOwn(target, name)) {
        return target[name];
      }
      if (baseApi[name]) {
        return baseApi[name];
      }
      if (api[name]) {
        return promisify(name, api[name]);
      }
      {
        if (extraApi[name]) {
          return promisify(name, extraApi[name]);
        }
        if (todoApis[name]) {
          return promisify(name, todoApis[name]);
        }
      }
      if (eventApi[name]) {
        return eventApi[name];
      }
      if (!hasOwn(wx, name) && !hasOwn(protocols, name)) {
        return;
      }
      return promisify(name, wrapper(name, wx[name]));
    },
    set: function set(target, name, value) {
      target[name] = value;
      return true;
    } });

} else {
  Object.keys(baseApi).forEach(function (name) {
    uni[name] = baseApi[name];
  });

  {
    Object.keys(todoApis).forEach(function (name) {
      uni[name] = promisify(name, todoApis[name]);
    });
    Object.keys(extraApi).forEach(function (name) {
      uni[name] = promisify(name, todoApis[name]);
    });
  }

  Object.keys(eventApi).forEach(function (name) {
    uni[name] = eventApi[name];
  });

  Object.keys(api).forEach(function (name) {
    uni[name] = promisify(name, api[name]);
  });

  Object.keys(wx).forEach(function (name) {
    if (hasOwn(wx, name) || hasOwn(protocols, name)) {
      uni[name] = promisify(name, wrapper(name, wx[name]));
    }
  });
}

wx.createApp = createApp;
wx.createPage = createPage;
wx.createComponent = createComponent;
wx.createSubpackageApp = createSubpackageApp;
wx.createPlugin = createPlugin;

var uni$1 = uni;var _default =

uni$1;exports.default = _default;
/* WEBPACK VAR INJECTION */}.call(this, __webpack_require__(/*! ./../../../webpack/buildin/global.js */ 2)))

/***/ }),

/***/ 11:
/*!**********************************************************************************************************!*\
  !*** ./node_modules/@dcloudio/vue-cli-plugin-uni/packages/vue-loader/lib/runtime/componentNormalizer.js ***!
  \**********************************************************************************************************/
/*! exports provided: default */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "default", function() { return normalizeComponent; });
/* globals __VUE_SSR_CONTEXT__ */

// IMPORTANT: Do NOT use ES2015 features in this file (except for modules).
// This module is a runtime utility for cleaner component module output and will
// be included in the final webpack user bundle.

function normalizeComponent (
  scriptExports,
  render,
  staticRenderFns,
  functionalTemplate,
  injectStyles,
  scopeId,
  moduleIdentifier, /* server only */
  shadowMode, /* vue-cli only */
  components, // fixed by xxxxxx auto components
  renderjs // fixed by xxxxxx renderjs
) {
  // Vue.extend constructor export interop
  var options = typeof scriptExports === 'function'
    ? scriptExports.options
    : scriptExports

  // fixed by xxxxxx auto components
  if (components) {
    if (!options.components) {
      options.components = {}
    }
    var hasOwn = Object.prototype.hasOwnProperty
    for (var name in components) {
      if (hasOwn.call(components, name) && !hasOwn.call(options.components, name)) {
        options.components[name] = components[name]
      }
    }
  }
  // fixed by xxxxxx renderjs
  if (renderjs) {
    (renderjs.beforeCreate || (renderjs.beforeCreate = [])).unshift(function() {
      this[renderjs.__module] = this
    });
    (options.mixins || (options.mixins = [])).push(renderjs)
  }

  // render functions
  if (render) {
    options.render = render
    options.staticRenderFns = staticRenderFns
    options._compiled = true
  }

  // functional template
  if (functionalTemplate) {
    options.functional = true
  }

  // scopedId
  if (scopeId) {
    options._scopeId = 'data-v-' + scopeId
  }

  var hook
  if (moduleIdentifier) { // server build
    hook = function (context) {
      // 2.3 injection
      context =
        context || // cached call
        (this.$vnode && this.$vnode.ssrContext) || // stateful
        (this.parent && this.parent.$vnode && this.parent.$vnode.ssrContext) // functional
      // 2.2 with runInNewContext: true
      if (!context && typeof __VUE_SSR_CONTEXT__ !== 'undefined') {
        context = __VUE_SSR_CONTEXT__
      }
      // inject component styles
      if (injectStyles) {
        injectStyles.call(this, context)
      }
      // register component module identifier for async chunk inferrence
      if (context && context._registeredComponents) {
        context._registeredComponents.add(moduleIdentifier)
      }
    }
    // used by ssr in case component is cached and beforeCreate
    // never gets called
    options._ssrRegister = hook
  } else if (injectStyles) {
    hook = shadowMode
      ? function () { injectStyles.call(this, this.$root.$options.shadowRoot) }
      : injectStyles
  }

  if (hook) {
    if (options.functional) {
      // for template-only hot-reload because in that case the render fn doesn't
      // go through the normalizer
      options._injectStyles = hook
      // register for functioal component in vue file
      var originalRender = options.render
      options.render = function renderWithStyleInjection (h, context) {
        hook.call(context)
        return originalRender(h, context)
      }
    } else {
      // inject component registration as beforeCreate hook
      var existing = options.beforeCreate
      options.beforeCreate = existing
        ? [].concat(existing, hook)
        : [hook]
    }
  }

  return {
    exports: scriptExports,
    options: options
  }
}


/***/ }),

/***/ 16:
/*!**************************************************************************************!*\
  !*** C:/Users/what/Downloads/GarbageClassify_frontend-main/static/icos/mycamera.png ***!
  \**************************************************************************************/
/*! no static exports found */
/***/ (function(module, exports) {

module.exports = "/static/icos/mycamera.png";

/***/ }),

/***/ 19:
/*!**********************************************************************************!*\
  !*** C:/Users/what/Downloads/GarbageClassify_frontend-main/static/img/icon1.png ***!
  \**********************************************************************************/
/*! no static exports found */
/***/ (function(module, exports) {

module.exports = "/static/img/icon1.png";

/***/ }),

/***/ 2:
/*!***********************************!*\
  !*** (webpack)/buildin/global.js ***!
  \***********************************/
/*! no static exports found */
/***/ (function(module, exports) {

var g;

// This works in non-strict mode
g = (function() {
	return this;
})();

try {
	// This works if eval is allowed (see CSP)
	g = g || new Function("return this")();
} catch (e) {
	// This works if the window reference is available
	if (typeof window === "object") g = window;
}

// g can still be undefined, but nothing to do about it...
// We return undefined, instead of nothing here, so it's
// easier to handle this case. if(!global) { ...}

module.exports = g;


/***/ }),

/***/ 20:
/*!**********************************************************************************!*\
  !*** C:/Users/what/Downloads/GarbageClassify_frontend-main/static/img/icon2.png ***!
  \**********************************************************************************/
/*! no static exports found */
/***/ (function(module, exports) {

module.exports = "data:image/png;base64,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"

/***/ }),

/***/ 203:
/*!*****************************************************************************************************************!*\
  !*** C:/Users/what/Downloads/GarbageClassify_frontend-main/uni_modules/uni-icons/components/uni-icons/icons.js ***!
  \*****************************************************************************************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

"use strict";
Object.defineProperty(exports, "__esModule", { value: true });exports.default = void 0;var _default = {
  "id": "2852637",
  "name": "uniui图标库",
  "font_family": "uniicons",
  "css_prefix_text": "uniui-",
  "description": "",
  "glyphs": [
  {
    "icon_id": "25027049",
    "name": "yanse",
    "font_class": "color",
    "unicode": "e6cf",
    "unicode_decimal": 59087 },

  {
    "icon_id": "25027048",
    "name": "wallet",
    "font_class": "wallet",
    "unicode": "e6b1",
    "unicode_decimal": 59057 },

  {
    "icon_id": "25015720",
    "name": "settings-filled",
    "font_class": "settings-filled",
    "unicode": "e6ce",
    "unicode_decimal": 59086 },

  {
    "icon_id": "25015434",
    "name": "shimingrenzheng-filled",
    "font_class": "auth-filled",
    "unicode": "e6cc",
    "unicode_decimal": 59084 },

  {
    "icon_id": "24934246",
    "name": "shop-filled",
    "font_class": "shop-filled",
    "unicode": "e6cd",
    "unicode_decimal": 59085 },

  {
    "icon_id": "24934159",
    "name": "staff-filled-01",
    "font_class": "staff-filled",
    "unicode": "e6cb",
    "unicode_decimal": 59083 },

  {
    "icon_id": "24932461",
    "name": "VIP-filled",
    "font_class": "vip-filled",
    "unicode": "e6c6",
    "unicode_decimal": 59078 },

  {
    "icon_id": "24932462",
    "name": "plus_circle_fill",
    "font_class": "plus-filled",
    "unicode": "e6c7",
    "unicode_decimal": 59079 },

  {
    "icon_id": "24932463",
    "name": "folder_add-filled",
    "font_class": "folder-add-filled",
    "unicode": "e6c8",
    "unicode_decimal": 59080 },

  {
    "icon_id": "24932464",
    "name": "yanse-filled",
    "font_class": "color-filled",
    "unicode": "e6c9",
    "unicode_decimal": 59081 },

  {
    "icon_id": "24932465",
    "name": "tune-filled",
    "font_class": "tune-filled",
    "unicode": "e6ca",
    "unicode_decimal": 59082 },

  {
    "icon_id": "24932455",
    "name": "a-rilidaka-filled",
    "font_class": "calendar-filled",
    "unicode": "e6c0",
    "unicode_decimal": 59072 },

  {
    "icon_id": "24932456",
    "name": "notification-filled",
    "font_class": "notification-filled",
    "unicode": "e6c1",
    "unicode_decimal": 59073 },

  {
    "icon_id": "24932457",
    "name": "wallet-filled",
    "font_class": "wallet-filled",
    "unicode": "e6c2",
    "unicode_decimal": 59074 },

  {
    "icon_id": "24932458",
    "name": "paihangbang-filled",
    "font_class": "medal-filled",
    "unicode": "e6c3",
    "unicode_decimal": 59075 },

  {
    "icon_id": "24932459",
    "name": "gift-filled",
    "font_class": "gift-filled",
    "unicode": "e6c4",
    "unicode_decimal": 59076 },

  {
    "icon_id": "24932460",
    "name": "fire-filled",
    "font_class": "fire-filled",
    "unicode": "e6c5",
    "unicode_decimal": 59077 },

  {
    "icon_id": "24928001",
    "name": "refreshempty",
    "font_class": "refreshempty",
    "unicode": "e6bf",
    "unicode_decimal": 59071 },

  {
    "icon_id": "24926853",
    "name": "location-ellipse",
    "font_class": "location-filled",
    "unicode": "e6af",
    "unicode_decimal": 59055 },

  {
    "icon_id": "24926735",
    "name": "person-filled",
    "font_class": "person-filled",
    "unicode": "e69d",
    "unicode_decimal": 59037 },

  {
    "icon_id": "24926703",
    "name": "personadd-filled",
    "font_class": "personadd-filled",
    "unicode": "e698",
    "unicode_decimal": 59032 },

  {
    "icon_id": "24923351",
    "name": "back",
    "font_class": "back",
    "unicode": "e6b9",
    "unicode_decimal": 59065 },

  {
    "icon_id": "24923352",
    "name": "forward",
    "font_class": "forward",
    "unicode": "e6ba",
    "unicode_decimal": 59066 },

  {
    "icon_id": "24923353",
    "name": "arrowthinright",
    "font_class": "arrow-right",
    "unicode": "e6bb",
    "unicode_decimal": 59067 },

  {
    "icon_id": "24923353",
    "name": "arrowthinright",
    "font_class": "arrowthinright",
    "unicode": "e6bb",
    "unicode_decimal": 59067 },

  {
    "icon_id": "24923354",
    "name": "arrowthinleft",
    "font_class": "arrow-left",
    "unicode": "e6bc",
    "unicode_decimal": 59068 },

  {
    "icon_id": "24923354",
    "name": "arrowthinleft",
    "font_class": "arrowthinleft",
    "unicode": "e6bc",
    "unicode_decimal": 59068 },

  {
    "icon_id": "24923355",
    "name": "arrowthinup",
    "font_class": "arrow-up",
    "unicode": "e6bd",
    "unicode_decimal": 59069 },

  {
    "icon_id": "24923355",
    "name": "arrowthinup",
    "font_class": "arrowthinup",
    "unicode": "e6bd",
    "unicode_decimal": 59069 },

  {
    "icon_id": "24923356",
    "name": "arrowthindown",
    "font_class": "arrow-down",
    "unicode": "e6be",
    "unicode_decimal": 59070 },
  {
    "icon_id": "24923356",
    "name": "arrowthindown",
    "font_class": "arrowthindown",
    "unicode": "e6be",
    "unicode_decimal": 59070 },

  {
    "icon_id": "24923349",
    "name": "arrowdown",
    "font_class": "bottom",
    "unicode": "e6b8",
    "unicode_decimal": 59064 },
  {
    "icon_id": "24923349",
    "name": "arrowdown",
    "font_class": "arrowdown",
    "unicode": "e6b8",
    "unicode_decimal": 59064 },

  {
    "icon_id": "24923346",
    "name": "arrowright",
    "font_class": "right",
    "unicode": "e6b5",
    "unicode_decimal": 59061 },

  {
    "icon_id": "24923346",
    "name": "arrowright",
    "font_class": "arrowright",
    "unicode": "e6b5",
    "unicode_decimal": 59061 },

  {
    "icon_id": "24923347",
    "name": "arrowup",
    "font_class": "top",
    "unicode": "e6b6",
    "unicode_decimal": 59062 },

  {
    "icon_id": "24923347",
    "name": "arrowup",
    "font_class": "arrowup",
    "unicode": "e6b6",
    "unicode_decimal": 59062 },

  {
    "icon_id": "24923348",
    "name": "arrowleft",
    "font_class": "left",
    "unicode": "e6b7",
    "unicode_decimal": 59063 },

  {
    "icon_id": "24923348",
    "name": "arrowleft",
    "font_class": "arrowleft",
    "unicode": "e6b7",
    "unicode_decimal": 59063 },

  {
    "icon_id": "24923334",
    "name": "eye",
    "font_class": "eye",
    "unicode": "e651",
    "unicode_decimal": 58961 },

  {
    "icon_id": "24923335",
    "name": "eye-filled",
    "font_class": "eye-filled",
    "unicode": "e66a",
    "unicode_decimal": 58986 },

  {
    "icon_id": "24923336",
    "name": "eye-slash",
    "font_class": "eye-slash",
    "unicode": "e6b3",
    "unicode_decimal": 59059 },

  {
    "icon_id": "24923337",
    "name": "eye-slash-filled",
    "font_class": "eye-slash-filled",
    "unicode": "e6b4",
    "unicode_decimal": 59060 },

  {
    "icon_id": "24923305",
    "name": "info-filled",
    "font_class": "info-filled",
    "unicode": "e649",
    "unicode_decimal": 58953 },

  {
    "icon_id": "24923299",
    "name": "reload-01",
    "font_class": "reload",
    "unicode": "e6b2",
    "unicode_decimal": 59058 },

  {
    "icon_id": "24923195",
    "name": "mic_slash_fill",
    "font_class": "micoff-filled",
    "unicode": "e6b0",
    "unicode_decimal": 59056 },

  {
    "icon_id": "24923165",
    "name": "map-pin-ellipse",
    "font_class": "map-pin-ellipse",
    "unicode": "e6ac",
    "unicode_decimal": 59052 },

  {
    "icon_id": "24923166",
    "name": "map-pin",
    "font_class": "map-pin",
    "unicode": "e6ad",
    "unicode_decimal": 59053 },

  {
    "icon_id": "24923167",
    "name": "location",
    "font_class": "location",
    "unicode": "e6ae",
    "unicode_decimal": 59054 },

  {
    "icon_id": "24923064",
    "name": "starhalf",
    "font_class": "starhalf",
    "unicode": "e683",
    "unicode_decimal": 59011 },

  {
    "icon_id": "24923065",
    "name": "star",
    "font_class": "star",
    "unicode": "e688",
    "unicode_decimal": 59016 },

  {
    "icon_id": "24923066",
    "name": "star-filled",
    "font_class": "star-filled",
    "unicode": "e68f",
    "unicode_decimal": 59023 },

  {
    "icon_id": "24899646",
    "name": "a-rilidaka",
    "font_class": "calendar",
    "unicode": "e6a0",
    "unicode_decimal": 59040 },

  {
    "icon_id": "24899647",
    "name": "fire",
    "font_class": "fire",
    "unicode": "e6a1",
    "unicode_decimal": 59041 },

  {
    "icon_id": "24899648",
    "name": "paihangbang",
    "font_class": "medal",
    "unicode": "e6a2",
    "unicode_decimal": 59042 },

  {
    "icon_id": "24899649",
    "name": "font",
    "font_class": "font",
    "unicode": "e6a3",
    "unicode_decimal": 59043 },

  {
    "icon_id": "24899650",
    "name": "gift",
    "font_class": "gift",
    "unicode": "e6a4",
    "unicode_decimal": 59044 },

  {
    "icon_id": "24899651",
    "name": "link",
    "font_class": "link",
    "unicode": "e6a5",
    "unicode_decimal": 59045 },

  {
    "icon_id": "24899652",
    "name": "notification",
    "font_class": "notification",
    "unicode": "e6a6",
    "unicode_decimal": 59046 },

  {
    "icon_id": "24899653",
    "name": "staff",
    "font_class": "staff",
    "unicode": "e6a7",
    "unicode_decimal": 59047 },

  {
    "icon_id": "24899654",
    "name": "VIP",
    "font_class": "vip",
    "unicode": "e6a8",
    "unicode_decimal": 59048 },

  {
    "icon_id": "24899655",
    "name": "folder_add",
    "font_class": "folder-add",
    "unicode": "e6a9",
    "unicode_decimal": 59049 },

  {
    "icon_id": "24899656",
    "name": "tune",
    "font_class": "tune",
    "unicode": "e6aa",
    "unicode_decimal": 59050 },

  {
    "icon_id": "24899657",
    "name": "shimingrenzheng",
    "font_class": "auth",
    "unicode": "e6ab",
    "unicode_decimal": 59051 },

  {
    "icon_id": "24899565",
    "name": "person",
    "font_class": "person",
    "unicode": "e699",
    "unicode_decimal": 59033 },

  {
    "icon_id": "24899566",
    "name": "email-filled",
    "font_class": "email-filled",
    "unicode": "e69a",
    "unicode_decimal": 59034 },

  {
    "icon_id": "24899567",
    "name": "phone-filled",
    "font_class": "phone-filled",
    "unicode": "e69b",
    "unicode_decimal": 59035 },

  {
    "icon_id": "24899568",
    "name": "phone",
    "font_class": "phone",
    "unicode": "e69c",
    "unicode_decimal": 59036 },

  {
    "icon_id": "24899570",
    "name": "email",
    "font_class": "email",
    "unicode": "e69e",
    "unicode_decimal": 59038 },

  {
    "icon_id": "24899571",
    "name": "personadd",
    "font_class": "personadd",
    "unicode": "e69f",
    "unicode_decimal": 59039 },

  {
    "icon_id": "24899558",
    "name": "chatboxes-filled",
    "font_class": "chatboxes-filled",
    "unicode": "e692",
    "unicode_decimal": 59026 },

  {
    "icon_id": "24899559",
    "name": "contact",
    "font_class": "contact",
    "unicode": "e693",
    "unicode_decimal": 59027 },

  {
    "icon_id": "24899560",
    "name": "chatbubble-filled",
    "font_class": "chatbubble-filled",
    "unicode": "e694",
    "unicode_decimal": 59028 },

  {
    "icon_id": "24899561",
    "name": "contact-filled",
    "font_class": "contact-filled",
    "unicode": "e695",
    "unicode_decimal": 59029 },

  {
    "icon_id": "24899562",
    "name": "chatboxes",
    "font_class": "chatboxes",
    "unicode": "e696",
    "unicode_decimal": 59030 },

  {
    "icon_id": "24899563",
    "name": "chatbubble",
    "font_class": "chatbubble",
    "unicode": "e697",
    "unicode_decimal": 59031 },

  {
    "icon_id": "24881290",
    "name": "upload-filled",
    "font_class": "upload-filled",
    "unicode": "e68e",
    "unicode_decimal": 59022 },

  {
    "icon_id": "24881292",
    "name": "upload",
    "font_class": "upload",
    "unicode": "e690",
    "unicode_decimal": 59024 },

  {
    "icon_id": "24881293",
    "name": "weixin",
    "font_class": "weixin",
    "unicode": "e691",
    "unicode_decimal": 59025 },

  {
    "icon_id": "24881274",
    "name": "compose",
    "font_class": "compose",
    "unicode": "e67f",
    "unicode_decimal": 59007 },

  {
    "icon_id": "24881275",
    "name": "qq",
    "font_class": "qq",
    "unicode": "e680",
    "unicode_decimal": 59008 },

  {
    "icon_id": "24881276",
    "name": "download-filled",
    "font_class": "download-filled",
    "unicode": "e681",
    "unicode_decimal": 59009 },

  {
    "icon_id": "24881277",
    "name": "pengyouquan",
    "font_class": "pyq",
    "unicode": "e682",
    "unicode_decimal": 59010 },

  {
    "icon_id": "24881279",
    "name": "sound",
    "font_class": "sound",
    "unicode": "e684",
    "unicode_decimal": 59012 },

  {
    "icon_id": "24881280",
    "name": "trash-filled",
    "font_class": "trash-filled",
    "unicode": "e685",
    "unicode_decimal": 59013 },

  {
    "icon_id": "24881281",
    "name": "sound-filled",
    "font_class": "sound-filled",
    "unicode": "e686",
    "unicode_decimal": 59014 },

  {
    "icon_id": "24881282",
    "name": "trash",
    "font_class": "trash",
    "unicode": "e687",
    "unicode_decimal": 59015 },

  {
    "icon_id": "24881284",
    "name": "videocam-filled",
    "font_class": "videocam-filled",
    "unicode": "e689",
    "unicode_decimal": 59017 },

  {
    "icon_id": "24881285",
    "name": "spinner-cycle",
    "font_class": "spinner-cycle",
    "unicode": "e68a",
    "unicode_decimal": 59018 },

  {
    "icon_id": "24881286",
    "name": "weibo",
    "font_class": "weibo",
    "unicode": "e68b",
    "unicode_decimal": 59019 },

  {
    "icon_id": "24881288",
    "name": "videocam",
    "font_class": "videocam",
    "unicode": "e68c",
    "unicode_decimal": 59020 },

  {
    "icon_id": "24881289",
    "name": "download",
    "font_class": "download",
    "unicode": "e68d",
    "unicode_decimal": 59021 },

  {
    "icon_id": "24879601",
    "name": "help",
    "font_class": "help",
    "unicode": "e679",
    "unicode_decimal": 59001 },

  {
    "icon_id": "24879602",
    "name": "navigate-filled",
    "font_class": "navigate-filled",
    "unicode": "e67a",
    "unicode_decimal": 59002 },

  {
    "icon_id": "24879603",
    "name": "plusempty",
    "font_class": "plusempty",
    "unicode": "e67b",
    "unicode_decimal": 59003 },

  {
    "icon_id": "24879604",
    "name": "smallcircle",
    "font_class": "smallcircle",
    "unicode": "e67c",
    "unicode_decimal": 59004 },

  {
    "icon_id": "24879605",
    "name": "minus-filled",
    "font_class": "minus-filled",
    "unicode": "e67d",
    "unicode_decimal": 59005 },

  {
    "icon_id": "24879606",
    "name": "micoff",
    "font_class": "micoff",
    "unicode": "e67e",
    "unicode_decimal": 59006 },

  {
    "icon_id": "24879588",
    "name": "closeempty",
    "font_class": "closeempty",
    "unicode": "e66c",
    "unicode_decimal": 58988 },

  {
    "icon_id": "24879589",
    "name": "clear",
    "font_class": "clear",
    "unicode": "e66d",
    "unicode_decimal": 58989 },

  {
    "icon_id": "24879590",
    "name": "navigate",
    "font_class": "navigate",
    "unicode": "e66e",
    "unicode_decimal": 58990 },

  {
    "icon_id": "24879591",
    "name": "minus",
    "font_class": "minus",
    "unicode": "e66f",
    "unicode_decimal": 58991 },

  {
    "icon_id": "24879592",
    "name": "image",
    "font_class": "image",
    "unicode": "e670",
    "unicode_decimal": 58992 },

  {
    "icon_id": "24879593",
    "name": "mic",
    "font_class": "mic",
    "unicode": "e671",
    "unicode_decimal": 58993 },

  {
    "icon_id": "24879594",
    "name": "paperplane",
    "font_class": "paperplane",
    "unicode": "e672",
    "unicode_decimal": 58994 },

  {
    "icon_id": "24879595",
    "name": "close",
    "font_class": "close",
    "unicode": "e673",
    "unicode_decimal": 58995 },

  {
    "icon_id": "24879596",
    "name": "help-filled",
    "font_class": "help-filled",
    "unicode": "e674",
    "unicode_decimal": 58996 },

  {
    "icon_id": "24879597",
    "name": "plus-filled",
    "font_class": "paperplane-filled",
    "unicode": "e675",
    "unicode_decimal": 58997 },

  {
    "icon_id": "24879598",
    "name": "plus",
    "font_class": "plus",
    "unicode": "e676",
    "unicode_decimal": 58998 },

  {
    "icon_id": "24879599",
    "name": "mic-filled",
    "font_class": "mic-filled",
    "unicode": "e677",
    "unicode_decimal": 58999 },

  {
    "icon_id": "24879600",
    "name": "image-filled",
    "font_class": "image-filled",
    "unicode": "e678",
    "unicode_decimal": 59000 },

  {
    "icon_id": "24855900",
    "name": "locked-filled",
    "font_class": "locked-filled",
    "unicode": "e668",
    "unicode_decimal": 58984 },

  {
    "icon_id": "24855901",
    "name": "info",
    "font_class": "info",
    "unicode": "e669",
    "unicode_decimal": 58985 },

  {
    "icon_id": "24855903",
    "name": "locked",
    "font_class": "locked",
    "unicode": "e66b",
    "unicode_decimal": 58987 },

  {
    "icon_id": "24855884",
    "name": "camera-filled",
    "font_class": "camera-filled",
    "unicode": "e658",
    "unicode_decimal": 58968 },

  {
    "icon_id": "24855885",
    "name": "chat-filled",
    "font_class": "chat-filled",
    "unicode": "e659",
    "unicode_decimal": 58969 },

  {
    "icon_id": "24855886",
    "name": "camera",
    "font_class": "camera",
    "unicode": "e65a",
    "unicode_decimal": 58970 },

  {
    "icon_id": "24855887",
    "name": "circle",
    "font_class": "circle",
    "unicode": "e65b",
    "unicode_decimal": 58971 },

  {
    "icon_id": "24855888",
    "name": "checkmarkempty",
    "font_class": "checkmarkempty",
    "unicode": "e65c",
    "unicode_decimal": 58972 },

  {
    "icon_id": "24855889",
    "name": "chat",
    "font_class": "chat",
    "unicode": "e65d",
    "unicode_decimal": 58973 },

  {
    "icon_id": "24855890",
    "name": "circle-filled",
    "font_class": "circle-filled",
    "unicode": "e65e",
    "unicode_decimal": 58974 },

  {
    "icon_id": "24855891",
    "name": "flag",
    "font_class": "flag",
    "unicode": "e65f",
    "unicode_decimal": 58975 },

  {
    "icon_id": "24855892",
    "name": "flag-filled",
    "font_class": "flag-filled",
    "unicode": "e660",
    "unicode_decimal": 58976 },

  {
    "icon_id": "24855893",
    "name": "gear-filled",
    "font_class": "gear-filled",
    "unicode": "e661",
    "unicode_decimal": 58977 },

  {
    "icon_id": "24855894",
    "name": "home",
    "font_class": "home",
    "unicode": "e662",
    "unicode_decimal": 58978 },

  {
    "icon_id": "24855895",
    "name": "home-filled",
    "font_class": "home-filled",
    "unicode": "e663",
    "unicode_decimal": 58979 },

  {
    "icon_id": "24855896",
    "name": "gear",
    "font_class": "gear",
    "unicode": "e664",
    "unicode_decimal": 58980 },

  {
    "icon_id": "24855897",
    "name": "smallcircle-filled",
    "font_class": "smallcircle-filled",
    "unicode": "e665",
    "unicode_decimal": 58981 },

  {
    "icon_id": "24855898",
    "name": "map-filled",
    "font_class": "map-filled",
    "unicode": "e666",
    "unicode_decimal": 58982 },

  {
    "icon_id": "24855899",
    "name": "map",
    "font_class": "map",
    "unicode": "e667",
    "unicode_decimal": 58983 },

  {
    "icon_id": "24855825",
    "name": "refresh-filled",
    "font_class": "refresh-filled",
    "unicode": "e656",
    "unicode_decimal": 58966 },

  {
    "icon_id": "24855826",
    "name": "refresh",
    "font_class": "refresh",
    "unicode": "e657",
    "unicode_decimal": 58967 },

  {
    "icon_id": "24855808",
    "name": "cloud-upload",
    "font_class": "cloud-upload",
    "unicode": "e645",
    "unicode_decimal": 58949 },

  {
    "icon_id": "24855809",
    "name": "cloud-download-filled",
    "font_class": "cloud-download-filled",
    "unicode": "e646",
    "unicode_decimal": 58950 },

  {
    "icon_id": "24855810",
    "name": "cloud-download",
    "font_class": "cloud-download",
    "unicode": "e647",
    "unicode_decimal": 58951 },

  {
    "icon_id": "24855811",
    "name": "cloud-upload-filled",
    "font_class": "cloud-upload-filled",
    "unicode": "e648",
    "unicode_decimal": 58952 },

  {
    "icon_id": "24855813",
    "name": "redo",
    "font_class": "redo",
    "unicode": "e64a",
    "unicode_decimal": 58954 },

  {
    "icon_id": "24855814",
    "name": "images-filled",
    "font_class": "images-filled",
    "unicode": "e64b",
    "unicode_decimal": 58955 },

  {
    "icon_id": "24855815",
    "name": "undo-filled",
    "font_class": "undo-filled",
    "unicode": "e64c",
    "unicode_decimal": 58956 },

  {
    "icon_id": "24855816",
    "name": "more",
    "font_class": "more",
    "unicode": "e64d",
    "unicode_decimal": 58957 },

  {
    "icon_id": "24855817",
    "name": "more-filled",
    "font_class": "more-filled",
    "unicode": "e64e",
    "unicode_decimal": 58958 },

  {
    "icon_id": "24855818",
    "name": "undo",
    "font_class": "undo",
    "unicode": "e64f",
    "unicode_decimal": 58959 },

  {
    "icon_id": "24855819",
    "name": "images",
    "font_class": "images",
    "unicode": "e650",
    "unicode_decimal": 58960 },

  {
    "icon_id": "24855821",
    "name": "paperclip",
    "font_class": "paperclip",
    "unicode": "e652",
    "unicode_decimal": 58962 },

  {
    "icon_id": "24855822",
    "name": "settings",
    "font_class": "settings",
    "unicode": "e653",
    "unicode_decimal": 58963 },

  {
    "icon_id": "24855823",
    "name": "search",
    "font_class": "search",
    "unicode": "e654",
    "unicode_decimal": 58964 },

  {
    "icon_id": "24855824",
    "name": "redo-filled",
    "font_class": "redo-filled",
    "unicode": "e655",
    "unicode_decimal": 58965 },

  {
    "icon_id": "24841702",
    "name": "list",
    "font_class": "list",
    "unicode": "e644",
    "unicode_decimal": 58948 },

  {
    "icon_id": "24841489",
    "name": "mail-open-filled",
    "font_class": "mail-open-filled",
    "unicode": "e63a",
    "unicode_decimal": 58938 },

  {
    "icon_id": "24841491",
    "name": "hand-thumbsdown-filled",
    "font_class": "hand-down-filled",
    "unicode": "e63c",
    "unicode_decimal": 58940 },

  {
    "icon_id": "24841492",
    "name": "hand-thumbsdown",
    "font_class": "hand-down",
    "unicode": "e63d",
    "unicode_decimal": 58941 },

  {
    "icon_id": "24841493",
    "name": "hand-thumbsup-filled",
    "font_class": "hand-up-filled",
    "unicode": "e63e",
    "unicode_decimal": 58942 },

  {
    "icon_id": "24841494",
    "name": "hand-thumbsup",
    "font_class": "hand-up",
    "unicode": "e63f",
    "unicode_decimal": 58943 },

  {
    "icon_id": "24841496",
    "name": "heart-filled",
    "font_class": "heart-filled",
    "unicode": "e641",
    "unicode_decimal": 58945 },

  {
    "icon_id": "24841498",
    "name": "mail-open",
    "font_class": "mail-open",
    "unicode": "e643",
    "unicode_decimal": 58947 },

  {
    "icon_id": "24841488",
    "name": "heart",
    "font_class": "heart",
    "unicode": "e639",
    "unicode_decimal": 58937 },

  {
    "icon_id": "24839963",
    "name": "loop",
    "font_class": "loop",
    "unicode": "e633",
    "unicode_decimal": 58931 },

  {
    "icon_id": "24839866",
    "name": "pulldown",
    "font_class": "pulldown",
    "unicode": "e632",
    "unicode_decimal": 58930 },

  {
    "icon_id": "24813798",
    "name": "scan",
    "font_class": "scan",
    "unicode": "e62a",
    "unicode_decimal": 58922 },

  {
    "icon_id": "24813786",
    "name": "bars",
    "font_class": "bars",
    "unicode": "e627",
    "unicode_decimal": 58919 },

  {
    "icon_id": "24813788",
    "name": "cart-filled",
    "font_class": "cart-filled",
    "unicode": "e629",
    "unicode_decimal": 58921 },

  {
    "icon_id": "24813790",
    "name": "checkbox",
    "font_class": "checkbox",
    "unicode": "e62b",
    "unicode_decimal": 58923 },

  {
    "icon_id": "24813791",
    "name": "checkbox-filled",
    "font_class": "checkbox-filled",
    "unicode": "e62c",
    "unicode_decimal": 58924 },

  {
    "icon_id": "24813794",
    "name": "shop",
    "font_class": "shop",
    "unicode": "e62f",
    "unicode_decimal": 58927 },

  {
    "icon_id": "24813795",
    "name": "headphones",
    "font_class": "headphones",
    "unicode": "e630",
    "unicode_decimal": 58928 },

  {
    "icon_id": "24813796",
    "name": "cart",
    "font_class": "cart",
    "unicode": "e631",
    "unicode_decimal": 58929 }] };exports.default = _default;

/***/ }),

/***/ 21:
/*!**********************************************************************************!*\
  !*** C:/Users/what/Downloads/GarbageClassify_frontend-main/static/img/icon3.png ***!
  \**********************************************************************************/
/*! no static exports found */
/***/ (function(module, exports) {

module.exports = "data:image/png;base64,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"

/***/ }),

/***/ 211:
/*!*************************************************************************************************************************************!*\
  !*** C:/Users/what/Downloads/GarbageClassify_frontend-main/uni_modules/uni-transition/components/uni-transition/createAnimation.js ***!
  \*************************************************************************************************************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

"use strict";
/* WEBPACK VAR INJECTION */(function(uni) {Object.defineProperty(exports, "__esModule", { value: true });exports.createAnimation = createAnimation;function ownKeys(object, enumerableOnly) {var keys = Object.keys(object);if (Object.getOwnPropertySymbols) {var symbols = Object.getOwnPropertySymbols(object);if (enumerableOnly) symbols = symbols.filter(function (sym) {return Object.getOwnPropertyDescriptor(object, sym).enumerable;});keys.push.apply(keys, symbols);}return keys;}function _objectSpread(target) {for (var i = 1; i < arguments.length; i++) {var source = arguments[i] != null ? arguments[i] : {};if (i % 2) {ownKeys(Object(source), true).forEach(function (key) {_defineProperty(target, key, source[key]);});} else if (Object.getOwnPropertyDescriptors) {Object.defineProperties(target, Object.getOwnPropertyDescriptors(source));} else {ownKeys(Object(source)).forEach(function (key) {Object.defineProperty(target, key, Object.getOwnPropertyDescriptor(source, key));});}}return target;}function _defineProperty(obj, key, value) {if (key in obj) {Object.defineProperty(obj, key, { value: value, enumerable: true, configurable: true, writable: true });} else {obj[key] = value;}return obj;}function _classCallCheck(instance, Constructor) {if (!(instance instanceof Constructor)) {throw new TypeError("Cannot call a class as a function");}}function _defineProperties(target, props) {for (var i = 0; i < props.length; i++) {var descriptor = props[i];descriptor.enumerable = descriptor.enumerable || false;descriptor.configurable = true;if ("value" in descriptor) descriptor.writable = true;Object.defineProperty(target, descriptor.key, descriptor);}}function _createClass(Constructor, protoProps, staticProps) {if (protoProps) _defineProperties(Constructor.prototype, protoProps);if (staticProps) _defineProperties(Constructor, staticProps);return Constructor;} // const defaultOption = {
// 	duration: 300,
// 	timingFunction: 'linear',
// 	delay: 0,
// 	transformOrigin: '50% 50% 0'
// }
var


MPAnimation = /*#__PURE__*/function () {
  function MPAnimation(options, _this) {_classCallCheck(this, MPAnimation);
    this.options = options;
    this.animation = uni.createAnimation(options);
    this.currentStepAnimates = {};
    this.next = 0;
    this.$ = _this;

  }_createClass(MPAnimation, [{ key: "_nvuePushAnimates", value: function _nvuePushAnimates(

    type, args) {
      var aniObj = this.currentStepAnimates[this.next];
      var styles = {};
      if (!aniObj) {
        styles = {
          styles: {},
          config: {} };

      } else {
        styles = aniObj;
      }
      if (animateTypes1.includes(type)) {
        if (!styles.styles.transform) {
          styles.styles.transform = '';
        }
        var unit = '';
        if (type === 'rotate') {
          unit = 'deg';
        }
        styles.styles.transform += "".concat(type, "(").concat(args + unit, ") ");
      } else {
        styles.styles[type] = "".concat(args);
      }
      this.currentStepAnimates[this.next] = styles;
    } }, { key: "_animateRun", value: function _animateRun()
    {var styles = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : {};var config = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : {};
      var ref = this.$.$refs['ani'].ref;
      if (!ref) return;
      return new Promise(function (resolve, reject) {
        nvueAnimation.transition(ref, _objectSpread({
          styles: styles },
        config),
        function (res) {
          resolve();
        });
      });
    } }, { key: "_nvueNextAnimate", value: function _nvueNextAnimate(

    animates) {var _this2 = this;var step = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : 0;var fn = arguments.length > 2 ? arguments[2] : undefined;
      var obj = animates[step];
      if (obj) {var

        styles =

        obj.styles,config = obj.config;
        this._animateRun(styles, config).then(function () {
          step += 1;
          _this2._nvueNextAnimate(animates, step, fn);
        });
      } else {
        this.currentStepAnimates = {};
        typeof fn === 'function' && fn();
        this.isEnd = true;
      }
    } }, { key: "step", value: function step()

    {var config = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : {};

      this.animation.step(config);






      return this;
    } }, { key: "run", value: function run(

    fn) {

      this.$.animationData = this.animation.export();
      this.$.timer = setTimeout(function () {
        typeof fn === 'function' && fn();
      }, this.$.durationTime);








    } }]);return MPAnimation;}();



var animateTypes1 = ['matrix', 'matrix3d', 'rotate', 'rotate3d', 'rotateX', 'rotateY', 'rotateZ', 'scale', 'scale3d',
'scaleX', 'scaleY', 'scaleZ', 'skew', 'skewX', 'skewY', 'translate', 'translate3d', 'translateX', 'translateY',
'translateZ'];

var animateTypes2 = ['opacity', 'backgroundColor'];
var animateTypes3 = ['width', 'height', 'left', 'right', 'top', 'bottom'];
animateTypes1.concat(animateTypes2, animateTypes3).forEach(function (type) {
  MPAnimation.prototype[type] = function () {var _this$animation;

    (_this$animation = this.animation)[type].apply(_this$animation, arguments);




    return this;
  };
});

function createAnimation(option, _this) {
  if (!_this) return;
  clearTimeout(_this.timer);
  return new MPAnimation(option, _this);
}
/* WEBPACK VAR INJECTION */}.call(this, __webpack_require__(/*! ./node_modules/@dcloudio/uni-mp-weixin/dist/index.js */ 1)["default"]))

/***/ }),

/***/ 22:
/*!**********************************************************************************!*\
  !*** C:/Users/what/Downloads/GarbageClassify_frontend-main/static/img/icon4.png ***!
  \**********************************************************************************/
/*! no static exports found */
/***/ (function(module, exports) {

module.exports = "data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAARcAAAD8CAYAAABdJ+AhAAAABHNCSVQICAgIfAhkiAAAIABJREFUeF7tXQd8FFUTn7tUSOgdQgoJLXSkKr2qNKUJCNJERKUJiPQioPQiVZCiSAcVAenwgQUQUFqoIUcPnYT0cvfNbLLh+u3u7d5dLu/9vvvU3CvzZt/+b95UFWTDFlw6uIOnv3cPtZe6YnpCShikanNlw20wkhkHOA7odACFCxc6n5CYFBEXF79Jc0fzqzuwRpWdNhEaGNxb5ec9V6fVFvCvF6T2DikI9GGNccDVOaCLT4GYzechSfMUChYuBLVq1Ybg4GAoXKQIhIeHw+WICDh54gT89edf6Tqd7mliQsIXkbc161x9X9boyxbggg8hv2dun5W69PR387ev5FGgW/XszHNGew7jQHLUM3gy6SAEBwTBxEmToF79ehY5EBsbC2u+Xw2rVq5MQ5DZeunK5R7ZlV3ZAlzCyodd9SyaJ7T4mGYensX8syuvGd05kAMELE8nHYI2rd+CWXPnCOZAxKUIGNC/f1rcy5dnz0dcqit4oAt1dHlwCatYbrNn4dwdS05/y1Pt5+1CrGOkMA5Y54AWr0IPBv0CbVu/LQpY+Fnv3rkLb7d+M12r1X536erlT7Ibv10aXIIDgpt4eMCRknPbgQ/TrWS3s5Xj6Y1dfBLKxOeFjZs3S+bFib9PQM/u3SE9DWpo7mn+kzyREwa6NLiEVSx7I1/b8FCmY3HCyWBL2sWBtIdxcGfQdli/caNVHYuQRUYO/zx93969/1y8crm+kP6u0sdlwSW4VHB1D0/4N+jH7sCuQ65yXBgdQjnw/PvTUDO5BHy3aqXQIRb7kf6lfZs2kK6CAhqN5oXdEzpoApcFlzKBwcO8gwrMCVjQ3sNBvGDLMA7IxoHno/bDpz0+hL79+8kyZ73adZKePHw8KPKOZq0sEzpgEpcFl7Cw0D353q38FrsSOeAUsCVk50BUx3WyXIl4wrp26pxy5vSZr2/e1kyWnViFJnRZcAktX/ZU/vbhtRm4KPTk2bSKcYCsRLd6bYSjx49DQOkAWdZZMG9++rLFSzZci4r8QJYJHTCJy4JLWIWyp/O1C3+NgYsDTgFbQlYOJF6MhuiJ++CGJkq2eRfOXwDLliz582rkjQayTarwRAxcFGYwmz7ncYCBS8YzZ+CS884+27HCHGDgwsBF4SPGps+pHGDgwsAlp559tm+FOcDAhYGLwkeMTZ9TOcDAhYFLTj37bN8Kc4CBCwMXhY8Ymz6ncoCBCwOXnHr22b4V5gADl2wALj5lCr3mW7m4wkeBTc84IC8H0h7FQdyRG8yJTl62yjdbaFjodLWvZxvRM+p0/qCF0ArhFUUPZQMYB+TigI/aE7Zu2SbXdMA8dGVjpfSJ+ARTcrpeS6eGjWQckIcDDFzk4aNdszBwsYt9bLCLcoCBiws8GAYuLvAQGAmyc4CBi+wsFT8hAxfxPGMjXJ8DDFxc4BmJAZekpCRITEyCAgXyuwDljATGAcscYODiAqdDDLg8fPQI4uLjITQkxAUoZyQwDjBwcekzwMDFpR8PI04iB5jkIpFxcg5j4CInN9lcrsIBBi4u8CQYuLjAQ2AkyM6BHAsuQUFBIWqtNkCnw/qIzm46oHpH84U40TGdi7MfFltfKAcIXJYuXnwhJSV9iNAxivbTwYs0VdrVu3fvJlpaR3KayzJBQZ1UoOqp0+laqlQqP0U3ImJynQ5zd+KuGLiIYJodXbGQMUTejIJ8efNAsaJF7ZiJDbXGgUxwgfT0dJdiFL7/p/GN2xabELf0yZMnL/WJEw0uocWKFdX5+O7GNzgMdLBIB9rTqvT0qzfv3btmvGtcmMwwTfHTJPOf8tRZsMJevrYuAxflzyAPLLRSaJkQ8FCrlV80h65A4HLyxAnYsHmTIziQhIv8jZ8jmZ9TKECk6C9csmTJwj4eHhVVoK6iUgMKGVBBp9N2i7pzZz/fTxS4hBQNKab21f6BwsFVrVrV01JpSQSVSrjAAvy0cAQn9NfIKeBCL3ZsbCykpKRmbd/b2wv8/PzA28tLcbYzYFGcxQYLOBhcjDf3CP8wGT8rEWTSzO28TOngQQgyS7Xa9A4IMDupj2BwKVKkiH/e3LlPgU51PfK2poO5BRBUgvHvk/BDhZuc8jPmTHBJSU2F1MyX3QtfdCVecnqp799/AM9fvAAvBBECFG8vb0hJTeGAJhVpyItXlOJ4RfH19VXkDVAaWGhv+qCpyCYUntTDQ43OmQVkk+acDC48t67iv4xGgPnVLMAEBb2Pt5mVWNO6wa1bt84KBpcygYEzUMfyQWxiQoXHjx/HGU+OwNIJ/7YGP3kUfm5Wp3c0uNCL9vz5c3j2/AWQx69+o5e8SKFCnDQhR4uNfQm3796FXLl8oVSJEmbBg2iIfvgIYl++hNKlSsnufUzzR926zYFacFCQbC+PPn8io+QrJiYH36XOYekZSZnPRcCFJ30z/ksfBBnDA49/RF3s9yiA1Mays1UFgUuxYsX8/H1zxWGelG5YCJsmzmoIKmQhmoOfYVKYJvcYR4IL/7J7oJGsSOFCKDHkzZJW6CV8/OQpJ2EURoBBVZVdL+Kdu/cgBq9BxXEems9We45gd+/BA1S05oXSAaVsdRf0/ZOnTzngknNOQQuzTlw+FwfqXIRw/Bx26ooAY6BrJV2Mr6eXBu9E7wkCl0zL0OrIW5qCOGGWuhqBpRj+N4FNYyHUOKKPI8CFpJU7KEHExcXbfNkJZG4jMFCTqvTkgSUMlaZirjq09g3OkmMfwOjvNzAggLt2seZYDrgguBADYvHTAwFmtz43EC82qHQQJwhcQkoHTUXzbs2bt2+1NZJatuB/d3Esm62vpjS46INFcFCgIL0K93LeuYt6kVQIRClCDEBIBRaeSzzA+Pv7oQQTIEp6IrqfoPT1+MkT8MerXWksqs4sQs457S4KLsSMGPzU0ZdgypQO6gdq1VBh4BIYvBA75sV7VF+etSi1fIn//rU+qxPxVzIWXyJntrOXr8Dgb2Yo4ucSj0GOpG+QKgnwQBGCoCRED2MvsOgDDF2RKAK8SOHCnB7GmrI5Pj6Bu4I9Q12St7c36neKC6LXmc/d3dcmcDm+bx8sGTPWqVslI0LB1+sZ00CKXgIYkmQA9bMN0Fa0TxC4oJizFMf43Lx1qz8NRmDpjP+g65CBRejZXyfgrpNF5ovnL8DEsWNkBxcClsgoDZTEF02IzsPSCeD1FgXRkmBNDyMXsOjTQXqYx6g3IWmGpCdSyubyzcV1SUxKRActLQJQImhRYsmbJw8HoiwdhVPf5azFCVwOHzoMX31j8HvucOJ88QenXEPEDtP2O/6pDQKMLjQw8DVQqU+LBhcEFrJv3sRPCeP53RVc+KsFaf/leNnoekQ6G16SKIzKYP66kfHdPc4TU+wVSuhJ4/PYkPmaaEjXpnPXHmoENn54hXLm9UeD0iFdyeRsuRBM6YfBUrv/IBoB1sT4YRcJpEiXyx0hG4AL8aovgstae8CFrELzzXHdHcFFbmDR5xtJQ9GYU4auIfw1if5GUkNO1m+QdCe3mzuBpjVFNFn+SHqTsxXGK6hcIJ1NwOUagkt5SeASqdF8hMy/Y05qoYfibuBCv56Xr1zlzMxKxs2QtBKPlieSIPTN2XIedDZX9uZANgEXYvK7YUFBd0RfixBcjuNgcpQz29wNXK7diMRrgq9sfiLZ+3gz6p3JgWwELqcRXD6WAi7kjdU6J4ALpWOIQVFZqm+KMw8iW9v9OJCNwEXX74MP3jp27PhewQpdtUrlez0q6n18bN7uDi6kZyGppVxYqCifFPc70mxHrsKBbAQusG3Llq+//GL0GMHgEhISUubgkSMWpRZ30rkQsLhSfpK76Dt0716Gl69xq4hla0lPw5p7cyA7gcvff/31d68e79cXDC61a9eut2nr1hrWHqE76FzIWnMPzZIktTirRVyKgIMHDnCxJBEREfASHdr4VhKDEQlMrly+nPW3Uuh5Gx4eDnXr1YMWLVtCAHrSumOjgEayrGWXFhoSLJvzYXYCl/PnzsV17PCOv2BwadS4cYs169aVdXdwcdbBJelk7Zo1cGD/friHPjAEEgQWFRE0wiuFW5ROKKfLyb8zQIjA6NTJk9CyVSvu07EzBaq7TyPrXRI6+WWHRsGsYsI8bO0pO4HLxQsX4J127YXlcyEP3dZvvvnu0uXLLXshIXfcQXKx9ZDl/n7Htu2wfds2DhgIUDp17gx169eTfNUhkCKAWrN6NSYLVMHQYcPcDmTkfgbZYT63Bpf2HTr0mr9woT+TXOQ5ihRgOf2rrzCg8Q707dePAxW5rzPbt26DqVOmgBrTT44cNQre79VTHuLZLA7ngNuCS2hw8DI8/ANnzp5t9RqVHSUXSvJEcT6OatevXsPcHPPh2rWr0LVbN+jdpw8XY0QBYUo0ujaN/XIMJ81UrVYN5uDacojrxYoWUYJcNqcFDrgtuNC1qHOXLh+7G7iQyZmihR3V1q/7AX5cuxY6dOwIH340ANACB74+Pg5Zfs+u3TAcr0iYhhBmzJ4J1WtY1c1bpclD7ZGjwxMc8sCMFmHgks2ioh11SEgPMmjgQIiJiYFZc+ZAPdSp2GokcezYtgOO/e9/oEEryYsXz7OGeCMgkYWoerXq0KBRQ2jajAos2G5kheqMwJacnAy1a9WG9Zs2gKenp+2BrIfTOcDAhYGLySEk3QoBS0tU1o6fNNGqopZ8WebOmg0n/v4bHqGHMAoZ4IUvvwdWecOs6lzSarJCUPJvD0y1TlHNaWlpoMa/1apVCz4fMRJq1all9UUggOmK+p30tHSuvtO2n3/mrFGsuTYHGLgwcDE4oaRQHY2K1HETJkDf/v0snt7Tp07DuLFjIfLGdc7CQwrYtMyX39wgKvxm0BAkPBGA0tPTIDAoGGbNnm0VZAhg3uvShZNgtJjaYfzEidCnX1YeMNd+y3IodQxcGLhkHX0Clq+mToXZeA1q2bqV2VeCQOULBJ/btzQIKB5cmgGSJswCCv7R+KtCGNL/FFNQmmuNGjeB1essxpgC0TcRQS85IQk8vD2hbbt2MHf+vBz66rr+thm4MHDhTikPLBs2bbJ45ejXuy/qU45yUgplgDMGFb4sLc1XCLP918RrTzsEALL4mDNZk17nMjrS/bbzNzh65AgkJMRzdXMO4RqWwgM+HvARnDl9Gp49e45XKzWgLxMsXrrE9d+0HEghAxcGLjaB5cjhIzD0s88gPiEBMEO6qThCta7VKnQb94emzZvBiJEjJfm/UErEMaNHQ1EsjvbTpo1mAYaUxg1ff4OzWFEibgKYjwcNghGjRubA19e1t8zAJYeDC195YNmKFWavQksWLYb5ePUgZSwlhtJvJKlQlT4PVOD26dsXRo+h/Of2NQKPHu91g3z58nEAY67Rof3pxx9RenmGuZER2PDuZYl++6hho+3hAAOXbAgulLT6GRYus7dFXr8Boz4fDr1694ZBn34CfrlzG0w59osvYcuWzZy1x1IKx85du8LY8eMku/6b2wMPMBSnNAGtVcaNvm/0RgMuKRZW0uT8YHJjDt0//v5LVjrs5W9OH8/AJRuCC186lE9QLfUQ9+nZC8LCwmDGrJmQx98wSoIHFs62bEZhSzqRpSjtCPF/kUIfWYd6oDfw8u++M7sGHdxdO3dCVGYZVW9vH2iAGd6/+36VlOXYGAU4wMAlm4ILAYs9OXLpwVPw4a7f95j82lsCFrqCkI6D/FNWrFqpuJSw5vvVXNT1//6gTKWGjZTBTRo2xAoA/hAXj2XAkTZvXx9Yjd7E1gDvjfr14SGmpxDbihYrBn+dPGEyrFbNmvAClctiWxDWrCbFtXELL18eUpJTxE4HderWhQ2bN5mMKxcaxpnuxbYWLVvB8pUrxA4z6M/AJQeCC0kF7du0gfUbN5q8iKtXfQ8zpk3jfFewJEvWYeGBpRWmRViyfJldh07MYLr+UJR0py5UdsqwkW7G18cXjh37H/eFDyp5yTK1Ea9yllrd2rWhcaPGGHVtOp+lMTsQhI8cOQz/nD1r0qU+vtQffTSQSzMhtNF8hw4ehDPn/jMZEhYcwvkYiZlv+9atXGIuc+AiZb4pkyZxVjtz8wndI/Vj4GIHuMTFxXFu7satcpUqYp4BiCmKRhPTtcgeyaXd2224XzpjfQb5sHR7rytXWkJfx8Ipbj094MMBA+CLL0eL2pu9nclEvmjhQrPSC0k2O3/9FS6cP5+xTOYVzhxo8nQQuPTo8T4MHU7VZoQ1eknW//iDRXCZv2ChqOshzfcDSliWwMUa/eYoXjBvPpcTxxK4iJ2va6fOXIgFAxcL50OpwMULWB3x6KFDEHHpIjyMfiVelyhZEh7cv59FTbHixdFfpDLUQaVkpSqVwd9Ip6FPtiPBhfdnOfbnHybXmhpVqkICZk0zsAqRNQavQm+99RYsWrJY2Nsocy+SXiagR66xYx8vgdGv7HOsqkctNyqlyfdl9ry5Zqlg4GL74TBwscEjucGFpJQ1eGU4deJvoKtBq9atOdHVknMYJVKieJsT+M+XL19C7Tp1oe+AD82CjKPAhawsjRs0hPEodhtfM/r06g3Hjx8z0d2SwxwlhFq6YrntU6lQj6+mTOUy3S1f+Z3JCtUREMuXr4COdf9kCC8Ihrly5+L0I+Yc8Ri42H5IDFwcDC6LUZS9d+8uzJ47V3TQHPmSUD4USuv42dChmLWtvgH1jgIXXolLUot+465DaFLOcBp59Q3dMgIDA+FIpk7D9rFUpgdJKO937w7/nj9nsgDpXUipe/jwoazvKPfLFExqZU5Pw8DF9jNi4OJgcJmIQXrkB2LJscv2I8PKbKgjoExunw0dBs1atsga4ghwsSa1NKhXH6KjH9LvvgGykPVlPyoe5c42J4RXxn1IQjEXmkBSTTRaf/btpZriGY0Uu23atoVZc+eYLMXAxTb3Gbg4EFwOHzgIixcuAEw8ZfbX0PbjetXjwL79XDqDKTO+hipVMxS/jgAXS1LLagS8GQh4+nFBRBN53c74+mu790tzUU3jZ5jbpTi69UvNKEcSCiXwNo7Upn1hWQhOqUsR01xDjCSd158n/2bggtYnptB9DuXQB8paE52gW45MdDcjb8LIoUNkARZ+c/Rre/bMWQSY6Q4DF9K1DMErmfFV4bXqNSDGyNtXhXejqtWrwfZffhaDmyZ9yZOYitaT5YnSclJqTKlFzoln1IwtXCQNUjrMy1i2RL+cCfU9i9coY70Lk1xsP1ImuThIchmBL2SjRo3MuqHbfkzme/BWjh27djkEXPj4IeOXjQISB2CibQMvXAHmXGv7plIaFFD4DK03BCpFCheCwphmQSqo8GuRhEJKcmPzKO1t0YIFcPPmTXhCoQCZzRPz+6794QcTEzEDF9unloGLA8CFrkNrV38P5sy2th4RHXpyRKtbr67ZruTcxF+NlL4WfYHZ3qgZ6yBaNWsBUfhS6vR0LWQdelOC2TklNRXNwS/gMeZqoVgkugIVKJDfFptMvqd5Hj6kmtexEFYG8/WicpYaXSep9Ig5cOmJyl5KoUkWJb754DiqHmB8jXJ1cClbJhR0CNBimyUPXTpn7FrkgteiEUOGABZWEy218JICf0DIZE1BeBQ5TMpRR0suNapW4zK9GfuJhAWXMbAQ8XqXo8ePC1bi8mDwHK9WBARFMI+LPaBC8/j55ebAyQ9DHPjGSyjmwGUaJrhKSUmBm5GRWf29vLzh408GmTjLuTq4hAaFQMG+tcEnpKBgfIk7HAk9KrYw6+DIwAXAF6Vol9K5kF/LBxg4t3P3bkmmZ/o1vaGJQl+XE1xCJPrVvY8u2u3feQeuXb0KJUuWgs8yvUSVlFx4oCNa9NucmbNg+TJTN36ysixc/K3Ng00lZKnEiSUwsDlBZgeh81gDF7oWkS8R8Zlv2RVcCAyKT2kNuapYreVnwN4Xm85BzxKNzXodM3BxQXAhT9xJY8dwACG2kZKRwMTYn4RekPFo0iaF6ZSvZ2Q51CkJLpYc0Jo2bMQVN9NvZCFavGSJxRSX1JfAIPrRY+6fBfLnR0Vtfkm1hcXOYwlcyOOYAjCNwYWud7XQ1d9Y0nF1yYWBi9i3zXZ/l5Nc7AEXS8pHYgMvSfDKXPqbkuBCcUQdO3Uy0T2Uw7u9FlNVZjnNoSK3QKGCGD9zxuzT4i0/qagTIVAhy4+3hKJoxqAidB7eKmQMFjyvKXBPX+dCVzzSdzFwYToXtwAXSgNw8MAB2INXqeBgzGhvxomLTxUwZ+EiKBOKOg+FwcWcWJzhkdvFwLeFlLDd338fJk+dYgAu5KNCRdh4yw/F8UgBFXvBiUCEwMOYp6SspnQIK/CKZxzFXbtObdi0dYvBfpjkYvuXnlmLbPDI3tgi3r9F6LWI94AtVaoUFyldpWpVk9B/klrInPotRvk6wolOjL6FTLc7fvnFRL9EoECBjAQqUszJ+r4uZJaWCk6UmJsU48bRzORcVyY0FDZt2GBwIkhyea3Wa7Bl+zYGLmZSa1h7fRi4KAwuNH1PVOjOxVgiS2U29EkgsZ1PvmQpXwoBEEkulEtlGQZBFiteTFHJhfQRpPuhhFD6rXvXbnD6n1NZv/S8lUgokNr+7QMsfpYKkTejZPN1oesdOQEaPwuyhFHt6sWLFpmQ9Rla+4ZhGk/9xiQX20+PgYsDwOVbDDbMj4miLYXv65NAv6BkbuZ/WUlcJzAxjuTlr0WO0LlY0v20fetttKxcflUaBH/lwytXQstYhlOfHI2c6WJjYiFvvrySJB59GoiPNRFEjE3kPC8HYvZ/uhbpNzKLD8AwC2NJh4GL7afLwMUB4MJfjYT4fRiL7ZauJPT3Ph98AFuwJCnflFLoEsDlwVy3xi7z1TDPTFxcvEHdod7og2MuGbbtoyhPD/76RNYn4/Sd5EBHxdqMrW8kmS1EM3QNTDW5+7ffDAjJkycPV+PaWNJh4GL7eTFwcQC40BKUakGNNXnM5RIxvhbt2L4dftuzm/sz/drS4Tf2EKUX5YuRo+CTIYOzUi8oBS7G0hRPb9XwSmhKxhpEmekVcuXKhYrcqbIEKdo+uoY9jHUy5kIFLHkY099JiXvs2DGzVRzNeaZKzXmbDy1kZ/7712R7lOZS7kx0zM9F7Cmy3t/lrEU8uZt+2gBRkTes5mWlvryIbsvVmq4qv+zYASVQ8fvl+PHcMs4GF/qVX2Yhy768j/nVbEJAhe/NJ7gyp28Z9MknMOubbwzItKZDatOuDdwtmAx5moUJ3trLwzcg6Hku2ImVIY2bq4OL1HCChugHtebHdYJ5ZK4jy6FrJYfuQ8xxMgq9aK3VTuaZSpLKG3XrQ1BwEOdbYakcKTm1UYDdbgxaVDpwUajkQnuwBYp2nTK9wWJAhYaRpDcKKzj+dyEzT27mXHzqih49e8KG9esNyUMdUjDGJR3EpNrG7d0uHeFOiBYKdKsueEvPN/0HIRpP2LrF0PJEE7g6uEhxyns88QD0bd5FVJ5hBi5mOPDMCrgIdaQjYHm/W3cgBzNKbByAQXSWrlF0ny1YsBD6w+yHH7AuM+XWdbTkYk7nojS48KBCj4DihoQqekmXRUGJxvoga1ci8sNpgzWqzSniGbjYxlQGLjZ4ZK+fC01P8UUj0fxZsGBBLmcuWYMqhlfkpBK6BlHG9cOHD2Nx9v9BOPpgUEEu/js+exuZpSk5FF97p0WTZpCESY1qoYNXP8ymT83R4NK0Abr+3zV0/VcKXIxBRUxQI3/VNFao8z5F5q5ExE8vb29Y9O23Zl0IGLgwcDHHAackiyKAOXLwEPxz6iSCwCvRnKQPLy9PzlmuD+ZEsVaIi0y/VPuYnMDWY46Rb+bOy/LOdQa4GPu5yH0t4szQKM1FY+oEXlIRAyr8w7ekyOWtRO3atzcxQfP6FnOJomheBi4MXFwGXIwJIT3MI8yuRkGNQn/t6UUj5RZV+vv999/hZyN/EqUkF0su8+YiooXuxdrR5BNF2ZvThdbgHRHNuQGQgrd9hw6oA9mM+qsnBiR5enpB4yaNuYqQ5hoDFwYuLgsuRBgBzKAP+5tNo2jt0ZGPy+fDh8PyVYb1jJUEF3PZ265cvgJtMSEUn4GOElp/9PHHkhV4coIKzz/SYVWoWNFE18LXXfoYHefmzJplwm6qWzRpyhSLZnUlwKUBlpUNKBVg+63N7EHX6SuYltNSUTS5TdFi52M6FxuPUg6di6UlTp08BYsXzDexYOj3H/jhAK6USD0sI1K6dGm4i0F3lEi6YeMm0O39HgZTKwUuBGak7zFXkqNi2XKQmpLKRUXTVaJPP/FOdEqACjGGQinIOc5cBkBrUguBpa+VmkVKXIsaNW4EMSHe4FXUXzC4JF6MhiBtftizd6/JGCnWHVv5XBi4uFiyKEsnZdrkyXD29GlQYb6QaliXuHqNGpx1iPQpvLKXxnbv+h4kJCRixG5ReIS6h0pY4rUoWkn0S4rwaygFLpYUorRuW4zVoV9PDlnwf1WrVYUdO38V9IIoBSq0ONHcDmOvzGXOo2sexUr169+fy5tr3LxRkUvJrqyFa8gtubTv/A48a1dcVHInMm2H3fKGTZsNI7ZpPwxcBB1BUZ1c1olOfxd8djq9+uxcOhRysX/5MpbrmgvF8rDQMLj/4D4GJpbgpBRbtaOVAheix1Ihdz7tAgELl5MbN2JJCcrzQElQ4deg6xA59Rmb8nkLEeXFnY3XoTjMPGfQMhOL2wrVYOBi+71k1yIbPJLzWpQAKRCpfQyHr5yAiLs3QJ3XGyBNC2mP4yEVP+lP4iHl1nNIuRtjQBX5vBD6fNCnL7R7p4NFipUEF0sWFyKmWqUqGAYQx9FF5ttp06eb1VU4AlSIBgqLiLh0yawT4qCPBkJMTAx3zTQntfjl9oNWb7a2GWTKwIWBizkOONwUfUqrgT/SrsM9eGH7iWCPtBeJkHDiFsT+fhVS72SMISmnWYvmMBgVuZaakuDCxTLhr705vYt+QTROykFgsL9hAAAgAElEQVT9wZofXrl8OwpUaG1eUWuuqiLvjbsYI59HIh+TkpIMhRaqQosgLiTfMQMX20eZSS4KSi4EKvvTIuA5xNt+EhZ6JJy9C8/W/IPSTCyUKFkClq40bxql4UqCC81PpVAnTJxoVip5rVp1zidFp82oE61/rbh89Rq3O6llQoQyzxqw8Neh99HN/yAWP7tx44bJtGTtehv1NEJSYzBwsf1UGLgoAC4PdDGwKe0fuKt7bvsJCOwRj5JMzI6LsHHBWqdILrQoxTOR8tZcnWvSvbyHKS9ViC1e3l7QEAvAkacxNUr4JCWlpUDWcN3Wrl4DCzBvjjmJhb4nHQxdhyitwsaffjKdWoCFSH8QAxfbT4eBi8zgsjvtPBzWXrXNeYk9wl7kg15FG4M/+JjMoLTkYitie+qkKfDDurVZOXXlcKizxSaSSKZN/Qr279tnEVhIB0PfjxkzFsah06K5RnqtQZ9+KthHh4GLrScDwMBFRnCZmuscXNI9sM11GXo0UZeDdp7VDGZSGlxoMVLsUoZ8c9ILff9u+3ewmPs5jq7QsDDYd/CADLs1PwV5345GPRDlYlmOqR74OCz93nRVoj4r0fT8+bChWAfayDqEnX18fLko9D37TP1FLBHPwMX2Y2XgIhO4fPHPEvjX41WNYdust69HenwKNE0MhQ4l62VN5AhwIeml7dtvW00f8U7b9nDx4gWOro6dO2Mmt9n2bdbM6EULFnLWHsp8RykozaWm4IGF9ETr1/+IJWdNa0epVWrwyeULv6NkYw6cGLhkcECK3wwDFxnAZfPDP2HVPeV+oc2RGPP7ZUg6dQ9+mLYc1Jmp4BwBLkQLOaGtXbOGi9C2lG9m+JChmBRpJ+e/Q2kLFn5rmvhaCuLs2Lad87olaYXST1oK9BQCLGSB8/H1gVFffGGS6c8WbUxyscUhdi2yySFbfi7RKc+h/6UlkKJLszmXnB2Sbz6DB+P2wIwtK6C8R0bJTkeBC61FEdoUjrDsuxUWt7Vr5y4YiVnz09LSoFr16px52hIYWeMN6VVIYUtVEQhUhg4bZjWVJvWlus/WJBZajxwV33zzTUHWIWP6GLjYPs1McrFTchl9/Qc4+/KmbU7L3INMvpoeP0HXmUOgW9nmDgcX/nrUCa89thJyj/3iS9iFBd4S0NGOrkktW7WCihhMaO0awheGO4BmYwqarIM5ZmmtTl06W+SkvnJ3zJgxsAojms1dhWgCCkyk5FG/798n6ckwcLHNNgYudoALgQqBi7PavZG/QfW2DeHLVsomi7K0Pz6dwczZswUl5SYnNgKL/fght3t6uSmeyrgRmFCjaGYCFEquFV4p3CqbeeUumZunfvUVTJwwAe6j4tlc80Z/luCgINi0baskSYrmZOBi+9QzcLEDXIZe/R4i4g0zsdlmuXw9Hs0/BgULFYKFH052uOTC74J3XKMMe2IUtySZXMZob4r41m8ENgQ61pJmGXOQV+62aNkSXm/wBizAJFokxZhrvr65uCDQX37bKRlYGLgIO8MMXCSCy+nYGzDmhlFCZ2E8l63Xs43/ge7mC1g7ZYnTwIUWJqmhB1aVrI/xOjPRMiRFryKFKZQKYjpKKXfu3IGJkybBXkygdfjQIYtTUemT0oGBMAH1MfXr1pGyZNYYJrnYZh8DF4ngMvLaWjgXp7HNYQV7vDx6A2J/vgSblmWAnCMVusbbIknkvc5dQO2h5l50IaVrpbKGQIXqZNP1qWOnTpjbphHnPfzs6VOzU5JVyBNTidbAtBbkNay5fQeqYmVIexoDF9vcY+AiAVweJr+AnpdM84DYZre8PRIvRUP0Vwdgx46dTgcXvjKkn38eiI97yelJBmNScjHXG1vcITM0WYwIVOgKRDlXfsGKk/87etTiUEpXmZaWyvnD8Irn8xcvMXAxwzGWLMr6CXRIPpfV9w/Bxujjtt4Fxb9PexwHdwZuh+9+WgeF8xVyquTSomkz0ERlOKmp0DGtRIkScP/+PS75FSllCQzEOKnxzDuw/wAHJrwZuiXOE1a2LFevidIqWGokrfj5+XFBlHPnzTOQpBi4mOcaAxcng4sWT233C3PhWVpG/hK5WsxvEeBbqTj4lCkoeEpduhY0XX6EafNnQXjZcKeBy4J582HJ4sWgxWz9mZVduT3otMC51ccnxHNlUjOy7IVDPZRqSGlLjc+6R3qbl2hBIkUsKXrpcwJB5SX+N6eofeMNDIBMgR/XruPCD6w1FToVkj9Ms+bNYc78eSY6IAYuDFwEv2R6HRWXXE7FXodxN8xE1UqhVm/Mgwl7OXARU8GPht/+aCsMHjgYGtVv6BRw4YMZ+STdltiQJ28+KFG8OAJQOjx/8cJsTWYa64/Z46h2U7ny5aFggYIQE/sCTp3ARNRXrnCAYR1U1ODh6QGBqLSdOm2axSsZAxcGLlJeV8XBZZbmZzjwLCMwT85G+VBTNM+g2JfNRE17/8s90KlJG+jcvrNTwKVjBwpUPG/zxedwAcUaL9KBYAoG+vcKFSpAQGBprnKkP15hHkQ/gGgsmxL94AE8wI+QRvOqMQ+xJ4IKmeU/HzHCps8NAxcGLkLOlnEfxcHlnf++hnhtshTarI6hIuWxuy9DqbntRM39cPZRqF0yHIb2/dQh4ELXF2rk1EbZ9b+eMQPS09K5DG7WmoeHB46pBE2aNoVVmPCKStbShyQeW2ON5+ULlqnVHpwk1KBBA3i/Vy/BFioGLgxcRL1kmZ0VBZeTMddgfOQGKXTZHJN4AX+xJ+2DkB29bfbV7/Bk1SkoFZ8LZoyaqii4kHftNPQpuYelTfhGmdvSEFjSMXbIQNlitAMCA1+MPN534ACn1CW9Cs33++49cPToEa53/vz5ITExCZKTk7h8MPqNBx9SFJOpm9ajcAAKI6CPWEUxAxcGLqJeMkeAi1JXIn6jUR3XQck57UQpdV/suAA+517A0q8XKQIuBASjMdnSX1graRjmnaXYHnKSI9MzAQ258x9E0OClCRMpA//g4+0DAweZL5ZG85M0RBYhUuI+fPiQk2go413hIkU4PQ1JPaVLB0JwmRBOH1O3fj27HPUYuDBwcSlw+WbWLNU7576BBAWuRPxGbw/cBoX61gG/eoGC9x578Bok7rwK65f/IDu4rF61GstvzITyqFxdvHQpJyGQo1xSYiKQ1SwhIQFuaTTgj74tZOkxd70haSMEQWH/oYOC96R0RwYuDFyknDHFrkW9Jw9RUSyRkk2KxSj+9B14sugP2LZphyRw8fbyRqtMAYNt/XPqFMzDXCnkR0KpH0eMGsl9T16wP61fD/nz5YeX6CiXhNcYb5RKUlPN66B4aWYzOr9VqFhBSdaJmjsS/XHMeeieRKuU0DZ+0gR4kCsBctUoJXQIJP57DwKS/GHK5CkmY8ZOGg/PyniCZ/G8ouYLSs6DHtGTTcb0eK8b5H27guj53g6tb1YhLmW++L1Xoe3rLW0q2PWLAJrbPOUPOnzoMHz1zdeCeaNER8XApeLwt1Q/RR9TguasOaVYjJKuP4EHo3fD/B1r4OWVaJiIOWJvaEwzrpkjXHPrNkS9jIYo7RO4q30GUcmPIPGH83D5f2eAsuST8rUOxuCQVDL4k8/g5MkTsHTZcmjavCk3HV2NpqCrP8X2JGJVSGPJhWoYvdOxI3THuVypkXWpcnhFA5J4D2NXojOn0DIOI9j79u9ncbtuDy4v+4epricIM49KPRTxJ27D07X/QODyToKnSMFCavc+2gZNv/8Emj4sLQhcTsdGwomYq0AK6ugUw1pKAVsfwVefjDVQkvKFxDZs3mSWLnr4FOtDupH09PTMPiooUrQIl0PXUYGMgpnGOmYrDrg1uHTo2eXjCx39bBhb7X9elF3uPuZoEWMxSk9Mhdvvb+AUwZ08asC3w6caSC7x6UlwDUHxesJ9+PdlFFA0t7W2qPyHUNHvVY4V/hfdVnlTUspOGDcOLuFVKjUZS4n4esOadetkjS2yn8NshuzIAbcGl2Yju32sed1XcXChB08Wo+JTWgsuSK5DRxFNt58457sCVUpD9PazMGToEHia+hIuxt2G20lPRJ2n2WV7Q/U8IdwYsuS0w0LzFHlMSbCFtKGfDYZ9e/dyxcXmLXR+cKcQmlkf1+aAW4NLnVnvf/wkzMsh4HL3852Qr2045GkWJuiJk0s8BS8W7FkT/BuVETTGWqevQntAvXzluC6kwCUT8a7f9wielwCpfp268PU330B7K3WtBU/IOuZ4Drg1uFRc88Gg5Hxqhzzkx2j5Ufl5Q+H+wpIZkeRyf8Qu8G8aiqBESkr7MHB8SBdoXKAS53vSHqUPKYXNunXpCvVff12wtOMQxrJFsi0H3BZcytas+H3Qyq6WVdkyPzKyGCVhnpYSX70paGYy90ZP2gs+ZYui9FJDvC+90Spvx5WF+KM3seTpBrT0vAvTv54hiA79TmS2pHwuQq9SohdgA3IUB9wWXGoOfmtvwT51WjvqaVIYwMNZRyD4x+7ClkRweTjnKKSh1ajwgLrgHVaIq9eMxYy4uB2xLXbdv1DkWio8e/YM9h7YL9rSQ9eimlWrwbIVKwTH+oilkfXPWRxwW3Cpu7jPf3nqBxnWTVXw2VIlxdu9NkLAsk7gVczf5kqEH6kYTf3sx7OQeO4e5zTl3ygE/BuHgldRHC8iKjCP2hc+ydUERnUZCLMwo7+UVJVS9DQ2N8k65GgOuC24NN459IFXqfwZVccc1DQ9N0Cx0c2EWYxIxZIpoaS/TIb4vzQQ/6cGKAWmTyimMkAlr98bIeBZMJdVSaZz0frQp1Qz6Nf9A8iDOVWWr/xO9G55s7UUPY3oxdiAHMMBtwSXJrrJnp6n0VGEYvsd2MSEAWSmSTGhLu15IsT/EQVx+EmJfAK+lUuAX4MQ8KsfCB7+PllAU9kvEEYGvwOlfAqiI9y3mA7hOzj+15+ir0NEAFVhrFK1KgzDnCqOaKmYmY4eDTnvsWbKAXJopOyAXl5eLseefHnzgK+vryC63BJcmv87obZKqz4liAMydpISBmBt+dSHLyHueBQHNqnRLyF3zVJQvGk4jHl3EDQtWpUbSrqShq+/wWXut1bV0NI6dAC2bN4MSxGc/P1tX+fkYFdScjKqltQY3+R6L48c+7N3jpSUVAww1YIvpsZwpUapNYoULgTFihYVRJZbgkuzM5M/U4PuW0EckLGTqMRRetciISSk3H0B8ccyJJr02CQIaVwVPuz8ARzetAteYPrJTVu3CJnGoA+f6tLRSlzN7dv44vhCcSxyxpopB6IfPoIkzI8TjGk/XalR4ChlHszR4NLi9KR16DbygaMfjJgwAPJzUUn0bUm+8YQDGdLReJfMB3PRo7ZVGWH+Nfo8eb9bd8l6Gnt4y8DFOvcYuNhzukzHyhoV3eL0xPNobakiL4nCZhMSBmApQZOwFcz3KuFdAPqWag5NC1QWNA2luly4YAEc+/MPSXoaQYtY6MTAhYGLPedH7FjZwIVT5p7VUaISx7jmGu2UlLq56wRCvnbWCrBbUueKZZtp/zp+oTC9fK+sL0gncxBrCJUsVSorGJH+1rhBQ4xlGmo1ZN5+aszPwMCFgYtSZ8vcvLKBi7OUufymhIQB2HMlsvVQkv68BfVvFeaCFimdJeXPJRP1fawZNBN9YEjpaysVg6017P2egQsDF3vPkJjx8oHLmckfYWmtFWIWl7MvFUlLOHXbehiAEveizE28/bIsXF3/Py4/LjUqzUru/Nu3boPRo0bBB717YxnZHbBrzx7RCbLl4hMDFwYucp0lIfPICC6TlqAh5hMhiyrRR0g1ACUlly1VRkEBLz8gS5Bxdn0eYNq0aQsLlzjcmJbFbgYuDFyUePcszSkjuEw8hlaYho4kXn8tCgN49v0pKDKkgUUSlNK4BPkWgVXhn1rd+sTxE+C3nTvht927meTirENiY11mLZL3wcgGLmiGjkcLb255yZN3NqUkl45F68GgANtR2d27vgee6P05GUunOqORD4da5cGc6CwwPyUlJdOJTpgnrKOeYWJSEuRDR8vSWE1CSHMrJ7pm/40rpU73fFX9SwgHnNCHEkVR0XW52zRMGFU3M2GUtbnpekTVE9eu/1FuEgTN9yImBjw9PNEj2E9Q/5zWKS4uHtLS07BaQz6X2vqz58+hABbBK16smCC63ApcWpyZiCkWVHsF7dyJnd70rATR2li4qX0MsZAkGyU7q4+FXGpvm/N9POAjKBUQABMmTbTZV4kOTOdinavsWiTvqZPlWoTgMhzBZZ68pMk/29feHcEbMoL2nkECHNf8C7v+Oww1OjWByMRoSQsmRTyC/BtucQ5xlPApAMGDAMS4tgzv8r8TdS5UN9oZjYELAxdHnjtZwKX56Ymr8LrR35GEi10rN8LKV94dDIZdPH/BoLQIlQ15lBIDV+PvwZGbp+HyEw34BRSEZB3WdrbQmqWXhXIaH7iLvi2UP5cc5ai0qh/ekft/+CH06deXAx7K20LlVy2VGxG7Hyn9GbgwcJFybqSOkQVcWpyZ9DcSUE8qEY4YV1KVH0Z4tbQKLvyXxp60MWkJWK/oOdxLegZ3k59AZEI0xGWWIJlZtheE+5U2mHfZkqWwCOsSUeH5OCyQRhINlRBxpo8LEcjAhYGLI941fg15wOX0xBeoKXUtLZgRF6uoS0Efz9cFgYvQ7HApKNF4qzwN5qTrTztM1M1npiMlLhWf79Ovn9NrEjFwYeCSrcCl1bnJRbVpuoeOJFrKWo3UZaGDZ3Wb4MJnh5OqG6GIZ7JKOfP6Y4k/DFwYuEh5d6SOsVtyQf+WBujfclwqAY4a18GjOjTyKGsVXKQUNdOf8MC+/TBq5EinX38YuEg7VcxaJI1vlkbZDy5nJvZFS9FqecmSf7a+eCWqjFcj/Was0CX/gO3btnFFzcTWa3Z2xLMQjjHJhUkuQs6JXH3sBpfmZyZNR7e0sXIRpNQ8I71aQQkjtZA+uNhT1Ixo/mLESIhAa5CYaotK7ZVJLtI4yyQXaXxTTHJpfmbiNowp6iQvWfLPNtOrI3ii67slyYVqPFesWBFmzZ0jenF79TSiF5Q4gEkuTHKReHQkDbNbckGdywXUuQhLwyaJRPsHmfNxoVl5yWXchAmSs8PZq6exf3fCZ2DgwsBF+Gmxv6f94HJmkoQ6hfYTLmaG0qqCMMyruckQDlzGjIE8+fJKLmpmj55GzB7k6MvAhYGLHOdI6Bx2gUuTc5MDPNN0d4Qu5qx+VVUB0NurvllwmTx+HDRr3lxSUTN79TSO5gcDFwYujjxzdoFL8zMTGqpAfcyRBBuvpU1KA21cMlf2Iz02GbQvk/CTwv13/559wQ98oJg6H5SAvCZkbt24Ga1DW2D/wYOScqxQUTPyvnVWIKJYvjNwYeAi9szY099OcJncE1NbypY/QJuMQIElVjmgQIDggCITMNLov/Hv9EnnweRJgtm989ksd+zaZZE38fHxMKBPH/gcqx32+1B8WBRdh75ftQr++Psv0WZrex6YPWMZuDBwsef8iB1rJ7hMGotm6OnmFjUACgIIBIQsoOAAI+OTAST47zGJoEvViqVfMrh8gwmb0lJTYcv2baLX5F38Px08BLr36C56vLMGRD96CN5e3lCwQAFnkeDS61LelBQseVu8qLC8KY7azL0HD4DKueaoomgtz05onBabUvfpqlMztTEIFByAJEHak3hH8V0SuPBWIntc/Cmz/yeYhDs7NaXSfGYnHtii1VV5VLJEcShcqJAt8rnv3SZZVHBAcBOsa35E0K4d1MnatYiuQyOGDIGu770Hwz7HNDQiGwUifjV1qsu6+IvcDuvuhhxg4KLgQ7UGLt+v+A7OnDkNf/z1p2gKsoOLv+hNsQFuxwG3Ahe1WncAk0UZ5h5w4iMjcPHx9YFN27cbUBEVeRNGDB0C6zdulJT+wNlFzZzIUrZ0NuKA24BLmcDgyZjz+nPkfR5X4T+BS3BIMMxfvNiAJLoONWjYECZNmSya1Ozi4i96Y2yA23HArcAF3f9Ho9XIdeoxELiEloF5ixZlHZxdv/4Km1FiOY7XISkRzxR7RKVaqYoia4wDrswBtwIX9HUZh5noXOpaFBoWCnMw1STfPu7fX7ISV2hmOlc+cIy2nMMBtwGX0MDgX1BQ6KBAOSDJp4GuRWHlysLs+fOz5ujYtq0kXQt/HZKqp5G8CTaQcUAiB9wHXIKC/8KXub6rgUu58uVh5ry5BuCybMUKaNm6lahHRtehOnXrZhsXf1GbY53dkgNuAy5lAoP+wUx0tVwNXCrjtWjZuPFZh2fst4ugSHAwSjPCyyvRQ1r53XeQlJjoloeQbcp9OdCgeg2YgQYMZzYvL08o0tBy7Xai7eKFC/BOu/aotjXTygQFP1DpoLj5b52zNboW1apVCzZv35pFAB/BPH7iRK6WkK3GFzEb/vkIeK12LVvd2feMAy7FASq8J9Zw4YwNWAWX0KBgSnaP+lxnkGZ+TaLn08GfwecjRxh04BNoV6pUCWbOnm01Epqy+JOL//KV37nOxhgljANuxoFsCS5Dhg01azYmL1vKd3vy5EkYOmyYWSlmzferJWemc7Nnz7bDOKAoByyCS3BwcH4PHTx3NclFrVaj5DLYqk+KvhRDBctatmoJdBVau2YNrF29GqQofxV9CmxyxgE35IBlcHHBoEXiv6enJwz69FObDm8kxUzDGs77sSIilV2lVgGTdJNepl59l65O64bHjG0pJ3JAUXAhqYeanDobb29vGDhokE1w0X+YJLUElA7Iic+X7ZlxwGkcUBxc5AQW4pKvry8MGDhQFLg4jbtsYcaBHMwBi+CSGbRISVFME9Q6kWG5cueGDwcMYODixGfAlmYcEMIBq+CCE3yBkkcuIROZ65M7tx8kJGDmOhlTgPn5+cMc9M4V640rdQ9sHOMA44A0DliXXOwMWlSrPUCrTQc5LU7ePj7Qtm07pkOR9rzZKMYBh3Hg0aNHsGnDBlMfXAxaXIsCR297dSYqNB1r07XyKXWRoAoVKmQLD0WHPUW2EOOAC3KA0s5eunjRHLgE/akD1etSwYWXVipVrowxBriAjF6+LIrZBU8SI4lxwIgD1q5Fp7BvbcmggGJPlWpVOb+Us2fOMnBhR49xIIdxwCK44LXoGvKirPSgRRW82/FdyJM3L/ywdq2sbGWSi6zsZJMxDijCAcvgYmfQIu+PQlQvX7oMUrEglVyNgYtcnGTzMA4oxwHlwCVXLliFcTyXIyJg/rx5kIDKHbna0ePHmbVILmayeRgHFOKAYuBC9FLVQ4rx6dld3rKoNzRRCrGDTcs4wDggFwfMgou9lRZ5SxGBAJ+nVhaCM53xGLjIwk02CeOAohxQBFzIIzcoJBgOHT3CSS41q1aTxUtXH7QU5QqbnHGAccBuDigCLgQCTZs1hVVrVnMEhgWHyOKly8DF7ufNJmAccBgHzIILBi0OQ/+WyUhFPimUGKdFqFwxHBITEu32dWHgIuVpsDGMA87hwH///vu487sdixj4z1JENJIzCgEmtxSycvv5wVy0EPHBhR0wFugSeulK95nJoIKBi5SnwcYwDjiHA0cOHdo+oP+HnUzABYFlLJLkJZUsfV8URC/49+y/skguhQoXglNnTksli41jHGAccBAHVq9aNXLGtOlzDMCFghZx/Q9Q0hAdEWROupg6eQqsW7NWFnCpWLEC7Nr7u4PYw5ZhHGAckMiBlDatW7e8evXa/4wkl6A/8Q4jLWgRlbmFihSGk6exnlpmowJky5cuRS/dVIl0Zg7DuStizZbf9uy2bx42mnGAcUBpDuwLCwrCOvPq08bXopO4ch0pQYskudR8rSZs3bE9i3gq5zF/7lxMHJVg14Zo7spVKsOvu36zax42mHGAcUBRDqTj7KEILoVNwAWLoZ1FX5Ua4i9FAB4eHvDJZ58ZpKEkR7revXpBelqaXTsicKmKkdY/7/zVrnnYYMYBxgFFObBCpVJ9HBoY+Jo5cJFcadHf3x8Lu0+CTl06Z1Evl5cugUv1GtVh+y8/K8oZNjnjAOOAZA4k4chABJfHsoMLkWQctczXZpZMLq9yMXPlsndONp5xgHFAVg70RWBZSzMGBQXV9ATVGUNrkdR0C5mxP2fPnzNJQymHl66x56+sLGGTMQ4wDtjLgSkILJP5SUIDgt4CNfyQBS7BpYKre3jCv1JWoZc/V+5ccPFyhMlwucDlsyGDYfiIz6WQx8YwDjAOKMeB7Qgsr3QhuE5IUNAI9Gbp8gpc7CjjSuBSrXo12PHrLyZbaN+mLURcvGSnl64KBg8dwmoWKXdA2MyMA1I4sAoHfYLgYuBrUiYw6A984Q/JBS7p73V7L2bGzG8KGlMoh5culSr5dLChJUoKJ9gYxgHGAVk4QCbngQgq3xvPFlK6dCt8X/ehibhsFriElg7uo1PpFuMAP9HL63Rx/nnyTvvv4vkWOJY+WW3k8M/h5x0/2+WlK7QIvWi62QDGAcYBsRx4igO6IE4cMR4YGBhYwAtU57F6yLabtzXDs8AlI2hRh0GLKtFBi3grSsUaaK2i7kQdwwV74Wc6fkrR4uSlu2zJEkizw9dFShF6sRxj/RkHGAesckCL367Dz3jEiPvGPcsUKJMP8qTvRgfclMhbt5rR9wbggl+Mwb95S2FyejKEaKI1GhqLzjJUCnYcfvojuBRftXIlpl6Q7qXLitBLeSJsDOOAbBzYSe8zggqmODBtaB16F61DsxFNbscmJLR//PhxnDG4LECkGSI2aPFVyVZd8/R0FaFbVvPx8VGHVwlvf+G//wYj4KilbtXHxxfebtPGwEFP6lw5cRyFX5w6cQqSksnPyfUbnhuoW68u5M4tWoh2/c1lAwq1Wm1yzIuYf6Kiov7YtmXbH/hPkyz7KrW2qFqnqoKg0gkxoJhOBfOibt2iG0tW05NcOA3vG6LjisjHBXRPEZTO43gTANFpIT/+FcVqIwoAAAzTSURBVPNd2tXSsRC9xsvbi0NE1sRx4GXsy5C09LS8HlhiNzs0PNzg6eH1wj+v/63sQG+2pxF/+dPS0zFKB1tqKvcPW3vSge4Z6FRXVVrdsci7t8ymK9C/FkkKWuQkF9D9GHn71gfmCAouHhzs4QN2pe3HJV6gTuddzV3NUVubZt8bciA4ODi/hw6ev5IwXZ9DFKem1epS0kBbTKPRvHB9ihmF5jjwyloUiEGLID5oEQ9tIo6bhdrhyZZYjAGRkmOWMudMTUeFMQMX8YeYUpci+s8XnaBH/FLyjSBpWK3SQbquX+QdzVr5JmYzOZIDr8BFIgDgOUhAqaKNtRdfBnABBJemDFzEHw1MAHYXR5WSEukufjV5R3h7eUdcvnGtkryzstkcxQG7wYUITU+DGpp7mv+sSC6SUznwczJwEX8kskI6MmO/xM/gvBEe6DiZjr9a+lZI51HDVpbCAbvAhb/HR97SWJW6ywQFn8A8MXVFK4v1dsTARfzjLVM6eDXyvG92kFoydHfY8P/IWpSeriWXBh3qFqdau3KL5wob4SgOcM9TctAiHgj833V8+OWsEYyi+Trs9wEDF0c91ox1ENSTUXPh7Wrgog8kvlhbPCmR1HaYJrVwYahSuQpUwcRg4eHhcEtzC+bPnxcdcfVKCcdyjq0mBwcywEVi0CIdEoSXXTdv32pnjRjy/rW3qkC6Cgowy4HwR86Fc6hhNT5gp+pyX1mpVJArly8k6gFJ1apVMX1pFfRpqQfhmCM5b968BhvMqtqphXdRsWsaFSucHaynEzhgF7ggvUl4eGbaElszQwtGSopbymSKrauXE3jn0ktmRqaK91uyY1c8kKjQn8bH2xuSkjKc9oKCg6F69eockFREiaRe/XqCV8HYtLTdu3ZtvnLjek/Bg1hHl+AABy74K/cO/sptxP/wFUUVBiyiI00vW78qmfNvwPkpLEBcy1RGMnARzjbet0hJ3xZ+bjUCiYenJ6SmpHAEVqpcGcLCwiQBibkd8qlSmeQq/Pm7Sk8OXOyRLIQoWqVeu4g2oUpjV2GoK9CBz3MMXoamy3IlytCrcVHt5NxGn5RMICFJpEbNmlAZAYUkErraKNHq1a6T9OTh40HM50UJ7io3Zxa4iA1aFPPSS1YYM3CR9ORRkfscFbn5RWtbDIDEk9PWUOUGH19fKFeuHDRu0gRKly6tKJCY2zAGv+pWLFt2+fJ15vMi6UA4aZCe5AITEWCEK//oIKrg4c1bmuJCaJfqSCcGxITQ4e59hEqJ+hYbTy8vMvtyQELWm/Lly0Ojxo05iw1JJAGlA5zKNj7Ruy1/KqcSyRY34UAmuAQdx5+pBmJMxZkv/QnUhdQXwlcGLkK4ZH+fMqWDtqvUqo76M/FAgj8GnKKVv9YULFSIAxC62liy2NhPkTwzdOnYKensmbMr0HgwTJ4Z2SxKcyADXKQ5uaXioZ1hy1LEbwCtF9dRMAoTIRtxQzlztwoeoYRUTGlmZPf5KUhRrYNH+FC9iG3kjJaSnMxtKwCvM2XKlMFcx9VdHkjMPYftW7fBuLFj46/euO6f3Z9TTqE/w1oUGHQGU9PVFCO54LBYfPEnIbgsEMIsiQDGg8s5BJfqQtbJyX143VbBggXh9Tfe4IBErOnXlflXuWJ4alJ8Yldb1klX3kNOoo2XXNCkDH4iwUVUMCF66f6Kv6btxa7BmSoA/o28ramZkx6MlL2Syd8nt+/mv0+d9DZ2SJMyn6uNGfX5CO2e3bv3RVy7+rar0cboMeVAhuQiNiI60/dEjO+BVC/dTC/gM+gFXIs9QOscqBBWdn2btm3fmzN/Hpp63K9FXIqA9piRkAUzZo9nKwlcMvUgCXhVEVwpQGoC8AxwgVN4/aqbPVjqHCr5pFDGJXWdQ41yq9avUzfl0cNHo4Vex5WjhM1siwMqKZnipLzwJLJTiUckKI8tovS/F2uVEjO3O/WlWKLCxYosO/HPKXFe1tmMCWu+Xw2zZs68f+X6Na66BGuuywGVUL8Iwxdep0UF8OKo25qhQrcmZR2aO/Na9Bdei94QulZO7FexbLlLAwcNqjh0+DDhvkrZkFF8MCPzeXH9hycVXDAbuGqOUDM0sUGql24muOxGcGnr+ux0DoU8b48eP+50hzdHcODDvv2S/3f06OYbmqjejliPrSGNAyopQYt8ETSxaSdFK46zJBeYIgbIpLEi+44qGxK6qFHjRh+tWrPaJ/vuQjjlB/bth8GffcZ8XoSzzCk9VZwVB3QjMDJNlHOSFI29NHDRYV1a1TQGLpbPR/mwsnHTZ8zw69Sls1MOkTMWzfR5+YgFMzqD+8LWzAAXFXyJ3QX96tkT6yPJSxczHaJ+ZzoDF/MPlCRPX79cWy5ejvAS9sjdo9fUSVPSN27YcOLKjWsN3GNH7rcLDlxwWxMQYIRVzOIiZ3WS/E5wLSm1kVIQ0L5m4GL+8IWXK78Hq1G2nj1vrrDn5yZnOCuYUa+MsJtszW22geAiLmjRVhE0a5zBtX7DK05bMV66iGVJiGY2s925zRMRsRHejWDn7t2K5VIRQY7Du77ZslXK9WvX2Q+PwzkvbEEV6kH+RsCoJ/SFt+dlz9TvjEP9jmAPUkwFgBXsVbOZ5GL6QKngWdFiRWeSu7+wx+1evSiYceKECSyBt4s+VpJcTuPL+5oIcEnEcvM9pASPZV7BRuFaYiqMv0Twm8fAxfQEVShb7t4Xo0eX7Nu/n4seL2XJyvJ5YQXzlGW0xNlVGK0cjdeOYkLBhdaR6sBEXqQotXwLKp1gyxRKSjFYG+sdsWZvifzINsN435az58+ZZM3PNpuQgVCWwFsGJio0BV2LMv3UTFcwBhx7LEU0uxQvXVzzhRZLSzBwMXw+YcEh6zDt5Hs5xbfF0vlnCbwVQgYZplVhKoS9mIypdclSpeDp06eQnFkOwuzcZBZWqW5iwGJ5KWtLAhcUlFByaZETwAWfRW8PL89pmG7SuXklpTzcbDBG7eHxMj0tfbtWDcNZDSzlH1hWVLS5aFq601KYO7XhQ4cmRN9/NA7/9ai1utC2SCZJCXU8Sd4+3r6UKc1ae4nrc9ewHHCnRn3UGi9vr/cGfPSR6o0GDdw6+NDWGVHqezpPM6ZPj7l7925Mmk5bjQGMUpzOmNcquOgvjWK4ZF2L/jxk4fD09OpU87WaDWwVx1q0YCFlAV+i9dCNd+eDwEt0OdWkrOwRN5297VtvP7kScXk3JiDr4+i1c9J6gsCFd1iSqzBZtUpVvkELx2iM4LXKaw7QcoDUgtehtW3ate20cPG3ghXdOemQyr1XXk8j13mWmz53mU8QuNDDGDhgQOT5SxfD5Ni4EHDJSaH15UPD/hj06adv2AJbOXjP5sjgQE754XLm8+bAJSy4jNbH10eFha+0NV97TRUQEKCixM5162Ukf8OiVPDd8hUnIq5dEVRGxNaGhIBLTvp1YeBi68TI/z0DF/l5ajwjXxQNw4UyNDBqtD+jslWbnJzMxaoULlIEPD09dffvPdgSdUfTTQ6SGLgYcpFdi+Q4VcLnyEk/XMK5In9Pqzl00b+Ei2akYlrUtDrdMvBQjbVXuVqlYqX5rd96c9jsuXMs7ignHQCm0JX/YFub8Z127V9cPH/hV6bQVZbvghN0ZyblTsG8k7e16aou9pmjQ64iZJXT35qHpydWA/TR+fh4qwpg3R1vbx+4HBEB6JNQwF4wU5aF8sxO0ouXj3fXkaNGqeq//rqvUkXd5aE2+81COrzLEZdhzOjRMbdv31algy4oJ5wrZz4pweBCRHI3p8zrE4LNMIz3QVux+Ia+LkdxfGPOEJ6R3d9Co0RRkJiZUnOK+JWy1wjOTO/lORKd6FjyaaUenQ7WpathGAMWpRj8al5R4JI1LCOnSxr+9z6tWtVT7IPiwcVWPBOHOxlgRhITlilVjUdRdp3ybGErMA4wDtjLAWngQu98xpvPSRZaraqdGPd8oeDCb44HGQIjTMHwB17LBttzLbOXaWw84wDjgG0OSAaXrBefnPm5l174NUksuOivhf+ehOv54nqT8Vrm9lcl24+Q9WAccE0O2A0u3LZEXpOkgosZQLugTYH2mmiNxjXZy6hiHMi5HODAJSQwKAL9WypyOKHDtJIkHQDkN6drtaQneXVNUt3AF/5Nay+8veCSSWfGtUylStAmQ1UGMDn3ELOduyYHsqrzUa1hSIPqRKZaDU3on/hldVTcYvi/KgBBpZj+FngQwr9RBK9eFC9qRQASdGpVgCVFb5a1SAaeIH1aVPR+xTLVycBMNgXjgIwcEF36kzKgIerk1wchnh6cjPIpvMD/fmHtZc+sGz1Mp82Yx6CpoLgxkOl/j4588Sqd6kbm3x4hLXvQF2atWIuVjDxkUzEOMA6Y4cD/AZYAiJbZe/3/AAAAAElFTkSuQmCC"

/***/ }),

/***/ 3:
/*!******************************************************************************************!*\
  !*** ./node_modules/@dcloudio/vue-cli-plugin-uni/packages/mp-vue/dist/mp.runtime.esm.js ***!
  \******************************************************************************************/
/*! exports provided: default */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* WEBPACK VAR INJECTION */(function(global) {/*!
 * Vue.js v2.6.11
 * (c) 2014-2021 Evan You
 * Released under the MIT License.
 */
/*  */

var emptyObject = Object.freeze({});

// These helpers produce better VM code in JS engines due to their
// explicitness and function inlining.
function isUndef (v) {
  return v === undefined || v === null
}

function isDef (v) {
  return v !== undefined && v !== null
}

function isTrue (v) {
  return v === true
}

function isFalse (v) {
  return v === false
}

/**
 * Check if value is primitive.
 */
function isPrimitive (value) {
  return (
    typeof value === 'string' ||
    typeof value === 'number' ||
    // $flow-disable-line
    typeof value === 'symbol' ||
    typeof value === 'boolean'
  )
}

/**
 * Quick object check - this is primarily used to tell
 * Objects from primitive values when we know the value
 * is a JSON-compliant type.
 */
function isObject (obj) {
  return obj !== null && typeof obj === 'object'
}

/**
 * Get the raw type string of a value, e.g., [object Object].
 */
var _toString = Object.prototype.toString;

function toRawType (value) {
  return _toString.call(value).slice(8, -1)
}

/**
 * Strict object type check. Only returns true
 * for plain JavaScript objects.
 */
function isPlainObject (obj) {
  return _toString.call(obj) === '[object Object]'
}

function isRegExp (v) {
  return _toString.call(v) === '[object RegExp]'
}

/**
 * Check if val is a valid array index.
 */
function isValidArrayIndex (val) {
  var n = parseFloat(String(val));
  return n >= 0 && Math.floor(n) === n && isFinite(val)
}

function isPromise (val) {
  return (
    isDef(val) &&
    typeof val.then === 'function' &&
    typeof val.catch === 'function'
  )
}

/**
 * Convert a value to a string that is actually rendered.
 */
function toString (val) {
  return val == null
    ? ''
    : Array.isArray(val) || (isPlainObject(val) && val.toString === _toString)
      ? JSON.stringify(val, null, 2)
      : String(val)
}

/**
 * Convert an input value to a number for persistence.
 * If the conversion fails, return original string.
 */
function toNumber (val) {
  var n = parseFloat(val);
  return isNaN(n) ? val : n
}

/**
 * Make a map and return a function for checking if a key
 * is in that map.
 */
function makeMap (
  str,
  expectsLowerCase
) {
  var map = Object.create(null);
  var list = str.split(',');
  for (var i = 0; i < list.length; i++) {
    map[list[i]] = true;
  }
  return expectsLowerCase
    ? function (val) { return map[val.toLowerCase()]; }
    : function (val) { return map[val]; }
}

/**
 * Check if a tag is a built-in tag.
 */
var isBuiltInTag = makeMap('slot,component', true);

/**
 * Check if an attribute is a reserved attribute.
 */
var isReservedAttribute = makeMap('key,ref,slot,slot-scope,is');

/**
 * Remove an item from an array.
 */
function remove (arr, item) {
  if (arr.length) {
    var index = arr.indexOf(item);
    if (index > -1) {
      return arr.splice(index, 1)
    }
  }
}

/**
 * Check whether an object has the property.
 */
var hasOwnProperty = Object.prototype.hasOwnProperty;
function hasOwn (obj, key) {
  return hasOwnProperty.call(obj, key)
}

/**
 * Create a cached version of a pure function.
 */
function cached (fn) {
  var cache = Object.create(null);
  return (function cachedFn (str) {
    var hit = cache[str];
    return hit || (cache[str] = fn(str))
  })
}

/**
 * Camelize a hyphen-delimited string.
 */
var camelizeRE = /-(\w)/g;
var camelize = cached(function (str) {
  return str.replace(camelizeRE, function (_, c) { return c ? c.toUpperCase() : ''; })
});

/**
 * Capitalize a string.
 */
var capitalize = cached(function (str) {
  return str.charAt(0).toUpperCase() + str.slice(1)
});

/**
 * Hyphenate a camelCase string.
 */
var hyphenateRE = /\B([A-Z])/g;
var hyphenate = cached(function (str) {
  return str.replace(hyphenateRE, '-$1').toLowerCase()
});

/**
 * Simple bind polyfill for environments that do not support it,
 * e.g., PhantomJS 1.x. Technically, we don't need this anymore
 * since native bind is now performant enough in most browsers.
 * But removing it would mean breaking code that was able to run in
 * PhantomJS 1.x, so this must be kept for backward compatibility.
 */

/* istanbul ignore next */
function polyfillBind (fn, ctx) {
  function boundFn (a) {
    var l = arguments.length;
    return l
      ? l > 1
        ? fn.apply(ctx, arguments)
        : fn.call(ctx, a)
      : fn.call(ctx)
  }

  boundFn._length = fn.length;
  return boundFn
}

function nativeBind (fn, ctx) {
  return fn.bind(ctx)
}

var bind = Function.prototype.bind
  ? nativeBind
  : polyfillBind;

/**
 * Convert an Array-like object to a real Array.
 */
function toArray (list, start) {
  start = start || 0;
  var i = list.length - start;
  var ret = new Array(i);
  while (i--) {
    ret[i] = list[i + start];
  }
  return ret
}

/**
 * Mix properties into target object.
 */
function extend (to, _from) {
  for (var key in _from) {
    to[key] = _from[key];
  }
  return to
}

/**
 * Merge an Array of Objects into a single Object.
 */
function toObject (arr) {
  var res = {};
  for (var i = 0; i < arr.length; i++) {
    if (arr[i]) {
      extend(res, arr[i]);
    }
  }
  return res
}

/* eslint-disable no-unused-vars */

/**
 * Perform no operation.
 * Stubbing args to make Flow happy without leaving useless transpiled code
 * with ...rest (https://flow.org/blog/2017/05/07/Strict-Function-Call-Arity/).
 */
function noop (a, b, c) {}

/**
 * Always return false.
 */
var no = function (a, b, c) { return false; };

/* eslint-enable no-unused-vars */

/**
 * Return the same value.
 */
var identity = function (_) { return _; };

/**
 * Check if two values are loosely equal - that is,
 * if they are plain objects, do they have the same shape?
 */
function looseEqual (a, b) {
  if (a === b) { return true }
  var isObjectA = isObject(a);
  var isObjectB = isObject(b);
  if (isObjectA && isObjectB) {
    try {
      var isArrayA = Array.isArray(a);
      var isArrayB = Array.isArray(b);
      if (isArrayA && isArrayB) {
        return a.length === b.length && a.every(function (e, i) {
          return looseEqual(e, b[i])
        })
      } else if (a instanceof Date && b instanceof Date) {
        return a.getTime() === b.getTime()
      } else if (!isArrayA && !isArrayB) {
        var keysA = Object.keys(a);
        var keysB = Object.keys(b);
        return keysA.length === keysB.length && keysA.every(function (key) {
          return looseEqual(a[key], b[key])
        })
      } else {
        /* istanbul ignore next */
        return false
      }
    } catch (e) {
      /* istanbul ignore next */
      return false
    }
  } else if (!isObjectA && !isObjectB) {
    return String(a) === String(b)
  } else {
    return false
  }
}

/**
 * Return the first index at which a loosely equal value can be
 * found in the array (if value is a plain object, the array must
 * contain an object of the same shape), or -1 if it is not present.
 */
function looseIndexOf (arr, val) {
  for (var i = 0; i < arr.length; i++) {
    if (looseEqual(arr[i], val)) { return i }
  }
  return -1
}

/**
 * Ensure a function is called only once.
 */
function once (fn) {
  var called = false;
  return function () {
    if (!called) {
      called = true;
      fn.apply(this, arguments);
    }
  }
}

var ASSET_TYPES = [
  'component',
  'directive',
  'filter'
];

var LIFECYCLE_HOOKS = [
  'beforeCreate',
  'created',
  'beforeMount',
  'mounted',
  'beforeUpdate',
  'updated',
  'beforeDestroy',
  'destroyed',
  'activated',
  'deactivated',
  'errorCaptured',
  'serverPrefetch'
];

/*  */



var config = ({
  /**
   * Option merge strategies (used in core/util/options)
   */
  // $flow-disable-line
  optionMergeStrategies: Object.create(null),

  /**
   * Whether to suppress warnings.
   */
  silent: false,

  /**
   * Show production mode tip message on boot?
   */
  productionTip: "development" !== 'production',

  /**
   * Whether to enable devtools
   */
  devtools: "development" !== 'production',

  /**
   * Whether to record perf
   */
  performance: false,

  /**
   * Error handler for watcher errors
   */
  errorHandler: null,

  /**
   * Warn handler for watcher warns
   */
  warnHandler: null,

  /**
   * Ignore certain custom elements
   */
  ignoredElements: [],

  /**
   * Custom user key aliases for v-on
   */
  // $flow-disable-line
  keyCodes: Object.create(null),

  /**
   * Check if a tag is reserved so that it cannot be registered as a
   * component. This is platform-dependent and may be overwritten.
   */
  isReservedTag: no,

  /**
   * Check if an attribute is reserved so that it cannot be used as a component
   * prop. This is platform-dependent and may be overwritten.
   */
  isReservedAttr: no,

  /**
   * Check if a tag is an unknown element.
   * Platform-dependent.
   */
  isUnknownElement: no,

  /**
   * Get the namespace of an element
   */
  getTagNamespace: noop,

  /**
   * Parse the real tag name for the specific platform.
   */
  parsePlatformTagName: identity,

  /**
   * Check if an attribute must be bound using property, e.g. value
   * Platform-dependent.
   */
  mustUseProp: no,

  /**
   * Perform updates asynchronously. Intended to be used by Vue Test Utils
   * This will significantly reduce performance if set to false.
   */
  async: true,

  /**
   * Exposed for legacy reasons
   */
  _lifecycleHooks: LIFECYCLE_HOOKS
});

/*  */

/**
 * unicode letters used for parsing html tags, component names and property paths.
 * using https://www.w3.org/TR/html53/semantics-scripting.html#potentialcustomelementname
 * skipping \u10000-\uEFFFF due to it freezing up PhantomJS
 */
var unicodeRegExp = /a-zA-Z\u00B7\u00C0-\u00D6\u00D8-\u00F6\u00F8-\u037D\u037F-\u1FFF\u200C-\u200D\u203F-\u2040\u2070-\u218F\u2C00-\u2FEF\u3001-\uD7FF\uF900-\uFDCF\uFDF0-\uFFFD/;

/**
 * Check if a string starts with $ or _
 */
function isReserved (str) {
  var c = (str + '').charCodeAt(0);
  return c === 0x24 || c === 0x5F
}

/**
 * Define a property.
 */
function def (obj, key, val, enumerable) {
  Object.defineProperty(obj, key, {
    value: val,
    enumerable: !!enumerable,
    writable: true,
    configurable: true
  });
}

/**
 * Parse simple path.
 */
var bailRE = new RegExp(("[^" + (unicodeRegExp.source) + ".$_\\d]"));
function parsePath (path) {
  if (bailRE.test(path)) {
    return
  }
  var segments = path.split('.');
  return function (obj) {
    for (var i = 0; i < segments.length; i++) {
      if (!obj) { return }
      obj = obj[segments[i]];
    }
    return obj
  }
}

/*  */

// can we use __proto__?
var hasProto = '__proto__' in {};

// Browser environment sniffing
var inBrowser = typeof window !== 'undefined';
var inWeex = typeof WXEnvironment !== 'undefined' && !!WXEnvironment.platform;
var weexPlatform = inWeex && WXEnvironment.platform.toLowerCase();
var UA = inBrowser && window.navigator.userAgent.toLowerCase();
var isIE = UA && /msie|trident/.test(UA);
var isIE9 = UA && UA.indexOf('msie 9.0') > 0;
var isEdge = UA && UA.indexOf('edge/') > 0;
var isAndroid = (UA && UA.indexOf('android') > 0) || (weexPlatform === 'android');
var isIOS = (UA && /iphone|ipad|ipod|ios/.test(UA)) || (weexPlatform === 'ios');
var isChrome = UA && /chrome\/\d+/.test(UA) && !isEdge;
var isPhantomJS = UA && /phantomjs/.test(UA);
var isFF = UA && UA.match(/firefox\/(\d+)/);

// Firefox has a "watch" function on Object.prototype...
var nativeWatch = ({}).watch;
if (inBrowser) {
  try {
    var opts = {};
    Object.defineProperty(opts, 'passive', ({
      get: function get () {
      }
    })); // https://github.com/facebook/flow/issues/285
    window.addEventListener('test-passive', null, opts);
  } catch (e) {}
}

// this needs to be lazy-evaled because vue may be required before
// vue-server-renderer can set VUE_ENV
var _isServer;
var isServerRendering = function () {
  if (_isServer === undefined) {
    /* istanbul ignore if */
    if (!inBrowser && !inWeex && typeof global !== 'undefined') {
      // detect presence of vue-server-renderer and avoid
      // Webpack shimming the process
      _isServer = global['process'] && global['process'].env.VUE_ENV === 'server';
    } else {
      _isServer = false;
    }
  }
  return _isServer
};

// detect devtools
var devtools = inBrowser && window.__VUE_DEVTOOLS_GLOBAL_HOOK__;

/* istanbul ignore next */
function isNative (Ctor) {
  return typeof Ctor === 'function' && /native code/.test(Ctor.toString())
}

var hasSymbol =
  typeof Symbol !== 'undefined' && isNative(Symbol) &&
  typeof Reflect !== 'undefined' && isNative(Reflect.ownKeys);

var _Set;
/* istanbul ignore if */ // $flow-disable-line
if (typeof Set !== 'undefined' && isNative(Set)) {
  // use native Set when available.
  _Set = Set;
} else {
  // a non-standard Set polyfill that only works with primitive keys.
  _Set = /*@__PURE__*/(function () {
    function Set () {
      this.set = Object.create(null);
    }
    Set.prototype.has = function has (key) {
      return this.set[key] === true
    };
    Set.prototype.add = function add (key) {
      this.set[key] = true;
    };
    Set.prototype.clear = function clear () {
      this.set = Object.create(null);
    };

    return Set;
  }());
}

/*  */

var warn = noop;
var tip = noop;
var generateComponentTrace = (noop); // work around flow check
var formatComponentName = (noop);

if (true) {
  var hasConsole = typeof console !== 'undefined';
  var classifyRE = /(?:^|[-_])(\w)/g;
  var classify = function (str) { return str
    .replace(classifyRE, function (c) { return c.toUpperCase(); })
    .replace(/[-_]/g, ''); };

  warn = function (msg, vm) {
    var trace = vm ? generateComponentTrace(vm) : '';

    if (config.warnHandler) {
      config.warnHandler.call(null, msg, vm, trace);
    } else if (hasConsole && (!config.silent)) {
      console.error(("[Vue warn]: " + msg + trace));
    }
  };

  tip = function (msg, vm) {
    if (hasConsole && (!config.silent)) {
      console.warn("[Vue tip]: " + msg + (
        vm ? generateComponentTrace(vm) : ''
      ));
    }
  };

  formatComponentName = function (vm, includeFile) {
    if (vm.$root === vm) {
      if (vm.$options && vm.$options.__file) { // fixed by xxxxxx
        return ('') + vm.$options.__file
      }
      return '<Root>'
    }
    var options = typeof vm === 'function' && vm.cid != null
      ? vm.options
      : vm._isVue
        ? vm.$options || vm.constructor.options
        : vm;
    var name = options.name || options._componentTag;
    var file = options.__file;
    if (!name && file) {
      var match = file.match(/([^/\\]+)\.vue$/);
      name = match && match[1];
    }

    return (
      (name ? ("<" + (classify(name)) + ">") : "<Anonymous>") +
      (file && includeFile !== false ? (" at " + file) : '')
    )
  };

  var repeat = function (str, n) {
    var res = '';
    while (n) {
      if (n % 2 === 1) { res += str; }
      if (n > 1) { str += str; }
      n >>= 1;
    }
    return res
  };

  generateComponentTrace = function (vm) {
    if (vm._isVue && vm.$parent) {
      var tree = [];
      var currentRecursiveSequence = 0;
      while (vm && vm.$options.name !== 'PageBody') {
        if (tree.length > 0) {
          var last = tree[tree.length - 1];
          if (last.constructor === vm.constructor) {
            currentRecursiveSequence++;
            vm = vm.$parent;
            continue
          } else if (currentRecursiveSequence > 0) {
            tree[tree.length - 1] = [last, currentRecursiveSequence];
            currentRecursiveSequence = 0;
          }
        }
        !vm.$options.isReserved && tree.push(vm);
        vm = vm.$parent;
      }
      return '\n\nfound in\n\n' + tree
        .map(function (vm, i) { return ("" + (i === 0 ? '---> ' : repeat(' ', 5 + i * 2)) + (Array.isArray(vm)
            ? ((formatComponentName(vm[0])) + "... (" + (vm[1]) + " recursive calls)")
            : formatComponentName(vm))); })
        .join('\n')
    } else {
      return ("\n\n(found in " + (formatComponentName(vm)) + ")")
    }
  };
}

/*  */

var uid = 0;

/**
 * A dep is an observable that can have multiple
 * directives subscribing to it.
 */
var Dep = function Dep () {
  this.id = uid++;
  this.subs = [];
};

Dep.prototype.addSub = function addSub (sub) {
  this.subs.push(sub);
};

Dep.prototype.removeSub = function removeSub (sub) {
  remove(this.subs, sub);
};

Dep.prototype.depend = function depend () {
  if (Dep.SharedObject.target) {
    Dep.SharedObject.target.addDep(this);
  }
};

Dep.prototype.notify = function notify () {
  // stabilize the subscriber list first
  var subs = this.subs.slice();
  if ( true && !config.async) {
    // subs aren't sorted in scheduler if not running async
    // we need to sort them now to make sure they fire in correct
    // order
    subs.sort(function (a, b) { return a.id - b.id; });
  }
  for (var i = 0, l = subs.length; i < l; i++) {
    subs[i].update();
  }
};

// The current target watcher being evaluated.
// This is globally unique because only one watcher
// can be evaluated at a time.
// fixed by xxxxxx (nvue shared vuex)
/* eslint-disable no-undef */
Dep.SharedObject = {};
Dep.SharedObject.target = null;
Dep.SharedObject.targetStack = [];

function pushTarget (target) {
  Dep.SharedObject.targetStack.push(target);
  Dep.SharedObject.target = target;
  Dep.target = target;
}

function popTarget () {
  Dep.SharedObject.targetStack.pop();
  Dep.SharedObject.target = Dep.SharedObject.targetStack[Dep.SharedObject.targetStack.length - 1];
  Dep.target = Dep.SharedObject.target;
}

/*  */

var VNode = function VNode (
  tag,
  data,
  children,
  text,
  elm,
  context,
  componentOptions,
  asyncFactory
) {
  this.tag = tag;
  this.data = data;
  this.children = children;
  this.text = text;
  this.elm = elm;
  this.ns = undefined;
  this.context = context;
  this.fnContext = undefined;
  this.fnOptions = undefined;
  this.fnScopeId = undefined;
  this.key = data && data.key;
  this.componentOptions = componentOptions;
  this.componentInstance = undefined;
  this.parent = undefined;
  this.raw = false;
  this.isStatic = false;
  this.isRootInsert = true;
  this.isComment = false;
  this.isCloned = false;
  this.isOnce = false;
  this.asyncFactory = asyncFactory;
  this.asyncMeta = undefined;
  this.isAsyncPlaceholder = false;
};

var prototypeAccessors = { child: { configurable: true } };

// DEPRECATED: alias for componentInstance for backwards compat.
/* istanbul ignore next */
prototypeAccessors.child.get = function () {
  return this.componentInstance
};

Object.defineProperties( VNode.prototype, prototypeAccessors );

var createEmptyVNode = function (text) {
  if ( text === void 0 ) text = '';

  var node = new VNode();
  node.text = text;
  node.isComment = true;
  return node
};

function createTextVNode (val) {
  return new VNode(undefined, undefined, undefined, String(val))
}

// optimized shallow clone
// used for static nodes and slot nodes because they may be reused across
// multiple renders, cloning them avoids errors when DOM manipulations rely
// on their elm reference.
function cloneVNode (vnode) {
  var cloned = new VNode(
    vnode.tag,
    vnode.data,
    // #7975
    // clone children array to avoid mutating original in case of cloning
    // a child.
    vnode.children && vnode.children.slice(),
    vnode.text,
    vnode.elm,
    vnode.context,
    vnode.componentOptions,
    vnode.asyncFactory
  );
  cloned.ns = vnode.ns;
  cloned.isStatic = vnode.isStatic;
  cloned.key = vnode.key;
  cloned.isComment = vnode.isComment;
  cloned.fnContext = vnode.fnContext;
  cloned.fnOptions = vnode.fnOptions;
  cloned.fnScopeId = vnode.fnScopeId;
  cloned.asyncMeta = vnode.asyncMeta;
  cloned.isCloned = true;
  return cloned
}

/*
 * not type checking this file because flow doesn't play well with
 * dynamically accessing methods on Array prototype
 */

var arrayProto = Array.prototype;
var arrayMethods = Object.create(arrayProto);

var methodsToPatch = [
  'push',
  'pop',
  'shift',
  'unshift',
  'splice',
  'sort',
  'reverse'
];

/**
 * Intercept mutating methods and emit events
 */
methodsToPatch.forEach(function (method) {
  // cache original method
  var original = arrayProto[method];
  def(arrayMethods, method, function mutator () {
    var args = [], len = arguments.length;
    while ( len-- ) args[ len ] = arguments[ len ];

    var result = original.apply(this, args);
    var ob = this.__ob__;
    var inserted;
    switch (method) {
      case 'push':
      case 'unshift':
        inserted = args;
        break
      case 'splice':
        inserted = args.slice(2);
        break
    }
    if (inserted) { ob.observeArray(inserted); }
    // notify change
    ob.dep.notify();
    return result
  });
});

/*  */

var arrayKeys = Object.getOwnPropertyNames(arrayMethods);

/**
 * In some cases we may want to disable observation inside a component's
 * update computation.
 */
var shouldObserve = true;

function toggleObserving (value) {
  shouldObserve = value;
}

/**
 * Observer class that is attached to each observed
 * object. Once attached, the observer converts the target
 * object's property keys into getter/setters that
 * collect dependencies and dispatch updates.
 */
var Observer = function Observer (value) {
  this.value = value;
  this.dep = new Dep();
  this.vmCount = 0;
  def(value, '__ob__', this);
  if (Array.isArray(value)) {
    if (hasProto) {
      {// fixed by xxxxxx 微信小程序使用 plugins 之后，数组方法被直接挂载到了数组对象上，需要执行 copyAugment 逻辑
        if(value.push !== value.__proto__.push){
          copyAugment(value, arrayMethods, arrayKeys);
        } else {
          protoAugment(value, arrayMethods);
        }
      }
    } else {
      copyAugment(value, arrayMethods, arrayKeys);
    }
    this.observeArray(value);
  } else {
    this.walk(value);
  }
};

/**
 * Walk through all properties and convert them into
 * getter/setters. This method should only be called when
 * value type is Object.
 */
Observer.prototype.walk = function walk (obj) {
  var keys = Object.keys(obj);
  for (var i = 0; i < keys.length; i++) {
    defineReactive$$1(obj, keys[i]);
  }
};

/**
 * Observe a list of Array items.
 */
Observer.prototype.observeArray = function observeArray (items) {
  for (var i = 0, l = items.length; i < l; i++) {
    observe(items[i]);
  }
};

// helpers

/**
 * Augment a target Object or Array by intercepting
 * the prototype chain using __proto__
 */
function protoAugment (target, src) {
  /* eslint-disable no-proto */
  target.__proto__ = src;
  /* eslint-enable no-proto */
}

/**
 * Augment a target Object or Array by defining
 * hidden properties.
 */
/* istanbul ignore next */
function copyAugment (target, src, keys) {
  for (var i = 0, l = keys.length; i < l; i++) {
    var key = keys[i];
    def(target, key, src[key]);
  }
}

/**
 * Attempt to create an observer instance for a value,
 * returns the new observer if successfully observed,
 * or the existing observer if the value already has one.
 */
function observe (value, asRootData) {
  if (!isObject(value) || value instanceof VNode) {
    return
  }
  var ob;
  if (hasOwn(value, '__ob__') && value.__ob__ instanceof Observer) {
    ob = value.__ob__;
  } else if (
    shouldObserve &&
    !isServerRendering() &&
    (Array.isArray(value) || isPlainObject(value)) &&
    Object.isExtensible(value) &&
    !value._isVue
  ) {
    ob = new Observer(value);
  }
  if (asRootData && ob) {
    ob.vmCount++;
  }
  return ob
}

/**
 * Define a reactive property on an Object.
 */
function defineReactive$$1 (
  obj,
  key,
  val,
  customSetter,
  shallow
) {
  var dep = new Dep();

  var property = Object.getOwnPropertyDescriptor(obj, key);
  if (property && property.configurable === false) {
    return
  }

  // cater for pre-defined getter/setters
  var getter = property && property.get;
  var setter = property && property.set;
  if ((!getter || setter) && arguments.length === 2) {
    val = obj[key];
  }

  var childOb = !shallow && observe(val);
  Object.defineProperty(obj, key, {
    enumerable: true,
    configurable: true,
    get: function reactiveGetter () {
      var value = getter ? getter.call(obj) : val;
      if (Dep.SharedObject.target) { // fixed by xxxxxx
        dep.depend();
        if (childOb) {
          childOb.dep.depend();
          if (Array.isArray(value)) {
            dependArray(value);
          }
        }
      }
      return value
    },
    set: function reactiveSetter (newVal) {
      var value = getter ? getter.call(obj) : val;
      /* eslint-disable no-self-compare */
      if (newVal === value || (newVal !== newVal && value !== value)) {
        return
      }
      /* eslint-enable no-self-compare */
      if ( true && customSetter) {
        customSetter();
      }
      // #7981: for accessor properties without setter
      if (getter && !setter) { return }
      if (setter) {
        setter.call(obj, newVal);
      } else {
        val = newVal;
      }
      childOb = !shallow && observe(newVal);
      dep.notify();
    }
  });
}

/**
 * Set a property on an object. Adds the new property and
 * triggers change notification if the property doesn't
 * already exist.
 */
function set (target, key, val) {
  if ( true &&
    (isUndef(target) || isPrimitive(target))
  ) {
    warn(("Cannot set reactive property on undefined, null, or primitive value: " + ((target))));
  }
  if (Array.isArray(target) && isValidArrayIndex(key)) {
    target.length = Math.max(target.length, key);
    target.splice(key, 1, val);
    return val
  }
  if (key in target && !(key in Object.prototype)) {
    target[key] = val;
    return val
  }
  var ob = (target).__ob__;
  if (target._isVue || (ob && ob.vmCount)) {
     true && warn(
      'Avoid adding reactive properties to a Vue instance or its root $data ' +
      'at runtime - declare it upfront in the data option.'
    );
    return val
  }
  if (!ob) {
    target[key] = val;
    return val
  }
  defineReactive$$1(ob.value, key, val);
  ob.dep.notify();
  return val
}

/**
 * Delete a property and trigger change if necessary.
 */
function del (target, key) {
  if ( true &&
    (isUndef(target) || isPrimitive(target))
  ) {
    warn(("Cannot delete reactive property on undefined, null, or primitive value: " + ((target))));
  }
  if (Array.isArray(target) && isValidArrayIndex(key)) {
    target.splice(key, 1);
    return
  }
  var ob = (target).__ob__;
  if (target._isVue || (ob && ob.vmCount)) {
     true && warn(
      'Avoid deleting properties on a Vue instance or its root $data ' +
      '- just set it to null.'
    );
    return
  }
  if (!hasOwn(target, key)) {
    return
  }
  delete target[key];
  if (!ob) {
    return
  }
  ob.dep.notify();
}

/**
 * Collect dependencies on array elements when the array is touched, since
 * we cannot intercept array element access like property getters.
 */
function dependArray (value) {
  for (var e = (void 0), i = 0, l = value.length; i < l; i++) {
    e = value[i];
    e && e.__ob__ && e.__ob__.dep.depend();
    if (Array.isArray(e)) {
      dependArray(e);
    }
  }
}

/*  */

/**
 * Option overwriting strategies are functions that handle
 * how to merge a parent option value and a child option
 * value into the final value.
 */
var strats = config.optionMergeStrategies;

/**
 * Options with restrictions
 */
if (true) {
  strats.el = strats.propsData = function (parent, child, vm, key) {
    if (!vm) {
      warn(
        "option \"" + key + "\" can only be used during instance " +
        'creation with the `new` keyword.'
      );
    }
    return defaultStrat(parent, child)
  };
}

/**
 * Helper that recursively merges two data objects together.
 */
function mergeData (to, from) {
  if (!from) { return to }
  var key, toVal, fromVal;

  var keys = hasSymbol
    ? Reflect.ownKeys(from)
    : Object.keys(from);

  for (var i = 0; i < keys.length; i++) {
    key = keys[i];
    // in case the object is already observed...
    if (key === '__ob__') { continue }
    toVal = to[key];
    fromVal = from[key];
    if (!hasOwn(to, key)) {
      set(to, key, fromVal);
    } else if (
      toVal !== fromVal &&
      isPlainObject(toVal) &&
      isPlainObject(fromVal)
    ) {
      mergeData(toVal, fromVal);
    }
  }
  return to
}

/**
 * Data
 */
function mergeDataOrFn (
  parentVal,
  childVal,
  vm
) {
  if (!vm) {
    // in a Vue.extend merge, both should be functions
    if (!childVal) {
      return parentVal
    }
    if (!parentVal) {
      return childVal
    }
    // when parentVal & childVal are both present,
    // we need to return a function that returns the
    // merged result of both functions... no need to
    // check if parentVal is a function here because
    // it has to be a function to pass previous merges.
    return function mergedDataFn () {
      return mergeData(
        typeof childVal === 'function' ? childVal.call(this, this) : childVal,
        typeof parentVal === 'function' ? parentVal.call(this, this) : parentVal
      )
    }
  } else {
    return function mergedInstanceDataFn () {
      // instance merge
      var instanceData = typeof childVal === 'function'
        ? childVal.call(vm, vm)
        : childVal;
      var defaultData = typeof parentVal === 'function'
        ? parentVal.call(vm, vm)
        : parentVal;
      if (instanceData) {
        return mergeData(instanceData, defaultData)
      } else {
        return defaultData
      }
    }
  }
}

strats.data = function (
  parentVal,
  childVal,
  vm
) {
  if (!vm) {
    if (childVal && typeof childVal !== 'function') {
       true && warn(
        'The "data" option should be a function ' +
        'that returns a per-instance value in component ' +
        'definitions.',
        vm
      );

      return parentVal
    }
    return mergeDataOrFn(parentVal, childVal)
  }

  return mergeDataOrFn(parentVal, childVal, vm)
};

/**
 * Hooks and props are merged as arrays.
 */
function mergeHook (
  parentVal,
  childVal
) {
  var res = childVal
    ? parentVal
      ? parentVal.concat(childVal)
      : Array.isArray(childVal)
        ? childVal
        : [childVal]
    : parentVal;
  return res
    ? dedupeHooks(res)
    : res
}

function dedupeHooks (hooks) {
  var res = [];
  for (var i = 0; i < hooks.length; i++) {
    if (res.indexOf(hooks[i]) === -1) {
      res.push(hooks[i]);
    }
  }
  return res
}

LIFECYCLE_HOOKS.forEach(function (hook) {
  strats[hook] = mergeHook;
});

/**
 * Assets
 *
 * When a vm is present (instance creation), we need to do
 * a three-way merge between constructor options, instance
 * options and parent options.
 */
function mergeAssets (
  parentVal,
  childVal,
  vm,
  key
) {
  var res = Object.create(parentVal || null);
  if (childVal) {
     true && assertObjectType(key, childVal, vm);
    return extend(res, childVal)
  } else {
    return res
  }
}

ASSET_TYPES.forEach(function (type) {
  strats[type + 's'] = mergeAssets;
});

/**
 * Watchers.
 *
 * Watchers hashes should not overwrite one
 * another, so we merge them as arrays.
 */
strats.watch = function (
  parentVal,
  childVal,
  vm,
  key
) {
  // work around Firefox's Object.prototype.watch...
  if (parentVal === nativeWatch) { parentVal = undefined; }
  if (childVal === nativeWatch) { childVal = undefined; }
  /* istanbul ignore if */
  if (!childVal) { return Object.create(parentVal || null) }
  if (true) {
    assertObjectType(key, childVal, vm);
  }
  if (!parentVal) { return childVal }
  var ret = {};
  extend(ret, parentVal);
  for (var key$1 in childVal) {
    var parent = ret[key$1];
    var child = childVal[key$1];
    if (parent && !Array.isArray(parent)) {
      parent = [parent];
    }
    ret[key$1] = parent
      ? parent.concat(child)
      : Array.isArray(child) ? child : [child];
  }
  return ret
};

/**
 * Other object hashes.
 */
strats.props =
strats.methods =
strats.inject =
strats.computed = function (
  parentVal,
  childVal,
  vm,
  key
) {
  if (childVal && "development" !== 'production') {
    assertObjectType(key, childVal, vm);
  }
  if (!parentVal) { return childVal }
  var ret = Object.create(null);
  extend(ret, parentVal);
  if (childVal) { extend(ret, childVal); }
  return ret
};
strats.provide = mergeDataOrFn;

/**
 * Default strategy.
 */
var defaultStrat = function (parentVal, childVal) {
  return childVal === undefined
    ? parentVal
    : childVal
};

/**
 * Validate component names
 */
function checkComponents (options) {
  for (var key in options.components) {
    validateComponentName(key);
  }
}

function validateComponentName (name) {
  if (!new RegExp(("^[a-zA-Z][\\-\\.0-9_" + (unicodeRegExp.source) + "]*$")).test(name)) {
    warn(
      'Invalid component name: "' + name + '". Component names ' +
      'should conform to valid custom element name in html5 specification.'
    );
  }
  if (isBuiltInTag(name) || config.isReservedTag(name)) {
    warn(
      'Do not use built-in or reserved HTML elements as component ' +
      'id: ' + name
    );
  }
}

/**
 * Ensure all props option syntax are normalized into the
 * Object-based format.
 */
function normalizeProps (options, vm) {
  var props = options.props;
  if (!props) { return }
  var res = {};
  var i, val, name;
  if (Array.isArray(props)) {
    i = props.length;
    while (i--) {
      val = props[i];
      if (typeof val === 'string') {
        name = camelize(val);
        res[name] = { type: null };
      } else if (true) {
        warn('props must be strings when using array syntax.');
      }
    }
  } else if (isPlainObject(props)) {
    for (var key in props) {
      val = props[key];
      name = camelize(key);
      res[name] = isPlainObject(val)
        ? val
        : { type: val };
    }
  } else if (true) {
    warn(
      "Invalid value for option \"props\": expected an Array or an Object, " +
      "but got " + (toRawType(props)) + ".",
      vm
    );
  }
  options.props = res;
}

/**
 * Normalize all injections into Object-based format
 */
function normalizeInject (options, vm) {
  var inject = options.inject;
  if (!inject) { return }
  var normalized = options.inject = {};
  if (Array.isArray(inject)) {
    for (var i = 0; i < inject.length; i++) {
      normalized[inject[i]] = { from: inject[i] };
    }
  } else if (isPlainObject(inject)) {
    for (var key in inject) {
      var val = inject[key];
      normalized[key] = isPlainObject(val)
        ? extend({ from: key }, val)
        : { from: val };
    }
  } else if (true) {
    warn(
      "Invalid value for option \"inject\": expected an Array or an Object, " +
      "but got " + (toRawType(inject)) + ".",
      vm
    );
  }
}

/**
 * Normalize raw function directives into object format.
 */
function normalizeDirectives (options) {
  var dirs = options.directives;
  if (dirs) {
    for (var key in dirs) {
      var def$$1 = dirs[key];
      if (typeof def$$1 === 'function') {
        dirs[key] = { bind: def$$1, update: def$$1 };
      }
    }
  }
}

function assertObjectType (name, value, vm) {
  if (!isPlainObject(value)) {
    warn(
      "Invalid value for option \"" + name + "\": expected an Object, " +
      "but got " + (toRawType(value)) + ".",
      vm
    );
  }
}

/**
 * Merge two option objects into a new one.
 * Core utility used in both instantiation and inheritance.
 */
function mergeOptions (
  parent,
  child,
  vm
) {
  if (true) {
    checkComponents(child);
  }

  if (typeof child === 'function') {
    child = child.options;
  }

  normalizeProps(child, vm);
  normalizeInject(child, vm);
  normalizeDirectives(child);

  // Apply extends and mixins on the child options,
  // but only if it is a raw options object that isn't
  // the result of another mergeOptions call.
  // Only merged options has the _base property.
  if (!child._base) {
    if (child.extends) {
      parent = mergeOptions(parent, child.extends, vm);
    }
    if (child.mixins) {
      for (var i = 0, l = child.mixins.length; i < l; i++) {
        parent = mergeOptions(parent, child.mixins[i], vm);
      }
    }
  }

  var options = {};
  var key;
  for (key in parent) {
    mergeField(key);
  }
  for (key in child) {
    if (!hasOwn(parent, key)) {
      mergeField(key);
    }
  }
  function mergeField (key) {
    var strat = strats[key] || defaultStrat;
    options[key] = strat(parent[key], child[key], vm, key);
  }
  return options
}

/**
 * Resolve an asset.
 * This function is used because child instances need access
 * to assets defined in its ancestor chain.
 */
function resolveAsset (
  options,
  type,
  id,
  warnMissing
) {
  /* istanbul ignore if */
  if (typeof id !== 'string') {
    return
  }
  var assets = options[type];
  // check local registration variations first
  if (hasOwn(assets, id)) { return assets[id] }
  var camelizedId = camelize(id);
  if (hasOwn(assets, camelizedId)) { return assets[camelizedId] }
  var PascalCaseId = capitalize(camelizedId);
  if (hasOwn(assets, PascalCaseId)) { return assets[PascalCaseId] }
  // fallback to prototype chain
  var res = assets[id] || assets[camelizedId] || assets[PascalCaseId];
  if ( true && warnMissing && !res) {
    warn(
      'Failed to resolve ' + type.slice(0, -1) + ': ' + id,
      options
    );
  }
  return res
}

/*  */



function validateProp (
  key,
  propOptions,
  propsData,
  vm
) {
  var prop = propOptions[key];
  var absent = !hasOwn(propsData, key);
  var value = propsData[key];
  // boolean casting
  var booleanIndex = getTypeIndex(Boolean, prop.type);
  if (booleanIndex > -1) {
    if (absent && !hasOwn(prop, 'default')) {
      value = false;
    } else if (value === '' || value === hyphenate(key)) {
      // only cast empty string / same name to boolean if
      // boolean has higher priority
      var stringIndex = getTypeIndex(String, prop.type);
      if (stringIndex < 0 || booleanIndex < stringIndex) {
        value = true;
      }
    }
  }
  // check default value
  if (value === undefined) {
    value = getPropDefaultValue(vm, prop, key);
    // since the default value is a fresh copy,
    // make sure to observe it.
    var prevShouldObserve = shouldObserve;
    toggleObserving(true);
    observe(value);
    toggleObserving(prevShouldObserve);
  }
  if (
    true
  ) {
    assertProp(prop, key, value, vm, absent);
  }
  return value
}

/**
 * Get the default value of a prop.
 */
function getPropDefaultValue (vm, prop, key) {
  // no default, return undefined
  if (!hasOwn(prop, 'default')) {
    return undefined
  }
  var def = prop.default;
  // warn against non-factory defaults for Object & Array
  if ( true && isObject(def)) {
    warn(
      'Invalid default value for prop "' + key + '": ' +
      'Props with type Object/Array must use a factory function ' +
      'to return the default value.',
      vm
    );
  }
  // the raw prop value was also undefined from previous render,
  // return previous default value to avoid unnecessary watcher trigger
  if (vm && vm.$options.propsData &&
    vm.$options.propsData[key] === undefined &&
    vm._props[key] !== undefined
  ) {
    return vm._props[key]
  }
  // call factory function for non-Function types
  // a value is Function if its prototype is function even across different execution context
  return typeof def === 'function' && getType(prop.type) !== 'Function'
    ? def.call(vm)
    : def
}

/**
 * Assert whether a prop is valid.
 */
function assertProp (
  prop,
  name,
  value,
  vm,
  absent
) {
  if (prop.required && absent) {
    warn(
      'Missing required prop: "' + name + '"',
      vm
    );
    return
  }
  if (value == null && !prop.required) {
    return
  }
  var type = prop.type;
  var valid = !type || type === true;
  var expectedTypes = [];
  if (type) {
    if (!Array.isArray(type)) {
      type = [type];
    }
    for (var i = 0; i < type.length && !valid; i++) {
      var assertedType = assertType(value, type[i]);
      expectedTypes.push(assertedType.expectedType || '');
      valid = assertedType.valid;
    }
  }

  if (!valid) {
    warn(
      getInvalidTypeMessage(name, value, expectedTypes),
      vm
    );
    return
  }
  var validator = prop.validator;
  if (validator) {
    if (!validator(value)) {
      warn(
        'Invalid prop: custom validator check failed for prop "' + name + '".',
        vm
      );
    }
  }
}

var simpleCheckRE = /^(String|Number|Boolean|Function|Symbol)$/;

function assertType (value, type) {
  var valid;
  var expectedType = getType(type);
  if (simpleCheckRE.test(expectedType)) {
    var t = typeof value;
    valid = t === expectedType.toLowerCase();
    // for primitive wrapper objects
    if (!valid && t === 'object') {
      valid = value instanceof type;
    }
  } else if (expectedType === 'Object') {
    valid = isPlainObject(value);
  } else if (expectedType === 'Array') {
    valid = Array.isArray(value);
  } else {
    valid = value instanceof type;
  }
  return {
    valid: valid,
    expectedType: expectedType
  }
}

/**
 * Use function string name to check built-in types,
 * because a simple equality check will fail when running
 * across different vms / iframes.
 */
function getType (fn) {
  var match = fn && fn.toString().match(/^\s*function (\w+)/);
  return match ? match[1] : ''
}

function isSameType (a, b) {
  return getType(a) === getType(b)
}

function getTypeIndex (type, expectedTypes) {
  if (!Array.isArray(expectedTypes)) {
    return isSameType(expectedTypes, type) ? 0 : -1
  }
  for (var i = 0, len = expectedTypes.length; i < len; i++) {
    if (isSameType(expectedTypes[i], type)) {
      return i
    }
  }
  return -1
}

function getInvalidTypeMessage (name, value, expectedTypes) {
  var message = "Invalid prop: type check failed for prop \"" + name + "\"." +
    " Expected " + (expectedTypes.map(capitalize).join(', '));
  var expectedType = expectedTypes[0];
  var receivedType = toRawType(value);
  var expectedValue = styleValue(value, expectedType);
  var receivedValue = styleValue(value, receivedType);
  // check if we need to specify expected value
  if (expectedTypes.length === 1 &&
      isExplicable(expectedType) &&
      !isBoolean(expectedType, receivedType)) {
    message += " with value " + expectedValue;
  }
  message += ", got " + receivedType + " ";
  // check if we need to specify received value
  if (isExplicable(receivedType)) {
    message += "with value " + receivedValue + ".";
  }
  return message
}

function styleValue (value, type) {
  if (type === 'String') {
    return ("\"" + value + "\"")
  } else if (type === 'Number') {
    return ("" + (Number(value)))
  } else {
    return ("" + value)
  }
}

function isExplicable (value) {
  var explicitTypes = ['string', 'number', 'boolean'];
  return explicitTypes.some(function (elem) { return value.toLowerCase() === elem; })
}

function isBoolean () {
  var args = [], len = arguments.length;
  while ( len-- ) args[ len ] = arguments[ len ];

  return args.some(function (elem) { return elem.toLowerCase() === 'boolean'; })
}

/*  */

function handleError (err, vm, info) {
  // Deactivate deps tracking while processing error handler to avoid possible infinite rendering.
  // See: https://github.com/vuejs/vuex/issues/1505
  pushTarget();
  try {
    if (vm) {
      var cur = vm;
      while ((cur = cur.$parent)) {
        var hooks = cur.$options.errorCaptured;
        if (hooks) {
          for (var i = 0; i < hooks.length; i++) {
            try {
              var capture = hooks[i].call(cur, err, vm, info) === false;
              if (capture) { return }
            } catch (e) {
              globalHandleError(e, cur, 'errorCaptured hook');
            }
          }
        }
      }
    }
    globalHandleError(err, vm, info);
  } finally {
    popTarget();
  }
}

function invokeWithErrorHandling (
  handler,
  context,
  args,
  vm,
  info
) {
  var res;
  try {
    res = args ? handler.apply(context, args) : handler.call(context);
    if (res && !res._isVue && isPromise(res) && !res._handled) {
      res.catch(function (e) { return handleError(e, vm, info + " (Promise/async)"); });
      // issue #9511
      // avoid catch triggering multiple times when nested calls
      res._handled = true;
    }
  } catch (e) {
    handleError(e, vm, info);
  }
  return res
}

function globalHandleError (err, vm, info) {
  if (config.errorHandler) {
    try {
      return config.errorHandler.call(null, err, vm, info)
    } catch (e) {
      // if the user intentionally throws the original error in the handler,
      // do not log it twice
      if (e !== err) {
        logError(e, null, 'config.errorHandler');
      }
    }
  }
  logError(err, vm, info);
}

function logError (err, vm, info) {
  if (true) {
    warn(("Error in " + info + ": \"" + (err.toString()) + "\""), vm);
  }
  /* istanbul ignore else */
  if ((inBrowser || inWeex) && typeof console !== 'undefined') {
    console.error(err);
  } else {
    throw err
  }
}

/*  */

var callbacks = [];
var pending = false;

function flushCallbacks () {
  pending = false;
  var copies = callbacks.slice(0);
  callbacks.length = 0;
  for (var i = 0; i < copies.length; i++) {
    copies[i]();
  }
}

// Here we have async deferring wrappers using microtasks.
// In 2.5 we used (macro) tasks (in combination with microtasks).
// However, it has subtle problems when state is changed right before repaint
// (e.g. #6813, out-in transitions).
// Also, using (macro) tasks in event handler would cause some weird behaviors
// that cannot be circumvented (e.g. #7109, #7153, #7546, #7834, #8109).
// So we now use microtasks everywhere, again.
// A major drawback of this tradeoff is that there are some scenarios
// where microtasks have too high a priority and fire in between supposedly
// sequential events (e.g. #4521, #6690, which have workarounds)
// or even between bubbling of the same event (#6566).
var timerFunc;

// The nextTick behavior leverages the microtask queue, which can be accessed
// via either native Promise.then or MutationObserver.
// MutationObserver has wider support, however it is seriously bugged in
// UIWebView in iOS >= 9.3.3 when triggered in touch event handlers. It
// completely stops working after triggering a few times... so, if native
// Promise is available, we will use it:
/* istanbul ignore next, $flow-disable-line */
if (typeof Promise !== 'undefined' && isNative(Promise)) {
  var p = Promise.resolve();
  timerFunc = function () {
    p.then(flushCallbacks);
    // In problematic UIWebViews, Promise.then doesn't completely break, but
    // it can get stuck in a weird state where callbacks are pushed into the
    // microtask queue but the queue isn't being flushed, until the browser
    // needs to do some other work, e.g. handle a timer. Therefore we can
    // "force" the microtask queue to be flushed by adding an empty timer.
    if (isIOS) { setTimeout(noop); }
  };
} else if (!isIE && typeof MutationObserver !== 'undefined' && (
  isNative(MutationObserver) ||
  // PhantomJS and iOS 7.x
  MutationObserver.toString() === '[object MutationObserverConstructor]'
)) {
  // Use MutationObserver where native Promise is not available,
  // e.g. PhantomJS, iOS7, Android 4.4
  // (#6466 MutationObserver is unreliable in IE11)
  var counter = 1;
  var observer = new MutationObserver(flushCallbacks);
  var textNode = document.createTextNode(String(counter));
  observer.observe(textNode, {
    characterData: true
  });
  timerFunc = function () {
    counter = (counter + 1) % 2;
    textNode.data = String(counter);
  };
} else if (typeof setImmediate !== 'undefined' && isNative(setImmediate)) {
  // Fallback to setImmediate.
  // Technically it leverages the (macro) task queue,
  // but it is still a better choice than setTimeout.
  timerFunc = function () {
    setImmediate(flushCallbacks);
  };
} else {
  // Fallback to setTimeout.
  timerFunc = function () {
    setTimeout(flushCallbacks, 0);
  };
}

function nextTick (cb, ctx) {
  var _resolve;
  callbacks.push(function () {
    if (cb) {
      try {
        cb.call(ctx);
      } catch (e) {
        handleError(e, ctx, 'nextTick');
      }
    } else if (_resolve) {
      _resolve(ctx);
    }
  });
  if (!pending) {
    pending = true;
    timerFunc();
  }
  // $flow-disable-line
  if (!cb && typeof Promise !== 'undefined') {
    return new Promise(function (resolve) {
      _resolve = resolve;
    })
  }
}

/*  */

/* not type checking this file because flow doesn't play well with Proxy */

var initProxy;

if (true) {
  var allowedGlobals = makeMap(
    'Infinity,undefined,NaN,isFinite,isNaN,' +
    'parseFloat,parseInt,decodeURI,decodeURIComponent,encodeURI,encodeURIComponent,' +
    'Math,Number,Date,Array,Object,Boolean,String,RegExp,Map,Set,JSON,Intl,' +
    'require' // for Webpack/Browserify
  );

  var warnNonPresent = function (target, key) {
    warn(
      "Property or method \"" + key + "\" is not defined on the instance but " +
      'referenced during render. Make sure that this property is reactive, ' +
      'either in the data option, or for class-based components, by ' +
      'initializing the property. ' +
      'See: https://vuejs.org/v2/guide/reactivity.html#Declaring-Reactive-Properties.',
      target
    );
  };

  var warnReservedPrefix = function (target, key) {
    warn(
      "Property \"" + key + "\" must be accessed with \"$data." + key + "\" because " +
      'properties starting with "$" or "_" are not proxied in the Vue instance to ' +
      'prevent conflicts with Vue internals. ' +
      'See: https://vuejs.org/v2/api/#data',
      target
    );
  };

  var hasProxy =
    typeof Proxy !== 'undefined' && isNative(Proxy);

  if (hasProxy) {
    var isBuiltInModifier = makeMap('stop,prevent,self,ctrl,shift,alt,meta,exact');
    config.keyCodes = new Proxy(config.keyCodes, {
      set: function set (target, key, value) {
        if (isBuiltInModifier(key)) {
          warn(("Avoid overwriting built-in modifier in config.keyCodes: ." + key));
          return false
        } else {
          target[key] = value;
          return true
        }
      }
    });
  }

  var hasHandler = {
    has: function has (target, key) {
      var has = key in target;
      var isAllowed = allowedGlobals(key) ||
        (typeof key === 'string' && key.charAt(0) === '_' && !(key in target.$data));
      if (!has && !isAllowed) {
        if (key in target.$data) { warnReservedPrefix(target, key); }
        else { warnNonPresent(target, key); }
      }
      return has || !isAllowed
    }
  };

  var getHandler = {
    get: function get (target, key) {
      if (typeof key === 'string' && !(key in target)) {
        if (key in target.$data) { warnReservedPrefix(target, key); }
        else { warnNonPresent(target, key); }
      }
      return target[key]
    }
  };

  initProxy = function initProxy (vm) {
    if (hasProxy) {
      // determine which proxy handler to use
      var options = vm.$options;
      var handlers = options.render && options.render._withStripped
        ? getHandler
        : hasHandler;
      vm._renderProxy = new Proxy(vm, handlers);
    } else {
      vm._renderProxy = vm;
    }
  };
}

/*  */

var seenObjects = new _Set();

/**
 * Recursively traverse an object to evoke all converted
 * getters, so that every nested property inside the object
 * is collected as a "deep" dependency.
 */
function traverse (val) {
  _traverse(val, seenObjects);
  seenObjects.clear();
}

function _traverse (val, seen) {
  var i, keys;
  var isA = Array.isArray(val);
  if ((!isA && !isObject(val)) || Object.isFrozen(val) || val instanceof VNode) {
    return
  }
  if (val.__ob__) {
    var depId = val.__ob__.dep.id;
    if (seen.has(depId)) {
      return
    }
    seen.add(depId);
  }
  if (isA) {
    i = val.length;
    while (i--) { _traverse(val[i], seen); }
  } else {
    keys = Object.keys(val);
    i = keys.length;
    while (i--) { _traverse(val[keys[i]], seen); }
  }
}

var mark;
var measure;

if (true) {
  var perf = inBrowser && window.performance;
  /* istanbul ignore if */
  if (
    perf &&
    perf.mark &&
    perf.measure &&
    perf.clearMarks &&
    perf.clearMeasures
  ) {
    mark = function (tag) { return perf.mark(tag); };
    measure = function (name, startTag, endTag) {
      perf.measure(name, startTag, endTag);
      perf.clearMarks(startTag);
      perf.clearMarks(endTag);
      // perf.clearMeasures(name)
    };
  }
}

/*  */

var normalizeEvent = cached(function (name) {
  var passive = name.charAt(0) === '&';
  name = passive ? name.slice(1) : name;
  var once$$1 = name.charAt(0) === '~'; // Prefixed last, checked first
  name = once$$1 ? name.slice(1) : name;
  var capture = name.charAt(0) === '!';
  name = capture ? name.slice(1) : name;
  return {
    name: name,
    once: once$$1,
    capture: capture,
    passive: passive
  }
});

function createFnInvoker (fns, vm) {
  function invoker () {
    var arguments$1 = arguments;

    var fns = invoker.fns;
    if (Array.isArray(fns)) {
      var cloned = fns.slice();
      for (var i = 0; i < cloned.length; i++) {
        invokeWithErrorHandling(cloned[i], null, arguments$1, vm, "v-on handler");
      }
    } else {
      // return handler return value for single handlers
      return invokeWithErrorHandling(fns, null, arguments, vm, "v-on handler")
    }
  }
  invoker.fns = fns;
  return invoker
}

function updateListeners (
  on,
  oldOn,
  add,
  remove$$1,
  createOnceHandler,
  vm
) {
  var name, def$$1, cur, old, event;
  for (name in on) {
    def$$1 = cur = on[name];
    old = oldOn[name];
    event = normalizeEvent(name);
    if (isUndef(cur)) {
       true && warn(
        "Invalid handler for event \"" + (event.name) + "\": got " + String(cur),
        vm
      );
    } else if (isUndef(old)) {
      if (isUndef(cur.fns)) {
        cur = on[name] = createFnInvoker(cur, vm);
      }
      if (isTrue(event.once)) {
        cur = on[name] = createOnceHandler(event.name, cur, event.capture);
      }
      add(event.name, cur, event.capture, event.passive, event.params);
    } else if (cur !== old) {
      old.fns = cur;
      on[name] = old;
    }
  }
  for (name in oldOn) {
    if (isUndef(on[name])) {
      event = normalizeEvent(name);
      remove$$1(event.name, oldOn[name], event.capture);
    }
  }
}

/*  */

/*  */

// fixed by xxxxxx (mp properties)
function extractPropertiesFromVNodeData(data, Ctor, res, context) {
  var propOptions = Ctor.options.mpOptions && Ctor.options.mpOptions.properties;
  if (isUndef(propOptions)) {
    return res
  }
  var externalClasses = Ctor.options.mpOptions.externalClasses || [];
  var attrs = data.attrs;
  var props = data.props;
  if (isDef(attrs) || isDef(props)) {
    for (var key in propOptions) {
      var altKey = hyphenate(key);
      var result = checkProp(res, props, key, altKey, true) ||
          checkProp(res, attrs, key, altKey, false);
      // externalClass
      if (
        result &&
        res[key] &&
        externalClasses.indexOf(altKey) !== -1 &&
        context[camelize(res[key])]
      ) {
        // 赋值 externalClass 真正的值(模板里 externalClass 的值可能是字符串)
        res[key] = context[camelize(res[key])];
      }
    }
  }
  return res
}

function extractPropsFromVNodeData (
  data,
  Ctor,
  tag,
  context// fixed by xxxxxx
) {
  // we are only extracting raw values here.
  // validation and default values are handled in the child
  // component itself.
  var propOptions = Ctor.options.props;
  if (isUndef(propOptions)) {
    // fixed by xxxxxx
    return extractPropertiesFromVNodeData(data, Ctor, {}, context)
  }
  var res = {};
  var attrs = data.attrs;
  var props = data.props;
  if (isDef(attrs) || isDef(props)) {
    for (var key in propOptions) {
      var altKey = hyphenate(key);
      if (true) {
        var keyInLowerCase = key.toLowerCase();
        if (
          key !== keyInLowerCase &&
          attrs && hasOwn(attrs, keyInLowerCase)
        ) {
          tip(
            "Prop \"" + keyInLowerCase + "\" is passed to component " +
            (formatComponentName(tag || Ctor)) + ", but the declared prop name is" +
            " \"" + key + "\". " +
            "Note that HTML attributes are case-insensitive and camelCased " +
            "props need to use their kebab-case equivalents when using in-DOM " +
            "templates. You should probably use \"" + altKey + "\" instead of \"" + key + "\"."
          );
        }
      }
      checkProp(res, props, key, altKey, true) ||
      checkProp(res, attrs, key, altKey, false);
    }
  }
  // fixed by xxxxxx
  return extractPropertiesFromVNodeData(data, Ctor, res, context)
}

function checkProp (
  res,
  hash,
  key,
  altKey,
  preserve
) {
  if (isDef(hash)) {
    if (hasOwn(hash, key)) {
      res[key] = hash[key];
      if (!preserve) {
        delete hash[key];
      }
      return true
    } else if (hasOwn(hash, altKey)) {
      res[key] = hash[altKey];
      if (!preserve) {
        delete hash[altKey];
      }
      return true
    }
  }
  return false
}

/*  */

// The template compiler attempts to minimize the need for normalization by
// statically analyzing the template at compile time.
//
// For plain HTML markup, normalization can be completely skipped because the
// generated render function is guaranteed to return Array<VNode>. There are
// two cases where extra normalization is needed:

// 1. When the children contains components - because a functional component
// may return an Array instead of a single root. In this case, just a simple
// normalization is needed - if any child is an Array, we flatten the whole
// thing with Array.prototype.concat. It is guaranteed to be only 1-level deep
// because functional components already normalize their own children.
function simpleNormalizeChildren (children) {
  for (var i = 0; i < children.length; i++) {
    if (Array.isArray(children[i])) {
      return Array.prototype.concat.apply([], children)
    }
  }
  return children
}

// 2. When the children contains constructs that always generated nested Arrays,
// e.g. <template>, <slot>, v-for, or when the children is provided by user
// with hand-written render functions / JSX. In such cases a full normalization
// is needed to cater to all possible types of children values.
function normalizeChildren (children) {
  return isPrimitive(children)
    ? [createTextVNode(children)]
    : Array.isArray(children)
      ? normalizeArrayChildren(children)
      : undefined
}

function isTextNode (node) {
  return isDef(node) && isDef(node.text) && isFalse(node.isComment)
}

function normalizeArrayChildren (children, nestedIndex) {
  var res = [];
  var i, c, lastIndex, last;
  for (i = 0; i < children.length; i++) {
    c = children[i];
    if (isUndef(c) || typeof c === 'boolean') { continue }
    lastIndex = res.length - 1;
    last = res[lastIndex];
    //  nested
    if (Array.isArray(c)) {
      if (c.length > 0) {
        c = normalizeArrayChildren(c, ((nestedIndex || '') + "_" + i));
        // merge adjacent text nodes
        if (isTextNode(c[0]) && isTextNode(last)) {
          res[lastIndex] = createTextVNode(last.text + (c[0]).text);
          c.shift();
        }
        res.push.apply(res, c);
      }
    } else if (isPrimitive(c)) {
      if (isTextNode(last)) {
        // merge adjacent text nodes
        // this is necessary for SSR hydration because text nodes are
        // essentially merged when rendered to HTML strings
        res[lastIndex] = createTextVNode(last.text + c);
      } else if (c !== '') {
        // convert primitive to vnode
        res.push(createTextVNode(c));
      }
    } else {
      if (isTextNode(c) && isTextNode(last)) {
        // merge adjacent text nodes
        res[lastIndex] = createTextVNode(last.text + c.text);
      } else {
        // default key for nested array children (likely generated by v-for)
        if (isTrue(children._isVList) &&
          isDef(c.tag) &&
          isUndef(c.key) &&
          isDef(nestedIndex)) {
          c.key = "__vlist" + nestedIndex + "_" + i + "__";
        }
        res.push(c);
      }
    }
  }
  return res
}

/*  */

function initProvide (vm) {
  var provide = vm.$options.provide;
  if (provide) {
    vm._provided = typeof provide === 'function'
      ? provide.call(vm)
      : provide;
  }
}

function initInjections (vm) {
  var result = resolveInject(vm.$options.inject, vm);
  if (result) {
    toggleObserving(false);
    Object.keys(result).forEach(function (key) {
      /* istanbul ignore else */
      if (true) {
        defineReactive$$1(vm, key, result[key], function () {
          warn(
            "Avoid mutating an injected value directly since the changes will be " +
            "overwritten whenever the provided component re-renders. " +
            "injection being mutated: \"" + key + "\"",
            vm
          );
        });
      } else {}
    });
    toggleObserving(true);
  }
}

function resolveInject (inject, vm) {
  if (inject) {
    // inject is :any because flow is not smart enough to figure out cached
    var result = Object.create(null);
    var keys = hasSymbol
      ? Reflect.ownKeys(inject)
      : Object.keys(inject);

    for (var i = 0; i < keys.length; i++) {
      var key = keys[i];
      // #6574 in case the inject object is observed...
      if (key === '__ob__') { continue }
      var provideKey = inject[key].from;
      var source = vm;
      while (source) {
        if (source._provided && hasOwn(source._provided, provideKey)) {
          result[key] = source._provided[provideKey];
          break
        }
        source = source.$parent;
      }
      if (!source) {
        if ('default' in inject[key]) {
          var provideDefault = inject[key].default;
          result[key] = typeof provideDefault === 'function'
            ? provideDefault.call(vm)
            : provideDefault;
        } else if (true) {
          warn(("Injection \"" + key + "\" not found"), vm);
        }
      }
    }
    return result
  }
}

/*  */



/**
 * Runtime helper for resolving raw children VNodes into a slot object.
 */
function resolveSlots (
  children,
  context
) {
  if (!children || !children.length) {
    return {}
  }
  var slots = {};
  for (var i = 0, l = children.length; i < l; i++) {
    var child = children[i];
    var data = child.data;
    // remove slot attribute if the node is resolved as a Vue slot node
    if (data && data.attrs && data.attrs.slot) {
      delete data.attrs.slot;
    }
    // named slots should only be respected if the vnode was rendered in the
    // same context.
    if ((child.context === context || child.fnContext === context) &&
      data && data.slot != null
    ) {
      var name = data.slot;
      var slot = (slots[name] || (slots[name] = []));
      if (child.tag === 'template') {
        slot.push.apply(slot, child.children || []);
      } else {
        slot.push(child);
      }
    } else {
      // fixed by xxxxxx 临时 hack 掉 uni-app 中的异步 name slot page
      if(child.asyncMeta && child.asyncMeta.data && child.asyncMeta.data.slot === 'page'){
        (slots['page'] || (slots['page'] = [])).push(child);
      }else{
        (slots.default || (slots.default = [])).push(child);
      }
    }
  }
  // ignore slots that contains only whitespace
  for (var name$1 in slots) {
    if (slots[name$1].every(isWhitespace)) {
      delete slots[name$1];
    }
  }
  return slots
}

function isWhitespace (node) {
  return (node.isComment && !node.asyncFactory) || node.text === ' '
}

/*  */

function normalizeScopedSlots (
  slots,
  normalSlots,
  prevSlots
) {
  var res;
  var hasNormalSlots = Object.keys(normalSlots).length > 0;
  var isStable = slots ? !!slots.$stable : !hasNormalSlots;
  var key = slots && slots.$key;
  if (!slots) {
    res = {};
  } else if (slots._normalized) {
    // fast path 1: child component re-render only, parent did not change
    return slots._normalized
  } else if (
    isStable &&
    prevSlots &&
    prevSlots !== emptyObject &&
    key === prevSlots.$key &&
    !hasNormalSlots &&
    !prevSlots.$hasNormal
  ) {
    // fast path 2: stable scoped slots w/ no normal slots to proxy,
    // only need to normalize once
    return prevSlots
  } else {
    res = {};
    for (var key$1 in slots) {
      if (slots[key$1] && key$1[0] !== '$') {
        res[key$1] = normalizeScopedSlot(normalSlots, key$1, slots[key$1]);
      }
    }
  }
  // expose normal slots on scopedSlots
  for (var key$2 in normalSlots) {
    if (!(key$2 in res)) {
      res[key$2] = proxyNormalSlot(normalSlots, key$2);
    }
  }
  // avoriaz seems to mock a non-extensible $scopedSlots object
  // and when that is passed down this would cause an error
  if (slots && Object.isExtensible(slots)) {
    (slots)._normalized = res;
  }
  def(res, '$stable', isStable);
  def(res, '$key', key);
  def(res, '$hasNormal', hasNormalSlots);
  return res
}

function normalizeScopedSlot(normalSlots, key, fn) {
  var normalized = function () {
    var res = arguments.length ? fn.apply(null, arguments) : fn({});
    res = res && typeof res === 'object' && !Array.isArray(res)
      ? [res] // single vnode
      : normalizeChildren(res);
    return res && (
      res.length === 0 ||
      (res.length === 1 && res[0].isComment) // #9658
    ) ? undefined
      : res
  };
  // this is a slot using the new v-slot syntax without scope. although it is
  // compiled as a scoped slot, render fn users would expect it to be present
  // on this.$slots because the usage is semantically a normal slot.
  if (fn.proxy) {
    Object.defineProperty(normalSlots, key, {
      get: normalized,
      enumerable: true,
      configurable: true
    });
  }
  return normalized
}

function proxyNormalSlot(slots, key) {
  return function () { return slots[key]; }
}

/*  */

/**
 * Runtime helper for rendering v-for lists.
 */
function renderList (
  val,
  render
) {
  var ret, i, l, keys, key;
  if (Array.isArray(val) || typeof val === 'string') {
    ret = new Array(val.length);
    for (i = 0, l = val.length; i < l; i++) {
      ret[i] = render(val[i], i, i, i); // fixed by xxxxxx
    }
  } else if (typeof val === 'number') {
    ret = new Array(val);
    for (i = 0; i < val; i++) {
      ret[i] = render(i + 1, i, i, i); // fixed by xxxxxx
    }
  } else if (isObject(val)) {
    if (hasSymbol && val[Symbol.iterator]) {
      ret = [];
      var iterator = val[Symbol.iterator]();
      var result = iterator.next();
      while (!result.done) {
        ret.push(render(result.value, ret.length, i, i++)); // fixed by xxxxxx
        result = iterator.next();
      }
    } else {
      keys = Object.keys(val);
      ret = new Array(keys.length);
      for (i = 0, l = keys.length; i < l; i++) {
        key = keys[i];
        ret[i] = render(val[key], key, i, i); // fixed by xxxxxx
      }
    }
  }
  if (!isDef(ret)) {
    ret = [];
  }
  (ret)._isVList = true;
  return ret
}

/*  */

/**
 * Runtime helper for rendering <slot>
 */
function renderSlot (
  name,
  fallback,
  props,
  bindObject
) {
  var scopedSlotFn = this.$scopedSlots[name];
  var nodes;
  if (scopedSlotFn) { // scoped slot
    props = props || {};
    if (bindObject) {
      if ( true && !isObject(bindObject)) {
        warn(
          'slot v-bind without argument expects an Object',
          this
        );
      }
      props = extend(extend({}, bindObject), props);
    }
    // fixed by xxxxxx app-plus scopedSlot
    nodes = scopedSlotFn(props, this, props._i) || fallback;
  } else {
    nodes = this.$slots[name] || fallback;
  }

  var target = props && props.slot;
  if (target) {
    return this.$createElement('template', { slot: target }, nodes)
  } else {
    return nodes
  }
}

/*  */

/**
 * Runtime helper for resolving filters
 */
function resolveFilter (id) {
  return resolveAsset(this.$options, 'filters', id, true) || identity
}

/*  */

function isKeyNotMatch (expect, actual) {
  if (Array.isArray(expect)) {
    return expect.indexOf(actual) === -1
  } else {
    return expect !== actual
  }
}

/**
 * Runtime helper for checking keyCodes from config.
 * exposed as Vue.prototype._k
 * passing in eventKeyName as last argument separately for backwards compat
 */
function checkKeyCodes (
  eventKeyCode,
  key,
  builtInKeyCode,
  eventKeyName,
  builtInKeyName
) {
  var mappedKeyCode = config.keyCodes[key] || builtInKeyCode;
  if (builtInKeyName && eventKeyName && !config.keyCodes[key]) {
    return isKeyNotMatch(builtInKeyName, eventKeyName)
  } else if (mappedKeyCode) {
    return isKeyNotMatch(mappedKeyCode, eventKeyCode)
  } else if (eventKeyName) {
    return hyphenate(eventKeyName) !== key
  }
}

/*  */

/**
 * Runtime helper for merging v-bind="object" into a VNode's data.
 */
function bindObjectProps (
  data,
  tag,
  value,
  asProp,
  isSync
) {
  if (value) {
    if (!isObject(value)) {
       true && warn(
        'v-bind without argument expects an Object or Array value',
        this
      );
    } else {
      if (Array.isArray(value)) {
        value = toObject(value);
      }
      var hash;
      var loop = function ( key ) {
        if (
          key === 'class' ||
          key === 'style' ||
          isReservedAttribute(key)
        ) {
          hash = data;
        } else {
          var type = data.attrs && data.attrs.type;
          hash = asProp || config.mustUseProp(tag, type, key)
            ? data.domProps || (data.domProps = {})
            : data.attrs || (data.attrs = {});
        }
        var camelizedKey = camelize(key);
        var hyphenatedKey = hyphenate(key);
        if (!(camelizedKey in hash) && !(hyphenatedKey in hash)) {
          hash[key] = value[key];

          if (isSync) {
            var on = data.on || (data.on = {});
            on[("update:" + key)] = function ($event) {
              value[key] = $event;
            };
          }
        }
      };

      for (var key in value) loop( key );
    }
  }
  return data
}

/*  */

/**
 * Runtime helper for rendering static trees.
 */
function renderStatic (
  index,
  isInFor
) {
  var cached = this._staticTrees || (this._staticTrees = []);
  var tree = cached[index];
  // if has already-rendered static tree and not inside v-for,
  // we can reuse the same tree.
  if (tree && !isInFor) {
    return tree
  }
  // otherwise, render a fresh tree.
  tree = cached[index] = this.$options.staticRenderFns[index].call(
    this._renderProxy,
    null,
    this // for render fns generated for functional component templates
  );
  markStatic(tree, ("__static__" + index), false);
  return tree
}

/**
 * Runtime helper for v-once.
 * Effectively it means marking the node as static with a unique key.
 */
function markOnce (
  tree,
  index,
  key
) {
  markStatic(tree, ("__once__" + index + (key ? ("_" + key) : "")), true);
  return tree
}

function markStatic (
  tree,
  key,
  isOnce
) {
  if (Array.isArray(tree)) {
    for (var i = 0; i < tree.length; i++) {
      if (tree[i] && typeof tree[i] !== 'string') {
        markStaticNode(tree[i], (key + "_" + i), isOnce);
      }
    }
  } else {
    markStaticNode(tree, key, isOnce);
  }
}

function markStaticNode (node, key, isOnce) {
  node.isStatic = true;
  node.key = key;
  node.isOnce = isOnce;
}

/*  */

function bindObjectListeners (data, value) {
  if (value) {
    if (!isPlainObject(value)) {
       true && warn(
        'v-on without argument expects an Object value',
        this
      );
    } else {
      var on = data.on = data.on ? extend({}, data.on) : {};
      for (var key in value) {
        var existing = on[key];
        var ours = value[key];
        on[key] = existing ? [].concat(existing, ours) : ours;
      }
    }
  }
  return data
}

/*  */

function resolveScopedSlots (
  fns, // see flow/vnode
  res,
  // the following are added in 2.6
  hasDynamicKeys,
  contentHashKey
) {
  res = res || { $stable: !hasDynamicKeys };
  for (var i = 0; i < fns.length; i++) {
    var slot = fns[i];
    if (Array.isArray(slot)) {
      resolveScopedSlots(slot, res, hasDynamicKeys);
    } else if (slot) {
      // marker for reverse proxying v-slot without scope on this.$slots
      if (slot.proxy) {
        slot.fn.proxy = true;
      }
      res[slot.key] = slot.fn;
    }
  }
  if (contentHashKey) {
    (res).$key = contentHashKey;
  }
  return res
}

/*  */

function bindDynamicKeys (baseObj, values) {
  for (var i = 0; i < values.length; i += 2) {
    var key = values[i];
    if (typeof key === 'string' && key) {
      baseObj[values[i]] = values[i + 1];
    } else if ( true && key !== '' && key !== null) {
      // null is a special value for explicitly removing a binding
      warn(
        ("Invalid value for dynamic directive argument (expected string or null): " + key),
        this
      );
    }
  }
  return baseObj
}

// helper to dynamically append modifier runtime markers to event names.
// ensure only append when value is already string, otherwise it will be cast
// to string and cause the type check to miss.
function prependModifier (value, symbol) {
  return typeof value === 'string' ? symbol + value : value
}

/*  */

function installRenderHelpers (target) {
  target._o = markOnce;
  target._n = toNumber;
  target._s = toString;
  target._l = renderList;
  target._t = renderSlot;
  target._q = looseEqual;
  target._i = looseIndexOf;
  target._m = renderStatic;
  target._f = resolveFilter;
  target._k = checkKeyCodes;
  target._b = bindObjectProps;
  target._v = createTextVNode;
  target._e = createEmptyVNode;
  target._u = resolveScopedSlots;
  target._g = bindObjectListeners;
  target._d = bindDynamicKeys;
  target._p = prependModifier;
}

/*  */

function FunctionalRenderContext (
  data,
  props,
  children,
  parent,
  Ctor
) {
  var this$1 = this;

  var options = Ctor.options;
  // ensure the createElement function in functional components
  // gets a unique context - this is necessary for correct named slot check
  var contextVm;
  if (hasOwn(parent, '_uid')) {
    contextVm = Object.create(parent);
    // $flow-disable-line
    contextVm._original = parent;
  } else {
    // the context vm passed in is a functional context as well.
    // in this case we want to make sure we are able to get a hold to the
    // real context instance.
    contextVm = parent;
    // $flow-disable-line
    parent = parent._original;
  }
  var isCompiled = isTrue(options._compiled);
  var needNormalization = !isCompiled;

  this.data = data;
  this.props = props;
  this.children = children;
  this.parent = parent;
  this.listeners = data.on || emptyObject;
  this.injections = resolveInject(options.inject, parent);
  this.slots = function () {
    if (!this$1.$slots) {
      normalizeScopedSlots(
        data.scopedSlots,
        this$1.$slots = resolveSlots(children, parent)
      );
    }
    return this$1.$slots
  };

  Object.defineProperty(this, 'scopedSlots', ({
    enumerable: true,
    get: function get () {
      return normalizeScopedSlots(data.scopedSlots, this.slots())
    }
  }));

  // support for compiled functional template
  if (isCompiled) {
    // exposing $options for renderStatic()
    this.$options = options;
    // pre-resolve slots for renderSlot()
    this.$slots = this.slots();
    this.$scopedSlots = normalizeScopedSlots(data.scopedSlots, this.$slots);
  }

  if (options._scopeId) {
    this._c = function (a, b, c, d) {
      var vnode = createElement(contextVm, a, b, c, d, needNormalization);
      if (vnode && !Array.isArray(vnode)) {
        vnode.fnScopeId = options._scopeId;
        vnode.fnContext = parent;
      }
      return vnode
    };
  } else {
    this._c = function (a, b, c, d) { return createElement(contextVm, a, b, c, d, needNormalization); };
  }
}

installRenderHelpers(FunctionalRenderContext.prototype);

function createFunctionalComponent (
  Ctor,
  propsData,
  data,
  contextVm,
  children
) {
  var options = Ctor.options;
  var props = {};
  var propOptions = options.props;
  if (isDef(propOptions)) {
    for (var key in propOptions) {
      props[key] = validateProp(key, propOptions, propsData || emptyObject);
    }
  } else {
    if (isDef(data.attrs)) { mergeProps(props, data.attrs); }
    if (isDef(data.props)) { mergeProps(props, data.props); }
  }

  var renderContext = new FunctionalRenderContext(
    data,
    props,
    children,
    contextVm,
    Ctor
  );

  var vnode = options.render.call(null, renderContext._c, renderContext);

  if (vnode instanceof VNode) {
    return cloneAndMarkFunctionalResult(vnode, data, renderContext.parent, options, renderContext)
  } else if (Array.isArray(vnode)) {
    var vnodes = normalizeChildren(vnode) || [];
    var res = new Array(vnodes.length);
    for (var i = 0; i < vnodes.length; i++) {
      res[i] = cloneAndMarkFunctionalResult(vnodes[i], data, renderContext.parent, options, renderContext);
    }
    return res
  }
}

function cloneAndMarkFunctionalResult (vnode, data, contextVm, options, renderContext) {
  // #7817 clone node before setting fnContext, otherwise if the node is reused
  // (e.g. it was from a cached normal slot) the fnContext causes named slots
  // that should not be matched to match.
  var clone = cloneVNode(vnode);
  clone.fnContext = contextVm;
  clone.fnOptions = options;
  if (true) {
    (clone.devtoolsMeta = clone.devtoolsMeta || {}).renderContext = renderContext;
  }
  if (data.slot) {
    (clone.data || (clone.data = {})).slot = data.slot;
  }
  return clone
}

function mergeProps (to, from) {
  for (var key in from) {
    to[camelize(key)] = from[key];
  }
}

/*  */

/*  */

/*  */

/*  */

// inline hooks to be invoked on component VNodes during patch
var componentVNodeHooks = {
  init: function init (vnode, hydrating) {
    if (
      vnode.componentInstance &&
      !vnode.componentInstance._isDestroyed &&
      vnode.data.keepAlive
    ) {
      // kept-alive components, treat as a patch
      var mountedNode = vnode; // work around flow
      componentVNodeHooks.prepatch(mountedNode, mountedNode);
    } else {
      var child = vnode.componentInstance = createComponentInstanceForVnode(
        vnode,
        activeInstance
      );
      child.$mount(hydrating ? vnode.elm : undefined, hydrating);
    }
  },

  prepatch: function prepatch (oldVnode, vnode) {
    var options = vnode.componentOptions;
    var child = vnode.componentInstance = oldVnode.componentInstance;
    updateChildComponent(
      child,
      options.propsData, // updated props
      options.listeners, // updated listeners
      vnode, // new parent vnode
      options.children // new children
    );
  },

  insert: function insert (vnode) {
    var context = vnode.context;
    var componentInstance = vnode.componentInstance;
    if (!componentInstance._isMounted) {
      callHook(componentInstance, 'onServiceCreated');
      callHook(componentInstance, 'onServiceAttached');
      componentInstance._isMounted = true;
      callHook(componentInstance, 'mounted');
    }
    if (vnode.data.keepAlive) {
      if (context._isMounted) {
        // vue-router#1212
        // During updates, a kept-alive component's child components may
        // change, so directly walking the tree here may call activated hooks
        // on incorrect children. Instead we push them into a queue which will
        // be processed after the whole patch process ended.
        queueActivatedComponent(componentInstance);
      } else {
        activateChildComponent(componentInstance, true /* direct */);
      }
    }
  },

  destroy: function destroy (vnode) {
    var componentInstance = vnode.componentInstance;
    if (!componentInstance._isDestroyed) {
      if (!vnode.data.keepAlive) {
        componentInstance.$destroy();
      } else {
        deactivateChildComponent(componentInstance, true /* direct */);
      }
    }
  }
};

var hooksToMerge = Object.keys(componentVNodeHooks);

function createComponent (
  Ctor,
  data,
  context,
  children,
  tag
) {
  if (isUndef(Ctor)) {
    return
  }

  var baseCtor = context.$options._base;

  // plain options object: turn it into a constructor
  if (isObject(Ctor)) {
    Ctor = baseCtor.extend(Ctor);
  }

  // if at this stage it's not a constructor or an async component factory,
  // reject.
  if (typeof Ctor !== 'function') {
    if (true) {
      warn(("Invalid Component definition: " + (String(Ctor))), context);
    }
    return
  }

  // async component
  var asyncFactory;
  if (isUndef(Ctor.cid)) {
    asyncFactory = Ctor;
    Ctor = resolveAsyncComponent(asyncFactory, baseCtor);
    if (Ctor === undefined) {
      // return a placeholder node for async component, which is rendered
      // as a comment node but preserves all the raw information for the node.
      // the information will be used for async server-rendering and hydration.
      return createAsyncPlaceholder(
        asyncFactory,
        data,
        context,
        children,
        tag
      )
    }
  }

  data = data || {};

  // resolve constructor options in case global mixins are applied after
  // component constructor creation
  resolveConstructorOptions(Ctor);

  // transform component v-model data into props & events
  if (isDef(data.model)) {
    transformModel(Ctor.options, data);
  }

  // extract props
  var propsData = extractPropsFromVNodeData(data, Ctor, tag, context); // fixed by xxxxxx

  // functional component
  if (isTrue(Ctor.options.functional)) {
    return createFunctionalComponent(Ctor, propsData, data, context, children)
  }

  // extract listeners, since these needs to be treated as
  // child component listeners instead of DOM listeners
  var listeners = data.on;
  // replace with listeners with .native modifier
  // so it gets processed during parent component patch.
  data.on = data.nativeOn;

  if (isTrue(Ctor.options.abstract)) {
    // abstract components do not keep anything
    // other than props & listeners & slot

    // work around flow
    var slot = data.slot;
    data = {};
    if (slot) {
      data.slot = slot;
    }
  }

  // install component management hooks onto the placeholder node
  installComponentHooks(data);

  // return a placeholder vnode
  var name = Ctor.options.name || tag;
  var vnode = new VNode(
    ("vue-component-" + (Ctor.cid) + (name ? ("-" + name) : '')),
    data, undefined, undefined, undefined, context,
    { Ctor: Ctor, propsData: propsData, listeners: listeners, tag: tag, children: children },
    asyncFactory
  );

  return vnode
}

function createComponentInstanceForVnode (
  vnode, // we know it's MountedComponentVNode but flow doesn't
  parent // activeInstance in lifecycle state
) {
  var options = {
    _isComponent: true,
    _parentVnode: vnode,
    parent: parent
  };
  // check inline-template render functions
  var inlineTemplate = vnode.data.inlineTemplate;
  if (isDef(inlineTemplate)) {
    options.render = inlineTemplate.render;
    options.staticRenderFns = inlineTemplate.staticRenderFns;
  }
  return new vnode.componentOptions.Ctor(options)
}

function installComponentHooks (data) {
  var hooks = data.hook || (data.hook = {});
  for (var i = 0; i < hooksToMerge.length; i++) {
    var key = hooksToMerge[i];
    var existing = hooks[key];
    var toMerge = componentVNodeHooks[key];
    if (existing !== toMerge && !(existing && existing._merged)) {
      hooks[key] = existing ? mergeHook$1(toMerge, existing) : toMerge;
    }
  }
}

function mergeHook$1 (f1, f2) {
  var merged = function (a, b) {
    // flow complains about extra args which is why we use any
    f1(a, b);
    f2(a, b);
  };
  merged._merged = true;
  return merged
}

// transform component v-model info (value and callback) into
// prop and event handler respectively.
function transformModel (options, data) {
  var prop = (options.model && options.model.prop) || 'value';
  var event = (options.model && options.model.event) || 'input'
  ;(data.attrs || (data.attrs = {}))[prop] = data.model.value;
  var on = data.on || (data.on = {});
  var existing = on[event];
  var callback = data.model.callback;
  if (isDef(existing)) {
    if (
      Array.isArray(existing)
        ? existing.indexOf(callback) === -1
        : existing !== callback
    ) {
      on[event] = [callback].concat(existing);
    }
  } else {
    on[event] = callback;
  }
}

/*  */

var SIMPLE_NORMALIZE = 1;
var ALWAYS_NORMALIZE = 2;

// wrapper function for providing a more flexible interface
// without getting yelled at by flow
function createElement (
  context,
  tag,
  data,
  children,
  normalizationType,
  alwaysNormalize
) {
  if (Array.isArray(data) || isPrimitive(data)) {
    normalizationType = children;
    children = data;
    data = undefined;
  }
  if (isTrue(alwaysNormalize)) {
    normalizationType = ALWAYS_NORMALIZE;
  }
  return _createElement(context, tag, data, children, normalizationType)
}

function _createElement (
  context,
  tag,
  data,
  children,
  normalizationType
) {
  if (isDef(data) && isDef((data).__ob__)) {
     true && warn(
      "Avoid using observed data object as vnode data: " + (JSON.stringify(data)) + "\n" +
      'Always create fresh vnode data objects in each render!',
      context
    );
    return createEmptyVNode()
  }
  // object syntax in v-bind
  if (isDef(data) && isDef(data.is)) {
    tag = data.is;
  }
  if (!tag) {
    // in case of component :is set to falsy value
    return createEmptyVNode()
  }
  // warn against non-primitive key
  if ( true &&
    isDef(data) && isDef(data.key) && !isPrimitive(data.key)
  ) {
    {
      warn(
        'Avoid using non-primitive value as key, ' +
        'use string/number value instead.',
        context
      );
    }
  }
  // support single function children as default scoped slot
  if (Array.isArray(children) &&
    typeof children[0] === 'function'
  ) {
    data = data || {};
    data.scopedSlots = { default: children[0] };
    children.length = 0;
  }
  if (normalizationType === ALWAYS_NORMALIZE) {
    children = normalizeChildren(children);
  } else if (normalizationType === SIMPLE_NORMALIZE) {
    children = simpleNormalizeChildren(children);
  }
  var vnode, ns;
  if (typeof tag === 'string') {
    var Ctor;
    ns = (context.$vnode && context.$vnode.ns) || config.getTagNamespace(tag);
    if (config.isReservedTag(tag)) {
      // platform built-in elements
      if ( true && isDef(data) && isDef(data.nativeOn)) {
        warn(
          ("The .native modifier for v-on is only valid on components but it was used on <" + tag + ">."),
          context
        );
      }
      vnode = new VNode(
        config.parsePlatformTagName(tag), data, children,
        undefined, undefined, context
      );
    } else if ((!data || !data.pre) && isDef(Ctor = resolveAsset(context.$options, 'components', tag))) {
      // component
      vnode = createComponent(Ctor, data, context, children, tag);
    } else {
      // unknown or unlisted namespaced elements
      // check at runtime because it may get assigned a namespace when its
      // parent normalizes children
      vnode = new VNode(
        tag, data, children,
        undefined, undefined, context
      );
    }
  } else {
    // direct component options / constructor
    vnode = createComponent(tag, data, context, children);
  }
  if (Array.isArray(vnode)) {
    return vnode
  } else if (isDef(vnode)) {
    if (isDef(ns)) { applyNS(vnode, ns); }
    if (isDef(data)) { registerDeepBindings(data); }
    return vnode
  } else {
    return createEmptyVNode()
  }
}

function applyNS (vnode, ns, force) {
  vnode.ns = ns;
  if (vnode.tag === 'foreignObject') {
    // use default namespace inside foreignObject
    ns = undefined;
    force = true;
  }
  if (isDef(vnode.children)) {
    for (var i = 0, l = vnode.children.length; i < l; i++) {
      var child = vnode.children[i];
      if (isDef(child.tag) && (
        isUndef(child.ns) || (isTrue(force) && child.tag !== 'svg'))) {
        applyNS(child, ns, force);
      }
    }
  }
}

// ref #5318
// necessary to ensure parent re-render when deep bindings like :style and
// :class are used on slot nodes
function registerDeepBindings (data) {
  if (isObject(data.style)) {
    traverse(data.style);
  }
  if (isObject(data.class)) {
    traverse(data.class);
  }
}

/*  */

function initRender (vm) {
  vm._vnode = null; // the root of the child tree
  vm._staticTrees = null; // v-once cached trees
  var options = vm.$options;
  var parentVnode = vm.$vnode = options._parentVnode; // the placeholder node in parent tree
  var renderContext = parentVnode && parentVnode.context;
  vm.$slots = resolveSlots(options._renderChildren, renderContext);
  vm.$scopedSlots = emptyObject;
  // bind the createElement fn to this instance
  // so that we get proper render context inside it.
  // args order: tag, data, children, normalizationType, alwaysNormalize
  // internal version is used by render functions compiled from templates
  vm._c = function (a, b, c, d) { return createElement(vm, a, b, c, d, false); };
  // normalization is always applied for the public version, used in
  // user-written render functions.
  vm.$createElement = function (a, b, c, d) { return createElement(vm, a, b, c, d, true); };

  // $attrs & $listeners are exposed for easier HOC creation.
  // they need to be reactive so that HOCs using them are always updated
  var parentData = parentVnode && parentVnode.data;

  /* istanbul ignore else */
  if (true) {
    defineReactive$$1(vm, '$attrs', parentData && parentData.attrs || emptyObject, function () {
      !isUpdatingChildComponent && warn("$attrs is readonly.", vm);
    }, true);
    defineReactive$$1(vm, '$listeners', options._parentListeners || emptyObject, function () {
      !isUpdatingChildComponent && warn("$listeners is readonly.", vm);
    }, true);
  } else {}
}

var currentRenderingInstance = null;

function renderMixin (Vue) {
  // install runtime convenience helpers
  installRenderHelpers(Vue.prototype);

  Vue.prototype.$nextTick = function (fn) {
    return nextTick(fn, this)
  };

  Vue.prototype._render = function () {
    var vm = this;
    var ref = vm.$options;
    var render = ref.render;
    var _parentVnode = ref._parentVnode;

    if (_parentVnode) {
      vm.$scopedSlots = normalizeScopedSlots(
        _parentVnode.data.scopedSlots,
        vm.$slots,
        vm.$scopedSlots
      );
    }

    // set parent vnode. this allows render functions to have access
    // to the data on the placeholder node.
    vm.$vnode = _parentVnode;
    // render self
    var vnode;
    try {
      // There's no need to maintain a stack because all render fns are called
      // separately from one another. Nested component's render fns are called
      // when parent component is patched.
      currentRenderingInstance = vm;
      vnode = render.call(vm._renderProxy, vm.$createElement);
    } catch (e) {
      handleError(e, vm, "render");
      // return error render result,
      // or previous vnode to prevent render error causing blank component
      /* istanbul ignore else */
      if ( true && vm.$options.renderError) {
        try {
          vnode = vm.$options.renderError.call(vm._renderProxy, vm.$createElement, e);
        } catch (e) {
          handleError(e, vm, "renderError");
          vnode = vm._vnode;
        }
      } else {
        vnode = vm._vnode;
      }
    } finally {
      currentRenderingInstance = null;
    }
    // if the returned array contains only a single node, allow it
    if (Array.isArray(vnode) && vnode.length === 1) {
      vnode = vnode[0];
    }
    // return empty vnode in case the render function errored out
    if (!(vnode instanceof VNode)) {
      if ( true && Array.isArray(vnode)) {
        warn(
          'Multiple root nodes returned from render function. Render function ' +
          'should return a single root node.',
          vm
        );
      }
      vnode = createEmptyVNode();
    }
    // set parent
    vnode.parent = _parentVnode;
    return vnode
  };
}

/*  */

function ensureCtor (comp, base) {
  if (
    comp.__esModule ||
    (hasSymbol && comp[Symbol.toStringTag] === 'Module')
  ) {
    comp = comp.default;
  }
  return isObject(comp)
    ? base.extend(comp)
    : comp
}

function createAsyncPlaceholder (
  factory,
  data,
  context,
  children,
  tag
) {
  var node = createEmptyVNode();
  node.asyncFactory = factory;
  node.asyncMeta = { data: data, context: context, children: children, tag: tag };
  return node
}

function resolveAsyncComponent (
  factory,
  baseCtor
) {
  if (isTrue(factory.error) && isDef(factory.errorComp)) {
    return factory.errorComp
  }

  if (isDef(factory.resolved)) {
    return factory.resolved
  }

  var owner = currentRenderingInstance;
  if (owner && isDef(factory.owners) && factory.owners.indexOf(owner) === -1) {
    // already pending
    factory.owners.push(owner);
  }

  if (isTrue(factory.loading) && isDef(factory.loadingComp)) {
    return factory.loadingComp
  }

  if (owner && !isDef(factory.owners)) {
    var owners = factory.owners = [owner];
    var sync = true;
    var timerLoading = null;
    var timerTimeout = null

    ;(owner).$on('hook:destroyed', function () { return remove(owners, owner); });

    var forceRender = function (renderCompleted) {
      for (var i = 0, l = owners.length; i < l; i++) {
        (owners[i]).$forceUpdate();
      }

      if (renderCompleted) {
        owners.length = 0;
        if (timerLoading !== null) {
          clearTimeout(timerLoading);
          timerLoading = null;
        }
        if (timerTimeout !== null) {
          clearTimeout(timerTimeout);
          timerTimeout = null;
        }
      }
    };

    var resolve = once(function (res) {
      // cache resolved
      factory.resolved = ensureCtor(res, baseCtor);
      // invoke callbacks only if this is not a synchronous resolve
      // (async resolves are shimmed as synchronous during SSR)
      if (!sync) {
        forceRender(true);
      } else {
        owners.length = 0;
      }
    });

    var reject = once(function (reason) {
       true && warn(
        "Failed to resolve async component: " + (String(factory)) +
        (reason ? ("\nReason: " + reason) : '')
      );
      if (isDef(factory.errorComp)) {
        factory.error = true;
        forceRender(true);
      }
    });

    var res = factory(resolve, reject);

    if (isObject(res)) {
      if (isPromise(res)) {
        // () => Promise
        if (isUndef(factory.resolved)) {
          res.then(resolve, reject);
        }
      } else if (isPromise(res.component)) {
        res.component.then(resolve, reject);

        if (isDef(res.error)) {
          factory.errorComp = ensureCtor(res.error, baseCtor);
        }

        if (isDef(res.loading)) {
          factory.loadingComp = ensureCtor(res.loading, baseCtor);
          if (res.delay === 0) {
            factory.loading = true;
          } else {
            timerLoading = setTimeout(function () {
              timerLoading = null;
              if (isUndef(factory.resolved) && isUndef(factory.error)) {
                factory.loading = true;
                forceRender(false);
              }
            }, res.delay || 200);
          }
        }

        if (isDef(res.timeout)) {
          timerTimeout = setTimeout(function () {
            timerTimeout = null;
            if (isUndef(factory.resolved)) {
              reject(
                 true
                  ? ("timeout (" + (res.timeout) + "ms)")
                  : undefined
              );
            }
          }, res.timeout);
        }
      }
    }

    sync = false;
    // return in case resolved synchronously
    return factory.loading
      ? factory.loadingComp
      : factory.resolved
  }
}

/*  */

function isAsyncPlaceholder (node) {
  return node.isComment && node.asyncFactory
}

/*  */

function getFirstComponentChild (children) {
  if (Array.isArray(children)) {
    for (var i = 0; i < children.length; i++) {
      var c = children[i];
      if (isDef(c) && (isDef(c.componentOptions) || isAsyncPlaceholder(c))) {
        return c
      }
    }
  }
}

/*  */

/*  */

function initEvents (vm) {
  vm._events = Object.create(null);
  vm._hasHookEvent = false;
  // init parent attached events
  var listeners = vm.$options._parentListeners;
  if (listeners) {
    updateComponentListeners(vm, listeners);
  }
}

var target;

function add (event, fn) {
  target.$on(event, fn);
}

function remove$1 (event, fn) {
  target.$off(event, fn);
}

function createOnceHandler (event, fn) {
  var _target = target;
  return function onceHandler () {
    var res = fn.apply(null, arguments);
    if (res !== null) {
      _target.$off(event, onceHandler);
    }
  }
}

function updateComponentListeners (
  vm,
  listeners,
  oldListeners
) {
  target = vm;
  updateListeners(listeners, oldListeners || {}, add, remove$1, createOnceHandler, vm);
  target = undefined;
}

function eventsMixin (Vue) {
  var hookRE = /^hook:/;
  Vue.prototype.$on = function (event, fn) {
    var vm = this;
    if (Array.isArray(event)) {
      for (var i = 0, l = event.length; i < l; i++) {
        vm.$on(event[i], fn);
      }
    } else {
      (vm._events[event] || (vm._events[event] = [])).push(fn);
      // optimize hook:event cost by using a boolean flag marked at registration
      // instead of a hash lookup
      if (hookRE.test(event)) {
        vm._hasHookEvent = true;
      }
    }
    return vm
  };

  Vue.prototype.$once = function (event, fn) {
    var vm = this;
    function on () {
      vm.$off(event, on);
      fn.apply(vm, arguments);
    }
    on.fn = fn;
    vm.$on(event, on);
    return vm
  };

  Vue.prototype.$off = function (event, fn) {
    var vm = this;
    // all
    if (!arguments.length) {
      vm._events = Object.create(null);
      return vm
    }
    // array of events
    if (Array.isArray(event)) {
      for (var i$1 = 0, l = event.length; i$1 < l; i$1++) {
        vm.$off(event[i$1], fn);
      }
      return vm
    }
    // specific event
    var cbs = vm._events[event];
    if (!cbs) {
      return vm
    }
    if (!fn) {
      vm._events[event] = null;
      return vm
    }
    // specific handler
    var cb;
    var i = cbs.length;
    while (i--) {
      cb = cbs[i];
      if (cb === fn || cb.fn === fn) {
        cbs.splice(i, 1);
        break
      }
    }
    return vm
  };

  Vue.prototype.$emit = function (event) {
    var vm = this;
    if (true) {
      var lowerCaseEvent = event.toLowerCase();
      if (lowerCaseEvent !== event && vm._events[lowerCaseEvent]) {
        tip(
          "Event \"" + lowerCaseEvent + "\" is emitted in component " +
          (formatComponentName(vm)) + " but the handler is registered for \"" + event + "\". " +
          "Note that HTML attributes are case-insensitive and you cannot use " +
          "v-on to listen to camelCase events when using in-DOM templates. " +
          "You should probably use \"" + (hyphenate(event)) + "\" instead of \"" + event + "\"."
        );
      }
    }
    var cbs = vm._events[event];
    if (cbs) {
      cbs = cbs.length > 1 ? toArray(cbs) : cbs;
      var args = toArray(arguments, 1);
      var info = "event handler for \"" + event + "\"";
      for (var i = 0, l = cbs.length; i < l; i++) {
        invokeWithErrorHandling(cbs[i], vm, args, vm, info);
      }
    }
    return vm
  };
}

/*  */

var activeInstance = null;
var isUpdatingChildComponent = false;

function setActiveInstance(vm) {
  var prevActiveInstance = activeInstance;
  activeInstance = vm;
  return function () {
    activeInstance = prevActiveInstance;
  }
}

function initLifecycle (vm) {
  var options = vm.$options;

  // locate first non-abstract parent
  var parent = options.parent;
  if (parent && !options.abstract) {
    while (parent.$options.abstract && parent.$parent) {
      parent = parent.$parent;
    }
    parent.$children.push(vm);
  }

  vm.$parent = parent;
  vm.$root = parent ? parent.$root : vm;

  vm.$children = [];
  vm.$refs = {};

  vm._watcher = null;
  vm._inactive = null;
  vm._directInactive = false;
  vm._isMounted = false;
  vm._isDestroyed = false;
  vm._isBeingDestroyed = false;
}

function lifecycleMixin (Vue) {
  Vue.prototype._update = function (vnode, hydrating) {
    var vm = this;
    var prevEl = vm.$el;
    var prevVnode = vm._vnode;
    var restoreActiveInstance = setActiveInstance(vm);
    vm._vnode = vnode;
    // Vue.prototype.__patch__ is injected in entry points
    // based on the rendering backend used.
    if (!prevVnode) {
      // initial render
      vm.$el = vm.__patch__(vm.$el, vnode, hydrating, false /* removeOnly */);
    } else {
      // updates
      vm.$el = vm.__patch__(prevVnode, vnode);
    }
    restoreActiveInstance();
    // update __vue__ reference
    if (prevEl) {
      prevEl.__vue__ = null;
    }
    if (vm.$el) {
      vm.$el.__vue__ = vm;
    }
    // if parent is an HOC, update its $el as well
    if (vm.$vnode && vm.$parent && vm.$vnode === vm.$parent._vnode) {
      vm.$parent.$el = vm.$el;
    }
    // updated hook is called by the scheduler to ensure that children are
    // updated in a parent's updated hook.
  };

  Vue.prototype.$forceUpdate = function () {
    var vm = this;
    if (vm._watcher) {
      vm._watcher.update();
    }
  };

  Vue.prototype.$destroy = function () {
    var vm = this;
    if (vm._isBeingDestroyed) {
      return
    }
    callHook(vm, 'beforeDestroy');
    vm._isBeingDestroyed = true;
    // remove self from parent
    var parent = vm.$parent;
    if (parent && !parent._isBeingDestroyed && !vm.$options.abstract) {
      remove(parent.$children, vm);
    }
    // teardown watchers
    if (vm._watcher) {
      vm._watcher.teardown();
    }
    var i = vm._watchers.length;
    while (i--) {
      vm._watchers[i].teardown();
    }
    // remove reference from data ob
    // frozen object may not have observer.
    if (vm._data.__ob__) {
      vm._data.__ob__.vmCount--;
    }
    // call the last hook...
    vm._isDestroyed = true;
    // invoke destroy hooks on current rendered tree
    vm.__patch__(vm._vnode, null);
    // fire destroyed hook
    callHook(vm, 'destroyed');
    // turn off all instance listeners.
    vm.$off();
    // remove __vue__ reference
    if (vm.$el) {
      vm.$el.__vue__ = null;
    }
    // release circular reference (#6759)
    if (vm.$vnode) {
      vm.$vnode.parent = null;
    }
  };
}

function updateChildComponent (
  vm,
  propsData,
  listeners,
  parentVnode,
  renderChildren
) {
  if (true) {
    isUpdatingChildComponent = true;
  }

  // determine whether component has slot children
  // we need to do this before overwriting $options._renderChildren.

  // check if there are dynamic scopedSlots (hand-written or compiled but with
  // dynamic slot names). Static scoped slots compiled from template has the
  // "$stable" marker.
  var newScopedSlots = parentVnode.data.scopedSlots;
  var oldScopedSlots = vm.$scopedSlots;
  var hasDynamicScopedSlot = !!(
    (newScopedSlots && !newScopedSlots.$stable) ||
    (oldScopedSlots !== emptyObject && !oldScopedSlots.$stable) ||
    (newScopedSlots && vm.$scopedSlots.$key !== newScopedSlots.$key)
  );

  // Any static slot children from the parent may have changed during parent's
  // update. Dynamic scoped slots may also have changed. In such cases, a forced
  // update is necessary to ensure correctness.
  var needsForceUpdate = !!(
    renderChildren ||               // has new static slots
    vm.$options._renderChildren ||  // has old static slots
    hasDynamicScopedSlot
  );

  vm.$options._parentVnode = parentVnode;
  vm.$vnode = parentVnode; // update vm's placeholder node without re-render

  if (vm._vnode) { // update child tree's parent
    vm._vnode.parent = parentVnode;
  }
  vm.$options._renderChildren = renderChildren;

  // update $attrs and $listeners hash
  // these are also reactive so they may trigger child update if the child
  // used them during render
  vm.$attrs = parentVnode.data.attrs || emptyObject;
  vm.$listeners = listeners || emptyObject;

  // update props
  if (propsData && vm.$options.props) {
    toggleObserving(false);
    var props = vm._props;
    var propKeys = vm.$options._propKeys || [];
    for (var i = 0; i < propKeys.length; i++) {
      var key = propKeys[i];
      var propOptions = vm.$options.props; // wtf flow?
      props[key] = validateProp(key, propOptions, propsData, vm);
    }
    toggleObserving(true);
    // keep a copy of raw propsData
    vm.$options.propsData = propsData;
  }

  // fixed by xxxxxx update properties(mp runtime)
  vm._$updateProperties && vm._$updateProperties(vm);

  // update listeners
  listeners = listeners || emptyObject;
  var oldListeners = vm.$options._parentListeners;
  vm.$options._parentListeners = listeners;
  updateComponentListeners(vm, listeners, oldListeners);

  // resolve slots + force update if has children
  if (needsForceUpdate) {
    vm.$slots = resolveSlots(renderChildren, parentVnode.context);
    vm.$forceUpdate();
  }

  if (true) {
    isUpdatingChildComponent = false;
  }
}

function isInInactiveTree (vm) {
  while (vm && (vm = vm.$parent)) {
    if (vm._inactive) { return true }
  }
  return false
}

function activateChildComponent (vm, direct) {
  if (direct) {
    vm._directInactive = false;
    if (isInInactiveTree(vm)) {
      return
    }
  } else if (vm._directInactive) {
    return
  }
  if (vm._inactive || vm._inactive === null) {
    vm._inactive = false;
    for (var i = 0; i < vm.$children.length; i++) {
      activateChildComponent(vm.$children[i]);
    }
    callHook(vm, 'activated');
  }
}

function deactivateChildComponent (vm, direct) {
  if (direct) {
    vm._directInactive = true;
    if (isInInactiveTree(vm)) {
      return
    }
  }
  if (!vm._inactive) {
    vm._inactive = true;
    for (var i = 0; i < vm.$children.length; i++) {
      deactivateChildComponent(vm.$children[i]);
    }
    callHook(vm, 'deactivated');
  }
}

function callHook (vm, hook) {
  // #7573 disable dep collection when invoking lifecycle hooks
  pushTarget();
  var handlers = vm.$options[hook];
  var info = hook + " hook";
  if (handlers) {
    for (var i = 0, j = handlers.length; i < j; i++) {
      invokeWithErrorHandling(handlers[i], vm, null, vm, info);
    }
  }
  if (vm._hasHookEvent) {
    vm.$emit('hook:' + hook);
  }
  popTarget();
}

/*  */

var MAX_UPDATE_COUNT = 100;

var queue = [];
var activatedChildren = [];
var has = {};
var circular = {};
var waiting = false;
var flushing = false;
var index = 0;

/**
 * Reset the scheduler's state.
 */
function resetSchedulerState () {
  index = queue.length = activatedChildren.length = 0;
  has = {};
  if (true) {
    circular = {};
  }
  waiting = flushing = false;
}

// Async edge case #6566 requires saving the timestamp when event listeners are
// attached. However, calling performance.now() has a perf overhead especially
// if the page has thousands of event listeners. Instead, we take a timestamp
// every time the scheduler flushes and use that for all event listeners
// attached during that flush.
var currentFlushTimestamp = 0;

// Async edge case fix requires storing an event listener's attach timestamp.
var getNow = Date.now;

// Determine what event timestamp the browser is using. Annoyingly, the
// timestamp can either be hi-res (relative to page load) or low-res
// (relative to UNIX epoch), so in order to compare time we have to use the
// same timestamp type when saving the flush timestamp.
// All IE versions use low-res event timestamps, and have problematic clock
// implementations (#9632)
if (inBrowser && !isIE) {
  var performance = window.performance;
  if (
    performance &&
    typeof performance.now === 'function' &&
    getNow() > document.createEvent('Event').timeStamp
  ) {
    // if the event timestamp, although evaluated AFTER the Date.now(), is
    // smaller than it, it means the event is using a hi-res timestamp,
    // and we need to use the hi-res version for event listener timestamps as
    // well.
    getNow = function () { return performance.now(); };
  }
}

/**
 * Flush both queues and run the watchers.
 */
function flushSchedulerQueue () {
  currentFlushTimestamp = getNow();
  flushing = true;
  var watcher, id;

  // Sort queue before flush.
  // This ensures that:
  // 1. Components are updated from parent to child. (because parent is always
  //    created before the child)
  // 2. A component's user watchers are run before its render watcher (because
  //    user watchers are created before the render watcher)
  // 3. If a component is destroyed during a parent component's watcher run,
  //    its watchers can be skipped.
  queue.sort(function (a, b) { return a.id - b.id; });

  // do not cache length because more watchers might be pushed
  // as we run existing watchers
  for (index = 0; index < queue.length; index++) {
    watcher = queue[index];
    if (watcher.before) {
      watcher.before();
    }
    id = watcher.id;
    has[id] = null;
    watcher.run();
    // in dev build, check and stop circular updates.
    if ( true && has[id] != null) {
      circular[id] = (circular[id] || 0) + 1;
      if (circular[id] > MAX_UPDATE_COUNT) {
        warn(
          'You may have an infinite update loop ' + (
            watcher.user
              ? ("in watcher with expression \"" + (watcher.expression) + "\"")
              : "in a component render function."
          ),
          watcher.vm
        );
        break
      }
    }
  }

  // keep copies of post queues before resetting state
  var activatedQueue = activatedChildren.slice();
  var updatedQueue = queue.slice();

  resetSchedulerState();

  // call component updated and activated hooks
  callActivatedHooks(activatedQueue);
  callUpdatedHooks(updatedQueue);

  // devtool hook
  /* istanbul ignore if */
  if (devtools && config.devtools) {
    devtools.emit('flush');
  }
}

function callUpdatedHooks (queue) {
  var i = queue.length;
  while (i--) {
    var watcher = queue[i];
    var vm = watcher.vm;
    if (vm._watcher === watcher && vm._isMounted && !vm._isDestroyed) {
      callHook(vm, 'updated');
    }
  }
}

/**
 * Queue a kept-alive component that was activated during patch.
 * The queue will be processed after the entire tree has been patched.
 */
function queueActivatedComponent (vm) {
  // setting _inactive to false here so that a render function can
  // rely on checking whether it's in an inactive tree (e.g. router-view)
  vm._inactive = false;
  activatedChildren.push(vm);
}

function callActivatedHooks (queue) {
  for (var i = 0; i < queue.length; i++) {
    queue[i]._inactive = true;
    activateChildComponent(queue[i], true /* true */);
  }
}

/**
 * Push a watcher into the watcher queue.
 * Jobs with duplicate IDs will be skipped unless it's
 * pushed when the queue is being flushed.
 */
function queueWatcher (watcher) {
  var id = watcher.id;
  if (has[id] == null) {
    has[id] = true;
    if (!flushing) {
      queue.push(watcher);
    } else {
      // if already flushing, splice the watcher based on its id
      // if already past its id, it will be run next immediately.
      var i = queue.length - 1;
      while (i > index && queue[i].id > watcher.id) {
        i--;
      }
      queue.splice(i + 1, 0, watcher);
    }
    // queue the flush
    if (!waiting) {
      waiting = true;

      if ( true && !config.async) {
        flushSchedulerQueue();
        return
      }
      nextTick(flushSchedulerQueue);
    }
  }
}

/*  */



var uid$2 = 0;

/**
 * A watcher parses an expression, collects dependencies,
 * and fires callback when the expression value changes.
 * This is used for both the $watch() api and directives.
 */
var Watcher = function Watcher (
  vm,
  expOrFn,
  cb,
  options,
  isRenderWatcher
) {
  this.vm = vm;
  if (isRenderWatcher) {
    vm._watcher = this;
  }
  vm._watchers.push(this);
  // options
  if (options) {
    this.deep = !!options.deep;
    this.user = !!options.user;
    this.lazy = !!options.lazy;
    this.sync = !!options.sync;
    this.before = options.before;
  } else {
    this.deep = this.user = this.lazy = this.sync = false;
  }
  this.cb = cb;
  this.id = ++uid$2; // uid for batching
  this.active = true;
  this.dirty = this.lazy; // for lazy watchers
  this.deps = [];
  this.newDeps = [];
  this.depIds = new _Set();
  this.newDepIds = new _Set();
  this.expression =  true
    ? expOrFn.toString()
    : undefined;
  // parse expression for getter
  if (typeof expOrFn === 'function') {
    this.getter = expOrFn;
  } else {
    this.getter = parsePath(expOrFn);
    if (!this.getter) {
      this.getter = noop;
       true && warn(
        "Failed watching path: \"" + expOrFn + "\" " +
        'Watcher only accepts simple dot-delimited paths. ' +
        'For full control, use a function instead.',
        vm
      );
    }
  }
  this.value = this.lazy
    ? undefined
    : this.get();
};

/**
 * Evaluate the getter, and re-collect dependencies.
 */
Watcher.prototype.get = function get () {
  pushTarget(this);
  var value;
  var vm = this.vm;
  try {
    value = this.getter.call(vm, vm);
  } catch (e) {
    if (this.user) {
      handleError(e, vm, ("getter for watcher \"" + (this.expression) + "\""));
    } else {
      throw e
    }
  } finally {
    // "touch" every property so they are all tracked as
    // dependencies for deep watching
    if (this.deep) {
      traverse(value);
    }
    popTarget();
    this.cleanupDeps();
  }
  return value
};

/**
 * Add a dependency to this directive.
 */
Watcher.prototype.addDep = function addDep (dep) {
  var id = dep.id;
  if (!this.newDepIds.has(id)) {
    this.newDepIds.add(id);
    this.newDeps.push(dep);
    if (!this.depIds.has(id)) {
      dep.addSub(this);
    }
  }
};

/**
 * Clean up for dependency collection.
 */
Watcher.prototype.cleanupDeps = function cleanupDeps () {
  var i = this.deps.length;
  while (i--) {
    var dep = this.deps[i];
    if (!this.newDepIds.has(dep.id)) {
      dep.removeSub(this);
    }
  }
  var tmp = this.depIds;
  this.depIds = this.newDepIds;
  this.newDepIds = tmp;
  this.newDepIds.clear();
  tmp = this.deps;
  this.deps = this.newDeps;
  this.newDeps = tmp;
  this.newDeps.length = 0;
};

/**
 * Subscriber interface.
 * Will be called when a dependency changes.
 */
Watcher.prototype.update = function update () {
  /* istanbul ignore else */
  if (this.lazy) {
    this.dirty = true;
  } else if (this.sync) {
    this.run();
  } else {
    queueWatcher(this);
  }
};

/**
 * Scheduler job interface.
 * Will be called by the scheduler.
 */
Watcher.prototype.run = function run () {
  if (this.active) {
    var value = this.get();
    if (
      value !== this.value ||
      // Deep watchers and watchers on Object/Arrays should fire even
      // when the value is the same, because the value may
      // have mutated.
      isObject(value) ||
      this.deep
    ) {
      // set new value
      var oldValue = this.value;
      this.value = value;
      if (this.user) {
        try {
          this.cb.call(this.vm, value, oldValue);
        } catch (e) {
          handleError(e, this.vm, ("callback for watcher \"" + (this.expression) + "\""));
        }
      } else {
        this.cb.call(this.vm, value, oldValue);
      }
    }
  }
};

/**
 * Evaluate the value of the watcher.
 * This only gets called for lazy watchers.
 */
Watcher.prototype.evaluate = function evaluate () {
  this.value = this.get();
  this.dirty = false;
};

/**
 * Depend on all deps collected by this watcher.
 */
Watcher.prototype.depend = function depend () {
  var i = this.deps.length;
  while (i--) {
    this.deps[i].depend();
  }
};

/**
 * Remove self from all dependencies' subscriber list.
 */
Watcher.prototype.teardown = function teardown () {
  if (this.active) {
    // remove self from vm's watcher list
    // this is a somewhat expensive operation so we skip it
    // if the vm is being destroyed.
    if (!this.vm._isBeingDestroyed) {
      remove(this.vm._watchers, this);
    }
    var i = this.deps.length;
    while (i--) {
      this.deps[i].removeSub(this);
    }
    this.active = false;
  }
};

/*  */

var sharedPropertyDefinition = {
  enumerable: true,
  configurable: true,
  get: noop,
  set: noop
};

function proxy (target, sourceKey, key) {
  sharedPropertyDefinition.get = function proxyGetter () {
    return this[sourceKey][key]
  };
  sharedPropertyDefinition.set = function proxySetter (val) {
    this[sourceKey][key] = val;
  };
  Object.defineProperty(target, key, sharedPropertyDefinition);
}

function initState (vm) {
  vm._watchers = [];
  var opts = vm.$options;
  if (opts.props) { initProps(vm, opts.props); }
  if (opts.methods) { initMethods(vm, opts.methods); }
  if (opts.data) {
    initData(vm);
  } else {
    observe(vm._data = {}, true /* asRootData */);
  }
  if (opts.computed) { initComputed(vm, opts.computed); }
  if (opts.watch && opts.watch !== nativeWatch) {
    initWatch(vm, opts.watch);
  }
}

function initProps (vm, propsOptions) {
  var propsData = vm.$options.propsData || {};
  var props = vm._props = {};
  // cache prop keys so that future props updates can iterate using Array
  // instead of dynamic object key enumeration.
  var keys = vm.$options._propKeys = [];
  var isRoot = !vm.$parent;
  // root instance props should be converted
  if (!isRoot) {
    toggleObserving(false);
  }
  var loop = function ( key ) {
    keys.push(key);
    var value = validateProp(key, propsOptions, propsData, vm);
    /* istanbul ignore else */
    if (true) {
      var hyphenatedKey = hyphenate(key);
      if (isReservedAttribute(hyphenatedKey) ||
          config.isReservedAttr(hyphenatedKey)) {
        warn(
          ("\"" + hyphenatedKey + "\" is a reserved attribute and cannot be used as component prop."),
          vm
        );
      }
      defineReactive$$1(props, key, value, function () {
        if (!isRoot && !isUpdatingChildComponent) {
          {
            if(vm.mpHost === 'mp-baidu' || vm.mpHost === 'mp-kuaishou'){//百度、快手 observer 在 setData callback 之后触发，直接忽略该 warn
                return
            }
            //fixed by xxxxxx __next_tick_pending,uni://form-field 时不告警
            if(
                key === 'value' &&
                Array.isArray(vm.$options.behaviors) &&
                vm.$options.behaviors.indexOf('uni://form-field') !== -1
              ){
              return
            }
            if(vm._getFormData){
              return
            }
            var $parent = vm.$parent;
            while($parent){
              if($parent.__next_tick_pending){
                return
              }
              $parent = $parent.$parent;
            }
          }
          warn(
            "Avoid mutating a prop directly since the value will be " +
            "overwritten whenever the parent component re-renders. " +
            "Instead, use a data or computed property based on the prop's " +
            "value. Prop being mutated: \"" + key + "\"",
            vm
          );
        }
      });
    } else {}
    // static props are already proxied on the component's prototype
    // during Vue.extend(). We only need to proxy props defined at
    // instantiation here.
    if (!(key in vm)) {
      proxy(vm, "_props", key);
    }
  };

  for (var key in propsOptions) loop( key );
  toggleObserving(true);
}

function initData (vm) {
  var data = vm.$options.data;
  data = vm._data = typeof data === 'function'
    ? getData(data, vm)
    : data || {};
  if (!isPlainObject(data)) {
    data = {};
     true && warn(
      'data functions should return an object:\n' +
      'https://vuejs.org/v2/guide/components.html#data-Must-Be-a-Function',
      vm
    );
  }
  // proxy data on instance
  var keys = Object.keys(data);
  var props = vm.$options.props;
  var methods = vm.$options.methods;
  var i = keys.length;
  while (i--) {
    var key = keys[i];
    if (true) {
      if (methods && hasOwn(methods, key)) {
        warn(
          ("Method \"" + key + "\" has already been defined as a data property."),
          vm
        );
      }
    }
    if (props && hasOwn(props, key)) {
       true && warn(
        "The data property \"" + key + "\" is already declared as a prop. " +
        "Use prop default value instead.",
        vm
      );
    } else if (!isReserved(key)) {
      proxy(vm, "_data", key);
    }
  }
  // observe data
  observe(data, true /* asRootData */);
}

function getData (data, vm) {
  // #7573 disable dep collection when invoking data getters
  pushTarget();
  try {
    return data.call(vm, vm)
  } catch (e) {
    handleError(e, vm, "data()");
    return {}
  } finally {
    popTarget();
  }
}

var computedWatcherOptions = { lazy: true };

function initComputed (vm, computed) {
  // $flow-disable-line
  var watchers = vm._computedWatchers = Object.create(null);
  // computed properties are just getters during SSR
  var isSSR = isServerRendering();

  for (var key in computed) {
    var userDef = computed[key];
    var getter = typeof userDef === 'function' ? userDef : userDef.get;
    if ( true && getter == null) {
      warn(
        ("Getter is missing for computed property \"" + key + "\"."),
        vm
      );
    }

    if (!isSSR) {
      // create internal watcher for the computed property.
      watchers[key] = new Watcher(
        vm,
        getter || noop,
        noop,
        computedWatcherOptions
      );
    }

    // component-defined computed properties are already defined on the
    // component prototype. We only need to define computed properties defined
    // at instantiation here.
    if (!(key in vm)) {
      defineComputed(vm, key, userDef);
    } else if (true) {
      if (key in vm.$data) {
        warn(("The computed property \"" + key + "\" is already defined in data."), vm);
      } else if (vm.$options.props && key in vm.$options.props) {
        warn(("The computed property \"" + key + "\" is already defined as a prop."), vm);
      }
    }
  }
}

function defineComputed (
  target,
  key,
  userDef
) {
  var shouldCache = !isServerRendering();
  if (typeof userDef === 'function') {
    sharedPropertyDefinition.get = shouldCache
      ? createComputedGetter(key)
      : createGetterInvoker(userDef);
    sharedPropertyDefinition.set = noop;
  } else {
    sharedPropertyDefinition.get = userDef.get
      ? shouldCache && userDef.cache !== false
        ? createComputedGetter(key)
        : createGetterInvoker(userDef.get)
      : noop;
    sharedPropertyDefinition.set = userDef.set || noop;
  }
  if ( true &&
      sharedPropertyDefinition.set === noop) {
    sharedPropertyDefinition.set = function () {
      warn(
        ("Computed property \"" + key + "\" was assigned to but it has no setter."),
        this
      );
    };
  }
  Object.defineProperty(target, key, sharedPropertyDefinition);
}

function createComputedGetter (key) {
  return function computedGetter () {
    var watcher = this._computedWatchers && this._computedWatchers[key];
    if (watcher) {
      if (watcher.dirty) {
        watcher.evaluate();
      }
      if (Dep.SharedObject.target) {// fixed by xxxxxx
        watcher.depend();
      }
      return watcher.value
    }
  }
}

function createGetterInvoker(fn) {
  return function computedGetter () {
    return fn.call(this, this)
  }
}

function initMethods (vm, methods) {
  var props = vm.$options.props;
  for (var key in methods) {
    if (true) {
      if (typeof methods[key] !== 'function') {
        warn(
          "Method \"" + key + "\" has type \"" + (typeof methods[key]) + "\" in the component definition. " +
          "Did you reference the function correctly?",
          vm
        );
      }
      if (props && hasOwn(props, key)) {
        warn(
          ("Method \"" + key + "\" has already been defined as a prop."),
          vm
        );
      }
      if ((key in vm) && isReserved(key)) {
        warn(
          "Method \"" + key + "\" conflicts with an existing Vue instance method. " +
          "Avoid defining component methods that start with _ or $."
        );
      }
    }
    vm[key] = typeof methods[key] !== 'function' ? noop : bind(methods[key], vm);
  }
}

function initWatch (vm, watch) {
  for (var key in watch) {
    var handler = watch[key];
    if (Array.isArray(handler)) {
      for (var i = 0; i < handler.length; i++) {
        createWatcher(vm, key, handler[i]);
      }
    } else {
      createWatcher(vm, key, handler);
    }
  }
}

function createWatcher (
  vm,
  expOrFn,
  handler,
  options
) {
  if (isPlainObject(handler)) {
    options = handler;
    handler = handler.handler;
  }
  if (typeof handler === 'string') {
    handler = vm[handler];
  }
  return vm.$watch(expOrFn, handler, options)
}

function stateMixin (Vue) {
  // flow somehow has problems with directly declared definition object
  // when using Object.defineProperty, so we have to procedurally build up
  // the object here.
  var dataDef = {};
  dataDef.get = function () { return this._data };
  var propsDef = {};
  propsDef.get = function () { return this._props };
  if (true) {
    dataDef.set = function () {
      warn(
        'Avoid replacing instance root $data. ' +
        'Use nested data properties instead.',
        this
      );
    };
    propsDef.set = function () {
      warn("$props is readonly.", this);
    };
  }
  Object.defineProperty(Vue.prototype, '$data', dataDef);
  Object.defineProperty(Vue.prototype, '$props', propsDef);

  Vue.prototype.$set = set;
  Vue.prototype.$delete = del;

  Vue.prototype.$watch = function (
    expOrFn,
    cb,
    options
  ) {
    var vm = this;
    if (isPlainObject(cb)) {
      return createWatcher(vm, expOrFn, cb, options)
    }
    options = options || {};
    options.user = true;
    var watcher = new Watcher(vm, expOrFn, cb, options);
    if (options.immediate) {
      try {
        cb.call(vm, watcher.value);
      } catch (error) {
        handleError(error, vm, ("callback for immediate watcher \"" + (watcher.expression) + "\""));
      }
    }
    return function unwatchFn () {
      watcher.teardown();
    }
  };
}

/*  */

var uid$3 = 0;

function initMixin (Vue) {
  Vue.prototype._init = function (options) {
    var vm = this;
    // a uid
    vm._uid = uid$3++;

    var startTag, endTag;
    /* istanbul ignore if */
    if ( true && config.performance && mark) {
      startTag = "vue-perf-start:" + (vm._uid);
      endTag = "vue-perf-end:" + (vm._uid);
      mark(startTag);
    }

    // a flag to avoid this being observed
    vm._isVue = true;
    // merge options
    if (options && options._isComponent) {
      // optimize internal component instantiation
      // since dynamic options merging is pretty slow, and none of the
      // internal component options needs special treatment.
      initInternalComponent(vm, options);
    } else {
      vm.$options = mergeOptions(
        resolveConstructorOptions(vm.constructor),
        options || {},
        vm
      );
    }
    /* istanbul ignore else */
    if (true) {
      initProxy(vm);
    } else {}
    // expose real self
    vm._self = vm;
    initLifecycle(vm);
    initEvents(vm);
    initRender(vm);
    callHook(vm, 'beforeCreate');
    !vm._$fallback && initInjections(vm); // resolve injections before data/props
    initState(vm);
    !vm._$fallback && initProvide(vm); // resolve provide after data/props
    !vm._$fallback && callHook(vm, 'created');

    /* istanbul ignore if */
    if ( true && config.performance && mark) {
      vm._name = formatComponentName(vm, false);
      mark(endTag);
      measure(("vue " + (vm._name) + " init"), startTag, endTag);
    }

    if (vm.$options.el) {
      vm.$mount(vm.$options.el);
    }
  };
}

function initInternalComponent (vm, options) {
  var opts = vm.$options = Object.create(vm.constructor.options);
  // doing this because it's faster than dynamic enumeration.
  var parentVnode = options._parentVnode;
  opts.parent = options.parent;
  opts._parentVnode = parentVnode;

  var vnodeComponentOptions = parentVnode.componentOptions;
  opts.propsData = vnodeComponentOptions.propsData;
  opts._parentListeners = vnodeComponentOptions.listeners;
  opts._renderChildren = vnodeComponentOptions.children;
  opts._componentTag = vnodeComponentOptions.tag;

  if (options.render) {
    opts.render = options.render;
    opts.staticRenderFns = options.staticRenderFns;
  }
}

function resolveConstructorOptions (Ctor) {
  var options = Ctor.options;
  if (Ctor.super) {
    var superOptions = resolveConstructorOptions(Ctor.super);
    var cachedSuperOptions = Ctor.superOptions;
    if (superOptions !== cachedSuperOptions) {
      // super option changed,
      // need to resolve new options.
      Ctor.superOptions = superOptions;
      // check if there are any late-modified/attached options (#4976)
      var modifiedOptions = resolveModifiedOptions(Ctor);
      // update base extend options
      if (modifiedOptions) {
        extend(Ctor.extendOptions, modifiedOptions);
      }
      options = Ctor.options = mergeOptions(superOptions, Ctor.extendOptions);
      if (options.name) {
        options.components[options.name] = Ctor;
      }
    }
  }
  return options
}

function resolveModifiedOptions (Ctor) {
  var modified;
  var latest = Ctor.options;
  var sealed = Ctor.sealedOptions;
  for (var key in latest) {
    if (latest[key] !== sealed[key]) {
      if (!modified) { modified = {}; }
      modified[key] = latest[key];
    }
  }
  return modified
}

function Vue (options) {
  if ( true &&
    !(this instanceof Vue)
  ) {
    warn('Vue is a constructor and should be called with the `new` keyword');
  }
  this._init(options);
}

initMixin(Vue);
stateMixin(Vue);
eventsMixin(Vue);
lifecycleMixin(Vue);
renderMixin(Vue);

/*  */

function initUse (Vue) {
  Vue.use = function (plugin) {
    var installedPlugins = (this._installedPlugins || (this._installedPlugins = []));
    if (installedPlugins.indexOf(plugin) > -1) {
      return this
    }

    // additional parameters
    var args = toArray(arguments, 1);
    args.unshift(this);
    if (typeof plugin.install === 'function') {
      plugin.install.apply(plugin, args);
    } else if (typeof plugin === 'function') {
      plugin.apply(null, args);
    }
    installedPlugins.push(plugin);
    return this
  };
}

/*  */

function initMixin$1 (Vue) {
  Vue.mixin = function (mixin) {
    this.options = mergeOptions(this.options, mixin);
    return this
  };
}

/*  */

function initExtend (Vue) {
  /**
   * Each instance constructor, including Vue, has a unique
   * cid. This enables us to create wrapped "child
   * constructors" for prototypal inheritance and cache them.
   */
  Vue.cid = 0;
  var cid = 1;

  /**
   * Class inheritance
   */
  Vue.extend = function (extendOptions) {
    extendOptions = extendOptions || {};
    var Super = this;
    var SuperId = Super.cid;
    var cachedCtors = extendOptions._Ctor || (extendOptions._Ctor = {});
    if (cachedCtors[SuperId]) {
      return cachedCtors[SuperId]
    }

    var name = extendOptions.name || Super.options.name;
    if ( true && name) {
      validateComponentName(name);
    }

    var Sub = function VueComponent (options) {
      this._init(options);
    };
    Sub.prototype = Object.create(Super.prototype);
    Sub.prototype.constructor = Sub;
    Sub.cid = cid++;
    Sub.options = mergeOptions(
      Super.options,
      extendOptions
    );
    Sub['super'] = Super;

    // For props and computed properties, we define the proxy getters on
    // the Vue instances at extension time, on the extended prototype. This
    // avoids Object.defineProperty calls for each instance created.
    if (Sub.options.props) {
      initProps$1(Sub);
    }
    if (Sub.options.computed) {
      initComputed$1(Sub);
    }

    // allow further extension/mixin/plugin usage
    Sub.extend = Super.extend;
    Sub.mixin = Super.mixin;
    Sub.use = Super.use;

    // create asset registers, so extended classes
    // can have their private assets too.
    ASSET_TYPES.forEach(function (type) {
      Sub[type] = Super[type];
    });
    // enable recursive self-lookup
    if (name) {
      Sub.options.components[name] = Sub;
    }

    // keep a reference to the super options at extension time.
    // later at instantiation we can check if Super's options have
    // been updated.
    Sub.superOptions = Super.options;
    Sub.extendOptions = extendOptions;
    Sub.sealedOptions = extend({}, Sub.options);

    // cache constructor
    cachedCtors[SuperId] = Sub;
    return Sub
  };
}

function initProps$1 (Comp) {
  var props = Comp.options.props;
  for (var key in props) {
    proxy(Comp.prototype, "_props", key);
  }
}

function initComputed$1 (Comp) {
  var computed = Comp.options.computed;
  for (var key in computed) {
    defineComputed(Comp.prototype, key, computed[key]);
  }
}

/*  */

function initAssetRegisters (Vue) {
  /**
   * Create asset registration methods.
   */
  ASSET_TYPES.forEach(function (type) {
    Vue[type] = function (
      id,
      definition
    ) {
      if (!definition) {
        return this.options[type + 's'][id]
      } else {
        /* istanbul ignore if */
        if ( true && type === 'component') {
          validateComponentName(id);
        }
        if (type === 'component' && isPlainObject(definition)) {
          definition.name = definition.name || id;
          definition = this.options._base.extend(definition);
        }
        if (type === 'directive' && typeof definition === 'function') {
          definition = { bind: definition, update: definition };
        }
        this.options[type + 's'][id] = definition;
        return definition
      }
    };
  });
}

/*  */



function getComponentName (opts) {
  return opts && (opts.Ctor.options.name || opts.tag)
}

function matches (pattern, name) {
  if (Array.isArray(pattern)) {
    return pattern.indexOf(name) > -1
  } else if (typeof pattern === 'string') {
    return pattern.split(',').indexOf(name) > -1
  } else if (isRegExp(pattern)) {
    return pattern.test(name)
  }
  /* istanbul ignore next */
  return false
}

function pruneCache (keepAliveInstance, filter) {
  var cache = keepAliveInstance.cache;
  var keys = keepAliveInstance.keys;
  var _vnode = keepAliveInstance._vnode;
  for (var key in cache) {
    var cachedNode = cache[key];
    if (cachedNode) {
      var name = getComponentName(cachedNode.componentOptions);
      if (name && !filter(name)) {
        pruneCacheEntry(cache, key, keys, _vnode);
      }
    }
  }
}

function pruneCacheEntry (
  cache,
  key,
  keys,
  current
) {
  var cached$$1 = cache[key];
  if (cached$$1 && (!current || cached$$1.tag !== current.tag)) {
    cached$$1.componentInstance.$destroy();
  }
  cache[key] = null;
  remove(keys, key);
}

var patternTypes = [String, RegExp, Array];

var KeepAlive = {
  name: 'keep-alive',
  abstract: true,

  props: {
    include: patternTypes,
    exclude: patternTypes,
    max: [String, Number]
  },

  created: function created () {
    this.cache = Object.create(null);
    this.keys = [];
  },

  destroyed: function destroyed () {
    for (var key in this.cache) {
      pruneCacheEntry(this.cache, key, this.keys);
    }
  },

  mounted: function mounted () {
    var this$1 = this;

    this.$watch('include', function (val) {
      pruneCache(this$1, function (name) { return matches(val, name); });
    });
    this.$watch('exclude', function (val) {
      pruneCache(this$1, function (name) { return !matches(val, name); });
    });
  },

  render: function render () {
    var slot = this.$slots.default;
    var vnode = getFirstComponentChild(slot);
    var componentOptions = vnode && vnode.componentOptions;
    if (componentOptions) {
      // check pattern
      var name = getComponentName(componentOptions);
      var ref = this;
      var include = ref.include;
      var exclude = ref.exclude;
      if (
        // not included
        (include && (!name || !matches(include, name))) ||
        // excluded
        (exclude && name && matches(exclude, name))
      ) {
        return vnode
      }

      var ref$1 = this;
      var cache = ref$1.cache;
      var keys = ref$1.keys;
      var key = vnode.key == null
        // same constructor may get registered as different local components
        // so cid alone is not enough (#3269)
        ? componentOptions.Ctor.cid + (componentOptions.tag ? ("::" + (componentOptions.tag)) : '')
        : vnode.key;
      if (cache[key]) {
        vnode.componentInstance = cache[key].componentInstance;
        // make current key freshest
        remove(keys, key);
        keys.push(key);
      } else {
        cache[key] = vnode;
        keys.push(key);
        // prune oldest entry
        if (this.max && keys.length > parseInt(this.max)) {
          pruneCacheEntry(cache, keys[0], keys, this._vnode);
        }
      }

      vnode.data.keepAlive = true;
    }
    return vnode || (slot && slot[0])
  }
};

var builtInComponents = {
  KeepAlive: KeepAlive
};

/*  */

function initGlobalAPI (Vue) {
  // config
  var configDef = {};
  configDef.get = function () { return config; };
  if (true) {
    configDef.set = function () {
      warn(
        'Do not replace the Vue.config object, set individual fields instead.'
      );
    };
  }
  Object.defineProperty(Vue, 'config', configDef);

  // exposed util methods.
  // NOTE: these are not considered part of the public API - avoid relying on
  // them unless you are aware of the risk.
  Vue.util = {
    warn: warn,
    extend: extend,
    mergeOptions: mergeOptions,
    defineReactive: defineReactive$$1
  };

  Vue.set = set;
  Vue.delete = del;
  Vue.nextTick = nextTick;

  // 2.6 explicit observable API
  Vue.observable = function (obj) {
    observe(obj);
    return obj
  };

  Vue.options = Object.create(null);
  ASSET_TYPES.forEach(function (type) {
    Vue.options[type + 's'] = Object.create(null);
  });

  // this is used to identify the "base" constructor to extend all plain-object
  // components with in Weex's multi-instance scenarios.
  Vue.options._base = Vue;

  extend(Vue.options.components, builtInComponents);

  initUse(Vue);
  initMixin$1(Vue);
  initExtend(Vue);
  initAssetRegisters(Vue);
}

initGlobalAPI(Vue);

Object.defineProperty(Vue.prototype, '$isServer', {
  get: isServerRendering
});

Object.defineProperty(Vue.prototype, '$ssrContext', {
  get: function get () {
    /* istanbul ignore next */
    return this.$vnode && this.$vnode.ssrContext
  }
});

// expose FunctionalRenderContext for ssr runtime helper installation
Object.defineProperty(Vue, 'FunctionalRenderContext', {
  value: FunctionalRenderContext
});

Vue.version = '2.6.11';

/**
 * https://raw.githubusercontent.com/Tencent/westore/master/packages/westore/utils/diff.js
 */
var ARRAYTYPE = '[object Array]';
var OBJECTTYPE = '[object Object]';
// const FUNCTIONTYPE = '[object Function]'

function diff(current, pre) {
    var result = {};
    syncKeys(current, pre);
    _diff(current, pre, '', result);
    return result
}

function syncKeys(current, pre) {
    if (current === pre) { return }
    var rootCurrentType = type(current);
    var rootPreType = type(pre);
    if (rootCurrentType == OBJECTTYPE && rootPreType == OBJECTTYPE) {
        if(Object.keys(current).length >= Object.keys(pre).length){
            for (var key in pre) {
                var currentValue = current[key];
                if (currentValue === undefined) {
                    current[key] = null;
                } else {
                    syncKeys(currentValue, pre[key]);
                }
            }
        }
    } else if (rootCurrentType == ARRAYTYPE && rootPreType == ARRAYTYPE) {
        if (current.length >= pre.length) {
            pre.forEach(function (item, index) {
                syncKeys(current[index], item);
            });
        }
    }
}

function _diff(current, pre, path, result) {
    if (current === pre) { return }
    var rootCurrentType = type(current);
    var rootPreType = type(pre);
    if (rootCurrentType == OBJECTTYPE) {
        if (rootPreType != OBJECTTYPE || Object.keys(current).length < Object.keys(pre).length) {
            setResult(result, path, current);
        } else {
            var loop = function ( key ) {
                var currentValue = current[key];
                var preValue = pre[key];
                var currentType = type(currentValue);
                var preType = type(preValue);
                if (currentType != ARRAYTYPE && currentType != OBJECTTYPE) {
                    // NOTE 此处将 != 修改为 !==。涉及地方太多恐怕测试不到，如果出现数据对比问题，将其修改回来。
                    if (currentValue !== pre[key]) {
                        setResult(result, (path == '' ? '' : path + ".") + key, currentValue);
                    }
                } else if (currentType == ARRAYTYPE) {
                    if (preType != ARRAYTYPE) {
                        setResult(result, (path == '' ? '' : path + ".") + key, currentValue);
                    } else {
                        if (currentValue.length < preValue.length) {
                            setResult(result, (path == '' ? '' : path + ".") + key, currentValue);
                        } else {
                            currentValue.forEach(function (item, index) {
                                _diff(item, preValue[index], (path == '' ? '' : path + ".") + key + '[' + index + ']', result);
                            });
                        }
                    }
                } else if (currentType == OBJECTTYPE) {
                    if (preType != OBJECTTYPE || Object.keys(currentValue).length < Object.keys(preValue).length) {
                        setResult(result, (path == '' ? '' : path + ".") + key, currentValue);
                    } else {
                        for (var subKey in currentValue) {
                            _diff(currentValue[subKey], preValue[subKey], (path == '' ? '' : path + ".") + key + '.' + subKey, result);
                        }
                    }
                }
            };

            for (var key in current) loop( key );
        }
    } else if (rootCurrentType == ARRAYTYPE) {
        if (rootPreType != ARRAYTYPE) {
            setResult(result, path, current);
        } else {
            if (current.length < pre.length) {
                setResult(result, path, current);
            } else {
                current.forEach(function (item, index) {
                    _diff(item, pre[index], path + '[' + index + ']', result);
                });
            }
        }
    } else {
        setResult(result, path, current);
    }
}

function setResult(result, k, v) {
    // if (type(v) != FUNCTIONTYPE) {
        result[k] = v;
    // }
}

function type(obj) {
    return Object.prototype.toString.call(obj)
}

/*  */

function flushCallbacks$1(vm) {
    if (vm.__next_tick_callbacks && vm.__next_tick_callbacks.length) {
        if (Object({"VUE_APP_NAME":"garbageSort","VUE_APP_PLATFORM":"mp-weixin","NODE_ENV":"development","BASE_URL":"/"}).VUE_APP_DEBUG) {
            var mpInstance = vm.$scope;
            console.log('[' + (+new Date) + '][' + (mpInstance.is || mpInstance.route) + '][' + vm._uid +
                ']:flushCallbacks[' + vm.__next_tick_callbacks.length + ']');
        }
        var copies = vm.__next_tick_callbacks.slice(0);
        vm.__next_tick_callbacks.length = 0;
        for (var i = 0; i < copies.length; i++) {
            copies[i]();
        }
    }
}

function hasRenderWatcher(vm) {
    return queue.find(function (watcher) { return vm._watcher === watcher; })
}

function nextTick$1(vm, cb) {
    //1.nextTick 之前 已 setData 且 setData 还未回调完成
    //2.nextTick 之前存在 render watcher
    if (!vm.__next_tick_pending && !hasRenderWatcher(vm)) {
        if(Object({"VUE_APP_NAME":"garbageSort","VUE_APP_PLATFORM":"mp-weixin","NODE_ENV":"development","BASE_URL":"/"}).VUE_APP_DEBUG){
            var mpInstance = vm.$scope;
            console.log('[' + (+new Date) + '][' + (mpInstance.is || mpInstance.route) + '][' + vm._uid +
                ']:nextVueTick');
        }
        return nextTick(cb, vm)
    }else{
        if(Object({"VUE_APP_NAME":"garbageSort","VUE_APP_PLATFORM":"mp-weixin","NODE_ENV":"development","BASE_URL":"/"}).VUE_APP_DEBUG){
            var mpInstance$1 = vm.$scope;
            console.log('[' + (+new Date) + '][' + (mpInstance$1.is || mpInstance$1.route) + '][' + vm._uid +
                ']:nextMPTick');
        }
    }
    var _resolve;
    if (!vm.__next_tick_callbacks) {
        vm.__next_tick_callbacks = [];
    }
    vm.__next_tick_callbacks.push(function () {
        if (cb) {
            try {
                cb.call(vm);
            } catch (e) {
                handleError(e, vm, 'nextTick');
            }
        } else if (_resolve) {
            _resolve(vm);
        }
    });
    // $flow-disable-line
    if (!cb && typeof Promise !== 'undefined') {
        return new Promise(function (resolve) {
            _resolve = resolve;
        })
    }
}

/*  */

function cloneWithData(vm) {
  // 确保当前 vm 所有数据被同步
  var ret = Object.create(null);
  var dataKeys = [].concat(
    Object.keys(vm._data || {}),
    Object.keys(vm._computedWatchers || {}));

  dataKeys.reduce(function(ret, key) {
    ret[key] = vm[key];
    return ret
  }, ret);

  // vue-composition-api
  var compositionApiState = vm.__composition_api_state__ || vm.__secret_vfa_state__;
  var rawBindings = compositionApiState && compositionApiState.rawBindings;
  if (rawBindings) {
    Object.keys(rawBindings).forEach(function (key) {
      ret[key] = vm[key];
    });
  }

  //TODO 需要把无用数据处理掉，比如 list=>l0 则 list 需要移除，否则多传输一份数据
  Object.assign(ret, vm.$mp.data || {});
  if (
    Array.isArray(vm.$options.behaviors) &&
    vm.$options.behaviors.indexOf('uni://form-field') !== -1
  ) { //form-field
    ret['name'] = vm.name;
    ret['value'] = vm.value;
  }

  return JSON.parse(JSON.stringify(ret))
}

var patch = function(oldVnode, vnode) {
  var this$1 = this;

  if (vnode === null) { //destroy
    return
  }
  if (this.mpType === 'page' || this.mpType === 'component') {
    var mpInstance = this.$scope;
    var data = Object.create(null);
    try {
      data = cloneWithData(this);
    } catch (err) {
      console.error(err);
    }
    data.__webviewId__ = mpInstance.data.__webviewId__;
    var mpData = Object.create(null);
    Object.keys(data).forEach(function (key) { //仅同步 data 中有的数据
      mpData[key] = mpInstance.data[key];
    });
    var diffData = this.$shouldDiffData === false ? data : diff(data, mpData);
    if (Object.keys(diffData).length) {
      if (Object({"VUE_APP_NAME":"garbageSort","VUE_APP_PLATFORM":"mp-weixin","NODE_ENV":"development","BASE_URL":"/"}).VUE_APP_DEBUG) {
        console.log('[' + (+new Date) + '][' + (mpInstance.is || mpInstance.route) + '][' + this._uid +
          ']差量更新',
          JSON.stringify(diffData));
      }
      this.__next_tick_pending = true;
      mpInstance.setData(diffData, function () {
        this$1.__next_tick_pending = false;
        flushCallbacks$1(this$1);
      });
    } else {
      flushCallbacks$1(this);
    }
  }
};

/*  */

function createEmptyRender() {

}

function mountComponent$1(
  vm,
  el,
  hydrating
) {
  if (!vm.mpType) {//main.js 中的 new Vue
    return vm
  }
  if (vm.mpType === 'app') {
    vm.$options.render = createEmptyRender;
  }
  if (!vm.$options.render) {
    vm.$options.render = createEmptyRender;
    if (true) {
      /* istanbul ignore if */
      if ((vm.$options.template && vm.$options.template.charAt(0) !== '#') ||
        vm.$options.el || el) {
        warn(
          'You are using the runtime-only build of Vue where the template ' +
          'compiler is not available. Either pre-compile the templates into ' +
          'render functions, or use the compiler-included build.',
          vm
        );
      } else {
        warn(
          'Failed to mount component: template or render function not defined.',
          vm
        );
      }
    }
  }

  !vm._$fallback && callHook(vm, 'beforeMount');

  var updateComponent = function () {
    vm._update(vm._render(), hydrating);
  };

  // we set this to vm._watcher inside the watcher's constructor
  // since the watcher's initial patch may call $forceUpdate (e.g. inside child
  // component's mounted hook), which relies on vm._watcher being already defined
  new Watcher(vm, updateComponent, noop, {
    before: function before() {
      if (vm._isMounted && !vm._isDestroyed) {
        callHook(vm, 'beforeUpdate');
      }
    }
  }, true /* isRenderWatcher */);
  hydrating = false;
  return vm
}

/*  */

function renderClass (
  staticClass,
  dynamicClass
) {
  if (isDef(staticClass) || isDef(dynamicClass)) {
    return concat(staticClass, stringifyClass(dynamicClass))
  }
  /* istanbul ignore next */
  return ''
}

function concat (a, b) {
  return a ? b ? (a + ' ' + b) : a : (b || '')
}

function stringifyClass (value) {
  if (Array.isArray(value)) {
    return stringifyArray(value)
  }
  if (isObject(value)) {
    return stringifyObject(value)
  }
  if (typeof value === 'string') {
    return value
  }
  /* istanbul ignore next */
  return ''
}

function stringifyArray (value) {
  var res = '';
  var stringified;
  for (var i = 0, l = value.length; i < l; i++) {
    if (isDef(stringified = stringifyClass(value[i])) && stringified !== '') {
      if (res) { res += ' '; }
      res += stringified;
    }
  }
  return res
}

function stringifyObject (value) {
  var res = '';
  for (var key in value) {
    if (value[key]) {
      if (res) { res += ' '; }
      res += key;
    }
  }
  return res
}

/*  */

var parseStyleText = cached(function (cssText) {
  var res = {};
  var listDelimiter = /;(?![^(]*\))/g;
  var propertyDelimiter = /:(.+)/;
  cssText.split(listDelimiter).forEach(function (item) {
    if (item) {
      var tmp = item.split(propertyDelimiter);
      tmp.length > 1 && (res[tmp[0].trim()] = tmp[1].trim());
    }
  });
  return res
});

// normalize possible array / string values into Object
function normalizeStyleBinding (bindingStyle) {
  if (Array.isArray(bindingStyle)) {
    return toObject(bindingStyle)
  }
  if (typeof bindingStyle === 'string') {
    return parseStyleText(bindingStyle)
  }
  return bindingStyle
}

/*  */

var MP_METHODS = ['createSelectorQuery', 'createIntersectionObserver', 'selectAllComponents', 'selectComponent'];

function getTarget(obj, path) {
  var parts = path.split('.');
  var key = parts[0];
  if (key.indexOf('__$n') === 0) { //number index
    key = parseInt(key.replace('__$n', ''));
  }
  if (parts.length === 1) {
    return obj[key]
  }
  return getTarget(obj[key], parts.slice(1).join('.'))
}

function internalMixin(Vue) {

  Vue.config.errorHandler = function(err, vm, info) {
    Vue.util.warn(("Error in " + info + ": \"" + (err.toString()) + "\""), vm);
    console.error(err);
    /* eslint-disable no-undef */
    var app = typeof getApp === 'function' && getApp();
    if (app && app.onError) {
      app.onError(err);
    }
  };

  var oldEmit = Vue.prototype.$emit;

  Vue.prototype.$emit = function(event) {
    if (this.$scope && event) {
      (this.$scope['_triggerEvent'] || this.$scope['triggerEvent'])
        .call(this.$scope, event, {
          __args__: toArray(arguments, 1)
        })
    }
    return oldEmit.apply(this, arguments)
  };

  Vue.prototype.$nextTick = function(fn) {
    return nextTick$1(this, fn)
  };

  MP_METHODS.forEach(function (method) {
    Vue.prototype[method] = function(args) {
      if (this.$scope && this.$scope[method]) {
        return this.$scope[method](args)
      }
      // mp-alipay
      if (typeof my === 'undefined') {
        return
      }
      if (method === 'createSelectorQuery') {
        /* eslint-disable no-undef */
        return my.createSelectorQuery(args)
      } else if (method === 'createIntersectionObserver') {
        /* eslint-disable no-undef */
        return my.createIntersectionObserver(args)
      }
      // TODO mp-alipay 暂不支持 selectAllComponents,selectComponent
    };
  });

  Vue.prototype.__init_provide = initProvide;

  Vue.prototype.__init_injections = initInjections;

  Vue.prototype.__call_hook = function(hook, args) {
    var vm = this;
    // #7573 disable dep collection when invoking lifecycle hooks
    pushTarget();
    var handlers = vm.$options[hook];
    var info = hook + " hook";
    var ret;
    if (handlers) {
      for (var i = 0, j = handlers.length; i < j; i++) {
        ret = invokeWithErrorHandling(handlers[i], vm, args ? [args] : null, vm, info);
      }
    }
    if (vm._hasHookEvent) {
      vm.$emit('hook:' + hook, args);
    }
    popTarget();
    return ret
  };

  Vue.prototype.__set_model = function(target, key, value, modifiers) {
    if (Array.isArray(modifiers)) {
      if (modifiers.indexOf('trim') !== -1) {
        value = value.trim();
      }
      if (modifiers.indexOf('number') !== -1) {
        value = this._n(value);
      }
    }
    if (!target) {
      target = this;
    }
    // 解决动态属性添加
    Vue.set(target, key, value)
  };

  Vue.prototype.__set_sync = function(target, key, value) {
    if (!target) {
      target = this;
    }
    // 解决动态属性添加
    Vue.set(target, key, value)
  };

  Vue.prototype.__get_orig = function(item) {
    if (isPlainObject(item)) {
      return item['$orig'] || item
    }
    return item
  };

  Vue.prototype.__get_value = function(dataPath, target) {
    return getTarget(target || this, dataPath)
  };


  Vue.prototype.__get_class = function(dynamicClass, staticClass) {
    return renderClass(staticClass, dynamicClass)
  };

  Vue.prototype.__get_style = function(dynamicStyle, staticStyle) {
    if (!dynamicStyle && !staticStyle) {
      return ''
    }
    var dynamicStyleObj = normalizeStyleBinding(dynamicStyle);
    var styleObj = staticStyle ? extend(staticStyle, dynamicStyleObj) : dynamicStyleObj;
    return Object.keys(styleObj).map(function (name) { return ((hyphenate(name)) + ":" + (styleObj[name])); }).join(';')
  };

  Vue.prototype.__map = function(val, iteratee) {
    //TODO 暂不考虑 string
    var ret, i, l, keys, key;
    if (Array.isArray(val)) {
      ret = new Array(val.length);
      for (i = 0, l = val.length; i < l; i++) {
        ret[i] = iteratee(val[i], i);
      }
      return ret
    } else if (isObject(val)) {
      keys = Object.keys(val);
      ret = Object.create(null);
      for (i = 0, l = keys.length; i < l; i++) {
        key = keys[i];
        ret[key] = iteratee(val[key], key, i);
      }
      return ret
    } else if (typeof val === 'number') {
      ret = new Array(val);
      for (i = 0, l = val; i < l; i++) {
        // 第一个参数暂时仍和小程序一致
        ret[i] = iteratee(i, i);
      }
      return ret
    }
    return []
  };

}

/*  */

var LIFECYCLE_HOOKS$1 = [
    //App
    'onLaunch',
    'onShow',
    'onHide',
    'onUniNViewMessage',
    'onPageNotFound',
    'onThemeChange',
    'onError',
    'onUnhandledRejection',
    //Page
    'onInit',
    'onLoad',
    // 'onShow',
    'onReady',
    // 'onHide',
    'onUnload',
    'onPullDownRefresh',
    'onReachBottom',
    'onTabItemTap',
    'onAddToFavorites',
    'onShareTimeline',
    'onShareAppMessage',
    'onResize',
    'onPageScroll',
    'onNavigationBarButtonTap',
    'onBackPress',
    'onNavigationBarSearchInputChanged',
    'onNavigationBarSearchInputConfirmed',
    'onNavigationBarSearchInputClicked',
    //Component
    // 'onReady', // 兼容旧版本，应该移除该事件
    'onPageShow',
    'onPageHide',
    'onPageResize'
];
function lifecycleMixin$1(Vue) {

    //fixed vue-class-component
    var oldExtend = Vue.extend;
    Vue.extend = function(extendOptions) {
        extendOptions = extendOptions || {};

        var methods = extendOptions.methods;
        if (methods) {
            Object.keys(methods).forEach(function (methodName) {
                if (LIFECYCLE_HOOKS$1.indexOf(methodName)!==-1) {
                    extendOptions[methodName] = methods[methodName];
                    delete methods[methodName];
                }
            });
        }

        return oldExtend.call(this, extendOptions)
    };

    var strategies = Vue.config.optionMergeStrategies;
    var mergeHook = strategies.created;
    LIFECYCLE_HOOKS$1.forEach(function (hook) {
        strategies[hook] = mergeHook;
    });

    Vue.prototype.__lifecycle_hooks__ = LIFECYCLE_HOOKS$1;
}

/*  */

// install platform patch function
Vue.prototype.__patch__ = patch;

// public mount method
Vue.prototype.$mount = function(
    el ,
    hydrating
) {
    return mountComponent$1(this, el, hydrating)
};

lifecycleMixin$1(Vue);
internalMixin(Vue);

/*  */

/* harmony default export */ __webpack_exports__["default"] = (Vue);

/* WEBPACK VAR INJECTION */}.call(this, __webpack_require__(/*! ./../../../../../webpack/buildin/global.js */ 2)))

/***/ }),

/***/ 4:
/*!*************************************************************!*\
  !*** ./node_modules/@dcloudio/uni-i18n/dist/uni-i18n.es.js ***!
  \*************************************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

"use strict";
/* WEBPACK VAR INJECTION */(function(uni, global) {Object.defineProperty(exports, "__esModule", { value: true });exports.compileI18nJsonStr = compileI18nJsonStr;exports.hasI18nJson = hasI18nJson;exports.initVueI18n = initVueI18n;exports.isI18nStr = isI18nStr;exports.normalizeLocale = normalizeLocale;exports.parseI18nJson = parseI18nJson;exports.resolveLocale = resolveLocale;exports.isString = exports.LOCALE_ZH_HANT = exports.LOCALE_ZH_HANS = exports.LOCALE_FR = exports.LOCALE_ES = exports.LOCALE_EN = exports.I18n = exports.Formatter = void 0;function _slicedToArray(arr, i) {return _arrayWithHoles(arr) || _iterableToArrayLimit(arr, i) || _unsupportedIterableToArray(arr, i) || _nonIterableRest();}function _nonIterableRest() {throw new TypeError("Invalid attempt to destructure non-iterable instance.\nIn order to be iterable, non-array objects must have a [Symbol.iterator]() method.");}function _unsupportedIterableToArray(o, minLen) {if (!o) return;if (typeof o === "string") return _arrayLikeToArray(o, minLen);var n = Object.prototype.toString.call(o).slice(8, -1);if (n === "Object" && o.constructor) n = o.constructor.name;if (n === "Map" || n === "Set") return Array.from(o);if (n === "Arguments" || /^(?:Ui|I)nt(?:8|16|32)(?:Clamped)?Array$/.test(n)) return _arrayLikeToArray(o, minLen);}function _arrayLikeToArray(arr, len) {if (len == null || len > arr.length) len = arr.length;for (var i = 0, arr2 = new Array(len); i < len; i++) {arr2[i] = arr[i];}return arr2;}function _iterableToArrayLimit(arr, i) {if (typeof Symbol === "undefined" || !(Symbol.iterator in Object(arr))) return;var _arr = [];var _n = true;var _d = false;var _e = undefined;try {for (var _i = arr[Symbol.iterator](), _s; !(_n = (_s = _i.next()).done); _n = true) {_arr.push(_s.value);if (i && _arr.length === i) break;}} catch (err) {_d = true;_e = err;} finally {try {if (!_n && _i["return"] != null) _i["return"]();} finally {if (_d) throw _e;}}return _arr;}function _arrayWithHoles(arr) {if (Array.isArray(arr)) return arr;}function _classCallCheck(instance, Constructor) {if (!(instance instanceof Constructor)) {throw new TypeError("Cannot call a class as a function");}}function _defineProperties(target, props) {for (var i = 0; i < props.length; i++) {var descriptor = props[i];descriptor.enumerable = descriptor.enumerable || false;descriptor.configurable = true;if ("value" in descriptor) descriptor.writable = true;Object.defineProperty(target, descriptor.key, descriptor);}}function _createClass(Constructor, protoProps, staticProps) {if (protoProps) _defineProperties(Constructor.prototype, protoProps);if (staticProps) _defineProperties(Constructor, staticProps);return Constructor;}var isArray = Array.isArray;
var isObject = function isObject(val) {return val !== null && typeof val === 'object';};
var defaultDelimiters = ['{', '}'];var
BaseFormatter = /*#__PURE__*/function () {
  function BaseFormatter() {_classCallCheck(this, BaseFormatter);
    this._caches = Object.create(null);
  }_createClass(BaseFormatter, [{ key: "interpolate", value: function interpolate(
    message, values) {var delimiters = arguments.length > 2 && arguments[2] !== undefined ? arguments[2] : defaultDelimiters;
      if (!values) {
        return [message];
      }
      var tokens = this._caches[message];
      if (!tokens) {
        tokens = parse(message, delimiters);
        this._caches[message] = tokens;
      }
      return compile(tokens, values);
    } }]);return BaseFormatter;}();exports.Formatter = BaseFormatter;

var RE_TOKEN_LIST_VALUE = /^(?:\d)+/;
var RE_TOKEN_NAMED_VALUE = /^(?:\w)+/;
function parse(format, _ref) {var _ref2 = _slicedToArray(_ref, 2),startDelimiter = _ref2[0],endDelimiter = _ref2[1];
  var tokens = [];
  var position = 0;
  var text = '';
  while (position < format.length) {
    var char = format[position++];
    if (char === startDelimiter) {
      if (text) {
        tokens.push({ type: 'text', value: text });
      }
      text = '';
      var sub = '';
      char = format[position++];
      while (char !== undefined && char !== endDelimiter) {
        sub += char;
        char = format[position++];
      }
      var isClosed = char === endDelimiter;
      var type = RE_TOKEN_LIST_VALUE.test(sub) ?
      'list' :
      isClosed && RE_TOKEN_NAMED_VALUE.test(sub) ?
      'named' :
      'unknown';
      tokens.push({ value: sub, type: type });
    }
    //  else if (char === '%') {
    //   // when found rails i18n syntax, skip text capture
    //   if (format[position] !== '{') {
    //     text += char
    //   }
    // }
    else {
        text += char;
      }
  }
  text && tokens.push({ type: 'text', value: text });
  return tokens;
}
function compile(tokens, values) {
  var compiled = [];
  var index = 0;
  var mode = isArray(values) ?
  'list' :
  isObject(values) ?
  'named' :
  'unknown';
  if (mode === 'unknown') {
    return compiled;
  }
  while (index < tokens.length) {
    var token = tokens[index];
    switch (token.type) {
      case 'text':
        compiled.push(token.value);
        break;
      case 'list':
        compiled.push(values[parseInt(token.value, 10)]);
        break;
      case 'named':
        if (mode === 'named') {
          compiled.push(values[token.value]);
        } else
        {
          if (true) {
            console.warn("Type of token '".concat(token.type, "' and format of value '").concat(mode, "' don't match!"));
          }
        }
        break;
      case 'unknown':
        if (true) {
          console.warn("Detect 'unknown' type of token!");
        }
        break;}

    index++;
  }
  return compiled;
}

var LOCALE_ZH_HANS = 'zh-Hans';exports.LOCALE_ZH_HANS = LOCALE_ZH_HANS;
var LOCALE_ZH_HANT = 'zh-Hant';exports.LOCALE_ZH_HANT = LOCALE_ZH_HANT;
var LOCALE_EN = 'en';exports.LOCALE_EN = LOCALE_EN;
var LOCALE_FR = 'fr';exports.LOCALE_FR = LOCALE_FR;
var LOCALE_ES = 'es';exports.LOCALE_ES = LOCALE_ES;
var hasOwnProperty = Object.prototype.hasOwnProperty;
var hasOwn = function hasOwn(val, key) {return hasOwnProperty.call(val, key);};
var defaultFormatter = new BaseFormatter();
function include(str, parts) {
  return !!parts.find(function (part) {return str.indexOf(part) !== -1;});
}
function startsWith(str, parts) {
  return parts.find(function (part) {return str.indexOf(part) === 0;});
}
function normalizeLocale(locale, messages) {
  if (!locale) {
    return;
  }
  locale = locale.trim().replace(/_/g, '-');
  if (messages && messages[locale]) {
    return locale;
  }
  locale = locale.toLowerCase();
  if (locale.indexOf('zh') === 0) {
    if (locale.indexOf('-hans') > -1) {
      return LOCALE_ZH_HANS;
    }
    if (locale.indexOf('-hant') > -1) {
      return LOCALE_ZH_HANT;
    }
    if (include(locale, ['-tw', '-hk', '-mo', '-cht'])) {
      return LOCALE_ZH_HANT;
    }
    return LOCALE_ZH_HANS;
  }
  var lang = startsWith(locale, [LOCALE_EN, LOCALE_FR, LOCALE_ES]);
  if (lang) {
    return lang;
  }
}var
I18n = /*#__PURE__*/function () {
  function I18n(_ref3) {var locale = _ref3.locale,fallbackLocale = _ref3.fallbackLocale,messages = _ref3.messages,watcher = _ref3.watcher,formater = _ref3.formater;_classCallCheck(this, I18n);
    this.locale = LOCALE_EN;
    this.fallbackLocale = LOCALE_EN;
    this.message = {};
    this.messages = {};
    this.watchers = [];
    if (fallbackLocale) {
      this.fallbackLocale = fallbackLocale;
    }
    this.formater = formater || defaultFormatter;
    this.messages = messages || {};
    this.setLocale(locale || LOCALE_EN);
    if (watcher) {
      this.watchLocale(watcher);
    }
  }_createClass(I18n, [{ key: "setLocale", value: function setLocale(
    locale) {var _this = this;
      var oldLocale = this.locale;
      this.locale = normalizeLocale(locale, this.messages) || this.fallbackLocale;
      if (!this.messages[this.locale]) {
        // 可能初始化时不存在
        this.messages[this.locale] = {};
      }
      this.message = this.messages[this.locale];
      // 仅发生变化时，通知
      if (oldLocale !== this.locale) {
        this.watchers.forEach(function (watcher) {
          watcher(_this.locale, oldLocale);
        });
      }
    } }, { key: "getLocale", value: function getLocale()
    {
      return this.locale;
    } }, { key: "watchLocale", value: function watchLocale(
    fn) {var _this2 = this;
      var index = this.watchers.push(fn) - 1;
      return function () {
        _this2.watchers.splice(index, 1);
      };
    } }, { key: "add", value: function add(
    locale, message) {var override = arguments.length > 2 && arguments[2] !== undefined ? arguments[2] : true;
      var curMessages = this.messages[locale];
      if (curMessages) {
        if (override) {
          Object.assign(curMessages, message);
        } else
        {
          Object.keys(message).forEach(function (key) {
            if (!hasOwn(curMessages, key)) {
              curMessages[key] = message[key];
            }
          });
        }
      } else
      {
        this.messages[locale] = message;
      }
    } }, { key: "f", value: function f(
    message, values, delimiters) {
      return this.formater.interpolate(message, values, delimiters).join('');
    } }, { key: "t", value: function t(
    key, locale, values) {
      var message = this.message;
      if (typeof locale === 'string') {
        locale = normalizeLocale(locale, this.messages);
        locale && (message = this.messages[locale]);
      } else
      {
        values = locale;
      }
      if (!hasOwn(message, key)) {
        console.warn("Cannot translate the value of keypath ".concat(key, ". Use the value of keypath as default."));
        return key;
      }
      return this.formater.interpolate(message[key], values).join('');
    } }]);return I18n;}();exports.I18n = I18n;


function watchAppLocale(appVm, i18n) {
  // 需要保证 watch 的触发在组件渲染之前
  if (appVm.$watchLocale) {
    // vue2
    appVm.$watchLocale(function (newLocale) {
      i18n.setLocale(newLocale);
    });
  } else
  {
    appVm.$watch(function () {return appVm.$locale;}, function (newLocale) {
      i18n.setLocale(newLocale);
    });
  }
}
function getDefaultLocale() {
  if (typeof uni !== 'undefined' && uni.getLocale) {
    return uni.getLocale();
  }
  // 小程序平台，uni 和 uni-i18n 互相引用，导致访问不到 uni，故在 global 上挂了 getLocale
  if (typeof global !== 'undefined' && global.getLocale) {
    return global.getLocale();
  }
  return LOCALE_EN;
}
function initVueI18n(locale) {var messages = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : {};var fallbackLocale = arguments.length > 2 ? arguments[2] : undefined;var watcher = arguments.length > 3 ? arguments[3] : undefined;
  // 兼容旧版本入参
  if (typeof locale !== 'string') {var _ref4 =
    [
    messages,
    locale];locale = _ref4[0];messages = _ref4[1];

  }
  if (typeof locale !== 'string') {
    // 因为小程序平台，uni-i18n 和 uni 互相引用，导致此时访问 uni 时，为 undefined
    locale = getDefaultLocale();
  }
  if (typeof fallbackLocale !== 'string') {
    fallbackLocale =
    typeof __uniConfig !== 'undefined' && __uniConfig.fallbackLocale ||
    LOCALE_EN;
  }
  var i18n = new I18n({
    locale: locale,
    fallbackLocale: fallbackLocale,
    messages: messages,
    watcher: watcher });

  var _t = function t(key, values) {
    if (typeof getApp !== 'function') {
      // app view
      /* eslint-disable no-func-assign */
      _t = function t(key, values) {
        return i18n.t(key, values);
      };
    } else
    {
      var isWatchedAppLocale = false;
      _t = function t(key, values) {
        var appVm = getApp().$vm;
        // 可能$vm还不存在，比如在支付宝小程序中，组件定义较早，在props的default里使用了t()函数（如uni-goods-nav），此时app还未初始化
        // options: {
        // 	type: Array,
        // 	default () {
        // 		return [{
        // 			icon: 'shop',
        // 			text: t("uni-goods-nav.options.shop"),
        // 		}, {
        // 			icon: 'cart',
        // 			text: t("uni-goods-nav.options.cart")
        // 		}]
        // 	}
        // },
        if (appVm) {
          // 触发响应式
          appVm.$locale;
          if (!isWatchedAppLocale) {
            isWatchedAppLocale = true;
            watchAppLocale(appVm, i18n);
          }
        }
        return i18n.t(key, values);
      };
    }
    return _t(key, values);
  };
  return {
    i18n: i18n,
    f: function f(message, values, delimiters) {
      return i18n.f(message, values, delimiters);
    },
    t: function t(key, values) {
      return _t(key, values);
    },
    add: function add(locale, message) {var override = arguments.length > 2 && arguments[2] !== undefined ? arguments[2] : true;
      return i18n.add(locale, message, override);
    },
    watch: function watch(fn) {
      return i18n.watchLocale(fn);
    },
    getLocale: function getLocale() {
      return i18n.getLocale();
    },
    setLocale: function setLocale(newLocale) {
      return i18n.setLocale(newLocale);
    } };

}

var isString = function isString(val) {return typeof val === 'string';};exports.isString = isString;
var formater;
function hasI18nJson(jsonObj, delimiters) {
  if (!formater) {
    formater = new BaseFormatter();
  }
  return walkJsonObj(jsonObj, function (jsonObj, key) {
    var value = jsonObj[key];
    if (isString(value)) {
      if (isI18nStr(value, delimiters)) {
        return true;
      }
    } else
    {
      return hasI18nJson(value, delimiters);
    }
  });
}
function parseI18nJson(jsonObj, values, delimiters) {
  if (!formater) {
    formater = new BaseFormatter();
  }
  walkJsonObj(jsonObj, function (jsonObj, key) {
    var value = jsonObj[key];
    if (isString(value)) {
      if (isI18nStr(value, delimiters)) {
        jsonObj[key] = compileStr(value, values, delimiters);
      }
    } else
    {
      parseI18nJson(value, values, delimiters);
    }
  });
  return jsonObj;
}
function compileI18nJsonStr(jsonStr, _ref5) {var locale = _ref5.locale,locales = _ref5.locales,delimiters = _ref5.delimiters;
  if (!isI18nStr(jsonStr, delimiters)) {
    return jsonStr;
  }
  if (!formater) {
    formater = new BaseFormatter();
  }
  var localeValues = [];
  Object.keys(locales).forEach(function (name) {
    if (name !== locale) {
      localeValues.push({
        locale: name,
        values: locales[name] });

    }
  });
  localeValues.unshift({ locale: locale, values: locales[locale] });
  try {
    return JSON.stringify(compileJsonObj(JSON.parse(jsonStr), localeValues, delimiters), null, 2);
  }
  catch (e) {}
  return jsonStr;
}
function isI18nStr(value, delimiters) {
  return value.indexOf(delimiters[0]) > -1;
}
function compileStr(value, values, delimiters) {
  return formater.interpolate(value, values, delimiters).join('');
}
function compileValue(jsonObj, key, localeValues, delimiters) {
  var value = jsonObj[key];
  if (isString(value)) {
    // 存在国际化
    if (isI18nStr(value, delimiters)) {
      jsonObj[key] = compileStr(value, localeValues[0].values, delimiters);
      if (localeValues.length > 1) {
        // 格式化国际化语言
        var valueLocales = jsonObj[key + 'Locales'] = {};
        localeValues.forEach(function (localValue) {
          valueLocales[localValue.locale] = compileStr(value, localValue.values, delimiters);
        });
      }
    }
  } else
  {
    compileJsonObj(value, localeValues, delimiters);
  }
}
function compileJsonObj(jsonObj, localeValues, delimiters) {
  walkJsonObj(jsonObj, function (jsonObj, key) {
    compileValue(jsonObj, key, localeValues, delimiters);
  });
  return jsonObj;
}
function walkJsonObj(jsonObj, walk) {
  if (isArray(jsonObj)) {
    for (var i = 0; i < jsonObj.length; i++) {
      if (walk(jsonObj, i)) {
        return true;
      }
    }
  } else
  if (isObject(jsonObj)) {
    for (var key in jsonObj) {
      if (walk(jsonObj, key)) {
        return true;
      }
    }
  }
  return false;
}

function resolveLocale(locales) {
  return function (locale) {
    if (!locale) {
      return locale;
    }
    locale = normalizeLocale(locale) || locale;
    return resolveLocaleChain(locale).find(function (locale) {return locales.indexOf(locale) > -1;});
  };
}
function resolveLocaleChain(locale) {
  var chain = [];
  var tokens = locale.split('-');
  while (tokens.length) {
    chain.push(tokens.join('-'));
    tokens.pop();
  }
  return chain;
}
/* WEBPACK VAR INJECTION */}.call(this, __webpack_require__(/*! ./node_modules/@dcloudio/uni-mp-weixin/dist/index.js */ 1)["default"], __webpack_require__(/*! ./../../../webpack/buildin/global.js */ 2)))

/***/ }),

/***/ 47:
/*!**********************************************************!*\
  !*** ./node_modules/@babel/runtime/regenerator/index.js ***!
  \**********************************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

module.exports = __webpack_require__(/*! regenerator-runtime */ 48);

/***/ }),

/***/ 48:
/*!************************************************************!*\
  !*** ./node_modules/regenerator-runtime/runtime-module.js ***!
  \************************************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

/**
 * Copyright (c) 2014-present, Facebook, Inc.
 *
 * This source code is licensed under the MIT license found in the
 * LICENSE file in the root directory of this source tree.
 */

// This method of obtaining a reference to the global object needs to be
// kept identical to the way it is obtained in runtime.js
var g = (function() {
  return this || (typeof self === "object" && self);
})() || Function("return this")();

// Use `getOwnPropertyNames` because not all browsers support calling
// `hasOwnProperty` on the global `self` object in a worker. See #183.
var hadRuntime = g.regeneratorRuntime &&
  Object.getOwnPropertyNames(g).indexOf("regeneratorRuntime") >= 0;

// Save the old regeneratorRuntime in case it needs to be restored later.
var oldRuntime = hadRuntime && g.regeneratorRuntime;

// Force reevalutation of runtime.js.
g.regeneratorRuntime = undefined;

module.exports = __webpack_require__(/*! ./runtime */ 49);

if (hadRuntime) {
  // Restore the original runtime.
  g.regeneratorRuntime = oldRuntime;
} else {
  // Remove the global property added by runtime.js.
  try {
    delete g.regeneratorRuntime;
  } catch(e) {
    g.regeneratorRuntime = undefined;
  }
}


/***/ }),

/***/ 49:
/*!*****************************************************!*\
  !*** ./node_modules/regenerator-runtime/runtime.js ***!
  \*****************************************************/
/*! no static exports found */
/***/ (function(module, exports) {

/**
 * Copyright (c) 2014-present, Facebook, Inc.
 *
 * This source code is licensed under the MIT license found in the
 * LICENSE file in the root directory of this source tree.
 */

!(function(global) {
  "use strict";

  var Op = Object.prototype;
  var hasOwn = Op.hasOwnProperty;
  var undefined; // More compressible than void 0.
  var $Symbol = typeof Symbol === "function" ? Symbol : {};
  var iteratorSymbol = $Symbol.iterator || "@@iterator";
  var asyncIteratorSymbol = $Symbol.asyncIterator || "@@asyncIterator";
  var toStringTagSymbol = $Symbol.toStringTag || "@@toStringTag";

  var inModule = typeof module === "object";
  var runtime = global.regeneratorRuntime;
  if (runtime) {
    if (inModule) {
      // If regeneratorRuntime is defined globally and we're in a module,
      // make the exports object identical to regeneratorRuntime.
      module.exports = runtime;
    }
    // Don't bother evaluating the rest of this file if the runtime was
    // already defined globally.
    return;
  }

  // Define the runtime globally (as expected by generated code) as either
  // module.exports (if we're in a module) or a new, empty object.
  runtime = global.regeneratorRuntime = inModule ? module.exports : {};

  function wrap(innerFn, outerFn, self, tryLocsList) {
    // If outerFn provided and outerFn.prototype is a Generator, then outerFn.prototype instanceof Generator.
    var protoGenerator = outerFn && outerFn.prototype instanceof Generator ? outerFn : Generator;
    var generator = Object.create(protoGenerator.prototype);
    var context = new Context(tryLocsList || []);

    // The ._invoke method unifies the implementations of the .next,
    // .throw, and .return methods.
    generator._invoke = makeInvokeMethod(innerFn, self, context);

    return generator;
  }
  runtime.wrap = wrap;

  // Try/catch helper to minimize deoptimizations. Returns a completion
  // record like context.tryEntries[i].completion. This interface could
  // have been (and was previously) designed to take a closure to be
  // invoked without arguments, but in all the cases we care about we
  // already have an existing method we want to call, so there's no need
  // to create a new function object. We can even get away with assuming
  // the method takes exactly one argument, since that happens to be true
  // in every case, so we don't have to touch the arguments object. The
  // only additional allocation required is the completion record, which
  // has a stable shape and so hopefully should be cheap to allocate.
  function tryCatch(fn, obj, arg) {
    try {
      return { type: "normal", arg: fn.call(obj, arg) };
    } catch (err) {
      return { type: "throw", arg: err };
    }
  }

  var GenStateSuspendedStart = "suspendedStart";
  var GenStateSuspendedYield = "suspendedYield";
  var GenStateExecuting = "executing";
  var GenStateCompleted = "completed";

  // Returning this object from the innerFn has the same effect as
  // breaking out of the dispatch switch statement.
  var ContinueSentinel = {};

  // Dummy constructor functions that we use as the .constructor and
  // .constructor.prototype properties for functions that return Generator
  // objects. For full spec compliance, you may wish to configure your
  // minifier not to mangle the names of these two functions.
  function Generator() {}
  function GeneratorFunction() {}
  function GeneratorFunctionPrototype() {}

  // This is a polyfill for %IteratorPrototype% for environments that
  // don't natively support it.
  var IteratorPrototype = {};
  IteratorPrototype[iteratorSymbol] = function () {
    return this;
  };

  var getProto = Object.getPrototypeOf;
  var NativeIteratorPrototype = getProto && getProto(getProto(values([])));
  if (NativeIteratorPrototype &&
      NativeIteratorPrototype !== Op &&
      hasOwn.call(NativeIteratorPrototype, iteratorSymbol)) {
    // This environment has a native %IteratorPrototype%; use it instead
    // of the polyfill.
    IteratorPrototype = NativeIteratorPrototype;
  }

  var Gp = GeneratorFunctionPrototype.prototype =
    Generator.prototype = Object.create(IteratorPrototype);
  GeneratorFunction.prototype = Gp.constructor = GeneratorFunctionPrototype;
  GeneratorFunctionPrototype.constructor = GeneratorFunction;
  GeneratorFunctionPrototype[toStringTagSymbol] =
    GeneratorFunction.displayName = "GeneratorFunction";

  // Helper for defining the .next, .throw, and .return methods of the
  // Iterator interface in terms of a single ._invoke method.
  function defineIteratorMethods(prototype) {
    ["next", "throw", "return"].forEach(function(method) {
      prototype[method] = function(arg) {
        return this._invoke(method, arg);
      };
    });
  }

  runtime.isGeneratorFunction = function(genFun) {
    var ctor = typeof genFun === "function" && genFun.constructor;
    return ctor
      ? ctor === GeneratorFunction ||
        // For the native GeneratorFunction constructor, the best we can
        // do is to check its .name property.
        (ctor.displayName || ctor.name) === "GeneratorFunction"
      : false;
  };

  runtime.mark = function(genFun) {
    if (Object.setPrototypeOf) {
      Object.setPrototypeOf(genFun, GeneratorFunctionPrototype);
    } else {
      genFun.__proto__ = GeneratorFunctionPrototype;
      if (!(toStringTagSymbol in genFun)) {
        genFun[toStringTagSymbol] = "GeneratorFunction";
      }
    }
    genFun.prototype = Object.create(Gp);
    return genFun;
  };

  // Within the body of any async function, `await x` is transformed to
  // `yield regeneratorRuntime.awrap(x)`, so that the runtime can test
  // `hasOwn.call(value, "__await")` to determine if the yielded value is
  // meant to be awaited.
  runtime.awrap = function(arg) {
    return { __await: arg };
  };

  function AsyncIterator(generator) {
    function invoke(method, arg, resolve, reject) {
      var record = tryCatch(generator[method], generator, arg);
      if (record.type === "throw") {
        reject(record.arg);
      } else {
        var result = record.arg;
        var value = result.value;
        if (value &&
            typeof value === "object" &&
            hasOwn.call(value, "__await")) {
          return Promise.resolve(value.__await).then(function(value) {
            invoke("next", value, resolve, reject);
          }, function(err) {
            invoke("throw", err, resolve, reject);
          });
        }

        return Promise.resolve(value).then(function(unwrapped) {
          // When a yielded Promise is resolved, its final value becomes
          // the .value of the Promise<{value,done}> result for the
          // current iteration.
          result.value = unwrapped;
          resolve(result);
        }, function(error) {
          // If a rejected Promise was yielded, throw the rejection back
          // into the async generator function so it can be handled there.
          return invoke("throw", error, resolve, reject);
        });
      }
    }

    var previousPromise;

    function enqueue(method, arg) {
      function callInvokeWithMethodAndArg() {
        return new Promise(function(resolve, reject) {
          invoke(method, arg, resolve, reject);
        });
      }

      return previousPromise =
        // If enqueue has been called before, then we want to wait until
        // all previous Promises have been resolved before calling invoke,
        // so that results are always delivered in the correct order. If
        // enqueue has not been called before, then it is important to
        // call invoke immediately, without waiting on a callback to fire,
        // so that the async generator function has the opportunity to do
        // any necessary setup in a predictable way. This predictability
        // is why the Promise constructor synchronously invokes its
        // executor callback, and why async functions synchronously
        // execute code before the first await. Since we implement simple
        // async functions in terms of async generators, it is especially
        // important to get this right, even though it requires care.
        previousPromise ? previousPromise.then(
          callInvokeWithMethodAndArg,
          // Avoid propagating failures to Promises returned by later
          // invocations of the iterator.
          callInvokeWithMethodAndArg
        ) : callInvokeWithMethodAndArg();
    }

    // Define the unified helper method that is used to implement .next,
    // .throw, and .return (see defineIteratorMethods).
    this._invoke = enqueue;
  }

  defineIteratorMethods(AsyncIterator.prototype);
  AsyncIterator.prototype[asyncIteratorSymbol] = function () {
    return this;
  };
  runtime.AsyncIterator = AsyncIterator;

  // Note that simple async functions are implemented on top of
  // AsyncIterator objects; they just return a Promise for the value of
  // the final result produced by the iterator.
  runtime.async = function(innerFn, outerFn, self, tryLocsList) {
    var iter = new AsyncIterator(
      wrap(innerFn, outerFn, self, tryLocsList)
    );

    return runtime.isGeneratorFunction(outerFn)
      ? iter // If outerFn is a generator, return the full iterator.
      : iter.next().then(function(result) {
          return result.done ? result.value : iter.next();
        });
  };

  function makeInvokeMethod(innerFn, self, context) {
    var state = GenStateSuspendedStart;

    return function invoke(method, arg) {
      if (state === GenStateExecuting) {
        throw new Error("Generator is already running");
      }

      if (state === GenStateCompleted) {
        if (method === "throw") {
          throw arg;
        }

        // Be forgiving, per 25.3.3.3.3 of the spec:
        // https://people.mozilla.org/~jorendorff/es6-draft.html#sec-generatorresume
        return doneResult();
      }

      context.method = method;
      context.arg = arg;

      while (true) {
        var delegate = context.delegate;
        if (delegate) {
          var delegateResult = maybeInvokeDelegate(delegate, context);
          if (delegateResult) {
            if (delegateResult === ContinueSentinel) continue;
            return delegateResult;
          }
        }

        if (context.method === "next") {
          // Setting context._sent for legacy support of Babel's
          // function.sent implementation.
          context.sent = context._sent = context.arg;

        } else if (context.method === "throw") {
          if (state === GenStateSuspendedStart) {
            state = GenStateCompleted;
            throw context.arg;
          }

          context.dispatchException(context.arg);

        } else if (context.method === "return") {
          context.abrupt("return", context.arg);
        }

        state = GenStateExecuting;

        var record = tryCatch(innerFn, self, context);
        if (record.type === "normal") {
          // If an exception is thrown from innerFn, we leave state ===
          // GenStateExecuting and loop back for another invocation.
          state = context.done
            ? GenStateCompleted
            : GenStateSuspendedYield;

          if (record.arg === ContinueSentinel) {
            continue;
          }

          return {
            value: record.arg,
            done: context.done
          };

        } else if (record.type === "throw") {
          state = GenStateCompleted;
          // Dispatch the exception by looping back around to the
          // context.dispatchException(context.arg) call above.
          context.method = "throw";
          context.arg = record.arg;
        }
      }
    };
  }

  // Call delegate.iterator[context.method](context.arg) and handle the
  // result, either by returning a { value, done } result from the
  // delegate iterator, or by modifying context.method and context.arg,
  // setting context.delegate to null, and returning the ContinueSentinel.
  function maybeInvokeDelegate(delegate, context) {
    var method = delegate.iterator[context.method];
    if (method === undefined) {
      // A .throw or .return when the delegate iterator has no .throw
      // method always terminates the yield* loop.
      context.delegate = null;

      if (context.method === "throw") {
        if (delegate.iterator.return) {
          // If the delegate iterator has a return method, give it a
          // chance to clean up.
          context.method = "return";
          context.arg = undefined;
          maybeInvokeDelegate(delegate, context);

          if (context.method === "throw") {
            // If maybeInvokeDelegate(context) changed context.method from
            // "return" to "throw", let that override the TypeError below.
            return ContinueSentinel;
          }
        }

        context.method = "throw";
        context.arg = new TypeError(
          "The iterator does not provide a 'throw' method");
      }

      return ContinueSentinel;
    }

    var record = tryCatch(method, delegate.iterator, context.arg);

    if (record.type === "throw") {
      context.method = "throw";
      context.arg = record.arg;
      context.delegate = null;
      return ContinueSentinel;
    }

    var info = record.arg;

    if (! info) {
      context.method = "throw";
      context.arg = new TypeError("iterator result is not an object");
      context.delegate = null;
      return ContinueSentinel;
    }

    if (info.done) {
      // Assign the result of the finished delegate to the temporary
      // variable specified by delegate.resultName (see delegateYield).
      context[delegate.resultName] = info.value;

      // Resume execution at the desired location (see delegateYield).
      context.next = delegate.nextLoc;

      // If context.method was "throw" but the delegate handled the
      // exception, let the outer generator proceed normally. If
      // context.method was "next", forget context.arg since it has been
      // "consumed" by the delegate iterator. If context.method was
      // "return", allow the original .return call to continue in the
      // outer generator.
      if (context.method !== "return") {
        context.method = "next";
        context.arg = undefined;
      }

    } else {
      // Re-yield the result returned by the delegate method.
      return info;
    }

    // The delegate iterator is finished, so forget it and continue with
    // the outer generator.
    context.delegate = null;
    return ContinueSentinel;
  }

  // Define Generator.prototype.{next,throw,return} in terms of the
  // unified ._invoke helper method.
  defineIteratorMethods(Gp);

  Gp[toStringTagSymbol] = "Generator";

  // A Generator should always return itself as the iterator object when the
  // @@iterator function is called on it. Some browsers' implementations of the
  // iterator prototype chain incorrectly implement this, causing the Generator
  // object to not be returned from this call. This ensures that doesn't happen.
  // See https://github.com/facebook/regenerator/issues/274 for more details.
  Gp[iteratorSymbol] = function() {
    return this;
  };

  Gp.toString = function() {
    return "[object Generator]";
  };

  function pushTryEntry(locs) {
    var entry = { tryLoc: locs[0] };

    if (1 in locs) {
      entry.catchLoc = locs[1];
    }

    if (2 in locs) {
      entry.finallyLoc = locs[2];
      entry.afterLoc = locs[3];
    }

    this.tryEntries.push(entry);
  }

  function resetTryEntry(entry) {
    var record = entry.completion || {};
    record.type = "normal";
    delete record.arg;
    entry.completion = record;
  }

  function Context(tryLocsList) {
    // The root entry object (effectively a try statement without a catch
    // or a finally block) gives us a place to store values thrown from
    // locations where there is no enclosing try statement.
    this.tryEntries = [{ tryLoc: "root" }];
    tryLocsList.forEach(pushTryEntry, this);
    this.reset(true);
  }

  runtime.keys = function(object) {
    var keys = [];
    for (var key in object) {
      keys.push(key);
    }
    keys.reverse();

    // Rather than returning an object with a next method, we keep
    // things simple and return the next function itself.
    return function next() {
      while (keys.length) {
        var key = keys.pop();
        if (key in object) {
          next.value = key;
          next.done = false;
          return next;
        }
      }

      // To avoid creating an additional object, we just hang the .value
      // and .done properties off the next function object itself. This
      // also ensures that the minifier will not anonymize the function.
      next.done = true;
      return next;
    };
  };

  function values(iterable) {
    if (iterable) {
      var iteratorMethod = iterable[iteratorSymbol];
      if (iteratorMethod) {
        return iteratorMethod.call(iterable);
      }

      if (typeof iterable.next === "function") {
        return iterable;
      }

      if (!isNaN(iterable.length)) {
        var i = -1, next = function next() {
          while (++i < iterable.length) {
            if (hasOwn.call(iterable, i)) {
              next.value = iterable[i];
              next.done = false;
              return next;
            }
          }

          next.value = undefined;
          next.done = true;

          return next;
        };

        return next.next = next;
      }
    }

    // Return an iterator with no values.
    return { next: doneResult };
  }
  runtime.values = values;

  function doneResult() {
    return { value: undefined, done: true };
  }

  Context.prototype = {
    constructor: Context,

    reset: function(skipTempReset) {
      this.prev = 0;
      this.next = 0;
      // Resetting context._sent for legacy support of Babel's
      // function.sent implementation.
      this.sent = this._sent = undefined;
      this.done = false;
      this.delegate = null;

      this.method = "next";
      this.arg = undefined;

      this.tryEntries.forEach(resetTryEntry);

      if (!skipTempReset) {
        for (var name in this) {
          // Not sure about the optimal order of these conditions:
          if (name.charAt(0) === "t" &&
              hasOwn.call(this, name) &&
              !isNaN(+name.slice(1))) {
            this[name] = undefined;
          }
        }
      }
    },

    stop: function() {
      this.done = true;

      var rootEntry = this.tryEntries[0];
      var rootRecord = rootEntry.completion;
      if (rootRecord.type === "throw") {
        throw rootRecord.arg;
      }

      return this.rval;
    },

    dispatchException: function(exception) {
      if (this.done) {
        throw exception;
      }

      var context = this;
      function handle(loc, caught) {
        record.type = "throw";
        record.arg = exception;
        context.next = loc;

        if (caught) {
          // If the dispatched exception was caught by a catch block,
          // then let that catch block handle the exception normally.
          context.method = "next";
          context.arg = undefined;
        }

        return !! caught;
      }

      for (var i = this.tryEntries.length - 1; i >= 0; --i) {
        var entry = this.tryEntries[i];
        var record = entry.completion;

        if (entry.tryLoc === "root") {
          // Exception thrown outside of any try block that could handle
          // it, so set the completion value of the entire function to
          // throw the exception.
          return handle("end");
        }

        if (entry.tryLoc <= this.prev) {
          var hasCatch = hasOwn.call(entry, "catchLoc");
          var hasFinally = hasOwn.call(entry, "finallyLoc");

          if (hasCatch && hasFinally) {
            if (this.prev < entry.catchLoc) {
              return handle(entry.catchLoc, true);
            } else if (this.prev < entry.finallyLoc) {
              return handle(entry.finallyLoc);
            }

          } else if (hasCatch) {
            if (this.prev < entry.catchLoc) {
              return handle(entry.catchLoc, true);
            }

          } else if (hasFinally) {
            if (this.prev < entry.finallyLoc) {
              return handle(entry.finallyLoc);
            }

          } else {
            throw new Error("try statement without catch or finally");
          }
        }
      }
    },

    abrupt: function(type, arg) {
      for (var i = this.tryEntries.length - 1; i >= 0; --i) {
        var entry = this.tryEntries[i];
        if (entry.tryLoc <= this.prev &&
            hasOwn.call(entry, "finallyLoc") &&
            this.prev < entry.finallyLoc) {
          var finallyEntry = entry;
          break;
        }
      }

      if (finallyEntry &&
          (type === "break" ||
           type === "continue") &&
          finallyEntry.tryLoc <= arg &&
          arg <= finallyEntry.finallyLoc) {
        // Ignore the finally entry if control is not jumping to a
        // location outside the try/catch block.
        finallyEntry = null;
      }

      var record = finallyEntry ? finallyEntry.completion : {};
      record.type = type;
      record.arg = arg;

      if (finallyEntry) {
        this.method = "next";
        this.next = finallyEntry.finallyLoc;
        return ContinueSentinel;
      }

      return this.complete(record);
    },

    complete: function(record, afterLoc) {
      if (record.type === "throw") {
        throw record.arg;
      }

      if (record.type === "break" ||
          record.type === "continue") {
        this.next = record.arg;
      } else if (record.type === "return") {
        this.rval = this.arg = record.arg;
        this.method = "return";
        this.next = "end";
      } else if (record.type === "normal" && afterLoc) {
        this.next = afterLoc;
      }

      return ContinueSentinel;
    },

    finish: function(finallyLoc) {
      for (var i = this.tryEntries.length - 1; i >= 0; --i) {
        var entry = this.tryEntries[i];
        if (entry.finallyLoc === finallyLoc) {
          this.complete(entry.completion, entry.afterLoc);
          resetTryEntry(entry);
          return ContinueSentinel;
        }
      }
    },

    "catch": function(tryLoc) {
      for (var i = this.tryEntries.length - 1; i >= 0; --i) {
        var entry = this.tryEntries[i];
        if (entry.tryLoc === tryLoc) {
          var record = entry.completion;
          if (record.type === "throw") {
            var thrown = record.arg;
            resetTryEntry(entry);
          }
          return thrown;
        }
      }

      // The context.catch method must only be called with a location
      // argument that corresponds to a known catch block.
      throw new Error("illegal catch attempt");
    },

    delegateYield: function(iterable, resultName, nextLoc) {
      this.delegate = {
        iterator: values(iterable),
        resultName: resultName,
        nextLoc: nextLoc
      };

      if (this.method === "next") {
        // Deliberately forget the last sent value so that we don't
        // accidentally pass it on to the delegate.
        this.arg = undefined;
      }

      return ContinueSentinel;
    }
  };
})(
  // In sloppy mode, unbound `this` refers to the global object, fallback to
  // Function constructor if we're in global strict mode. That is sadly a form
  // of indirect eval which violates Content Security Policy.
  (function() {
    return this || (typeof self === "object" && self);
  })() || Function("return this")()
);


/***/ }),

/***/ 5:
/*!************************************************************************!*\
  !*** C:/Users/what/Downloads/GarbageClassify_frontend-main/pages.json ***!
  \************************************************************************/
/*! no static exports found */
/***/ (function(module, exports) {



/***/ })

}]);
//# sourceMappingURL=../../.sourcemap/mp-weixin/common/vendor.js.map