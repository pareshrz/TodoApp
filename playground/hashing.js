const bcrypt = require('bcryptjs');

let password = "123abc";

bcrypt.genSalt(10, (err, salt)=>{
	bcrypt.hash(password, salt, (err, hash)=>{
		console.log(hash);
	});
});

let hashed_password = "$2a$10$i4Ap2z0wcl6uKrRCEQGseOM25yjkeAKGa/q2vR/uhv3MXfW/CAQUy";

bcrypt.compare("123abc", hashed_password, (err, res)=>{
	console.log(res);
});