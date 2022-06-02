import { map, StoreValue } from "../../src"

describe("map operator", () => {
    it("should transform incoming store value with the map function", () => {
        const storeValue = StoreValue();
        const observable = storeValue.asObservable().pipe(map((c:number) => c*2));
        
        const callback = jest.fn();

        observable.subscribe(callback);

        storeValue.next(10);

        expect(callback).toBeCalledWith(20);

    })
})