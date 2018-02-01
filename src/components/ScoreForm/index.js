import React from 'react';
import ScoreInput from '../ScoreInput';
import classes from './styles.scss';

export default function ScoreForm() {
  return (
    <div className={classes.container}>
      <div>Please choose score</div>
      <ScoreInput />
      <div>or choose</div>
      <button>Randomly</button>
    </div>
  );
}
