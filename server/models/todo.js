const mongoose = require('mongoose');
const Schema = mongoose.Schema;

let TodoSchema = new Schema({
    text : {
        required : true,
        type : String,
        minlength : 5,
        maxlength : 255,
        trim : true,
    },
    completed : {
        type : Boolean,
        default : false
    },
    completedAt : {
        type : Number,
        default : null
    }
});

module.exports = mongoose.model("Todo", TodoSchema);