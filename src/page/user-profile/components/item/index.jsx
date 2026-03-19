import React, { useEffect, useState } from "react";
import {
  Card,
  Badge,
  Button,
  Dropdown,
  DropdownButton,
  ListGroup,
} from "react-bootstrap";
import useOrderService from "../../../../service/orderService";
import { FaTruck, FaMapMarkerAlt } from "react-icons/fa";
import "./style.scss";
import ReviewModal from "../../../../components/modals/review-modal";
import CancelModal from "../../../../components/modals/cancel-order-modal";

const STATUS_OPTIONS = [
  { label: "Pending Confirmation", value: "pending", variant: "pending" },
  { label: "Confirmed", value: "confirmed", variant: "info" },
  { label: "Preparing for Shipment", value: "preparing", variant: "preparing" },
  { label: "Shipped", value: "shipped", variant: "shipped" },
  { label: "Delivered", value: "delivered", variant: "success" },
  { label: "Canceled", value: "canceled", variant: "danger" },
  { label: "Offered", value: "offeres", variant: "pending" },
];

const OrderItem = ({ order, isSeller, orderStatus }) => {
  const [status, setStatus] = useState(order.status || "pending");
  const { updateOrderStatus, confirmOrderReceived, cancelOrder } =
    useOrderService();
  const [showCancelModal, setShowCancelModal] = useState(false);
  const [reviewModal, setReviewModal] = useState(false);

  const handleStatusChange = (newStatus) => {
    setStatus(newStatus);
    updateOrderStatus(order._id, newStatus);
  };

  const handleConfirmReceived = () => {
    confirmOrderReceived(order._id);
    setReviewModal(true);
  };

  const confirmCancelOrder = (id, reason, setShowCancelModal) => {
    cancelOrder();
  };
  const currentStatus = STATUS_OPTIONS.find((s) => s.value === status);

  if (!order.products) return <></>;

  return (
    <>
      <Card className="order-item">
        <Card.Body>
          <div className="order-header">
            <div className="order-details">
              <Card.Title className="order-id">
                <div className="order-tracking">
                  <FaTruck />
                  <p>
                    <strong>Tracking Number:</strong>{" "}
                    {order._id || "Not Assigned"}
                  </p>
                </div>
              </Card.Title>
              <Card.Text className="order-date">
                <strong>Order Date:</strong>{" "}
                {new Date(order.createdAt).toLocaleDateString()}
              </Card.Text>
              <Card.Text className="order-total">
                <strong>Total:</strong> ${order.totalPrice.toFixed(2)}
              </Card.Text>
            </div>
            <Badge
              bg={currentStatus?.variant || "pending"}
              className={`order-status bg-${currentStatus?.variant}`}
            >
              {currentStatus?.label}
            </Badge>
          </div>

          {/* Адрес доставки в одну строку */}
          {order.address && (
            <div className="order-address d-flex align-items-center">
              <FaMapMarkerAlt className="me-2" />
              <span>
                <strong>Shipping Address:</strong>{" "}
                {`${order.address.street}, ${order.address.city}, ${
                  order.address.state || "N/A"
                }, ${order.address.country}, ${order.address.postalCode}`}
              </span>
            </div>
          )}

          <ListGroup variant="flush" className="order-products">
            {order.products.map((product) => (
              <>
                <ListGroup.Item key={product._id} className="product-item">
                  <div className="product-info">
                    <span className="product-name">{product._id.name}</span>{" "}
                    <span className="product-qty">x{product.quantity}</span>
                  </div>
                  <div className="product-category">{product._id.category}</div>
                  <span className="product-price">
                    ${(product.price * product.quantity).toFixed(2)}
                  </span>
                  {status === "delivered" && !isSeller && (
                    <Button
                      variant="outline-primary"
                      size="sm"
                      className="mt-2 leave-review-btn"
                      onClick={() => setReviewModal(true)}
                    >
                      Leave a Review
                    </Button>
                  )}
                </ListGroup.Item>

                <ReviewModal
                  show={reviewModal}
                  onHide={() => setReviewModal(false)}
                  product={product}
                  orderId={order._id}
                />
                <CancelModal
                  show={showCancelModal}
                  onHide={() => setShowCancelModal(false)}
                  onConfirm={confirmCancelOrder}
                  id={order._id}
                />
              </>
            ))}
          </ListGroup>

          {isSeller && status !== "canceled" ?    (
            <DropdownButton
              title="Update Status"
              variant="outline-dark"
              className="status-dropdown"
              drop="up"
              onSelect={handleStatusChange}
            >
              {STATUS_OPTIONS.map((option) => (
                <Dropdown.Item key={option.value} eventKey={option.value}>
                  {option.label}
                </Dropdown.Item>
              ))}
            </DropdownButton>
          ) : (
            status === "shipped" && (
              <Button
                variant="success"
                className="confirm-btn"
                onClick={handleConfirmReceived}
              >
                Confirm Order Received
              </Button>
            )
          )}
          {!isSeller && status !== "canceled" && status !== "delivered" && (
            <Button
              variant="danger"
              className="mt-3"
              onClick={() => setShowCancelModal(true)}
            >
              Cancel Order
            </Button>
          )}
        </Card.Body>
      </Card>
    </>
  );
};

export default OrderItem;
