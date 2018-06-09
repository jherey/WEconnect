import jwt from 'jsonwebtoken';
import models from '../models/index';

// Review model
const Reviews = models.Review;
// Business model
const Businesses = models.Business;
const Users = models.User;

const Review = {
  // Method to register a new user
  addReview: (req, res) => {
    const { businessId } = req.params;
    const { review } = req.body;
    const { authData } = req;
    if (review.trim() === '') {
      return res.status(400).json({
        message: 'Please write a review',
        error: true
      });
    }
    const decoded = jwt.decode(req.token);
    Businesses
      // Find business by id
      .findById(businessId)
      .then((business) => {
        // If no business found, return error
        if (business === null) {
          return res.status(404).json({
            message: 'Business does not exist'
          });
        }
        Reviews
          // Add a new review
          .create({
            review,
            userId: authData.id,
            businessId,
            username: decoded.username
          })
          // Successfully added
          .then((createdReview) => {
            return res.status(201).json({
              message: 'Review successfully added',
              createdReview
            });
          });
      });
  },

  getAllReviews: (req, res) => {
    const { businessId } = req.params;
    Reviews
      // Find all reviews of a business
      .findAll({
        where: {
          businessId
        },
        include: [{
          model: Users,
          as: 'reviewer',
          attributes: ['profilepic']
        }]
      })
      .then((reviews) => {
        // If no reviews found
        if (!reviews.length) {
          return res.status(200).send({
            message: 'No reviews for this business!',
            reviews: []
          });
        }
        // If reviews found
        return res.status(200).json({
          message: 'Reviews Found!',
          reviews
        });
      });
  }
};

export default Review;
