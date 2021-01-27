import React from "react";
import { Route, Redirect } from "react-router-dom";
import { useAppContext } from "context-store";

const LoginRequiredRoute = ({ component: Component, ...kwargs }) => {
  const {
    state: { isAuthenticated },
  } = useAppContext();

  return (
    <Route
      {...kwargs}
      render={(props) => {
        // console.log(props); // 컴포넌트에 넘어가는 Route 속성 값들
        if (isAuthenticated) {
          return <Component {...props} />;
        } else {
          return (
            <Redirect
              to={{
                pathname: "/auth", // 이동할 경로
                state: { from: props.location }, // 객체를 전달할 수 있다.
              }}
            />
          );
        }
      }}
    />
  );
};

export default LoginRequiredRoute;
