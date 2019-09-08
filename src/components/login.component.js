import React, { Component } from 'react';
import { Form, FormGroup, Input, Button } from 'reactstrap';
import axios from 'axios';

export default class Login extends Component {
    constructor(props) {
        super(props);

        this.onChangeUsername = this.onChangeUsername.bind(this);
        this.onChangePassword = this.onChangePassword.bind(this);
        this.onSubmit = this.onSubmit.bind(this);

        this.state = {
            username: '',
            password: ''
        }
    }

    onChangeUsername(e) {
        this.setState({
            username: e.target.value
        });
    }

    onChangePassword(e) {
        this.setState({
            password: e.target.value
        });
    }

    onSubmit(e) {
        e.preventDefault();

        const credentials = {
            username: this.state.username,
            password: this.state.password
        }

        axios.post('http://localhost:5000/auth', credentials)
            .then(res => console.log(res.data))
            .catch(err => console.log(err));
    }

    render() {
        return (
            <div className="d-flex justify-content-center align-items-center" id="login">
                <div className="w-25 p-3 rounded form-wrapper">
                    <Form onSubmit={this.onSubmit}>
                        <h3 className="text-white mb-3">Login</h3>
                        <FormGroup>
                            <Input type="text" name="username" id="username" onChange={this.onChangeUsername} placeholder="Username" />
                        </FormGroup>
                        <FormGroup>
                            <Input type="password" name="password" id="password" onChange={this.onChangePassword} placeholder="Password" />
                        </FormGroup>
                        <Button color="success" className="w-100">Continue</Button>
                    </Form>
                </div>
            </div>
        );
    }
}