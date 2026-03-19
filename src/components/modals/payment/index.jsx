import React, { useState } from "react";
import { Modal, Button, Form, Spinner, Alert, Col, Row } from "react-bootstrap";

const PaymentModal = ({ show, handleClose, paymentMethod, paymentOptions = [], onPaymentSuccess }) => {
  const [selectedPayment, setSelectedPayment] = useState(paymentMethod || "");
  const [cardNumber, setCardNumber] = useState("");
  const [expiryDate, setExpiryDate] = useState("");
  const [cvv, setCvv] = useState("");
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  const handlePayment = () => {
    if (!selectedPayment) {
      setError("Please select a payment method.");
      return;
    }

    if (selectedPayment === "new") {
      if (!cardNumber || !expiryDate || !cvv) {
        setError("Please fill in all card details.");
        return;
      }
    }

    setLoading(true);
    setTimeout(() => {
      setLoading(false);
      handleClose();
      onPaymentSuccess(selectedPayment);
    }, 2000); // Имитация обработки платежа
  };

  return (
    <Modal show={show} onHide={handleClose} centered>
      <Modal.Header closeButton>
        <Modal.Title>Payment Processing</Modal.Title>
      </Modal.Header>
      <Modal.Body>
        {error && <Alert variant="danger">{error}</Alert>}

        {/* Выбор способа оплаты */}
        {paymentOptions.length > 0 && (
          <Form.Group className="mb-3">
            <Form.Label>Select Payment Option</Form.Label>
            <Form.Select value={selectedPayment} onChange={(e) => setSelectedPayment(e.target.value)}>
              <option value="">Choose payment method</option>
              {paymentOptions.map((option) => (
                <option key={option._id} value={option._id}>
                  {option.cardNumber}
                </option>
              ))}
              <option value="new">Use a new card</option>
            </Form.Select>
          </Form.Group>
        )}

        {/* Ввод данных карты, если выбран новый способ оплаты */}
        {selectedPayment === "new" && (
          <>
            <Form.Group className="mb-3">
              <Form.Label>Card Number</Form.Label>
              <Form.Control
                type="text"
                placeholder="1234 5678 9012 3456"
                value={cardNumber}
                onChange={(e) => setCardNumber(e.target.value)}
              />
            </Form.Group>
            <Row>
              <Col>
                <Form.Group className="mb-3">
                  <Form.Label>Expiry Date</Form.Label>
                  <Form.Control
                    type="text"
                    placeholder="MM/YY"
                    value={expiryDate}
                    onChange={(e) => setExpiryDate(e.target.value)}
                  />
                </Form.Group>
              </Col>
              <Col>
                <Form.Group className="mb-3">
                  <Form.Label>CVV</Form.Label>
                  <Form.Control
                    type="text"
                    placeholder="123"
                    value={cvv}
                    onChange={(e) => setCvv(e.target.value)}
                  />
                </Form.Group>
              </Col>
            </Row>
          </>
        )}
      </Modal.Body>
      <Modal.Footer>
        <Button variant="secondary" onClick={handleClose} disabled={loading}>
          Cancel
        </Button>
        <Button variant="success" onClick={handlePayment} disabled={loading}>
          {loading ? <Spinner animation="border" size="sm" /> : "Confirm Payment"}
        </Button>
      </Modal.Footer>
    </Modal>
  );
};

export default PaymentModal;
