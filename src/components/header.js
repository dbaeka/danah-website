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


    const navTheme = {
        mainColor: '#52b788',
        menuBgColor: '#edf7f3'
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
            <a className="nav-a-link" href="">Home</a>
            <a className="nav-a-link" href="">About</a>
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
            <a className="nav-a-link" href="">Books</a>
            <a className="nav-a-link" href="">News</a>
            <a className="nav-a-link" href="">Test and Surveys</a>
            <a className="nav-a-link" href="">Contact Us</a>
        </>
    );

    const rightLinks = (
        <>
            <Dropdown className="lang" nav isOpen={isShow3}
                      onMouseEnter={() => setShow3(true)}
                      onMouseLeave={() => setShow3(false)}
                      toggle={() => {
                      }}
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
                            src="https://maxcoach.thememove.com/main/wp-content/themes/maxcoach-child-demo/assets/images/flags/en.png"
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
        <div>
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
