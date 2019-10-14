import React, { Component } from 'react';
import { connect } from 'react-redux';
import {
    Card,
    CardHeader,
    CardBody,
    CardText,
    Row,
    Col } from 'reactstrap';
import { getLogExercises } from '../actions/logExerciseActions';

const Exercise = props => (
    <Col className="mb-2" md="6">
        <Card>
            <CardHeader>{props.exercise.exercise.name}</CardHeader>
            <CardBody>
                {props.exercise.sets.map(set => {
                    return <CardText key={set._id}>{set.weight} lb x {set.reps} reps</CardText>
                })}
            </CardBody>
        </Card>
    </Col>
)

class ExercisesList extends Component {
    componentDidMount() {
        this.props.getLogExercises(this.props.match.params.id);
    }

    exerciseList() {
        const { logExercises } = this.props.logExercise;
        return logExercises.map(exercise => {
            return <Exercise exercise={exercise} key={exercise._id} />;
        })
    }

    render() {
        return (
            <div className="container has-fixed-nav">
                <div className="mt-3 mb-2 clearfix">
                    <h3 className="float-left">Logged Exercises</h3>
                </div>
                <Row>
                { this.exerciseList() }
                </Row>
            </div>
        );
    }
}

const mapStateToProps = state => ({
    logExercise: state.logExercise
});

export default connect(
    mapStateToProps,
    { getLogExercises }
)(ExercisesList);