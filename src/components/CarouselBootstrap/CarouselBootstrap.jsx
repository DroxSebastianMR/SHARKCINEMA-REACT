import React from "react";
import Carousel from "react-bootstrap/Carousel";

export default function CarouselBootstrap({ slides }) {
  return (
    <Carousel fade>
      {slides.map((slide, idx) => (
        <Carousel.Item key={idx} interval={5000}>
          <img
            className="d-block w-100 carousel-img"
            src={slide.image}
            alt={slide.title}
          />
          <Carousel.Caption>
            <h3>{slide.title}</h3>
            <p>{slide.description}</p>
          </Carousel.Caption>
        </Carousel.Item>
      ))}
    </Carousel>
  );
}
