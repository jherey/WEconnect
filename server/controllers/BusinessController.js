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
    // Change location and category to lowercase
    const loc = location.toLowerCase();
    const cat = category.toLowerCase();
    const { authData } = req;
    // Create the business
    Businesses
      .create({
        businessName,
        website,
        category: cat,
        businessInfo,
        address,
        email,
        businessImage,
        location: loc,
        userId: authData.id // Get the id of the user from the authData
      })
    // Success message
      .then(business => res.status(201).json({
        message: 'Business created successfully',
        business,
        authData
      }))
      .catch(error => res.status(400)
        .json(error.errors[0].message));
  },

  updateBusiness: (req, res) => {
    const {
      businessName, website, category, businessInfo, email, businessImage, location
    } = req.body;
    // Change location and category to lowercase
    const loc = location.toLowerCase();
    const cat = category.toLowerCase();
    const { businessId } = req.params;
    const { authData } = req;
    // Find the business
    Businesses
      .findOne({
        where: {
          id: businessId,
          userId: authData.id
        }
      })
      .then((business) => {
        // No business found or a different user tries to update the business
        if (!business) {
          return res.status(404).send({
            message: 'You cannot update this business!',
          });
        }
        // Update the business
        business
          .update({
            businessName,
            website,
            category: cat,
            businessInfo,
            email,
            businessImage,
            location: loc
          })
        // Success message
          .then(updatedBusiness => res.status(200).json({
            message: 'Business Update Successful',
            updatedBusiness,
          }))
          .catch(error => res.status(400)
            .json(error.errors[0].message));
      });
  },

  removeBusiness: (req, res) => {
    const { businessId } = req.params;
    const { authData } = req;
    // Find the business to be deleted
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
          return res.status(404).send({
            message: 'Business does not exist!',
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
