import React, { Component } from 'react';
import { BrowserRouter as Router, Route, NavLink } from 'react-router-dom';
import AddUnavailableDate from './AddUnavailableDate';
import RemoveUnavailableDate from './RemoveUnavailableDate';

class Doctor extends Component {

    constructor(props) {
        super(props);
        this.state = {
            refresh: false,
            doctor_id: '',
            itemsForUA: [],
            itemsForUD: [],
            itemsForAT: []
        }

        this.handleChange = this.handleChange.bind(this);
        this.loadDoctorLists = this.loadDoctorLists.bind(this);
    }

    async loadDoctorLists() {
        console.log('Reset Lists');
        this.setState({ itemsForUA: [] });
        this.setState({ itemsForUD: [] });
        this.setState({ itemsForAT: [] });
        console.log(this.state.doctor_id);
        const urlUA = 'http://3.130.67.96:3000/upcomingAppointmentsDoc?doctor_id=' + this.state.doctor_id;
        const responseUA = await fetch(urlUA);
        const dataUA = await responseUA.json();
        this.setState({ itemsForUA: dataUA });

        const urlUD = 'http://3.130.67.96:3000/AllUnTimesDoc?doctor_id=' + this.state.doctor_id;
        const responseUD = await fetch(urlUD);
        const dataUD = await responseUD.json();
        this.setState({ itemsForUD: dataUD });

        const urlAT = 'http://3.130.67.96:3000/AllTimesDoc?doctor_id=' + this.state.doctor_id;
        const responseAT = await fetch(urlAT);
        const dataAT = await responseAT.json();
        this.setState({ itemsForAT: dataAT });
        console.log('xxxxxxxxxxxx finished');
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

    handleChange(e) {
        let target = e.target;
        let value = target.type === 'checkbox' ? target.checked : target.value;
        let name = target.name;

        this.setState({
            [name]: value
        });
    }

    render() {
        return (
            <Router>
                <div className="App">
                    <div className="App__AsideDoctor">
                        <div className="Receptionist_AppointmentsList">
                            <label className="FormField__LabelBigger">
                                Upcoming Appointments</label>
                            <ul>
                                {this.state.itemsForUA.map(item => (
                                    <li key={item.Pname}>
                                        Patient: {item.Pname} | Room: {item.RoomNumber} | Date: {this.toDate(item.ATID)}
                                    </li>
                                ))}
                            </ul>
                        </div>
                        <div className="FormTitle"></div>
                        <div className="Receptionist_AppointmentsList">
                            <label className="FormField__LabelBigger">
                                My Unavailable Dates</label>
                            <ul>
                                {this.state.itemsForUD.map(item => (
                                    <li key={item.UID}>
                                        UID: {item.UID} | Date: {this.toDate(item.ATID)}
                                    </li>
                                ))}
                            </ul>
                        </div>
                        <div className="FormTitle"></div>
                        <div className="Receptionist_AppointmentsList">
                            <label className="FormField__LabelBigger">
                                Add New Unavailable Date For</label>
                            <ul>
                                {this.state.itemsForAT.map(item => (
                                    <li key={item.ATID}>
                                        ATID: {item.ATID} | Date: {this.toDate(item.Tfrom)}
                                    </li>
                                ))}
                            </ul>
                        </div>
                    </div>

                    <div className="App__Form">
                        <div className="FormTitle">
                            <div className="FormField">
                                <label className="FormField__Label" htmlFor="doctor_id">Doctor ID</label>
                                <input type="string" className="FormField__Input" ref="doctor_id" placeholder="Enter your ID" name="doctor_id" onChange={this.handleChange} value={this.state.doctor_id} />
                                <NavLink to={"/Doctor/AddUnavailableDate/" + this.state.doctor_id} className="FormField__Label" onClick={this.loadDoctorLists}>
                                    Sign in</NavLink>
                            </div>
                            <NavLink to={"/Doctor/AddUnavailableDate/" + this.state.doctor_id} activeClassName="FormTitle__Link--ActiveOnlyWhite" className="FormTitle__Link">
                                Add Unavailable Date</NavLink>or
                            <NavLink exact to={"/Doctor/RemoveUnavailableDate/" + this.state.doctor_id} activeClassName="FormTitle__Link--ActiveOnlyWhite" className="FormTitle__Link">
                                Remove Unavailable Date</NavLink>
                        </div>
                        <Route exact path="/Doctor/AddUnavailableDate/:doctor_id" component={AddUnavailableDate}>
                        </Route >
                        <Route exact path="/Doctor/RemoveUnavailableDate/:doctor_id" component={RemoveUnavailableDate}>
                        </Route>
                    </div>
                </div>
            </Router>
        );
    }

}
export default Doctor;