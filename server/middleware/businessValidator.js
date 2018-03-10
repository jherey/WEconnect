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
	static query(req, res, next) {
		const { location, category } = req.query;
		const filter = [];
		if (location || category) {
			if (location) {
				for (let i = 0; i < business.length; i += 1) {
					if (location.toLowerCase() === business[i].location.toLowerCase()) {
						filter.push(business[i]);
					}
				}
			}
			if (category) {
				for (let i = 0; i < business.length; i += 1) {
					if (category.toLowerCase() === business[i].category.toLowerCase()) {
						if (filter.length === 0) {
							filter.push(business[i]);
						} else {
							for (let j = 0; j < filter.length; j += 1) {
								if (business[i].id !== filter[j].id) {
									filter.push(business[i]);
								}
							}
						}
					}
				}
			}
			if (filter.length === 0) {
				return res.status(400).json({
					message: 'Search keyword doesn\'t esixt',
					error: true
				});
			}
			return res.json({
				found: filter,
				error: false
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
	static registerBusiness(req, res, next) {
		req.check('name', 'Name is required').notEmpty();
		req.check('address', 'Address is required').notEmpty();

		const errors = req.validationErrors();
		if (errors) {
			res.status(400).json({
				message: errors[0],
				error: true
			});
		}

		next();
	}
}

export default validateBusinesses;
