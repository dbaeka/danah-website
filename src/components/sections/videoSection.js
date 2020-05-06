import React from "react";
import addedStyle from "../../styles/css/style-react.module.css"

// reactstrap components
import {Button, Row, Container, Col, Card, CardBody, CardFooter, CardHeader, NavItem, NavLink} from "reactstrap";
import {faLongArrowAltRight} from '@fortawesome/free-solid-svg-icons'
import {FontAwesomeIcon} from '@fortawesome/react-fontawesome'
// core components

const VideoSection = () => {
    return (
        <div id="books"
             className="books-entry"
        >
            <Container>
                <div className="py-5">
                    <h3 className="text-center mb-5">BOOKS</h3>
                    <Row className="explore-entry">
                        <Col xs="12" md="6" lg="4" className="mb-5">
                            <div className="book-block text-center">
                                <a
                                    href=""
                                    className="book-short w-inline-block">
                                    <img
                                        src={require("../../images/spiritual_capital_book.jpg")}
                                        alt="" className="book-image"/>
                                </a>
                                <div className="mt-4 text-block">Spiritual Capital</div>
                                <Button outline
                                        className="mt-1">Learn More</Button>
                            </div>
                        </Col>
                        <Col xs="12" md="6" lg="4" className="mb-5">
                            <div className="book-block text-center">
                                <a
                                    href=""
                                    className="book-short w-inline-block">
                                    <img
                                        src={require("../../images/ql_book.jpg")}
                                        alt="" className="book-image"/>
                                </a>
                                <div className="mt-4 text-block">The Quantum Leader</div>
                                <Button outline
                                        className="mt-1">Learn More</Button>
                            </div>
                        </Col>
                        <Col xs="12" md="6" lg="4" className="mb-5">
                            <div className="book-block text-center">
                                <a
                                    href=""
                                    className="book-short w-inline-block">
                                    <img
                                        src={require("../../images/rewiring_book.jpg")}
                                        alt="" className="book-image"/>
                                </a>
                                <div className="mt-4 text-block">ReWiring the Corporate Brain</div>
                                <Button outline
                                        className="mt-1">Learn More</Button>
                            </div>
                        </Col>
                        <Col xs="12" md="6" lg="4" className="mb-5">
                            <div className="book-block text-center">
                                <a
                                    href=""
                                    className="book-short w-inline-block">
                                    <img
                                        src={require("../../images/sq1_book.jpg")}
                                        alt="" className="book-image"/>
                                </a>
                                <div className="mt-4 text-block">Connecting with our Spiritual Intelligence</div>
                                <Button outline
                                        className="mt-1">Learn More</Button>
                            </div>
                        </Col>
                        <Col xs="12" md="6" lg="4" className="mb-5">
                            <div className="book-block text-center">
                                <a
                                    href=""
                                    className="book-short w-inline-block">
                                    <img
                                        src={require("../../images/sq2_book.jpg")}
                                        alt="" className="book-image"/>
                                </a>
                                <div className="mt-4 text-block">Spiritual Intelligence: The Ultimate Intelligence</div>
                                <Button outline
                                        className="mt-1">Learn More</Button>
                            </div>
                        </Col>
                        <Col className="text-center" xs="12">
                            <a href="/" className="link-purple">View more</a>
                        </Col>
                    </Row>


                </div>
            </Container>
        </div>
    );
};

export default VideoSection;
