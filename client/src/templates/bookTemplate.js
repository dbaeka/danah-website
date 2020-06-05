import React from "react"
import {graphql} from "gatsby"
import SEO from "../components/seo";
import DefaultLayout from "../layout/default";
import {Col, Container, Row} from "reactstrap";

export default function Template({data}) {
    const {booksJson} = data // data.markdownRemark holds your post data
    const {author, name, full, image, link_us, link_uk} = booksJson;
    return (
        <DefaultLayout>
            <SEO title={name}/>
            <div className="subpage">
                <div className="section">
                    <Container>
                        <img
                            src={image && image.childImageSharp.fluid.base64}
                            alt="" className="book-top-image"
                        />
                        <h3 className="title">{name}</h3>
                        <h6 className="description mb-4 text-center">
                            {author}
                        </h6>
                        <Col xs="10" className="ml-auto mr-auto mb-0">
                            <h5 className="description mb-4"
                                dangerouslySetInnerHTML={{__html: full}}>
                            </h5>
                        </Col>
                        <table className="mb-5" align="center" border="0" cellPadding="0" cellSpacing="0">
                            <tbody>
                            <tr>
                                <td style={{paddingRight: "20px", textAlign: "center"}}>Buy from Amazon UK
                                    <br/><br/>
                                    <a href={link_uk} target="_blank">
                                        <img alt="" border="0"
                                             src={require("../images/amazonuk.png")}
                                             width="150"/>
                                        <br/></a>
                                </td>
                                <td style={{textAlign: "center"}}>Buy from Amazon US
                                    <br/><br/><br/>
                                    <a href={link_us} target="_blank">
                                        <img alt="" border="0"
                                             src={require("../images/amazon2.png")}
                                             width="150"/>
                                        <br/></a>
                                </td>
                            </tr>
                            </tbody>
                        </table>
                    </Container>
                </div>
            </div>
        </DefaultLayout>
)
}

export const pageQuery = graphql`
query($slug: String!) {
    booksJson(slug: {eq: $slug}) {
    author
    name
    full
    link_us
    link_uk
    info
    image {
    childImageSharp {
    fluid(base64Width: 100){
    base64
}
}
}
}
}
`