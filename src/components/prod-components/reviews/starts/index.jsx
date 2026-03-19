import ReactStars from "react-stars";

const ReviewStars = ({ rating }) => {
  return (
    <ReactStars
      count={5}
      value={rating}
      size={24}
      half={true} // Enables half-star ratings
      edit={false} // Read-only stars
      color2={"#ffd700"} // Star color
    />
  );
};

export default ReviewStars;
