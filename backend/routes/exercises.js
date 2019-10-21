const router = require('express').Router();

const Exercise = require('../models/exercise.model');

router.route('/')
    // Get list of exercises
    .get((req, res) => {
        Exercise.find()
            .then(exercises => res.json(exercises))
            .catch(err => res.status(400).json(err));
    })

module.exports = router;