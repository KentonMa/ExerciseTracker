import React, { Component } from 'react';
import { connect } from 'react-redux';
import { Link } from 'react-router-dom';
import {
    Collapse,
    Navbar,
    NavbarToggler,
    Nav,
    NavItem,
    NavLink } from 'reactstrap';
import Register from './register.component';
import { logout } from '../actions/authActions';

class SiteNavbar extends Component {
    constructor(props) {
        super(props);

        this.toggle = this.toggle.bind(this);
        this.state = {
            isOpen: false
        };
    }

    toggle() {
        this.setState({
            isOpen: !this.state.isOpen
        });
    }

    render() {
        const authLinks = (
            <>
            <NavItem>
                <Link className="nav-link" to="/logs">Logs</Link>
            </NavItem>
            <NavItem>
                <NavLink href="#" onClick={this.props.logout}>Logout</NavLink>
            </NavItem>
            </>
        );

        const guestLinks = (
            <Register />
        );

        return (
            <div>
                <Navbar color="dark" dark expand="lg" fixed="top">
                    <Link className="navbar-brand" to="/">ExerciseTracker</Link>
                    <NavbarToggler onClick={this.toggle} />
                    <Collapse isOpen={this.state.isOpen} navbar>
                        <Nav className="ml-auto" navbar>
                            {this.props.isAuthenticated ? authLinks : guestLinks}
                        </Nav>
                    </Collapse>
                </Navbar>
            </div>
        );
    }
}

const mapStateToProps = state => ({
    isAuthenticated: state.auth.isAuthenticated
});

export default connect(
    mapStateToProps,
    { logout }
)(SiteNavbar);