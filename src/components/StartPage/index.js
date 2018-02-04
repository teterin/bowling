import React from 'react';
import { withRouter } from 'react-router-dom';
import classes from './styles.scss';
import PlayerForm from '../PlayerForm';
import PlayerList from '../PlayerList';

function StartPage({
  start, history, addPlayer, removePlayer, players,
}) {
  const handlerClick = () => {
    history.push('/game');
    start();
  };
  return (
    <div className={classes.container}>
      <div className={classes.players}>
        <h5>Players</h5>
        <PlayerForm onAdd={addPlayer} players={players} />
        <PlayerList data={players} onRemove={removePlayer} />
      </div>
      <div className={classes.startBtn}>
        <button type="button" className="btn btn-primary btn-lg" onClick={handlerClick}>
          Start
        </button>
      </div>
    </div>
  );
}

export default withRouter(StartPage);
