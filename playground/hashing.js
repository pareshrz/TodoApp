const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');

let text = "Hello World!";

let data = {
    id : 10
}

let token = jwt.sign(data, '123abc');

console.log(token);

let decoded = jwt.verify(token, "123abc");

console.log("Decoded", decoded);