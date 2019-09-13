import React, { Component } from 'react';
import { BrowserRouter as Router, Route, NavLink } from 'react-router-dom';
import BookAppointment from './BookAppointment';
import UpdatePersonalInformation from './UpdatePersonalInformation';

class Patient extends Component {
    constructor(props) {
        super(props);
        // Default 1
        this.state = {
            patient_id: 1,
            itemsForA: [],
            itemsForR: [],
            itemsForAT: []
        }

        this.handleChange = this.handleChange.bind(this);
        this.loadPatientLists = this.loadPatientLists.bind(this);
    }

    handleChange(e) {
        let target = e.target;
        let value = target.type === 'checkbox' ? target.checked : target.value;
        let name = target.name;

        this.setState({
            [name]: value
        });
    }

    async loadPatientLists() {

        this.setState({ itemsForA: [] });
        this.setState({ itemsForR: [] });
        this.setState({ itemsForAT: [] });

        const urlA = 'http://3.130.67.96:3000/allAppointmentsPat?patient_id=' + this.state.patient_id;
        const responseA = await fetch(urlA);
        const dataA = await responseA.json();
        this.setState({ itemsForA: dataA });

        const urlR = 'http://3.130.67.96:3000/getRecept?patient_id=' + this.state.patient_id;
        const responseR = await fetch(urlR);
        const dataR = await responseR.json();
        this.setState({ itemsForR: dataR });

        const urlAT = 'http://3.130.67.96:3000/getAvailability?patient_id=' + this.state.patient_id;
        const responseAT = await fetch(urlAT);
        const dataAT = await responseAT.json();
        this.setState({ itemsForAT: dataAT });
    }


    toDate(str) {
        let date = str
        let year = date.substring(0, 4)
        let month = date.substring(4, 6)
        let day = date.substring(6, 8)
        let time = date.substring(8)

        var monthInWord
        if (month == '01') {
            monthInWord = 'Jan'
        } else if (month == '02') {
            monthInWord = 'Feb'
        } else if (month == '03') {
            monthInWord = 'Mar'
        } else if (month == '04') {
            monthInWord = 'Apr'
        } else if (month == '05') {
            monthInWord = 'May'
        } else if (month == '06') {
            monthInWord = 'Jun'
        } else if (month == '07') {
            monthInWord = 'July'
        } else if (month == '08') {
            monthInWord = 'Aug'
        } else if (month == '09') {
            monthInWord = 'Sep'
        } else if (month == '10') {
            monthInWord = 'Oct'
        } else if (month == '11') {
            monthInWord = 'Nov'
        } else {
            monthInWord = 'Dec'
        }

        return monthInWord + '/' + day + '/' + time + ':00/' + year
    }



    render() {
        return (
            <Router>
                <div className="App">
                    <div className="App__AsidePatient">
                        <div className="Receptionist_AppointmentsList">
                            <label className="FormField__LabelBigger">
                                My Appointments</label>
                            <ul>
                                {this.state.itemsForA.map(item => (
                                    <li key={item.PID}>
                                        Doctor: {item.Dname} | Date: {this.toDate(item.Tfrom)} | Room: {item.RoomNumber}
                                    </li>
                                ))}
                            </ul>
                        </div>
                        <div className="FormTitle"></div>
                        <div className="Receptionist_AppointmentsList">
                            <label className="FormField__LabelBigger">
                                Contact Us</label>
                            <ul>
                                {this.state.itemsForR.map(item => (
                                    <li key={item.PID}>
                                        Receptionist: {item.Rname} | Contact: {item.Rcontact}
                                    </li>
                                ))}
                            </ul>
                        </div>
                        <div className="FormTitle"></div>
                        <div className="Receptionist_AppointmentsList">
                            <label className="FormField__LabelBigger">
                                Your and doctor's available time</label>
                            <ul>
                                {this.state.itemsForAT.map(item => (
                                    <li key={item.PID}>
                                        ATID: {item.ATID} | Date: {this.toDate(item.Tfrom)}
                                    </li>
                                ))}
                            </ul>
                        </div>
                    </div>

                    <div className="App__Form">
                        <div className="FormTitle">
                            <div className="FormField">
                                <label className="FormField__Label" htmlFor="patient_id">Patient ID</label>
                                <input type="string" className="FormField__Input" ref="patient_id" placeholder="Enter your ID" name="patient_id" onChange={this.handleChange} value={this.state.patient_id} />
                                <NavLink to={"/Patient/BookAppointment/" + this.state.patient_id} className="FormField__Label" onClick={this.loadPatientLists}>
                                    Sign in</NavLink>
                            </div>
                            <NavLink to={"/Patient/BookAppointment/" + this.state.patient_id} activeClassName="FormTitle__Link--ActiveOnlyWhite" className="FormTitle__Link">
                                Book a New Appointment</NavLink>or
                            <NavLink exact to={"/Patient/UpdatePersonalInformation/" + this.state.patient_id} activeClassName="FormTitle__Link--ActiveOnlyWhite" className="FormTitle__Link">
                                Update Personal Information</NavLink>
                        </div>
                        <Route exact path="/Patient/BookAppointment/:patient_id" component={BookAppointment}>
                        </Route >
                        <Route exact path="/Patient/UpdatePersonalInformation/:patient_id" component={UpdatePersonalInformation}>
                        </Route>
                    </div>
                </div>
            </Router>
        );
    }
}
export default Patient;