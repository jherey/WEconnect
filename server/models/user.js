module.exports = (sequelize, DataTypes) => {
	const User = sequelize.define('User', {
		firstname: {
			type: DataTypes.STRING,
			allowNull: false
		},
		lastname: {
			type: DataTypes.STRING,
			allowNull: false
		},
		sex: {
			type: DataTypes.ENUM,
			values: [
				'male',
				'female',
			]
		},
		username: {
			type: DataTypes.STRING,
			allowNull: false
		},
		password: {
			type: DataTypes.STRING,
			allowNull: false
		}
	}, {});
	User.associate = (models) => {
		// associations can be defined here
	};
	return User;
};
