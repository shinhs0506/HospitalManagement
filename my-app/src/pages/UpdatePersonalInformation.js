import React, { Component } from 'react';


class UpdatePersonalInformation extends Component {
    constructor(props) {
        super(props);

        this.state = {
            patient_id: this.props.match.params.patient_id,
            patient_name: '',
            patient_address: '',
            patient_contact: '',
        }

        this.handleChange = this.handleChange.bind(this);
        this.handleSubmit = this.handleSubmit.bind(this);
        //this.componentWillMount = this.componentWillMount.bind(this);
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
          'patient_id': this.props.match.params.patient_id,
          'patient_name': this.state.patient_name,
          'patient_address': this.state.patient_address,
          'patient_contact': this.state.patient_contact,
        }
        const options = {
          method: 'POST',
          headers,
          body: JSON.stringify(data)
        };
    
        const request = new Request('http://3.130.67.96:3000/updatePatient', options);
        const response = await fetch(request);
        const status = await response.status;
    
        if (status === 200) {
            // Reset input field
            this.setState({ patient_name: '' });
            this.setState({ patient_address: '' });
            this.setState({ patient_contact: '' });

            window.location.reload()
            // TODO: Call fetch to update lists
          }
      }

      async componentDidMount(){
        const urlPI = 'http://3.130.67.96:3000/getPatient?patient_id='+this.state.patient_id;
        const responsePI = await fetch(urlPI);
        const dataPI = await responsePI.json();
        this.setState({patient_name :dataPI[0].Pname})
        this.setState({patient_address :dataPI[0].Paddress})
        this.setState({patient_contact :dataPI[0].Pcontact})
      }


    render() {
        return (
            <div className="FormCenter">
                <form className="FormFields" >

                    <div className="FormField">
                        <label className="FormField__Label" htmlFor="patient_name">           Update Name</label>
                        <input type="text" className="FormField__Input" placeholder="Enter full name" name="patient_name" value={this.state.patient_name} onChange={this.handleChange} />
                    </div>

                    <div className="FormField">
                        <label className="FormField__Label" htmlFor="patient_address">          Update Address</label>
                        <input type="text" className="FormField__Input" placeholder="Enter full address" name="patient_address" value={this.state.patient_address} onChange={this.handleChange} />
                    </div>

                    <div className="FormField">
                        <label className="FormField__Label" htmlFor="patient_phonenumber">          Update Phone Number</label>
                        <input type="text" id="patient_phonenumber" className="FormField__Input" placeholder="Enter phone number" name="patient_contact" value={this.state.patient_contact} onChange={this.handleChange} />
                    </div>

                    <div className="FormField">
                        <button className="FormField__Button mr-20" onClick={this.handleSubmit}>Update</button>

                    </div>
                </form>
            </div>
        );
    }
}

export default UpdatePersonalInformation;