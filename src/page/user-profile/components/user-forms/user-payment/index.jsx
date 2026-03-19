import React, { useState, useEffect } from "react";
import { useForm } from "react-hook-form";
import { Form, Button, Container, Row, Col } from "react-bootstrap";
import usePaymentService from "../../../../../service/paymentService";

const PaymentDetailsForm = ({onSuccess}) => {
  const { getUserPayments, updatePaymentDetails,addPayment } = usePaymentService();
  const {
    register,
    handleSubmit,
    watch,
    reset,
    setValue,
    formState: { errors },
  } = useForm();

  const [paymentMethods, setPaymentMethods] = useState([]);
  const [selectedPayment, setSelectedPayment] = useState(null);

  // Загружаем платежные методы при монтировании компонента
  useEffect(() => {
    getUserPayments(setPaymentMethods);
  }, []);

  // Устанавливаем первый платежный метод по умолчанию
  useEffect(() => {
    if (paymentMethods.length > 0) {
      setSelectedPayment(paymentMethods[0]);
      reset(paymentMethods[0]);
    }
  }, [paymentMethods]);

  const handlePaymentChange = (event) => {
    const selected = paymentMethods.find((pm) => pm._id === event.target.value);
    setSelectedPayment(selected);
    reset(selected);
  };

  const formatCardNumber = (e) => {
    let value = e.target.value.replace(/\D/g, "").substring(0, 16);
    value = value.replace(/(.{4})/g, "$1 ").trim();
    setValue("cardNumber", value);
  };

  const onSubmit = async (data) => {
    let payment;
    if (selectedPayment) {
      await updatePaymentDetails(data);
    } else {
      payment = await addPayment(data);
    }

    if (onSuccess && payment?._id) {
      onSuccess("payment", payment);
    }
  };

  return (
    <Container className="payment-details-form p-4  rounded">
      <h2 className="mb-3">Select or Add Payment Method</h2>

      {/* Выбор существующего платежного метода */}
      {paymentMethods.length > 0 && (
        <Form.Group className="mb-3">
          <Form.Label>Select Payment Method</Form.Label>
          <Form.Control as="select" onChange={handlePaymentChange}>
            {paymentMethods.map((method) => (
              <option key={method._id} value={method._id}>
                {`${method.cardHolderName} - ${method.cardNumber}`}
              </option>
            ))}
            <option value="">Add New Payment Method</option>
          </Form.Control>
        </Form.Group>
      )}

      <Form onSubmit={handleSubmit(onSubmit)}>
        {/* Card Number */}
        <Form.Group className="mb-3">
          <Form.Label>Card Number</Form.Label>
          <Form.Control
            type="text"
            placeholder="1234 5678 9012 3456"
            {...register("cardNumber", {
              required: "Card number is required",
              pattern: {
                value: /^[0-9\s]{19}$/,
                message: "Enter a valid 16-digit card number",
              },
            })}
            onChange={formatCardNumber}
            isInvalid={!!errors.cardNumber}
          />
          <Form.Control.Feedback type="invalid">
            {errors.cardNumber?.message}
          </Form.Control.Feedback>
        </Form.Group>

        {/* Cardholder Name */}
        <Form.Group className="mb-3">
          <Form.Label>Cardholder Name</Form.Label>
          <Form.Control
            type="text"
            placeholder="John Doe"
            {...register("cardHolderName", {
              required: "Cardholder name is required",
              pattern: {
                value: /^[A-Za-z\s]+$/,
                message: "Enter a valid name",
              },
            })}
            isInvalid={!!errors.cardHolderName}
          />
          <Form.Control.Feedback type="invalid">
            {errors.cardHolderName?.message}
          </Form.Control.Feedback>
        </Form.Group>

        {/* Expiry Date & CVV */}
        <Row className="mb-3">
          <Col md={6}>
            <Form.Group>
              <Form.Label>Expiry Date</Form.Label>
              <Form.Control
                type="text"
                placeholder="MM/YY"
                {...register("expirationDate", {
                  required: "Expiry date is required",
                  pattern: {
                    value: /^(0[1-9]|1[0-2])\/([0-9]{2})$/,
                    message: "Enter a valid expiry date (MM/YY)",
                  },
                })}
                isInvalid={!!errors.expirationDate}
              />
              <Form.Control.Feedback type="invalid">
                {errors.expirationDate?.message}
              </Form.Control.Feedback>
            </Form.Group>
          </Col>

          <Col md={6}>
            <Form.Group>
              <Form.Label>CVV</Form.Label>
              <Form.Control
                type="password"
                placeholder="123"
                maxLength="4"
                {...register("cvv", {
                  required: "CVV is required",
                  pattern: {
                    value: /^[0-9]{3,4}$/,
                    message: "Enter a valid 3 or 4 digit CVV",
                  },
                })}
                isInvalid={!!errors.cvv}
              />
              <Form.Control.Feedback type="invalid">
                {errors.cvv?.message}
              </Form.Control.Feedback>
            </Form.Group>
          </Col>
        </Row>

        {/* Billing Address */}
        <Form.Group className="mb-3">
          <Form.Label>Billing Address</Form.Label>
          <Form.Control
            type="text"
            placeholder="123 Main St, City, Country"
            {...register("billingAddress", {
              required: "Billing address is required",
            })}
            isInvalid={!!errors.billingAddress}
          />
          <Form.Control.Feedback type="invalid">
            {errors.billingAddress?.message}
          </Form.Control.Feedback>
        </Form.Group>

        <Button variant="success" type="submit">
          {selectedPayment ? "Update Payment Method" : "Add Payment Method"}
        </Button>
      </Form>
    </Container>
  );
};

export default PaymentDetailsForm;
