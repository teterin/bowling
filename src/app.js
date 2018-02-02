import React from 'react';
import { BrowserRouter as Router, Route } from 'react-router-dom';
import StartPage from 'containers/StartPage';
import GamePage from 'containers/GamePage';

export default function App() {
  return (
    <Router>
      <React.Fragment>
        <Route exact path="/" component={StartPage} />
        <Route path="/game" component={GamePage} />
      </React.Fragment>
    </Router>
  );
}
