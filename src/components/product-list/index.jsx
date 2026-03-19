import React, { useEffect, useState } from "react";
import { Row, Col, Card, Nav } from "react-bootstrap";
import CardBtns from "../buttons/product-card-btns";
import ImageSlider from "../product-card/card-images-slider";
import CheckoutModal from "../modals/checkout-modal";

import "./style.scss";
import useAddressService from "../../service/addressService";
import usePaymentService from "../../service/paymentService";
import useProductService from "../../service/productService";

const ProductList = ({ products }) => {
  const [showCheckout, setShowCheckout] = useState(false);
  const [selectedProduct, setSelectedProduct] = useState(null);
  const [totalAmount, setTotalAmount] = useState(0);
  const [addresses, setAddresses] = useState([]);
  const [payments, setPayments] = useState([]);
  const { getUserAddresses } = useAddressService();
  const { getUserPayments } = usePaymentService();
  const [liked, setLiked] = useState([]);
  const { getLikedProducts } = useProductService();

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
    <>
      <Row>
        {products.map((product) => {
          const hasDiscount = product.discount && product.discount > 0;
          const discountedPrice = hasDiscount
            ? (product.price * (1 - product.discount / 100)).toFixed(2)
            : product.price.toFixed(2);

          return (
            <Col key={product.id} sm={12} md={6} lg={3} className="product-list-card">
              <Nav.Link href={`${product._id}`}>
                <Card className="h-100 shadow-lg rounded-3 overflow-hidden">
                  <div className="position-relative">
                    <ImageSlider images={product.images} />
                    <div className="position-absolute bottom-0 start-0 p-2 w-100 bg-gradient bg-dark bg-opacity-50 text-white text-center">
                      {hasDiscount ? (
                        <div>
                          <span className="fw-bold text-danger">${discountedPrice}</span>{" "}
                          <span className="text-decoration-line-through text-light">
                            ${product.price.toFixed(2)}
                          </span>
                        </div>
                      ) : (
                        <span className="fw-bold">${product.price.toFixed(2)}</span>
                      )}
                    </div>
                  </div>

                  <Card.Body>
                    <Card.Title>{product.name}</Card.Title>
                    <Card.Text>{product.subtitle}</Card.Text>
                  </Card.Body>
                  <CardBtns
                    sellerId={product.seller._id}
                    liked={liked}
                    productId={product._id}
                    byeProdClick={() => setSelectedProduct(product)}
                  />
                </Card>
              </Nav.Link>
              <CheckoutModal
                show={showCheckout}
                handleClose={() => setShowCheckout(false)}
                items={[selectedProduct]}
                totalAmount={totalAmount}
                addresses={addresses}
                payments={payments}
                onConfirmPurchase={handleConfirmPurchase}
              />
            </Col>
          );
        })}
      </Row>
    </>
  );
};

export default ProductList;
