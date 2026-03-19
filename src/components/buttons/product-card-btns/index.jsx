import { useEffect, useState } from "react";
import { Button, Card, Nav } from "react-bootstrap";
import { FaHeart, FaShoppingBag, FaShoppingCart, FaEdit, FaTrash } from "react-icons/fa";
import './style.scss';
import useProductService from "../../../service/productService";
import useCartService from "../../../service/cartService";

const CardBtns = ({ productId, byeProdClick, onEdit, onDelete, sellerId, liked = [] }) => {
  const { likeProduct } = useProductService();
  const { addToCart } = useCartService();
  const { deleteProduct } = useProductService();

  const userId = localStorage.getItem("user");
  const [isLiked, setIsLiked] = useState(false);

  useEffect(() => {
    if (liked.includes(productId)) {
      setIsLiked(true);
    }
    
  }, [liked, userId]);

  const handleLikeClick = (e) => {
    e.preventDefault();
    e.stopPropagation();

    likeProduct({ productId }).then(() => {
      setIsLiked((prev) => !prev);
    });
  };

  const addToCartClick = (e) => {
    e.preventDefault();
    e.stopPropagation();
    addToCart({ productId });
  };

  const handleBuyClick = (e) => {
    e.preventDefault();
    e.stopPropagation();
    byeProdClick();
  };

  const handleDeleteClick = (e) => {
    e.preventDefault();
    e.stopPropagation();
    deleteProduct(productId);
  };

  const isMyProduct = sellerId === userId;

  return (
    <Card.Footer className="product-card-footer d-flex justify-content-between gap-2">
      {isMyProduct ? (
        <>
          <Nav.Link href={`/edit-product/${productId}`}>
            <Button variant="outline-warning" className="w-100">
              <FaEdit />
            </Button>
          </Nav.Link>
          <Button variant="outline-danger" className="w-100" onClick={handleDeleteClick}>
            <FaTrash />
          </Button>
        </>
      ) : (
        <>
          <Button variant="outline-success" className="w-100" onClick={addToCartClick}>
            <FaShoppingCart />
          </Button>
          <Button
            variant="outline-danger"
            className={`like-btn ${isLiked ? "liked" : ""}`}
            onClick={handleLikeClick}
          >
            <FaHeart />
          </Button>
          <Button variant="outline-primary" className="w-100" onClick={handleBuyClick}>
            <FaShoppingBag />
          </Button>
        </>
      )}
    </Card.Footer>
  );
};

export default CardBtns;
