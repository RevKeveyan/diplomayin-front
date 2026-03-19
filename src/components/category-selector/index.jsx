import React from "react";
import { Dropdown, DropdownButton } from "react-bootstrap";

const CATEGORIES = [
  { key: "all", label: "All Categories" },
  { key: "electronics", label: "Electronics" },
  { key: "fashion", label: "Fashion" },
  { key: "home", label: "Home" },
  { key: "accessories", label: "Accessories" },
  { key: "beauty", label: "Beauty" },
];

const CategorySelector = ({ selectedCategory, setSelectedCategory }) => {
  return (
    <DropdownButton
      id="category-dropdown"
      title={CATEGORIES.find((c) => c.key === selectedCategory)?.label || "Select Category"}
      variant="outline-light"
      className="category-dropdown"
      onSelect={(e) => setSelectedCategory(e)}
    >
      {CATEGORIES.map((category) => (
        <Dropdown.Item key={category.key} eventKey={category.key}>
          {category.label}
        </Dropdown.Item>
      ))}
    </DropdownButton>
  );
};

export default CategorySelector;
