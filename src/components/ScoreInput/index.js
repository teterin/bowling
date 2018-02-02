import React from 'react';
import classes from './styles.scss';

export default function ScoreInput({ limit, onSelect }) {
  const length = limit + 1;
  const model = Array(length).fill();

  return (
    <div className={classes.container}>
      {model.map((_, idx) => {
        const handleClick = () => onSelect(idx);
        return (
          <button
            type="button"
            className="btn btn-outline-primary btn-sm"
            key={idx}
            onClick={handleClick}
          >
            {idx}
          </button>
        );
      })}
    </div>
  );
}
