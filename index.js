import React from "react";
import ReactDOM from "react-dom/client";
import "./index.css";
// import App from "./App";
import { createStore } from "redux";
import { Provider } from "react-redux";
import reducer from "./components/reducers";
import reportWebVitals from "./reportWebVitals";
import MainComponent from "./components/mainComponents";
import "bootstrap/dist/css/bootstrap.css";
import "bootstrap-icons/font/bootstrap-icons.json";
import { BrowserRouter } from "react-router-dom";
const root = ReactDOM.createRoot(document.getElementById("root"));

const store = createStore(
  reducer,
  window.__REDUX_DEVTOOLS_EXTENSION__ && window.__REDUX_DEVTOOLS_EXTENSION__()
);
root.render(
  <React.StrictMode>
    <Provider store={store}>
      <BrowserRouter>
        <MainComponent />
      </BrowserRouter>
    </Provider>
  </React.StrictMode>
);

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();
