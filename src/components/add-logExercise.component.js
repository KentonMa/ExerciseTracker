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
    Input,
    Col } from 'reactstrap';
import axios from 'axios';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { addLogExercise } from '../actions/logExerciseActions';

class AddLogExercise extends Component {
    constructor(props) {
        super(props);
        this.state = {
            modal: false,
            exercises: [],
            exercise: '',
            sets: [
                {
                    reps: 0,
                    weight: 0
                }
            ]
        };

        this.toggle = this.toggle.bind(this);
        this.onCreate = this.onCreate.bind(this);
        this.onAddSet = this.onAddSet.bind(this);
        this.onChangeReps = this.onChangeReps.bind(this);
        this.onChangeWeight = this.onChangeWeight.bind(this);
        this.onChangeExercise = this.onChangeExercise.bind(this);
    }

    componentDidMount() {
        axios.get('http://localhost:5000/exercises')
            .then(res => {
                this.setState({
                    exercises: res.data,
                    exercise: res.data[0]._id
                });
            })
            .catch(err => console.log(err));
    }

    toggle() {
        this.setState(prevState => ({
            modal: !prevState.modal
        }));
    }

    // TODO link form data to state
    onCreate() {
        const exercise = {}; // TODO
        const log_id = this.props.match.params.id;
        
        exercise.log_id = log_id;
        // exercise.user_id = 
        exercise.exercise = this.state.exercise;
        exercise.sets = this.state.sets;
        // log_id: { type: ObjectId },
        // user_id: { type: ObjectId },
        // exercise: { type: ObjectId },
        // sets: [{
        //     reps: { type: Number },
        //     weight: { type: Number }
        // }]
        this.props.addLogExercise(exercise);

        // Close modal
        this.toggle();
    }

    onAddSet() {
        this.setState({
            sets: [...this.state.sets, { reps: 0, weight: 0 }]
        });
    }

    onChangeExercise(e) {
        this.setState({
            exercise: e.target.value
        });
    }

    onChangeReps(index, e) {
        const reps = parseInt(e.target.value);
        this.setState({
            sets: this.state.sets.map((set, i) => {
                return (i === index) ? {...set, reps} : set;
            })
        });
    }

    onChangeWeight(index, e) {
        const weight = parseInt(e.target.value);
        this.setState({
            sets: this.state.sets.map((set, i) => {
                return (i === index) ? {...set, weight} : set;
            })
        });
    }

    setsList() {
        return this.state.sets.map((set, index) => {
            return (
            <FormGroup key={index} row>
            <Col>
                <Input
                    type="number"
                    defaultValue={set.reps}
                    onChange={e => this.onChangeReps(index, e)}
                    placeholder="Reps" />
            </Col>
            <Col>
                <Input
                    type="number"
                    defaultValue={set.weight}
                    onChange={e => this.onChangeWeight(index, e)}
                    placeholder="Weight (lb)" />
            </Col>
            </FormGroup>
            );
        })
    }

    // TODO delete set
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
                                <Input
                                    type="select"
                                    name="exerciseSelect"
                                    id="exerciseSelect"
                                    value={this.state.exercise}
                                    onChange={this.onChangeExercise}>
                                {
                                    this.state.exercises.map(exercise => {
                                        const { _id, name } = exercise;
                                        return <option key={_id} value={_id}>{name}</option>;
                                    })
                                }
                                </Input>
                        </FormGroup>
                        { this.setsList() }
                        <Button color="success" onClick={this.onAddSet}><FontAwesomeIcon icon="plus" /> New set</Button>
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
