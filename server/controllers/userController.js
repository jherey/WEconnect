import bcrypt, { hashSync } from 'bcrypt';
import models from '../models/index';

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
		const { username, email, password } = req.body;
		users
			.create({
				username,
				email,
				password: hashSync(password, 10)
			})
			.then(user => res.status(201).json(user))
			.catch(error => res.status(400).json(error));
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
					return res.status(200).json({
						message: 'User logged in successfully'
					});
				}
				return res.status(400).json({ message: 'Username/Password Incorrect' });
			})
			.catch(error => res.status(400).json(error));
	}
}

export default Users;
