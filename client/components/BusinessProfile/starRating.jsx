import React from 'react';

const rating = (star) => {
  const starRating = [];
  for (let i = 0; i < star; i += 1) {
    starRating.push(i);
  }
  return starRating.map((stars, i) => <i key={i} className="fa fa-star" />);
};

export default rating;
