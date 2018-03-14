import bcrypt, { hashSync } from 'bcrypt';
import jwt from 'jsonwebtoken';
import dotenv from 'dotenv';
import models from '../models/index';

dotenv.config();
const secret = process.env.secretKey;
const users = models.User;

/**
 * @class users
 */
class Users {
	/**
 * @returns {Object} getAllUsers
 * @param {*} req
 * @param {*} res
 */
	static getAllUsers(req, res) {
		return res.status(200).json({
			users
		});
	}

	/**
   * @returns {Object} registerUsers
   * @param {*} req
   * @param {*} res
   */
	static registerUsers(req, res) {
		const {
			firstname, lastname, sex, username, email, password
		} = req.body;
		users
			.create({
				firstname,
				lastname,
				username,
				email,
				sex,
				password: hashSync(password, 10)
			})
			.then((user) => {
				const token = jwt.sign({ user }, secret, { expiresIn: '6h' });
				res.status(201).json({
					message: 'signed up successfully',
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
   */
	static loginUser(req, res) {
		const { username, password } = req.body;
		users.findOne({ where: { username } })
			.then((user) => {
				if (user && bcrypt.compareSync(password, user.password)) {
					const userData = {
						username: user.username,
						email: user.email,
						id: user.id
					};
					const token = jwt.sign(userData, secret, { expiresIn: '6h' });
					return res.status(200).json({
						message: 'User logged in successfully',
						token
					});
				}
				return res.status(400).json({ message: 'Username/Password Incorrect' });
			})
			.catch(error => res.status(400).json(error));
	}
}

export default Users;
