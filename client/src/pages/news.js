import React from "react"
import {graphql, Link, useStaticQuery} from "gatsby"

import SEO from "../components/seo"
import DefaultLayout from "../layout/default";
import {Container, Button, UncontrolledTooltip, Nav, NavItem, Col, NavLink, TabContent, Row, TabPane,} from "reactstrap"
import SecondaryHeader from "../components/secondaryheader";
import NormalHeader from "../components/normalheader";


const News = () => {

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
        <DefaultLayout>
            <SEO title="News"/>
            {/*<NormalHeader title="Speaking Engagement"/>*/}
            <div className="subpage">
                <div className="section">
                    <Container>
                        <h3 className="title">News</h3>
                        <Col xs="10" className="ml-auto mr-auto">
                            <Row className="ml-auto mr-auto mb-5">
                                {news.edges.map(({node}, idx) => (
                                    <Col xs="12" md="6" lg="4" className="" key={idx}>
                                        <div className="jet-posts__inner-box">
                                            <div className="jet-posts__inner-content">
                                                <h4 className="entry-title">
                                                    <a
                                                        target="_blank"
                                                        href={node.link}>
                                                        {trimText(node.title, 50)}
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
                            </Row>
                        </Col>
                    </Container>
                </div>
            </div>
        </DefaultLayout>
    )
};
export default News
