import React from "react";
import addedStyle from "../../styles/css/style-react.module.css"
import {Link} from "gatsby"
import {Redirect} from 'react-router-dom'
// reactstrap components
import {Button, Row, Container, Col, Card, CardBody, CardFooter, CardHeader, NavItem, NavLink} from "reactstrap";
import {faLongArrowAltRight} from '@fortawesome/free-solid-svg-icons'
import {FontAwesomeIcon} from '@fortawesome/react-fontawesome'
// core components

const ExploreSection = () => {
    return (
        <div id="explore"
             className="explore-entry"
             style={{backgroundColor: "#E8E8E8"}}
        >
            <Container>
                <div className="pt-5 pb-5">
                    <div className="text-center">
                        <h5 className="text-purple">Learn about the Q's</h5>
                        <h3 className="font-weight-600">Explore SQ and Spiritual Capital</h3>
                    </div>
                    <Row className="explore-entry">
                        <Col xs="12" md="6" lg="4" className="">
                            <Card className="exploreCard"
                                  onClick={() => (window.location = "/whatissq")}>
                                <CardHeader>
                                    <div
                                        className="header-img-container"
                                    >
                                        <img
                                            className="header-img d-block"
                                            src={require("../../images/spiritual2.png")}
                                        >
                                        </img>
                                    </div>
                                </CardHeader>
                                <CardBody>
                                    <div className="subheading text-center">
                                        <div className="slide-layer">
                                            <h5 className="subheading font-weight-600">What is SQ?</h5>
                                        </div>
                                    </div>

                                    <div className="slide-layer-wrap description-wrap">
                                        <div className="slide-layer">
                                            <div className="subtext">Spiritual intelligence (SQ) is unfortunately often
                                                overlooked in coaching and development. It is the trigger and key to
                                                great leadership, which motivates us to lead from higher motivations.
                                                <br/><br/>
                                            </div>
                                        </div>
                                    </div>
                                </CardBody>
                                <CardFooter>
                                    <div className="slide-layer-wrap button-wrap"
                                         onClick={() => (window.location = "/whatissq")}
                                    >
                                        <div className="slide-layer">
                                            <div className="slide-button right-icon">
                                                <div className="button-content-wrapper">
												<span className="button-text">
													Discover now												</span>
                                                    <span className="button-icon">
													<FontAwesomeIcon className="ml-1" icon={faLongArrowAltRight}/>
												</span>
                                                </div>
                                            </div>
                                        </div>
                                    </div>
                                </CardFooter>
                            </Card>
                        </Col>
                        <Col xs="12" md="6" lg="4">
                            <Card className="exploreCard"
                                  onClick={() => (window.location = "/scapital")}>
                                <CardHeader>
                                    <div
                                        className="header-img-container"
                                    >
                                        <img
                                            className="header-img d-block"
                                            src={require("../../images/wealth2.png")}
                                        >
                                        </img>
                                    </div>
                                </CardHeader>
                                <CardBody>
                                    <div className="subheading text-center">
                                        <div className="slide-layer">
                                            <h5 className="subheading font-weight-600">Spiritual Capital</h5>
                                        </div>
                                    </div>

                                    <div className="slide-layer-wrap description-wrap">
                                        <div className="slide-layer">
                                            <div className="subtext text-justify">
                                                Spiritual intelligence (SQ), spiritual capital, and sustainability are
                                                crucially linked. Spiritual capital reflects what an individual or an
                                                organization exists for, believes in, aspires to, and takes
                                                responsibility for.
                                            </div>
                                        </div>
                                    </div>
                                </CardBody>
                                <CardFooter>
                                    <div className="slide-layer-wrap button-wrap"
                                         onClick={() => (window.location = "/scapital")}>
                                        <div className="slide-layer">
                                            <div className="slide-button right-icon">
                                                <div className="button-content-wrapper">
												<span className="button-text">
													Discover now												</span>
                                                    <span className="button-icon">
													<FontAwesomeIcon className="ml-1" icon={faLongArrowAltRight}/>
												</span>
                                                </div>
                                            </div>
                                        </div>
                                    </div>
                                </CardFooter>
                            </Card>
                        </Col>
                        <Col xs="12" md="6" lg="4">
                            <Card className="exploreCard"
                                  onClick={() => (window.location = "/experienceqs")}
                            >
                                <CardHeader>
                                    <div
                                        className="header-img-container"
                                    >
                                        <img
                                            className="header-img d-block"
                                            src={require("../../images/blog_placeholder.png")}
                                        >
                                        </img>
                                    </div>
                                </CardHeader>
                                <CardBody>
                                    <div className="subheading text-center">
                                        <div className="slide-layer">
                                            <h5 className="subheading font-weight-600">Experience Q's</h5>
                                        </div>
                                    </div>

                                    <div className="slide-layer-wrap description-wrap">
                                        <div className="slide-layer">
                                            <div className="subtext text-justify">
                                                Executive coaches, HR personnel and leaders themselves have started
                                                playing a key role in leading the way in raising the motivations that
                                                drive business culture. They have a moral mission to help others...

                                            </div>
                                        </div>
                                    </div>
                                </CardBody>
                                <CardFooter>
                                    <div className="slide-layer-wrap button-wrap"
                                         onClick={() => (window.location = "/experienceqs")}
                                    >
                                        <div className="slide-layer">
                                            <div className="slide-button right-icon">
                                                <div className="button-content-wrapper">
												<span className="button-text">
													Discover now
												</span>
                                                    <span className="button-icon">
													<FontAwesomeIcon className="ml-1" icon={faLongArrowAltRight}/>
												</span>
                                                </div>
                                            </div>
                                        </div>
                                    </div>
                                </CardFooter>
                            </Card>
                        </Col>
                    </Row>
                </div>
            </Container>
        </div>
    );
};

export default ExploreSection;
