import {Link} from "gatsby"
import PropTypes from "prop-types"
import React, {useState} from "react"
import {
    Form,
    Button,
    InputGroup,
    InputGroupAddon,
    Label,
    Container,
    Nav,
    UncontrolledDropdown,
    DropdownItem,
    DropdownMenu,
    DropdownToggle,
    Navbar,
    NavbarToggler,
    NavItem,
    NavLink,
    NavbarText,
    Collapse,
    Row,
    Col,
    FormGroup,
    Input
} from "reactstrap"
import {FontAwesomeIcon} from '@fortawesome/react-fontawesome'
import {faInstagram, faFacebookF, faTwitter} from '@fortawesome/free-brands-svg-icons'
import {faCircle, faEnvelope, faPhone, faMapMarker} from '@fortawesome/free-solid-svg-icons'

const Footer = ({siteTitle}) => {
    return (
        <footer className="footer" role="banner">
            <Container>
                <Row>
                    <Col sm="12" md="6" lg="4">
                        <div>
                            <div className="footer_logo_wrapper">
                                <div className="left">
                                    <a href="/"
                                       className="footer_logo">
                                        <img
                                            // src={require("../images/svg/coat_arms.svg")}
                                            alt="Footer Logo"/>
                                    </a>
                                </div>
                                <div className="right">
                                    <div> Ministry of Planning</div>

                                </div>
                            </div>
                            <div className="footer_info_content">Lorem ipsum dolor sit amet, consectetur adipiscing
                                elit. Curabitur hendrerit interdum ex id rutrum.
                            </div>
                            <div className="footer_info_contact mt-4 ml-0 mt-md-3 ml-md-1 ml-sm-4 mt-sm-4">
                                <div className="marked">
                                    <a href="mailto:mail@example.com">
                                        <FontAwesomeIcon className="mr-2 text-black" icon={faEnvelope}/>
                                        mail@example.com
                                    </a>
                                </div>
                                <div className="marked mt-3">
                                    <a href="tel:+233503695535">
                                        <FontAwesomeIcon className="mr-2 text-black" icon={faPhone}/>
                                        +233-(0) 503695535
                                    </a>
                                </div>
                                <div className="mt-3">
                                    <FontAwesomeIcon className="mr-2" icon={faMapMarker}/>
                                    <span className="d-inline-flex">
                                        A28 Regimanuel Estate, Nungua Barrier<br/>Sakumono, Accra, Ghana
                                    </span>

                                </div>
                            </div>

                            <div className="footer_info_social my-2 ml-4">
                                <ul>
                                    <li className="">
                                        <a href="#">
                                            <FontAwesomeIcon icon={faFacebookF}/>
                                        </a>
                                    </li>
                                    <li className="">
                                        <a href="#">
                                            <FontAwesomeIcon icon={faTwitter}/>
                                        </a>
                                    </li>
                                    <li className="">
                                        <a href="#">
                                            <FontAwesomeIcon icon={faInstagram}/>
                                        </a>
                                    </li>
                                </ul>
                            </div>
                        </div>
                    </Col>
                    <Col sm="12" md="6" lg="4">
                        <div className="mt-4 footer-titles recent-posts">
                            <h4 className="title">Recent Posts</h4>
                            <div>
                                <Row className="mb-3">
                                    <Col xs="4" md="4">
                                        <div className="image">
                                            <a href="https://demos.gumtheme.com/focus/2018/05/29/diy-raspberry-pi-underwater-camera-allows-you-to-explore-shallow-water/"
                                               className="gum-block-post-img">
                                                <img
                                                    src="http://www.mop.gov.gh/wp-content/uploads/2018/09/42671696_1698744543588694_4019616835279257600_n.jpg"
                                                    alt=""
                                                    className="gum-p-img"/>
                                            </a>
                                        </div>
                                    </Col>
                                    <Col xs="8" md="8" className="detail col-xs-8 col-md-8">
                                        <h3 className="post-title">
                                            <a
                                                href="">
                                                8th Policy Dialogue Series
                                            </a>
                                        </h3>
                                        <span className="float-left">
                                                <span className="author">Agriculture</span>
                                                <FontAwesomeIcon className="divider" icon={faCircle}/>
                                                <span className="date"> Sep 26, 2018</span>
                                            </span>
                                    </Col>
                                </Row>
                            </div>
                        </div>
                    </Col>
                    <Col sm="12" md="6" lg="4">
                        <div className="mt-4 footer-titles useful-links">
                            <h4 className="title">Site Links</h4>
                            <div className="mb-4 links">
                                <Row>
                                    <Col xs="6" md="12">
                                        <a href="">Resources</a>
                                    </Col>
                                    <Col xs="6" md="12">
                                        <a href="">Ghana GOV</a>
                                    </Col>
                                    <Col xs="6" md="12">
                                        <a href="">Facebook</a>
                                    </Col>
                                </Row>
                            </div>
                        </div>
                    </Col>
                </Row>
            </Container>
            <div className="footer-nav">
                <Container>
                    <Row>
                        <Col sm="12" className="py-3 copyright">
                            Copyright © {new Date().getFullYear()}. Ministry of Planning. All rights reserved.
                        </Col>
                    </Row>
                </Container>
            </div>
        </footer>
    );
};

Footer.propTypes = {
    siteTitle: PropTypes.string,
};

Footer.defaultProps = {
    siteTitle: ``,
};

export default Footer;
