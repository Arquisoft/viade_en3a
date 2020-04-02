import React from 'react';
import Carousel from 'react-bootstrap/Carousel';
import { useTranslation } from 'react-i18next';

import image1 from './../../assets/carouselImages/car_img1.jpeg';
import image2 from './../../assets/carouselImages/car_img2.jpg';

const containerStyle = { height: "93vh" };
const imageStyle = { width: "100%", height: "100%" };

function WelcomeCarousel(props) {
    const { t } = useTranslation();
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
                    <h3>{t('carouselWelcome')}</h3>
                    <p>{t('carouselText1')}</p>
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
                    <h3>{t('carouselText2')}</h3>
                    <p>{t('carouselText3')}</p>
                </Carousel.Caption>
            </Carousel.Item>
        </Carousel>
    );
}

export default WelcomeCarousel;