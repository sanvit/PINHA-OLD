import React, { useState } from "react";
import "components/feature/Home/PlaceList.scss";
import PlaceItem from "./PlaceItem";

const PlaceList = () => {
  const [places, setPlaces] = useState([
    {
      id: 1,
      name: "가게1",
    },
    {
      id: 2,
      name: "가게2",
    },
    {
      id: 3,
      name: "가게3",
    },
    {
      id: 4,
      name: "가게4",
    },
    {
      id: 5,
      name: "가게5",
    },
  ]);
  return (
    <ul className="placeList">
      {places.map((place) => (
        <PlaceItem key={place.id} place={place} />
      ))}
    </ul>
  );
};

export default PlaceList;
