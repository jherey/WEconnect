import React from "react";
const rating = star => {
  const starRating = [];
  for (let i = 0; i < star; i++) {
    starRating.push(i);
  }
  return starRating.map((star, i) => <i key={i} className="fa fa-star" />);
};

export default rating;