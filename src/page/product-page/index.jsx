import React, { useEffect, useState } from "react";
import ProductDetails from "../../components/prod-components/product-info";
import RecommendedProducts from "../../components/recomended-prod";
import ReviewsSection from "../../components/prod-components/reviews";
import ImageinPageSlider from "../../components/prod-components/images-silder";
import Heading from "../../components/titles";
import { useParams } from "react-router-dom";
import useProductService from "../../service/productService";
import useReviewService from "../../service/reviewService";
import { Alert, Spinner } from "react-bootstrap";
import "./style.scss";

const ProductPage = () => {
  const { getRecommendedProducts } = useProductService();
  const { getReviewsByProduct } = useReviewService();
  const { id } = useParams();
  const { getProductById, loadingStatus } = useProductService();
  const [product, setProduct] = useState({});
  const [reviews, setReviews] = useState([]);
  const [recomendedProducts, setRecomendedProducts] = useState([]);

  useEffect(() => {
    getProductById(id, setProduct);
    getRecommendedProducts(setRecomendedProducts);
    getReviewsByProduct(id, setReviews);
  }, []);
  const renderProduct = () => {
    switch (loadingStatus) {
      case "pending":
        return (
          <div className="loading-container product-page">
            <Spinner animation="border" variant="primary" />
          </div>
        );
      case "loaded":
        return (
          <>
            <div className="container mt-5 product-page">
              <div className="row preview-wrapper">
                <div className="col-lg-6">
                  <ImageinPageSlider images={product.images} />
                </div>
                <div className="col-lg-6">
                  <ProductDetails product={product} />
                </div>
              </div>
              {recomendedProducts && recomendedProducts.length > 5 && (
                <>
                  <Heading level={2} color="#007bff" align="center">
                    Recommended Products
                  </Heading>
                  <RecommendedProducts
                    title={"Recommended Products"}
                    recomended={true}
                    products={recomendedProducts}
                  />
                </>
              )}
              <ReviewsSection reviews={reviews} rating={reviews.rating} />
            </div>
          </>
        );
      case "error":
        return <Alert variant="danger">Error loading Product.</Alert>;
      default:
        return (
          <div className="loading-container product-page">
            <Spinner animation="border" variant="primary" />
          </div>
        );
    }
  };

  return renderProduct();
};

export default ProductPage;
