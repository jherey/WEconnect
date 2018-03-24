import models from '../models/index';

//	Business model
const Businesses = models.Business;

const Business = {
	// Method to register business
	registerBusiness: (req, res) => {
		const {
			busname,
			website,
			telephone,
			category,
			address,
			businfo,
			email,
			busimage,
			location
		} = req.body;
		//	Change location and category to lowercase
		const loc = location.toLowerCase();
		const cat = category.toLowerCase();
		const { authData } = req;
		//	Create the business
		Businesses
			.create({
				busname,
				website,
				telephone,
				category: cat,
				businfo,
				address,
				email,
				busimage,
				location: loc,
				userId: authData.id	// Get the id of the user from the authData
			})
			//	Success message
			.then(business => res.status(201).json({
				message: 'Business created successfully',
				business,
				authData
			}));
	},

	updateBusiness: (req, res) => {
		const {
			busname, website, telephone, category, businfo, email, busimage, location
		} = req.body;
		//	Change location and category to lowercase
		const loc = location.toLowerCase();
		const cat = category.toLowerCase();
		const { businessId } = req.params;
		const { authData } = req;
		//	Find the business
		Businesses
			.findOne({
				where: {
					id: businessId,
					userId: authData.id
				}
			})
			.then((business) => {
				//	No business found or a different user tries to update the business
				if (!business) {
					return res.status(404).send({
						message: 'You cannot update this business!',
					});
				}
				//	Update the business
				business
					.update({
						busname,
						website,
						telephone,
						category: cat,
						businfo,
						email,
						busimage,
						location: loc
					})
					//	Success message
					.then(updatedBusiness => res.status(200).json({
						message: 'Business Update Successful',
						updatedBusiness,
					}));
			});
	},

	removeBusiness: (req, res) => {
		const { businessId } = req.params;
		const { authData } = req;
		//	Find the business to be deleted
		Businesses
			.findOne({
				where: {
					id: businessId,
					userId: authData.id
				}
			})
			.then((business) => {
				//	If no business is found
				if (!business) {
					//	Error message
					return res.status(404).send({
						message: 'You cannot delete this business!',
					});
				}
				return business
				//	Delete the business
					.destroy()
				//	Success message
					.then(res.status(200).json({
						message: 'Business Successfully Deleted!'
					}));
			});
	},

	getBusiness: (req, res) => {
		const { businessId } = req.params;
		Businesses
			//	FInd one business by the businessId from the user
			.findById(businessId)
			.then((business) => {
				//	If no business found
				if (!business) {
					return res.status(404).send({
						message: 'Business Not Found!',
					});
				}
				//	Business found!
				return res.status(200).json({
					message: 'Business Found',
					business,
				});
			});
	},

	getAllBusinesses: (req, res) => {
		Businesses
			//	Find all businesses
			.all()
			//	Promise returned
			.then((business) => {
				//	If no business found
				if (!business) {
					return res.status(404).send({
						message: 'Business Not Found!',
					});
				}
				//	Business(es) found!
				return res.status(200).json({
					message: 'Businesses found!',
					business
				});
			});
	}
};

export default Business;
