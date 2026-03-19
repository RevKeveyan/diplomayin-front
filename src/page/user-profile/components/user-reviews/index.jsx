import React, { useEffect, useState } from "react";
import { ListGroup, Spinner } from "react-bootstrap";
import ReactStars from "react-rating-stars-component";
import './style.scss';
import useReviewService from "../../../../service/reviewService";

const UserReviews = () => {
  const [reviews, setReviews] = useState([]);
  const [loading, setLoading] = useState(false);
  const { getReviewsBySeller } = useReviewService();

  useEffect(() => {
    getReviewsBySeller(setReviews)
  }, []);


  if (loading) {
    return <Spinner animation="border" className="d-block mx-auto" />;
  }

  return (
    <ListGroup variant="flush">
      {reviews.length > 0 ? (
        reviews.map((review) => (
          <ListGroup.Item key={review._id}>
            <h6>{review.user.firstName}</h6>
            <ReactStars count={5} value={review.rating} size={20} edit={false} isHalf={true} activeColor="#f8d64e" />
            <p>{review.comment}</p>
            <small className="text-muted">Reviewed on {new Date(review.createdAt).toLocaleDateString()}</small>
          </ListGroup.Item>
        ))
      ) : (
        <p className="text-center text-muted">No reviews yet.</p>
      )}
    </ListGroup>
  );
};

export default UserReviews;
