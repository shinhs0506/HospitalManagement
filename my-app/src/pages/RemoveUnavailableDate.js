import React, { Component } from 'react';

class RemoveUnavailableDate extends Component {

    constructor(props) {
        super(props);
        this.state = {
            time_id: '',
            doctor_id: this.props.match.params.doctor_id,
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
        headers.append('Content-type', 'application/json');

        var data = {
            "time_id": this.state.time_id,
         }
         

        const options = {
            method: 'POST',
            headers,
            body:JSON.stringify(data)
        };

        const request = new Request('http://3.130.67.96:3000/removeDate', options);
        const response = await fetch(request);
        const status = await response.status;

        this.refs.time_id.value = ""

        // Do on success
        if (status === 200){
            // Reset input field
            this.setState({time_id:''});
            window.location.reload()
             // TODO: Call fetch to update lists
        }
    }


    render() {
        return (
            <div className="FormCenter">
                <form className="FormFields">
                    <div className="FormField">
                        <label className="FormField__Label" htmlFor="time_id">Time ID</label>
                        <input type="number" className="FormField__Input" ref="time_id" placeholder="Enter the id for the desired time to remove Ex)1" name="time_id" value={this.state.time_id} onChange={this.handleChange} />
                    </div>

                    <div className="FormField">
                        <button className="FormField__Button mr-20" onClick={this.handleSubmit}>Remove</button>
                    </div>
                </form>
            </div>
        );
    }
}

export default RemoveUnavailableDate;