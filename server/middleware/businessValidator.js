import models from '../models/index';

// Business model
const Businesses = models.Business;

const businessValidator = {
  query: (req, res, next) => {
    const { name, location, category } = req.query;
    if (name || location || category) {
      // If there's a name query string
      if (name) {
        Businesses
          // Find by name
          .findAll({
            where: {
              businessName: { $iLike: `%${name}%` }
            }
          })
          .then((business) => {
            // If no businesses found, return error
            if (business.length < 1) {
              return res.status(404).json({
                message: 'No business with this name!',
              });
            }
            // If business found, return business found
            return res.status(200).json({
              message: 'Business Found!',
              business
            });
          });
      }
      // If there's a location query string
      if (location) {
        Businesses
          // Find by location
          .findAll({
            where: {
              location: { $iLike: `%${location}%` }
            }
          })
          .then((business) => {
            // If no businesses found, return error
            if (business.length < 1) {
              return res.status(404).json({
                message: 'No business found for this location!',
              });
            }
            // If business found, return business found
            return res.status(200).json({
              message: 'Business Found!',
              business
            });
          });
      }
      if (category) {
        Businesses
          // Find by category
          .findAll({
            where: {
              category: { $iLike: `%${category}%` }
            }
          })
          .then((business) => {
            // If no businesses found, return error
            if (business.length < 1) {
              return res.status(404).json({
                message: 'No business found for this category!',
              });
            }
            // If business found, return business found
            return res.status(200).json({
              message: 'Business Found!',
              business
            });
          });
      }
    } else if (!name || !location || !category) {
      return next();
    }
  },

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
