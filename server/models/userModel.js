const { Schema, model } = require('mongoose');

const userSchema = Schema({
    username: {
        type: String,
        required: true
    },
    password: {
        type: String,
        required: true
    }
}, {
    timestamps: true
});

const User = model('User', userSchema);

module.exports = User;