/* eslint-disable import/no-webpack-loader-syntax */
import React from "react";
import { Provider } from "react-redux";
import { createStore } from "redux";
import { useAsyncSelector } from "use-async-selector";

// eslint-disable-next-line import/no-webpack-loader-syntax
import worker from "workerize-loader!./worker";

const instance = worker();

const defaultState = {
  items: [2, 3, 4, 5]
};

const reducer = (state = defaultState, { type }) => state;
const store = createStore(reducer);

const ListContainer = () => {
  const { loading, error, data } = useAsyncSelector(instance.selectItems);

  if (loading) return <p>Loading ...</p>;
  if (error) return <p>Error</p>;

  return <List items={data} />;
};

const List = ({ items }) => (
  <ul>
    {items?.map(item => (
      <li>{item}</li>
    ))}
  </ul>
);

function App() {
  return (
    <Provider store={store}>
      <ListContainer />
    </Provider>
  );
}

export default App;
