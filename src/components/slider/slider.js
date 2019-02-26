import React, { Component } from 'react';
import './slider.css';

export default function (props) {
  let onChange = props.onChange || (() => { });
  return (
    <label className="switch">
      <input type="checkbox" checked={!!props.on} onChange={onChange} />
      <span className={"slider round " + (props.on ? "slider_on" : "slider_off")}></span>
    </label>
  );
}