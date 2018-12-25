const mongoose = require('mongoose');
const Schema = mongoose.Schema;
const validator = require('validator');
const jwt = require('jsonwebtoken');
const _ = require('lodash');

var UserSchema = new Schema({
    email : {
        required : true,
        minlength : 3,
        maxlength : 55,
        type : String,
        trim : true,
        unique : true,
        validate : {
            validator : (value) => {
                return validator.isEmail(value);
            },
            message : '{VALUE} is not a valid email'
        }
    },
    password : {
        required : true,
        minlength : 6,
        maxlength: 20,
        type : String,
        trim : true
    },
    tokens : [{
        access : {
            type : String,
            required : true
        },
        token : {
            type : String,
            required : true
        }
    }]

});


UserSchema.methods.toJSON = function() {
    var user = this;
    var userObject = user.toObject();
    return _.pick(userObject, ['_id', 'email', 'password']);
}

UserSchema.pre('save', function(next){
    var user = this;
    var access = 'auth';
    var token = jwt.sign({_id : user._id.toHexString(), access}, "abc123").toString();
    user.tokens = user.tokens.concat([{access, token}]);
    next();
});

module.exports = mongoose.model("User", UserSchema);