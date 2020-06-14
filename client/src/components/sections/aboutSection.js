import React from "react";
// reactstrap components
import {Row, Container, Col} from "reactstrap";
import Store from "../../flux/store";
import {Actions} from "../../flux";
import {clean} from "../../utils/clean"
import {Link} from 'gatsby';

// core components

class AboutSection extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            posts: Store.getPosts(),
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
        Actions.getPosts();
    }

    onChange() {
        this.setState({
            ...this.state,
            posts: Store.getPosts(),
        });
    }

    trimText = (str, n) => (
        (str.length > n) ? str.substr(0, n - 1) + '...' : str
    );

    render() {

        const {posts} = this.state;

        return (
            <div id="intro"
                 className=""
            >
                <Container>
                    <div className="py-130">
                        <Row className="about-entry">
                            <Col xs="12" md="2" className="mb-5">
                                <div className="avia-image-container-inner" style={{width: "110px", height: "110px"}}>
                                    <img
                                        className="avia_image"
                                        src={require("../../images/danah_profile.jpg")}
                                        alt="Penelope portrait" title="thumbnail"/>
                                </div>
                            </Col>
                            <Col xs="12" md="4">
                                <div className="">
                                    <h3 className="title">
                                        Who is Danah </h3>
                                </div>
                                <section className="textblock_section">
                                    <div className="avia_textblock">
                                        <p>Danah Zohar is a management thought leader, physicist, philosopher and
                                            author.
                                            Her best-selling books include Spiritual Capital: Wealth We Can Live By and
                                            SQ –
                                            Spiritual Intelligence, The Ultimate Intelligence, which constitute
                                            ground-breaking work on SQ, spiritual intelligence and spiritual capital;
                                            ReWiring the Corporate Brain, The Quantum Society and The Quantum Self,
                                            previous
                                            work which extends the language and principles of quantum physics into a new
                                            understanding of human consciousness, psychology and social organization,
                                            particularly the organization of companies.</p>
                                    </div>
                                    <a href="/about" className="link-purple">Learn more</a>
                                </section>
                            </Col>
                            <Col className="featured" xs="12" md="6">
                                <div className="w-100 title">
                                    Featured Posts
                                </div>
                                <Row className="mt-4">
                                    {posts && posts.map((post, idx) => {
                                            if (idx === 0) {
                                                return <Col key={idx} xs="12" className="mb-3">
                                                    <Row className="ml-md-3 mb-2 pb-0 jet-posts__inner-box">
                                                        <Col xs="4" className="post-thumbnail pt-4"
                                                             style={{backgroundColor: "#fff"}}>
                                                            <Link
                                                                to={"/post?post="+post.id}
                                                                className="post-thumbnail__link">
                                                                <img className="post-thumbnail__img_wp-post-image"
                                                                     src={require("../../images/blog_placeholder.png")}
                                                                     alt="Stop Ignoring These 7 Inspiring Truths"
                                                                     width="500" height="660"/>
                                                            </Link>
                                                        </Col>
                                                        <Col xs="8" className="jet-posts__inner-content">
                                                            <h4 className="entry-title">
                                                                <Link
                                                                    onClick={() => Actions.setPost(post)}
                                                                    to={"/post?post="+post.id}>
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
                                                                    to={"/post?post="+post.id}
                                                                    onClick={() => Actions.setPost(post)}
                                                                    className="btn btn-primary elementor-button elementor-size-md jet-more">
                                                                    <span className="btn__text">Read More</span>
                                                                </Link>
                                                            </div>
                                                        </Col>
                                                    </Row>
                                                </Col>
                                            } else if (idx < 3) {
                                                return <Col xs="12" key={idx} className="ml-md-3 mb-3 pb-0">
                                                    <div className="jet-posts__inner-box pb-0">
                                                        <div className="jet-posts__inner-content">
                                                            <h4 className="entry-title pt-0">
                                                                <Link
                                                                    style={{fontSize: "16px"}}
                                                                    to={"/post?post="+post.id}>
                                                                    {post.title.rendered}
                                                                </Link>
                                                            </h4>
                                                            <div className="entry-excerpt pb-0">
                                                                {this.trimText(clean(post.content.rendered), 120)}
                                                                <Link
                                                                    to={"/post?post="+post.id}
                                                                    className="text-link">
                                                                    Read More
                                                                </Link>
                                                            </div>
                                                        </div>
                                                    </div>
                                                </Col>
                                            }
                                        }
                                    )}
                                </Row>
                                <div className="text-center"><h5><a className="link-purple" href="/blogs"><b>SEE ALL
                                    BLOGS</b></a></h5></div>
                            </Col>
                        </Row>
                    </div>
                </Container>
            </div>
        );
    };
}

export default AboutSection;
