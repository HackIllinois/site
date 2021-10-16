import React from 'react';
import {
  BrowserRouter as Router,
  Redirect,
  Route,
  Switch,
} from 'react-router-dom';

import Home from 'pages/Home';
import Auth from 'pages/Auth';
import Mentors from 'pages/Mentors';
import Registration from 'pages/Registration';
import Prizes from 'pages/Prizes';
import Schedule from 'pages/Schedule';
import RSVP from 'pages/RSVP';
import StaticFileRedirect from 'components/StaticFileRedirect';
import AuthenticatedRoute from 'components/AuthenticatedRoute';
import CodeInTheDark from 'pages/CodeInTheDark';
import ZoomRedirect from 'pages/ZoomRedirect';

function App(): JSX.Element {
  return (
    <>
      <p>Hi :)</p>
      <Router>
        <Switch>
          <Route path="/" exact>
            <Home />
          </Route>

          <Route path="/auth" exact>
            <Auth />
          </Route>

          <Route path="/codeinthedark" exact>
            <CodeInTheDark />
          </Route>

          <AuthenticatedRoute path="/register" exact>
            <Registration />
          </AuthenticatedRoute>

          <AuthenticatedRoute path="/rsvp" exact>
            <RSVP />
          </AuthenticatedRoute>

          <Route path="/prizes" exact>
            <Prizes />
          </Route>

          <Route path="/mentors">
            <Mentors />
          </Route>

          <Route path="/schedule" exact>
            <Schedule />
          </Route>

          <AuthenticatedRoute path="/zoom/:id" exact>
            <ZoomRedirect />
          </AuthenticatedRoute>

          <Route path="/sponsor" exact>
            <StaticFileRedirect to="/documents/sponsorship.pdf" />
          </Route>

          <Route path="/terms-of-service" exact>
            <StaticFileRedirect to="/documents/terms-of-service.pdf" />
          </Route>

          <Route path="/discord-terms-of-service" exact>
            <StaticFileRedirect to="/documents/discord-terms-of-service.pdf" />
          </Route>

          <Route path="/">
            <Redirect to="/" />
          </Route>
        </Switch>
      </Router>
    </>
  );
}

export default App;
