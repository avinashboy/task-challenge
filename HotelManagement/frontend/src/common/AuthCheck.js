import React, { useContext } from "react";
import { Navigate as Redirect } from "react-router-dom";
import { Smooth } from "../context";

function AuthChecking() {
  const { data } = useContext(Smooth);
  if (!data.metaInfo) {
    return <Redirect replace={true} to="/login" />;
  }
  return "";
}

export default AuthChecking;
