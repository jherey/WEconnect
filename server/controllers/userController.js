import users from '../models/users';

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
		return res.json({
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
		const id = users[users.length - 1].id + 1;
		users.push({
			id,
			username,
			email,
			password
		});
		return res.status(200).json({
			message: 'User registered successfully',
			error: false
		});
	}

	/**
   * @returns {Object} loginUser
   * @param {*} req
   * @param {*} res
   */
	static loginUser(req, res) {
		const { email, password } = req.body;
		for (let i = 0; i < users.length; i += 1) {
			if (
				email === users[i].email && password === users[i].password
			) {
				return res.status(200).json({
					message: 'Success',
					error: false
				});
			}
		}
		res.status(400).json({
			message: 'Error logining in',
			error: true
		});
	}
}

export default Users;
