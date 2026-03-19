import React, { useEffect } from "react";
import { Button } from "react-bootstrap";
import { TiPlus, TiMinus } from "react-icons/ti";
import "./style.scss";
import ImageSlider from "../../../../components/product-card/card-images-slider";

const CartItem = ({ product, handleQuantityChange, handleRemoveItem, handleBuy }) => {

  const hasDiscount = product.discount && product.discount > 0;
  const discountedPrice = hasDiscount
    ? (product.price * (1 - product.discount / 100)).toFixed(2)
    : product.price.toFixed(2);

  return (
    <div className="cart-item animated">
      <div className="cart-item-images">
        <ImageSlider images={product.images} />
      </div>

      <div className="cart-item-info">
        <h3 className="cart-item-title">{product.name}</h3>
        <p className="cart-item-category">Категория: {product.category}</p>
        <p className="cart-item-description">{product.description}</p>
        <p className="cart-item-price">
          Цена:{" "}
          {hasDiscount ? (
            <span>
              <strong className="text-danger">${discountedPrice}</strong>{" "}
              <span className="text-decoration-line-through text-muted">
                ${product.price.toFixed(2)}
              </span>
            </span>
          ) : (
            <strong>${product.price.toFixed(2)}</strong>
          )}
        </p>
      </div>

      <div className="cart-actions">
        <div className="quantity-control">
          <Button
            variant="outline-danger"
            onClick={() =>
              handleQuantityChange(product._id, Math.max(product.quantity - 1, 1))
            }
          >
            <TiMinus />
          </Button>
          <span className="quantity-display">{product.quantity}</span>
          <Button
            variant="outline-success"
            onClick={() => handleQuantityChange(product._id, product.quantity + 1)}
          >
            <TiPlus />
          </Button>
        </div>

        <div className="action-buttons">
          <Button variant="outline-primary" onClick={() => handleBuy(product.id)}>
            Купить
          </Button>
          <Button
            variant="outline-danger"
            className="remove-btn"
            onClick={() => handleRemoveItem(product._id)}
          >
            Убрать
          </Button>
        </div>
      </div>
    </div>
  );
};

export default CartItem;
