import React, { Component } from 'react';
import { connect } from 'react-redux';
import { withRouter } from 'react-router-dom';
import { 
    Button,
    Modal,
    ModalHeader,
    ModalBody,
    ModalFooter,
    Form,
    FormGroup,
    Label,
    Input,
    Alert,
    NavItem,
    NavLink } from 'reactstrap';
import { register } from '../actions/authActions';
import { clearErrors } from '../actions/errorActions';
import { REGISTER_FAIL } from '../actions/types';

class Register extends Component {
    constructor(props) {
        super(props);
        this.state = {
            modal: false,
            username: '',
            password: '',
            errorMsg: null
        };

        this.toggle = this.toggle.bind(this);
        this.onChange = this.onChange.bind(this);
        this.onSubmit = this.onSubmit.bind(this);
    }

    componentDidUpdate(prevProps) {
        const { error, isAuthenticated } = this.props;
        if (error !== prevProps.error) {
            if (error.type === REGISTER_FAIL) {
                this.setState({ errorMsg: error.msg });
            } else {
                this.setState({ errorMsg: null });
            }
        }

        if (this.state.modal && isAuthenticated) {
            this.toggle();
        } 
    }

    toggle() {
        this.props.clearErrors();
        this.setState({ modal: !this.state.modal });
    }

    onChange(e) {
        this.setState({ [e.target.name]: e.target.value })
    }

    onSubmit(e) {
        e.preventDefault();

        const { username, password } = this.state;
        const credentials = {
            username, password
        };

        this.props.register(credentials, this.props.history);
    }

    render() {
        return (
            <div className={this.props.className}>
                <NavItem>
                    <NavLink onClick={this.toggle} href="#">Register</NavLink>
                </NavItem>
                <Modal isOpen={this.state.modal} toggle={this.toggle}>
                    <ModalHeader toggle={this.toggle}>Register</ModalHeader>
                    <ModalBody>
                        {this.state.errorMsg ? (
                            <Alert color="danger">{this.state.errorMsg}</Alert>
                        ) : null}
                        <Form>
                            <FormGroup>
                                <Label for="username">Username</Label>
                                <Input type="text" name="username" id="username" onChange={this.onChange} value={this.state.username} />
                            </FormGroup>
                            <FormGroup>
                                <Label for="password">Password</Label>
                                <Input type="password" name="password" id="password" onChange={this.onChange} value={this.state.password} />
                            </FormGroup>
                        </Form>
                    </ModalBody>
                    <ModalFooter>
                        <Button color="primary" onClick={this.onSubmit}>Register</Button>{' '}
                        <Button color="secondary" onClick={this.toggle}>Cancel</Button>
                    </ModalFooter>
                </Modal>
            </div>
        );
    }
}

const mapStateToProps = state => ({
    isAuthenticated: state.auth.isAuthenticated,
    error: state.error
})

export default withRouter(
    connect(
        mapStateToProps,
        { register, clearErrors }
    )(Register)
);
