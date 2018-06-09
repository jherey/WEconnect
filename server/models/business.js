const businessModel = (sequelize, DataTypes) => {
  const Business = sequelize.define('Business', {
    businessName: {
      type: DataTypes.STRING,
      allowNull: false,
      unique: {
        args: true,
        msg: 'A business with this name exist',
      },
      validate: {
        notEmpty: {
          args: true,
          msg: 'Business Name is Required!',
        },
        is: {
          args: /([a-zA-Z0-9])+/,
          msg: 'Business name can contain only alphabets and numbers',
        },
        len: {
          args: [3, 70],
          msg: 'Business name should be longer than 3 words and less than 70 words',
        },
      },
    },
    website: {
      type: DataTypes.STRING
    },
    category: {
      type: DataTypes.STRING,
      allowNull: false
    },
    businessInfo: {
      type: DataTypes.TEXT,
      allowNull: false,
      validate: {
        notEmpty: {
          args: true,
          msg: 'Business Name is Required!',
        },
        len: {
          args: [30],
          msg: 'Business description should be longer than 30 words',
        },
      },
    },
    email: {
      type: DataTypes.STRING,
      allowNull: false,
      unique: true,
    },
    businessImage: {
      type: DataTypes.STRING
    },
    address: {
      type: DataTypes.STRING
    },
    location: {
      type: DataTypes.STRING,
      allowNull: false,
      validate: {
        notEmpty: {
          args: true,
          msg: 'Location Field Required!',
        },
        is: {
          args: /([a-zA-Z0-9])+/,
          msg: 'Location can contain alphabets and numbers',
        },
        len: {
          args: [3, 20],
          msg: 'Name should be longer than 3 words and less than 40 words',
        },
      },
    },
  });
  Business.associate = (models) => {
    Business.hasMany(models.Review, {
      foreignKey: 'businessId',
      as: 'review',
    });

    Business.belongsTo(models.User, {
      foreignKey: 'userId',
      onDelete: 'CASCADE',
    });
  };
  return Business;
};

export default businessModel;
