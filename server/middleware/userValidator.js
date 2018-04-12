const userValidator = {
  userSignUp: (req, res, next) => {
    req.check('firstname', 'Firstname is required').notEmpty();
    req.check('lastname', 'Lastname is required').notEmpty();
    req.check('username', 'Username is required').notEmpty();
    req.check('email', 'Email is required').notEmpty();
    req.check('email', 'Email is not valid').isEmail();
    req.check('password', 'Password is required').notEmpty();
    req.check('confirmPassword', 'Confirm password field is required').notEmpty();
    req
      .check('password', 'Minimum password length is 5 characters')
      .isLength({ min: 5 });
    req.check('sex', 'Sex is required').notEmpty();

    const errors = req.validationErrors();
    if (errors) {
      return res.status(400).json({
        message: errors[0].msg
      });
    }
    return next();
  },

  userLogin: (req, res, next) => {
    req.check('username', 'Username is required').notEmpty();
    req.check('password', 'Password is required').notEmpty();
    req
      .check('password', 'Minimum password length is 5 characters')
      .isLength({ min: 5 });

    const errors = req.validationErrors();
    if (errors) {
      return res.status(400).json({
        message: errors[0].msg
      });
    }
    return next();
  }
};

export default userValidator;
