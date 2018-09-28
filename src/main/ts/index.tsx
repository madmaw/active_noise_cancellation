import * as React from "react";
import * as ReactDOM from "react-dom";

import { Provider } from "react-redux";
import store from "./redux/store";

import NoiseCancellationStartComponent from "./components/NoiseCancellationStartComponent";
import NoiseCancellationOutputScaleComponent from "./components/NoiseCancellationOutputScaleComponent";
import NoiseCancellationLatencyComponent from "./components/NoiseCancellationLatencyComponent";
import NoiseCancellationInputScaleComponent from "./components/NoiseCancellationInputScaleComponent";
import NoiseCancellationWhiteNoiseScaleComponent from "./components/NoiseCancellationWhiteNoiseScaleComponent";

const rootElement = document.getElementById("root");
ReactDOM.render(
  <Provider store={store}>
    <div className="container">
        <NoiseCancellationInputScaleComponent />
        <NoiseCancellationOutputScaleComponent />
        <NoiseCancellationWhiteNoiseScaleComponent />
        <NoiseCancellationLatencyComponent />
        <NoiseCancellationStartComponent />
    </div>
  </Provider>,
  rootElement
);