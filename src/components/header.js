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
import {faInstagram, faFacebookSquare, faTwitter} from '@fortawesome/free-brands-svg-icons'
import {faSearch} from '@fortawesome/free-solid-svg-icons'

const Header = ({siteTitle}) => {
    const [isShow1, setShow1] = useState(false);
    const [isShow2, setShow2] = useState(false);
    const [isShow3, setShow3] = useState(false);
    const [isShow4, setShow4] = useState(false);

    const [showDetail1, setDetail1] = useState(false);
    const [showDetail2, setDetail2] = useState(false);

    const handleExpand = (event) => {
        const name = event.target.getAttribute("name");
        const width = window.innerWidth;
        const target = event.target;
        target.classList.toggle("collapsed");
        if (width < 943) {
            (name === "activities") ? setDetail1(!showDetail1) : setDetail2(!showDetail2);
            const selector = (name === "activities") ? '.collapsed-detail.activities' : '.collapsed-detail.projects';
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
        <a href="/" rel="home">
            <img
                src={require("../images/svg/logo.svg")}
                alt="DanahZohar"/>
        </a>
    </div>;

    const leftLinks = (
        <>
            <span className="social-menu">
                <ul className="menu left">
                    <li className="first leaf">
                        <a href="https://www.instagram.com/usinterior/">
                            <FontAwesomeIcon icon={faInstagram}/>
                        </a>
                    </li>
                    <li className="leaf">
                        <a href="https://www.facebook.com/USInterior"><FontAwesomeIcon
                            icon={faFacebookSquare}/></a>
                    </li>
                    <li className="last leaf">
                        <a href="https://twitter.com/interior"><FontAwesomeIcon
                            icon={faTwitter}/></a>
                    </li>
                </ul>
                <ul className="menu right">
                    <li className="first leaf active">
                       <img
                           className="flag"
                           src="https://maxcoach.thememove.com/main/wp-content/themes/maxcoach-child-demo/assets/images/flags/en.png"
                           alt="en" title="English"/>
                    <span className="ls-native">EN</span>
                    </li>
                    <li className="leaf">
                       <img
                           className="flag"
                           src={require("../images/china.png")}
                           alt="en" title="English"/>
                    <span className="ls-native">CN</span>
                    </li>
                </ul>
            </span>
            <span className="nav-link-span"><a className="nav-a-link" href="">Home</a></span>
            <span className="nav-link-span"><a className="nav-a-link" href="">About</a></span>
            <Dropdown className="" nav isOpen={isShow1}
                      onMouseEnter={() => setShow1(true)}
                      onMouseLeave={() => setShow1(false)}
                      toggle={() => {
                      }}
            >
                <DropdownToggle nav caret>Activities</DropdownToggle>
                <DropdownMenu>
                    <DropdownItem tag="a" href="/">Speaking Engagement</DropdownItem>
                    <DropdownItem tag="a" href="/">Training Programs</DropdownItem>
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
                            <a href="/energy" title="New Energy Frontier">
                            Speaking Engagement</a></li>
                        <li className="mb-2"><a href="/jobs">Training Programs</a></li>
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
            <span className="nav-link-span"><a className="nav-a-link" href="">Books</a></span>
            <span className="nav-link-span"> <a className="nav-a-link" href="">News</a></span>
            <span className="nav-link-span"> <a className="nav-a-link" href="">Test and Surveys</a></span>
            <span className="nav-link-span"> <a className="nav-a-link" href="">Contact Us</a></span>
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
                        src="https://maxcoach.thememove.com/main/wp-content/themes/maxcoach-child-demo/assets/images/flags/en.png"
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
            <FormGroup className="header-search" action="//search.usa.gov/search" method="get"
                       id="search-block-form">
                <InputGroup className="search-btn">
                    <Input
                        className=""
                        type="text"
                        name="query"
                        maxLength="128"
                        id="query"
                        placeholder="Search"
                    />
                    <InputGroupAddon addonType="append">
                        <Button className="btn-white"><FontAwesomeIcon icon={faSearch}/></Button>
                    </InputGroupAddon>
                </InputGroup>
            </FormGroup>
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
