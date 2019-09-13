import React, { Component } from 'react';


class RegisterDoctor extends Component {
  constructor(props) {
    super(props);
    this.state = {
      receptionist_id: this.props.match.params.receptionist_id,
      doctor_name: '',
      doctor_specs: '',
      doctor_year: '',
      doctor_address: '',
      doctor_contact: '',
    }
    this.handleChange = this.handleChange.bind(this);
    this.handleSubmit = this.handleSubmit.bind(this);
  }

  handleChange(e) {
    let target = e.target;
    let value = target.type === 'checkbox' ? target.checked : target.value;
    let name = target.name;

    this.setState({
      [name]: value
    });
  }

  async handleSubmit(e) {
    e.preventDefault();
    /* Left for back-end handling */
    const headers = new Headers();
    headers.append('Content-Type', 'application/json');

    var data = {
      'receptionist_id': this.props.match.params.receptionist_id,
      'doctor_name': this.state.doctor_name,
      'doctor_specs': this.state.doctor_specs,
      'doctor_year': this.state.doctor_year,
      'doctor_address': this.state.doctor_address,
      'doctor_contact': this.state.doctor_contact,
    }


    const options = {
      method: 'POST',
      headers,
      body: JSON.stringify(data)
    };


    const request = new Request('http://3.130.67.96:3000/newDoctor', options);
    const response = await fetch(request);
    const status = await response.status;

    // Do on success
    if (status === 200) {
      // Reset input field
      this.setState({ doctor_name: '' });
      this.setState({ doctor_specs: '' });
      this.setState({ doctor_years: '' });
      this.setState({ doctor_address: '' });
      this.setState({ doctor_contact: '' });

      this.refs.doctor_name.value = ""
      this.refs.doctor_spec.value = ""
      this.refs.doctor_year.value = ""
      this.refs.doctor_address.value = ""
      this.refs.doctor_phone.value = ""

      window.location.reload();

      // TODO: Call fetch to update lists
    }
  }

  render() {
    return (
      <div className="FormCenter">
        <form className="FormFields" >

          <div className="FormField">
            <label className="FormField__Label" htmlFor="doctor_name">           Doctor Name</label>
            <input type="text" className="FormField__Input" ref="doctor_name" placeholder="Enter full name" name="doctor_name" value={this.state.doctor_name} onChange={this.handleChange} />
          </div>

          <div className="FormField">
            <label className="FormField__Label" htmlFor="doctor_specialization">           Doctor Specialization</label>
            <input type="text" className="FormField__Input" ref="doctor_spec" placeholder="Enter specialization" name="doctor_specs" value={this.state.doctor_specialization} onChange={this.handleChange} />
          </div>

          <div className="FormField">
            <label className="FormField__Label" htmlFor="doctor_yrsOfExperience">           Years of Experience</label>
            <input type="text" className="FormField__Input" ref="doctor_year" placeholder="Enter years of experience" name="doctor_year" value={this.state.doctor_yrsOfExperience} onChange={this.handleChange} />
          </div>

          <div className="FormField">
            <label className="FormField__Label" htmlFor="doctor_address">          Address</label>
            <input type="text" className="FormField__Input" ref="doctor_address" placeholder="Enter full address" name="doctor_address" value={this.state.doctor_address} onChange={this.handleChange} />
          </div>

          <div className="FormField">
            <label className="FormField__Label" htmlFor="doctor_phonenumber">          Phone Number</label>
            <input type="text" id="doctor_phonenumber" ref="doctor_phone" className="FormField__Input" placeholder="Enter phone number" name="doctor_contact" value={this.state.doctor_phonenumber} onChange={this.handleChange} />
          </div>

          <div className="FormField">
            <button className="FormField__Button mr-20" onClick={this.handleSubmit}>Submit</button>
          </div>
        </form>
      </div>
    );
  }
}

export default RegisterDoctor;