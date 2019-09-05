const router = require('express').Router();
const auth = require('../middleware/auth');

const Log = require('../models/log.model');

// All actions for this resource must be authenticated
router.use(auth);

router.route('/')
    // Get list of exercise logs
    // TODO retrieve only the authenticated user's logs
    .get((req, res) => {
        Log.find()
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
                res.json(log);
            })
            .catch(err => res.status(400).json(err));
    });

router.route('/:id')
    // Get a specified exercise log
    // TODO retrieve only the authenticated user's logs
    .get((req, res) => {
        Log.findById(req.params.id)
            .then(log => res.json(log))
            .catch(err => res.status(400).json(err));
    })
    // Delete a particular exercise log
    // TODO delete only the authenticated user's logs
    .delete((req, res) => {
        Log.findByIdAndDelete(req.params.id)
            .then(() => res.json({ msg: 'Exercise log deleted.' }))
            .catch(err => res.status(400).json(err));
    })
    // Update a particular exercise log
    // TODO update only the authenticated user's logs
    .put((req, res) => {
        Log.findById(req.params.id)
            .then(log => {
                log.description = req.body.description || log.description;
                log.date = Date.parse(req.body.date) || log.date;

                log.save()
                    .then(log => res.json(log))
                    .catch(err => res.status(400).json(err));
            })
            .catch(err => res.status(400).json(err));
    });

module.exports = router;