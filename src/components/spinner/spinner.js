import React from 'react';
import './spinner.css';

export default function (props) {
  let bounceStyle = {};
  let className = "spinner";

  if (props.size) {
    bounceStyle.width = bounceStyle.height = props.size;
  }

  if (props.class) {
    className = className + ' ' + props.class;
  }

  return (
    <div className={className}>
      <div className="bounce1" style={bounceStyle}></div>
      <div className="bounce2" style={bounceStyle}></div>
      <div className="bounce3" style={bounceStyle}></div>
    </div>
  );
};