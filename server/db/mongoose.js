
console.log(process.env.MONGODB_URI);

const mongoose = require('mongoose');

mongoose.Promise = global.Promise;

mongoose.connect(process.env.MONGODB_URI, {useNewUrlParser: true});

mongoose.set('useFindAndModify', false);

module.exports = {
    mongoose
};
