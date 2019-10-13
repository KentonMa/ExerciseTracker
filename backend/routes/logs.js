const router = require('express').Router();
const auth = require('../middleware/auth');

require('../models/exercise.model');

const Log = require('../models/log.model');
const LogExercise = require('../models/logExercise.model');

// All actions for this resource must be authenticated
router.use(auth);

router.route('/')
    // Get list of exercise logs
    .get((req, res) => {
        Log.find({ user_id: req.user.id })
            .then(logs => res.json(logs))
            .catch(err => res.status(400).json(err));
    })
    // Create an exercise log
    .post((req, res) => {
        const description = req.body.description;
        const date = Date.parse(req.body.date);
        const user_id = req.user.id;

        const newLog = new Log({
            description,
            date,
            user_id
        });

        newLog.save()
            .then(log => {
                res.status(201).json(log);
            })
            .catch(err => res.status(400).json(err));
    });

router.route('/:id')
    // Get a specified exercise log
    .get((req, res) => {
        Log.findById(req.params.id)
            .then(log => {
                if (log.user_id.toString() !== req.user.id) {
                    res.status(403).json({ msg: 'Forbidden access to resource.' });
                } else {
                    res.json(log);
                }
            })
            .catch(err => res.status(400).json(err));
    })
    // Delete a particular exercise log
    .delete((req, res) => {
        Log.findById(req.params.id)
            .then(log => {
                if (log.user_id.toString() !== req.user.id) {
                    res.status(403).json({ msg: 'Forbidden access to resource.' });
                } else {
                    Log.findOneAndDelete({ _id: log.id }, (err, log) => {
                        if (err) {
                            res.status(400).json(err);
                        } else {
                            res.json({ msg: 'Exercise log deleted.' });
                        }
                    })
                }
            })
            .catch(err => res.status(400).json(err));
    })
    // Update a particular exercise log
    .put((req, res) => {
        Log.findById(req.params.id)
            .then(log => {
                if (log.user_id.toString() !== req.user.id) {
                    res.status(403).json({ msg: 'Forbidden access to resource.' });
                } else {
                    log.description = req.body.description || log.description;
                    log.date = Date.parse(req.body.date) || log.date;
    
                    log.save()
                        .then(log => res.json(log))
                        .catch(err => res.status(400).json(err));
                }
            })
            .catch(err => res.status(400).json(err));
    });

router.route('/:id/log-exercises')
    // Get log exercises of a specified log
    .get((req, res) => {
        LogExercise.find({ log_id: req.params.id, user_id: req.user.id })
            .populate('exercise')
            .then(exercises => res.json(exercises))
            .catch(err => res.status(400).json(err));
    });

module.exports = router;