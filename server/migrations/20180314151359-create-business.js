module.exports = {
	up: (queryInterface, Sequelize) => queryInterface.createTable('Businesses', {
		id: {
			allowNull: false,
			primaryKey: true,
			type: Sequelize.UUID,
			defaultValue: Sequelize.UUIDV4
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
			type: Sequelize.UUID,
			onDelete: 'CASCADE',
			references: {
				model: 'Users',
				key: 'id'
			}
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
	down: (queryInterface, Sequelize) => queryInterface.dropTable('Businesses')
};
