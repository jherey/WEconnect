import users from '../models/users';

/**
 * @class business
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
}

export default Users;
