import React from "react";
import AppRouter from "AppRouter";
import { AppProvider as JWTProvider } from "stores/jwt-store";

function App() {
  return (
    <JWTProvider>
      <AppRouter />
    </JWTProvider>
  );
}

export default App;
