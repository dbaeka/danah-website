import React from "react";
import addedStyle from "../../styles/css/style-react.module.css"

// reactstrap components
import {Button, Row, Container, Col, Card, CardBody, CardFooter, CardHeader, NavItem, NavLink} from "reactstrap";
import {faLongArrowAltRight} from '@fortawesome/free-solid-svg-icons'
import {FontAwesomeIcon} from '@fortawesome/react-fontawesome'
import {graphql, useStaticQuery} from "gatsby";
// core components

const BookSection = () => {
    const {books} = useStaticQuery(graphql`
        {
            books: allBooksJson(limit: 3, sort: {order: DESC, fields: date}) {
                edges {
                    node {
                        info
                        name
                        author
                        slug
                        image {
                            childImageSharp {
                                fluid(base64Width: 300){
                                    base64
                                }
                            }
                        }
                    }
                }
            }
        }
    `);

    return (
        <div id="books"
             className="books-entry"
        >
            <Container>
                <div className="py-5">
                    <h3 className="text-center mb-5">BOOKS</h3>
                    <Row className="explore-entry">
                        {books.edges.map(({node}, idx) => (
                            <Col xs="12" md="6" lg="4" key={idx} className="mb-5">
                                <div className="book-block text-center">
                                    <a
                                        href={node.slug}
                                        className="book-short w-inline-block">
                                        <img
                                            src={node.image && node.image.childImageSharp.fluid.base64}
                                            alt="" className="book-image"/>
                                    </a>
                                    <div className="mt-4 text-block">{node.name}</div>
                                    <Button outline
                                            onClick={() => (window.location = node.slug)}
                                            className="mt-1">Learn More</Button>
                                </div>
                            </Col>
                        ))}
                        <Col className="text-center" xs="12">
                            <a href="/books" className="link-purple">View more</a>
                        </Col>
                    </Row>


                </div>
            </Container>
        </div>
    );
};

export default BookSection;
