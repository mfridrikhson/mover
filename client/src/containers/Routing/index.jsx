import React from 'react';
import { Route, Switch } from 'react-router-dom';
import Homepage from '../../scenes/Homepage';
import NotFound from '../../scenes/NotFound';

const Routing = () => {
  return (
    <Switch>
      <Route exact path="/" component={Homepage} />
      <Route exact path="*" component={NotFound} />
    </Switch>
  );
};

export default Routing;
