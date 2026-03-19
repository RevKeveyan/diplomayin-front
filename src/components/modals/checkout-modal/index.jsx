import React, { useEffect, useState } from "react";
import {
  Modal,
  Button,
  ListGroup,
  Image,
  Row,
  Col,
  Form,
  Alert,
} from "react-bootstrap";
import useOrderService from "../../../service/orderService";
import ImageSlider from "../../product-card/card-images-slider";
import PaymentModal from "../payment";
import AddDetailsModal from "../add-deitals-modal";

const CheckoutModal = ({
  show,
  handleClose,
  items,
  addresses,
  payments,
  offeredPrice,
}) => {
  const [addressId, setAddressId] = useState("");
  const [paymentMethodId, setPaymentMethodId] = useState("");
  const { createOrder, offerOrder } = useOrderService();
  const [error, setError] = useState("");
  const [showPaymentModal, setShowPaymentModal] = useState(false);
  const [showAddModal, setShowAddModal] = useState(false);
  const [addType, setAddType] = useState("");

  const countDiscount = (discount, price) => {
    return discount
      ? (price * (1 - discount / 100)).toFixed(2)
      : price.toFixed(2);
  };

  const totalAmount = () => {
    return items
      .reduce(
        (total, item) =>
          total + parseFloat(countDiscount(item.discount, item.price)),
        0
      )
      .toFixed(2);
  };

  const handleConfirmPurchase = () => {
    if (!addressId || !paymentMethodId) {
      setError("Please select both an address and a payment method.");
      return;
    }
    if (!offeredPrice) {
      createOrder({ addressId, paymentMethodId, products: items });
    } else {
      offerOrder({ addressId, paymentMethodId, products: items, offeredPrice });
    }
    handleClose();
  };

  const handleAddSuccess = (type, newItem) => {
    if (type === "address") {
      setAddressId(newItem._id);
      addresses.push(newItem); // временно добавим вручную
    } else if (type === "payment") {
      setPaymentMethodId(newItem._id);
      payments.push(newItem);
    }
    
    setShowAddModal(false);
  };

  if (show)
    return (
      <>
        <Modal show={show} onHide={handleClose} centered size="lg">
          <Modal.Header closeButton>
            <Modal.Title>Confirm Your Purchase</Modal.Title>
          </Modal.Header>
          <Modal.Body>
            <ListGroup variant="flush">
              {items.map((item) => (
                <ListGroup.Item key={item.productid}>
                  <Row className="align-items-center">
                    <Col xs={3}>
                      <ImageSlider images={item.images} />
                    </Col>
                    <Col xs={6}>
                      <h5>{item.name}</h5>
                      <p>Quantity: {item.quantity || 1}</p>
                    </Col>
                    <Col xs={3} className="text-end">
                      <h5>
                        $
                        {!offeredPrice
                          ? countDiscount(item.discount, item.price)
                          : offeredPrice}
                      </h5>
                    </Col>
                  </Row>
                </ListGroup.Item>
              ))}
            </ListGroup>

            <h4 className="text-center mt-3">
              Total: ${!offeredPrice ? totalAmount() : offeredPrice}
            </h4>

            {error && <Alert variant="danger">{error}</Alert>}

            {/* Выбор адреса */}
            <Form.Group className="mt-3">
              <Form.Label>Choose Delivery Address</Form.Label>
              <Form.Select
                value={addressId}
                onChange={(e) => {
                  const value = e.target.value;
                  if (value === "new") {
                    setAddType("address");
                    setShowAddModal(true);
                    return;
                  }
                  setAddressId(value);
                }}
              >
                <option value="">Select an address</option>
                {addresses.map((address) => (
                  <option key={address._id} value={address._id}>
                    {address.street}, {address.city}, {address.country}
                  </option>
                ))}
                <option value="new">Add New Address</option>
              </Form.Select>
            </Form.Group>

            {/* Выбор платежа */}
            <Form.Group className="mt-3">
              <Form.Label>Choose Payment Method</Form.Label>
              <Form.Select
                value={paymentMethodId}
                onChange={(e) => {
                  const value = e.target.value;
                  if (value === "new") {
                    setAddType("payment");
                    setShowAddModal(true);
                    return;
                  }
                  setPaymentMethodId(value);
                }}
              >
                <option value="">Select a payment method</option>
                {payments.map((method) => (
                  <option key={method._id} value={method._id}>
                    {method.cardNumber}
                  </option>
                ))}
                <option value="new">Add New Payment Method</option>
              </Form.Select>
            </Form.Group>
          </Modal.Body>

          <Modal.Footer>
            <Button variant="secondary" onClick={handleClose}>
              Cancel
            </Button>
            <Button
              variant="success"
              onClick={handleConfirmPurchase}
              disabled={!addressId || !paymentMethodId}
            >
              Confirm Purchase
            </Button>
          </Modal.Footer>
        </Modal>
        <PaymentModal
          show={showPaymentModal}
          handleClose={() => setShowPaymentModal(false)}
          paymentMethod={paymentMethodId !== "new" ? paymentMethodId : ""}
          paymentOptions={payments}
          onPaymentSuccess={() => {
            setShowPaymentModal(false);
            handleClose();
            alert("Payment Successful!");
          }}
        />
        <AddDetailsModal
          show={showAddModal}
          handleClose={() => setShowAddModal(false)}
          type={addType}
          onSuccess={handleAddSuccess}
        />
      </>
    );
};

export default CheckoutModal;
