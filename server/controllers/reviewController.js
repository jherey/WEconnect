import jwt from 'jsonwebtoken';
import models from '../models/index';

//	Secret key
const secret = process.env.secretKey;
//	Review model
const reviews = models.Review;
//	Business model
const businesses = models.Business;

/**
 * @class review
 */
class Review {
	/**
   * {Object} addReview
   * @param {*} req
   * @param {*} res
	 * @returns {json} json
   */
	static addReview(req, res) {
		const { businessId } = req.params;
		const { review, userId } = req.body;
		//	Verify if user is logged in
		jwt.verify(req.token, secret, (err, authData) => {
			//	If there's a mismatch
			if (err) {
				res.status(403).json({
					message: 'Token unmatch'
				});
			} else {
				businesses
				//	Find business by id
					.findById(businessId)
					.then((business) => {
						//	If no business found, return error
						if (business === null) {
							return res.status(404).json({
								message: 'Business does not exist'
							});
						}
					});
				reviews
				//	Add a new review
					.create({
						review,
						userId,
						businessId
					})
				//	Successfully added
					.then((rev) => {
						res.status(201).json({
							message: 'Review successfully added',
							rev,
							authData
						});
					});
			}
		});
	}

	/**
   * {Object} getAllReviews
   * @param {*} req
   * @param {*} res
	 * @returns {json} json
   */
	static getAllReviews(req, res) {
		const { businessId } = req.params;
		reviews
			//	Find all reviews of a business
			.findAll({
				where: {
					businessId
				}
			})
			.then((review) => {
				//	If no reviews found
				if (!review.length) {
					return res.status(404).send({
						message: 'No reviews for this business!',
					});
				}
				//	If reviews found
				return res.status(200).json({
					message: 'Reviews Found!',
					review
				});
			});
	}
}

export default Review;
