import bcrypt, { hashSync } from 'bcrypt';
import jwt from 'jsonwebtoken';
import models from '../models/index';

const secret = process.env.secretKey;
// Users model
const { User } = models;

const Users = {
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
        message: 'Passwords do not match',
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
            message: 'Username/Password Incorrect'
          });
      })
      .catch(error => res.status(400)
        .json({
          message: error.errors[0].message
        }));
  }
};

export default Users;
