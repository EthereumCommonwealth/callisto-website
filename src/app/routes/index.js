import React from 'react';
import { BrowserRouter, Route, Switch } from 'react-router-dom';
import Home from '../containers/Home';
import ColdStaking from '../containers/ColdStaking';
import SmartContract from '../containers/SmartContract';
import Notfound from '../containers/NotFound';

const Routes = (
  <BrowserRouter>
    <Switch>
      <Route exact path='/' component={Home} />
      <Route exact path='/cold-staking/' component={ColdStaking} />
      <Route exact path='/smart-contract/' component={SmartContract} />
      <Route exact path='/:lang(es|en|id|ru)/' component={Home} />
      <Route exact path='/:lang(es|en|id|ru)/cold-staking/' component={ColdStaking} />
      <Route exact path='/:lang(es|en|id|ru)/smart-contract/' component={SmartContract} />
      <Route component={Notfound} />
    </Switch>
  </BrowserRouter>
);

export default Routes;