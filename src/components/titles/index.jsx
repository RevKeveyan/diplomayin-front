import React from "react";
import PropTypes from "prop-types";
import "./styles.scss";
const Heading = ({ level, children, color, align, className, style }) => {
  const HeadingTag = `h${level}`;

  return (
    <HeadingTag
      className={`heading heading-${level} ${className}`}
      style={{
        color,
        textAlign: align,
        ...style,
      }}
    >
      {children}
    </HeadingTag>
  );
};

Heading.propTypes = {
  level: PropTypes.oneOf([2, 3, 4]).isRequired,
  children: PropTypes.node.isRequired,
  color: PropTypes.string,
  align: PropTypes.oneOf(["left", "center", "right"]),
  className: PropTypes.string, 
  style: PropTypes.object, 
};

Heading.defaultProps = {
  color: "#1A1A25", 
  align: "left",
  className: "",
  style: {},
};

export default Heading;
