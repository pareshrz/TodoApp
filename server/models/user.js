const mongoose = require('mongoose');
const Schema = mongoose.Schema;
const validator = require('validator');
const jwt = require('jsonwebtoken');
const _ = require('lodash');
const bcrypt = require('bcryptjs');

const SALT_WORK_FACTOR = 10;

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
    return _.pick(userObject, ['_id', 'email']);
}

UserSchema.pre('save', function(next){
    var user = this;
    var access = 'auth';
    var token = jwt.sign({_id : user._id.toHexString(), access}, "abc123").toString();
    user.tokens = user.tokens.concat([{access, token}]);

    if(!user.isModified('password')) return next();

    // generate a salt
    bcrypt.genSalt(SALT_WORK_FACTOR, (err, salt)=>{
        if (err) {
            return next(err);
        }
        // hash the password using our new salt
        bcrypt.hash(user.password, salt, (err, hash)=>{
            if(err) return next(err);

            // override the cleartext password with the hashed one
            user.password = hash;
            next();
        });
    });
});

UserSchema.statics.findByToken = function(token) {
    var User = this;
    var decoded;
    try {
        decoded = jwt.verify(token, 'abc123');
    } catch (e) {
        // return new Promise((resolve, reject)=>{
        //     reject();
        // });
        return Promise.reject();
    }
    return User.findOne({
        '_id' : decoded._id,
        'tokens.access' : 'auth',
        'tokens.token' : token 
    });
}

module.exports = mongoose.model("User", UserSchema);