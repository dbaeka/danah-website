import React from "react";

// reactstrap components
import {Button, Row, Container, Col} from "reactstrap";


// core components

const AboutSection = () => {
    return (
        <div id="intro"
             className=""
        >
            <Container>
                <div className="py-130">
                    <Row className="about-entry">
                        <Col xs="12" md="4" className="mb-5">
                            <div className="avia-image-container-inner" style={{width: "220px", height: "220px"}}>
                                <img
                                    className="avia_image"
                                    src={require("../../images/danah_profile.jpg")}
                                    alt="Penelope portrait" title="thumbnail"/>
                            </div>
                        </Col>
                        <Col xs="12" md="8">
                            <div className="">
                                <h3 className="title">
                                    Who is Danah </h3>
                            </div>
                            <section className="textblock_section">
                                <div className="avia_textblock">
                                    <p>Danah Zohar is a management thought leader, physicist, philosopher and author.
                                        Her best-selling books include Spiritual Capital: Wealth We Can Live By and SQ –
                                        Spiritual Intelligence, The Ultimate Intelligence, which constitute
                                        ground-breaking work on SQ, spiritual intelligence and spiritual capital;
                                        ReWiring the Corporate Brain, The Quantum Society and The Quantum Self, previous
                                        work which extends the language and principles of quantum physics into a new
                                        understanding of human consciousness, psychology and social organization,
                                        particularly the organization of companies.</p>
                                </div>
                                <a href="/" className="link-purple">Learn more</a>
                            </section>
                        </Col>
                    </Row>
                </div>
            </Container>
        </div>
    );
};

export default AboutSection;
