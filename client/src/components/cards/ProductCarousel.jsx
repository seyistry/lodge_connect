import 'react-responsive-carousel/lib/styles/carousel.min.css'; // requires a loader
import { Carousel } from 'react-responsive-carousel';

export default function ProductCarousel({ image }) {
  return (
    <div>
      <img src={image} className="h-[50] lg:h-[80vh] w-[100%] object-contain" />
    </div>
  );
}
