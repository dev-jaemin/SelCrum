import React from "react";
import ReactDOM from "react-dom";
import "./index.css";
import IndexPage from "./containers/IndexPage";
import reportWebVitals from "./reportWebVitals";
import { BrowserRouter } from "react-router-dom";

import { createStore, applyMiddleware, compose } from "redux";
import { Provider } from "react-redux";
import logger from "redux-logger";
import { composeWithDevTools } from "redux-devtools-extension";

import rootReducer from "./modules";

import { persistStore } from "redux-persist";
import { PersistGate } from "redux-persist/integration/react";

import axios from "axios";

//axios.defaults.withCredentials = true;

// 배포 레벨에서는 리덕스 발동시 찍히는 logger를 사용하지 않습니다.
const enhancer =
  process.env.NODE_ENV === "production"
    ? compose(applyMiddleware())
    : composeWithDevTools(applyMiddleware(logger));

//chrome extension Redux devTools 적용 코드
const devTools =
  window.__REDUX_DEVTOOLS_EXTENSION__ && window.__REDUX_DEVTOOLS_EXTENSION__();

// 위에서 만든 reducer를 스토어 만들때 넣어줍니다
const store = createStore(rootReducer, devTools);

//새로고침하면 리덕스에 담긴 정보 날라가는거 방지하기 위해 로컬스토리지에 저장.
const persistor = persistStore(store);

ReactDOM.render(
  <React.StrictMode>
    <Provider store={store}>
      <PersistGate loading={null} persistor={persistor}>
        <BrowserRouter>
          <IndexPage />
        </BrowserRouter>
      </PersistGate>
    </Provider>
  </React.StrictMode>,
  document.getElementById("root")
);

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();
