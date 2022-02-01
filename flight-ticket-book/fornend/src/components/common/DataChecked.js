import { useContext } from "react";
import { Flight } from "../../context";
import { Navigate as Redirect } from "react-router-dom";

function DataChecked() {
  const { data } = useContext(Flight);
  if (!data?.searchData?.from) {
    return <Redirect to='/' />;
  }
  return "";
}

export default DataChecked;
