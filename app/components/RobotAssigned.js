import React from "react";

const RobotsAssigned = (props) => {
  const { robot } = props;

  return (
    <div id="single-robot-project">
      <img src={robot.imageUrl} />
      <div id="single-details">
        <p>Name: {robot.name}</p>
        <p>Fuel Type: {robot.fuelType}</p>
        <p>Fuel Level: {robot.fuelLevel}</p>
      </div>
    </div>
  );
};

export default RobotsAssigned;
