import React, { useEffect, useState } from "react";
import { Container, Row, Col, Spinner, Alert } from "react-bootstrap";
import CartItem from "../cart-item";
import CartSummary from "../cart-summary";
import useCartService from "../../../../service/cartService";
import "./style.scss";
import useAddressService from "../../../../service/addressService";
import usePaymentService from "../../../../service/paymentService";
import CheckoutModal from "../../../../components/modals/checkout-modal";

const CartWrapper = () => {
  const { getCartItems, loadingStatus, removeFromCart } = useCartService();
  const [showCheckout, setShowCheckout] = useState(false);
  const [cartItems, setCartItems] = useState([]);
  const [addresses, setAddresses] = useState([]);
  const [payments, setPayments] = useState([]);
  const { getUserAddresses } = useAddressService();
  const { getUserPayments } = usePaymentService();
  const user = JSON.parse(localStorage.getItem("userData"));
  const byeProdClick = () => {
    getUserAddresses(setAddresses);
    getUserPayments(setPayments);
    setShowCheckout(true);
  };

  const handleConfirmPurchase = () => {
    setShowCheckout(false);
  };

  useEffect(() => {
    if (user?.id) {
      getCartItems(setCartItems);
    }
  }, []);

  const handleQuantityChange = (id, quantity) => {
    setCartItems((prevItems) =>
      prevItems.map((item) =>
        item._id === id ? { ...item, quantity: quantity } : item
      )
    );
  };

  const handleRemoveItem = (id) => {
    setCartItems((prevItems) => prevItems.filter((item) => item._id !== id));
    removeFromCart(id)
  };



  const calculateTotal = () => {
    return cartItems
      .reduce((total, item) => {
        const hasDiscount = item.discount && item.discount > 0;
        const itemPrice = hasDiscount
          ? item.price * (1 - item.discount / 100)
          : item.price;
        return total + itemPrice * item.quantity;
      }, 0)
      .toFixed(2);
  };

  // 🔥 Логика загрузки (switch-case)
  const renderCartContent = () => {
    switch (loadingStatus) {
      case "loading":
        return (
          <div className="loading-container">
            <Spinner animation="border" variant="primary" />
          </div>
        );
      case "loaded":
        return (
          <>
            {cartItems.length > 0 ? (
              cartItems.map((item) => (
                <CartItem
                  key={item._id}
                  product={item}
                  handleQuantityChange={handleQuantityChange}
                  handleRemoveItem={handleRemoveItem}
                  handleBuy={byeProdClick}
                />
              ))
            ) : (
              <Alert  class="alert alert-light">Your cart is empty.</Alert>
            )}
          </>
        );
      case "error":
        return <Alert  class="alert alert-light">Your cart is empty.</Alert>;
      default:
        return null;
    }
  };

  return (
    <>
      <Container className="mt-5">
        <div className="cart-wrapper">
          <Row>
            <Col md={8}>{renderCartContent()}</Col>
            <Col md={4}>
              <CartSummary
                cartItems={cartItems}
                totalPrice={calculateTotal()}
                byeProdClick={byeProdClick}
              />
            </Col>
          </Row>
        </div>
      </Container>
      <CheckoutModal
        show={showCheckout}
        handleClose={() => setShowCheckout(false)}
        items={cartItems}
        totalAmount={calculateTotal()}
        addresses={addresses}
        payments={payments}
        onConfirmPurchase={handleConfirmPurchase}
      />
    </>
  );
};

export default CartWrapper;
