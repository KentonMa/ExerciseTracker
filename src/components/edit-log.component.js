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
import { updateLog } from '../actions/logActions';

class EditLog extends Component {
    constructor(props) {
        super(props);
        this.state = {
            modal: false,
            date: new Date(this.props.log.date),
            description: this.props.log.description
        };

        this.toggle = this.toggle.bind(this);
        this.onChangeDate = this.onChangeDate.bind(this);
        this.onChangeDescription = this.onChangeDescription.bind(this);
        this.onSave = this.onSave.bind(this);
    }

    toggle() {
        this.setState(prevState => ({
            modal: !prevState.modal
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

    onSave() {
        const { description, date } = this.state;
        const log = {
            description, date
        };

        this.props.updateLog(log, this.props.log._id);

        // Close modal
        this.toggle();
    }

    render() {
        return (
            <div className={this.props.className}>
                <Button color="secondary" onClick={this.toggle}><FontAwesomeIcon icon="pencil-alt" /></Button>
                <Modal isOpen={this.state.modal} toggle={this.toggle}>
                    <ModalHeader toggle={this.toggle}>Edit Log</ModalHeader>
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
                        <Button color="primary" onClick={this.onSave}>Save</Button>{' '}
                        <Button color="secondary" onClick={this.toggle}>Cancel</Button>
                    </ModalFooter>
                </Modal>
            </div>
        );
    }
}

export default connect(
    null,
    { updateLog }
)(EditLog);
