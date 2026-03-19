import { Carousel, Container } from "react-bootstrap";
import e1 from "../../assets/cover/pc1.jpg"
import e2 from "../../assets/cover/pc2.png"
import e3 from "../../assets/cover/pc3.jpg"
import e16 from "../../assets/cover/pc2.jpeg"
import e4 from "../../assets/cover/pc4.jpg"
import e5 from "../../assets/cover/pc5.jpg"
import e6 from "../../assets/cover/b1.jpeg"
import e7 from "../../assets/cover/b3.jpg"
import e8 from "../../assets/cover/cl1.jpeg"
import e9 from "../../assets/cover/cl2.jpg"
import e10 from "../../assets/cover/cl3.jpeg"
import e11 from "../../assets/cover/օ1.jpg"
import e12 from "../../assets/cover/o2.jpg"
import e13 from "../../assets/cover/f1.jpg"
import e14 from "../../assets/cover/f2.jpg"
import e15 from "../../assets/cover/f3.jpg"
import "./style.scss";

// 🔹 Данные для промо по категориям
const promoData = {
  default: [
    {
      image: e2,
    
    },
    {
      image: e16,
      
    },
    {
      image: e4,
    
    },
    {
      image: e5,
   
    },
  ],
  electronics: [
    {
      image: e2,
    
    },
    {
      image: e16,
      
    },
    {
      image: e4,
    
    },
    {
      image: e5,
   
    },
  ],
  
  beauty: [
    {
      image: e6,
      
    },
    {
      image: e7,
   
    },
  ],
  
  clothing: [
    {
      image: e8,
     
    },
    {
      image: e9,
     
    },
    {
      image: e10,
     
    },
  ],
  books: [
    {
      image: e12,
      
    },
    {
      image: e11,
    
    },
  ],
  furniture: [
    {
      image: e13,
      
    },
    {
      image: e14,
    
    },
    {
      image: e15,
    
    },
  ],
};

const PromoSlider = ({ category }) => {
  // 🛠 Получаем слайды по категории или используем `default`
  const slides = promoData[category] || promoData.default;

  return (
    <Container className="mt-5" id="header">
      <Carousel>
        {slides.map((slide, index) => (
          <Carousel.Item key={index}>
            <img className="d-block w-100 rounded promo-slider-image" src={slide.image} alt={slide.title} />
            <Carousel.Caption>
              <h3>{slide.title}</h3>
              <p>{slide.description}</p>
            </Carousel.Caption>
          </Carousel.Item>
        ))}
      </Carousel>
    </Container>
  );
};

export default PromoSlider;
