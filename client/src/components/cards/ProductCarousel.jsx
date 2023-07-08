import 'react-responsive-carousel/lib/styles/carousel.min.css'; // requires a loader
import { Carousel } from 'react-responsive-carousel';

export default function ProductCarousel() {
  return (
    <Carousel infiniteLoop={true}>
      <div>
        <img src="https://source.unsplash.com/random/800x450" />
        <p className="legend">Image 1</p>
      </div>
      <div>
        <img src="https://source.unsplash.com/random/800x450" />
        <p className="legend">Image 2</p>
      </div>
      <div>
        <img src="https://source.unsplash.com/random/800x450" />
        <p className="legend">Image 3</p>
      </div>
    </Carousel>
  );
}
