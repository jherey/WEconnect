const businessValidator = {
  createBusinessValidator: (req, res, next) => {
    req.check('businessName', 'Business name is required').notEmpty();
    req.check('email', 'Email is required').notEmpty();
    req.check('businessInfo', 'Description is required').notEmpty();
    req
      .check('businessInfo', 'Description should be more than 30 words')
      .isLength({ min: 30 });
    req.check('email', 'Email is not valid').isEmail();
    req.check('category', 'Category is required').notEmpty();
    req.check('location', 'Location is required').notEmpty();

    const errors = req.validationErrors();
    const validationErrors = [];
    if (errors) {
      errors.map(err => validationErrors.push(err.msg));
      return res.status(400).json({
        errors: validationErrors
      });
    }
    return next();
  }
};

export default businessValidator;
