const { Schema, model } = require('mongoose');

const taskSchema = Schema({
    task: {
        type: String,
        required: true
    },
    checked: {
        type: Boolean,
        default: false
    },
    userId: {
        type: Schema.Types.ObjectId,
        ref: "User"
    }
}, {
    timestamps: true
});

const Task = model('Task', taskSchema);

module.exports = Task;