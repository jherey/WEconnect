module.exports = {
	up: (queryInterface, Sequelize) =>
		queryInterface.createTable('Users', {
			id: {
				allowNull: false,
				primaryKey: true,
				type: Sequelize.UUID,
				defaultValue: Sequelize.UUIDV4
			},
			firstname: {
				type: Sequelize.STRING
			},
			lastname: {
				type: Sequelize.STRING
			},
			email: {
				type: Sequelize.STRING,
				unique: true
			},
			username: {
				type: Sequelize.STRING,
				allowNull: false
			},
			password: {
				type: Sequelize.STRING,
				allowNull: false
			},
			profilepic: {
				type: Sequelize.STRING
			},
			sex: {
				type: Sequelize.ENUM,
				values: [
					'male',
					'female',
				],
				allowNull: false
			},
			createdAt: {
				allowNull: false,
				type: Sequelize.DATE
			},
			updatedAt: {
				allowNull: false,
				type: Sequelize.DATE
			}
		}),
	down: queryInterface => queryInterface.dropTable('Users')
};
