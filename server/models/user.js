const mongoose = require('mongoose');
const Schema = mongoose.Schema;
const validator = require('validator');

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

module.exports = mongoose.model("User", UserSchema);