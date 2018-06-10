import bcrypt, { hashSync } from 'bcrypt';
import jwt from 'jsonwebtoken';
import models from '../models/index';

const secret = process.env.secretKey;
// Users model
const { User } = models;

const Users = {
  // Method to get all users
  getAllUsers: (req, res) => {
    User
      // Find all users
      .all()
      // Promise returned
      .then((users) => {
        // Loop through all users
        const allUsers = users.map(user => ({
          id: user.id,
          username: user.username,
          profilepic: user.profilepic
        }));
        // If no user found
        if (!users) {
          return res.status(404).send({
            message: 'No Users Found!',
          });
        }
        // User(es) found!
        return res.status(200).json({
          message: 'Users found!',
          allUsers
        });
      });
  },

  // Method to register a new user
  registerUsers: (req, res) => {
    // Create new user and push to Database
    const {
      firstname,
      lastname,
      profilepic,
      sex,
      username,
      email,
      password,
      confirmPassword
    } = req.body;
    // Check if spaces exist in fields and trim
    if (username.trim() === '' || firstname.trim() === ''
      || sex.trim() === '' || lastname.trim() === ''
      || email.trim() === '' || password.trim() === '') {
      return res.status(400).json({
        message: 'Please fill in all fields',
        error: true
      });
    }
    if (password !== confirmPassword) {
      return res.status(400).json({
        errors: ['Passwords do not match'],
        error: true
      });
    }
    User
      .create({
        firstname,
        lastname,
        username,
        profilepic,
        email,
        sex,
        password: hashSync(password, 10)
      })
      .then((user) => {
        const userDetails = {
          id: user.id,
          username: user.username
        };
        // Assign token to user for six hours
        const token = jwt.sign(userDetails, secret, { expiresIn: '6h' });
        // Success message
        return res.status(201).json({
          message: 'Signed up successfully',
          token
        });
      })
      .catch(error => res.status(400)
        .json({
          message: error.errors[0].message
        }));
  },

  // Method to login
  loginUser: (req, res) => {
    const { username, password } = req.body;
    if (username.trim() === '' || password.trim() === '') {
      return res.status(400).json({
        message: 'Please fill in all fields',
        error: true
      });
    }
    // Find one user with username sent in the body
    User.findOne({ where: { username } })
      .then((user) => {
        // Compare inputed password with hashed password in the database
        if (user && bcrypt.compareSync(password, user.password)) {
          const userData = {
            id: user.id,
            username: user.username
          };
          // Assign token to user for six hours
          const token = jwt.sign(userData, secret, { expiresIn: '6h' });
          // Success message
          return res.status(200).json({
            message: 'User logged in successfully',
            token
          });
        }
        // Details mismatch
        return res.status(400)
          .json({
            errors: ['Username/Password Incorrect']
          });
      })
      .catch(error => res.status(400)
        .json({
          message: error.errors[0].message
        }));
  },

  updateUser: (req, res) => {
    const {
      firstname,
      lastname,
      profilepic,
      sex,
      username,
      email
    } = req.body;
    const { userId } = req.params;
    const { authData } = req;
    // Check if user exist
    User.findOne({
      where: {
        id: userId
      }
    })
      .then((user) => {
        if (!user) {
          return res.status(400).json({
            message: 'User does not exist',
            error: true
          });
        }
        // Find user only if authorized
        User
          .findOne({
            where: {
              id: userId,
              username: authData.username
            }
          })
          .then((authorizedUser) => {
            // Different user tries to update the user details
            if (!authorizedUser) {
              return res.status(400).json({
                message: 'Oops! You cannot update this user details',
                error: true
              });
            }
            // Update user details
            authorizedUser
              .update({
                firstname,
                lastname,
                profilepic,
                sex,
                username,
                email,
                password: authorizedUser.password
              })
              // Success message
              .then(updatedUser => res.status(200).json({
                message: 'User Details Updated Successfully',
                updatedUser,
              }))
              // Catch errors
              .catch(error => res.status(400)
                .json({ message: error.errors[0].message }));
          });
      });
  },

  getAUser: (req, res) => {
    const { userId } = req.params;
    User
      // FInd one user by the userId from the url
      .findById(userId)
      .then((user) => {
        // If no user found
        if (!user) {
          return res.status(404).send({
            message: 'No User Found!',
          });
        }
        // User found!
        const userData = {
          id: user.id,
          firstname: user.firstname,
          lastname: user.lastname,
          username: user.username,
          sex: user.sex,
          profilepic: user.profilepic,
          createdAt: user.createdAt
        };
        return res.status(200).json({
          message: 'User Found',
          userData,
        });
      });
  },
};

export default Users;
