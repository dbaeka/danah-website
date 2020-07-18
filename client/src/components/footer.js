import {Link} from "gatsby"
import PropTypes from "prop-types"
import React, {useState} from "react"
import {

    Container,
    Row,
    Col,

} from "reactstrap"
import {FontAwesomeIcon} from '@fortawesome/react-fontawesome'
import {faLinkedin, faFacebookF, faTwitter} from '@fortawesome/free-brands-svg-icons'
import {navigate} from "gatsby";

const Footer = ({siteTitle}) => {
    return (
        <footer className="footer" role="banner">
            <Container>
                <Row>
                    <Col sm="12" md="6" lg="4">
                        <div>
                            <div className="mt-4 mt-md-3 mt-sm-4">
                                {/*<FontAwesomeIcon className="mr-2" icon={faMapMarker}/>*/}
                                <h6>Address</h6>
                                <span className="footer-text-color d-inline-flex">
                                       Oxford, Oxfordshire
                                    </span>

                            </div>
                            <div className="footer_info_contact mt-2 ml-0 mt-md-3 mt-sm-2">
                                <div className="footer-text-color marked mt-1">
                                    <a className="footer-text-color" href="tel:+4401428654892">
                                        {/*<FontAwesomeIcon className="mr-2 text-black" icon={faPhone}/>*/}
                                        UK: +44 (0)1428654892
                                    </a><br/>
                                    <a href="tel:+552135219419">
                                        {/*<FontAwesomeIcon className="mr-2 text-black" icon={faPhone}/>*/}
                                        Brazil: +552135219419
                                    </a>
                                </div>
                                <div className="footer-text-color marked mt-1">
                                    <a href="mailto:contact@danahzohar.com">
                                        {/*<FontAwesomeIcon className="mr-2 text-black" icon={faEnvelope}/>*/}
                                        contact@danahzohar.com
                                    </a>
                                </div>
                            </div>

                            <div className="footer_info_social footer-text-color my-2">
                                <ul>
                                    <li className="footer-text-color">
                                        <a className="footer-text-color" target="_blank"
                                           href="https://www.facebook.com/danah.zohar.1">
                                            <FontAwesomeIcon icon={faFacebookF}/>
                                        </a>
                                    </li>
                                    <li className="footer-text-color">
                                        <a className="footer-text-color" target="_blank"
                                           href="https://twitter.com/DanahZohar/">
                                            <FontAwesomeIcon icon={faTwitter}/>
                                        </a>
                                    </li>
                                    <li className="footer-text-color">
                                        <a className="footer-text-color" target="_blank"
                                           href="https://www.linkedin.com/in/danah-zohar-6750044/">
                                            <FontAwesomeIcon icon={faLinkedin}/>
                                        </a>
                                    </li>
                                    {/*<li className="footer-text-color">*/}
                                    {/*    <a className="footer-text-color" href="#">*/}
                                    {/*        <FontAwesomeIcon icon={faInstagram}/>*/}
                                    {/*    </a>*/}
                                    {/*</li>*/}
                                </ul>
                            </div>
                        </div>
                    </Col>
                    <Col sm="12" md="6" lg="4">
                        <div className="mt-4 mt-md-3 mt-sm-4  useful-links">
                            <h6 className="title">Explore</h6>
                            <div className="mb-4 links">
                                <Row>
                                    <Col xs="12" md="6">
                                        <span className="footer-link" onClick={() => navigate("/news")}>News</span>
                                    </Col>
                                    <Col xs="12" md="6">
                                        <span className="footer-link" onClick={() => navigate("/books")}
                                        >Books</span>
                                    </Col>
                                    <Col xs="12" md="6">
                                        <span className="footer-link" onClick={() => navigate("/videos")}
                                        >Videos</span>
                                    </Col>
                                    <Col xs="12" md="6">
                                        <span className="footer-link"
                                              onClick={() => navigate("/test")}>Test and Surveys</span>
                                    </Col>
                                    <Col xs="12" md="6">
                                        <span className="footer-link" onClick={() => navigate("/blogs")}
                                        >Blogs</span>
                                    </Col>
                                    <Col xs="12" md="6">
                                        <span className="footer-link" onClick={() => navigate("/gallery")}
                                        >Gallery</span>
                                    </Col>
                                    <Col xs="12" md="6">
                                        <span className="footer-link" onClick={() => navigate("/speaking")}
                                        >Speaking</span>
                                    </Col>
                                </Row>
                            </div>
                        </div>
                    </Col>
                    <Col sm="12" md="6" lg="4">
                        <div className="mt-4 mt-md-3 mt-sm-4 useful-links">
                            <h6 className="title">Information</h6>
                            <div className="mb-4 links">
                                <Row>
                                    <Col xs="12">
                                        <span className="footer-link" onClick={() => navigate("/about")}
                                        >About</span>
                                    </Col>
                                    <Col xs="12">
                                        <span className="footer-link" onClick={() => navigate("/contact")}
                                        >Contact</span>
                                    </Col>
                                    {/*<Col xs="12">*/}
                                    {/*    <a href="/projects">Projects</a>*/}
                                    {/*</Col>*/}
                                </Row>
                            </div>
                        </div>
                    </Col>
                </Row>
            </Container>
            <div className="footer-nav">
                <Container>
                    <Row>
                        <Col sm="12" className="py-3 copyright">
                            Copyright © {new Date().getFullYear()}. Oxford Quantum Systems Dynamics Ltd. All rights
                            reserved.
                        </Col>
                    </Row>
                </Container>
            </div>
        </footer>
    );
};

Footer.propTypes = {
    siteTitle: PropTypes.string,
};

Footer.defaultProps = {
    siteTitle: ``,
};

export default Footer;
