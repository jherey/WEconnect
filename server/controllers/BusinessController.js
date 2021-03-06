import { Op } from 'sequelize';
import models from '../models/index';

// Users model
const Users = models.User;
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
    // Change business name to small letter
    const name = businessName.toLowerCase();
    // Create the business
    Businesses
      .create({
        businessName: name,
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
          errors: [error.errors[0].message]
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
    // Change business name to small letter
    const name = businessName.toLowerCase();
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
        // Find business only if authorized
        Businesses
          .findOne({
            where: {
              id: businessId,
              userId: authData.id
            }
          })
          .then((authorizedBusiness) => {
            // Different user tries to update the business
            if (!authorizedBusiness) {
              return res.status(404).json({
                message: 'Oops! You cannot update this business',
                error: true
              });
            }
            // Update the business
            authorizedBusiness
              .update({
                businessName: name,
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
                updatedBusiness
              }))
              // Catch errors
              .catch(error => res.status(400)
                .json(error.errors[0].message));
          });
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
        business
          // Delete the business
          .destroy()
          // Success message
          .then(deletedBusiness => res.status(200).json({
            message: 'Business Successfully Deleted!',
            deletedBusiness
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

  getAUserBusiness: (req, res) => {
    const { userId } = req.params;
    Businesses
      // Find all businesses owned by a user
      .findAll({
        where: {
          userId
        }
      })
      // Promise returned
      .then((businesses) => {
        // No business found
        if (!businesses) {
          return res.status(404).json({
            message: 'No Business Found!'
          });
        }
        // Return businesses found
        return res.status(200).json({
          message: 'Businesses Found',
          businesses
        });
      });
  },

  searchQuery: (req) => {
    const { name, location, category } = req.query;

    const searchParams = {};

    if (name) {
      searchParams.businessName = { [Op.iLike]: `%${name}%` };
    }
    if (location) {
      searchParams.location = { [Op.iLike]: `%${location}%` };
    }
    if (category) {
      searchParams.category = { [Op.iLike]: `%${category}%` };
    }

    let searchDetails;
    if (Object.keys(searchParams).length < 1) {
      searchDetails = {};
    } else {
      searchDetails = { where: { [Op.or]: searchParams } };
    }
    return searchDetails;
  },

  getAllBusinesses: (req, res) => {
    const search = Business.searchQuery(req);

    const { pageNum } = req.query || 1;
    const limit = 8;
    const pageNumber = Number(pageNum);
    const offset = limit * (pageNumber - 1);
    const currentPage = parseInt(pageNum, 10);
    const { name, location, category } = req.query;
    Businesses
    // Find all businesses
      .findAndCountAll({
        ...search,
        include: [
          {
            model: Users,
            attributes: ['username']
          }
        ],
        order: [['updatedAt', 'DESC']],
        limit,
        offset
      })
      // Promise returned
      .then((allBusinesses) => {
        const pages = Math.ceil(allBusinesses.count / limit);
        // If no business found
        if (allBusinesses.count < 0) {
          return res.status(404).send({
            message: 'Business Not Found!',
          });
        } else if (pageNumber > pages) {
          return res.status(200).send({
            message: 'No business found',
            allBusinesses,
            searchWord: name || location || category || null,
            pageDetails: {
              count: allBusinesses.count,
              totalPages: pages,
              currentPage
            }
          });
        }
        let type;
        if (req.query.name) {
          type = 'name';
        }
        if (req.query.location) {
          type = 'location';
        }
        if (req.query.category) {
          type = 'category';
        }
        const businessDetails = {
          allBusinesses,
          searchWord: name || location || category || null,
          searchType: type || null,
          pageDetails: {
            count: allBusinesses.count,
            totalPages: pages,
            currentPage
          }
        };
        // Business(es) found!
        return res.status(200).json(Object.assign({
          message: 'Businesses found!'
        }, businessDetails));
      })
      .catch(err => res.status(400).json({
        error: err
      }));
  }
};

export default Business;
