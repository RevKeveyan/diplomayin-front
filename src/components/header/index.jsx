import React, { useState } from "react";
import {
  Navbar,
  Nav,
  Form,
  FormControl,
  Button,
  Container,
  Dropdown,
  DropdownButton,
  Offcanvas
} from "react-bootstrap";
import { useForm } from "react-hook-form";
import { FaSearch } from "react-icons/fa";
import logoImage from "../../assets/logo/logo-test-1.png";
import { NavLink } from "react-router-dom";
import { IoMdHome, IoMdCart } from "react-icons/io";
import { useAuth } from "../../context/userContext";
import { FaUser } from "react-icons/fa";
import { IoLogIn } from "react-icons/io5";
import { MdSell } from "react-icons/md";
import "./style.scss";

const Categories = [
  { name: "Electronics", value: "electronics" },
  { name: "Clothing", value: "clothing" },
  { name: "Beauty", value: "beauty" },
  { name: "Books", value: "books" },
  { name: "Furniture", value: "furniture" },
  { name: "Other", value: "all" },
];

const MyNavbar = ({ onSubmit, setCategory }) => {
  const { isLoggedIn } = useAuth();
  const { register, handleSubmit, setValue } = useForm({
    defaultValues: { category: Categories[0].value, search: "" },
  });

  const [selectedCategory, setSelectedCategory] = useState(Categories[0]);
  const [showNav, setShowNav] = useState(false);

  const handleCategorySelect = (categoryValue) => {
    const category = Categories.find((cat) => cat.value === categoryValue);
    setSelectedCategory(category);
    setValue("category", categoryValue);
    setCategory(categoryValue);
  };

  return (
    <Navbar expand="lg" className="custom-navbar">
      <Container>
        {/* Logo */}
        <NavLink to="/home" className="navbar-logo">
          <img src={logoImage} alt="Logo" className="logo-image" />
          <span className="logo-text">shoplink.am</span>
        </NavLink>

        {/* Search + Category — ALWAYS visible */}
        <Form onSubmit={handleSubmit(onSubmit)} className="search-form">
          <DropdownButton
            id="category-dropdown"
            title={selectedCategory.name}
            variant="outline-light"
            className="category-dropdown"
            onSelect={handleCategorySelect}
          >
            {Categories.map((category) => (
              <Dropdown.Item key={category.value} eventKey={category.value}>
                {category.name}
              </Dropdown.Item>
            ))}
          </DropdownButton>

          <FormControl
            type="text"
            placeholder="Search"
            className="search-input"
            {...register("search")}
          />
          <Button type="submit" variant="outline-info" className="search-button">
            <FaSearch />
          </Button>
        </Form>

        {/* Burger button */}
        <Navbar.Toggle aria-controls="offcanvasNavbar" onClick={() => setShowNav(true)} />

        {/* Offcanvas Navigation */}
        <Navbar.Offcanvas
          id="offcanvasNavbar"
          aria-labelledby="offcanvasNavbarLabel"
          placement="end"
          show={showNav}
          onHide={() => setShowNav(false)}
        >
          <Offcanvas.Header closeButton>
            <Offcanvas.Title id="offcanvasNavbarLabel">Menu</Offcanvas.Title>
          </Offcanvas.Header>
          <Offcanvas.Body>
            <Nav className="header-menu">
              <NavLink to="/home" className="nav-link" onClick={() => setShowNav(false)}>
                <IoMdHome /> Home
              </NavLink>
              <NavLink to="/cart" className="nav-link" onClick={() => setShowNav(false)}>
                <IoMdCart /> Cart
              </NavLink>
              <NavLink to="/add-product" className="nav-link" onClick={() => setShowNav(false)}>
                <MdSell /> Post
              </NavLink>
              {!isLoggedIn ? (
                <NavLink to="/login" className="nav-link" onClick={() => setShowNav(false)}>
                <IoLogIn /> Login | Register
              </NavLink>
              ) : (
                <NavLink to="/profile" className="nav-link" onClick={() => setShowNav(false)}>
                <FaUser 
                /> Profile
              </NavLink>
              )}
            </Nav>
          </Offcanvas.Body>
        </Navbar.Offcanvas>
      </Container>
    </Navbar>
  );
};

export default MyNavbar;
