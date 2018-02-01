import React from 'react';
import classes from './styles.scss';
import ScoreForm from '../ScoreForm';

export default function GamePage() {
  return (
    <div className={classes.container}>
      <div className={classes.header}>
        <h5>Frame #1</h5>
        <h6>Roll #1</h6>
      </div>
      <div className={classes.content}>
        <ScoreForm />
      </div>
    </div>
  );
}
