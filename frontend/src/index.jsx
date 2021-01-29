import React from "react";
import ReactDOM from "react-dom";
import { RenderAfterNavermapsLoaded } from "react-naver-maps";
import App from "App";
import "index.scss";

ReactDOM.render(
  <React.StrictMode>
    <RenderAfterNavermapsLoaded
      ncpClientId={process.env.REACT_APP_NCP_CLIENT_ID}
      error={<p>Maps Load Error</p>}
      loading={<p>Maps Loading...</p>}
    >
      <App />
    </RenderAfterNavermapsLoaded>
  </React.StrictMode>,
  document.getElementById("root")
);
