import React from "react";
import classNames from "classnames";
import "components/DayListItem.scss"

export default function DayListItem(props) {

  const dayClass = classNames("day-list__item", { 
    "day-list__item--selected": props.selected,
    "day-list__item--full": props.spots === 0
  });

  //Function that will format the props.spots
  const formatSpots = function(spots) {
    const totalSpots = props.spots;
    if (!totalSpots) {
      return "no spots remaining"
    } else if (totalSpots === 1) {
      return "1 spot remaining";
    } else {
      return `${totalSpots} spots remaining`;
    }
  }

  return (
    <li 
      className={dayClass}  
      onClick={() => props.setDay(props.name)}
    >
      <h2 className="text--regular">{props.name}</h2> 
      <h3 className="text--light">{formatSpots()}</h3>
    </li>
  );
}