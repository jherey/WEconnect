const userModel = (sequelize, DataTypes) => {
  const User = sequelize.define('User', {
    firstname: {
      type: DataTypes.STRING,
      allowNull: false,
      validate: {
        notEmpty: {
          args: true,
          msg: 'Firstname cannot be empty',
        },
        is: {
          args: ['^[a-z]+$', 'i'],
          msg: 'Firstname can only contain letters',
        },
        len: {
          args: [3, 30],
          msg: 'Firstname should be more than two characters',
        }
      }
    },
    lastname: {
      type: DataTypes.STRING,
      allowNull: false,
      validate: {
        notEmpty: {
          args: true,
          msg: 'Lastname cannot be empty',
        },
        is: {
          args: ['^[a-z]+$', 'i'],
          msg: 'Lastname can only contain letters and no space',
        },
        len: {
          args: [3, 30],
          msg: 'Lastname should be more than two characters',
        }
      }
    },
    email: {
      type: DataTypes.STRING,
      allowNull: false,
      unique: {
        args: true,
        msg: 'Email address taken',
      },
      validate: {
        notEmpty: {
          args: true,
          msg: 'Email field cannot be empty',
        },
        isEmail: {
          msg: 'Invalid email, Enter a valid email, like so: you@mail.com'
        }
      }
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
      allowNull: false,
      unique: {
        args: true,
        msg: 'Username already exists',
      },
      validate: {
        notEmpty: {
          args: true,
          msg: 'Username is required',
        },
        is: [/([a-zA-Z0-9])+/]
      }
    },
    password: {
      type: DataTypes.STRING,
      allowNull: false,
      validate: {
        notEmpty: {
          args: true,
          msg: 'Password is required',
        }
      }
    },
  });
  User.associate = (models) => {
    User.hasMany(models.Business, {
      foreignKey: 'userId',
      as: 'business',
    });
  };
  return User;
};

export default userModel;
