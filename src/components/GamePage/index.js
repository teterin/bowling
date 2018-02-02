import React from 'react';
import classes from './styles.scss';
import ScoreForm from '../ScoreForm';
import ScoreSheet from '../ScoreSheet';

function CurrentState({ frame, roll }) {
  return (
    <React.Fragment>
      <h5>Frame #{frame}</h5>
      <h6>Roll #{roll}</h6>
    </React.Fragment>
  );
}

export default function GamePage({
  start,
  next,
  currentScoreLimit,
  frame,
  roll,
  isOver,
  game,
  total,
}) {
  return (
    <div className={classes.container}>
      <div className={classes.header}>
        {!isOver ? <CurrentState frame={frame} roll={roll} /> : <h5>Game is over</h5>}
        <div className={classes.table}>
          <ScoreSheet data={game} total={total} />
        </div>
      </div>
      <div className={classes.content}>
        {!isOver ? (
          <ScoreForm onSelect={next} limit={currentScoreLimit} />
        ) : (
          <button className="btn btn-primary" onClick={start}>
            Start over
          </button>
        )}
      </div>
    </div>
  );
}
