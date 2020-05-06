import React from "react";
import addedStyle from "../../styles/css/style-react.module.css"

// reactstrap components
import {Button, Row, Container, Col, Card, CardBody, CardFooter, CardHeader, NavItem, NavLink} from "reactstrap";
import {faLongArrowAltRight} from '@fortawesome/free-solid-svg-icons'
import {FontAwesomeIcon} from '@fortawesome/react-fontawesome'
// core components

const YoutubeSection = () => {
    return (
        <div id="youtube"
             className="youtube-entry"
        >
            <Container>
                <div className="py-5">
                    <Row className="explore-entry">
                        <Col xs="12" lg="6" className="mb-5">
                            <div className="video-container">
                                <iframe className="video" allowFullScreen
                                        frameborder="0"
                                        title="youtube Video Player"
                                        src="https://www.youtube.com/embed/FaO2aPBJgZA"
                                        id="fitvid0">
                                </iframe>
                            </div>
                        </Col>
                        <Col xs="12" lg="6">
                            <h2 className="font-weight-600 text-white mb-3">WHAT IS SQ ASSESSMENT?</h2>
                            <p className="textblock text-white">
                                The work of Danah Zohar and Ian Marshall demonstrates the importance of spiritual
                                intelligence (SQ), which enables us to think “outside of the box” and to play with the
                                boundaries—to play an “infinite game”. SQ is a transformative intelligence that allows
                                us to break old paradigms and to invent new ones, to reframe problems and situations, to
                                dissolve old patterns and to be open to finding new ones.
                                <br/><br/>
                                Without reference to religious belief or practice, SQ represents the extent to which
                                higher values, meaning and a sense of purpose influence an individual’s decisions and
                                actions.
                            </p>
                            <Button className="font-weight-500" color="primary">TAKE SQ TEST</Button>
                        </Col>
                    </Row>
                </div>
            </Container>
        </div>
    );
};

export default YoutubeSection;
