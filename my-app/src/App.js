import React, { Component } from 'react';
import { BrowserRouter as Router, Route, NavLink } from 'react-router-dom';
import Receptionist from './pages/Receptionist';
import Doctor from './pages/Doctor';
import Patient from './pages/Patient';
import './App.css';


class App extends Component {
  render() {
    return (
      <Router>
        <div className="App">
          <div className="App__Form__FullWidth">
            <Route exact path="/">
              <div className="FormTitle">
                <NavLink to="/Doctor/AddUnavailableDate/" activeClassName="FormTitle__Link--Active" className="FormTitle__Link">
                  Sign in as Doctor</NavLink>or
                  <NavLink exact to="/Receptionist/RegisterDoctor/" activeClassName="FormTitle__Link--Active" className="FormTitle__Link">
                  Sign in as Receptionist</NavLink> or
                  <NavLink exact to="/Patient/BookAppointment/" activeClassName="FormTitle__Link--Active" className="FormTitle__Link">
                  Sign in as Patient</NavLink>
              </div>
            </Route >


            <Route exact path="/Doctor/AddUnavailableDate/" component={Doctor}>
            </Route >
            <Route exact path="/Doctor/RemoveUnavailableDate/" component={Doctor}>
            </Route >
            <Route exact path="/Receptionist/RegisterDoctor/" component={Receptionist}>
            </Route >
            <Route exact path="/Patient/BookAppointment/" component={Patient}>
            </Route >

          </div>
        </div>

      </Router>
    );
  }
}
export default App;