import React, { useState, useEffect } from "react";
import { useForm, Controller } from "react-hook-form";
import { Form, Button, Dropdown } from "react-bootstrap";
import "./style.scss";

const categoryFilters = {
  electronics: [ "warranty", "deliveryType", "tags"],
  clothing: ["size", "color",  "tags"],
  beauty: ["countryOfOrigin", "tags"],
  books: ["language",  "tags"],
  furniture: [ "color", "tags"],
  all: [ "tags"],
  other: [],
};

const filterOptions = {
  size: ["XS", "S", "M", "L", "XL"],
  color: ["Red", "Blue", "Black", "White", "Green", "Yellow"],
  // brand: ["BrandA", "BrandB", "BrandC"],
  deliveryType: ["Standard", "Express", "Pickup"],
  countryOfOrigin: ["USA", "China", "Germany", "France"],
  author: ["Author1", "Author2", "Author3"],
  language: ["English", "French", "Spanish", "German"],
  warranty: ["6 months", "1 year", "2 years"],
  type: ["Model", "Physical"],
  tags: ["New", "Popular", "Eco", "Limited"],
};

const sortOptions = [
  { key: "price-asc", label: "Price: Low to High" },
  { key: "price-desc", label: "Price: High to Low" },
  { key: "newest", label: "Newest Arrivals" },
];

const ProductFilter = ({ setFilters, category, setSortOption }) => {
  const [availableFilters, setAvailableFilters] = useState([]);
  const [likedOnly, setLikedOnly] = useState(false);
  const [myProductsOnly, setMyProductsOnly] = useState(false);
  const [selectedSort, setSelectedSort] = useState(sortOptions[2]); // Default: Newest

  const { control, handleSubmit, watch, reset } = useForm({
    defaultValues: {
      priceRange: 500,
      inStock: false,
      discounts: false,
      liked: false,
    },
  });

  const priceRange = watch("priceRange");

  const onSubmit = (data) => {
    setFilters({
      ...data,
      liked: likedOnly,
      myProducts: myProductsOnly,
    });
  };

  const handleSortChange = (sortKey) => {
    const selectedOption = sortOptions.find((opt) => opt.key === sortKey);
    setSelectedSort(selectedOption);
    setSortOption(sortKey);
  };

  const toggleLiked = () => {
    setLikedOnly((prev) => !prev);
  };

  const toggleMyProducts = () => {
    setMyProductsOnly((prev) => !prev);
  };

  useEffect(() => {
    reset();
    setAvailableFilters(categoryFilters[category] || []);
  }, [category]);

  return (
    <div className="product-filter p-3 rounded">
      <h4>Filters</h4>
      <Form onSubmit={handleSubmit(onSubmit)}>
        {/* Price Range */}
        <Form.Group className="mb-4" controlId="priceRange">
          <Form.Label>
            Price Range: <strong>${priceRange}</strong>
          </Form.Label>
          <Controller
            name="priceRange"
            control={control}
            render={({ field }) => (
              <Form.Range {...field} min={0} max={5000} step={50} />
            )}
          />
          <div className="d-flex justify-content-between">
            <small>$0</small>
            <small>$5000</small>
          </div>
        </Form.Group>

        {/* Liked Products */}
        <Button
          variant={likedOnly ? "danger" : "outline-danger"}
          className="w-100 liked-button mb-2"
          onClick={toggleLiked}
        >
          {likedOnly ? "❤️ Liked Products" : "🤍 Show Liked Only"}
        </Button>

        {/* My Products Button */}
        <Button
          className={`w-100 mb-3 ${myProductsOnly ? "my-products-active" : "my-products-inactive"}`}
          onClick={toggleMyProducts}
        >
          {myProductsOnly ? "✔️ My Products" : "📦 Show My Products"}
        </Button>

        {/* Dynamic Filters */}
        {availableFilters.map((filterKey) => (
          <Form.Group className="mb-3" key={filterKey} controlId={filterKey}>
            <Form.Label>
              {filterKey.charAt(0).toUpperCase() + filterKey.slice(1)}
            </Form.Label>
            <Controller
              name={filterKey}
              control={control}
              defaultValue="all"
              render={({ field }) => (
                <Form.Select {...field} className="filter-input">
                  <option value="all">All</option>
                  {filterOptions[filterKey].map((opt) => (
                    <option key={opt} value={opt.toLowerCase()}>
                      {opt}
                    </option>
                  ))}
                </Form.Select>
              )}
            />
          </Form.Group>
        ))}

        {/* Checkboxes */}
        <Form.Group className="mb-3" controlId="inStock">
          <Controller
            name="inStock"
            control={control}
            render={({ field }) => (
              <Form.Check type="checkbox" label="In Stock Only" {...field} />
            )}
          />
        </Form.Group>
        <Form.Group className="mb-3" controlId="discounts">
          <Controller
            name="discounts"
            control={control}
            render={({ field }) => (
              <Form.Check type="checkbox" label="With Discounts" {...field} />
            )}
          />
        </Form.Group>

        {/* Sort Options */}
        <h5 className="mt-3">Sort By</h5>
        <Dropdown className="mb-3">
          <Dropdown.Toggle variant="danger" className="w-100">
            {selectedSort.label}
          </Dropdown.Toggle>
          <Dropdown.Menu>
            {sortOptions.map(({ key, label }) => (
              <Dropdown.Item key={key} onClick={() => handleSortChange(key)}>
                {label}
              </Dropdown.Item>
            ))}
          </Dropdown.Menu>
        </Dropdown>

        <Button type="submit" variant="danger" className="w-100">
          Apply Filters
        </Button>
      </Form>
    </div>
  );
};

export default ProductFilter;
