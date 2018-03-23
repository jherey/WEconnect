import users from '../models/users';

/**
 * @class users
 */
class Users {
	/**
   * @returns {Object} registerUsers
   * @param {*} req
   * @param {*} res
   */
	static registerUsers(req, res) {
		const { name, email, password } = req.body;
		if (!name || !email || !password) {
			return res.json({
				message: 'Fill in all fields',
				error: true
			});
		}
		users.push(req.body);
		return res.json({
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
		users.forEach((user) => {
			if (
				email === user.email && password === user.password
			) {
				return res.status(200).json({
					message: 'Success',
					error: false
				});
			}
		});
		res.status(400).json({
			message: 'Error logining in',
			error: true
		});
	}
}

export default Users;
