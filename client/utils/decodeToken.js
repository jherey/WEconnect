import jwt from 'jsonwebtoken';

const decodeToken = () => {
  const token = localStorage.getItem('token');
  if (token) {
    return jwt.verify(token, process.env.secretKey, ((error) => {
      if (!error) {
        return true;
      }
      return false;
    }));
  }
};
export default decodeToken;
