# reactive-store
A lightweight reactive library inspired from rxjs with publish subscribe functions and operators

Create a store


```typescript
import { StoreValue } from "reactive-store";

const newStore = StoreValue<string>();

// Publish a value
newStore.next("next value");

// convert to observable
const obs = newStore.asObservable();

// subscribe to observable or the store
obs.subscribe(c => console.log(c);

// or 
newStore.subscribe(c => console.log(c);

```

Operator Chaining : currently there are only 2 operators map and switchMap, few more such as take and sharedReplay will be added soon

```typescript
import { switchMap, map, ReactiveStore } from "reactive-store";

const obs = StoreValue<string>().asObservable()

const newObs = obs.pipe(switchMap(c => StoreValue<number>(4)), map(n => n*4));

newObs.subscribe(c => console.log(c));

```

There is only partial type support for the library right now.
