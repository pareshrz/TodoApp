const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');

let text = "Hello World!";

let data = {
    id : 10
}

let token = jwt.sign(data, '123abc');



console.log(typeof token);