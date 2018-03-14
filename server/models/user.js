module.exports = (sequelize, DataTypes) => {
	const User = sequelize.define('User', {
		id: {
			allowNull: false,
			primaryKey: true,
			type: DataTypes.UUID,
			defaultValue: DataTypes.UUIDV4
		},
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
	}, {});
	User.associate = (models) => {
		// associations can be defined here
		User.hasMany(models.business, {
			foreignKey: 'userId',
			onDelete: 'CASCADE'
		});
	};
	return User;
};
