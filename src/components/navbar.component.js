import React, { Component } from 'react';
import { connect } from 'react-redux';
import {
    Collapse,
    Navbar,
    NavbarToggler,
    NavbarBrand,
    Nav,
    NavItem,
    NavLink } from 'reactstrap';
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
                <NavLink href="/logs">Logs</NavLink>
            </NavItem>
            <NavItem>
                <NavLink href="#" onClick={this.props.logout}>Logout</NavLink>
            </NavItem>
            </>
        );

        const guestLinks = (
            <>
            <NavItem>
                <NavLink href="#">Register</NavLink>
            </NavItem>
            </>
        );

        return (
            <div>
                <Navbar color="dark" dark expand="lg" fixed="top">
                    <NavbarBrand href="/">ExerciseTracker</NavbarBrand>
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