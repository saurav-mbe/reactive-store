import { Operator, OperatorSourceFn, ReactiveObject } from "../models/model";
import { StoreValue } from "../store/storeValue";


/**
 * @param  {<T>(value:T} opFunc
 * @returns OperatorSourceFn
 */
export const map: Operator<unknown> = (opFunc: <T>(value: T) => unknown) => {
    return (source: ReactiveObject<unknown>) => {
        const mapSource = StoreValue();

        const subscription = source.subscribe((c: any) => {
            mapSource.next(opFunc(c));
        });

        mapSource.onComplete(() => subscription.unsubcsribe());

        const mapSourceObservable = mapSource.asSafeObservable();

        mapSourceObservable.addInnerSubscriber && mapSourceObservable.addInnerSubscriber(subscription);

        return mapSourceObservable;
    };
};

