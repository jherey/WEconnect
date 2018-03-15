const businessModel = (sequelize, DataTypes) => {
	const Business = sequelize.define('Business', {
		busname: {
			type: DataTypes.STRING,
			allowNull: false,
			unique: {
				args: true,
				msg: 'A business with this name exist',
			},
			validate: {
				notEmpty: {
					args: true,
					msg: 'Business Field Required!',
				},
				is: {
					args: /([a-zA-Z0-9])+/,
					msg: 'Business name can contain only alphabets and numbers',
				},
				len: {
					args: [3, 70],
					msg: 'Business name should be longer than 3 words and less than 70 words',
				},
			},
		},
		website: {
			type: DataTypes.STRING
		},
		telephone: {
			type: DataTypes.TEXT
		},
		category: {
			type: DataTypes.STRING,
			allowNull: false
		},
		businfo: {
			type: DataTypes.TEXT
		},
		email: {
			type: DataTypes.STRING,
			allowNull: false,
			unique: true,
		},
		busimage: {
			type: DataTypes.STRING
		},
		location: {
			type: DataTypes.STRING,
			allowNull: false,
			validate: {
				notEmpty: {
					args: true,
					msg: 'Location Field Required!',
				},
				is: {
					args: /([a-zA-Z0-9])+/,
					msg: 'Location can contain alphabets and numbers',
				},
				len: {
					args: [3, 20],
					msg: 'Name should be longer than 3 words and less than 40 words',
				},
			},
		},
	});
	Business.associate = (models) => {
		Business.hasMany(models.Review, {
			foreignKey: 'businessId',
			as: 'review',
		});

		Business.belongsTo(models.User, {
			foreignKey: 'userId',
			onDelete: 'CASCADE',
		});
	};
	return Business;
};

export default businessModel;
