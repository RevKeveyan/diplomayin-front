// import React from 'react';
// import { Card, Button } from 'react-bootstrap';
// import { FaHeart, FaShoppingCart, FaCheckCircle } from 'react-icons/fa'; // Иконки
// import useProductService from '../../service/productService';

// const ProductCard = ({ product }) => {

//   const {likeProduct} = useProductService();

//   const handleClick = (event,data) => {
//     console.log("click");
    
//     event.stopPropagation(); 
//     likeProduct(data)
//   };
//   return (
//     <Card>
//       <Card.Img variant="top" src="https://cdn.futura-sciences.com/cdn-cgi/image/width=1024,quality=50,format=auto/sources/images/AI-creation.jpg" />
//       <Card.Body>
//         <Card.Title>{product.name}</Card.Title>
//         <Card.Text>{product.description}</Card.Text>
//         <Card.Text><strong>{product.price}</strong></Card.Text>

//         <div className="d-flex justify-content-between">
//           <Button variant="outline-danger" onClick={(e)=>handleClick(e, {productId:product._id})}>
//             <FaHeart /> Like
//           </Button>
//           <Button variant="outline-primary">
//             <FaShoppingCart /> Add to Cart
//           </Button>
//           <Button variant="outline-success">
//             <FaCheckCircle /> Buy Now
//           </Button>
//         </div>
//       </Card.Body>
//     </Card>
//   );
// };

// export default ProductCard;
