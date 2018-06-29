import jwt from 'jsonwebtoken';
import models from '../models/index';

// Review model
const Reviews = models.Review;
// Business model
const Businesses = models.Business;
// User model
const Users = models.User;

const Review = {
  // Method to register a new user
  addReview: (req, res) => {
    const { businessId } = req.params;
    const { review, starRating } = req.body;
    const { authData } = req;
    if (review.trim() === '') {
      return res.status(400).json({
        message: 'Please write a review',
        error: true
      });
    }
    if (starRating < 1) {
      return res.status(400).json({
        message: 'Please give a valid rating',
        error: true
      });
    }
    const decoded = jwt.decode(req.token);
    Businesses
      // Find business by id
      .findById(businessId)
      .then((business) => {
        // If no business found, return error
        if (!business) {
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
            star: starRating,
            username: decoded.username
          })
          // Successfully added
          .then(createdReview => res.status(201).json({
            message: 'Review successfully added',
            createdReview
          }))
          // Error catch
          .catch(error => res.status(500).json({
            message: 'Internal Server Error',
            error
          }));
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
          attributes: ['profilepic', 'sex']
        }]
      })
      .then((reviews) => {
        // If no reviews found
        if (!reviews.length) {
          return res.status(200).send({
            message: 'No reviews for this business!',
            reviews: [],
            averageRating: 0
          });
        }
        const average = reviews.reduce((total, review) => total + review.star, 0) / reviews.length;
        const rating = Math.round(average);
        // If reviews found
        return res.status(200).json({
          message: 'Reviews Found!',
          reviews,
          averageRating: rating || 0
        });
      });
  }
};

export default Review;
