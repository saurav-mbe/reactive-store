import { Operator, OperatorSourceFn, ReactiveObject, Subscriber } from "../models/model";
import { StoreValue } from "../store/storeValue";

/**
 * @param  {<T>(value:T} opFunc
 * @returns OperatorSourceFn
 */
export const switchMap: Operator<unknown> = (opFunc: <T>(value: T) => ReactiveObject<unknown>): OperatorSourceFn => {
    return (source: ReactiveObject<unknown>) => {
        const innerValue = StoreValue();
        let sub: Subscriber | null = null;

        let currentSub: { unsubcsribe: any } | null = null;

        const addSub = () =>
            innerValue.addInnerSubscriber(() => {
                sub?.unsubcsribe();
            });

        // const cancelPreviousSubscription = () => sub.unsubcsribe();

        sub = source.subscribe((c: any) => {
            // innerValue.isComplete && innerValue.complete();
            innerValue.cancelInnerSubscription && innerValue.cancelInnerSubscription();

            currentSub?.unsubcsribe();
            currentSub = opFunc(c).subscribe((c: any) => {
                innerValue.next(c);
            });
            addSub();
        });

        // addSub();

        return innerValue.asSafeObservable();
    };
};
