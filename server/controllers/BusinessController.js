import models from '../models/index';

// Business model
const Businesses = models.Business;

const Business = {
  // Method to register business
  registerBusiness: (req, res) => {
    const {
      businessName,
      website,
      category,
      address,
      businessInfo,
      email,
      businessImage,
      location
    } = req.body;
    const { authData } = req;
    // Create the business
    Businesses
      .create({
        businessName,
        website,
        category,
        businessInfo,
        address,
        email,
        businessImage,
        location,
        userId: authData.id // Get the id of the user from the authData
      })
      // Success message
      .then(business => res.status(201).json({
        message: 'Business created successfully',
        business
      }))
      .catch(error => res.status(400)
        .json({
          message: error.errors[0].message
        }));
  },

  updateBusiness: (req, res) => {
    const {
      businessName,
      website,
      category,
      businessInfo,
      email,
      businessImage,
      location
    } = req.body;
    const { businessId } = req.params;
    const { authData } = req;
    Businesses.find({
      where: {
        businessName
      }
    })
      .then((businessFound) => {
        if (businessFound) {
          return res.status(400).json({
            message: 'A business with this name exists!',
            error: true
          });
        }
      });
    // Check if business exist
    Businesses
      .findOne({
        where: {
          id: businessId
        }
      })
      .then((business) => {
        // No buisness found
        if (!business) {
          return res.status(404).json({
            message: 'Business Not Found!',
            error: true
          });
        }
      });
    // Find business only if authorized
    Businesses
      .findOne({
        where: {
          id: businessId,
          userId: authData.id
        }
      })
      .then((business) => {
        // Different user tries to update the business
        if (!business) {
          return res.status(404).json({
            message: 'Oops! You cannot update this business',
            error: true
          });
        }
        // Update the business
        business
          .update({
            businessName,
            website,
            category,
            businessInfo,
            email,
            businessImage,
            location
          })
          // Success message
          .then(updatedBusiness => res.status(200).json({
            message: 'Business Update Successful',
            updatedBusiness,
          }))
          // Catch errors
          .catch(error => res.status(400)
            .json(error.errors[0].message));
      });
  },

  removeBusiness: (req, res) => {
    const { businessId } = req.params;
    const { authData } = req;
    // Check if business exist
    Businesses
      .findOne({
        where: {
          id: businessId
        }
      })
      .then((business) => {
        // No business found
        if (!business) {
          return res.status(404).json({
            message: 'Business Not Found!',
            error: true
          });
        }
      });
    // Find business only if authorized
    Businesses
      .findOne({
        where: {
          id: businessId,
          userId: authData.id
        }
      })
      .then((business) => {
        // If no business is found
        if (!business) {
          // Error message
          return res.status(404).json({
            message: 'Oops! You cannot delete this business',
          });
        }
        return business
          // Delete the business
          .destroy()
          // Success message
          .then(res.status(200).json({
            message: 'Business Successfully Deleted!'
          }))
          .catch(error => res.status(400)
            .json(error.errors[0].message));
      });
  },

  getBusiness: (req, res) => {
    const { businessId } = req.params;
    Businesses
      // FInd one business by the businessId from the user
      .findById(businessId)
      .then((business) => {
        // If no business found
        if (!business) {
          return res.status(404).send({
            message: 'Business Not Found!',
          });
        }
        // Business found!
        return res.status(200).json({
          message: 'Business Found',
          business,
        });
      });
  },

  getAllBusinesses: (req, res) => {
    Businesses
      // Find all businesses
      .all()
      // Promise returned
      .then((allBusinesses) => {
        // If no business found
        if (!allBusinesses) {
          return res.status(404).send({
            message: 'Business Not Found!',
          });
        }
        // Business(es) found!
        return res.status(200).json({
          message: 'Businesses found!',
          allBusinesses
        });
      });
  }
};

export default Business;
