import React from 'react';
import {
    Form,
  } from 'react-bootstrap';

const input = (props) => {

  return (<Form.Control
    {...props.elementConfig}
    value={props.value}
    onChange={props.changed}
    isInvalid={props.invalid && props.toutched}
    />);
};

export default input;