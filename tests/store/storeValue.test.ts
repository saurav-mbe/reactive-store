import { StoreValue } from "../../src";

describe("Reactive Store", () => {
    it("should call the subscriber callback with next value", () => {
        const storeValue = StoreValue();
        const callback = jest.fn();

        storeValue.subscribe(callback);

        storeValue.next(10);

        expect(callback).toBeCalledWith(10);
    })

    it("should call multiple subscriber callback with next value", () => {
        const storeValue = StoreValue();
        const callback1 = jest.fn();
        const callback2 = jest.fn();

        storeValue.subscribe(callback1);
        storeValue.subscribe(callback2);

        storeValue.next(10);

        expect(callback1).toBeCalledWith(10);
        expect(callback2).toBeCalledWith(10);
    })

    it("[asObservable] : should convert store to observable", () => {
        const observable:any = StoreValue().asObservable();

        expect(observable.next).toBeUndefined();
    })
})