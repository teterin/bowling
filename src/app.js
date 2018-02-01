import React from 'react';
import { BrowserRouter as Router, Route } from 'react-router-dom';
import StartPage from 'components/StartPage';

export default function App() {
  return (
    <Router>
      <React.Fragment>
        <Route exact path="/" component={StartPage} />
        <Route path="/game" component={() => null} />
      </React.Fragment>
    </Router>
  );
}
