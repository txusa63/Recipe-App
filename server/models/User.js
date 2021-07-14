const mongoose = require('mongoose');

const UserSchema = new mongoose.Schema({
    email: {type: String, required: true, unique: true},
    passwordHash: {type: String, required: true},
    displayName: {type: String},
},
{
    timestamps: true
});

const User = mongoose.model('user', UserSchema);
module.exports = User;