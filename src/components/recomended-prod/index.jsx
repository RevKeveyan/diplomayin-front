import React, { useEffect, useState } from "react";
import { Container, Row, Col, Card, Nav } from "react-bootstrap";
import CardBtns from "../buttons/product-card-btns";
import ImageSlider from "../product-card/card-images-slider";
import "./style.scss";
import useAddressService from "../../service/addressService";
import usePaymentService from "../../service/paymentService";
import CheckoutModal from "../modals/checkout-modal";
import useProductService from "../../service/productService";

const RecommendedProducts = ({ products, recomended = true }) => {
  const [showCheckout, setShowCheckout] = useState(false);
  const [selectedProduct, setSelectedProduct] = useState(null);
  const [addresses, setAddresses] = useState([]);
  const [payments, setPayments] = useState([]);
  const [liked, setLiked] = useState([]);
  const { getLikedProducts } = useProductService();
  const { getUserAddresses } = useAddressService();
  const { getUserPayments } = usePaymentService();

  const byeProdClick = () => {
    getUserAddresses(setAddresses);
    getUserPayments(setPayments);
    setShowCheckout(true);
  };

  useEffect(() => {
    if (selectedProduct) {
      byeProdClick();
    }

  }, [selectedProduct]);

  useEffect(()=>{
    getLikedProducts(setLiked)
  },[])
  
  const handleConfirmPurchase = () => {
 
    setShowCheckout(false);
  };

  return (
    <Container className="recommended-products-container">
      <Row>
        {products.map((product) => {
          const hasDiscount = product.discount && product.discount > 0;
          const discountedPrice = hasDiscount
            ? (product.price * (1 - product.discount / 100)).toFixed(2)
            : product.price.toFixed(2);

          return (
            <Col key={product._id} sm={12} md={6} lg={2} className="mb-4">
              <Nav.Link href={`${product._id}`}>
                <Card className="product-card">
                  <ImageSlider images={product.images} />
                  <Card.Body className="product-card-body">
                    <Card.Title className="product-title">
                      {product.name}
                    </Card.Title>
                    <Card.Text className="product-description">
                      {product.subtitle}
                    </Card.Text>
                    <Card.Text className="product-price">
                      {hasDiscount ? (
                        <div>
                          <span className="fw-bold text-danger">${discountedPrice}</span>{" "}
                          <span className="text-decoration-line-through text-muted">
                            ${product.price.toFixed(2)}
                          </span>
                        </div>
                      ) : (
                        <span className="fw-bold">${product.price.toFixed(2)}</span>
                      )}
                    </Card.Text>
                  </Card.Body>
                  {recomended && <div className="recommended-badge">Recommended</div>}
                  <CardBtns
                    liked={liked}
                    productId={product._id}
                    byeProdClick={() => setSelectedProduct(product)}
                  />
                </Card>
              </Nav.Link>
            </Col>
          );
        })}
        <CheckoutModal
          show={showCheckout}
          handleClose={() => setShowCheckout(false)}
          items={[selectedProduct]}
          addresses={addresses}
          payments={payments}
          onConfirmPurchase={handleConfirmPurchase}
        />
      </Row>
    </Container>
  );
};

export default RecommendedProducts;
