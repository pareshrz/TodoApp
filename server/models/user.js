const mongoose = require('mongoose');
const Schema = mongoose.Schema;

var UserSchema = new Schema({
    email : {
        required : true,
        minlength : 3,
        maxlength : 55,
        type : String,
        trim : true
    },

});

module.exports = mongoose.model("User", UserSchema);