const reviewModel = (sequelize, DataTypes) => {
  const Review = sequelize.define('Review', {
    review: {
      type: DataTypes.TEXT,
      allowNull: false
    },
    userId: {
      type: DataTypes.INTEGER,
      // allowNull: false,
      validate: {
        notEmpty: {
          args: true,
          msg: 'UserId Field Required!',
        },
      },
      onDelete: 'CASCADE',
      references: {
        model: 'User',
        Key: 'id',
        as: 'userId',
      },
    },
    username: {
      type: DataTypes.STRING,
      validate: {
        notEmpty: {
          args: true,
          msg: 'Please sign in!',
        },
      },
    },
    businessId: {
      type: DataTypes.INTEGER,
      allowNull: false,
      validate: {
        notEmpty: {
          args: true,
          msg: 'BusinessId Field Required!',
        },
      },
      onDelete: 'CASCADE',
      references: {
        model: 'Business',
        Key: 'id',
        as: 'businessId',
      },
    },
  });
  Review.associate = (models) => {
    Review.belongsTo(models.Business, {
      foreignKey: 'businessId',
      onDelete: 'CASCADE',
    });

    Review.belongsTo(models.User, {
      foreignKey: 'userId',
      as: 'reviewer'
    });
  };
  return Review;
};

export default reviewModel;
