import React, { Component } from 'react';
import {
    Card,
    CardHeader,
    CardBody,
    CardText,
    Row,
    Col } from 'reactstrap';

const Exercise = props => (
    <Col className="mb-2" md="6">
        <Card>
            <CardHeader>{props.exercise.exercise}</CardHeader>
            <CardBody>
                {props.exercise.sets.map(set => {
                    return <CardText>{set.weight} lb x {set.reps} reps</CardText>
                })}
            </CardBody>
        </Card>
    </Col>
)

export default class ExercisesList extends Component {
    constructor(props) {
        super(props);

        this.state = {
            exercises: [
                {
                    "_id": "5d707786d39fde253018140f",
                    "exercise": "Bench Press",
                    "sets": [
                        {
                            "_id": "5d707786d39fde2530181414",
                            "reps": 5,
                            "weight": 135
                        },
                        {
                            "_id": "5d707786d39fde2530181413",
                            "reps": 5,
                            "weight": 135
                        },
                        {
                            "_id": "5d707786d39fde2530181412",
                            "reps": 5,
                            "weight": 135
                        },
                        {
                            "_id": "5d707786d39fde2530181411",
                            "reps": 5,
                            "weight": 135
                        },
                        {
                            "_id": "5d707786d39fde2530181410",
                            "reps": 5,
                            "weight": 135
                        }
                    ]
                },
                {
                    "_id": "5d707786d39fde253018140g",
                    "exercise": "Leg Press",
                    "sets": [
                        {
                            "_id": "5d707786d39fde253018141a",
                            "reps": 5,
                            "weight": 155
                        },
                        {
                            "_id": "5d707786d39fde2530181419",
                            "reps": 5,
                            "weight": 155
                        },
                        {
                            "_id": "5d707786d39fde2530181418",
                            "reps": 5,
                            "weight": 155
                        },
                        {
                            "_id": "5d707786d39fde2530181417",
                            "reps": 5,
                            "weight": 155
                        },
                        {
                            "_id": "5d707786d39fde2530181416",
                            "reps": 5,
                            "weight": 155
                        }
                    ]
                },
                {
                    "_id": "5d707786d39fde253018140g",
                    "exercise": "Overhead Press",
                    "sets": [
                        {
                            "_id": "5d707786d39fde253018141a",
                            "reps": 5,
                            "weight": 85
                        },
                        {
                            "_id": "5d707786d39fde2530181419",
                            "reps": 5,
                            "weight": 85
                        },
                        {
                            "_id": "5d707786d39fde2530181418",
                            "reps": 5,
                            "weight": 85
                        },
                        {
                            "_id": "5d707786d39fde2530181417",
                            "reps": 5,
                            "weight": 85
                        },
                        {
                            "_id": "5d707786d39fde2530181416",
                            "reps": 5,
                            "weight": 85
                        }
                    ]
                }
            ]
        }
    }

    exerciseList() {
        return this.state.exercises.map(exercise => {
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