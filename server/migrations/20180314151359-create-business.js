module.exports = {
	up: (queryInterface, Sequelize) => queryInterface.createTable('Businesses', {
		id: {
			allowNull: false,
			autoIncrement: true,
			primaryKey: true,
			type: Sequelize.INTEGER,
		},
		busname: {
			type: Sequelize.STRING,
			allowNull: false,
			unique: true
		},
		website: {
			type: Sequelize.STRING
		},
		telephone: {
			type: Sequelize.TEXT
		},
		category: {
			type: Sequelize.STRING,
			allowNull: false
		},
		businfo: {
			type: Sequelize.TEXT
		},
		email: {
			type: Sequelize.STRING,
			allowNull: false,
			unique: true
		},
		busimage: {
			type: Sequelize.STRING
		},
		address: {
			type: Sequelize.STRING
		},
		location: {
			type: Sequelize.STRING,
			allowNull: false
		},
		userId: {
			type: Sequelize.INTEGER,
			onDelete: 'CASCADE',
			references: {
				model: 'Users',
				key: 'id',
				as: 'userId',
			},
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
	down: queryInterface => queryInterface.dropTable('Businesses')
};
