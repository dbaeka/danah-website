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
import {navigate} from "gatsby"

class BlogPosts extends React.Component {
    constructor(props) {
        super(props);

        this.state = {
            // List of posts.
            PostsListThree: [
                {
                    author: "John James",
                    authorAvatar: require("../images/profile.png"),
                    title: "Had denoting properly jointure which well books beyond",
                    body:
                        "In said to of poor full be post face snug. Introduced imprudence see say unpleasing devonshire acceptance son. Exeter longer wisdom work...",
                    date: "29 February 2019"
                },
                {
                    author: "John James",
                    authorAvatar: require("../images/profile.png"),
                    title: "Husbands ask repeated resolved but laughter debating",
                    body:
                        "It abode words began enjoy years no do ﻿no. Tried spoil as heart visit blush or. Boy possible blessing sensible set but margaret interest. Off tears...",
                    date: "29 February 2019"
                },
                {
                    author: "John James",
                    authorAvatar: require("../images/profile.png"),
                    title:
                        "Instantly gentleman contained belonging exquisite now direction",
                    body:
                        "West room at sent if year. Numerous indulged distance old law you. Total state as merit court green decay he. Steepest merit checking railway...",
                    date: "29 February 2019"
                }
            ],

        };
    }

    redirectWP = () => {
        axios({
            method: "POST",
            url: "http://localhost:9090/wp_post_login.php",
            data: {username: "admin", action: "wp_login"},
            withCredentials: true
        }).then((response) => {
            if (response.data.state === 200) {
                const a = document.createElement("a");
                a.href = "http://localhost:9090/wp-admin/edit.php";
                a.target = "_blank";
                a.click();
            } else {
                console.log("Failed.")
            }
        })
    }

    render() {
        const {
            PostsListThree,
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
                    {PostsListThree.map((post, idx) => (
                        <Col lg="4" key={idx}>
                            <Card small className="card-post mb-4">
                                <CardBody>
                                    <h5 className="card-title">{post.title}</h5>
                                    <p className="card-text text-muted">{post.body}</p>
                                </CardBody>
                                <CardFooter className="border-top d-flex">
                                    <div className="card-post__author d-flex">
                                        <a
                                            href="#"
                                            className="card-post__author-avatar card-post__author-avatar--small"
                                            style={{backgroundImage: `url('${post.authorAvatar}')`}}
                                        >
                                            Written by James Khan
                                        </a>
                                        <div className="d-flex flex-column justify-content-center ml-3">
                      <span className="card-post__author-name">
                        {post.author}
                      </span>
                                            <small className="text-muted">{post.date}</small>
                                        </div>
                                    </div>
                                    <div className="my-auto ml-auto">
                                        <Button size="sm" theme="white">
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

export default BlogPosts;
