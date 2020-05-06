import React from "react";
import addedStyle from "../../styles/css/style-react.module.css"
import Carousel from 'react-grid-carousel'

// reactstrap components
import {Button, Row, Container, Col, Card, CardBody, CardFooter, CardHeader, NavItem, NavLink} from "reactstrap";
// import {faBookmark} from '@fortawesome/free-solid-svg-icons'
import {faBookmark} from '@fortawesome/free-regular-svg-icons'
import {FontAwesomeIcon} from '@fortawesome/react-fontawesome'
// core components

const GallerySection = () => {
    return (
        <div id="gallery"
             className="gallery-entry"
        >
            <Carousel
                cols={6}
                rows={1}
                gap={0}
                responsiveLayout={[
                    {
                        breakpoint: 943,
                        cols: 4,
                        rows: 2,
                        gap: 0,
                        loop: true,
                        autoplay: 6000
                    },
                    {
                        breakpoint: 768,
                        cols: 4,
                        rows: 3,
                        gap: 0,
                        loop: true,
                        autoplay: 6000
                    },
                    {
                        breakpoint: 620,
                        cols: 2,
                        rows: 2,
                        gap: 0,
                        loop: true,
                        autoplay: 6000
                    },
                    {
                        breakpoint: 400,
                        cols: 1,
                        rows: 2,
                        gap: 0,
                        loop: true,
                        autoplay: 6000
                    }
                ]}
                loop={true}
                autoplay={6000}
                mobileBreakpoint={0}
            >
                {[...Array(14)].map((_, i) => (
                    <Carousel.Item key={i}>
                        <img src={`https://picsum.photos/200/160?random=${i}`}/>
                    </Carousel.Item>
                ))}
            </Carousel>
        </div>
    );
};

export default GallerySection;
