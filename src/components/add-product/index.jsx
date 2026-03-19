import React, { useState, useEffect } from "react";
import { useForm, Controller } from "react-hook-form";
import { Form, Button, Container, Row, Col } from "react-bootstrap";
import "./style.scss";
import ImageinPageSlider from "../prod-components/images-silder";
import ProductDetails from "../prod-components/product-info";
import Heading from "../titles";
import useProductService from "../../service/productService";
import { useParams } from "react-router-dom";

const subCategories = {
  electronics: ["Smartphones", "Laptops", "Accessories", "TVs"],
  clothing: ["Men's Clothing", "Women's Clothing", "Children's Clothing", "Shoes"],
  beauty: ["Cosmetics", "Perfumes", "Skincare", "Manicure"],
  books: ["Fiction", "Textbooks", "Comics", "Science"],
  furniture: ["Tables", "Chairs", "Wardrobes", "Sofas"],
  other: ["Miscellaneous"],
};

const categoryAttributes = {
  electronics: ["warranty", "deliveryType"],
  // clothing: ["size", "color"],
  beauty: ["countryOfOrigin"],
  books: ["author", "language"],
  furniture: ["material"],
};

const optionsData = {
  size: ["XS", "S", "M", "L", "XL"],
  color: ["Red", "Blue", "Black", "White", "Green"],
  material: ["Wood", "Metal", "Plastic", "Cotton", "Leather"],
  warranty: ["6 months", "1 year", "2 years"],
  deliveryType: ["Standard", "Express"],
  countryOfOrigin: ["USA", "China", "Germany"],
  author: ["Author1", "Author2", "Author3"],
  language: ["English", "French", "Spanish"],
};

const ProductForm = () => {
  const { id } = useParams();
  const [isEdit, setIsEdit] = useState(false);
  const [product, setProduct] = useState(false);
  const { addProduct, getProductById, editProduct } = useProductService();
  const {
    register,
    handleSubmit,
    watch,
    setValue,
    control,
    formState: { errors },
  } = useForm();

  const filterProductForForm = (product) => {
    const allowedFields = [
      "name", "subtitle", "description", "price", "discount",
      "category", "subCategory", "brand", "size", "color", "material",
      "deliveryType", "countryOfOrigin", "author", "language",
      "warranty", "stock", "tags", "tradable", "images"
    ];
    const filtered = {};
    for (const key of allowedFields) {
      if (key in product) filtered[key] = product[key];
    }
    return filtered;
  };

  const [imagePreviews, setImagePreviews] = useState([]);
  const [showPreview, setShowPreview] = useState(false);
  const selectedCategory = watch("category", "");
  const watchImages = watch("images", []);

  useEffect(() => {
    if (id) {
      setIsEdit(true);
      getProductById(id, (data) => {
        const cleaned = filterProductForForm(data);
        setProduct(cleaned);
        Object.entries(cleaned).forEach(([key, value]) => {
          if (key === "tags" && Array.isArray(value)) {
            setValue("tags", value.join(", "));
          } else {
            setValue(key, value);
          }
        });
        if (cleaned.images?.length) {
          setImagePreviews(cleaned.images);
        }
      });
    }
  }, [id]);

  useEffect(() => {
    if (selectedCategory) setValue("subCategory", "");
  }, [selectedCategory, setValue]);

  useEffect(() => {
    if (watchImages?.length > 0) {
      const files = Array.from(watchImages);
      const previews = files.map((file) => {
        if (typeof file === "string") return Promise.resolve(file);
        if (file instanceof File || file instanceof Blob) {
          const reader = new FileReader();
          return new Promise((resolve) => {
            reader.onloadend = () => resolve(reader.result);
            reader.readAsDataURL(file);
          });
        }
        return Promise.resolve(null);
      });
      Promise.all(previews).then((results) => {
        setImagePreviews(results.filter(Boolean));
      });
    }
  }, [watchImages]);

  const onSubmit = (data) => {
    if (data.tags) data.tags = data.tags.split(",").map((tag) => tag.trim());
    isEdit ? editProduct(data, id) : addProduct(data);
  };

  const testProd = {
    name: watch("name", product?.name || "Product Name"),
    subtitle: watch("subtitle", product?.subtitle || "Short Description"),
    description: watch("description", product?.description || "Description"),
    price: watch("price", product?.price || ""),
    discount: watch("discount", product?.discount || "0"),
    category: selectedCategory || product?.category || "Not Selected",
    subCategory: watch("subCategory", product?.subCategory || ""),
    stock: watch("stock", product?.stock || "0"),
    tags: watch("tags", product?.tags?.join(",") || "").split(","),
    tradable: watch("tradable", product?.tradable || false),
    images: imagePreviews,
  };

  return (
    <Container className="product-form">
      <Form onSubmit={handleSubmit(onSubmit)} className="form-container">
        <h2 className="text-center mb-4">Add Product</h2>

        <Row>
          <Col md={6}>
            <Form.Group className="mb-3">
              <Form.Label>Product Name</Form.Label>
              <Form.Control
                type="text"
                {...register("name", { required: "Product name is required" })}
              />
              {errors.name && <span className="text-danger">{errors.name.message}</span>}
            </Form.Group>
          </Col>
          <Col md={6}>
            <Form.Group className="mb-3">
              <Form.Label>Short Description</Form.Label>
              <Form.Control
                type="text"
                maxLength={30}
                {...register("subtitle", {
                  required: "Short description is required",
                  maxLength: {
                    value: 30,
                    message: "Maximum 30 characters allowed",
                  },
                })}
              />
              {errors.subtitle && <span className="text-danger">{errors.subtitle.message}</span>}
            </Form.Group>
          </Col>
        </Row>

        <Form.Group className="mb-3">
          <Form.Label>Description</Form.Label>
          <Form.Control
            as="textarea"
            rows={3}
            {...register("description", { required: "Description is required" })}
          />
          {errors.description && <span className="text-danger">{errors.description.message}</span>}
        </Form.Group>

        <Row>
          <Col md={4}>
            <Form.Group className="mb-3">
              <Form.Label>Price</Form.Label>
              <Form.Control
                type="number"
                {...register("price", { required: "Price is required" })}
              />
              {errors.price && <span className="text-danger">{errors.price.message}</span>}
            </Form.Group>
          </Col>
          <Col md={4}>
            <Form.Group className="mb-3">
              <Form.Label>Stock</Form.Label>
              <Form.Control
                type="number"
                {...register("stock", { required: "Stock quantity is required" })}
              />
              {errors.stock && <span className="text-danger">{errors.stock.message}</span>}
            </Form.Group>
          </Col>
          <Col md={4}>
            <Form.Group className="mb-3">
              <Form.Label>Discount (%)</Form.Label>
              <Form.Control type="number" {...register("discount")} />
            </Form.Group>
          </Col>
        </Row>

        <Row>
          <Col md={6}>
            <Form.Group className="mb-3">
              <Form.Label>Category</Form.Label>
              <Form.Select {...register("category", { required: "Category is required" })}>
                <option value="">Select Category</option>
                {Object.keys(subCategories).map((cat) => (
                  <option key={cat} value={cat}>{cat}</option>
                ))}
              </Form.Select>
              {errors.category && <span className="text-danger">{errors.category.message}</span>}
            </Form.Group>
          </Col>

          {selectedCategory && (
            <Col md={6}>
              <Form.Group className="mb-3">
                <Form.Label>Subcategory</Form.Label>
                <Form.Select {...register("subCategory", { required: "Subcategory is required" })}>
                  <option value="">Select Subcategory</option>
                  {subCategories[selectedCategory]?.map((sub) => (
                    <option key={sub} value={sub}>{sub}</option>
                  ))}
                </Form.Select>
                {errors.subCategory && <span className="text-danger">{errors.subCategory.message}</span>}
              </Form.Group>
            </Col>
          )}
        </Row>

        {categoryAttributes[selectedCategory]?.map((attr) => (
          <Form.Group className="mb-3" key={attr}>
            <Form.Label>{attr.charAt(0).toUpperCase() + attr.slice(1)}</Form.Label>
            <Form.Select {...register(attr)}>
              <option value="">Select {attr}</option>
              {optionsData[attr].map((opt) => (
                <option key={opt} value={opt}>{opt}</option>
              ))}
            </Form.Select>
          </Form.Group>
        ))}

        <Form.Group className="mb-3">
          <Form.Label>Tags (comma-separated)</Form.Label>
          <Form.Control type="text" {...register("tags")} />
        </Form.Group>

        <Form.Check type="checkbox" label="Tradable" {...register("tradable")} />

        <Form.Group className="mb-3">
          <Form.Label>Images</Form.Label>
          <Form.Control
            type="file"
            multiple
            {...register("images", {
              required: !isEdit && "At least one image is required",
            })}
          />
          {errors.images && <span className="text-danger">{errors.images.message}</span>}
        </Form.Group>

        <div className="d-flex gap-3 mt-3">
          <Button variant="secondary" onClick={() => setShowPreview(!showPreview)}>
            {showPreview ? "Hide Preview" : "Show Preview"}
          </Button>
          <Button type="submit" variant="danger">
            {isEdit ? "Save Changes" : "Add Product"}
          </Button>
        </div>
      </Form>

      {showPreview && testProd.images.length > 0 && (
        <div className="preview-section mt-4">
          <Heading level={2} align="center">Product Preview</Heading>
          <Row>
            <Col lg={6}><ImageinPageSlider images={testProd.images} /></Col>
            <Col lg={6}><ProductDetails product={testProd} /></Col>
          </Row>
        </div>
      )}
    </Container>
  );
};

export default ProductForm;
