import React from "react";
import ReactDOM from "react-dom";
import { RenderAfterNavermapsLoaded } from "react-naver-maps";
import App from "App";
import "index.scss";

ReactDOM.render(
  <React.StrictMode>
    <RenderAfterNavermapsLoaded
      ncpClientId={process.env.REACT_APP_NCP_CLIENT_ID}
    >
      <App />
    </RenderAfterNavermapsLoaded>
  </React.StrictMode>,
  document.getElementById("root")
);
