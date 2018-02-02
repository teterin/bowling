import React from 'react';
import classes from './styles.scss';
import ScoreForm from '../ScoreForm';

export default function GamePage({
  next, currentScoreLimit, frame, roll,
}) {
  return (
    <div className={classes.container}>
      <div className={classes.header}>
        <h5>Frame #{frame}</h5>
        <h6>Roll #{roll}</h6>
      </div>
      <div className={classes.content}>
        <ScoreForm onSelect={next} limit={currentScoreLimit} />
      </div>
    </div>
  );
}
