function $parcel$export(e, n, v, s) {
  Object.defineProperty(e, n, {get: v, set: s, enumerable: true, configurable: true});
}
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
var $64fcf84184d9157d$exports = {};

$parcel$export($64fcf84184d9157d$exports, "StoreValue", () => $64fcf84184d9157d$export$cd5fa4ab807ba876);
const $b8bed75284d25afc$export$f6e2535fb5126e54 = (val)=>typeof val === "function"
;
const $b8bed75284d25afc$export$fce6876652108ab = (val)=>typeof val === "undefined"
;


const $64fcf84184d9157d$export$cd5fa4ab807ba876 = (initialValue)=>{
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
        _innerSubscriptions.forEach((c)=>$b8bed75284d25afc$export$f6e2535fb5126e54(c) ? c() : c.unsubcsribe()
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
        _innerSubscriptions.forEach((c)=>$b8bed75284d25afc$export$f6e2535fb5126e54(c) ? c() : c.unsubcsribe()
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
        _innerSubscriptions.forEach((c)=>$b8bed75284d25afc$export$f6e2535fb5126e54(c) ? c() : c.unsubcsribe()
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
  */ !$b8bed75284d25afc$export$fce6876652108ab(initialValue) && next(initialValue);
    return store;
};


var $1242528f249ab417$exports = {};
var $a2e600ff1442937d$exports = {};

$parcel$export($a2e600ff1442937d$exports, "map", () => $a2e600ff1442937d$export$871de8747c9eaa88);

const $a2e600ff1442937d$export$871de8747c9eaa88 = (opFunc)=>{
    return (source)=>{
        const mapSource = $64fcf84184d9157d$export$cd5fa4ab807ba876();
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


var $d73d0d683ee94f13$exports = {};

$parcel$export($d73d0d683ee94f13$exports, "switchMap", () => $d73d0d683ee94f13$export$9f6ea8e48bc26eab);

const $d73d0d683ee94f13$export$9f6ea8e48bc26eab = (opFunc)=>{
    return (source)=>{
        const innerValue = $64fcf84184d9157d$export$cd5fa4ab807ba876();
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


$parcel$exportWildcard($1242528f249ab417$exports, $a2e600ff1442937d$exports);
$parcel$exportWildcard($1242528f249ab417$exports, $d73d0d683ee94f13$exports);


var $2c3ce220b11811e0$exports = {};




export {$64fcf84184d9157d$export$cd5fa4ab807ba876 as StoreValue, $a2e600ff1442937d$export$871de8747c9eaa88 as map, $d73d0d683ee94f13$export$9f6ea8e48bc26eab as switchMap};
//# sourceMappingURL=module.js.map
