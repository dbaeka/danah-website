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
        name: "Clarissa Hoppman",
        text: "I gained so much confidence in my ability to " +
            "connect and deepen my relationships with people. " +
            "It’s amazing how much easier it has been to meet new " +
            "people and create instant connections. I have the " +
            "exact same personality, the only thing that has changed " +
            "is my mindset and a few behaviors."
    },
    {
        name: "Clarissa Hoppman",
        text: "I gained so much confidence in my ability to " +
            "connect and deepen my relationships with people. " +
            "It’s amazing how much easier it has been to meet new " +
            "people and create instant connections. I have the " +
            "exact same personality, the only thing that has changed " +
            "is my mindset and a few behaviors."
    }
];

const TestimonialSection = () => {
    return (
        <div id="latest"
             className="latest-entry mb-5"
        >
            <h3 className="text-center font-weight-600 mb-3">TESTIMONIALS</h3>
            <Carousel
                cols={3}
                autoplay={10000}
                containerStyle={{maxWidth: '1300px', margin: '0 auto'}}
            >
                {testimonials.map(({name, text}, i) => (
                    <Carousel.Item key={i}>
                        <Card style={{
                            marginTop: "20px",
                            marginLeft: "8px"
                        }}>
                            <CardHeader>
                                <div className="testimony-title">{name}</div>
                            </CardHeader>
                            <CardBody className="testimony-text">{"\"" + text + "\""}</CardBody>
                        </Card>
                    </Carousel.Item>
                ))}
            </Carousel>
        </div>
    );
};

export default TestimonialSection;
