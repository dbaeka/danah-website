import React from "react"
import {Link} from "gatsby"

import SEO from "../components/seo"
import DefaultLayout from "../layout/default";
import {Container, Col, Row, Pagination, PaginationItem, PaginationLink} from "reactstrap"
import NormalHeader from "../components/normalheader";
import Store from "../flux/store";
import {Actions} from "../flux";
import {clean} from "../utils/clean"

class Blogs extends React.Component {

    constructor(props) {
        super(props);
        this.state = {
            posts: Store.getPosts().items,
            pagesCount: 1,
            currentPage: 0,
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

    render() {
        const {posts, currentPage} = this.state;

        return (
            <DefaultLayout>
                <SEO title="Blogs"/>
                {/*<NormalHeader  position="50% 9%" image={require("../images/header2.jpg")} title="Experience Q's"/>*/}
                <div className="subpage mb-5">
                    <div className="section">
                        <Container>
                            <h3 className="title">Blogs</h3>
                            {
                                posts && posts.map((post, idx) => {
                                    return <Col key={idx} xs="12" className="mb-3">
                                        <Row className="ml-md-3 mb-2 pb-0 jet-posts__inner-box">
                                            <Col xs="4" className="post-thumbnail pt-4"
                                                 style={{backgroundColor: "#fff"}}>
                                                <Link
                                                    to={"/post?post=" + post.id}
                                                    className="post-thumbnail__link">
                                                    <img className="post-thumbnail__img_wp-post-image"
                                                         src={require("../images/blog_placeholder.png")}
                                                         alt="Stop Ignoring These 7 Inspiring Truths"
                                                         width="500" height="660"/>
                                                </Link>
                                            </Col>
                                            <Col xs="8" className="jet-posts__inner-content">
                                                <h4 className="entry-title" style={{marginTop: "0"}}>
                                                    <Link
                                                        to={"/post?post=" + post.id}>
                                                        {post.title.rendered}
                                                    </Link>
                                                </h4>
                                                <div className="post-meta">
                                        <span className="post__date post-meta__item">
                                                <time>{new Date(post.date).toLocaleDateString("en-US", {
                                                    year: 'numeric',
                                                    month: 'long',
                                                    day: 'numeric'
                                                })}</time>
                                        </span>
                                                </div>
                                                <div className="entry-excerpt">
                                                    {this.trimText(clean(post.content.rendered), 120)}
                                                </div>
                                                <div className="jet-more-wrap">
                                                    <Link
                                                        to={"/post?post=" + post.id}
                                                        className="btn btn-primary elementor-button elementor-size-md jet-more">
                                                        <span className="btn__text">Read More</span>
                                                    </Link>
                                                </div>
                                            </Col>
                                        </Row>
                                    </Col>
                                })}
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
                    </div>
                </div>
            </DefaultLayout>
        )
    };
}

export default Blogs
