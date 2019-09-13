import React, { Component } from 'react';


class SignIn extends Component {

    constructor() {
        super();
        this.state = {
            id: '',
            password: '',
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

    handleSubmit(e) {
        e.preventDefault();
        /* Left for back-end handling */
    }


    render() {
        return (
            <div className="SignIn_Form">
                <div className="FormCenter">
                    <form className="FormFields" >
                        <div className="FormField">
                            <label className="FormField__Label" htmlFor="id">ID</label>
                            <input type="number" className="FormField__Input" placeholder="Enter ID" name="id" value={this.state.time_from} onChange={this.handleChange} />
                        </div>

                        <div className="FormField">
                            <label className="FormField__Label" htmlFor="password">Password</label>
                            <input type="password" className="FormField__Input" placeholder="Enter password" name="password" value={this.state.time_to} onChange={this.handleChange} />
                        </div>

                        <div className="FormField">
                            <button className="FormField__Button mr-20">Sign in</button>
                        </div>
                    </form>
                </div>
            </div>
        );
    }
}

export default SignIn;