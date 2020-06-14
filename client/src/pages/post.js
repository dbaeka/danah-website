import React from "react"
import {Link} from "gatsby"

import SEO from "../components/seo"
import DefaultLayout from "../layout/default";
import {Container, Button, UncontrolledTooltip, Nav, NavItem, Col, NavLink, TabContent, Row, TabPane,} from "reactstrap"
import SecondaryHeader from "../components/secondaryheader";
import NormalHeader from "../components/normalheader";
import Store from "../flux/store";
import {Actions} from "../flux";
import {clean} from "../utils/clean"

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
        Actions.setPost(id);
    }

    onChange() {
        this.setState({
            ...this.state,
            post: Store.getCurrentPost(),
        });
    }

    render() {

        const {post} = this.state;

        return (
            <DefaultLayout>
                <SEO title={post && post.title.rendered}/>
                <NormalHeader position="50% 9%" image={require("../images/header2.jpg")} title={post && post.title.rendered}/>
                <div className="subpage">
                    <div className="section">
                        <Container>
                            <h3 className="title">{post && post.title.rendered}</h3>
                            <div className="mb-4" dangerouslySetInnerHTML={{__html: (post && post.content.rendered)}}>
                            </div>
                        </Container>
                    </div>
                </div>
            </DefaultLayout>
        )
    };
}

export default Post
