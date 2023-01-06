import React from "react";
import ReactDOM from "react-dom";
import "./App.css";
import { Provider } from "react-redux";
import store from "./Redux/store";
import App from "./App";
import reportWebVitals from "./reportWebVitals";
import { ChakraProvider, extendTheme } from "@chakra-ui/react";
import { BrowserRouter } from "react-router-dom";

import { MultiSelectTheme } from "chakra-multiselect";

const theme = extendTheme({
  components: {
    MultiSelect: MultiSelectTheme,
  },
});
ReactDOM.render(
  <ChakraProvider theme={theme}>
    <BrowserRouter>
      <Provider store={store}>
        <App />
      </Provider>
    </BrowserRouter>
  </ChakraProvider>,
  document.getElementById("root")
);

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();
