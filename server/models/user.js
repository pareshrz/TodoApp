// User Model
const mongoose = require('mongoose');
const Schema = mongoose.Schema;
const bcrypt = require('bcrypt');
const SALT_WORK_FACTOR = 10;
const jwt = require('jsonwebtoken');
const _ = require('lodash');

const validator = require('validator');

const UserSchema = new Schema({
    email : {
        type : String,
        required : true,
        trim : true,
        minLength : 4,
        unique : true,
        validate : {
            validator : validator.isEmail,
            message : "{VALUE} is not a valid email"
        }
    },
    password : {
        type : String,
        required : true,
        minlength : 6
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


// UserSchema.methods.generateAuthToken = function () {
//     let user = this;
//     let access = 'auth';
//     var token = jwt.sign({_id : user._id.toHexString(), access}, 'abc123');
//     user.tokens = user.tokens.concat([{access, token}]);

//     user.save().then(()=>{
//         return new Promise((resolve, reject)=>{
//             resolve(token);
//         });
//     });
// };




UserSchema.pre('save', function(next){
    var user = this;
    let access = 'auth';
    var token = jwt.sign({_id : user._id.toHexString(), access}, 'abc123');
    user.tokens = user.tokens.concat([{access, token}]);

    if (!user.isModified('password')) return next();
    // generate a salt
    bcrypt.genSalt(SALT_WORK_FACTOR, function(err, salt) {
        if (err) return next(err);

        // hash the password using our new salt
        bcrypt.hash(user.password, salt, function(err, hash) {
            if (err) return next(err);

            // override the cleartext password with the hashed one
            user.password = hash;
            next();
        });
    });
});


UserSchema.methods.toJSON = function() {
    let user = this;
    let userObject = user.toObject();
    return _.pick(userObject, ['_id', 'email']);
};

UserSchema.statics.findByToken = function(token) {
    let User = this;
    let decoded;

    try {
        decoded = jwt.verify(token, "abc123");
    } catch (e) {
        // return new Promise((resolve, reject)=>{
        //     reject();
        // });
        return Promise.reject();
    }

    return User.findOne({
        '_id' : decoded._id,
        'tokens.token' : token,
        'tokens.access' : "auth"
    }); 
}

module.exports = mongoose.model("User", UserSchema);