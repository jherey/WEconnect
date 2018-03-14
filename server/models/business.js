module.exports = (sequelize, DataTypes) => {
	const Business = sequelize.define('Business', {
		busname: {
			type: DataTypes.STRING,
			allowNull: false,
			validate: {
				len: {
					args: [3, 50],
					msg: 'Your business name must be between 3 and 70 characters.  Please try again.'
				}
			}
		},
		website: {
			type: DataTypes.STRING
		},
		telephone: {
			type: DataTypes.BIGINT
		},
		category: {
			type: DataTypes.STRING,
			allowNull: false
		},
		businfo: {
			type: DataTypes.TEXT
		},
		email: {
			type: DataTypes.STRING
		},
		busimage: {
			type: DataTypes.STRING
		},
		location: {
			type: DataTypes.STRING,
			allowNull: false
		},
	}, {});
	Business.associate = (models) => {
		Business.belongsTo(models.User, {
			foreignKey: 'userId',
			onDelete: 'CASCADE'
		});
	};
	return Business;
};
