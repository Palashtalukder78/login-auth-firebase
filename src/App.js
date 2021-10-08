import { BrowserRouter as Router, Switch, Route } from 'react-router-dom';
import './App.css';
import Dashboard from './components/Dashboard/Dashboard';
import EmailVerify from './components/EmailVerify/EmailVerify';
import Form from './components/Form/Form';
function App() {

  return (
    <div>
      <Router>
        <Switch>
          <Route exact path="/">
            <Form></Form>
          </Route>
          <Route exact path="/form">
            <Form></Form>
          </Route>
          <Route exact path="/dashboard">
            <Dashboard></Dashboard>
          </Route>
          <Route exact path="/emailVerify">
            <EmailVerify></EmailVerify>
          </Route>
        </Switch>
      </Router>
    </div>
  );
}

export default App;
