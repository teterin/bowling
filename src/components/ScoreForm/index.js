import React from 'react';
import ScoreInput from '../ScoreInput';
import classes from './styles.scss';

function getRandomValue(limit) {
  const min = 0;
  const max = Math.floor(limit);
  return Math.floor(Math.random() * (max - min + 1)) + min;
}

export default function ScoreForm({ onSelect, limit }) {
  const random = () => onSelect(getRandomValue(limit));

  return (
    <div className={classes.container}>
      <div className="font-italic text-muted">Please select score</div>
      <ScoreInput limit={limit} onSelect={onSelect} />
      <div className="font-italic text-muted">or</div>
      <button className="btn btn-primary" onClick={random}>
        Randomly
      </button>
    </div>
  );
}
