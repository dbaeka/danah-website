import React from "react"
import {Link} from "gatsby"

import SEO from "../components/seo"
import classnames from "classnames";
import axios from 'axios';
import DefaultLayout from "../layout/default";
import {FontAwesomeIcon} from '@fortawesome/react-fontawesome'
import {faLinkedin, faFacebookSquare, faTwitter} from '@fortawesome/free-brands-svg-icons'
import {faSearch} from '@fortawesome/free-solid-svg-icons'
import {
    Container,
    Card,
    CardBody,
    Button,
    UncontrolledTooltip,
    Nav,
    NavItem,
    Col,
    NavLink,
    TabContent,
    Row,
    TabPane, FormGroup, InputGroup, InputGroupAddon, InputGroupText, Input,
} from "reactstrap"
import SecondaryHeader from "../components/secondaryheader";
import NormalHeader from "../components/normalheader";


class Contact extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            name: '',
            email: '',
            message: ''
        }
    }

    onNameChange(event) {
        this.setState({name: event.target.value})
    }

    onEmailChange(event) {
        this.setState({email: event.target.value})
    }

    onMessageChange(event) {
        this.setState({message: event.target.value})
    }

    handleSubmit(e) {
        e.preventDefault();
        axios({
            method: "POST",
            url: "http://localhost:3002/send",
            data: this.state
        }).then((response) => {
            if (response.data.status === 'success') {
                alert("Message Sent.");
                this.resetForm()
            } else if (response.data.status === 'fail') {
                alert("Message failed to send.")
            }
        })
    }

    resetForm() {
        this.setState({
            name: '',
            email: '',
            message: ''
        })
    }

    render() {
        return (
            <DefaultLayout>
                <SEO title="Contact"/>
                <NormalHeader title="Contact"/>
                <div className="subpage">
                    <div className="section mt-5">
                        <Container>
                            <Row>
                                <Col className="contact-intro" xs="12" md="6">
                                    <h6>Hi, I am Danah Zohar</h6>
                                    <h3>Are you interested in <b>learning about Q's?</b> Contact me.</h3>
                                    <p> On this page we encourage users to leave their thoughts, start
                                        discussions and begin dialogue to understand how to integrate the Q’s into our
                                        lives
                                        to live a more fulfilling and rewarding life. <br/><br/>Use the feedback form to
                                        leave your
                                        thoughts.
                                    </p>
                                </Col>
                                <Col xs="12" md="6" className="contact-intro mt-auto mb-auto">
                                    <p> If you are interested in engaging Danah Zohar for leadership training,
                                        corporate&nbsp;seminars or workshops&nbsp; please email <a
                                            href="mailto:contact@danahzohar.com">contact@danahzohar.com</a>&nbsp;
                                        <br/><br/>
                                        For speaking engagements, contact <a
                                            href="mailto:regina@londonspeakerbureau.co.uk">Regina Gingell</a> at the
                                        London
                                        Speaker Bureau, telephone +44 (0)1428654892 in the UK, or +552135219419 in
                                        Brazil.<br/><br/>
                                        Danah Zohar welcomes comments about her books and her work. Please address your
                                        comments and questions to <a
                                            href="mailto:contact@danahzohar.com">contact@danahzohar.com</a>
                                    </p>
                                </Col>
                                <Row className="ml-auto mr-auto">
                                    <Col xs="10" className="mt-3 ml-auto mr-auto">
                                        <Card>
                                            <CardBody>
                                                <FormGroup
                                                    // className={classnames("mt-5", {
                                                    //     focused: nameFocused
                                                    // })}
                                                >
                                                    <InputGroup className="input-group-alternative">
                                                        <Input
                                                            placeholder="Your name"
                                                            type="text"
                                                            // onFocus={e => this.statesetNameFocused(true)}
                                                            value={this.state.name}
                                                            onChange={this.onNameChange.bind(this)}
                                                            // onBlur={e => setNameFocused(false)}
                                                        />
                                                    </InputGroup>
                                                </FormGroup>
                                                <FormGroup
                                                    // className={classnames({
                                                    //     focused: emailFocused
                                                    // })}
                                                >
                                                    <InputGroup className="input-group-alternative">
                                                        <Input
                                                            placeholder="Email address"
                                                            type="email"
                                                            // onFocus={e => setEmailFocused(true)}
                                                            // onBlur={e => setEmailFocused(false)}
                                                            value={this.state.email}
                                                            onChange={this.onEmailChange.bind(this)}
                                                        />
                                                    </InputGroup>
                                                </FormGroup>
                                                <FormGroup className="mb-4">
                                                    <Input
                                                        className="form-control-alternative"
                                                        cols="80"
                                                        name="name"
                                                        placeholder="Type a message..."
                                                        value={this.state.message}
                                                        onChange={this.onMessageChange.bind(this)}
                                                        rows="4"
                                                        type="textarea"
                                                    />
                                                </FormGroup>
                                                <div>
                                                    <Button
                                                        block
                                                        className="btn-round"
                                                        color="primary"
                                                        size="lg"
                                                        type="button"
                                                        onClick={this.handleSubmit.bind(this)}
                                                    >
                                                        Send Message
                                                    </Button>
                                                </div>
                                            </CardBody>
                                        </Card>
                                    </Col>
                                </Row>
                                <Col xs="12" className="mb-5 mt-5 contact-footer">
                                    <h5>
                                        Kindly follow my social media pages for more engagement
                                    </h5>
                                    <p>
                                        <a href="https://www.facebook.com/danah.zohar.1"><FontAwesomeIcon
                                            icon={faFacebookSquare}/> Facebook</a>
                                    </p>
                                    <p>
                                        <a href="https://twitter.com/DanahZohar/"><FontAwesomeIcon
                                            icon={faTwitter}/> Twitter</a>
                                    </p>
                                    <p>
                                        <a href="https://www.linkedin.com/in/danah-zohar-6750044/"><FontAwesomeIcon
                                            icon={faLinkedin}/> LinkedIn</a>
                                    </p>
                                </Col>
                            </Row>
                        </Container>
                    </div>
                </div>
            </DefaultLayout>
        )
    }
};
export default Contact
