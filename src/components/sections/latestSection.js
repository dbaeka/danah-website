import React from "react";
import addedStyle from "../../styles/css/style-react.module.css"

// reactstrap components
import {Button, Row, Container, Col, Card, CardBody, CardFooter, CardHeader, NavItem, NavLink} from "reactstrap";
// import {faBookmark} from '@fortawesome/free-solid-svg-icons'
import {faBookmark} from '@fortawesome/free-regular-svg-icons'
import {FontAwesomeIcon} from '@fortawesome/react-fontawesome'
import {graphql, useStaticQuery} from "gatsby";
// core components

const LatestSection = () => {

    const trimText = (str, n) => (
        (str.length > n) ? str.substr(0, n - 1) + '...' : str
    );

    const {news} = useStaticQuery(graphql`
        {
            news: allNewsJson {
                edges {
                    node {
                        title
                        excerpt
                        link
                        date
                        source
                    }
                }
            }
        }
    `);

    return (
        <div id="latest"
             className="latest-entry"
             style={{backgroundColor: "#eaeaea"}}
        >
            <Container>
                <div className="py-5">
                    <div className="text-center mb-2" style={{fontSize: "23px"}}>
                        <FontAwesomeIcon icon={faBookmark}/>
                    </div>
                    <h3 className="text-center font-weight-600 mb-5">LATEST NEWS</h3>
                    <Row className="">
                        {news.edges.map(({node}, idx) => (
                            <Col xs="12" md="6" lg="4" className="" key={idx}>
                                <div className="jet-posts__inner-box">
                                    <div className="jet-posts__inner-content">
                                        <h4 className="entry-title">
                                            <a
                                                target="_blank"
                                                href={node.link}>
                                                {trimText(node.title, 70)}
                                            </a>
                                        </h4>
                                        <div className="post-meta">
                                                <span className="post__date post-meta__item">
                                                    <time dateTime="2018-10-14T10:18:12+00:00"
                                                          title="2018-10-14T10:18:12+00:00">{node.date}
                                                    </time>
                                                </span><br/>
                                            <span className="post__date post-meta__item">
                                                        {node.source}
                                                </span>
                                        </div>
                                        <div className="entry-excerpt">
                                            {trimText(node.excerpt, 160)}
                                        </div>
                                        <div className="jet-more-wrap">
                                            <a
                                                href={node.link}
                                                target="_blank"
                                                className="btn btn-primary elementor-button elementor-size-md jet-more">
                                                <span className="btn__text">Read More</span>
                                            </a>
                                        </div>
                                    </div>
                                </div>
                            </Col>
                        ))}
                        <Col className="text-center" xs="12">
                            <a href="/news" className="link-purple">View more</a>
                        </Col>
                    </Row>

                </div>
            </Container>
        </div>
    );
};

export default LatestSection;
