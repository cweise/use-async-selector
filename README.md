# use-async-selector

## Why

We had to do heavy calculations in our redux selectors and wanted to put them in a web worker. But **useSelector()** was not made for async stuff. That is why we needed a hook, that was able to handle async operations with access to the redux store. Now we can do all the heavy calculations within web workers.

## Installation

```bash
npm i use-async-selector
```

## Usage

```javascript
import { useAsyncSelector } from "use-async-selector";

const myAsyncSelector = async state => fetch(`https://niceurl.com/${state.id}`);

const MyComponent = () => {
  const { loading, error, data } = useAsyncSelector(myAsyncSelector);

  // do stuff
  ...
}
```

## Function Signature

**useAsyncSelector(func: function): Object**

## Params

| Param | Type     | Description                          |
| ----- | -------- | ------------------------------------ |
| func  | function | True, if promise is not resolved yet |

## Result

| Property | Type          | Description                          |
| -------- | ------------- | ------------------------------------ |
| loading  | boolean       | True, if promise is not resolved yet |
| error    | boolean       | True, if promise is rejected         |
| data     | null \| mixed | Not null, if promise is resolved.    |

## Setup

To demonstrate its power, we are using the **workerize-loader** webpack plugin. But all other async stuff will work too.

### 1. Create a redux store

**app.js**

```javascript
import { createStore } from "redux";

const defaultState = {
  items: [2, 3, 4, 5]
};

const reducer = (state = defaultState, action) => state;
const store = createStore(reducer);

const App = () => {
  return (
    <Provider store={store}>
      <MyComponent />
    </Provider>
  );
};
```

### 2. Create an async function

In our case, it is an exported worker function, that returns a **promise**.

**worker.js**

```javascript
// put your heavy stuff here
export const selectItems = state => state.items.reverse();
```

### 3. Use the redux state within an async selector

**my-component.js**

```javascript
import worker from "workerize-loader!./worker";
import { useAsyncSelector } from "use-asnyc-selector";

// create a worker instance
const instance = worker();

const MyComponent = () => {
  const { loading, error, data } = useAsyncSelector(instance.selectItems);

  if (loading || error) {
    return null;
  }

  // do stuff with the data
  console.log(data);
};
```

## Examples

[Web worker example](https://competent-lamport-f43d76.netlify.com/)
