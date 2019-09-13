import React, { Component } from 'react';
import Doctor from './Doctor';

class AddUnavailableDate extends Component {

    constructor(props){
        super(props);
        this.state ={
            time_from:'',
            doctor_id: this.props.match.params.doctor_id,
        }
        this.handleChange = this.handleChange.bind(this);
        this.handleSubmit = this.handleSubmit.bind(this);
    }

    handleChange(e){
        let target = e.target;
        let value = target.type === 'checkbox' ? target.checked : target.value;
        let name = target.name;

        this.setState({
            [name] : value
        });
    }
    async handleSubmit(e){
        e.preventDefault();
        console.log(this.state.time_from)
        /* Left for back-end handling */
        const headers = new Headers();
        headers.append('Content-Type', 'application/json');
        var data = {
            'time_from': this.state.time_from,
            'doctor_id': this.state.doctor_id,
         }
        const options = {
            method: 'POST',
            headers,
            body:JSON.stringify(data)
        };

        const request = new Request('http://3.130.67.96:3000/newUnDateDoc', options);
        const response = await fetch(request);
        const status = await response.status;
        
        this.refs.time_from.value= ''

        // Do on success
        if (status === 200){
            // Reset input field
            this.setState({time_from:''});
             // TODO: Call fetch to update Unavailable lists
             window.location.reload()
        }
    }

    render() {
        return (
            <div className="FormCenter">
                <form className="FormFields" >
                    <div className="FormField">
                        <label className="FormField__Label" htmlFor="time_from">Time From</label>
                        <input type="string" className="FormField__Input" ref="time_from" placeholder="Enter ATID of date and time Ex) 2019070109" name="time_from"  onChange={this.handleChange} value={this.state.time_from} />
                    </div>

                    <div className="FormField">
                        <button className="FormField__Button mr-20" onClick={this.handleSubmit}>Add</button>
                    </div>
                </form>
            </div>
        );
    }
}

export default AddUnavailableDate;