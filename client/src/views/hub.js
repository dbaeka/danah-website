import React from "react"
import {navigate} from "gatsby"
import {Container, Row, Col, Card, CardBody, Button} from "shards-react";

import SEO from "../components/seo"
import PageTitle from "../components/admin/PageTitle";
import Store from "../flux/store";
import {Actions} from "../flux";

class Hub extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            numPosts: Store.getPosts().count,
            // numBooks: Store.getBooks().length,
            numVideos: Store.getVideos().length
        };

        this.onChange = this.onChange.bind(this);
    }

    componentWillMount() {
        Store.addChangeListener(this.onChange);
    }

    componentWillUnmount() {
        Store.removeChangeListener(this.onChange);
    }

    componentDidMount() {
        Actions.getPosts(1);
        // Actions.getBooks()
        Actions.getVideos()
    }

    onChange() {
        this.setState({
            ...this.state,
            numPosts: Store.getPosts().count,
            // numBooks: Store.getBooks().length,
            numVideos: Store.getVideos().length
        });
    }

    render() {
        const {numPosts, numVideos} = this.state;

        return (
            <div>
                <SEO title="Admin - Hub"/>
                <Container fluid className="main-content-container px-4">
                    {/* Page Header */}
                    <Row noGutters className="shard-page-header py-4">
                        <PageTitle title="Hub" subtitle="Dashboard" className="text-sm-left mb-3"/>
                    </Row>
                    <Row>
                        <Col className="col-lg mb-4" md="6" sm="6">
                            <Card small className="hub-small">
                                <CardBody className="p-0 d-flex">
                                    <div className="d-flex flex-column m-auto">
                                        <div className="text-center hub-small__data">
                                            <span className="hub-small__label text-uppercase">Posts</span>
                                            <h6 className="hub-small__value mt-3">{numPosts}</h6>
                                        </div>
                                        <div className="hub-small__data">
                                            <Button size="sm" pill
                                                    onClick={() => navigate("/admin/blog-posts")}
                                            >Go to Posts</Button>
                                        </div>
                                    </div>
                                </CardBody>
                            </Card>
                        </Col>
                        {/*<Col className="col-lg mb-4" md="6" sm="6">*/}
                        {/*    <Card small className="hub-small">*/}
                        {/*        <CardBody className="p-0 d-flex">*/}
                        {/*            <div className="d-flex flex-column m-auto">*/}
                        {/*                <div className="text-center hub-small__data">*/}
                        {/*                    <span className="hub-small__label text-uppercase">Books</span>*/}
                        {/*                    <h6 className="hub-small__value mt-3">{numBooks}</h6>*/}
                        {/*                </div>*/}
                        {/*                <div className="hub-small__data">*/}
                        {/*                    <Button size="sm" pill*/}
                        {/*                            onClick={() => navigate("/admin/books")}>*/}
                        {/*                        Go to Books</Button>*/}
                        {/*                </div>*/}
                        {/*            </div>*/}
                        {/*        </CardBody>*/}
                        {/*    </Card>*/}
                        {/*</Col>*/}
                        <Col className="col-lg mb-4" md="6" sm="6">
                            <Card small className="hub-small">
                                <CardBody className="p-0 d-flex">
                                    <div className="d-flex flex-column m-auto">
                                        <div className="text-center hub-small__data">
                                            <span className="hub-small__label text-uppercase">Videos</span>
                                            <h6 className="hub-small__value mt-3">{numVideos}</h6>
                                        </div>
                                        <div className="hub-small__data">
                                            <Button size="sm" pill
                                                    onClick={() => navigate("/admin/videos")}
                                            >Go to Videos</Button>
                                        </div>
                                    </div>
                                </CardBody>
                            </Card>
                        </Col>
                        <Col className="col-lg mb-4" md="6" sm="6">
                            <Card small className="hub-small">
                                <CardBody className="p-0 d-flex">
                                    <div className="d-flex flex-column m-auto">
                                        <div className="text-center hub-small__data">
                                            <span className="hub-small__label text-uppercase">Comments</span>
                                        </div>
                                        <br/>
                                        <div className="hub-small__data">
                                            <Button size="sm" pill
                                                    onClick={() => window.open("https://auth.hyvor.com/login/?redirect=https%3A%2F%2Ftalk.hyvor.com%2Fconsole%2F")}
                                            >Go to Comments</Button>
                                        </div>
                                    </div>
                                </CardBody>
                            </Card>
                        </Col>
                        <Col className="col-lg mb-4" md="6" sm="6">
                            <Card small className="hub-small">
                                <CardBody className="p-0 d-flex">
                                    <div className="d-flex flex-column m-auto">
                                        <div className="text-center hub-small__data">
                                            <span className="hub-small__label text-uppercase">Schedule</span>
                                        </div>
                                        <br/>
                                        <div className="hub-small__data">
                                            <Button size="sm" pill
                                                    onClick={() => navigate("/admin/schedule")}
                                            >Go to Schedule</Button>
                                        </div>
                                    </div>
                                </CardBody>
                            </Card>
                        </Col>
                    </Row>
                </Container>
            </div>
        )
    }
};

export default Hub
