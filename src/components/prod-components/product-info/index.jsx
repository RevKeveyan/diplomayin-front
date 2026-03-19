import React, { useEffect, useState } from "react";
import {
  FaStar,
  FaShoppingCart,
  FaHeart,
  FaCreditCard,
  FaEnvelope,
  FaDollarSign,
} from "react-icons/fa";
import useCartService from "../../../service/cartService";
import useProductService from "../../../service/productService";
import CheckoutModal from "../../modals/checkout-modal";
import useAddressService from "../../../service/addressService";
import usePaymentService from "../../../service/paymentService";
import { useChat } from "../../../context/chatContext";
import useChatService from "../../../service/chatService";
import "./style.scss";
const ProductInfo = ({ product }) => {
  const { initChat } = useChatService();
  const { openChat } = useChat();
  const { likeProduct } = useProductService();
  const { addToCart } = useCartService();
  const [isOfferingPrice, setIsOfferingPrice] = useState(false);
  const [offerPrice, setOfferPrice] = useState(null);
  const [error, setError] = useState("");
  const [totalAmount, setTotalAmount] = useState(0);
  const [showCheckout, setShowCheckout] = useState(false);
  const [addresses, setAddresses] = useState([]);
  const [payments, setPayments] = useState([]);
  const { getUserAddresses } = useAddressService();
  const { getUserPayments } = usePaymentService();


  const handleConfirmPurchase = () => {
    setShowCheckout(false);
  };

  const handleStartChat = async () => {
    const buyerId = JSON.parse(localStorage.getItem("userData"))?.id;
    const sellerId = product.seller?._id;
    const productId = product._id;

    const chatId = await initChat(buyerId, sellerId, productId);
    if (chatId) {
      openChat(chatId); // Открываем глобальный чат на нужную переписку
    }
  };

  if (!product) return <p>Loading product details...</p>;

  const {
    name,
    description,
    price,
    discount,
    category,
    stock,
    ratings,
    seller,
    tags,
    tradable,
  } = product;

  const discountedPrice =
    discount && price
      ? (Number(price) * (1 - discount / 100)).toFixed(2)
      : Number(price).toFixed(2);

  const minOfferPrice = price * 0.7;

  const byeProdClick = () => {
    getUserAddresses(setAddresses);
    getUserPayments(setPayments);
    setShowCheckout(true);
  };

  const handleOfferPriceToggle = () => {
    setIsOfferingPrice(!isOfferingPrice);
  };

  const handleOfferPriceChange = (e) => {
    const value = e.target.value;
    setOfferPrice(value);

    if (value < minOfferPrice) {
      setError(`The price cannot be lower than $${minOfferPrice.toFixed(2)}`);
    } else {
      setError("");
    }
  };

  return (
    <div className="product-info-container d-flex justify-content-between">
      {/* Left section with main information */}
      <div className="product-info-left">
        <h2 className="mb-3">{name}</h2>
        <p className="text-muted">{description}</p>

        <h3 className="text-success">
          {discount && price ? (
            <del className="text-danger">${Number(price).toFixed(2)}</del>
          ) : null}
          ${discountedPrice}
        </h3>

        <p className={stock > 0 ? "text-success" : "text-danger"}>
          {stock > 0 ? `In Stock (${stock} available)` : "Out of Stock"}
        </p>
        <p className="text-muted">Category: {category}</p>

        <p>
          <FaStar className="text-warning" /> {ratings?.average.toFixed(1)} (
          {ratings?.reviews} Reviews)
        </p>

        <p>
          Sold by:{" "}
          <a href={`/seller/${seller?._id}`}>
            {seller?.firstName || "Unknown Seller"}
          </a>
        </p>

        {tags?.length > 0 && (
          <p className="text-muted">
            Tags:{" "}
            {tags.map((tag, index) => (
              <span key={index} className="badge bg-secondary me-1">
                {tag}
              </span>
            ))}
          </p>
        )}

        {/* Button block in the left section */}
        <div className="d-flex flex-wrap gap-2 mt-3">
          <button
            className="btn btn-primary btn-sm"
            onClick={() => addToCart({ productId: product._id })}
          >
            <FaShoppingCart /> Add to Cart
          </button>
          <button
            className="btn btn-outline-danger btn-sm"
            onClick={() => likeProduct({ productId: product._id })}
          >
            <FaHeart /> Add to Wishlist
          </button>
          <button className="btn btn-info btn-sm" onClick={handleStartChat}>
            <FaEnvelope /> Message Seller
          </button>
        </div>
      </div>

      {/* Right section with "Buy Now" and "Make an Offer" */}
      <div className="product-info-right d-flex flex-column justify-content-center">
        <button
          className="btn btn-success btn-lg mb-3 responsive-btn-text"
          onClick={() => byeProdClick()}
        >
          <FaCreditCard /> <span>Buy Now</span>
        </button>

        {/* "Make an Offer" button */}
        {tradable && (
          <button
            className="btn btn-warning btn-lg  responsive-btn-text"
            onClick={handleOfferPriceToggle}
          >
            <FaDollarSign /> <span>{isOfferingPrice ? "Cancel" : "Make an Offer"}</span>
          </button>
        )}

        {/* Input form for offer price (visible after clicking the button) */}
        {isOfferingPrice && (
          <div className="offer-form mt-3">
            <input
              type="number"
              className="form-control"
              placeholder={`Min. price: $${minOfferPrice.toFixed(2)}`}
              value={offerPrice}
              onChange={handleOfferPriceChange}
            />
            {error && <small className="text-danger">{error}</small>}
            <button
              className="btn btn-outline-success mt-2"
              onClick={byeProdClick}
              disabled={!!error || !offerPrice}
            >
              Submit Offer
            </button>
          </div>
        )}
        <CheckoutModal
          show={showCheckout}
          handleClose={() => setShowCheckout(false)}
          items={[product]}
          offeredPrice={offerPrice}
          addresses={addresses}
          payments={payments}
          totalAmount={totalAmount}
          onConfirmPurchase={handleConfirmPurchase}
        />
      </div>
    </div>
  );
};

export default ProductInfo;
