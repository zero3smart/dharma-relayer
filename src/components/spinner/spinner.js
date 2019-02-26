import React, { Component } from 'react';
import './spinner.css';

export default function (props) {
  let bounceStyle = {};

  if (props.size) {
    bounceStyle.width = bounceStyle.height = props.size;
  }

  return (
    <div className="spinner">
      <div className="bounce1" style={bounceStyle}></div>
      <div className="bounce2" style={bounceStyle}></div>
      <div className="bounce3" style={bounceStyle}></div>
    </div>
  );
};