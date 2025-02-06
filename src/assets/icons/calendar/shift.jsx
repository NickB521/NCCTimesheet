import React from 'react';
import './shift.css';

export function Shift(props) {
    return (
      <button className={`icon-btn add-btn ${props.className}`} onClick={props.onClick}>
        <span className="add-icon"></span>
        <span className="btn-txt">Add Shift</span>
      </button>
    );
  }