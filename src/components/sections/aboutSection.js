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
                        <Col xs="12" md="2" className="mb-5">
                            <div className="avia-image-container-inner" style={{width: "110px", height: "110px"}}>
                                <img
                                    className="avia_image"
                                    src={require("../../images/danah_profile.jpg")}
                                    alt="Penelope portrait" title="thumbnail"/>
                            </div>
                        </Col>
                        <Col xs="12" md="4">
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
                                <a href="/about" className="link-purple">Learn more</a>
                            </section>
                        </Col>
                        <Col className="featured" xs="12" md="6">
                            <div className="w-100 title">
                                Featured Posts
                            </div>
                            <Row className="mt-4">
                                <Col xs="12" className="mb-3">
                                    <Row className="ml-md-3 mb-2 pb-0 jet-posts__inner-box">
                                        <Col xs="4" className="post-thumbnail pt-4" style={{backgroundColor: "#fff"}}>
                                            <a
                                                href=""
                                                className="post-thumbnail__link">
                                                <img className="post-thumbnail__img_wp-post-image"
                                                     src={require("../../images/blog_placeholder.png")}
                                                     alt="Stop Ignoring These 7 Inspiring Truths"
                                                     width="500" height="660"/>
                                            </a>
                                        </Col>
                                        <Col xs="8" className="jet-posts__inner-content">
                                            <h4 className="entry-title">
                                                <a
                                                    href="">
                                                    A World Without Trust
                                                </a>
                                            </h4>
                                            <div className="post-meta">
                                        <span className="post__date post-meta__item">
                                                <time dateTime="2018-10-14T10:18:12+00:00"
                                                      title="2018-10-14T10:18:12+00:00">October 14, 2018</time>
                                        </span>
                                            </div>
                                            <div className="entry-excerpt">
                                                I was raised by my grandparents during the 1950’s in the American
                                                Midwest...
                                            </div>
                                            <div className="jet-more-wrap">
                                                <a
                                                    href="http://themes.pixelwars.org/efor/demo-02/stop-ignoring-these-7-inspiring-truths-and-become-your-best-self-today/"
                                                    className="btn btn-primary elementor-button elementor-size-md jet-more">
                                                    <span className="btn__text">Read More</span>
                                                </a>
                                            </div>
                                        </Col>
                                    </Row>
                                </Col>
                                <Col xs="12" className="ml-md-3 mb-3 pb-0">
                                    <div className="jet-posts__inner-box pb-0">
                                        <div className="jet-posts__inner-content">
                                            <h4 className="entry-title pt-0">
                                                <a
                                                    style={{fontSize: "16px"}}
                                                    href="">
                                                    A World Without Trust
                                                </a>
                                            </h4>
                                            <div className="entry-excerpt pb-0">
                                                I was raised by my grandparents during the 1950’s in the American
                                                Mid... <a
                                                href=""
                                                className="text-link">
                                                Read More
                                            </a>
                                            </div>
                                        </div>
                                    </div>
                                </Col>
                                <Col xs="12" className="ml-md-3 mb-2 pb-0">
                                    <div className="jet-posts__inner-box pb-0">
                                        <div className="jet-posts__inner-content">
                                            <h4 className="entry-title pt-0">
                                                <a
                                                    style={{fontSize: "16px"}}
                                                    href="">
                                                    A World Without Trust
                                                </a>
                                            </h4>
                                            <div className="entry-excerpt pb-0">
                                                I was raised by my grandparents during the 1950’s in the American
                                                Mid... <a
                                                href=""
                                                className="text-link">
                                                Read More
                                            </a>
                                            </div>

                                        </div>
                                    </div>
                                </Col>
                            </Row>
                        </Col>
                    </Row>
                </div>
            </Container>
        </div>
    );
};

export default AboutSection;
