import React from 'react';
import 'bulma';

export const SPUser = (props) => {

  return (
    <div className="user-view">
      {props.firstName + " " + props.lastName} &nbsp;
      Email: {props.email} &nbsp;
      <button
        className="send-request-button"
        onClick={props.sendRequest}
      >
      Send matching Request
      </button>
    </div>
  );
}

export default SPUser;
