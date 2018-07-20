import jwt from 'jsonwebtoken';

export const props = {};

export const signupState = {
  firstname: '',
  lastname: '',
  username: '',
  sex: '',
  email: '',
  profilepic: '',
  password: '',
  confirmPassword: '',
  errors: [],
  uploading: false
};

export const userData = {
  id: 1,
  firstname: 'jeremiah',
  lastname: 'olufayo',
  sex: 'male',
  username: 'jherey',
  email: 'olufayo@yahoo.com'
};

export const user = {
  username: 'jerry',
  profilepic: 'jeremiah.jpg'
};

export const createBusinessError = ['Business name is required'];

export const businessUpdate = {
  successMessage: 'Business Update Successful',
  errorMessage: ['Email is required']
};

export const businessDelete = {
  deleteSuccess: 'Business Successfully Deleted!'
};

export const imageUploadResponse = {
  bytes: 58762,
  created_at: '2018-01-15T18:30:03Z',
  etag: '5e60d0b985e448a2d19dd7b3183448d3',
  format: 'jpg',
  height: 300,
  original_filename: '171761',
  placeholder: false,
  public_id: 'gbjvdghvdvhgvhgdvhd',
  resource_type: 'image',
  secure_url: 'https://res.cloudinary.com/diiceprhy/image/upload/v1530951573/pkpzv994jtmkxjiggldg.jpg',
  signature: 'ec119873ac7388df8ab37c0c7e2a23c0a6107a14',
  tags: [],
  url: 'https://api.cloudinary.com/v1_1/diiceprhy/image/upload/v1530951573/pkpzv994jtmkxjiggldg.jpg',
  type: 'upload',
  version: 1516041003,
  width: 300
};

export const uploadImage = {
  name: 'jerry.jpg',
  lastModified: 1515159157000,
  size: 226679,
  type: 'image/jpg',
  webkitRelativePath: ''
};

export const imageUploadError = 'Image upload failed, try again!';

export const authError = {
  error: ['Username is required'],
  signinError: ['Username/Password Incorrect']
};

export const token = jwt.sign(userData, 'secretKeyhey');

export const businessData = {
  message: 'Business created successfully',
  business: {
    id: 30,
    businessName: 'andela23',
    website: 'www.andela.com',
    businessInfo: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur.',
    address: null,
    email: 'andela23@gmail.com',
    businessImage: 'null',
    location: 'nigeria',
    userId: 2,
    updatedAt: '2018-06-23T10:20:30.073Z',
    createdAt: '2018-06-23T10:20:30.073Z'
  }
};

export const updatedBusiness = {
  message: 'Business Update Successful',
  updatedBusiness: {
    id: 30,
    businessName: 'andela',
    website: 'www.andelanig.com',
    businessInfo: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur.',
    address: null,
    email: 'andelanig@gmail.com',
    businessImage: null,
    location: 'nigeria',
    userId: 2,
    updatedAt: '2018-06-23T10:20:30.073Z',
    createdAt: '2018-06-23T10:20:30.073Z'
  }
};

export const allBusinesses = {
  message: 'Businesses found!',
  allBusinesses: {
    count: 1,
    rows: [{ ...businessData.business }]
  },
  searchWord: null,
  searchType: null,
  pageDetails: {
    count: 1,
    totalPages: 1,
    currentPage: 1
  }
};

export const userBusinesses = {
  message: 'Businesses Found',
  businesses: [{ ...businessData.business }]
};

export const review = {
  message: 'Review successfully added',
  createdReview: {
    id: 1,
    review: 'Very good company',
    userId: 1,
    star: 4,
    businessId: 1
  }
};

export const updatedReview = {
  id: 1,
  review: 'Very good company',
  userId: 1,
  star: 4,
  businessId: 1
};

export const newReview = {
  review: 'I do not like them',
  star: 1
};

export const reviews = {
  message: 'Reviews Found!',
  reviews: [{ ...review.createdReview }],
  averageRating: 4
};
