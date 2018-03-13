const errorMessage = (res, message) => res.status(400).json({
	message,
	error: true
});
/**
 * @class validateUsers
 */
class validateUsers {
	/**
   * @returns {Object} userSignUp
   * @param {*} req
   * @param {*} res
	 * @param {*} next
   */
	static userSignUp(req, res, next) {
		req.check('username', 'Username is required').notEmpty();
		req.check('email', 'Email is not valid').isEmail();
		req
			.check('password', 'Minimum password length is 5 characters')
			.isLength({ min: 5 });

		const errors = req.validationErrors();
		if (errors) { return errorMessage(res, errors[0].msg); }

		next();
	}

	/**
   * @returns {Object} userLogin
   * @param {*} req
   * @param {*} res
	 * @param {*} next
   */
	static userLogin(req, res, next) {
		req.check('username', 'Username field is empty').notEmpty();
		req.check('password', 'Password field is empty').notEmpty();
		req
			.check('password', 'Minimum password length is 5 characters')
			.isLength({ min: 5 });

		const errors = req.validationErrors();
		if (errors) { return errorMessage(res, errors[0].msg); }

		next();
	}
}

export default validateUsers;
