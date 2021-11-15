export type FuncSubscriber<T> = (val?: T) => void;
export type Subscription<T> = {
    errId?: FuncSubscriber<T>;
    subId?: FuncSubscriber<T>;
};
export type Subscriber = {
    unsubcsribe: () => void;
};
export type InnerSubscriber = Subscriber | (() => void);
export type ReactiveObject<T> = {
    subscribe: (cb?: FuncSubscriber<T>, error?: FuncSubscriber<T>) => Subscriber;
    pipe: (...operator: Operator<T>[]) => ReactiveObject<T> | any;
};
export interface SafeReactiveObject<T> extends ReactiveObject<T> {
    addInnerSubscriber: (subscriber: Subscriber | (() => void)) => void;
    cancelInnerSubscription?: () => void;
    asObservable: () => ReactiveObject<T>;
}
export interface Store<T> extends SafeReactiveObject<T> {
    next: (val?: T) => void;
    asSafeObservable: () => SafeReactiveObject<T>;
    complete: () => void;
    onComplete: (fn: FuncSubscriber<T>) => void;
}
export type OperatorSourceFn = (source: ReactiveObject<any>) => ReactiveObject<any>;
export type Operator<T> = (opFunc: (value: T) => ReactiveObject<T>) => any;
/**
 * Creates a reactive store
 * @param  {T} initialValue?
 * @returns Store
 */
export const StoreValue: <T>(initialValue?: T | undefined) => Store<T>;
/**
 * @param  {<T>(value:T} opFunc
 * @returns OperatorSourceFn
 */
export const map: Operator<unknown>;
/**
 * @param  {<T>(value:T} opFunc
 * @returns OperatorSourceFn
 */
export const switchMap: Operator<unknown>;

//# sourceMappingURL=types.d.ts.map
