import React, { useState } from "react";

function Room({ food,orderIdFood }) {
  return (
    <div className="row bs">
      <div className="col-md-4">
        <img src={food.image} alt="error" className="smallimg" />
      </div>
      <div className="col-md-7">
        <h1>{food.name}</h1>
        <b>
          <p>Price: ${food.price}</p>
          <p>Type: {food.type}</p>
        </b>
        <div style={{ float: "right" }}>
          <button className="btn btn-primary" onClick={()=>orderIdFood(food.id)}>Add Food</button>
        </div>
      </div>
    </div>
  );
}

export default Room;
