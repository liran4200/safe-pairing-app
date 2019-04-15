import React, { Component } from 'react';
import 'bulma';

export const SPUser = (props) => {

  return (
    <div className="user-view">
      {props.firstName + " " + props.lastName} &nbsp;
      Email: {props.email}
    </div>
  );
}

export default SPUser;
