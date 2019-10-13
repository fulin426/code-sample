import React from "react";
import { Spinner } from "reactstrap";
import "./button-spinner.css";

const ButtonSpinner = ({ isFetching, buttonName }) => {
  if (isFetching) {
    return <Spinner color="light" className="button-styles" />;
  } else {
    return <div>{buttonName}</div>;
  }
};

export default ButtonSpinner;
