const router = require('express').Router();
const auth = require('../middleware/auth');

const Log = require('../models/log.model');
const LogExercise = require('../models/logExercise.model');

router.route('/')
    // Get list of logs and their associated exercises
    .get(auth, (req, res) => {
        Log.find()
            .then(logs => res.json(logs))
            .catch(err => res.status(400).json(err));
    })
    // Create an exercise log
    .post(auth, (req, res) => {
        // Create a log
        const description = req.body.description;
        const date = Date.parse(req.body.date);
        const user_id = req.user.id;
        const exercises = req.body.exercises;

        if (exercises.length === 0) {
            return res.status(400).json({ msg: 'Please add one or more exercises.' });
        }

        const newLog = new Log({
            description,
            date,
            user_id
        });

        newLog.save()
            .then(log => {
                // Create each exercise for this log
                // TODO find better way to handle errors
                const log_id = log.id;
                const savedExercises = [];

                exercises.forEach(async (exercise) => {
                    const { exercise_id, sets} = exercise;

                    const newLogExercise = new LogExercise({
                        log_id,
                        exercise_id,
                        user_id,
                        sets
                    });

                    try {
                        let response = await newLogExercise.save();
                        savedExercises.push(response.id);
                    } catch (err) {
                        // Clean up
                        savedExercises.forEach(exercise_id => {
                            LogExercise.findByIdAndDelete(exercise_id)
                                .catch(err => res.status(400).json(err));
                        });
                        return res.status(400).json(err);
                    }
                });

                res.json('Exercise log added.');
            })
            .catch(err => res.status(400).json(err));
    });

router.route('/:id')
    // Get a particular exercise log
    .get((req, res) => {
        // TODO
        // Exercise.findById(req.params.id)
        //     .then(exercise => res.json(exercise))
        //     .catch(err => res.status(400).json(err));
    })
    // Delete a particular exercise log
    .delete((req, res) => {
        // TODO
        // Exercise.findByIdAndDelete(req.params.id)
        //     .then(() => res.json('Exercise deleted.'))
        //     .catch(err => res.status(400).json(err));
    })
    // Update a particular exercise log
    .put((req, res) => {
        // TODO
        // Exercise.findById(req.params.id)
        //     .then(exercise => {
        //         exercise.username = req.body.username;
        //         exercise.description = req.body.description;
        //         exercise.duration = Number(req.body.duration);
        //         exercise.date = Date.parse(req.body.date);

        //         exercise.save()
        //             .then(() => res.json('Exercise updated.'))
        //             .catch(err => res.status(400).json(err));
        //     })
        //     .catch(err => res.status(400).json(err));
    });

module.exports = router;