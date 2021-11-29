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
var $04e09b9be04c0484$exports = {};

$parcel$export($04e09b9be04c0484$exports, "StoreValue", () => $04e09b9be04c0484$export$cd5fa4ab807ba876);
const $559abe024f48324b$export$f6e2535fb5126e54 = (val)=>typeof val === "function"
;
const $559abe024f48324b$export$fce6876652108ab = (val)=>typeof val === "undefined"
;


const $04e09b9be04c0484$export$cd5fa4ab807ba876 = (initialValue)=>{
    let _val;
    let _callbacks = [];
    let _errorCallbacks = [];
    let _onCompleteCallbacks = [];
    let _innerSubscriptions = [];
    const subscriptions = [];
    const subscribe = (cb, error)=>{
        cb && _callbacks.push(cb);
        error && _errorCallbacks.push(error);
        const subscription = {
            errId: error,
            subId: cb || undefined
        };
        subscriptions.push(subscription);
        cb === null || cb === void 0 ? void 0 : cb.call(null, _val);
        return {
            unsubcsribe: ()=>unsubscribe(subscription)
        };
    };
    const unsubscribe = (subscription)=>{
        _callbacks = _callbacks.filter((c)=>c !== subscription.subId
        );
        _errorCallbacks = _errorCallbacks.filter((c)=>c !== subscription.errId
        );
        _innerSubscriptions.forEach((c)=>$559abe024f48324b$export$f6e2535fb5126e54(c) ? c() : c.unsubcsribe()
        );
        _innerSubscriptions = [];
    };
    const next = (val)=>{
        _val = val;
        _callbacks.forEach((cb)=>cb.call(null, _val)
        );
    };
    const complete = ()=>{
        _callbacks.forEach((cb)=>unsubscribe({
                subId: cb
            })
        );
        _onCompleteCallbacks.forEach((cb)=>cb.call(null)
        );
        _onCompleteCallbacks = [];
        _innerSubscriptions.forEach((c)=>$559abe024f48324b$export$f6e2535fb5126e54(c) ? c() : c.unsubcsribe()
        );
        _innerSubscriptions = [];
    };
    const onComplete = (cb)=>{
        _onCompleteCallbacks.push(cb);
    };
    const addInnerSubscriber = (subscriber)=>{
        _innerSubscriptions.push(subscriber);
    };
    const cancelInnerSubscription = ()=>{
        _innerSubscriptions.forEach((c)=>$559abe024f48324b$export$f6e2535fb5126e54(c) ? c() : c.unsubcsribe()
        );
    // _innerSubscriptions = [];
    };
    const asObservable = ()=>{
        return {
            subscribe: subscribe,
            pipe: pipe
        };
    };
    const asSafeObservable = ()=>{
        return {
            subscribe: subscribe,
            pipe: pipe,
            addInnerSubscriber: addInnerSubscriber,
            cancelInnerSubscription: cancelInnerSubscription,
            asObservable: asObservable
        };
    };
    const store = {
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
    function pipe(...args) {
        if (!args.length) return store;
        return args.reduce((y, f)=>f(y)
        , store);
    }
    /* function lift(operator: any) {
    const c = StoreValue();
    // c.operator = operator;
  }
  */ !$559abe024f48324b$export$fce6876652108ab(initialValue) && next(initialValue);
    return store;
};


var $c1aeb346e685fc41$exports = {};
var $bf3cb3dc44212e82$exports = {};

$parcel$export($bf3cb3dc44212e82$exports, "map", () => $bf3cb3dc44212e82$export$871de8747c9eaa88);

const $bf3cb3dc44212e82$export$871de8747c9eaa88 = (opFunc)=>{
    return (source)=>{
        const mapSource = $04e09b9be04c0484$export$cd5fa4ab807ba876();
        const subscription = source.subscribe((c)=>{
            mapSource.next(opFunc(c));
        });
        mapSource.onComplete(()=>subscription.unsubcsribe()
        );
        const mapSourceObservable = mapSource.asSafeObservable();
        mapSourceObservable.addInnerSubscriber && mapSourceObservable.addInnerSubscriber(subscription);
        return mapSourceObservable;
    };
};


var $454205cb45f8a865$exports = {};

$parcel$export($454205cb45f8a865$exports, "switchMap", () => $454205cb45f8a865$export$9f6ea8e48bc26eab);

const $454205cb45f8a865$export$9f6ea8e48bc26eab = (opFunc)=>{
    return (source)=>{
        const innerValue = $04e09b9be04c0484$export$cd5fa4ab807ba876();
        let sub = null;
        let currentSub = null;
        const addSub = ()=>{
            return innerValue.addInnerSubscriber(()=>{
                sub === null || sub === void 0 ? void 0 : sub.unsubcsribe();
            });
        };
        // const cancelPreviousSubscription = () => sub.unsubcsribe();
        sub = source.subscribe((c1)=>{
            // innerValue.isComplete && innerValue.complete();
            innerValue.cancelInnerSubscription && innerValue.cancelInnerSubscription();
            currentSub === null || currentSub === void 0 ? void 0 : currentSub.unsubcsribe();
            currentSub = opFunc(c1).subscribe((c)=>{
                innerValue.next(c);
            });
            addSub();
        });
        // addSub();
        return innerValue.asSafeObservable();
    };
};


$parcel$exportWildcard($c1aeb346e685fc41$exports, $bf3cb3dc44212e82$exports);
$parcel$exportWildcard($c1aeb346e685fc41$exports, $454205cb45f8a865$exports);


var $31d3badf3cd0945e$exports = {};


$parcel$exportWildcard(module.exports, $04e09b9be04c0484$exports);
$parcel$exportWildcard(module.exports, $c1aeb346e685fc41$exports);
$parcel$exportWildcard(module.exports, $31d3badf3cd0945e$exports);


//# sourceMappingURL=index.js.map
