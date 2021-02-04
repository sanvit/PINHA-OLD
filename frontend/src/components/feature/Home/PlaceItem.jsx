import React from "react";
import "components/feature/Home/PlaceItem.scss";

const PlaceItem = ({ place }) => {
  return <li className="placeItem">{place.name}</li>;
};

export default PlaceItem;
