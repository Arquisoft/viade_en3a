import React from 'react';
import Carousel from 'react-bootstrap/Carousel';


function WelcomeCarousel(props) {
    return (
        <Carousel>
        <Carousel.Item>
            <img
            className="d-block w-100"
            src="car_img1.jpeg"
            alt="First slide"
            style={{width: "540px", height:"auto", maxWidth:"100%"}}
            />
            <Carousel.Caption>
            <h3>Welcome to Viade</h3>
            <p>Your routes app</p>
            </Carousel.Caption>
        </Carousel.Item>
        <Carousel.Item>
            <img
            className="d-block w-100"
            src="car_img2.jpg"
            alt="Second slide"
            style={{width: "540px", height:"auto", maxWidth:"100%"}}
            />

            <Carousel.Caption>
            <h3>Store your routes, create new ones</h3>
            <p>High versatility</p>
            </Carousel.Caption>
        </Carousel.Item>
        </Carousel>
    );
}

export default WelcomeCarousel;