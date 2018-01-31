import React from 'react';
import { BrowserRouter as Router, Route, Redirect } from 'react-router-dom';
import GamePage from 'components/GamePage';

export default function App() {
  return (
    <Router>
      <React.Fragment>
        <Route exact path="/" component={() => <Redirect to="/game" />} />
        <Route path="/game" component={GamePage} />
      </React.Fragment>
    </Router>
  );
}
