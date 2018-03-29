import models from '../models/index';

// Business model
const Businesses = models.Business;

const businessValidator = {
  query: (req, res, next) => {
    const { location, category } = req.query;
    if (location || category) {
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
    } else if (!location || !category) {
      return next();
    }
  },

  createBusinessValidator: (req, res, next) => {
    req.check('businessName', 'Business name is required').notEmpty();
    req.check('email', 'Email is required').notEmpty();
    req.check('category', 'Category is required').notEmpty();
    req.check('location', 'Location is required').notEmpty();

    const errors = req.validationErrors();
    if (errors) {
      return res.status(400).json({
        message: errors[0].msg,
        error: true
      });
    }

    next();
  }
};

export default businessValidator;
