const mongoose = require('mongoose');

const Schema = mongoose.Schema;

const logSchema = new Schema({
    user_id: {
        type: Schema.Types.ObjectId,
        ref: 'User',
        required: true
    },
    date: { type: Date, required: true },
}, {
    timestamps: true,
});

const Log = mongoose.model('Log', logSchema);

module.exports = Log;