import React, { Component } from 'react';
import { BrowserRouter as Router, Route, NavLink } from 'react-router-dom';
import SignUpDoctor from './RegisterDoctor';
import SignUpPatient from './RegisterPatient';
import SignUpPatientYoung from './RegisterPatientYoung'


class Receptionist extends Component {

    constructor(props) {
        super(props);
        // Default 1
        this.state = {
            receptionist_id: 2,
            items : [],
            itemsC : [],
            itemsU : [],
            selectedOption: 'option1'
        }
        this.handleOptionChange = this.handleOptionChange.bind(this);
    }

    async componentDidMount(){

        const url = 'http://3.130.67.96:3000/allAppointmentsRecept?receptionist_id='+this.state.receptionist_id;
        const response = await fetch(url);
        const data = await response.json();
        this.setState({items:data})

        const urlC = 'http://3.130.67.96:3000/getDoctorsPatients';
        const responseC = await fetch(urlC);
        const dataC = await responseC.json();
        this.setState({itemsC:dataC})

        const urlU = 'http://3.130.67.96:3000/DoctorsVacation';
        const responseU = await fetch(urlU);
        const dataU = await responseU.json();
        this.setState({itemsU:dataU})
    }

    handleOptionChange(changeEvent) {
        this.setState({
          selectedOption: changeEvent.target.value
        });
      }

    toDate(str) {
        let date = str
        let year = date.substring(0, 4)
        let month = date.substring(4,6)
        let day = date.substring(6,8)
        let time = date.substring(8)

        
        var monthInWord
        if (month == '01'){
             monthInWord = 'Jan'
        } else if (month == '02'){
            monthInWord = 'Feb'
        } else if (month == '03'){
            monthInWord = 'Mar'
        } else if (month == '04'){
           monthInWord = 'Apr'
        } else if (month == '05'){
            monthInWord = 'May'
        } else if (month == '06'){
            monthInWord = 'Jun'
        } else if (month == '07'){
            monthInWord = 'July'
        } else if (month == '08'){
            monthInWord = 'Aug'
        } else if (month == '09'){
            monthInWord = 'Sep'
        } else if (month == '10'){
            monthInWord = 'Oct'
        } else if (month == '11'){
            monthInWord = 'Nov'
        } else {
            monthInWord = 'Dec'
        } 

        return monthInWord+'/'+day+'/'+time+':00/'+year
    }

    render() {
        let query
        if (this.state.selectedOption === 'option1'){
            query = this.state.items.map(item => (
                    <li key={item.PID}>
                        
                            Patient: {item.Pname} | Room: {item.RoomNumber} | Date: {this.toDate(item.ATID)} | Doctor: {item.Dname}
                    </li>
            ))
        } else if (this.state.selectedOption === 'option2') {
            query = this.state.items.map(item => (
                    <li key={item.PID}>
                        
                            Patient: {item.Pname} |  Date: {this.toDate(item.ATID)} | Doctor: {item.Dname}
                    </li>
            ))
        } else {
            query = this.state.items.map(item => (
                    <li key={item.PID}>
                        
                            Patient: {item.Pname} | Date: {this.toDate(item.ATID)} 
                    </li>
            ))
        }

        return (
            <Router>
                <div className="App">
                    <div className="App__AsideReceptionist">
                        <div className="Receptionist_AppointmentsList">
                        <form>
                            <div className="radio">
                            <label>
                                <input type="radio" value="option1" 
                                            checked={this.state.selectedOption === 'option1'} 
                                            onChange={this.handleOptionChange} />
                                Show patient, room, time, and doctor
                            </label>
                            </div>
                            <div className="radio">
                            <label>
                                <input type="radio" value="option2" 
                                            checked={this.state.selectedOption === 'option2'} 
                                            onChange={this.handleOptionChange} />
                                 Show patient, time, and doctor
                            </label>
                            </div>
                            <div className="radio">
                            <label>
                                <input type="radio" value="option3" 
                                            checked={this.state.selectedOption === 'option3'} 
                                            onChange={this.handleOptionChange} />
                                 Show patient, time <br></br><br></br>
                            </label>
                            </div>
                        </form>
                            <label className="FormField__LabelBigger">
                                Patients Upcoming Appointments</label> <br></br>
                                {query}
                                {/* <ul>
                                    {this.state.items.map(item => (
                                        //plaerholder for now
                                            <li key={item.PID}>
                                                
                                                    Patient: {item.Pname} | Room: {item.RoomNumber} | Date: {this.toDate(item.ATID)} | Doctor: {item.Dname}
                                            </li>
                                    ))}
                                </ul> */}
                        </div>
                        <div className="FormTitle"></div>
                        <div className="Receptionist_AppointmentsList">
                            <label className="FormField__LabelBigger">
                                Doctor and number of patients</label>
                                <ul>
                                    {this.state.itemsC.map(item => (
                                            <li key={item.DID}>
                                                    Doctor ID: {item.DID} | Name: {item.Dname} | Specialization: {item.Dspec} | Number of patients: {item.NumPatients}
                                            </li>
                                    ))}
                                </ul>
                        </div>
                        <div className="FormTitle"></div>
                        <div className="Receptionist_AppointmentsList">
                            <label className="FormField__LabelBigger">
                                Time slots where no doctor is available</label>                                
                                <ul>
                                    {this.state.itemsU.map(item => (
                                            <li key={item.TFrom}>
                                                    Time ATID: {item.TFrom} | Date: {this.toDate(item.TFrom)}
                                            </li>
                                    ))}
                                </ul>
                        </div>
                    </div>
                    <div className="App__Form">
                        <div className="FormTitle">
                            <NavLink to={"/Receptionist/RegisterDoctor/" + this.state.receptionist_id} activeClassName="FormTitle__Link--ActiveOnlyWhite" className="FormTitle__Link">
                                Register Doctor</NavLink>or
                            <NavLink exact to={"/Receptionist/RegisterPatient/" + this.state.receptionist_id} activeClassName="FormTitle__Link--ActiveOnlyWhite" className="FormTitle__Link">
                                Register Patient 19 or older</NavLink>or
                            <NavLink exact to={"/Receptionist/RegisterPatientYoung/" + this.state.receptionist_id} activeClassName="FormTitle__Link--ActiveOnlyWhite" className="FormTitle__Link">
                                Register Patient Underage</NavLink>
                        </div>
                        <Route exact path="/Receptionist/RegisterPatient/:receptionist_id" component={SignUpPatient}>
                        </Route >
                        <Route exact path="/Receptionist/RegisterPatientYoung/:receptionist_id" component={SignUpPatientYoung}>
                        </Route >
                        <Route exact path="/Receptionist/RegisterDoctor/:receptionist_id" component={SignUpDoctor}>
                        </Route>
                    </div>
                </div>
            </Router>
        );
    }
}
export default Receptionist;