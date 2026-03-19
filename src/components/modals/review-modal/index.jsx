import React, { useEffect } from "react";
import { Modal, Button, Form } from "react-bootstrap";
import ReactStars from "react-rating-stars-component";
import { useForm } from "react-hook-form";
import useReviewService from "../../../service/reviewService";

const ReviewModal = ({ show, onHide, product }) => {
  const { addReview } = useReviewService();
  const {
    register,
    handleSubmit,
    watch,
    setValue,
    formState: { errors },
  } = useForm({
    defaultValues: {
      rating: 5,
      comment: "",
    },
  });

  const rating = watch("rating");

  const onSubmit = async (data) => {
    if (!product) return;

    const reviewData = {
      productId: product._id,
      rating: data.rating,
      comment: data.comment.trim(),
    };

    await addReview(reviewData);
    onHide();
  };


  if (!show) return null;

  return (
    <Modal show={show} onHide={onHide} centered>
      <Modal.Header closeButton>
        <Modal.Title>Leave a Review</Modal.Title>
      </Modal.Header>
      <Modal.Body>
        <ReactStars
          count={5}
          value={rating}
          size={30}
          activeColor="#ffd700"
          onChange={(newRating) => setValue("rating", newRating)}
        />
        <Form onSubmit={handleSubmit(onSubmit)}>
          <Form.Group className="mt-3">
            <Form.Label>Write your review</Form.Label>
            <Form.Control
              as="textarea"
              rows={3}
              placeholder="Write about your experience with this product..."
              {...register("comment", { required: "Comment is required" })}
            />
            {errors.comment && (
              <small className="text-danger">{errors.comment.message}</small>
            )}
          </Form.Group>
        </Form>
      </Modal.Body>
      <Modal.Footer>
        <Button variant="secondary" onClick={onHide}>
          Cancel
        </Button>
        <Button variant="success" onClick={handleSubmit(onSubmit)}>
          Submit Review
        </Button>
      </Modal.Footer>
    </Modal>
  );
};

export default ReviewModal;
