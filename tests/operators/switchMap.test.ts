import { StoreValue, switchMap } from "../../src"

describe("switchMap operator", () => {
    it("should return a new observable with new value", () => {
        const storeValue = StoreValue();
        const observable = storeValue.asObservable().pipe(switchMap((c:number) => {
            return StoreValue(c*2).asObservable();
        }));

        const callback = jest.fn();

        observable.subscribe(callback);

        storeValue.next(10);

        expect(callback).toBeCalledWith(20);
    })
})