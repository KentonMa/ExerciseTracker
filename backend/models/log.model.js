const mongoose = require('mongoose');

const Schema = mongoose.Schema;

const logSchema = new Schema({
    user_id: { type: Schema.Types.ObjectId, required: true },
    description: { type: String },
    date: { type: Date, required: true },
}, {
    timestamps: true,
});

const Log = mongoose.model('Log', logSchema);

module.exports = Log;