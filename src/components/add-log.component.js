import React, { Component } from 'react';
import { connect } from 'react-redux';
import { 
    Button,
    Modal,
    ModalHeader,
    ModalBody,
    ModalFooter,
    Form,
    FormGroup,
    Label,
    Input } from 'reactstrap';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import DatePicker from 'react-datepicker';
import 'react-datepicker/dist/react-datepicker.css';
import { addLog } from '../actions/logActions';

class AddLog extends Component {
    constructor(props) {
        super(props);
        this.state = {
            modal: false,
            date: new Date(),
            description: ''
        };

        this.toggle = this.toggle.bind(this);
        this.onChangeDate = this.onChangeDate.bind(this);
        this.onChangeDescription = this.onChangeDescription.bind(this);
        this.onCreate = this.onCreate.bind(this);
    }

    toggle() {
        this.setState(prevState => ({
            modal: !prevState.modal,
            date: new Date(),
            description: ''
        }));
    }

    onChangeDate(date) {
        this.setState({
            date
        });
    }

    onChangeDescription(e) {
        this.setState({
            description: e.target.value
        });
    }

    onCreate() {
        const { description, date } = this.state;
        const log = {
            description, date
        };

        this.props.addLog(log);

        // Close modal
        this.toggle();
    }

    render() {
        return (
            <div className={this.props.className}>
                <Button color="success" onClick={this.toggle}><FontAwesomeIcon icon="plus" /> New log</Button>
                <Modal isOpen={this.state.modal} toggle={this.toggle}>
                    <ModalHeader toggle={this.toggle}>Create Log</ModalHeader>
                    <ModalBody>
                        <Form>
                            <FormGroup>
                                <Label for="description">Description</Label>
                                <Input type="text" name="description" id="description" onChange={this.onChangeDescription} value={this.state.description} />
                            </FormGroup>
                            <FormGroup>
                                <Label className="d-block">Date</Label>
                                <DatePicker
                                    className="form-control"
                                    selected={this.state.date}
                                    onChange={this.onChangeDate}
                                    />
                            </FormGroup>
                        </Form>
                    </ModalBody>
                    <ModalFooter>
                        <Button color="success" onClick={this.onCreate}>Create</Button>{' '}
                        <Button color="secondary" onClick={this.toggle}>Cancel</Button>
                    </ModalFooter>
                </Modal>
            </div>
        );
    }
}

export default connect(
    null,
    { addLog }
)(AddLog);
