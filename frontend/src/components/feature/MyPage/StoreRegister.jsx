import React, { useState } from "react";
import axios from "axios";
import API_URL from "utils/api";

/*
[
    {
        "name": "가메이",
        "address": "인천 미추홀구 경인남길30번길 46",
        "id": "27480467",
        "phone": "032-866-5891",
        "category": "음식점 > 일식",
        "x": "126.656849673975",
        "y": "37.4517039507051"
    }
]
*/

const StoreRegister = () => {
  const [keyword, setKeyword] = useState("");
  const [stores, setStores] = useState([]);

  const handleChange = ({ target: { value } }) => {
    setKeyword(value);
  };

  const handleSubmit = async (event) => {
    event.preventDefault();

    if (keyword) {
      const config = {
        headers: {},
        params: {
          keyword,
        },
      };
      try {
        const { data } = await axios.get(
          `${API_URL.pinha.stores.kakao}`,
          config
        );
        setStores(data);
      } catch (error) {
        //TODO : 해당하는 가게가 없을 때 400 request를 반환 받는다. --> 부드럽게 수정
        alert(error.message);
      }

      setKeyword("");
    }
  };

  return (
    <div>
      <form onSubmit={handleSubmit}>
        <input
          type="text"
          placeholder="가게 검색"
          value={keyword}
          onChange={handleChange}
        />
        <button type="submit">검색!</button>
      </form>
      {/*TODO : Divide and Create Component (아래는 임시)*/}
      <ul>
        {stores.map((store) => (
          <li key={store.id}>
            <div>name : {store.name}</div>
            <div>address : {store.address}</div>
            <div>phone : {store.phone}</div>
            <div>category : {store.category}</div>
            <div>latitude : {store.x}</div>
            <div>longitude : {store.y}</div>
            <br />
            <hr />
          </li>
        ))}
      </ul>
    </div>
  );
};

export default StoreRegister;
