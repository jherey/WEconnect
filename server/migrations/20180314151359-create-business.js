module.exports = {
  up: (queryInterface, Sequelize) => queryInterface.createTable('Businesses', {
    id: {
      allowNull: false,
      autoIncrement: true,
      primaryKey: true,
      type: Sequelize.INTEGER,
    },
    businessName: {
      type: Sequelize.STRING,
      allowNull: false,
      unique: true
    },
    website: {
      type: Sequelize.STRING
    },
    category: {
      type: Sequelize.STRING,
      allowNull: false
    },
    businessInfo: {
      type: Sequelize.TEXT
    },
    email: {
      type: Sequelize.STRING,
      allowNull: false,
      unique: true
    },
    businessImage: {
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
