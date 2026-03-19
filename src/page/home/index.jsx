import React, { useEffect, useState } from "react";
import ProductFilter from "../../components/prod-filter";
import ProductList from "../../components/product-list";
import { Col, Container, Row, Spinner, Alert } from "react-bootstrap";
import RecommendedProducts from "../../components/recomended-prod";
import Pagination from "../../components/pagination";
import "./style.scss";
import Heading from "../../components/titles";
import PromoSlider from "../../components/promo";
import useProductService from "../../service/productService";
import MyNavbar from "../../components/header";

const HomePage = ({ search, setSearch, category }) => {
  const { getProducts, getDiscountedProducts, getRecommendedProducts, loadingStatus } = useProductService();

  const [products, setProducts] = useState([]);
  const [recomendedProducts, setRecomendedProducts] = useState([]);
  const [discountedProducts, setDiscountedProducts] = useState([]);
  const [totalPages, setTotalPages] = useState(1);
  const [currentPage, setCurrentPage] = useState(1);
  const [filters, setFilters] = useState({});
  const [sortOption, setSortOption] = useState("default");

  const productsPerPage = 20;

  useEffect(() => {
    getProducts(setProducts, setTotalPages, filters, currentPage, productsPerPage, sortOption, search, category);
  }, [currentPage, filters, search, sortOption, category]);

  useEffect(() => {
    getRecommendedProducts(setRecomendedProducts, category);
  }, [category]);

  useEffect(() => {
    getDiscountedProducts(setDiscountedProducts, category);
  }, [category]);

  const handlePageClick = ({ selected }) => {
    setCurrentPage(selected + 1);
  };

  // 🔥 Функция рендеринга товаров (использует switch-case)
  const renderProducts = () => {
    switch (loadingStatus) {
      case "loading":
        return (
          <div className="loading-container">
            <Spinner animation="border" variant="primary" />
          </div>
        );
      case "loaded":
        return <ProductList products={products} />;
      case "error":
        return <Alert variant="danger">Error loading products.</Alert>;
      default:
        return <div className="loading-container">
        <Spinner animation="border" variant="primary" />
      </div>;
    }
  };

  return (
    <>
      <Container className="mt-4">
        <PromoSlider category={category} />

        {/* 🔹 Recommended Products (Старая логика) */}
        {recomendedProducts.length > 5 && (
          <>
            <Heading level={2} color="#007bff" align="center">
              Recommended Products
            </Heading>
            <RecommendedProducts title={"Recommended Products"} recomended={true} products={recomendedProducts} />
          </>
        )}

        {/* 🔹 Discounted Products (Старая логика) */}
        {discountedProducts.length > 5 && (
          <>
            <Heading level={2} color="#FB8A00" align="center">
              Today's Deals
            </Heading>
            <RecommendedProducts title={"Today's deals"} recomended={false} type={"discount"} products={discountedProducts} />
          </>
        )}

        {/* 🔹 Product List (новая логика с switch-case) */}
        <div className="product-list">
          <Row>
            <Col lg={3} md={4} className="mb-4">
              <ProductFilter setFilters={setFilters} setSearch={setSearch} category={category} setSortOption={setSortOption} />
            </Col>
            <Col lg={9} md={8}>{renderProducts()}</Col>
            {totalPages > 1 && (
              <Pagination currentProducts={products} pageCount={totalPages} handlePageClick={handlePageClick} />
            )}
          </Row>
        </div>
      </Container>
    </>
  );
};

export default HomePage;
