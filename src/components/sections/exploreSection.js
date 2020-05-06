import React from "react";
import addedStyle from "../../styles/css/style-react.module.css"

// reactstrap components
import {Button, Row, Container, Col, Card, CardBody, CardFooter, CardHeader, NavItem, NavLink} from "reactstrap";
import {faLongArrowAltRight} from '@fortawesome/free-solid-svg-icons'
import {FontAwesomeIcon} from '@fortawesome/react-fontawesome'
// core components

const ExploreSection = () => {
    return (
        <div id="explore"
             className="explore-entry"
        >
            <Container>
                <div className="pb-5">
                    <div className="text-center">
                        <h5 className="text-purple">Learn about the Q's</h5>
                        <h3 className="font-weight-600">Explore SQ and Spiritual Capital</h3>
                    </div>
                    <Row className="explore-entry">
                        <Col xs="12" md="6" lg="4" className="">
                            <Card className="exploreCard">
                                <CardHeader>
                                    <div
                                        className="header-img-container"
                                    >
                                        <img
                                            className="header-img d-block"
                                            src={require("../../images/danah_profile.jpg")}
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
                                    <div className="slide-layer-wrap button-wrap">
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
                            <Card className="exploreCard">
                                <CardHeader>
                                    <div
                                        className="header-img-container"
                                    >
                                        <img
                                            className="header-img d-block"
                                            src={require("../../images/danah_profile.jpg")}
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
                                    <div className="slide-layer-wrap button-wrap">
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
                            <Card className="exploreCard">
                                <CardHeader>
                                    <div
                                        className="header-img-container"
                                    >
                                        <img
                                            className="header-img d-block"
                                            src={require("../../images/danah_profile.jpg")}
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
                                    <div className="slide-layer-wrap button-wrap">
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
