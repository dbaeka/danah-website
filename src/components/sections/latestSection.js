import React from "react";
import addedStyle from "../../styles/css/style-react.module.css"

// reactstrap components
import {Button, Row, Container, Col, Card, CardBody, CardFooter, CardHeader, NavItem, NavLink} from "reactstrap";
// import {faBookmark} from '@fortawesome/free-solid-svg-icons'
import {faBookmark} from '@fortawesome/free-regular-svg-icons'
import {FontAwesomeIcon} from '@fortawesome/react-fontawesome'
// core components

const LatestSection = () => {
    return (
        <div id="latest"
             className="latest-entry"
        >
            <Container>
                <div className="py-5">
                    <div className="text-center mb-2" style={{fontSize: "23px"}}>
                        <FontAwesomeIcon icon={faBookmark}/>
                    </div>
                    <h3 className="text-center font-weight-600 mb-5">LATEST NEWS</h3>
                    <Row className="">
                        <Col xs="12" md="6" lg="4" className="mb-5">
                            <div className="jet-posts__inner-box">
                                <div className="post-thumbnail">
                                    <a
                                        href=""
                                        className="post-thumbnail__link">
                                        <img className="post-thumbnail__img wp-post-image"
                                             src={require("../../images/blog_placeholder.png")}
                                             alt="Stop Ignoring These 7 Inspiring Truths"
                                             width="550" height="362"/>
                                    </a>
                                </div>
                                <div className="jet-posts__inner-content">
                                    <h4 className="entry-title">
                                        <a
                                            href="">
                                            You Can’t Isolate Problems
                                        </a>
                                    </h4>
                                    <div className="post-meta">
                                        <span className="post__date post-meta__item">
                                                <time dateTime="2018-10-14T10:18:12+00:00"
                                                      title="2018-10-14T10:18:12+00:00">October 14, 2018</time>
                                        </span>
                                    </div>
                                    <div className="entry-excerpt">
                                        Praising and justifying himself for his drive to emasculate the state’s trades
                                        unions, Wisconsin Governor Scott Brown said emphatically, “You identify the
                                        problem, then you identify the solution.” The unions were the problem, stripping
                                        them of their powers the solution. Nice and tidy,...
                                    </div>
                                    <div className="jet-more-wrap">
                                        <a
                                            href="http://themes.pixelwars.org/efor/demo-02/stop-ignoring-these-7-inspiring-truths-and-become-your-best-self-today/"
                                            className="btn btn-primary elementor-button elementor-size-md jet-more">
                                            <span className="btn__text">Read More</span>
                                        </a>
                                    </div>
                                </div>
                            </div>
                        </Col>
                        <Col xs="12" md="6" lg="4" className="mb-5">
                            <div className="jet-posts__inner-box">
                                <div className="post-thumbnail">
                                    <a
                                        href=""
                                        className="post-thumbnail__link">
                                        <img className="post-thumbnail__img wp-post-image"
                                             src={require("../../images/blog_placeholder.png")}
                                             alt="Stop Ignoring These 7 Inspiring Truths"
                                             width="550" height="362"/>
                                    </a>
                                </div>
                                <div className="jet-posts__inner-content">
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
                                        I was raised by my grandparents during the 1950’s in the American Midwest. They
                                        were deeply religious people, devout Methodists, who had known poverty and
                                        hardship all their lives and survived the Great Depression. My grandmother had
                                        to support the family due to my...
                                    </div>
                                    <div className="jet-more-wrap">
                                        <a
                                            href="http://themes.pixelwars.org/efor/demo-02/stop-ignoring-these-7-inspiring-truths-and-become-your-best-self-today/"
                                            className="btn btn-primary elementor-button elementor-size-md jet-more">
                                            <span className="btn__text">Read More</span>
                                        </a>
                                    </div>
                                </div>
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

export default LatestSection;
