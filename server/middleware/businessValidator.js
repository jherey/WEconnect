import models from '../models/index';

const businesses = models.Business;

/**
 * @class validateUsers
 */
class validateBusinesses {
	/**
   * @returns {Object} query
   * @param {*} req
   * @param {*} res
	 * @param {*} next
   */
	static query(req, res, next) {
		const { location, category } = req.query;
		//	If there's a location query string
		if (location) {
			businesses
				//	Find by location
				.findAll({
					where: {
						location
					}
				})
				.then((business) => {
					//	If no businesses found, return error
					if (!business.length) {
						return res.status(404).send({
							message: 'No business found for this location!',
						});
					}
					//	If business found, return business found
					return res.status(200).json({
						message: 'Business Found!',
						business
					});
				})
				//	Catch error
				.catch(() => res.status(500).json({
					message: 'Some error occured'
				}));
		}
		if (category) {
			businesses
				//	Find by category
				.findAll({
					where: {
						category
					}
				})
				.then((business) => {
					//	If no businesses found, return error
					if (!business.length) {
						return res.status(404).send({
							message: 'No business found for this category!',
						});
					}
					//	If business found, return business found
					return res.status(200).json({
						message: 'Business Found!',
						business
					});
				})
				//	Catch error
				.catch(() => res.status(500).json({
					message: 'Some error occured'
				}));
		}

		next();
	}

	/**
   * @returns {Object} Register Business
   * @param {*} req
   * @param {*} res
	 * @param {*} next
   */
	static registerBusiness(req, res, next) {
		req.check('busname', 'Business name is required').notEmpty();
		req.check('category', 'Category is required').notEmpty();
		req.check('location', 'Location is required').notEmpty();

		const errors = req.validationErrors();
		if (errors) {
			res.status(400).json({
				message: errors[0],
				error: true
			});
		}

		next();
	}

	/**
 * @returns {Object} Verify Token
 * @param {*} req
 * @param {*} res
 * @param {*} next
 */
	static verifyToken(req, res, next) {
		// Get auth header value
		const bearerHeader = req.headers.authorization;
		// Check if bearer is undefined
		if (typeof bearerHeader !== 'undefined') {
			req.token = bearerHeader;

			next();
		} else {
			// Forbidden
			res.status(403).json({
				message: 'Add token to header',
				error: true
			});
		}
	}
}

export default validateBusinesses;
