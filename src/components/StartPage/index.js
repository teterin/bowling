import React from 'react';
import Button from 'react-bootstrap/lib/Button';
import classes from './styles.scss';

export default function GamePage() {
  return (
    <div className={classes.container}>
      <Button bsStyle="primary" bsSize="large">
        Start
      </Button>
    </div>
  );
}
