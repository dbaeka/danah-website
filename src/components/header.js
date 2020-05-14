import {Link} from "gatsby"
import PropTypes from "prop-types"
import Navbar from '@ovie/react-navbar'
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
    NavItem,
    Dropdown,
    DropdownItem,
    DropdownMenu,
    DropdownToggle,
    Collapse,
    Row,
    Col,
    FormGroup,
    Input
} from "reactstrap"
import {FontAwesomeIcon} from '@fortawesome/react-fontawesome'
import {faLinkedin, faFacebookSquare, faTwitter} from '@fortawesome/free-brands-svg-icons'
import {faSearch} from '@fortawesome/free-solid-svg-icons'

const Header = ({siteTitle}) => {
    const [isShow1, setShow1] = useState(false);
    const [isShow2, setShow2] = useState(false);
    const [isShow3, setShow3] = useState(false);
    const [isShow4, setShow4] = useState(false);

    const [showDetail1, setDetail1] = useState(false);
    const [showDetail2, setDetail2] = useState(false);
    const [showDetail3, setDetail3] = useState(false);

    const handleExpand = (event) => {
        const name = event.target.getAttribute("name");
        const width = window.innerWidth;
        const target = event.target;
        target.classList.toggle("collapsed");
        if (width < 943) {
            (name === "activities") ? setDetail1(!showDetail1) : (name === "projects") ? setDetail2(!showDetail2) : setDetail3(!showDetail3);
            const selector = (name === "activities") ? '.collapsed-detail.activities' : (name === "projects") ? '.collapsed-detail.projects' : '.collapsed-detail.about';
            var content = document.querySelector(selector);
            if (content.style.maxHeight) {
                content.style.maxHeight = null;
            } else {
                content.style.maxHeight = content.scrollHeight + "px";
            }
        }
    };

    const navTheme = {
        mainColor: '#ca0072',
        menuBgColor: '#222222'
    };

    const navBrand = <div className="branding__logo">
        <Link to="/" rel="home">
            <img
                src={require("../images/svg/logo.svg")}
                alt="DanahZohar"/>
        </Link>
    </div>;

    const leftLinks = (
        <>
            <span className="social-menu">
                <ul className="menu left pl-4">
                    <li className="first leaf ">
                        <a target="_blank" href="https://www.linkedin.com/in/danah-zohar-6750044/">
                            <FontAwesomeIcon icon={faLinkedin}/>
                        </a>
                    </li>
                    <li className="leaf">
                        <a target="_blank" href="https://www.facebook.com/danah.zohar.1"><FontAwesomeIcon
                            icon={faFacebookSquare}/></a>
                    </li>
                    <li className="last leaf">
                        <a target="_blank" href="https://twitter.com/DanahZohar/"><FontAwesomeIcon
                            icon={faTwitter}/></a>
                    </li>
                </ul>
                <ul className="menu right">
                    <li className="first leaf active">
                       <img
                           className="flag"
                           src={require("../images/en.png")}
                           alt="en" title="English"/>
                    <span className="ls-native">EN</span>
                    </li>
                    <li className="leaf mr-2">
                       <img
                           className="flag"
                           src={require("../images/china.png")}
                           alt="en" title="Chinese"/>
                    <span className="ls-native">CN</span>
                    </li>
                </ul>
            </span>
            <span className="nav-link-span"><a className="nav-a-link text-link" href="/">Home</a></span>
            {/*<span className="nav-link-span"><a className="nav-a-link text-link" href="/about">About</a></span>*/}
            <Dropdown className="" nav isOpen={isShow4}
                      onMouseEnter={() => setShow4(true)}
                      onMouseLeave={() => setShow4(false)}
                      toggle={() => {
                      }}
            >
                <DropdownToggle nav caret tag="a" href="/about">About</DropdownToggle>
                <DropdownMenu>
                    <DropdownItem tag="a" href="/learnqs">Learn the Q's</DropdownItem>
                    <DropdownItem tag="a" href="/twelveprinciples">12 Principles of SQ</DropdownItem>
                    <DropdownItem tag="a" href="/experienceqs">Experience Q's</DropdownItem>
                </DropdownMenu>
            </Dropdown>
            <span className={"nav-link-span drop"}>
                <div
                    name="about"
                    className={"children nav-a-link"
                    + (showDetail3 ? " collapsed" : "")
                    + (isShow4 ? " active" : "")}
                    onClick={handleExpand}
                >
                    About
                </div>
                <div className={"collapsed-detail about"}>
                    <ul className="mt-2 mb-2">
                         <li className="mb-2">
                            <a href="/about">Go to About
                            </a>
                         </li>
                        <li className="mb-2">
                            <a href="/learnqs">Learn the Q's
                            </a></li>
                        <li className="mb-2">
                            <a href="/twelveprinciples">12 Principles of SQ</a>
                        </li>
                         <li className="mb-2">
                            <a href="/experienceqs">Experience Q's</a>
                        </li>
                    </ul>
                </div>
            </span>
            <Dropdown className="" nav isOpen={isShow1}
                      onMouseEnter={() => setShow1(true)}
                      onMouseLeave={() => setShow1(false)}
                      toggle={() => {
                      }}
            >
                <DropdownToggle nav caret>Activities</DropdownToggle>
                <DropdownMenu>
                    <DropdownItem tag="a" href="/speaking">Speaking Engagement</DropdownItem>
                    <DropdownItem tag="a" href="/training">Training Programs</DropdownItem>
                    <DropdownItem tag="a" href="/videos">Videos</DropdownItem>
                </DropdownMenu>
            </Dropdown>
            <span className={"nav-link-span drop"}>
                <div
                    name="activities"
                    className={"children nav-a-link"
                    + (showDetail1 ? " collapsed" : "")
                    + (isShow1 ? " active" : "")}
                    onClick={handleExpand}
                >
                    Activities
                </div>
                <div className={"collapsed-detail activities"}>
                    <ul className="mt-2 mb-2">
                        <li className="mb-2">
                            <a href="/speaking" title="Speaking Engagement">
                            Speaking Engagement</a></li>
                        <li className="mb-2">
                            <a href="/training" title="Training Programs">Training Programs</a>
                        </li>
                         <li className="mb-2">
                            <a href="/videos" title="Training Programs">Videos</a>
                        </li>
                    </ul>
                </div>
            </span>
            <Dropdown className="" nav isOpen={isShow2}
                      onMouseEnter={() => setShow2(true)}
                      onMouseLeave={() => setShow2(false)}
                      toggle={() => {
                      }}
            >
                <DropdownToggle nav caret>Projects</DropdownToggle>
                <DropdownMenu>
                    <DropdownItem tag="a" href="/">The Quantum Society of Science, Art, Culture, and
                        Business </DropdownItem>
                    <DropdownItem tag="a" href="/">The Global Quantum Leader Network</DropdownItem>
                    <DropdownItem tag="a" href="/">The Quantum Management Research Institute</DropdownItem>
                </DropdownMenu>
            </Dropdown>
            <span className={"nav-link-span drop"}>
                <div
                    name="projects"
                    className={"children nav-a-link"
                    + (showDetail2 ? " collapsed" : "")
                    + (isShow2 ? " active" : "")}
                    onClick={handleExpand}
                >
                    Projects
                </div>
                <div className={"collapsed-detail projects"}>
                    <ul className="mt-2 mb-2">
                        <li className="mb-2">
                            <a href="/energy" title="New Energy Frontier">
                             The Quantum Society of Science, Art, Culture, and
                        Business </a></li>
                        <li className="mb-2"><a href="/jobs">The Global Quantum Leader Network</a></li>
                        <li className="mb-2"><a href="/jobs">The Quantum Management Research Institute</a></li>
                    </ul>
                </div>
            </span>
            <span className="nav-link-span"><a className="nav-a-link text-link" href="/books">Books</a></span>
            <span className="nav-link-span"> <a className="nav-a-link text-link" href="/news">News</a></span>
            <span className="nav-link-span"> <a className="nav-a-link text-link"
                                                href="/test">Test and Surveys</a></span>
            <span className="nav-link-span"> <a className="nav-a-link text-link" href="/contact">Contact Us</a></span>
        </>
    );

    const rightLinks = (
        <>
            <Dropdown className="lang" nav isOpen={isShow3}
                      onMouseEnter={() => setShow3(true)}
                      onMouseLeave={() => setShow3(false)}
                      toggle={() => {
                      }}
                      style={{height: "57px"}}
            >
                <DropdownToggle nav caret>
                    <img
                        className="flag"
                        src={require("../images/en.png")}
                        alt="en" title="English"/>
                    <span className="ls-native">English</span>
                </DropdownToggle>
                <DropdownMenu>
                    <DropdownItem>
                        <img
                            className="flag"
                            src={require("../images/china.png")}
                            alt="zh-cn" title="Chinese"/>
                        <span className="ls-native">Chinese</span>
                    </DropdownItem>
                </DropdownMenu>
            </Dropdown>
            {/*<FormGroup className="header-search" action="//search.usa.gov/search" method="get"*/}
            {/*           id="search-block-form">*/}
            {/*    <InputGroup className="search-btn">*/}
            {/*        <Input*/}
            {/*            className=""*/}
            {/*            type="text"*/}
            {/*            name="query"*/}
            {/*            maxLength="128"*/}
            {/*            id="query"*/}
            {/*            placeholder="Search"*/}
            {/*        />*/}
            {/*        <InputGroupAddon addonType="append">*/}
            {/*            <Button className="btn-white"><FontAwesomeIcon icon={faSearch}/></Button>*/}
            {/*        </InputGroupAddon>*/}
            {/*    </InputGroup>*/}
            {/*</FormGroup>*/}
        </>
    );


    return (
        <div style={{height: "57px"}}>
            <Navbar
                className="navbar nav-custom" // style .navbar in your css
                menuClassName="navbar--menu" // style .navbar--menu in your css
                brand={navBrand}
                theme={navTheme}
                leftLinks={leftLinks}
                rightLinks={rightLinks}
            />
        </div>
    );
};

Header.propTypes = {
    siteTitle: PropTypes.string,
};

Header.defaultProps = {
    siteTitle: ``,
};

export default Header
