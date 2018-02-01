import React from 'react';
import Button from 'react-bootstrap/lib/Button';
import { withRouter } from 'react-router-dom';
import classes from './styles.scss';

function StartPage({ start, history }) {
  const handlerClick = () => {
    history.push('/game');
    start();
  };
  return (
    <div className={classes.container}>
      <Button bsStyle="primary" bsSize="large" onClick={handlerClick}>
        Start
      </Button>
    </div>
  );
}

export default withRouter(StartPage);
