/* eslint-disable @typescript-eslint/explicit-module-boundary-types */
import {
    FuncSubscriber,
    Subscription,
    Subscriber,
    ReactiveObject,
    Operator,
    SafeReactiveObject,
    InnerSubscriber,
    Store,
} from "../models/model";
import { isFunction, isUndefined } from "../utils/type-utils";

/**
 * Creates a reactive store
 * @param  {T} initialValue?
 * @returns Store
 */
export const StoreValue = <T>(initialValue?: T): Store<T> => {
    let _val: any;
    let _callbacks: FuncSubscriber<T>[] = [];
    let _errorCallbacks: FuncSubscriber<T>[] = [];
    let _onCompleteCallbacks: FuncSubscriber<T>[] = [];
    let _innerSubscriptions: any[] = [];
    const subscriptions: Subscription<T>[] = [];

    const subscribe = (cb?: FuncSubscriber<T>, error?: any): Subscriber => {
        cb && _callbacks.push(cb);
        error && _errorCallbacks.push(error);

        const subscription = { errId: error, subId: cb || undefined };
        subscriptions.push(subscription);
        cb?.call(null, _val);

        return {
            unsubcsribe: () => unsubscribe(subscription),
        };
    };

    const unsubscribe = (subscription: Subscription<T>) => {
        _callbacks = _callbacks.filter((c) => c !== subscription.subId);
        _errorCallbacks = _errorCallbacks.filter((c) => c !== subscription.errId);
        _innerSubscriptions.forEach((c) => (isFunction(c) ? c() : c.unsubcsribe()));
        _innerSubscriptions = [];
    };

    const next = (val?: T) => {
        _val = val;
        _callbacks.forEach((cb) => cb.call(null, _val));
    };

    const complete = () => {
        _callbacks.forEach((cb) => unsubscribe({ subId: cb }));
        _onCompleteCallbacks.forEach((cb) => cb.call(null));
        _onCompleteCallbacks = [];
        _innerSubscriptions.forEach((c) => (isFunction(c) ? c() : c.unsubcsribe()));
        _innerSubscriptions = [];
    };

    const onComplete = (cb: FuncSubscriber<T>) => {
        _onCompleteCallbacks.push(cb);
    };

    const addInnerSubscriber = (subscriber: InnerSubscriber) => {
        _innerSubscriptions.push(subscriber);
    };

    const cancelInnerSubscription = () => {
        _innerSubscriptions.forEach((c) => (isFunction(c) ? c() : c.unsubcsribe()));
        // _innerSubscriptions = [];
    };

    const asObservable = (): ReactiveObject<T> => {
        return {
            subscribe,
            pipe,
        };
    };

    const asSafeObservable = (): SafeReactiveObject<T> => {
        return {
            subscribe,
            pipe,
            addInnerSubscriber,
            cancelInnerSubscription,
            asObservable,
        };
    };

    const store = {
        subscribe,
        next,
        asObservable,
        complete,
        pipe,
        onComplete,
        addInnerSubscriber,
        cancelInnerSubscription,
        asSafeObservable,
    };

    function pipe(...args: Operator<T>[]) {
        if (!args.length) {
            return store;
        }
        return args.reduceRight((y, f) => f(y as any), store) as any;
    }

    /* function lift(operator: any) {
    const c = StoreValue();
    // c.operator = operator;
  }
  */

    !isUndefined(initialValue) && next(initialValue);

    return store;
};
