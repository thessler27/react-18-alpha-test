/******/ (function(modules) { // webpackBootstrap
/******/ 	// The module cache
/******/ 	var installedModules = {};
/******/
/******/ 	// The require function
/******/ 	function __webpack_require__(moduleId) {
/******/
/******/ 		// Check if module is in cache
/******/ 		if(installedModules[moduleId]) {
/******/ 			return installedModules[moduleId].exports;
/******/ 		}
/******/ 		// Create a new module (and put it into the cache)
/******/ 		var module = installedModules[moduleId] = {
/******/ 			i: moduleId,
/******/ 			l: false,
/******/ 			exports: {}
/******/ 		};
/******/
/******/ 		// Execute the module function
/******/ 		modules[moduleId].call(module.exports, module, module.exports, __webpack_require__);
/******/
/******/ 		// Flag the module as loaded
/******/ 		module.l = true;
/******/
/******/ 		// Return the exports of the module
/******/ 		return module.exports;
/******/ 	}
/******/
/******/
/******/ 	// expose the modules object (__webpack_modules__)
/******/ 	__webpack_require__.m = modules;
/******/
/******/ 	// expose the module cache
/******/ 	__webpack_require__.c = installedModules;
/******/
/******/ 	// define getter function for harmony exports
/******/ 	__webpack_require__.d = function(exports, name, getter) {
/******/ 		if(!__webpack_require__.o(exports, name)) {
/******/ 			Object.defineProperty(exports, name, { enumerable: true, get: getter });
/******/ 		}
/******/ 	};
/******/
/******/ 	// define __esModule on exports
/******/ 	__webpack_require__.r = function(exports) {
/******/ 		if(typeof Symbol !== 'undefined' && Symbol.toStringTag) {
/******/ 			Object.defineProperty(exports, Symbol.toStringTag, { value: 'Module' });
/******/ 		}
/******/ 		Object.defineProperty(exports, '__esModule', { value: true });
/******/ 	};
/******/
/******/ 	// create a fake namespace object
/******/ 	// mode & 1: value is a module id, require it
/******/ 	// mode & 2: merge all properties of value into the ns
/******/ 	// mode & 4: return value when already ns object
/******/ 	// mode & 8|1: behave like require
/******/ 	__webpack_require__.t = function(value, mode) {
/******/ 		if(mode & 1) value = __webpack_require__(value);
/******/ 		if(mode & 8) return value;
/******/ 		if((mode & 4) && typeof value === 'object' && value && value.__esModule) return value;
/******/ 		var ns = Object.create(null);
/******/ 		__webpack_require__.r(ns);
/******/ 		Object.defineProperty(ns, 'default', { enumerable: true, value: value });
/******/ 		if(mode & 2 && typeof value != 'string') for(var key in value) __webpack_require__.d(ns, key, function(key) { return value[key]; }.bind(null, key));
/******/ 		return ns;
/******/ 	};
/******/
/******/ 	// getDefaultExport function for compatibility with non-harmony modules
/******/ 	__webpack_require__.n = function(module) {
/******/ 		var getter = module && module.__esModule ?
/******/ 			function getDefault() { return module['default']; } :
/******/ 			function getModuleExports() { return module; };
/******/ 		__webpack_require__.d(getter, 'a', getter);
/******/ 		return getter;
/******/ 	};
/******/
/******/ 	// Object.prototype.hasOwnProperty.call
/******/ 	__webpack_require__.o = function(object, property) { return Object.prototype.hasOwnProperty.call(object, property); };
/******/
/******/ 	// __webpack_public_path__
/******/ 	__webpack_require__.p = "";
/******/
/******/
/******/ 	// Load entry module and return exports
/******/ 	return __webpack_require__(__webpack_require__.s = "./server/index.js");
/******/ })
/************************************************************************/
/******/ ({

/***/ "./node_modules/@babel/register/lib/cache.js":
/*!***************************************************!*\
  !*** ./node_modules/@babel/register/lib/cache.js ***!
  \***************************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

"use strict";
eval("\n\nObject.defineProperty(exports, \"__esModule\", {\n  value: true\n});\nexports.clear = clear;\nexports.get = get;\nexports.load = load;\nexports.save = save;\nexports.setDirty = setDirty;\n\nvar _path = __webpack_require__(/*! path */ \"path\");\n\nvar _fs = __webpack_require__(/*! fs */ \"fs\");\n\nvar _os = __webpack_require__(/*! os */ \"os\");\n\nvar babel = __webpack_require__(/*! @babel/core */ \"@babel/core\");\n\nvar _findCacheDir = __webpack_require__(/*! find-cache-dir */ \"find-cache-dir\");\n\nconst DEFAULT_CACHE_DIR = _findCacheDir({\n  name: \"@babel/register\"\n}) || _os.homedir() || _os.tmpdir();\n\nconst DEFAULT_FILENAME = _path.join(DEFAULT_CACHE_DIR, `.babel.${babel.version}.${babel.getEnv()}.json`);\n\nconst FILENAME = process.env.BABEL_CACHE_PATH || DEFAULT_FILENAME;\nlet data = {};\nlet cacheDirty = false;\nlet cacheDisabled = false;\n\nfunction isCacheDisabled() {\n  var _process$env$BABEL_DI;\n\n  return (_process$env$BABEL_DI = process.env.BABEL_DISABLE_CACHE) != null ? _process$env$BABEL_DI : cacheDisabled;\n}\n\nfunction save() {\n  if (isCacheDisabled() || !cacheDirty) return;\n  cacheDirty = false;\n  let serialised = \"{}\";\n\n  try {\n    serialised = JSON.stringify(data, null, \"  \");\n  } catch (err) {\n    if (err.message === \"Invalid string length\") {\n      err.message = \"Cache too large so it's been cleared.\";\n      console.error(err.stack);\n    } else {\n      throw err;\n    }\n  }\n\n  try {\n    (((v, w) => (v = v.split(\".\"), w = w.split(\".\"), +v[0] > +w[0] || v[0] == w[0] && +v[1] >= +w[1]))(process.versions.node, \"10.12\") ? _fs.mkdirSync : __webpack_require__(/*! make-dir */ \"make-dir\").sync)(_path.dirname(FILENAME), {\n      recursive: true\n    });\n\n    _fs.writeFileSync(FILENAME, serialised);\n  } catch (e) {\n    switch (e.code) {\n      case \"ENOENT\":\n      case \"EACCES\":\n      case \"EPERM\":\n        console.warn(`Babel could not write cache to file: ${FILENAME}\ndue to a permission issue. Cache is disabled.`);\n        cacheDisabled = true;\n        break;\n\n      case \"EROFS\":\n        console.warn(`Babel could not write cache to file: ${FILENAME}\nbecause it resides in a readonly filesystem. Cache is disabled.`);\n        cacheDisabled = true;\n        break;\n\n      default:\n        throw e;\n    }\n  }\n}\n\nfunction load() {\n  if (isCacheDisabled()) {\n    data = {};\n    return;\n  }\n\n  process.on(\"exit\", save);\n  process.nextTick(save);\n  let cacheContent;\n\n  try {\n    cacheContent = _fs.readFileSync(FILENAME);\n  } catch (e) {\n    switch (e.code) {\n      case \"EACCES\":\n        console.warn(`Babel could not read cache file: ${FILENAME}\ndue to a permission issue. Cache is disabled.`);\n        cacheDisabled = true;\n\n      default:\n        return;\n    }\n  }\n\n  try {\n    data = JSON.parse(cacheContent);\n  } catch (_unused) {}\n}\n\nfunction get() {\n  return data;\n}\n\nfunction setDirty() {\n  cacheDirty = true;\n}\n\nfunction clear() {\n  data = {};\n}\n\n//# sourceURL=webpack:///./node_modules/@babel/register/lib/cache.js?");

/***/ }),

/***/ "./node_modules/@babel/register/lib/index.js":
/*!***************************************************!*\
  !*** ./node_modules/@babel/register/lib/index.js ***!
  \***************************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

eval("exports = module.exports = function (...args) {\n  return register(...args);\n};\n\nexports.__esModule = true;\n\nconst node = __webpack_require__(/*! ./nodeWrapper */ \"./node_modules/@babel/register/lib/nodeWrapper.js\");\n\nconst register = node.default;\nObject.assign(exports, node);\n\n//# sourceURL=webpack:///./node_modules/@babel/register/lib/index.js?");

/***/ }),

/***/ "./node_modules/@babel/register/lib/node.js":
/*!**************************************************!*\
  !*** ./node_modules/@babel/register/lib/node.js ***!
  \**************************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

"use strict";
eval("\n\nObject.defineProperty(exports, \"__esModule\", {\n  value: true\n});\nexports.default = register;\nexports.revert = revert;\n\nvar _cloneDeep = __webpack_require__(/*! clone-deep */ \"clone-deep\");\n\nvar _sourceMapSupport = __webpack_require__(/*! source-map-support */ \"source-map-support\");\n\nvar registerCache = __webpack_require__(/*! ./cache */ \"./node_modules/@babel/register/lib/cache.js\");\n\nvar babel = __webpack_require__(/*! @babel/core */ \"@babel/core\");\n\nvar _pirates = __webpack_require__(/*! pirates */ \"pirates\");\n\nvar _fs = __webpack_require__(/*! fs */ \"fs\");\n\nvar _path = __webpack_require__(/*! path */ \"path\");\n\nvar _module = __webpack_require__(/*! module */ \"module\");\n\nconst maps = {};\nlet transformOpts = {};\nlet piratesRevert = null;\n\nfunction installSourceMapSupport() {\n  _sourceMapSupport.install({\n    handleUncaughtExceptions: false,\n    environment: \"node\",\n\n    retrieveSourceMap(source) {\n      const map = maps && maps[source];\n\n      if (map) {\n        return {\n          url: null,\n          map: map\n        };\n      } else {\n        return null;\n      }\n    }\n\n  });\n}\n\nlet cache;\n\nfunction mtime(filename) {\n  return +_fs.statSync(filename).mtime;\n}\n\nfunction compile(code, filename) {\n  const opts = new babel.OptionManager().init(Object.assign({\n    sourceRoot: _path.dirname(filename) + _path.sep\n  }, _cloneDeep(transformOpts), {\n    filename\n  }));\n  if (opts === null) return code;\n  let cacheKey = `${JSON.stringify(opts)}:${babel.version}`;\n  const env = babel.getEnv(false);\n  if (env) cacheKey += `:${env}`;\n  let cached, fileMtime;\n\n  if (cache) {\n    cached = cache[cacheKey];\n    fileMtime = mtime(filename);\n  }\n\n  if (!cached || cached.mtime !== fileMtime) {\n    cached = babel.transform(code, Object.assign({}, opts, {\n      sourceMaps: opts.sourceMaps === undefined ? \"both\" : opts.sourceMaps,\n      ast: false\n    }));\n\n    if (cache) {\n      cache[cacheKey] = cached;\n      cached.mtime = fileMtime;\n      registerCache.setDirty();\n    }\n  }\n\n  if (cached.map) {\n    if (Object.keys(maps).length === 0) {\n      installSourceMapSupport();\n    }\n\n    maps[filename] = cached.map;\n  }\n\n  return cached.code;\n}\n\nlet compiling = false;\nconst internalModuleCache = _module._cache;\n\nfunction compileHook(code, filename) {\n  if (compiling) return code;\n  const globalModuleCache = _module._cache;\n\n  try {\n    compiling = true;\n    _module._cache = internalModuleCache;\n    return compile(code, filename);\n  } finally {\n    compiling = false;\n    _module._cache = globalModuleCache;\n  }\n}\n\nfunction hookExtensions(exts) {\n  if (piratesRevert) piratesRevert();\n  piratesRevert = (0, _pirates.addHook)(compileHook, {\n    exts,\n    ignoreNodeModules: false\n  });\n}\n\nfunction revert() {\n  if (piratesRevert) piratesRevert();\n}\n\nfunction escapeRegExp(string) {\n  return string.replace(/[|\\\\{}()[\\]^$+*?.]/g, \"\\\\$&\");\n}\n\nfunction register(opts = {}) {\n  opts = Object.assign({}, opts);\n  hookExtensions(opts.extensions || babel.DEFAULT_EXTENSIONS);\n\n  if (opts.cache === false && cache) {\n    registerCache.clear();\n    cache = null;\n  } else if (opts.cache !== false && !cache) {\n    registerCache.load();\n    cache = registerCache.get();\n  }\n\n  delete opts.extensions;\n  delete opts.cache;\n  transformOpts = Object.assign({}, opts, {\n    caller: Object.assign({\n      name: \"@babel/register\"\n    }, opts.caller || {})\n  });\n  let {\n    cwd = \".\"\n  } = transformOpts;\n  cwd = transformOpts.cwd = _path.resolve(cwd);\n\n  if (transformOpts.ignore === undefined && transformOpts.only === undefined) {\n    transformOpts.only = [new RegExp(\"^\" + escapeRegExp(cwd), \"i\")];\n    transformOpts.ignore = [new RegExp(\"^\" + escapeRegExp(cwd) + \"(?:\" + _path.sep + \".*)?\" + escapeRegExp(_path.sep + \"node_modules\" + _path.sep), \"i\")];\n  }\n}\n\n//# sourceURL=webpack:///./node_modules/@babel/register/lib/node.js?");

/***/ }),

/***/ "./node_modules/@babel/register/lib/nodeWrapper.js":
/*!*********************************************************!*\
  !*** ./node_modules/@babel/register/lib/nodeWrapper.js ***!
  \*********************************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

eval("const Module = __webpack_require__(/*! module */ \"module\");\n\nconst globalModuleCache = Module._cache;\nconst internalModuleCache = Object.create(null);\nModule._cache = internalModuleCache;\n\nconst node = __webpack_require__(/*! ./node */ \"./node_modules/@babel/register/lib/node.js\");\n\nModule._cache = globalModuleCache;\n\nconst smsPath = /*require.resolve*/(/*! source-map-support */ \"source-map-support\");\n\nglobalModuleCache[smsPath] = internalModuleCache[smsPath];\nconst register = node.default;\nregister();\nmodule.exports = node;\n\n//# sourceURL=webpack:///./node_modules/@babel/register/lib/nodeWrapper.js?");

/***/ }),

/***/ "./node_modules/webpack/buildin/harmony-module.js":
/*!*******************************************!*\
  !*** (webpack)/buildin/harmony-module.js ***!
  \*******************************************/
/*! no static exports found */
/***/ (function(module, exports) {

eval("module.exports = function (originalModule) {\n  if (!originalModule.webpackPolyfill) {\n    var module = Object.create(originalModule); // module.parent = undefined by default\n\n    if (!module.children) module.children = [];\n    Object.defineProperty(module, \"loaded\", {\n      enumerable: true,\n      get: function () {\n        return module.l;\n      }\n    });\n    Object.defineProperty(module, \"id\", {\n      enumerable: true,\n      get: function () {\n        return module.i;\n      }\n    });\n    Object.defineProperty(module, \"exports\", {\n      enumerable: true\n    });\n    module.webpackPolyfill = 1;\n  }\n\n  return module;\n};\n\n//# sourceURL=webpack:///(webpack)/buildin/harmony-module.js?");

/***/ }),

/***/ "./server/index.js":
/*!*************************!*\
  !*** ./server/index.js ***!
  \*************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

eval("/* WEBPACK VAR INJECTION */(function(__dirname) {const path = __webpack_require__(/*! path */ \"path\");\n\nconst fs = __webpack_require__(/*! fs */ \"fs\");\n\nconst express = __webpack_require__(/*! express */ \"express\");\n\nconst PORT = process.env.PORT || 3006;\nconst app = express();\n\nconst babelRegister = __webpack_require__(/*! @babel/register */ \"./node_modules/@babel/register/lib/index.js\");\n\nbabelRegister({\n  ignore: [/[\\\\\\/](build|server\\/server|node_modules)[\\\\\\/]/],\n  presets: [['react-app', {\n    runtime: 'automatic'\n  }]],\n  plugins: ['@babel/transform-modules-commonjs']\n});\n\nconst render = __webpack_require__(/*! ./render */ \"./server/render.js\");\n\napp.use((req, res, next) => {\n  if (req.url.endsWith('.js')) {\n    // Artificially delay serving JS\n    // to demonstrate streaming HTML.\n    setTimeout(next, 0);\n  } else {\n    next();\n  }\n});\napp.get('/', async (req, res) => {\n  await waitForWebpack();\n  render(req.url, res);\n});\napp.use(express.static('build'));\napp.use(express.static('public'));\napp.listen(PORT, () => {\n  console.log(`Server is listening on port ${PORT}`);\n});\n\nasync function waitForWebpack() {\n  while (true) {\n    try {\n      fs.readFileSync(path.resolve(__dirname, '../build/main.js'));\n      return;\n    } catch (err) {\n      console.log('Could not find webpack build output. Will retry in a second...');\n      await new Promise(resolve => setTimeout(resolve, 1000));\n    }\n  }\n}\n/* WEBPACK VAR INJECTION */}.call(this, \"/\"))\n\n//# sourceURL=webpack:///./server/index.js?");

/***/ }),

/***/ "./server/render.js":
/*!**************************!*\
  !*** ./server/render.js ***!
  \**************************/
/*! no exports provided */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
eval("__webpack_require__.r(__webpack_exports__);\n/* WEBPACK VAR INJECTION */(function(module) {/* harmony import */ var react__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! react */ \"react\");\n/* harmony import */ var react__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(react__WEBPACK_IMPORTED_MODULE_0__);\n/* harmony import */ var react_dom_server__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! react-dom/server */ \"react-dom/server\");\n/* harmony import */ var react_dom_server__WEBPACK_IMPORTED_MODULE_1___default = /*#__PURE__*/__webpack_require__.n(react_dom_server__WEBPACK_IMPORTED_MODULE_1__);\n/* harmony import */ var _src_App__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ../src/App */ \"./src/App.js\");\n/* harmony import */ var _src_DataContext__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! ../src/DataContext */ \"./src/DataContext.js\");\n/* harmony import */ var react_jsx_dev_runtime__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(/*! react/jsx-dev-runtime */ \"react/jsx-dev-runtime\");\n/* harmony import */ var react_jsx_dev_runtime__WEBPACK_IMPORTED_MODULE_4___default = /*#__PURE__*/__webpack_require__.n(react_jsx_dev_runtime__WEBPACK_IMPORTED_MODULE_4__);\nvar _jsxFileName = \"/Users/thomashessler/Desktop/Development/react-18-alpha-test/server/render.js\";\n\n\n\n\n\nconst assets = {\n  \"main.js\": \"/main.js\"\n};\n\nmodule.exports = function render(url, res) {\n  // const app = ReactDOMServer.renderToString(<DataProvider data={createServerData()}>\n  //     <Suspense fallback={<h1>Loading...</h1>}>\n  //       <App/>\n  //     </Suspense>\n  // </DataProvider>);\n  let didError = false;\n  const data = createServerData();\n  const {\n    pipe,\n    abort\n  } = Object(react_dom_server__WEBPACK_IMPORTED_MODULE_1__[\"renderToPipeableStream\"])( /*#__PURE__*/Object(react_jsx_dev_runtime__WEBPACK_IMPORTED_MODULE_4__[\"jsxDEV\"])(_src_DataContext__WEBPACK_IMPORTED_MODULE_3__[\"DataProvider\"], {\n    data: data,\n    children: /*#__PURE__*/Object(react_jsx_dev_runtime__WEBPACK_IMPORTED_MODULE_4__[\"jsxDEV\"])(_src_App__WEBPACK_IMPORTED_MODULE_2__[\"default\"], {}, void 0, false, {\n      fileName: _jsxFileName,\n      lineNumber: 22,\n      columnNumber: 7\n    }, this)\n  }, void 0, false, {\n    fileName: _jsxFileName,\n    lineNumber: 21,\n    columnNumber: 5\n  }, this), {\n    bootstrapScripts: [assets[\"main.js\"]],\n\n    onCompleteShell() {\n      // If something errored before we started streaming, we set the error code appropriately.\n      res.statusCode = didError ? 500 : 200;\n      res.setHeader(\"Content-type\", \"text/html\");\n      pipe(res);\n    },\n\n    onError(x) {\n      didError = true;\n      console.error(x);\n    }\n\n  });\n  setTimeout(abort, 10000); // const indexFile = path.resolve('./build/index.html');\n  // fs.readFile(indexFile, 'utf8', (err, data) => {\n  //   if (err) {\n  //     console.error('Something went wrong:', err);\n  //     return res.status(500).send('Oops, better luck next time!');\n  //   }\n  //   return res.send(\n  //     data.replace('<div id=\"root\"></div>', `<div id=\"root\">${app}</div>`)\n  //   );\n  // });\n};\n\nfunction createServerData() {\n  let done = false;\n  let promise = null;\n  return {\n    read() {\n      if (done) {\n        return;\n      }\n\n      if (promise) {\n        throw promise;\n      }\n\n      promise = new Promise(resolve => {\n        setTimeout(() => {\n          done = true;\n          promise = null;\n          resolve();\n        }, 0);\n      });\n      throw promise;\n    }\n\n  };\n}\n/* WEBPACK VAR INJECTION */}.call(this, __webpack_require__(/*! ./../node_modules/webpack/buildin/harmony-module.js */ \"./node_modules/webpack/buildin/harmony-module.js\")(module)))\n\n//# sourceURL=webpack:///./server/render.js?");

/***/ }),

/***/ "./src/App.js":
/*!********************!*\
  !*** ./src/App.js ***!
  \********************/
/*! exports provided: default */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
eval("__webpack_require__.r(__webpack_exports__);\n/* harmony import */ var react__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! react */ \"react\");\n/* harmony import */ var react__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(react__WEBPACK_IMPORTED_MODULE_0__);\n/* harmony import */ var _DataContext__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ./DataContext */ \"./src/DataContext.js\");\n/* harmony import */ var _People__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ./People */ \"./src/People.js\");\n/* harmony import */ var react_jsx_dev_runtime__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! react/jsx-dev-runtime */ \"react/jsx-dev-runtime\");\n/* harmony import */ var react_jsx_dev_runtime__WEBPACK_IMPORTED_MODULE_3___default = /*#__PURE__*/__webpack_require__.n(react_jsx_dev_runtime__WEBPACK_IMPORTED_MODULE_3__);\nvar _jsxFileName = \"/Users/thomashessler/Desktop/Development/react-18-alpha-test/src/App.js\";\n\n\n\n\n\nfunction App() {\n  const Loader = () => /*#__PURE__*/Object(react_jsx_dev_runtime__WEBPACK_IMPORTED_MODULE_3__[\"jsxDEV\"])(\"h1\", {\n    children: \"Loading...\"\n  }, void 0, false, {\n    fileName: _jsxFileName,\n    lineNumber: 7,\n    columnNumber: 25\n  }, this);\n\n  function Html(_ref) {\n    let {\n      children,\n      title\n    } = _ref;\n    return /*#__PURE__*/Object(react_jsx_dev_runtime__WEBPACK_IMPORTED_MODULE_3__[\"jsxDEV\"])(\"html\", {\n      lang: \"en\",\n      children: [/*#__PURE__*/Object(react_jsx_dev_runtime__WEBPACK_IMPORTED_MODULE_3__[\"jsxDEV\"])(\"head\", {\n        children: [/*#__PURE__*/Object(react_jsx_dev_runtime__WEBPACK_IMPORTED_MODULE_3__[\"jsxDEV\"])(\"meta\", {\n          charSet: \"utf-8\"\n        }, void 0, false, {\n          fileName: _jsxFileName,\n          lineNumber: 13,\n          columnNumber: 11\n        }, this), /*#__PURE__*/Object(react_jsx_dev_runtime__WEBPACK_IMPORTED_MODULE_3__[\"jsxDEV\"])(\"meta\", {\n          name: \"viewport\",\n          content: \"width=device-width, initial-scale=1\"\n        }, void 0, false, {\n          fileName: _jsxFileName,\n          lineNumber: 14,\n          columnNumber: 11\n        }, this), /*#__PURE__*/Object(react_jsx_dev_runtime__WEBPACK_IMPORTED_MODULE_3__[\"jsxDEV\"])(\"link\", {\n          rel: \"shortcut icon\",\n          href: \"favicon.ico\"\n        }, void 0, false, {\n          fileName: _jsxFileName,\n          lineNumber: 15,\n          columnNumber: 11\n        }, this), /*#__PURE__*/Object(react_jsx_dev_runtime__WEBPACK_IMPORTED_MODULE_3__[\"jsxDEV\"])(\"title\", {\n          children: title\n        }, void 0, false, {\n          fileName: _jsxFileName,\n          lineNumber: 16,\n          columnNumber: 11\n        }, this)]\n      }, void 0, true, {\n        fileName: _jsxFileName,\n        lineNumber: 12,\n        columnNumber: 9\n      }, this), /*#__PURE__*/Object(react_jsx_dev_runtime__WEBPACK_IMPORTED_MODULE_3__[\"jsxDEV\"])(\"body\", {\n        children: [/*#__PURE__*/Object(react_jsx_dev_runtime__WEBPACK_IMPORTED_MODULE_3__[\"jsxDEV\"])(\"noscript\", {\n          dangerouslySetInnerHTML: {\n            __html: `<b>Enable JavaScript to run this app.</b>`\n          }\n        }, void 0, false, {\n          fileName: _jsxFileName,\n          lineNumber: 19,\n          columnNumber: 11\n        }, this), children]\n      }, void 0, true, {\n        fileName: _jsxFileName,\n        lineNumber: 18,\n        columnNumber: 9\n      }, this)]\n    }, void 0, true, {\n      fileName: _jsxFileName,\n      lineNumber: 11,\n      columnNumber: 7\n    }, this);\n  }\n\n  return /*#__PURE__*/Object(react_jsx_dev_runtime__WEBPACK_IMPORTED_MODULE_3__[\"jsxDEV\"])(Html, {\n    title: \"Thomas is Awesome\",\n    children: /*#__PURE__*/Object(react_jsx_dev_runtime__WEBPACK_IMPORTED_MODULE_3__[\"jsxDEV\"])(react__WEBPACK_IMPORTED_MODULE_0__[\"Suspense\"], {\n      fallback: /*#__PURE__*/Object(react_jsx_dev_runtime__WEBPACK_IMPORTED_MODULE_3__[\"jsxDEV\"])(Loader, {}, void 0, false, {\n        fileName: _jsxFileName,\n        lineNumber: 32,\n        columnNumber: 27\n      }, this),\n      children: /*#__PURE__*/Object(react_jsx_dev_runtime__WEBPACK_IMPORTED_MODULE_3__[\"jsxDEV\"])(\"div\", {\n        className: \"App\",\n        children: /*#__PURE__*/Object(react_jsx_dev_runtime__WEBPACK_IMPORTED_MODULE_3__[\"jsxDEV\"])(\"header\", {\n          className: \"App-header\",\n          children: [/*#__PURE__*/Object(react_jsx_dev_runtime__WEBPACK_IMPORTED_MODULE_3__[\"jsxDEV\"])(\"p\", {\n            children: [\"Edit \", /*#__PURE__*/Object(react_jsx_dev_runtime__WEBPACK_IMPORTED_MODULE_3__[\"jsxDEV\"])(\"code\", {\n              children: \"src/App.js\"\n            }, void 0, false, {\n              fileName: _jsxFileName,\n              lineNumber: 36,\n              columnNumber: 20\n            }, this), \" and save to reload.\"]\n          }, void 0, true, {\n            fileName: _jsxFileName,\n            lineNumber: 35,\n            columnNumber: 13\n          }, this), /*#__PURE__*/Object(react_jsx_dev_runtime__WEBPACK_IMPORTED_MODULE_3__[\"jsxDEV\"])(react__WEBPACK_IMPORTED_MODULE_0__[\"Suspense\"], {\n            fallback: /*#__PURE__*/Object(react_jsx_dev_runtime__WEBPACK_IMPORTED_MODULE_3__[\"jsxDEV\"])(Loader, {}, void 0, false, {\n              fileName: _jsxFileName,\n              lineNumber: 38,\n              columnNumber: 33\n            }, this),\n            children: /*#__PURE__*/Object(react_jsx_dev_runtime__WEBPACK_IMPORTED_MODULE_3__[\"jsxDEV\"])(_People__WEBPACK_IMPORTED_MODULE_2__[\"default\"], {}, void 0, false, {\n              fileName: _jsxFileName,\n              lineNumber: 39,\n              columnNumber: 15\n            }, this)\n          }, void 0, false, {\n            fileName: _jsxFileName,\n            lineNumber: 38,\n            columnNumber: 13\n          }, this)]\n        }, void 0, true, {\n          fileName: _jsxFileName,\n          lineNumber: 34,\n          columnNumber: 11\n        }, this)\n      }, void 0, false, {\n        fileName: _jsxFileName,\n        lineNumber: 33,\n        columnNumber: 9\n      }, this)\n    }, void 0, false, {\n      fileName: _jsxFileName,\n      lineNumber: 32,\n      columnNumber: 7\n    }, this)\n  }, void 0, false, {\n    fileName: _jsxFileName,\n    lineNumber: 31,\n    columnNumber: 5\n  }, this);\n}\n\n/* harmony default export */ __webpack_exports__[\"default\"] = (App);\n\n//# sourceURL=webpack:///./src/App.js?");

/***/ }),

/***/ "./src/DataContext.js":
/*!****************************!*\
  !*** ./src/DataContext.js ***!
  \****************************/
/*! exports provided: DataProvider, fakeData, useData */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
eval("__webpack_require__.r(__webpack_exports__);\n/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, \"DataProvider\", function() { return DataProvider; });\n/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, \"fakeData\", function() { return fakeData; });\n/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, \"useData\", function() { return useData; });\n/* harmony import */ var react__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! react */ \"react\");\n/* harmony import */ var react__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(react__WEBPACK_IMPORTED_MODULE_0__);\n/* harmony import */ var react_jsx_dev_runtime__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! react/jsx-dev-runtime */ \"react/jsx-dev-runtime\");\n/* harmony import */ var react_jsx_dev_runtime__WEBPACK_IMPORTED_MODULE_1___default = /*#__PURE__*/__webpack_require__.n(react_jsx_dev_runtime__WEBPACK_IMPORTED_MODULE_1__);\nvar _jsxFileName = \"/Users/thomashessler/Desktop/Development/react-18-alpha-test/src/DataContext.js\";\n\n\n\nconst DataContext = /*#__PURE__*/Object(react__WEBPACK_IMPORTED_MODULE_0__[\"createContext\"])(null);\nfunction DataProvider(_ref) {\n  let {\n    children,\n    data\n  } = _ref;\n  return /*#__PURE__*/Object(react_jsx_dev_runtime__WEBPACK_IMPORTED_MODULE_1__[\"jsxDEV\"])(DataContext.Provider, {\n    value: data,\n    children: children\n  }, void 0, false, {\n    fileName: _jsxFileName,\n    lineNumber: 7,\n    columnNumber: 10\n  }, this);\n}\n;\nconst fakeData = [{\n  name: 'Thomas'\n}, {\n  name: 'Dom'\n}, {\n  name: 'Kevin'\n}, {\n  name: 'Leo'\n}, {\n  name: 'Nathan'\n}];\nfunction useData() {\n  const ctx = Object(react__WEBPACK_IMPORTED_MODULE_0__[\"useContext\"])(DataContext);\n\n  if (ctx !== null) {\n    ctx.read();\n  }\n\n  return fakeData;\n}\n;\n\n//# sourceURL=webpack:///./src/DataContext.js?");

/***/ }),

/***/ "./src/People.js":
/*!***********************!*\
  !*** ./src/People.js ***!
  \***********************/
/*! exports provided: default */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
eval("__webpack_require__.r(__webpack_exports__);\n/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, \"default\", function() { return People; });\n/* harmony import */ var _DataContext__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./DataContext */ \"./src/DataContext.js\");\n/* harmony import */ var react_jsx_dev_runtime__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! react/jsx-dev-runtime */ \"react/jsx-dev-runtime\");\n/* harmony import */ var react_jsx_dev_runtime__WEBPACK_IMPORTED_MODULE_1___default = /*#__PURE__*/__webpack_require__.n(react_jsx_dev_runtime__WEBPACK_IMPORTED_MODULE_1__);\nvar _jsxFileName = \"/Users/thomashessler/Desktop/Development/react-18-alpha-test/src/People.js\";\n\n\n\nfunction People() {\n  const people = Object(_DataContext__WEBPACK_IMPORTED_MODULE_0__[\"useData\"])();\n  return /*#__PURE__*/Object(react_jsx_dev_runtime__WEBPACK_IMPORTED_MODULE_1__[\"jsxDEV\"])(react_jsx_dev_runtime__WEBPACK_IMPORTED_MODULE_1__[\"Fragment\"], {\n    children: people.map((person, index) => /*#__PURE__*/Object(react_jsx_dev_runtime__WEBPACK_IMPORTED_MODULE_1__[\"jsxDEV\"])(\"a\", {\n      className: \"App-link\",\n      style: {\n        display: 'block'\n      },\n      href: \"https://reactjs.org\",\n      target: \"_blank\",\n      rel: \"noopener noreferrer\",\n      children: [\"Hello \", person.name]\n    }, `name${index}`, true, {\n      fileName: _jsxFileName,\n      lineNumber: 9,\n      columnNumber: 39\n    }, this))\n  }, void 0, false);\n}\n\n//# sourceURL=webpack:///./src/People.js?");

/***/ }),

/***/ "@babel/core":
/*!******************************!*\
  !*** external "@babel/core" ***!
  \******************************/
/*! no static exports found */
/***/ (function(module, exports) {

eval("module.exports = require(\"@babel/core\");\n\n//# sourceURL=webpack:///external_%22@babel/core%22?");

/***/ }),

/***/ "clone-deep":
/*!*****************************!*\
  !*** external "clone-deep" ***!
  \*****************************/
/*! no static exports found */
/***/ (function(module, exports) {

eval("module.exports = require(\"clone-deep\");\n\n//# sourceURL=webpack:///external_%22clone-deep%22?");

/***/ }),

/***/ "express":
/*!**************************!*\
  !*** external "express" ***!
  \**************************/
/*! no static exports found */
/***/ (function(module, exports) {

eval("module.exports = require(\"express\");\n\n//# sourceURL=webpack:///external_%22express%22?");

/***/ }),

/***/ "find-cache-dir":
/*!*********************************!*\
  !*** external "find-cache-dir" ***!
  \*********************************/
/*! no static exports found */
/***/ (function(module, exports) {

eval("module.exports = require(\"find-cache-dir\");\n\n//# sourceURL=webpack:///external_%22find-cache-dir%22?");

/***/ }),

/***/ "fs":
/*!*********************!*\
  !*** external "fs" ***!
  \*********************/
/*! no static exports found */
/***/ (function(module, exports) {

eval("module.exports = require(\"fs\");\n\n//# sourceURL=webpack:///external_%22fs%22?");

/***/ }),

/***/ "make-dir":
/*!***************************!*\
  !*** external "make-dir" ***!
  \***************************/
/*! no static exports found */
/***/ (function(module, exports) {

eval("module.exports = require(\"make-dir\");\n\n//# sourceURL=webpack:///external_%22make-dir%22?");

/***/ }),

/***/ "module":
/*!*************************!*\
  !*** external "module" ***!
  \*************************/
/*! no static exports found */
/***/ (function(module, exports) {

eval("module.exports = require(\"module\");\n\n//# sourceURL=webpack:///external_%22module%22?");

/***/ }),

/***/ "os":
/*!*********************!*\
  !*** external "os" ***!
  \*********************/
/*! no static exports found */
/***/ (function(module, exports) {

eval("module.exports = require(\"os\");\n\n//# sourceURL=webpack:///external_%22os%22?");

/***/ }),

/***/ "path":
/*!***********************!*\
  !*** external "path" ***!
  \***********************/
/*! no static exports found */
/***/ (function(module, exports) {

eval("module.exports = require(\"path\");\n\n//# sourceURL=webpack:///external_%22path%22?");

/***/ }),

/***/ "pirates":
/*!**************************!*\
  !*** external "pirates" ***!
  \**************************/
/*! no static exports found */
/***/ (function(module, exports) {

eval("module.exports = require(\"pirates\");\n\n//# sourceURL=webpack:///external_%22pirates%22?");

/***/ }),

/***/ "react":
/*!************************!*\
  !*** external "react" ***!
  \************************/
/*! no static exports found */
/***/ (function(module, exports) {

eval("module.exports = require(\"react\");\n\n//# sourceURL=webpack:///external_%22react%22?");

/***/ }),

/***/ "react-dom/server":
/*!***********************************!*\
  !*** external "react-dom/server" ***!
  \***********************************/
/*! no static exports found */
/***/ (function(module, exports) {

eval("module.exports = require(\"react-dom/server\");\n\n//# sourceURL=webpack:///external_%22react-dom/server%22?");

/***/ }),

/***/ "react/jsx-dev-runtime":
/*!****************************************!*\
  !*** external "react/jsx-dev-runtime" ***!
  \****************************************/
/*! no static exports found */
/***/ (function(module, exports) {

eval("module.exports = require(\"react/jsx-dev-runtime\");\n\n//# sourceURL=webpack:///external_%22react/jsx-dev-runtime%22?");

/***/ }),

/***/ "source-map-support":
/*!*************************************!*\
  !*** external "source-map-support" ***!
  \*************************************/
/*! no static exports found */
/***/ (function(module, exports) {

eval("module.exports = require(\"source-map-support\");\n\n//# sourceURL=webpack:///external_%22source-map-support%22?");

/***/ })

/******/ });