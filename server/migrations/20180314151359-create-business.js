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
			validate: {
				len: {
					args: [3, 50],
					msg: 'Your business name must be between 3 and 70 characters.  Please try again.'
				}
			}
		},
		website: {
			type: Sequelize.STRING
		},
		telephone: {
			type: Sequelize.BIGINT
		},
		category: {
			type: Sequelize.STRING,
			allowNull: false
		},
		businfo: {
			type: Sequelize.TEXT
		},
		email: {
			type: Sequelize.STRING
		},
		busimage: {
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
