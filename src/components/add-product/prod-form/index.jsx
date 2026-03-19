import React, { useState, useEffect } from "react";
import { useForm } from "react-hook-form";
import { Form, Button, Container, Row, Col } from "react-bootstrap";
import "./style.scss";
import Heading from "../titles";
import useProductService from "../../service/productService";

const subCategories = {
  electronics: ["Smartphones", "Laptops", "Accessories", "Televisions"],
  clothing: [
    "Men's Clothing",
    "Women's Clothing",
    "Children's Clothing",
    "Footwear",
  ],
  beauty: ["Cosmetics", "Perfumes", "Skincare", "Manicure"],
  books: ["Fiction", "Textbooks", "Comics", "Science"],
  furniture: ["Tables", "Chairs", "Cabinets", "Sofas"],
  other: ["Miscellaneous"],
};

const additionalFields = {
  electronics: [
    { name: "brand", label: "Brand", type: "text", required: true },
    { name: "model", label: "Model", type: "text", required: true },
    {
      name: "warranty",
      label: "Warranty (months)",
      type: "number",
      required: false,
    },
    {
      name: "battery",
      label: "Battery Life (hours)",
      type: "number",
      required: false,
    },
    {
      name: "screenSize",
      label: "Screen Size (inches)",
      type: "number",
      required: false,
    },
  ],
  clothing: [
    {
      name: "gender",
      label: "Gender",
      type: "select",
      options: ["Men", "Women", "Children"],
      required: true,
    },
    { name: "size", label: "Size", type: "text", required: true },
    { name: "color", label: "Color", type: "text", required: true },
    { name: "material", label: "Material", type: "text", required: false },
    { name: "brand", label: "Brand", type: "text", required: false },
  ],
  beauty: [
    { name: "brand", label: "Brand", type: "text", required: true },
    { name: "skinType", label: "Skin Type", type: "text", required: false },
    {
      name: "expirationDate",
      label: "Expiration Date",
      type: "date",
      required: true,
    },
    {
      name: "ingredients",
      label: "Key Ingredients",
      type: "text",
      required: false,
    },
  ],
  books: [
    { name: "author", label: "Author", type: "text", required: true },
    { name: "publisher", label: "Publisher", type: "text", required: false },
    { name: "language", label: "Language", type: "text", required: true },
    { name: "pages", label: "Number of Pages", type: "number", required: true },
  ],
  furniture: [
    { name: "brand", label: "Brand", type: "text", required: false },
    {
      name: "dimensions",
      label: "Dimensions (LxWxH in cm)",
      type: "text",
      required: true,
    },
    { name: "weight", label: "Weight (kg)", type: "number", required: true },
    { name: "material", label: "Material", type: "text", required: true },
  ],
};

const ProductForm = (
  onSubmit,
  register,
  handleSubmit,
  watch,
  setValue,
  formState
) => {
  const selectedCategory = watch("category", "");
    const {errors} = formState;
  return (
    <Container className="product-form">
      <Form onSubmit={handleSubmit(onSubmit)} className="form-container">
        <h2 className="text-center mb-4">Add Product</h2>

        <Heading level={3}>Basic Information</Heading>
        <Row>
          <Col md={6}>
            <Form.Group className="mb-3">
              <Form.Label>Product Name</Form.Label>
              <Form.Control
                type="text"
                {...register("name", {
                  required: "This field is required",
                  maxLength: 100,
                })}
                isInvalid={!!errors.name}
              />
            </Form.Group>
          </Col>
          <Col md={6}>
            <Form.Group className="mb-3">
              <Form.Label>Short Description</Form.Label>
              <Form.Control
                type="text"
                {...register("subtitle", {
                  required: "This field is required",
                  maxLength: 30,
                })}
                isInvalid={!!errors.subtitle}
              />
            </Form.Group>
          </Col>
        </Row>

        <Heading level={3}>Category</Heading>
        <Form.Group className="mb-3">
          <Form.Label>Category</Form.Label>
          <Form.Control
            as="select"
            {...register("category", { required: "This field is required" })}
            isInvalid={!!errors.category}
          >
            <option value="">Select a category</option>
            {Object.keys(subCategories).map((cat) => (
              <option key={cat} value={cat}>
                {cat}
              </option>
            ))}
          </Form.Control>
        </Form.Group>

        {selectedCategory && additionalFields[selectedCategory] && (
          <>
            <Heading level={3}>Additional Details</Heading>
            {additionalFields[selectedCategory].map((field) => (
              <Form.Group className="mb-3" key={field.name}>
                <Form.Label>{field.label}</Form.Label>
                {field.type === "select" ? (
                  <Form.Control
                    as="select"
                    {...register(
                      field.name,
                      field.required && { required: "This field is required" }
                    )}
                  >
                    <option value="">Select {field.label.toLowerCase()}</option>
                    {field.options.map((option) => (
                      <option key={option} value={option}>
                        {option}
                      </option>
                    ))}
                  </Form.Control>
                ) : (
                  <Form.Control
                    type={field.type}
                    {...register(
                      field.name,
                      field.required && { required: "This field is required" }
                    )}
                    isInvalid={!!errors[field.name]}
                  />
                )}
              </Form.Group>
            ))}
          </>
        )}

        <Button type="submit">Add Product</Button>
      </Form>
    </Container>
  );
};

export default ProductForm;
