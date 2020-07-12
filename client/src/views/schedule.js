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

class Schedule extends React.Component {
    constructor(props) {
        super(props);

        this.state = {
            posts: [],
            authorAvatar: require("../images/profile.png"),
        };
    }

    componentDidMount() {
        axios({
            method: "GET",
            url: wpURL + "/wp-json/wp/v2/posts",
        }).then((response) => {
            if (response.data) {
                const posts = response.data;
                const promise = posts.map((post) => {
                    const author = post.author;
                    return axios({
                        method: "GET",
                        url: wpURL + "/index.php/wp-json/wp/v2/users/" + author,
                    }).then((response) => {
                        if (response.data) {
                            const authorName = response.data.name;
                            return {
                                author: authorName,
                                title: post.title.rendered,
                                body: clean(post.excerpt.rendered),
                                date: new Date(post.date).toLocaleString(),
                                slug: post.slug,
                                status: post.status,
                                id: post.id,
                            }
                        }
                    })
                })
                Promise.all(promise).then((result) => this.setState({posts: result}))
            }
        })
    }

    redirectWP = () => {
        axios({
            method: "POST",
            url: wpURL + "/wp_post_login.php",
            data: {username: "admin", action: "wp_login"},
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
        const {
            posts,
        } = this.state;

        return (
            <Container fluid className="main-content-container px-4">
                {/* Page Header */}
                <Row noGutters className="shard-page-header py-4" style={{justifyContent: "space-between"}}>
                    <PageTitle sm="4" title="Blog Posts" subtitle="Add/Edit" className="text-sm-left"/>
                    <Button size="sm"
                            onClick={this.redirectWP}
                    >Add Post</Button>
                </Row>
                {/* Row of Posts */}
                <Row>
                    {posts && posts.map((post, idx) => (
                        <Col lg="4" key={idx}>
                            <Card small className="card-post mb-4">
                                <CardBody>
                                    <h5 className="card-title">{post.title}</h5>
                                    {console.log(post)}
                                    <p className="card-text text-muted">{clean(post.body)}</p>
                                </CardBody>
                                <CardFooter className="border-top d-flex">
                                    <div className="card-post__author d-flex">
                                        <a
                                            href="#"
                                            className="card-post__author-avatar card-post__author-avatar--small"
                                            style={{backgroundImage: `url('${this.state.authorAvatar}')`}}
                                        >
                                            Written by
                                        </a>
                                        <div className="d-flex flex-column justify-content-center ml-3">
                                            <span className="card-post__author-name">
                                                {post.author}
                                            </span>
                                            <small className="text-muted">{post.date}</small>
                                            <small>Status: <b>{post.status.toUpperCase()}</b></small>
                                        </div>
                                    </div>
                                    <div className="my-auto ml-auto">
                                        <Button size="sm" theme="white"
                                                onClick={() => {
                                                    axios({
                                                        method: "POST",
                                                        url: wpURL + "/wp_post_login.php",
                                                        data: {username: "admin", action: "wp_login"},
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
            </Container>
        );
    }
}

export default Schedule;