import React from "react";
import addedStyle from "../../styles/css/style-react.module.css"

// reactstrap components
import {Button, Row, Container, Col, Card, CardBody, CardFooter, CardHeader, NavItem, NavLink} from "reactstrap";
import {faLongArrowAltRight} from '@fortawesome/free-solid-svg-icons'
import {FontAwesomeIcon} from '@fortawesome/react-fontawesome'
// core components

const VideoSection = () => {
    return (
        <div id="videos"
             className="videos-entry"
             style={{backgroundColor: "#fff"}}
        >
            <Container>
                <div className="py-5">
                    <h3 className="text-center font-weight-600 mb-5">VIDEOS</h3>
                    <Row className="explore-entry">
                        <Col xs="12" md="6" lg="4" className="mb-5" style={{overflow: "hidden"}}>
                            <div className="video-wrapper">
                                <div className="section-vid">
                                    <a href="http://www.youtube.com/watch?v=0O2aH4XLbto" className="popup-youtube" >
                                        <img
                                            className="vid-thumb"
                                            src="https://maxcoach.thememove.com/main/wp-content/uploads/sites/1/2019/11/course-02-443x600.jpg"
                                        />
                                        <span className="bg-overlay"/>
                                    </a>
                                    <div className="course-info">
                                        <div className="course-caption-main">
                                            <h5 className="course-title text-white font-weight-500">
                                                <a
                                                    className="text-white font-weight-500 popup-youtube"
                                                    href="http://www.youtube.com/watch?v=0O2aH4XLbto">Learning
                                                    to Write as a Professional Author
                                                </a>
                                            </h5>
                                        </div>
                                        <div className="course-caption-collapse">
                                            <div className="course-excerpt">
                                                <p>The purpose of this course is to provide the advanced writing
                                                    techniques
                                                    commonly used for inspiring readers and
                                                </p>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </Col>
                        <Col xs="12" md="6" lg="4" className="mb-5" style={{overflow: "hidden"}}>
                            <div className="video-wrapper">
                                <div className="section-vid">
                                    <a href="http://www.youtube.com/watch?v=0O2aH4XLbto" className="popup-youtube" >
                                        <img
                                            className="vid-thumb"
                                            src="https://maxcoach.thememove.com/main/wp-content/uploads/sites/1/2019/11/course-02-443x600.jpg"
                                        />
                                        <span className="bg-overlay"/>
                                    </a>
                                    <div className="course-info">
                                        <div className="course-caption-main">
                                            <h5 className="course-title text-white font-weight-500">
                                                <a
                                                    className="text-white font-weight-500 popup-youtube"
                                                    href="http://www.youtube.com/watch?v=0O2aH4XLbto">Learning
                                                    to Write as a Professional Author
                                                </a>
                                            </h5>
                                        </div>
                                        <div className="course-caption-collapse">
                                            <div className="course-excerpt">
                                                <p>The purpose of this course is to provide the advanced writing
                                                    techniques
                                                    commonly used for inspiring readers and
                                                </p>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </Col>
                        <Col xs="12" md="6" lg="4" className="mb-5" style={{overflow: "hidden"}}>
                            <div className="video-wrapper">
                                <div className="section-vid">
                                    <a href="http://www.youtube.com/watch?v=0O2aH4XLbto" className="popup-youtube" >
                                        <img
                                            className="vid-thumb"
                                            src="https://maxcoach.thememove.com/main/wp-content/uploads/sites/1/2019/11/course-02-443x600.jpg"
                                        />
                                        <span className="bg-overlay"/>
                                    </a>
                                    <div className="course-info">
                                        <div className="course-caption-main">
                                            <h5 className="course-title text-white font-weight-500">
                                                <a
                                                    className="text-white font-weight-500 popup-youtube"
                                                    href="http://www.youtube.com/watch?v=0O2aH4XLbto">Learning
                                                    to Write as a Professional Author
                                                </a>
                                            </h5>
                                        </div>
                                        <div className="course-caption-collapse">
                                            <div className="course-excerpt">
                                                <p>The purpose of this course is to provide the advanced writing
                                                    techniques
                                                    commonly used for inspiring readers and
                                                </p>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </Col>
                        <Col className="text-center" xs="12">
                            <a href="/videos" className="link-purple">View more</a>
                        </Col>
                    </Row>
                </div>
            </Container>
        </div>
    );
};

export default VideoSection;
