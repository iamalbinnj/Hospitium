var db = require('../config/connection');

var collection = require('../config/collections');

const bcrypt = require('bcrypt');

var objectId = require('mongodb').ObjectId;

module.exports = {
    doFSignup: (facultyData) => {
		return new Promise(async (resolve, reject) => {
			facultyData.fpassword = await bcrypt.hash(facultyData.fpassword, 10);
			db.get()
				.collection(collection.FACULTY_COLLECTION)
				.insertOne(facultyData)
				.then((data) => {
					resolve(data.insertedId);
				});
		});
	},
	doLogin: (facultyData) => {
		return new Promise(async (resolve, reject) => {
			let loginStatus = false;
			let response = {};
			let faculty = await db
				.get()
				.collection(collection.FACULTY_COLLECTION)
				.findOne({ Email: facultyData.femail});
            // let user= await db.get().collection(collection.USER_COLLECTION).findOne({Email: userData.uemail})
			if (faculty) {
				bcrypt.compare(facultyData.Password, faculty.fpassword).then((status) => {
					if (status) {
						console.log('login success');
						response.faculty = faculty;
						response.status = true;
						resolve(response);
					} else {
						console.log('login faild');
						resolve({ status: false });
					}
				});
            
			}// if (user){
            //     bcrypt.compare(userData.upassword, user.Password).then((status) => {
			// 		if (status) {
			// 			console.log('login success');
			// 			response.user = user;
			// 			response.status = true;
			// 			resolve(response);
			// 		} else {
			// 			console.log('login faild');
			// 			resolve({ status: false });
			// 		}
			// 	});
            // }
             else {
				console.log('login faild');
				resolve({ status: false });
			}
		});
	},
}