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
var $2cbbdaf2ccebdaa4$exports = {};

$parcel$export($2cbbdaf2ccebdaa4$exports, "StoreValue", () => $2cbbdaf2ccebdaa4$export$cd5fa4ab807ba876);
const $cc975f3cf5471fec$export$f6e2535fb5126e54 = (val)=>typeof val === "function"
;
const $cc975f3cf5471fec$export$fce6876652108ab = (val)=>typeof val === "undefined"
;


const $2cbbdaf2ccebdaa4$export$cd5fa4ab807ba876 = (initialValue)=>{
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
        cb?.call(null, _val);
        return {
            unsubcsribe: ()=>unsubscribe(subscription)
        };
    };
    const unsubscribe = (subscription)=>{
        _callbacks = _callbacks.filter((c)=>c !== subscription.subId
        );
        _errorCallbacks = _errorCallbacks.filter((c)=>c !== subscription.errId
        );
        _innerSubscriptions.forEach((c)=>$cc975f3cf5471fec$export$f6e2535fb5126e54(c) ? c() : c.unsubcsribe()
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
        _innerSubscriptions.forEach((c)=>$cc975f3cf5471fec$export$f6e2535fb5126e54(c) ? c() : c.unsubcsribe()
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
        _innerSubscriptions.forEach((c)=>$cc975f3cf5471fec$export$f6e2535fb5126e54(c) ? c() : c.unsubcsribe()
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
        return args.reduceRight((y, f)=>f(y)
        , store);
    }
    /* function lift(operator: any) {
    const c = StoreValue();
    // c.operator = operator;
  }
  */ !$cc975f3cf5471fec$export$fce6876652108ab(initialValue) && next(initialValue);
    return store;
};


var $ec27c0c5da7f9c37$exports = {};
var $6f4cd77ea7407eb2$exports = {};

$parcel$export($6f4cd77ea7407eb2$exports, "map", () => $6f4cd77ea7407eb2$export$871de8747c9eaa88);

const $6f4cd77ea7407eb2$export$871de8747c9eaa88 = (opFunc)=>{
    return (source)=>{
        const mapSource = $2cbbdaf2ccebdaa4$export$cd5fa4ab807ba876();
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


var $4eee772055efe9ca$exports = {};

$parcel$export($4eee772055efe9ca$exports, "switchMap", () => $4eee772055efe9ca$export$9f6ea8e48bc26eab);

const $4eee772055efe9ca$export$9f6ea8e48bc26eab = (opFunc)=>{
    return (source)=>{
        const innerValue = $2cbbdaf2ccebdaa4$export$cd5fa4ab807ba876();
        let sub = null;
        let currentSub = null;
        const addSub = ()=>innerValue.addInnerSubscriber(()=>{
                sub?.unsubcsribe();
            })
        ;
        // const cancelPreviousSubscription = () => sub.unsubcsribe();
        sub = source.subscribe((c1)=>{
            // innerValue.isComplete && innerValue.complete();
            innerValue.cancelInnerSubscription && innerValue.cancelInnerSubscription();
            currentSub?.unsubcsribe();
            currentSub = opFunc(c1).subscribe((c)=>{
                innerValue.next(c);
            });
            addSub();
        });
        // addSub();
        return innerValue.asSafeObservable();
    };
};


$parcel$exportWildcard($ec27c0c5da7f9c37$exports, $6f4cd77ea7407eb2$exports);
$parcel$exportWildcard($ec27c0c5da7f9c37$exports, $4eee772055efe9ca$exports);


var $1af1058073d15b45$exports = {};


$parcel$exportWildcard(module.exports, $2cbbdaf2ccebdaa4$exports);
$parcel$exportWildcard(module.exports, $ec27c0c5da7f9c37$exports);
$parcel$exportWildcard(module.exports, $1af1058073d15b45$exports);


//# sourceMappingURL=index.js.map
