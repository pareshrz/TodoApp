const bcrypt = require('bcryptjs');


var password =  "123abc!";

bcrypt.genSalt(10, (err, salt)=>{
	bcrypt.hash(password, salt, (err, hash)=>{
		console.log(hash);
		bcrypt.compare("123abc", hash).then((res)=>{
			console.log(res);
		});
	});
});










// const jwt = require('jsonwebtoken');

// var data = {
// 	id : 10
// }

// var token = jwt.sign(data, '123abc');

// console.log(token);

// var decoded = jwt.verify(token, '123ab');

// console.log("Decoded : ", decoded);

// const SHA256 = require('crypto-js').SHA256;

// var message = "I am user no. 3";

// var hashed = SHA256(message).toString();

// console.log(`Message : `, message);
// console.log(`Hash: `, hashed);

// var data = {
// 	id : 4
// };

// var token = {
// 	data,
// 	hash : SHA256(JSON.stringify(data) + 'somesecret').toString()
// }



// token.data.id = 5;
// token.hash = SHA256(JSON.stringify(token.data)).toString();


// var resultHash = SHA256(JSON.stringify(token.data)+ 'somesecret').toString();

// if(resultHash === token.hash) {
// 	console.log("Data was not changed");
// } else {
// 	console.log("Data was changed don't trust!");
// }




