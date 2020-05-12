import React from "react"
import {graphql} from "gatsby"
import SEO from "../components/seo";
import DefaultLayout from "../layout/default";
import {Col, Container, Row} from "reactstrap";

export default function Template({data}) {
    const {booksJson} = data // data.markdownRemark holds your post data
    const {author, name, info} = booksJson;
    return (
        <DefaultLayout>
            <SEO title="Books"/>
            <div className="subpage">
                <div className="section">
                    <Container>
                        <h3 className="title">{name}</h3>
                        <h5 className="description text-center">
                            {author}
                        </h5>
                        <Col xs="10" className="ml-auto mr-auto">
                            {info}
                        </Col>
                    </Container>
                </div>
            </div>
        </DefaultLayout>
    )
}

export const pageQuery = graphql`
    query($slug: String!) {
        booksJson(slug: { eq: $slug }) {
            author
            name
            info
        }
    }
`