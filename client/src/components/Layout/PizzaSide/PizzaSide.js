import React from "react";
import { Link } from "react-router-dom";

export const PizzaSide = (props) => {
  const classes = ["pizzaSide"];
  if (props.custom) {
    classes.push(props.custom.toString());
  }
  return (
    <Link to="/menu" className={classes.join(" ")}>
      <div className="content">{props.children}</div>
    </Link>
  );
};
