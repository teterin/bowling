import React from 'react';
import classes from './styles.scss';

export default function ScoreInput({ length = 11 }) {
  const model = Array(length).fill();
  return (
    <div className={classes.container}>
      {model.map((_, idx) => (
        <button type="button" className="btn btn-outline-primary btn-sm" key={idx}>
          {idx}
        </button>
      ))}
    </div>
  );
}
