import React, { Component } from 'react';
import { connect } from 'react-redux';
import { withRouter, Link } from 'react-router-dom';
import { Form, FormGroup, Input, Button, Alert } from 'reactstrap';
import { login } from '../actions/authActions';
import { clearErrors } from '../actions/errorActions';

class Login extends Component {
    constructor(props) {
        super(props);

        this.onChangeUsername = this.onChangeUsername.bind(this);
        this.onChangePassword = this.onChangePassword.bind(this);
        this.onSubmit = this.onSubmit.bind(this);

        this.state = {
            username: '',
            password: '',
            errorMsg: null
        }
    }

    componentDidUpdate(prevProps) {
        const { error } = this.props;
        if (error !== prevProps.error) {
            if (error.type === 'LOGIN_FAIL') {
                this.setState({ errorMsg : error.msg });
            } else {
                this.setState({ errorMsg : null });
            }
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
        this.props.clearErrors();

        const credentials = {
            username: this.state.username,
            password: this.state.password
        }

        this.props.login(credentials, this.props.history);
    }

    render() {
        const loginForm = (
            <Form onSubmit={this.onSubmit}>
                <h3 className="text-white mb-3">Login</h3>
                {this.state.errorMsg ? (
                    <Alert color="danger">{this.state.errorMsg}</Alert>
                ) : null}
                <FormGroup>
                    <Input type="text" name="username" id="username" onChange={this.onChangeUsername} placeholder="Username" />
                </FormGroup>
                <FormGroup>
                    <Input type="password" name="password" id="password" onChange={this.onChangePassword} placeholder="Password" />
                </FormGroup>
                <Button color="success" className="w-100">Continue</Button>
            </Form>
        );

        const { isAuthenticated, user } = this.props.auth;

        const welcome = (
            <>
            <h3 className="text-white mb-3">{user ? `Welcome ${user.username}` : ''}</h3>
            <Link className="btn btn-success w-100" to="/logs">View Logs</Link>
            </>
        );

        return (
            <div className="d-flex justify-content-center align-items-center" id="login">
                <div className="w-25 p-3 rounded form-wrapper">
                { isAuthenticated ? welcome : loginForm }
                </div>
            </div>
        );
    }
}

const mapStateToProps = state => ({
    auth: state.auth,
    error: state.error
});

export default withRouter(
    connect(mapStateToProps, { login, clearErrors })(Login)
);