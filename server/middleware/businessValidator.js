import business from '../models/business';

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
		if (errors) {
			return res.status(400).json({
				message: errors[0].msg,
				error: true
			});
		}

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
		if (errors) {
			return res.status(400).json({
				message: errors[0].msg,
				error: true
			});
		}

		next();
	}
}

export default validateBusinesses;
