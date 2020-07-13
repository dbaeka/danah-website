/* eslint jsx-a11y/anchor-is-valid: 0 */

import React from "react";
import {
    Container,
    Row,
    Col,
    Card,
    CardBody,
    CardFooter,
    Button
} from "shards-react";
import {faEdit} from '@fortawesome/free-regular-svg-icons'
import {FontAwesomeIcon} from '@fortawesome/react-fontawesome'
import axios from 'axios';
import PageTitle from "../components/admin/PageTitle";
import {clean} from "../utils/clean"
import {wpURL} from "../services/urls";
import Store from "../flux/store";
import {Actions} from "../flux";
import {Pagination, PaginationItem, PaginationLink,} from 'reactstrap';

class BlogPosts extends React.Component {
    constructor(props) {
        super(props);

        this.state = {
            posts: Store.getPosts().items,
            pagesCount: 1,
            currentPage: 0,
            authorAvatar: require("../images/profile.png"),
        };

        this.onChange = this.onChange.bind(this)
    }

    componentWillMount() {
        Store.addChangeListener(this.onChange);
    }

    componentWillUnmount() {
        Store.removeChangeListener(this.onChange);
    }

    componentDidMount() {
        Actions.getPosts(1);
    }

    onChange() {
        this.setState({
            ...this.state,
            pagesCount: Store.getPosts().pages,
            posts: Store.getPosts().items,
        });

    }

    trimText = (str, n) => (
        (str.length > n) ? str.substr(0, n - 1) + '...' : str
    );


    handleClick(e, index) {
        e.preventDefault();
        Actions.getPosts(index + 1);
        this.setState({
            currentPage: index
        });
    }


    redirectWP = () => {
        axios({
            method: "POST",
            url: wpURL + "/wp_post_login.php",
            data: {username: "d.zohar", action: "wp_login"},
            withCredentials: true
        }).then((response) => {
            if (response.data.state === 200) {
                const a = document.createElement("a");
                a.href = wpURL + "/wp-admin/edit.php";
                a.target = "_blank";
                a.click();
            } else {
                console.log("Failed.")
            }
        })
    }

    render() {
        const {posts, currentPage} = this.state;

        return (
            <Container fluid className="main-content-container px-4">
                {/* Page Header */}
                <Row noGutters className="shard-page-header py-4" style={{justifyContent: "space-between"}}>
                    <PageTitle sm="4" title="Blog Posts" subtitle="Add/Edit" className="text-sm-left"/>
                    <Button size="sm"
                            onClick={this.redirectWP}
                    >Add Post</Button>
                </Row>
                {/*Row of Posts*/}
                <Row>
                    {posts && posts.map((post, idx) => (
                        <Col lg="4" key={idx}>
                            <Card small className="card-post mb-4">
                                <CardBody>
                                    <h5 className="card-title">{post && post.title.rendered}</h5>
                                    <p className="card-text text-muted">{clean(this.trimText(post.content.rendered, 100))}</p>
                                </CardBody>
                                <CardFooter className="border-top d-flex">
                                    <div className="card-post__author d-flex">
                                        <a
                                            href="#"
                                            className="card-post__author-avatar card-post__author-avatar--small"
                                            style={{backgroundImage: `url('${this.state.authorAvatar}')`}}
                                        >
                                            Posted by
                                        </a>
                                        <div className="d-flex flex-column justify-content-center ml-3">
                                            <span className="card-post__author-name">
                                                {/*{post.author}*/}
                                                Admin
                                            </span>
                                            <small className="text-muted">{new Date(post.date).toUTCString()}</small>
                                            <small>Status: <b>{post.status.toUpperCase()}</b></small>
                                        </div>
                                    </div>
                                    <div className="my-auto ml-auto">
                                        <Button size="sm" theme="white"
                                                onClick={() => {
                                                    axios({
                                                        method: "POST",
                                                        url: wpURL + "/wp_post_login.php",
                                                        data: {username: "d.zohar", action: "wp_login"},
                                                        withCredentials: true
                                                    }).then((response) => {
                                                        if (response.data.state === 200) {
                                                            const a = document.createElement("a");
                                                            a.href = wpURL + "/wp-admin/post.php?post=" + post.id + "&action=edit";
                                                            a.target = "_blank";
                                                            a.click();
                                                        } else {
                                                            console.log("Failed.")
                                                        }
                                                    })
                                                }}
                                        >
                                            <FontAwesomeIcon className="mr-1" icon={faEdit}/>
                                            Edit
                                        </Button>
                                    </div>
                                </CardFooter>
                            </Card>
                        </Col>
                    ))}
                </Row>
                <Pagination aria-label="Page navigation example">
                    <PaginationItem disabled={currentPage <= 0}>
                        <PaginationLink
                            onClick={e => this.handleClick(e, currentPage - 1)}
                            previous
                            href="#"
                        />
                    </PaginationItem>
                    {[...Array(this.state.pagesCount)].map((page, i) =>
                        <PaginationItem active={i === currentPage} key={i}>
                            <PaginationLink onClick={e => this.handleClick(e, i)} href="#">
                                {i + 1}
                            </PaginationLink>
                        </PaginationItem>
                    )}
                    <PaginationItem disabled={currentPage >= this.state.pagesCount - 1}>
                        <PaginationLink
                            onClick={e => this.handleClick(e, currentPage + 1)}
                            next
                            href="#"
                        />
                    </PaginationItem>
                </Pagination>
            </Container>
        );
    }
}

export default BlogPosts;
