function $parcel$exportWildcard(dest, source) {
  Object.keys(source).forEach(function(key) {
    if (key === 'default' || key === '__esModule' || dest.hasOwnProperty(key)) {
      return;
    }

    Object.defineProperty(dest, key, {
      enumerable: true,
      get: function get() {
        return source[key];
      }
    });
  });

  return dest;
}
function $parcel$export(e, n, v, s) {
  Object.defineProperty(e, n, {get: v, set: s, enumerable: true, configurable: true});
}
var $b32915272a56adda$exports = {};

$parcel$export($b32915272a56adda$exports, "StoreValue", function () { return $b32915272a56adda$export$cd5fa4ab807ba876; });
var $3395cd47b6305262$export$f6e2535fb5126e54 = function(val) {
    return typeof val === "function";
};
var $3395cd47b6305262$export$fce6876652108ab = function(val) {
    return typeof val === "undefined";
};


var $b32915272a56adda$export$cd5fa4ab807ba876 = function(initialValue) {
    var _val;
    var _callbacks = [];
    var _errorCallbacks = [];
    var _onCompleteCallbacks = [];
    var _innerSubscriptions = [];
    var subscriptions = [];
    var subscribe = function(cb, error) {
        cb && _callbacks.push(cb);
        error && _errorCallbacks.push(error);
        var subscription = {
            errId: error,
            subId: cb || undefined
        };
        subscriptions.push(subscription);
        cb === null || cb === void 0 ? void 0 : cb.call(null, _val);
        return {
            unsubcsribe: function() {
                return unsubscribe(subscription);
            }
        };
    };
    var unsubscribe = function(subscription) {
        _callbacks = _callbacks.filter(function(c) {
            return c !== subscription.subId;
        });
        _errorCallbacks = _errorCallbacks.filter(function(c) {
            return c !== subscription.errId;
        });
        _innerSubscriptions.forEach(function(c) {
            return $3395cd47b6305262$export$f6e2535fb5126e54(c) ? c() : c.unsubcsribe();
        });
        _innerSubscriptions = [];
    };
    var next = function(val) {
        _val = val;
        _callbacks.forEach(function(cb) {
            return cb.call(null, _val);
        });
    };
    var complete = function() {
        _callbacks.forEach(function(cb) {
            return unsubscribe({
                subId: cb
            });
        });
        _onCompleteCallbacks.forEach(function(cb) {
            return cb.call(null);
        });
        _onCompleteCallbacks = [];
        _innerSubscriptions.forEach(function(c) {
            return $3395cd47b6305262$export$f6e2535fb5126e54(c) ? c() : c.unsubcsribe();
        });
        _innerSubscriptions = [];
    };
    var onComplete = function(cb) {
        _onCompleteCallbacks.push(cb);
    };
    var addInnerSubscriber = function(subscriber) {
        _innerSubscriptions.push(subscriber);
    };
    var cancelInnerSubscription = function() {
        _innerSubscriptions.forEach(function(c) {
            return $3395cd47b6305262$export$f6e2535fb5126e54(c) ? c() : c.unsubcsribe();
        });
    // _innerSubscriptions = [];
    };
    var asObservable = function() {
        return {
            subscribe: subscribe,
            pipe: pipe
        };
    };
    var asSafeObservable = function() {
        return {
            subscribe: subscribe,
            pipe: pipe,
            addInnerSubscriber: addInnerSubscriber,
            cancelInnerSubscription: cancelInnerSubscription,
            asObservable: asObservable
        };
    };
    var store = {
        subscribe: subscribe,
        next: next,
        asObservable: asObservable,
        complete: complete,
        pipe: pipe,
        onComplete: onComplete,
        addInnerSubscriber: addInnerSubscriber,
        cancelInnerSubscription: cancelInnerSubscription,
        asSafeObservable: asSafeObservable
    };
    function pipe() {
        for(var _len = arguments.length, args = new Array(_len), _key = 0; _key < _len; _key++){
            args[_key] = arguments[_key];
        }
        if (!args.length) return store;
        return args.reduceRight(function(y, f) {
            return f(y);
        }, store);
    }
    /* function lift(operator: any) {
    const c = StoreValue();
    // c.operator = operator;
  }
  */ !$3395cd47b6305262$export$fce6876652108ab(initialValue) && next(initialValue);
    return store;
};


var $6d5060b31aecfd0f$exports = {};
var $c050cba4251e1c11$exports = {};

$parcel$export($c050cba4251e1c11$exports, "map", function () { return $c050cba4251e1c11$export$871de8747c9eaa88; });

var $c050cba4251e1c11$export$871de8747c9eaa88 = function(opFunc) {
    return function(source) {
        var mapSource = $b32915272a56adda$export$cd5fa4ab807ba876();
        var subscription = source.subscribe(function(c) {
            mapSource.next(opFunc(c));
        });
        mapSource.onComplete(function() {
            return subscription.unsubcsribe();
        });
        var mapSourceObservable = mapSource.asSafeObservable();
        mapSourceObservable.addInnerSubscriber && mapSourceObservable.addInnerSubscriber(subscription);
        return mapSourceObservable;
    };
};


var $560d579e97dac1b5$exports = {};

$parcel$export($560d579e97dac1b5$exports, "switchMap", function () { return $560d579e97dac1b5$export$9f6ea8e48bc26eab; });

var $560d579e97dac1b5$export$9f6ea8e48bc26eab = function(opFunc) {
    return function(source) {
        var innerValue = $b32915272a56adda$export$cd5fa4ab807ba876();
        var sub = null;
        var currentSub = null;
        var addSub = function() {
            return innerValue.addInnerSubscriber(function() {
                sub === null || sub === void 0 ? void 0 : sub.unsubcsribe();
            });
        };
        // const cancelPreviousSubscription = () => sub.unsubcsribe();
        sub = source.subscribe(function(c1) {
            // innerValue.isComplete && innerValue.complete();
            innerValue.cancelInnerSubscription && innerValue.cancelInnerSubscription();
            currentSub === null || currentSub === void 0 ? void 0 : currentSub.unsubcsribe();
            currentSub = opFunc(c1).subscribe(function(c) {
                innerValue.next(c);
            });
            addSub();
        });
        // addSub();
        return innerValue.asSafeObservable();
    };
};


$parcel$exportWildcard($6d5060b31aecfd0f$exports, $c050cba4251e1c11$exports);
$parcel$exportWildcard($6d5060b31aecfd0f$exports, $560d579e97dac1b5$exports);


var $bd9bca934db32beb$exports = {};


$parcel$exportWildcard(module.exports, $b32915272a56adda$exports);
$parcel$exportWildcard(module.exports, $6d5060b31aecfd0f$exports);
$parcel$exportWildcard(module.exports, $bd9bca934db32beb$exports);


//# sourceMappingURL=index.js.map
