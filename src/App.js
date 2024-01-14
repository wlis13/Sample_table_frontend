import React from 'react';
import { Switch, Route } from 'react-router-dom';
import Provider from './context/provider';
import Login from './pages/Login/login';
import Register from './pages/Register/register';
import TableClients from './pages/TableClients/tableClients';
import WritePage from './pages/wirtePage/writePage';
import HistoricClients from './pages/HistoricClients/historicClients';
import AllHistorics from './pages/AllHistorics/allHistorics';
import DeleteClient from './pages/DeleteClients/deleteClient';
import Users from './pages/Users/users';
import WritePageUpDate from './pages/WritePageUpDate/writePageUpDate';

function App() {
  return (
    <Provider>
      <Switch>
        <Route exact path="/" component={Login} />
        <Route path="/main" component={TableClients} />
        <Route path="/register" component={Register} />
        <Route path="/table-clients" component={WritePage} />
        <Route path="/table-clients-update" component={WritePageUpDate} />
        <Route path="/historic-page" component={HistoricClients} />
        <Route path="/all-historics" component={AllHistorics} />
        <Route path="/delete-client" component={DeleteClient} />
        <Route path="/users" component={Users} />
      </Switch>
    </Provider>
  );
}

export default App;
