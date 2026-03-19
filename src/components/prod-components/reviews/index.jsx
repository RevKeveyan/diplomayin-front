import React, { useState } from "react";
import { Image } from "react-bootstrap";
import "./style.scss";
import ReviewStars from "./starts";

const ReviewsSection = ({ reviews, rating }) => {
  const [selectedReviewIndex, setSelectedReviewIndex] = useState(null);

  const toggleReview = (index) => {
    setSelectedReviewIndex(selectedReviewIndex === index ? null : index);
  };

  return (
    <div className="reviews-section mt-5">
      <h2 className="section-title">Customer Reviews</h2>
      <div className="row">
        <div className="col-md-6">
          <div className="rating-summary p-4 shadow-sm rounded">
            {[5, 4, 3, 2, 1].map((star) => {
              const starCount = reviews.filter((r) => Math.round(r.rating) === star).length;
              const percentage = (starCount / reviews.length) * 100 || 0;

              return (
                <div className="d-flex align-items-center mb-2" key={star}>
                  <span className="star-label">{star} star</span>
                  <div className="progress mx-2 flex-grow-1">
                    <div
                      className="progress-bar bg-warning"
                      role="progressbar"
                      style={{ width: `${percentage}%` }}
                    ></div>
                  </div>
                  <span>{starCount}</span>
                </div>
              );
            })}
          </div>
        </div>

        <div className="col-md-6">
          <div className="reviews-list shadow-sm rounded">
            {reviews.map((review, index) => (
              <div
                className={`review-card shadow-sm rounded p-3 mb-3 ${
                  selectedReviewIndex === index ? "active" : ""
                }`}
                key={index}
                onClick={() => toggleReview(index)}
              >
                <div className="d-flex align-items-center">
                  <Image
                    src={review.avatar}
                    roundedCircle
                    className="me-3 review-avatar"
                    alt={`${review.user.firstName}'s avatar`}
                  />
                  <div className="review-header flex-grow-1">
                    <strong className="review-user">{`${review.user.firstName} ${review.user.lastName}`}</strong>
                    <div className="review-stars">
                      <ReviewStars rating={review.rating} />
                    </div>
                  </div>
                  <span className={`toggle-arrow ${selectedReviewIndex === index ? "open" : ""}`}>
                    {selectedReviewIndex === index ? "▲" : "▼"}
                  </span>
                </div>

                {selectedReviewIndex === index && (
                  <div className="review-content mt-3">
                    <p className="review-text">{review.comment}</p>
                  </div>
                )}
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};

export default ReviewsSection;
