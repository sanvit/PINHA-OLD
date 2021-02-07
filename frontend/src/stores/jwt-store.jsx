import React, { createContext, useContext } from "react";
import { getStorageItem, setStorageItem } from "utils/local-storage";
import useReducerWithSideEffects, {
  UpdateWithSideEffect, // side effect를 사용할 때
  Update, // side effect가 없을 때
} from "use-reducer-with-side-effects";

// Storage Key
const STORAGE_KEY = "PINHA_STORAGE_KEY";

// Context Instance
const AppContext = createContext();

// Action Type
const SET_TOKEN = "SET_TOKEN";
const DELETE_TOKEN = "DELETE_TOKEN";

// Action
export const setToken = (token) => ({ type: SET_TOKEN, payload: token });
export const deleteToken = () => ({ type: DELETE_TOKEN });

// Reducer
const reducer = (prevState, action) => {
  const { type } = action;

  if (type === SET_TOKEN) {
    const { payload: jwtToken } = action;
    const newState = {
      ...prevState,
      jwtToken,
      isAuthenticated: true,
    };
    // return newState;
    return UpdateWithSideEffect(newState, () => {
      setStorageItem(STORAGE_KEY, jwtToken); // Side Effect
    });
  } else if (type === DELETE_TOKEN) {
    const newState = {
      ...prevState,
      jwtToken: "",
      isAuthenticated: false,
    };
    // return newState;
    return UpdateWithSideEffect(newState, () => {
      setStorageItem(STORAGE_KEY, ""); // Side Effect
    });
  } else return Update(prevState);
};

// Provider
export const AppProvider = ({ children }) => {
  const jwtToken = getStorageItem(STORAGE_KEY, "X-JWT");

  const initialState = {
    jwtToken,
    isAuthenticated: jwtToken.length > 0,
  };

  //   const [state, dispatch] = useReducer(reducer, initialState);
  const [state, dispatch] = useReducerWithSideEffects(reducer, initialState);

  return (
    <AppContext.Provider value={{ state, dispatch }}>
      {children}
    </AppContext.Provider>
  );
};

// Hook (Consumer)
export const useAppContext = () => useContext(AppContext);
