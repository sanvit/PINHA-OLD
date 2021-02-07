const version = "v1";

// export const API_HOST = process.env.REACT_APP_API_HOST + version;
export const API_HOST = "http://localhost:8000/api/" + version;

const API_URL = {
  pinha: {
    stores: {
      kakao: `${API_HOST}/pinha/stores/kakao`,
    },
  },
  users: {},
};

export default API_URL;
