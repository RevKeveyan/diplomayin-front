import React from "react";
import { Card, Button } from "react-bootstrap";

const CartSummary = ({ cartItems, totalPrice, byeProdClick }) => {
  const totalItems = cartItems.reduce((acc, item) => acc + item.quantity, 0);

  const isCheckoutDisabled = cartItems.length === 0 || totalPrice <= 0;

  return (
    <Card className="mb-4 cart-summary sticky-top animated">
      <Card.Body>
        <h4 className="text-center mb-4">🛒 Your Cart Summary</h4>
        <p>
          <strong>Total Items:</strong> {totalItems}
        </p>
        <p>
          <strong>Total Price:</strong>
          <span className="text-success"> ${totalPrice}</span>
        </p>

        <hr />

        <Button
          variant="success"
          className="w-100 btn-lg"
          onClick={byeProdClick}
          disabled={isCheckoutDisabled}
        >
          Proceed to Checkout
        </Button>
      </Card.Body>
    </Card>
  );
};

export default CartSummary;
