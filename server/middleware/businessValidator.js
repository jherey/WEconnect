import business from '../models/business';

const errorMessage = (res, message) => res.status(400).json({
	message,
	error: true
});

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
	static queryLocation(req, res, next) {
		const { location } = req.query;
		const loc = [];
		if (location) {
			for (let i = 0; i < business.length; i += 1) {
				if (location.toLowerCase() === business[i].location.toLowerCase()) {
					loc.push(business[i]);
				}
			}
			return res.json({
				found_location: loc
			});
		}

		const errors = req.validationErrors();
		if (errors) { return errorMessage(res, errors[0].msg); }

		next();
	}

	/**
   * @returns {Object} query
   * @param {*} req
   * @param {*} res
	 * @param {*} next
   */
	static queryCategory(req, res, next) {
		const { category } = req.query;
		const cat = [];
		if (category) {
			for (let i = 0; i < business.length; i += 1) {
				if (category.toLowerCase() === business[i].category.toLowerCase()) {
					cat.push(business[i]);
				}
			}
			return res.json({
				found_category: cat
			});
		}

		const errors = req.validationErrors();
		if (errors) { return errorMessage(res, errors[0].msg); }

		next();
	}

	/**
   * @returns {Object} query
   * @param {*} req
   * @param {*} res
	 * @param {*} next
   */
	static registerBusiness(req, res, next) {
		req.check('name', 'Name is required').notEmpty();
		req.check('address', 'Address is required').notEmpty();

		const errors = req.validationErrors();
		if (errors) { return errorMessage(res, errors[0].msg); }

		next();
	}
}

export default validateBusinesses;
