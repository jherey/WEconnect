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
		email: {
			type: DataTypes.STRING,
			allowNull: false,
			unique: true
		},
		profilepic: {
			type: DataTypes.STRING
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
	});
	User.associate = (models) => {
		User.hasMany(models.Business, {
			foreignKey: 'userId',
			onDelete: 'CASCADE'
		});
	};
	return User;
};
