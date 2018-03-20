const errorMessage = (res, message) => res.status(400).json({
	message,
	error: true
});

const validateUsers = {
	userSignUp: (req, res, next) => {
		req.check('firstname', 'Firstname is required').notEmpty();
		req.check('lastname', 'Lastname is required').notEmpty();
		req.check('email', 'Email is required').notEmpty();
		req.check('email', 'Email is not valid').isEmail();
		req.check('sex', 'Sex is required').notEmpty();
		req.check('username', 'Username is required').notEmpty();
		req.check('password', 'Password is required').notEmpty();
		req
			.check('password', 'Minimum password length is 5 characters')
			.isLength({ min: 5 });

		const errors = req.validationErrors();
		if (errors) { return errorMessage(res, errors[0].msg); }

		next();
	},

	userLogin: (req, res, next) => {
		req.check('username', 'Username field is empty').notEmpty();
		req.check('password', 'Password field is empty').notEmpty();
		req
			.check('password', 'Minimum password length is 5 characters')
			.isLength({ min: 5 });

		const errors = req.validationErrors();
		if (errors) { return errorMessage(res, errors[0].msg); }

		next();
	}
};

export default validateUsers;
