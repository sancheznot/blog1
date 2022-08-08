
var uniqueValidator = require('mongoose-unique-validator');
const bcrypt = require('bcrypt');
const mongoose = require('mongoose')
const Schema = mongoose.Schema;


const UserSchema = new Schema({
    username: {
        type: 'string',
        required: [true,'Please provide a username'],
        unique: true
    },
    password: {
        type: 'string',
        required: [true,'Please provide a password']
        
    }

});

UserSchema.pre('save', function (next) {
    // const user = tris

    bcrypt.hash(this.password, 10, (error, hash) => {
        this.password = hash;
        next();
    })
});
UserSchema.plugin(uniqueValidator);
const User = mongoose.model('User', UserSchema);
module.exports = User;
