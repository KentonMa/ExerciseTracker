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
            exercise: {},
            sets: [
                {
                    key: new Date().getTime(),
                    reps: 0,
                    weight: 0
                }
            ]
        };

        this.toggle = this.toggle.bind(this);
        this.onCreate = this.onCreate.bind(this);
        this.onAddSet = this.onAddSet.bind(this);
        this.onDeleteSet = this.onDeleteSet.bind(this);
        this.onChangeReps = this.onChangeReps.bind(this);
        this.onChangeWeight = this.onChangeWeight.bind(this);
        this.onChangeExercise = this.onChangeExercise.bind(this);
    }

    componentDidMount() {
        axios.get('http://localhost:5000/exercises')
            .then(res => {
                this.setState({
                    exercises: res.data,
                    exercise: res.data[0]
                });
            })
            .catch(err => console.log(err));
    }

    toggle() {
        this.setState(prevState => ({
            modal: !prevState.modal
        }));
    }

    // TODO reset state when exercise added
    // TODO fix blank exercise name on save
    onCreate() {
        const exercise = {};
        
        exercise.log_id = this.props.logId;
        exercise.user_id = this.props.user._id;
        exercise.exercise = this.state.exercise._id;
        exercise.sets = this.state.sets;
        this.props.addLogExercise(exercise);

        // Close modal
        this.toggle();
    }

    onAddSet() {
        this.setState({
            sets: [...this.state.sets, { key: new Date().getTime(), reps: 0, weight: 0 }]
        });
    }

    onDeleteSet(key) {
        this.setState({
            sets: this.state.sets.filter((set) => set.key !== key)
        });
    }

    onChangeExercise(e) {
        this.setState({
            exercise: this.state.exercises.find(ex => ex._id === e.target.value)
        });
    }

    onChangeReps(key, e) {
        const reps = parseInt(e.target.value);
        this.setState({
            sets: this.state.sets.map(set => {
                return (set.key === key) ? {...set, reps} : set;
            })
        });
    }

    onChangeWeight(key, e) {
        const weight = parseInt(e.target.value);
        this.setState({
            sets: this.state.sets.map(set => {
                return (set.key === key) ? {...set, weight} : set;
            })
        });
    }

    setsList() {
        return this.state.sets.map((set) => {
            return (
            <FormGroup key={set.key} row>
            <Col>
                <Input
                    type="number"
                    defaultValue={set.reps}
                    onChange={e => this.onChangeReps(set.key, e)}
                    placeholder="Reps" />
            </Col>
            <Col>
                <Input
                    type="number"
                    defaultValue={set.weight}
                    onChange={e => this.onChangeWeight(set.key, e)}
                    placeholder="Weight (lb)" />
            </Col>
            <Button color="danger" onClick={() => this.onDeleteSet(set.key)}><FontAwesomeIcon icon="trash-alt" /></Button>
            </FormGroup>
            );
        })
    }

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
                                    value={this.state.exercise._id}
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

const mapStateToProps = (state) => ({
    user: state.auth.user
});

export default connect(
    mapStateToProps,
    { addLogExercise }
)(AddLogExercise);
