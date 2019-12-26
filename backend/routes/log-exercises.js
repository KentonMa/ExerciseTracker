const router = require('express').Router();
const auth = require('../middleware/auth');

const LogExercise = require('../models/logExercise.model');

// All actions for this resource must be authenticated
router.use(auth);

router.route('/')
    // Get list of log exercises
    .get((req, res) => {
        LogExercise.find({ user_id: req.user.id })
            .then(exercises => res.json(exercises))
            .catch(err => res.status(400).json(err));
    })
    // Create a log exercise
    .post((req, res) => {
        const { log_id, exercise, sets } = req.body;
        const user_id = req.user.id;

        const newLogExercise = new LogExercise({
            log_id,
            exercise,
            user_id,
            sets
        });

        newLogExercise.save()
            .then(exercise => {
                exercise.populate('exercise', (err, populatedExercise) => {
                    if (err) res.status(400).json(err);
                    res.status(201).json(populatedExercise);
                });
            })
            .catch(err => res.status(400).json(err));
    });

router.route('/:id')
    // Get a specified log exercise
    .get((req, res) => {
        LogExercise.findById(req.params.id)
            .then(exercise => {
                if (exercise.user_id.toString() !== req.user.id) {
                    res.status(403).json({ msg: 'Forbidden access to resource.' });
                } else {
                    res.json(exercise);
                }
            })
            .catch(err => res.status(400).json(err));
    })
    // Delete a particular log exercise
    .delete((req, res) => {
        LogExercise.findById(req.params.id)
            .then(exercise => {
                if (exercise.user_id.toString() !== req.user.id) {
                    res.status(403).json({ msg: 'Forbidden access to resource.' });
                } else {
                    LogExercise.findOneAndDelete({ _id: exercise.id }, (err, exercise) => {
                        if (err) {
                            res.status(400).json(err);
                        } else {
                            res.json({ msg: 'Log exercise deleted.' });
                        }
                    })
                }
            })
            .catch(err => res.status(400).json(err));
    })
    // Update a particular log exercise
    .put((req, res) => {
        LogExercise.findById(req.params.id)
            .then(exercise => {
                if (exercise.user_id.toString() !== req.user.id) {
                    res.status(403).json({ msg: 'Forbidden access to resource.' });
                } else {
                    exercise.exercise_id = req.body.exercise_id || exercise.exercise_id;
                    exercise.sets = req.body.sets || exercise.sets;
    
                    exercise.save()
                        .then(exercise => res.json(exercise))
                        .catch(err => res.status(400).json(err));
                }
            })
            .catch(err => res.status(400).json(err));
    });

module.exports = router;