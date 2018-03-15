import bcrypt, { hashSync } from 'bcrypt';
import jwt from 'jsonwebtoken';
import dotenv from 'dotenv';
import models from '../models/index';

dotenv.config();
const secret = process.env.secretKey;
//	Users model
const users = models.User;

/**
 * @class users
 */
class Users {
	/**
   * @returns {Object} registerUsers
   * @param {*} req
   * @param {*} res
	 * @returns {json} json
   */
	static registerUsers(req, res) {
		const {
			firstname, lastname, profilepic, sex, username, email, password
		} = req.body;
		// if (req.files) {
		// 	const file = req.files.filename;
		// 	const filename = file.name;
		// 	const filepath = `../../src' ${filename}`;
		// 	file.mv(filepath, (err) => {
		// 		if (err) {
		// 			res.send('Error occured');
		// 		} else {
		// 			console.log(`File uploaded to ${filepath}`);
		// 			res.send('Done!');
		// 		}
		// 	});
		// }
		//	Create new user and push to Database
		users
			.create({
				firstname,
				lastname,
				username,
				profilepic,
				email,
				sex,
				password: hashSync(password, 10)
			})
			.then((user) => {
				//	Assign token to the user for six hours
				const token = jwt.sign({ user }, secret, { expiresIn: '6h' });
				//	Success message
				res.status(201).json({
					message: 'Signed up successfully',
					token
				});
			})
			.catch(() => res.status(500).json({
				message: 'Internal server error'
			}));
	}

	/**
   * @returns {Object} loginUser
   * @param {*} req
   * @param {*} res
	 * @returns {json} json
   */
	static loginUser(req, res) {
		const { username, password } = req.body;
		//	Find one user with username sent in the body
		users.findOne({ where: { username } })
			.then((user) => {
				//	Compare inputed password with hashed password in the database
				if (user && bcrypt.compareSync(password, user.password)) {
					const userData = {
						username: user.username,
						email: user.email,
						id: user.id
					};
					//	Assign token to user for six hours
					const token = jwt.sign(userData, secret, { expiresIn: '6h' });
					//	Success message
					return res.status(200).json({
						message: 'User logged in successfully',
						token
					});
				}
				//	Details mismatch
				return res.status(400).json({ message: 'Username/Password Incorrect' });
			})
			.catch(error => res.status(400).json(error));
	}
}

export default Users;
