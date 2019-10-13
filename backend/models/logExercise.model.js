const mongoose = require('mongoose');

const Schema = mongoose.Schema;

const logExerciseSchema = new Schema({
    log_id: { type: Schema.Types.ObjectId, required: true },
    user_id: { type: Schema.Types.ObjectId, required: true },
    exercise: {
        type: Schema.Types.ObjectId,
        ref: 'Exercise',
        required: true
    },
    sets: [{
        reps: {
            type: Number,
            required: true
        },
        weight: {
            type: Number,
            required: true
        }
    }]
}, {
    timestamps: true,
});

const LogExercise = mongoose.model('LogExercise', logExerciseSchema);

module.exports = LogExercise;