import React from "react"
import {Link} from "gatsby"
import HyvorTalk from "hyvor-talk-react";

import SEO from "../components/seo"
import DefaultLayout from "../layout/default";
import {Container, Button, UncontrolledTooltip, Nav, NavItem, Col, NavLink, TabContent, Row, TabPane,} from "reactstrap"
import SecondaryHeader from "../components/secondaryheader";
import NormalHeader from "../components/normalheader";
import Store from "../flux/store";
import {Actions} from "../flux";
import {clean} from "../utils/clean"
import Share from "../components/share";
import {devURL} from "../services/urls";

class Post extends React.Component {

    constructor(props) {
        super(props);
        this.state = {
            post: Store.getCurrentPost(),
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
        const {search: path} = this.props.location;
        const id = parseInt(path.substring(6));
        Actions.getSinglePost(id);
    }

    onChange() {
        // const {search: path} = this.props.location;
        // const id = parseInt(path.substring(6));
        this.setState({
            ...this.state,
            post: Store.getCurrentPost(),
        });

    }

    render() {

        const {post} = this.state;
        const url = "https://danahzohar.com";
        const twitterHandle = "@DanahZohar";

        return (
            <DefaultLayout>
                <SEO title={post !== null ? post.title.rendered : ""}/>
                <NormalHeader position="50% 9%" image={require("../images/header2.jpg")}
                              title={post && post.title.rendered}/>
                <div className="subpage mb-4">
                    <div className="section">
                        <Container>
                            <h3 className="title">{post && post.title.rendered}</h3>
                            <h6 className="text-muted">{post && new Date(post.date).toLocaleDateString("en-US", {
                                year: "numeric",
                                month: "long",
                                day: "numeric"
                            })}</h6>
                            <div className="mb-4" dangerouslySetInnerHTML={{__html: (post && post.content.rendered)}}>
                            </div>
                            {post !== null ?
                                <Share
                                    socialConfig={{
                                        twitterHandle,
                                        config: {
                                            url: `${url}/post?id=${(post && post.id)}`,
                                            title: (post.title.rendered),
                                        },
                                    }}
                                />
                                : <span></span>}

                            <br/>
                            <br/>
                            {(post !== null) ? <HyvorTalk.Embed id={"post-" + String(post.id)} websiteId={1128}/> :
                                <span>
                            </span>}

                        </Container>
                    </div>
                </div>
            </DefaultLayout>
        )
    };
}

export default Post
