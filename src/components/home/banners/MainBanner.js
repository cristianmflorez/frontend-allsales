import React from "react";
import Carousel from 'react-bootstrap/Carousel';

function MainBanner(params) {
    return(
        
        <div className="d-none d-md-block m-0">
          <Carousel>
            <Carousel.Item interval={3000}>
              <img
                className="d-block w-100"
                src="./banner/banner1.jpg"
                alt="First slide"
              />
            </Carousel.Item>
            <Carousel.Item interval={3000}>
              <img
                className="d-block w-100"
                src="./banner/banner2.jpg"
                alt="Second slide"
              />
            </Carousel.Item>
            <Carousel.Item interval={3000}>
              <img
                className="d-block w-100"
                src="./banner/banner3.jpg"
                alt="Third slide"
              />
            </Carousel.Item>
            <Carousel.Item interval={3000}>
              <img
                className="d-block w-100"
                src="./banner/banner4.jpg"
                alt="Fourth slide"
              />
            </Carousel.Item>
          </Carousel>
        </div>
    )
}

export {MainBanner};