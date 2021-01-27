import React from "react";
import AppRouter from "AppRouter";
import { AppProvider as JWTProvider } from "stores/jwt-store";
import { RenderAfterNavermapsLoaded } from "react-naver-maps";

function App() {
  return (
    <RenderAfterNavermapsLoaded
      ncpClientId={process.env.REACT_APP_NCP_CLIENT_ID}
      error={<p>Maps Load Error</p>}
      loading={<p>Maps Loading...</p>}
    >
      <JWTProvider>
        <AppRouter />
      </JWTProvider>
    </RenderAfterNavermapsLoaded>
  );
}

export default App;
