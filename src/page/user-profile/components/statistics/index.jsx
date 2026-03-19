import React, { useEffect, useState } from "react";
import {
  Container,
  Card,
  Row,
  Col,
  ProgressBar,
  Button,
  Modal,
} from "react-bootstrap";
import ReactStars from "react-rating-stars-component";
import UserReviews from "../user-reviews";
import useReviewService from "../../../../service/reviewService";

const ProfileStatsPage = () => {
  const [stats, setStats] = useState(null)
  const [showReviews, setShowReviews] = useState(false);
  const { getUserStats } = useReviewService();

  useEffect(() => {
    getUserStats(setStats)
  }, []);

  return (
    <Container>
   {stats  && <Card className="profile-stats mb-4">
        <Card.Body>
          <h4 className="text-center mb-3">Profile Statistics</h4>
          <Row>
            <Col xs={6} className="text-center">
              <h6>Total Purchases</h6>
              <p className="stats-number">{stats.totalPurchases}</p>
            </Col>
            <Col xs={6} className="text-center">
              <h6>Total Sales</h6>
              <p className="stats-number">{stats.totalSales}</p>
            </Col>
          </Row>

          <hr />

          <h6 className="text-center">User Rating</h6>
          <div className="text-center">
            <ReactStars
              count={5}
              value={stats.rating}
              size={30}
              edit={false}
              isHalf={true}
              activeColor="#f8d64e"
            />
          </div>
          <ProgressBar
            now={(stats.rating / 5) * 100}
            label={`${stats.rating.toFixed(1)} / 5`}
            variant={
              stats.rating >= 4 ? "success" : stats.rating >= 3 ? "warning" : "danger"
            }
            className="mt-2"
          />
          <p className="text-center mt-2">Based on {stats.totalRatings} ratings</p>

          <Button
            className="mt-3 w-100 open-reviews"
            onClick={() => setShowReviews(true)}
          >
            View Reviews
          </Button>
        </Card.Body>
      </Card>}

      <Modal
        show={showReviews}
        onHide={() => setShowReviews(false)}
        centered
        size="lg"
      >
        <Modal.Header closeButton>
          <Modal.Title>User Reviews</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <UserReviews />
        </Modal.Body>
      </Modal>
    </Container>
  );
};

export default ProfileStatsPage;
