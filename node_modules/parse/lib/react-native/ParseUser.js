var _interopRequireDefault = require("@babel/runtime/helpers/interopRequireDefault");

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = void 0;

var _classCallCheck2 = _interopRequireDefault(require("@babel/runtime/helpers/classCallCheck"));

var _createClass2 = _interopRequireDefault(require("@babel/runtime/helpers/createClass"));

var _get2 = _interopRequireDefault(require("@babel/runtime/helpers/get"));

var _inherits2 = _interopRequireDefault(require("@babel/runtime/helpers/inherits"));

var _possibleConstructorReturn2 = _interopRequireDefault(require("@babel/runtime/helpers/possibleConstructorReturn"));

var _getPrototypeOf2 = _interopRequireDefault(require("@babel/runtime/helpers/getPrototypeOf"));

var _CoreManager = _interopRequireDefault(require("./CoreManager"));

var _isRevocableSession = _interopRequireDefault(require("./isRevocableSession"));

var _ParseError = _interopRequireDefault(require("./ParseError"));

var _ParseObject2 = _interopRequireDefault(require("./ParseObject"));

var _ParseSession = _interopRequireDefault(require("./ParseSession"));

var _Storage = _interopRequireDefault(require("./Storage"));

function _regeneratorRuntime() {
  "use strict";

  _regeneratorRuntime = function () {
    return exports;
  };

  var exports = {},
      Op = Object.prototype,
      hasOwn = Op.hasOwnProperty,
      $Symbol = "function" == typeof Symbol ? Symbol : {},
      iteratorSymbol = $Symbol.iterator || "@@iterator",
      asyncIteratorSymbol = $Symbol.asyncIterator || "@@asyncIterator",
      toStringTagSymbol = $Symbol.toStringTag || "@@toStringTag";

  function define(obj, key, value) {
    return Object.defineProperty(obj, key, {
      value: value,
      enumerable: !0,
      configurable: !0,
      writable: !0
    }), obj[key];
  }

  try {
    define({}, "");
  } catch (err) {
    define = function (obj, key, value) {
      return obj[key] = value;
    };
  }

  function wrap(innerFn, outerFn, self, tryLocsList) {
    var protoGenerator = outerFn && outerFn.prototype instanceof Generator ? outerFn : Generator,
        generator = Object.create(protoGenerator.prototype),
        context = new Context(tryLocsList || []);
    return generator._invoke = function (innerFn, self, context) {
      var state = "suspendedStart";
      return function (method, arg) {
        if ("executing" === state) throw new Error("Generator is already running");

        if ("completed" === state) {
          if ("throw" === method) throw arg;
          return doneResult();
        }

        for (context.method = method, context.arg = arg;;) {
          var delegate = context.delegate;

          if (delegate) {
            var delegateResult = maybeInvokeDelegate(delegate, context);

            if (delegateResult) {
              if (delegateResult === ContinueSentinel) continue;
              return delegateResult;
            }
          }

          if ("next" === context.method) context.sent = context._sent = context.arg;else if ("throw" === context.method) {
            if ("suspendedStart" === state) throw state = "completed", context.arg;
            context.dispatchException(context.arg);
          } else "return" === context.method && context.abrupt("return", context.arg);
          state = "executing";
          var record = tryCatch(innerFn, self, context);

          if ("normal" === record.type) {
            if (state = context.done ? "completed" : "suspendedYield", record.arg === ContinueSentinel) continue;
            return {
              value: record.arg,
              done: context.done
            };
          }

          "throw" === record.type && (state = "completed", context.method = "throw", context.arg = record.arg);
        }
      };
    }(innerFn, self, context), generator;
  }

  function tryCatch(fn, obj, arg) {
    try {
      return {
        type: "normal",
        arg: fn.call(obj, arg)
      };
    } catch (err) {
      return {
        type: "throw",
        arg: err
      };
    }
  }

  exports.wrap = wrap;
  var ContinueSentinel = {};

  function Generator() {}

  function GeneratorFunction() {}

  function GeneratorFunctionPrototype() {}

  var IteratorPrototype = {};
  define(IteratorPrototype, iteratorSymbol, function () {
    return this;
  });
  var getProto = Object.getPrototypeOf,
      NativeIteratorPrototype = getProto && getProto(getProto(values([])));
  NativeIteratorPrototype && NativeIteratorPrototype !== Op && hasOwn.call(NativeIteratorPrototype, iteratorSymbol) && (IteratorPrototype = NativeIteratorPrototype);
  var Gp = GeneratorFunctionPrototype.prototype = Generator.prototype = Object.create(IteratorPrototype);

  function defineIteratorMethods(prototype) {
    ["next", "throw", "return"].forEach(function (method) {
      define(prototype, method, function (arg) {
        return this._invoke(method, arg);
      });
    });
  }

  function AsyncIterator(generator, PromiseImpl) {
    function invoke(method, arg, resolve, reject) {
      var record = tryCatch(generator[method], generator, arg);

      if ("throw" !== record.type) {
        var result = record.arg,
            value = result.value;
        return value && "object" == typeof value && hasOwn.call(value, "__await") ? PromiseImpl.resolve(value.__await).then(function (value) {
          invoke("next", value, resolve, reject);
        }, function (err) {
          invoke("throw", err, resolve, reject);
        }) : PromiseImpl.resolve(value).then(function (unwrapped) {
          result.value = unwrapped, resolve(result);
        }, function (error) {
          return invoke("throw", error, resolve, reject);
        });
      }

      reject(record.arg);
    }

    var previousPromise;

    this._invoke = function (method, arg) {
      function callInvokeWithMethodAndArg() {
        return new PromiseImpl(function (resolve, reject) {
          invoke(method, arg, resolve, reject);
        });
      }

      return previousPromise = previousPromise ? previousPromise.then(callInvokeWithMethodAndArg, callInvokeWithMethodAndArg) : callInvokeWithMethodAndArg();
    };
  }

  function maybeInvokeDelegate(delegate, context) {
    var method = delegate.iterator[context.method];

    if (undefined === method) {
      if (context.delegate = null, "throw" === context.method) {
        if (delegate.iterator.return && (context.method = "return", context.arg = undefined, maybeInvokeDelegate(delegate, context), "throw" === context.method)) return ContinueSentinel;
        context.method = "throw", context.arg = new TypeError("The iterator does not provide a 'throw' method");
      }

      return ContinueSentinel;
    }

    var record = tryCatch(method, delegate.iterator, context.arg);
    if ("throw" === record.type) return context.method = "throw", context.arg = record.arg, context.delegate = null, ContinueSentinel;
    var info = record.arg;
    return info ? info.done ? (context[delegate.resultName] = info.value, context.next = delegate.nextLoc, "return" !== context.method && (context.method = "next", context.arg = undefined), context.delegate = null, ContinueSentinel) : info : (context.method = "throw", context.arg = new TypeError("iterator result is not an object"), context.delegate = null, ContinueSentinel);
  }

  function pushTryEntry(locs) {
    var entry = {
      tryLoc: locs[0]
    };
    1 in locs && (entry.catchLoc = locs[1]), 2 in locs && (entry.finallyLoc = locs[2], entry.afterLoc = locs[3]), this.tryEntries.push(entry);
  }

  function resetTryEntry(entry) {
    var record = entry.completion || {};
    record.type = "normal", delete record.arg, entry.completion = record;
  }

  function Context(tryLocsList) {
    this.tryEntries = [{
      tryLoc: "root"
    }], tryLocsList.forEach(pushTryEntry, this), this.reset(!0);
  }

  function values(iterable) {
    if (iterable) {
      var iteratorMethod = iterable[iteratorSymbol];
      if (iteratorMethod) return iteratorMethod.call(iterable);
      if ("function" == typeof iterable.next) return iterable;

      if (!isNaN(iterable.length)) {
        var i = -1,
            next = function next() {
          for (; ++i < iterable.length;) {
            if (hasOwn.call(iterable, i)) return next.value = iterable[i], next.done = !1, next;
          }

          return next.value = undefined, next.done = !0, next;
        };

        return next.next = next;
      }
    }

    return {
      next: doneResult
    };
  }

  function doneResult() {
    return {
      value: undefined,
      done: !0
    };
  }

  return GeneratorFunction.prototype = GeneratorFunctionPrototype, define(Gp, "constructor", GeneratorFunctionPrototype), define(GeneratorFunctionPrototype, "constructor", GeneratorFunction), GeneratorFunction.displayName = define(GeneratorFunctionPrototype, toStringTagSymbol, "GeneratorFunction"), exports.isGeneratorFunction = function (genFun) {
    var ctor = "function" == typeof genFun && genFun.constructor;
    return !!ctor && (ctor === GeneratorFunction || "GeneratorFunction" === (ctor.displayName || ctor.name));
  }, exports.mark = function (genFun) {
    return Object.setPrototypeOf ? Object.setPrototypeOf(genFun, GeneratorFunctionPrototype) : (genFun.__proto__ = GeneratorFunctionPrototype, define(genFun, toStringTagSymbol, "GeneratorFunction")), genFun.prototype = Object.create(Gp), genFun;
  }, exports.awrap = function (arg) {
    return {
      __await: arg
    };
  }, defineIteratorMethods(AsyncIterator.prototype), define(AsyncIterator.prototype, asyncIteratorSymbol, function () {
    return this;
  }), exports.AsyncIterator = AsyncIterator, exports.async = function (innerFn, outerFn, self, tryLocsList, PromiseImpl) {
    void 0 === PromiseImpl && (PromiseImpl = Promise);
    var iter = new AsyncIterator(wrap(innerFn, outerFn, self, tryLocsList), PromiseImpl);
    return exports.isGeneratorFunction(outerFn) ? iter : iter.next().then(function (result) {
      return result.done ? result.value : iter.next();
    });
  }, defineIteratorMethods(Gp), define(Gp, toStringTagSymbol, "Generator"), define(Gp, iteratorSymbol, function () {
    return this;
  }), define(Gp, "toString", function () {
    return "[object Generator]";
  }), exports.keys = function (object) {
    var keys = [];

    for (var key in object) {
      keys.push(key);
    }

    return keys.reverse(), function next() {
      for (; keys.length;) {
        var key = keys.pop();
        if (key in object) return next.value = key, next.done = !1, next;
      }

      return next.done = !0, next;
    };
  }, exports.values = values, Context.prototype = {
    constructor: Context,
    reset: function (skipTempReset) {
      if (this.prev = 0, this.next = 0, this.sent = this._sent = undefined, this.done = !1, this.delegate = null, this.method = "next", this.arg = undefined, this.tryEntries.forEach(resetTryEntry), !skipTempReset) for (var name in this) {
        "t" === name.charAt(0) && hasOwn.call(this, name) && !isNaN(+name.slice(1)) && (this[name] = undefined);
      }
    },
    stop: function () {
      this.done = !0;
      var rootRecord = this.tryEntries[0].completion;
      if ("throw" === rootRecord.type) throw rootRecord.arg;
      return this.rval;
    },
    dispatchException: function (exception) {
      if (this.done) throw exception;
      var context = this;

      function handle(loc, caught) {
        return record.type = "throw", record.arg = exception, context.next = loc, caught && (context.method = "next", context.arg = undefined), !!caught;
      }

      for (var i = this.tryEntries.length - 1; i >= 0; --i) {
        var entry = this.tryEntries[i],
            record = entry.completion;
        if ("root" === entry.tryLoc) return handle("end");

        if (entry.tryLoc <= this.prev) {
          var hasCatch = hasOwn.call(entry, "catchLoc"),
              hasFinally = hasOwn.call(entry, "finallyLoc");

          if (hasCatch && hasFinally) {
            if (this.prev < entry.catchLoc) return handle(entry.catchLoc, !0);
            if (this.prev < entry.finallyLoc) return handle(entry.finallyLoc);
          } else if (hasCatch) {
            if (this.prev < entry.catchLoc) return handle(entry.catchLoc, !0);
          } else {
            if (!hasFinally) throw new Error("try statement without catch or finally");
            if (this.prev < entry.finallyLoc) return handle(entry.finallyLoc);
          }
        }
      }
    },
    abrupt: function (type, arg) {
      for (var i = this.tryEntries.length - 1; i >= 0; --i) {
        var entry = this.tryEntries[i];

        if (entry.tryLoc <= this.prev && hasOwn.call(entry, "finallyLoc") && this.prev < entry.finallyLoc) {
          var finallyEntry = entry;
          break;
        }
      }

      finallyEntry && ("break" === type || "continue" === type) && finallyEntry.tryLoc <= arg && arg <= finallyEntry.finallyLoc && (finallyEntry = null);
      var record = finallyEntry ? finallyEntry.completion : {};
      return record.type = type, record.arg = arg, finallyEntry ? (this.method = "next", this.next = finallyEntry.finallyLoc, ContinueSentinel) : this.complete(record);
    },
    complete: function (record, afterLoc) {
      if ("throw" === record.type) throw record.arg;
      return "break" === record.type || "continue" === record.type ? this.next = record.arg : "return" === record.type ? (this.rval = this.arg = record.arg, this.method = "return", this.next = "end") : "normal" === record.type && afterLoc && (this.next = afterLoc), ContinueSentinel;
    },
    finish: function (finallyLoc) {
      for (var i = this.tryEntries.length - 1; i >= 0; --i) {
        var entry = this.tryEntries[i];
        if (entry.finallyLoc === finallyLoc) return this.complete(entry.completion, entry.afterLoc), resetTryEntry(entry), ContinueSentinel;
      }
    },
    catch: function (tryLoc) {
      for (var i = this.tryEntries.length - 1; i >= 0; --i) {
        var entry = this.tryEntries[i];

        if (entry.tryLoc === tryLoc) {
          var record = entry.completion;

          if ("throw" === record.type) {
            var thrown = record.arg;
            resetTryEntry(entry);
          }

          return thrown;
        }
      }

      throw new Error("illegal catch attempt");
    },
    delegateYield: function (iterable, resultName, nextLoc) {
      return this.delegate = {
        iterator: values(iterable),
        resultName: resultName,
        nextLoc: nextLoc
      }, "next" === this.method && (this.arg = undefined), ContinueSentinel;
    }
  }, exports;
}

function _createSuper(Derived) {
  var hasNativeReflectConstruct = _isNativeReflectConstruct();

  return function () {
    var Super = (0, _getPrototypeOf2.default)(Derived),
        result;

    if (hasNativeReflectConstruct) {
      var NewTarget = (0, _getPrototypeOf2.default)(this).constructor;
      result = Reflect.construct(Super, arguments, NewTarget);
    } else {
      result = Super.apply(this, arguments);
    }

    return (0, _possibleConstructorReturn2.default)(this, result);
  };
}

function _isNativeReflectConstruct() {
  if (typeof Reflect === "undefined" || !Reflect.construct) return false;
  if (Reflect.construct.sham) return false;
  if (typeof Proxy === "function") return true;

  try {
    Boolean.prototype.valueOf.call(Reflect.construct(Boolean, [], function () {}));
    return true;
  } catch (e) {
    return false;
  }
}

var CURRENT_USER_KEY = 'currentUser';
var canUseCurrentUser = !_CoreManager.default.get('IS_NODE');
var currentUserCacheMatchesDisk = false;
var currentUserCache = null;
var authProviders = {};

var ParseUser = function (_ParseObject) {
  (0, _inherits2.default)(ParseUser, _ParseObject);

  var _super = _createSuper(ParseUser);

  function ParseUser(attributes) {
    var _this;

    (0, _classCallCheck2.default)(this, ParseUser);
    _this = _super.call(this, '_User');

    if (attributes && typeof attributes === 'object') {
      if (!_this.set(attributes || {})) {
        throw new Error("Can't create an invalid Parse User");
      }
    }

    return _this;
  }

  (0, _createClass2.default)(ParseUser, [{
    key: "_upgradeToRevocableSession",
    value: function (options) {
      options = options || {};
      var upgradeOptions = {};

      if (options.hasOwnProperty('useMasterKey')) {
        upgradeOptions.useMasterKey = options.useMasterKey;
      }

      var controller = _CoreManager.default.getUserController();

      return controller.upgradeToRevocableSession(this, upgradeOptions);
    }
  }, {
    key: "linkWith",
    value: function (provider, options) {
      var _this2 = this;

      var saveOpts = arguments.length > 2 && arguments[2] !== undefined ? arguments[2] : {};
      saveOpts.sessionToken = saveOpts.sessionToken || this.getSessionToken() || '';
      var authType;

      if (typeof provider === 'string') {
        authType = provider;

        if (authProviders[provider]) {
          provider = authProviders[provider];
        } else {
          var authProvider = {
            restoreAuthentication: function () {
              return true;
            },
            getAuthType: function () {
              return authType;
            }
          };
          authProviders[authProvider.getAuthType()] = authProvider;
          provider = authProvider;
        }
      } else {
        authType = provider.getAuthType();
      }

      if (options && options.hasOwnProperty('authData')) {
        var authData = this.get('authData') || {};

        if (typeof authData !== 'object') {
          throw new Error('Invalid type: authData field should be an object');
        }

        authData[authType] = options.authData;

        var controller = _CoreManager.default.getUserController();

        return controller.linkWith(this, authData, saveOpts);
      } else {
        return new Promise(function (resolve, reject) {
          provider.authenticate({
            success: function (provider, result) {
              var opts = {};
              opts.authData = result;

              _this2.linkWith(provider, opts, saveOpts).then(function () {
                resolve(_this2);
              }, function (error) {
                reject(error);
              });
            },
            error: function (provider, _error) {
              reject(_error);
            }
          });
        });
      }
    }
  }, {
    key: "_linkWith",
    value: function (provider, options) {
      var saveOpts = arguments.length > 2 && arguments[2] !== undefined ? arguments[2] : {};
      return this.linkWith(provider, options, saveOpts);
    }
  }, {
    key: "_synchronizeAuthData",
    value: function (provider) {
      if (!this.isCurrent() || !provider) {
        return;
      }

      var authType;

      if (typeof provider === 'string') {
        authType = provider;
        provider = authProviders[authType];
      } else {
        authType = provider.getAuthType();
      }

      var authData = this.get('authData');

      if (!provider || !authData || typeof authData !== 'object') {
        return;
      }

      var success = provider.restoreAuthentication(authData[authType]);

      if (!success) {
        this._unlinkFrom(provider);
      }
    }
  }, {
    key: "_synchronizeAllAuthData",
    value: function () {
      var authData = this.get('authData');

      if (typeof authData !== 'object') {
        return;
      }

      for (var _key in authData) {
        this._synchronizeAuthData(_key);
      }
    }
  }, {
    key: "_cleanupAuthData",
    value: function () {
      if (!this.isCurrent()) {
        return;
      }

      var authData = this.get('authData');

      if (typeof authData !== 'object') {
        return;
      }

      for (var _key2 in authData) {
        if (!authData[_key2]) {
          delete authData[_key2];
        }
      }
    }
  }, {
    key: "_unlinkFrom",
    value: function (provider, options) {
      var _this3 = this;

      return this.linkWith(provider, {
        authData: null
      }, options).then(function () {
        _this3._synchronizeAuthData(provider);

        return Promise.resolve(_this3);
      });
    }
  }, {
    key: "_isLinked",
    value: function (provider) {
      var authType;

      if (typeof provider === 'string') {
        authType = provider;
      } else {
        authType = provider.getAuthType();
      }

      var authData = this.get('authData') || {};

      if (typeof authData !== 'object') {
        return false;
      }

      return !!authData[authType];
    }
  }, {
    key: "_logOutWithAll",
    value: function () {
      var authData = this.get('authData');

      if (typeof authData !== 'object') {
        return;
      }

      for (var _key3 in authData) {
        this._logOutWith(_key3);
      }
    }
  }, {
    key: "_logOutWith",
    value: function (provider) {
      if (!this.isCurrent()) {
        return;
      }

      if (typeof provider === 'string') {
        provider = authProviders[provider];
      }

      if (provider && provider.deauthenticate) {
        provider.deauthenticate();
      }
    }
  }, {
    key: "_preserveFieldsOnFetch",
    value: function () {
      return {
        sessionToken: this.get('sessionToken')
      };
    }
  }, {
    key: "isCurrent",
    value: function () {
      var current = ParseUser.current();
      return !!current && current.id === this.id;
    }
  }, {
    key: "isCurrentAsync",
    value: function () {
      var current;
      return _regeneratorRuntime().async(function (_context) {
        while (1) {
          switch (_context.prev = _context.next) {
            case 0:
              _context.next = 2;
              return _regeneratorRuntime().awrap(ParseUser.currentAsync());

            case 2:
              current = _context.sent;
              return _context.abrupt("return", !!current && current.id === this.id);

            case 4:
            case "end":
              return _context.stop();
          }
        }
      }, null, this, null, Promise);
    }
  }, {
    key: "getUsername",
    value: function () {
      var username = this.get('username');

      if (username == null || typeof username === 'string') {
        return username;
      }

      return '';
    }
  }, {
    key: "setUsername",
    value: function (username) {
      var authData = this.get('authData');

      if (authData && typeof authData === 'object' && authData.hasOwnProperty('anonymous')) {
        authData.anonymous = null;
      }

      this.set('username', username);
    }
  }, {
    key: "setPassword",
    value: function (password) {
      this.set('password', password);
    }
  }, {
    key: "getEmail",
    value: function () {
      var email = this.get('email');

      if (email == null || typeof email === 'string') {
        return email;
      }

      return '';
    }
  }, {
    key: "setEmail",
    value: function (email) {
      return this.set('email', email);
    }
  }, {
    key: "getSessionToken",
    value: function () {
      var token = this.get('sessionToken');

      if (token == null || typeof token === 'string') {
        return token;
      }

      return '';
    }
  }, {
    key: "authenticated",
    value: function () {
      var current = ParseUser.current();
      return !!this.get('sessionToken') && !!current && current.id === this.id;
    }
  }, {
    key: "signUp",
    value: function (attrs, options) {
      options = options || {};
      var signupOptions = {};

      if (options.hasOwnProperty('useMasterKey')) {
        signupOptions.useMasterKey = options.useMasterKey;
      }

      if (options.hasOwnProperty('installationId')) {
        signupOptions.installationId = options.installationId;
      }

      if (options.hasOwnProperty('context') && Object.prototype.toString.call(options.context) === '[object Object]') {
        signupOptions.context = options.context;
      }

      var controller = _CoreManager.default.getUserController();

      return controller.signUp(this, attrs, signupOptions);
    }
  }, {
    key: "logIn",
    value: function (options) {
      options = options || {};
      var loginOptions = {
        usePost: true
      };

      if (options.hasOwnProperty('useMasterKey')) {
        loginOptions.useMasterKey = options.useMasterKey;
      }

      if (options.hasOwnProperty('installationId')) {
        loginOptions.installationId = options.installationId;
      }

      if (options.hasOwnProperty('usePost')) {
        loginOptions.usePost = options.usePost;
      }

      var controller = _CoreManager.default.getUserController();

      return controller.logIn(this, loginOptions);
    }
  }, {
    key: "save",
    value: function () {
      var _len,
          args,
          _key4,
          current,
          _args2 = arguments;

      return _regeneratorRuntime().async(function (_context2) {
        while (1) {
          switch (_context2.prev = _context2.next) {
            case 0:
              for (_len = _args2.length, args = new Array(_len), _key4 = 0; _key4 < _len; _key4++) {
                args[_key4] = _args2[_key4];
              }

              _context2.next = 3;
              return _regeneratorRuntime().awrap((0, _get2.default)((0, _getPrototypeOf2.default)(ParseUser.prototype), "save", this).apply(this, args));

            case 3:
              _context2.next = 5;
              return _regeneratorRuntime().awrap(this.isCurrentAsync());

            case 5:
              current = _context2.sent;

              if (!current) {
                _context2.next = 8;
                break;
              }

              return _context2.abrupt("return", _CoreManager.default.getUserController().updateUserOnDisk(this));

            case 8:
              return _context2.abrupt("return", this);

            case 9:
            case "end":
              return _context2.stop();
          }
        }
      }, null, this, null, Promise);
    }
  }, {
    key: "destroy",
    value: function () {
      var _len2,
          args,
          _key5,
          current,
          _args3 = arguments;

      return _regeneratorRuntime().async(function (_context3) {
        while (1) {
          switch (_context3.prev = _context3.next) {
            case 0:
              for (_len2 = _args3.length, args = new Array(_len2), _key5 = 0; _key5 < _len2; _key5++) {
                args[_key5] = _args3[_key5];
              }

              _context3.next = 3;
              return _regeneratorRuntime().awrap((0, _get2.default)((0, _getPrototypeOf2.default)(ParseUser.prototype), "destroy", this).apply(this, args));

            case 3:
              _context3.next = 5;
              return _regeneratorRuntime().awrap(this.isCurrentAsync());

            case 5:
              current = _context3.sent;

              if (!current) {
                _context3.next = 8;
                break;
              }

              return _context3.abrupt("return", _CoreManager.default.getUserController().removeUserFromDisk());

            case 8:
              return _context3.abrupt("return", this);

            case 9:
            case "end":
              return _context3.stop();
          }
        }
      }, null, this, null, Promise);
    }
  }, {
    key: "fetch",
    value: function () {
      var _len3,
          args,
          _key6,
          current,
          _args4 = arguments;

      return _regeneratorRuntime().async(function (_context4) {
        while (1) {
          switch (_context4.prev = _context4.next) {
            case 0:
              for (_len3 = _args4.length, args = new Array(_len3), _key6 = 0; _key6 < _len3; _key6++) {
                args[_key6] = _args4[_key6];
              }

              _context4.next = 3;
              return _regeneratorRuntime().awrap((0, _get2.default)((0, _getPrototypeOf2.default)(ParseUser.prototype), "fetch", this).apply(this, args));

            case 3:
              _context4.next = 5;
              return _regeneratorRuntime().awrap(this.isCurrentAsync());

            case 5:
              current = _context4.sent;

              if (!current) {
                _context4.next = 8;
                break;
              }

              return _context4.abrupt("return", _CoreManager.default.getUserController().updateUserOnDisk(this));

            case 8:
              return _context4.abrupt("return", this);

            case 9:
            case "end":
              return _context4.stop();
          }
        }
      }, null, this, null, Promise);
    }
  }, {
    key: "fetchWithInclude",
    value: function () {
      var _len4,
          args,
          _key7,
          current,
          _args5 = arguments;

      return _regeneratorRuntime().async(function (_context5) {
        while (1) {
          switch (_context5.prev = _context5.next) {
            case 0:
              for (_len4 = _args5.length, args = new Array(_len4), _key7 = 0; _key7 < _len4; _key7++) {
                args[_key7] = _args5[_key7];
              }

              _context5.next = 3;
              return _regeneratorRuntime().awrap((0, _get2.default)((0, _getPrototypeOf2.default)(ParseUser.prototype), "fetchWithInclude", this).apply(this, args));

            case 3:
              _context5.next = 5;
              return _regeneratorRuntime().awrap(this.isCurrentAsync());

            case 5:
              current = _context5.sent;

              if (!current) {
                _context5.next = 8;
                break;
              }

              return _context5.abrupt("return", _CoreManager.default.getUserController().updateUserOnDisk(this));

            case 8:
              return _context5.abrupt("return", this);

            case 9:
            case "end":
              return _context5.stop();
          }
        }
      }, null, this, null, Promise);
    }
  }, {
    key: "verifyPassword",
    value: function (password, options) {
      var username = this.getUsername() || '';
      return ParseUser.verifyPassword(username, password, options);
    }
  }], [{
    key: "readOnlyAttributes",
    value: function () {
      return ['sessionToken'];
    }
  }, {
    key: "extend",
    value: function (protoProps, classProps) {
      if (protoProps) {
        for (var _prop in protoProps) {
          if (_prop !== 'className') {
            Object.defineProperty(ParseUser.prototype, _prop, {
              value: protoProps[_prop],
              enumerable: false,
              writable: true,
              configurable: true
            });
          }
        }
      }

      if (classProps) {
        for (var _prop2 in classProps) {
          if (_prop2 !== 'className') {
            Object.defineProperty(ParseUser, _prop2, {
              value: classProps[_prop2],
              enumerable: false,
              writable: true,
              configurable: true
            });
          }
        }
      }

      return ParseUser;
    }
  }, {
    key: "current",
    value: function () {
      if (!canUseCurrentUser) {
        return null;
      }

      var controller = _CoreManager.default.getUserController();

      return controller.currentUser();
    }
  }, {
    key: "currentAsync",
    value: function () {
      if (!canUseCurrentUser) {
        return Promise.resolve(null);
      }

      var controller = _CoreManager.default.getUserController();

      return controller.currentUserAsync();
    }
  }, {
    key: "signUp",
    value: function (username, password, attrs, options) {
      attrs = attrs || {};
      attrs.username = username;
      attrs.password = password;
      var user = new this(attrs);
      return user.signUp({}, options);
    }
  }, {
    key: "logIn",
    value: function (username, password, options) {
      if (typeof username !== 'string') {
        return Promise.reject(new _ParseError.default(_ParseError.default.OTHER_CAUSE, 'Username must be a string.'));
      } else if (typeof password !== 'string') {
        return Promise.reject(new _ParseError.default(_ParseError.default.OTHER_CAUSE, 'Password must be a string.'));
      }

      var user = new this();

      user._finishFetch({
        username: username,
        password: password
      });

      return user.logIn(options);
    }
  }, {
    key: "become",
    value: function (sessionToken, options) {
      if (!canUseCurrentUser) {
        throw new Error('It is not memory-safe to become a user in a server environment');
      }

      options = options || {};
      var becomeOptions = {
        sessionToken: sessionToken
      };

      if (options.hasOwnProperty('useMasterKey')) {
        becomeOptions.useMasterKey = options.useMasterKey;
      }

      var controller = _CoreManager.default.getUserController();

      var user = new this();
      return controller.become(user, becomeOptions);
    }
  }, {
    key: "me",
    value: function (sessionToken) {
      var options = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : {};

      var controller = _CoreManager.default.getUserController();

      var meOptions = {
        sessionToken: sessionToken
      };

      if (options.useMasterKey) {
        meOptions.useMasterKey = options.useMasterKey;
      }

      var user = new this();
      return controller.me(user, meOptions);
    }
  }, {
    key: "hydrate",
    value: function (userJSON) {
      var controller = _CoreManager.default.getUserController();

      var user = new this();
      return controller.hydrate(user, userJSON);
    }
  }, {
    key: "logInWith",
    value: function (provider, options, saveOpts) {
      var user = new this();
      return user.linkWith(provider, options, saveOpts);
    }
  }, {
    key: "logOut",
    value: function () {
      var options = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : {};

      var controller = _CoreManager.default.getUserController();

      return controller.logOut(options);
    }
  }, {
    key: "requestPasswordReset",
    value: function (email, options) {
      options = options || {};
      var requestOptions = {};

      if (options.hasOwnProperty('useMasterKey')) {
        requestOptions.useMasterKey = options.useMasterKey;
      }

      var controller = _CoreManager.default.getUserController();

      return controller.requestPasswordReset(email, requestOptions);
    }
  }, {
    key: "requestEmailVerification",
    value: function (email, options) {
      options = options || {};
      var requestOptions = {};

      if (options.hasOwnProperty('useMasterKey')) {
        requestOptions.useMasterKey = options.useMasterKey;
      }

      var controller = _CoreManager.default.getUserController();

      return controller.requestEmailVerification(email, requestOptions);
    }
  }, {
    key: "verifyPassword",
    value: function (username, password, options) {
      if (typeof username !== 'string') {
        return Promise.reject(new _ParseError.default(_ParseError.default.OTHER_CAUSE, 'Username must be a string.'));
      }

      if (typeof password !== 'string') {
        return Promise.reject(new _ParseError.default(_ParseError.default.OTHER_CAUSE, 'Password must be a string.'));
      }

      options = options || {};
      var verificationOption = {};

      if (options.hasOwnProperty('useMasterKey')) {
        verificationOption.useMasterKey = options.useMasterKey;
      }

      var controller = _CoreManager.default.getUserController();

      return controller.verifyPassword(username, password, verificationOption);
    }
  }, {
    key: "allowCustomUserClass",
    value: function (isAllowed) {
      _CoreManager.default.set('PERFORM_USER_REWRITE', !isAllowed);
    }
  }, {
    key: "enableRevocableSession",
    value: function (options) {
      options = options || {};

      _CoreManager.default.set('FORCE_REVOCABLE_SESSION', true);

      if (canUseCurrentUser) {
        var current = ParseUser.current();

        if (current) {
          return current._upgradeToRevocableSession(options);
        }
      }

      return Promise.resolve();
    }
  }, {
    key: "enableUnsafeCurrentUser",
    value: function () {
      canUseCurrentUser = true;
    }
  }, {
    key: "disableUnsafeCurrentUser",
    value: function () {
      canUseCurrentUser = false;
    }
  }, {
    key: "_registerAuthenticationProvider",
    value: function (provider) {
      authProviders[provider.getAuthType()] = provider;
      ParseUser.currentAsync().then(function (current) {
        if (current) {
          current._synchronizeAuthData(provider.getAuthType());
        }
      });
    }
  }, {
    key: "_logInWith",
    value: function (provider, options, saveOpts) {
      var user = new this();
      return user.linkWith(provider, options, saveOpts);
    }
  }, {
    key: "_clearCache",
    value: function () {
      currentUserCache = null;
      currentUserCacheMatchesDisk = false;
    }
  }, {
    key: "_setCurrentUserCache",
    value: function (user) {
      currentUserCache = user;
    }
  }]);
  return ParseUser;
}(_ParseObject2.default);

_ParseObject2.default.registerSubclass('_User', ParseUser);

var DefaultController = {
  updateUserOnDisk: function (user) {
    var path = _Storage.default.generatePath(CURRENT_USER_KEY);

    var json = user.toJSON();
    delete json.password;
    json.className = '_User';
    var userData = JSON.stringify(json);

    if (_CoreManager.default.get('ENCRYPTED_USER')) {
      var crypto = _CoreManager.default.getCryptoController();

      userData = crypto.encrypt(json, _CoreManager.default.get('ENCRYPTED_KEY'));
    }

    return _Storage.default.setItemAsync(path, userData).then(function () {
      return user;
    });
  },
  removeUserFromDisk: function () {
    var path = _Storage.default.generatePath(CURRENT_USER_KEY);

    currentUserCacheMatchesDisk = true;
    currentUserCache = null;
    return _Storage.default.removeItemAsync(path);
  },
  setCurrentUser: function (user) {
    currentUserCache = user;

    user._cleanupAuthData();

    user._synchronizeAllAuthData();

    return DefaultController.updateUserOnDisk(user);
  },
  currentUser: function () {
    if (currentUserCache) {
      return currentUserCache;
    }

    if (currentUserCacheMatchesDisk) {
      return null;
    }

    if (_Storage.default.async()) {
      throw new Error('Cannot call currentUser() when using a platform with an async ' + 'storage system. Call currentUserAsync() instead.');
    }

    var path = _Storage.default.generatePath(CURRENT_USER_KEY);

    var userData = _Storage.default.getItem(path);

    currentUserCacheMatchesDisk = true;

    if (!userData) {
      currentUserCache = null;
      return null;
    }

    if (_CoreManager.default.get('ENCRYPTED_USER')) {
      var crypto = _CoreManager.default.getCryptoController();

      userData = crypto.decrypt(userData, _CoreManager.default.get('ENCRYPTED_KEY'));
    }

    userData = JSON.parse(userData);

    if (!userData.className) {
      userData.className = '_User';
    }

    if (userData._id) {
      if (userData.objectId !== userData._id) {
        userData.objectId = userData._id;
      }

      delete userData._id;
    }

    if (userData._sessionToken) {
      userData.sessionToken = userData._sessionToken;
      delete userData._sessionToken;
    }

    var current = _ParseObject2.default.fromJSON(userData);

    currentUserCache = current;

    current._synchronizeAllAuthData();

    return current;
  },
  currentUserAsync: function () {
    if (currentUserCache) {
      return Promise.resolve(currentUserCache);
    }

    if (currentUserCacheMatchesDisk) {
      return Promise.resolve(null);
    }

    var path = _Storage.default.generatePath(CURRENT_USER_KEY);

    return _Storage.default.getItemAsync(path).then(function (userData) {
      currentUserCacheMatchesDisk = true;

      if (!userData) {
        currentUserCache = null;
        return Promise.resolve(null);
      }

      if (_CoreManager.default.get('ENCRYPTED_USER')) {
        var crypto = _CoreManager.default.getCryptoController();

        userData = crypto.decrypt(userData.toString(), _CoreManager.default.get('ENCRYPTED_KEY'));
      }

      userData = JSON.parse(userData);

      if (!userData.className) {
        userData.className = '_User';
      }

      if (userData._id) {
        if (userData.objectId !== userData._id) {
          userData.objectId = userData._id;
        }

        delete userData._id;
      }

      if (userData._sessionToken) {
        userData.sessionToken = userData._sessionToken;
        delete userData._sessionToken;
      }

      var current = _ParseObject2.default.fromJSON(userData);

      currentUserCache = current;

      current._synchronizeAllAuthData();

      return Promise.resolve(current);
    });
  },
  signUp: function (user, attrs, options) {
    var username = attrs && attrs.username || user.get('username');
    var password = attrs && attrs.password || user.get('password');

    if (!username || !username.length) {
      return Promise.reject(new _ParseError.default(_ParseError.default.OTHER_CAUSE, 'Cannot sign up user with an empty username.'));
    }

    if (!password || !password.length) {
      return Promise.reject(new _ParseError.default(_ParseError.default.OTHER_CAUSE, 'Cannot sign up user with an empty password.'));
    }

    return user.save(attrs, options).then(function () {
      user._finishFetch({
        password: undefined
      });

      if (canUseCurrentUser) {
        return DefaultController.setCurrentUser(user);
      }

      return user;
    });
  },
  logIn: function (user, options) {
    var RESTController = _CoreManager.default.getRESTController();

    var stateController = _CoreManager.default.getObjectStateController();

    var auth = {
      username: user.get('username'),
      password: user.get('password')
    };
    return RESTController.request(options.usePost ? 'POST' : 'GET', 'login', auth, options).then(function (response) {
      user._migrateId(response.objectId);

      user._setExisted(true);

      stateController.setPendingOp(user._getStateIdentifier(), 'username', undefined);
      stateController.setPendingOp(user._getStateIdentifier(), 'password', undefined);
      response.password = undefined;

      user._finishFetch(response);

      if (!canUseCurrentUser) {
        return Promise.resolve(user);
      }

      return DefaultController.setCurrentUser(user);
    });
  },
  become: function (user, options) {
    var RESTController = _CoreManager.default.getRESTController();

    return RESTController.request('GET', 'users/me', {}, options).then(function (response) {
      user._finishFetch(response);

      user._setExisted(true);

      return DefaultController.setCurrentUser(user);
    });
  },
  hydrate: function (user, userJSON) {
    user._finishFetch(userJSON);

    user._setExisted(true);

    if (userJSON.sessionToken && canUseCurrentUser) {
      return DefaultController.setCurrentUser(user);
    } else {
      return Promise.resolve(user);
    }
  },
  me: function (user, options) {
    var RESTController = _CoreManager.default.getRESTController();

    return RESTController.request('GET', 'users/me', {}, options).then(function (response) {
      user._finishFetch(response);

      user._setExisted(true);

      return user;
    });
  },
  logOut: function (options) {
    var RESTController = _CoreManager.default.getRESTController();

    if (options.sessionToken) {
      return RESTController.request('POST', 'logout', {}, options);
    }

    return DefaultController.currentUserAsync().then(function (currentUser) {
      var path = _Storage.default.generatePath(CURRENT_USER_KEY);

      var promise = _Storage.default.removeItemAsync(path);

      if (currentUser !== null) {
        var currentSession = currentUser.getSessionToken();

        if (currentSession && (0, _isRevocableSession.default)(currentSession)) {
          promise = promise.then(function () {
            return RESTController.request('POST', 'logout', {}, {
              sessionToken: currentSession
            });
          });
        }

        currentUser._logOutWithAll();

        currentUser._finishFetch({
          sessionToken: undefined
        });
      }

      currentUserCacheMatchesDisk = true;
      currentUserCache = null;
      return promise;
    });
  },
  requestPasswordReset: function (email, options) {
    var RESTController = _CoreManager.default.getRESTController();

    return RESTController.request('POST', 'requestPasswordReset', {
      email: email
    }, options);
  },
  upgradeToRevocableSession: function (user, options) {
    var token, RESTController, result, session, current;
    return _regeneratorRuntime().async(function (_context6) {
      while (1) {
        switch (_context6.prev = _context6.next) {
          case 0:
            token = user.getSessionToken();

            if (token) {
              _context6.next = 3;
              break;
            }

            return _context6.abrupt("return", Promise.reject(new _ParseError.default(_ParseError.default.SESSION_MISSING, 'Cannot upgrade a user with no session token')));

          case 3:
            options.sessionToken = token;
            RESTController = _CoreManager.default.getRESTController();
            _context6.next = 7;
            return _regeneratorRuntime().awrap(RESTController.request('POST', 'upgradeToRevocableSession', {}, options));

          case 7:
            result = _context6.sent;
            session = new _ParseSession.default();

            session._finishFetch(result);

            user._finishFetch({
              sessionToken: session.getSessionToken()
            });

            _context6.next = 13;
            return _regeneratorRuntime().awrap(user.isCurrentAsync());

          case 13:
            current = _context6.sent;

            if (!current) {
              _context6.next = 16;
              break;
            }

            return _context6.abrupt("return", DefaultController.setCurrentUser(user));

          case 16:
            return _context6.abrupt("return", Promise.resolve(user));

          case 17:
          case "end":
            return _context6.stop();
        }
      }
    }, null, null, null, Promise);
  },
  linkWith: function (user, authData, options) {
    return user.save({
      authData: authData
    }, options).then(function () {
      if (canUseCurrentUser) {
        return DefaultController.setCurrentUser(user);
      }

      return user;
    });
  },
  verifyPassword: function (username, password, options) {
    var RESTController = _CoreManager.default.getRESTController();

    return RESTController.request('GET', 'verifyPassword', {
      username: username,
      password: password
    }, options);
  },
  requestEmailVerification: function (email, options) {
    var RESTController = _CoreManager.default.getRESTController();

    return RESTController.request('POST', 'verificationEmailRequest', {
      email: email
    }, options);
  }
};

_CoreManager.default.setUserController(DefaultController);

var _default = ParseUser;
exports.default = _default;