import React from 'react';
import logo from './logo.svg';
import './App.css';
import Main from "./cmp/layout/Main";
import motorSlice from "./state/MotorSlice";
import { Provider } from 'react-redux';
import {configureStore, getDefaultMiddleware} from "@reduxjs/toolkit";
import appSlice from "./state/AppSlice";
import ServerMiddleware from "./state/ServerMiddleware";

const middleware = [
    ServerMiddleware,
    ...getDefaultMiddleware()
];

const store = configureStore({
    reducer: {
        motor: motorSlice.reducer,
        app: appSlice.reducer
    },

    middleware
});

export type RootState = ReturnType<typeof store.getState>;

function App() {
  return (
    <div className="App">
        <Provider store={store}>
            <Main />
        </Provider>
    </div>
  );
}

export default App;
