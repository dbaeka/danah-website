import React from "react";
import addedStyle from "../../styles/css/style-react.module.css"
import Carousel from 'react-grid-carousel'

// reactstrap components
import {Button, Row, Container, Col, Card, CardBody, CardFooter, CardHeader, NavItem, NavLink} from "reactstrap";
// import {faBookmark} from '@fortawesome/free-solid-svg-icons'
import {faBookmark} from '@fortawesome/free-regular-svg-icons'
import {FontAwesomeIcon} from '@fortawesome/react-fontawesome'
// core components

const testimonials = [
    {
        image: "MIT_950.jpg"
    },
    {
        image: "mckinsey_950.jpg"
    },
    {
        image: "quote_1.png"
    },
    {
        image: "quote_2.png"
    }
];

const TestimonialSection = () => {
    return (
        <div id="latest"
             className="latest-entry mb-5"
        >
            <h3 className="pt-5 text-center font-weight-600 mb-3">TESTIMONIALS</h3>
            <Carousel
                containerClassName="text-center"
                cols={1}
                autoplay={5000}
                containerStyle={{maxWidth: '1300px', margin: '0 auto'}}
            >
                {testimonials.map(({image}, i) => (
                    <Carousel.Item key={i}>
                            <img className="full_image" src={require("../../images/" + image)}/>
                    </Carousel.Item>
                ))}
            </Carousel>
        </div>
    );
};

export default TestimonialSection;
