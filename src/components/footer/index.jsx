import React from "react";
import { Container, Row, Col, ListGroup, Image } from "react-bootstrap";
import { NavLink } from "react-router-dom";
import logoImage from "../../assets/logo/logo-test-1.png";

import "./style.scss";

const Footer = () => {
  return (
    <footer className="footer text-light py-4">
      <Container>
        <Row className="justify-content-md-center">
          <Col
            sm={12}
            md={4}
            className="text-center text-md-left mb-4 mb-md-0 footer-logo"
          >
            <Image src={logoImage} alt="shoplink.am" fluid />
          </Col>

          <Col sm={12} md={4} className="text-center mb-4 mb-md-0">
            <h5>About Us</h5>
            <p>
              Our platform is designed for users who want to buy and sell
              products with ease. Use our real-time chat to communicate directly
              with buyers or sellers, negotiate prices, ask questions, and reach
              an agreement on the best deal for a specific product.
            </p>
          </Col>

          <Col sm={12} md={4} className="text-center text-md-right">
            <h5>Quick Links</h5>
            <ListGroup variant="flush">
              <ListGroup.Item as={NavLink} to="/home">
                Home
              </ListGroup.Item>
              <ListGroup.Item as={NavLink} to="/cart">
                Cart
              </ListGroup.Item>
              <ListGroup.Item as={NavLink} to="/add-product">
                Post Product
              </ListGroup.Item>
              <ListGroup.Item as={NavLink} to="/profile">
                Profile Settings
              </ListGroup.Item>
            </ListGroup>
          </Col>
        </Row>

        <Row>
          <Col className="text-center mt-4">
            <p>
              &copy; {new Date().getFullYear()} ShopLink. All rights reserved.
            </p>
          </Col>
        </Row>
      </Container>
    </footer>
  );
};

export default Footer;
