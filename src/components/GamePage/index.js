import React from 'react';
import { withRouter } from 'react-router-dom';
import classes from './styles.scss';
import ScoreForm from '../ScoreForm';
import ScoreSheet from '../ScoreSheet';

function CurrentState({ frame, roll, player }) {
  return (
    <React.Fragment>
      <h5>Frame #{frame}</h5>
      <h6>Roll #{roll}</h6>
      <h6>Current player: {player}</h6>
    </React.Fragment>
  );
}

function GamePage({
  next, currentScoreLimit, frame, roll, isOver, game, history, player, isInit,
}) {
  const startOver = () => {
    history.push('/');
  };
  if (!isInit) {
    history.push('/');
    return null;
  }
  return (
    <div className={classes.container}>
      <div className={classes.header}>
        {!isOver ? (
          <CurrentState frame={frame} roll={roll} player={player} />
        ) : (
          <h5>Game is over</h5>
        )}
        <div className={classes.table}>
          <ScoreSheet game={game} />
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
