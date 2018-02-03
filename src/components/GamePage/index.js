import React from 'react';
import classes from './styles.scss';
import ScoreForm from '../ScoreForm';
import ScoreSheet from '../ScoreSheet';
import { withRouter } from 'react-router-dom';

function CurrentState({ frame, roll }) {
  return (
    <React.Fragment>
      <h5>Frame #{frame}</h5>
      <h6>Roll #{roll}</h6>
    </React.Fragment>
  );
}

function GamePage({
  start, next, currentScoreLimit, frame, roll, isOver, game, total, history,
}) {
  const startOver = () => {
    history.push('/');
  };

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
          <button className="btn btn-primary" onClick={startOver}>
            Start over
          </button>
        )}
      </div>
    </div>
  );
}

export default withRouter(GamePage);
