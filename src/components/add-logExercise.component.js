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
import axios from 'axios';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { addLogExercise } from '../actions/logExerciseActions';

class AddLogExercise extends Component {
    constructor(props) {
        super(props);
        this.state = {
            modal: false,
            exercises: []
        };

        this.toggle = this.toggle.bind(this);
        this.onCreate = this.onCreate.bind(this);
    }

    componentDidMount() {
        axios.get('http://localhost:5000/exercises')
            .then(res => {
                this.setState({
                    exercises: res.data
                });
            })
            .catch(err => console.log(err));
    }

    toggle() {
        this.setState(prevState => ({
            modal: !prevState.modal
        }));
    }

    onCreate() {
        const exercise = {}; // TODO

        this.props.addLogExercise(exercise);

        // Close modal
        this.toggle();
    }

    // TODO dynamically add sets
    render() {
        return (
            <div className={this.props.className}>
                <Button color="success" onClick={this.toggle}><FontAwesomeIcon icon="plus" /> New exercise</Button>
                <Modal isOpen={this.state.modal} toggle={this.toggle}>
                    <ModalHeader toggle={this.toggle}>Create Exercise</ModalHeader>
                    <ModalBody>
                        <Form>
                        <FormGroup>
                            <Label for="exerciseSelect">Exercise</Label>
                                <Input type="select" name="exerciseSelect" id="exerciseSelect">
                                {
                                    this.state.exercises.map(exercise => {
                                        const { _id, name } = exercise;
                                        return <option key={_id} value={_id}>{name}</option>;
                                    })
                                }
                                </Input>
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
    { addLogExercise }
)(AddLogExercise);
