import React from "react";

function Error(props) {
  return (
      <div className={`alert alert-danger ${props.spaceM ? props.spaceM : null} ${props.spaceP ? props.spaceP : null}`} role="alert">
        {props.message}
      </div>
  );
}

export default Error;
