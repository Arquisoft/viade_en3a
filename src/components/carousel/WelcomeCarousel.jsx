import React from 'react';
import Carousel from 'react-bootstrap/Carousel';

import image1 from './../../assets/carouselImages/car_img1.jpeg';
import image2 from './../../assets/carouselImages/car_img2.jpg';

const containerStyle = { height: "93vh" };
const imageStyle = { width: "100%", height: "100%" };

function WelcomeCarousel(props) {
    return (
        <Carousel style={containerStyle}>
            <Carousel.Item style={containerStyle}>
                <img
                    className="d-block w-100"
                    src={image1}
                    alt="First slide"
                    style={imageStyle}
                />
                <Carousel.Caption>
                    <h3>Welcome to Viade</h3>
                    <p>Your routes app</p>
                </Carousel.Caption>
            </Carousel.Item>
            <Carousel.Item style={containerStyle}>
                <img
                    className="d-block w-100"
                    src={image2}
                    alt="Second slide"
                    style={imageStyle}
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