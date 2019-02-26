import React, { Component } from 'react';
import './slider.css';
import Spinner from '../spinner/spinner.js';

export default function (props) {
  let onChange = props.onChange || (() => { });
  return (
    <label className="switch">
      <input type="checkbox" checked={!!props.on} onChange={onChange} />
      <span className={"slider round " + (props.on ? "slider_on " : "slider_off ") + (props.loading ? "slider_loading" : "")}>
        {props.loading && (<Spinner size="5px" />)}
      </span>
    </label>
  );
}