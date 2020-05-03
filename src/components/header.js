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
import {faInstagram, faFacebookSquare, faTwitter} from '@fortawesome/free-brands-svg-icons'
import {faSearch} from '@fortawesome/free-solid-svg-icons'


const Header = ({siteTitle}) => {

    const handleExpand = (event) => {
        const name = event.target.getAttribute("name");
        const width = window.innerWidth;
        const target = event.target;
        target.classList.toggle("collapsed");
        if (width < 768) {
            (name === "about") ? setDetail1(!showDetail1) : setDetail2(!showDetail2);
            const selector = (name === "about") ? '.collapsed-detail.about' : '.collapsed-detail.news';
            var content = document.querySelector(selector);
            if (content.style.maxHeight) {
                content.style.maxHeight = null;
            } else {
                content.style.maxHeight = content.scrollHeight + "px";
            }
        } else {
            window.location.href = name
        }
    };

    const [collapsed, setCollapsed] = useState(true);

    const [isShow1, setShow1] = useState(false);
    const [isShow2, setShow2] = useState(false);
    const [isShow3, setShow3] = useState(false);
    const [isShow4, setShow4] = useState(false);

    const [showDetail1, setDetail1] = useState(false);
    const [showDetail2, setDetail2] = useState(false);

    const toggleNavbar = () => setCollapsed(!collapsed);
    return (
        <header id="page-header"
                className="page-header desktop-menu">
            <div style={{height: "80px;"}}>
            </div>
            <div id="page-header-inner" className="page-header-inner held">
                <div className="container-fluid">
                    <Row>
                        <Col xs="12">
                            <div className="header-wrap">
                                <div className="branding">
                                    <div className="branding__logo">
                                        <a href="/" rel="home">
                                            <img
                                                src={require("../images/svg/logo.svg")}
                                                alt="DanahZohar"/>
                                        </a>
                                    </div>
                                </div>


                                <div className="header-right">
                                    <div id="header-right-inner" className="header-right-inner">
                                        <div id="switcher-language-wrapper" className="switcher-language-wrapper">
                                            <div className="wpml-ls">
                                                <ul>
                                                    <li tabIndex="0"
                                                        className="wpml-ls">
                                                        <a href="#"
                                                           className="js-wpml-ls-item-toggle wpml-ls-item-toggle">
                                                            <img className="wpml-ls-flag"
                                                                 src="https://maxcoach.thememove.com/main/wp-content/themes/maxcoach-child-demo/assets/images/flags/en.png"
                                                                 alt="en" title="English"/><span
                                                            className="wpml-ls-native">English</span>
                                                        </a>
                                                        <ul className="wpml-ls-sub-menu">
                                                            <li className="wpml-ls-slot-shortcode_actions wpml-ls-item wpml-ls-item-fr">
                                                                <a href="#" className="wpml-ls-link">
                                                                    <img className="wpml-ls-flag"
                                                                         src="https://maxcoach.thememove.com/main/wp-content/themes/maxcoach-child-demo/assets/images/flags/fr.png"
                                                                         alt="fr" title="Français"/><span
                                                                    className="wpml-ls-native">Français</span>
                                                                </a>
                                                            </li>
                                                        </ul>
                                                    </li>
                                                </ul>
                                            </div>
                                        </div>


                                        {/*  <div className="header-search-form">
                                            <form role="search" method="get" className="search-form"
                                                  action="https://maxcoach.thememove.com/main/">
                                                <label>
                                                    <span className="screen-reader-text">Search for:</span>
                                                    <input type="search" className="search-field" placeholder="Search…"
                                                           value="" name="s" title="Search for:"/>
                                                </label>
                                                <button type="submit" className="search-submit">
                                                    <span className="search-btn-icon fas fa-search"></span>
                                                    <span className="search-btn-text">
			                                                        Search		</span>
                                                </button>
                                            </form>
                                        </div> */}


                                    </div>

                                    <div id="page-open-mobile-menu" className="header-icon page-open-mobile-menu">
                                        <div className="burger-icon">
                                            <span className="burger-icon-top"></span>
                                            <span className="burger-icon-bottom"></span>
                                        </div>
                                    </div>

                                    <div id="page-open-components" className="header-icon page-open-components">
                                        <div className="inner">
                                            <div className="circle circle-one"></div>
                                            <div className="circle circle-two"></div>
                                            <div className="circle circle-three"></div>
                                        </div>
                                    </div>
                                </div>

                                {/*  <div id="page-navigation" className="navigation page-navigation">
                                    <nav id="menu" className="menu menu--primary">
                                        <ul id="menu-primary" className="menu__container sm sm-simple"
                                            data-smartmenus-id="15882651590520815">
                                            <li id="menu-item-14"
                                                className="menu-item menu-item-type-custom menu-item-object-custom current-menu-ancestor current-menu-parent menu-item-has-children menu-item-14 level-1">
                                                <a href="https://maxcoach.thememove.com/" className="has-submenu"
                                                   id="sm-15882651590520815-1" aria-haspopup="true"
                                                   aria-controls="sm-15882651590520815-2" aria-expanded="false"><span
                                                    className="sub-arrow">+</span>
                                                    <div className="menu-item-wrap"><span
                                                        className="menu-item-title">Home</span><span
                                                        className="toggle-sub-menu"> </span></div>
                                                </a>
                                                <ul className="sub-menu children simple-menu sm-nowrap hide-animation"
                                                    id="sm-15882651590520815-2" role="group" aria-hidden="true"
                                                    aria-labelledby="sm-15882651590520815-1" aria-expanded="false"
                                                    style="width: auto; min-width: 10em; display: none; max-width: 20em; top: auto; left: 0px; margin-left: 0px; margin-top: 0px;">
                                                    <li id="menu-item-793"
                                                        className="menu-item menu-item-type-post_type menu-item-object-page menu-item-home menu-item-793">
                                                        <a href="https://maxcoach.thememove.com/main/">
                                                            <div className="menu-item-wrap"><span
                                                                className="menu-item-title">MaxCoach Education</span>
                                                            </div>
                                                        </a></li>
                                                    <li id="menu-item-792"
                                                        className="menu-item menu-item-type-post_type menu-item-object-page menu-item-792">
                                                        <a href="https://maxcoach.thememove.com/main/course-portal/">
                                                            <div className="menu-item-wrap"><span
                                                                className="menu-item-title">Course Portal</span></div>
                                                        </a></li>
                                                    <li id="menu-item-791"
                                                        className="menu-item menu-item-type-post_type menu-item-object-page menu-item-791">
                                                        <a href="https://maxcoach.thememove.com/main/distant-learning/">
                                                            <div className="menu-item-wrap"><span
                                                                className="menu-item-title">Distant Learning</span>
                                                            </div>
                                                        </a></li>
                                                    <li id="menu-item-790"
                                                        className="menu-item menu-item-type-post_type menu-item-object-page menu-item-790">
                                                        <a href="https://maxcoach.thememove.com/main/multimedia-pedagogy/">
                                                            <div className="menu-item-wrap"><span
                                                                className="menu-item-title">Multimedia Pedagogy</span>
                                                            </div>
                                                        </a></li>
                                                    <li id="menu-item-789"
                                                        className="menu-item menu-item-type-post_type menu-item-object-page menu-item-789">
                                                        <a href="https://maxcoach.thememove.com/main/modern-schooling/">
                                                            <div className="menu-item-wrap"><span
                                                                className="menu-item-title">Modern Schooling</span>
                                                            </div>
                                                        </a></li>
                                                    <li id="menu-item-788"
                                                        className="menu-item menu-item-type-post_type menu-item-object-page menu-item-788">
                                                        <a href="https://maxcoach.thememove.com/main/remote-training/">
                                                            <div className="menu-item-wrap"><span
                                                                className="menu-item-title">Remote Training</span></div>
                                                        </a></li>
                                                    <li id="menu-item-2209"
                                                        className="menu-item menu-item-type-post_type menu-item-object-page menu-item-2209">
                                                        <a href="https://maxcoach.thememove.com/main/health-coaching/">
                                                            <div className="menu-item-wrap"><span
                                                                className="menu-item-title">Health Coaching</span></div>
                                                        </a></li>
                                                    <li id="menu-item-2208"
                                                        className="menu-item menu-item-type-post_type menu-item-object-page menu-item-2208">
                                                        <a href="https://maxcoach.thememove.com/main/gym-coaching/">
                                                            <div className="menu-item-wrap"><span
                                                                className="menu-item-title">Gym Coaching</span></div>
                                                        </a></li>
                                                    <li id="menu-item-2581"
                                                        className="menu-item menu-item-type-post_type menu-item-object-page current-menu-item page_item page-item-2495 current_page_item menu-item-2581">
                                                        <a href="https://maxcoach.thememove.com/main/business/">
                                                            <div className="menu-item-wrap"><span
                                                                className="menu-item-title">Business</span></div>
                                                        </a></li>
                                                </ul>
                                            </li>
                                            <li id="menu-item-20"
                                                className="menu-item menu-item-type-custom menu-item-object-custom menu-item-has-children menu-item-20 level-1">
                                                <a href="#" className="has-submenu" id="sm-15882651590520815-3"
                                                   aria-haspopup="true" aria-controls="sm-15882651590520815-4"
                                                   aria-expanded="false"><span className="sub-arrow">+</span>
                                                    <div className="menu-item-wrap"><span
                                                        className="menu-item-title">Pages</span><span
                                                        className="toggle-sub-menu"> </span></div>
                                                </a>
                                                <ul className="sub-menu children simple-menu sm-nowrap hide-animation"
                                                    id="sm-15882651590520815-4" role="group" aria-hidden="true"
                                                    aria-labelledby="sm-15882651590520815-3" aria-expanded="false"
                                                    style="width: auto; display: none; top: auto; left: 0px; margin-left: 0px; margin-top: 0px; min-width: 10em; max-width: 20em;">
                                                    <li id="menu-item-1852"
                                                        className="menu-item menu-item-type-post_type menu-item-object-page menu-item-1852">
                                                        <a href="https://maxcoach.thememove.com/main/start-here/">
                                                            <div className="menu-item-wrap"><span
                                                                className="menu-item-title">Start Here</span></div>
                                                        </a></li>
                                                    <li id="menu-item-1851"
                                                        className="menu-item menu-item-type-post_type menu-item-object-page menu-item-1851">
                                                        <a href="https://maxcoach.thememove.com/main/success-story/">
                                                            <div className="menu-item-wrap"><span
                                                                className="menu-item-title">Success Story</span></div>
                                                        </a></li>
                                                    <li id="menu-item-426"
                                                        className="menu-item menu-item-type-post_type menu-item-object-page menu-item-426">
                                                        <a href="https://maxcoach.thememove.com/main/about-me/">
                                                            <div className="menu-item-wrap"><span
                                                                className="menu-item-title">About me</span></div>
                                                        </a></li>
                                                    <li id="menu-item-425"
                                                        className="menu-item menu-item-type-post_type menu-item-object-page menu-item-425">
                                                        <a href="https://maxcoach.thememove.com/main/about-us-01/">
                                                            <div className="menu-item-wrap"><span
                                                                className="menu-item-title">About us 01</span></div>
                                                        </a></li>
                                                    <li id="menu-item-424"
                                                        className="menu-item menu-item-type-post_type menu-item-object-page menu-item-424">
                                                        <a href="https://maxcoach.thememove.com/main/about-us-02/">
                                                            <div className="menu-item-wrap"><span
                                                                className="menu-item-title">About us 02</span></div>
                                                        </a></li>
                                                    <li id="menu-item-423"
                                                        className="menu-item menu-item-type-post_type menu-item-object-page menu-item-423">
                                                        <a href="https://maxcoach.thememove.com/main/about-us-03/">
                                                            <div className="menu-item-wrap"><span
                                                                className="menu-item-title">About us 03</span></div>
                                                        </a></li>
                                                    <li id="menu-item-422"
                                                        className="menu-item menu-item-type-post_type menu-item-object-page menu-item-422">
                                                        <a href="https://maxcoach.thememove.com/main/contact-me/">
                                                            <div className="menu-item-wrap"><span
                                                                className="menu-item-title">Contact me</span></div>
                                                        </a></li>
                                                    <li id="menu-item-421"
                                                        className="menu-item menu-item-type-post_type menu-item-object-page menu-item-421">
                                                        <a href="https://maxcoach.thememove.com/main/contact-us/">
                                                            <div className="menu-item-wrap"><span
                                                                className="menu-item-title">Contact us</span></div>
                                                        </a></li>
                                                    <li id="menu-item-1668"
                                                        className="menu-item menu-item-type-post_type menu-item-object-page menu-item-1668">
                                                        <a href="https://maxcoach.thememove.com/main/purchase-guide/">
                                                            <div className="menu-item-wrap"><span
                                                                className="menu-item-title">Purchase Guide</span></div>
                                                        </a></li>
                                                    <li id="menu-item-1660"
                                                        className="menu-item menu-item-type-post_type menu-item-object-page menu-item-privacy-policy menu-item-1660">
                                                        <a href="https://maxcoach.thememove.com/main/privacy-policy/">
                                                            <div className="menu-item-wrap"><span
                                                                className="menu-item-title">Privacy Policy</span></div>
                                                        </a></li>
                                                    <li id="menu-item-1659"
                                                        className="menu-item menu-item-type-post_type menu-item-object-page menu-item-1659">
                                                        <a href="https://maxcoach.thememove.com/main/terms-of-service/">
                                                            <div className="menu-item-wrap"><span
                                                                className="menu-item-title">Terms of Service</span>
                                                            </div>
                                                        </a></li>
                                                </ul>
                                            </li>
                                            <li id="menu-item-97"
                                                className="menu-item menu-item-type-post_type menu-item-object-page menu-item-has-children menu-item-97 level-1">
                                                <a href="https://maxcoach.thememove.com/main/courses/"
                                                   className="has-submenu" id="sm-15882651590520815-5"
                                                   aria-haspopup="true" aria-controls="sm-15882651590520815-6"
                                                   aria-expanded="false"><span className="sub-arrow">+</span>
                                                    <div className="menu-item-wrap"><span
                                                        className="menu-item-title">Courses</span><span
                                                        className="toggle-sub-menu"> </span></div>
                                                </a>
                                                <ul className="sub-menu children simple-menu sm-nowrap hide-animation"
                                                    id="sm-15882651590520815-6" role="group" aria-hidden="true"
                                                    aria-labelledby="sm-15882651590520815-5" aria-expanded="false"
                                                    style="width: auto; display: none; top: auto; left: 0px; margin-left: 0px; margin-top: 0px; min-width: 10em; max-width: 20em;">
                                                    <li id="menu-item-228"
                                                        className="menu-item menu-item-type-post_type menu-item-object-page menu-item-228">
                                                        <a href="https://maxcoach.thememove.com/main/courses-grid-01/">
                                                            <div className="menu-item-wrap"><span
                                                                className="menu-item-title">Courses Grid 01</span></div>
                                                        </a></li>
                                                    <li id="menu-item-227"
                                                        className="menu-item menu-item-type-post_type menu-item-object-page menu-item-227">
                                                        <a href="https://maxcoach.thememove.com/main/courses-grid-02/">
                                                            <div className="menu-item-wrap"><span
                                                                className="menu-item-title">Courses Grid 02</span></div>
                                                        </a></li>
                                                    <li id="menu-item-226"
                                                        className="menu-item menu-item-type-post_type menu-item-object-page menu-item-226">
                                                        <a href="https://maxcoach.thememove.com/main/courses-grid-03/">
                                                            <div className="menu-item-wrap"><span
                                                                className="menu-item-title">Courses Grid 03</span></div>
                                                        </a></li>
                                                    <li id="menu-item-1681"
                                                        className="menu-item menu-item-type-post_type menu-item-object-page menu-item-1681">
                                                        <a href="https://maxcoach.thememove.com/main/membership-account/membership-levels/">
                                                            <div className="menu-item-wrap"><span
                                                                className="menu-item-title">Membership Levels</span>
                                                            </div>
                                                        </a></li>
                                                    <li id="menu-item-98"
                                                        className="menu-item menu-item-type-post_type menu-item-object-page menu-item-98">
                                                        <a href="https://maxcoach.thememove.com/main/become-a-teacher/">
                                                            <div className="menu-item-wrap"><span
                                                                className="menu-item-title">Become a Teacher</span>
                                                            </div>
                                                        </a></li>
                                                    <li id="menu-item-1539"
                                                        className="menu-item menu-item-type-custom menu-item-object-custom menu-item-1539">
                                                        <a href="https://maxcoach.thememove.com/main/profile/maggiestrickland/">
                                                            <div className="menu-item-wrap"><span
                                                                className="menu-item-title">Profile</span></div>
                                                        </a></li>
                                                    <li id="menu-item-100"
                                                        className="menu-item menu-item-type-post_type menu-item-object-page menu-item-100">
                                                        <a href="https://maxcoach.thememove.com/main/course-checkout/">
                                                            <div className="menu-item-wrap"><span
                                                                className="menu-item-title">Checkout</span></div>
                                                        </a></li>
                                                    <li id="menu-item-124"
                                                        className="menu-item menu-item-type-post_type menu-item-object-lp_course menu-item-has-children menu-item-124">
                                                        <a href="https://maxcoach.thememove.com/main/course/programming-for-everyone-python/"
                                                           className="has-submenu" id="sm-15882651590520815-7"
                                                           aria-haspopup="true" aria-controls="sm-15882651590520815-8"
                                                           aria-expanded="false"><span className="sub-arrow">+</span>
                                                            <div className="menu-item-wrap"><span
                                                                className="menu-item-title">Single Layout</span><span
                                                                className="toggle-sub-menu"> </span></div>
                                                        </a>
                                                        <ul className="sub-menu children simple-menu"
                                                            id="sm-15882651590520815-8" role="group" aria-hidden="true"
                                                            aria-labelledby="sm-15882651590520815-7"
                                                            aria-expanded="false">
                                                            <li id="menu-item-125"
                                                                className="menu-item menu-item-type-post_type menu-item-object-lp_course menu-item-125">
                                                                <a href="https://maxcoach.thememove.com/main/course/programming-for-everyone-python/">
                                                                    <div className="menu-item-wrap"><span
                                                                        className="menu-item-title">Sticky Features Bar</span>
                                                                    </div>
                                                                </a></li>
                                                            <li id="menu-item-123"
                                                                className="menu-item menu-item-type-post_type menu-item-object-lp_course menu-item-123">
                                                                <a href="https://maxcoach.thememove.com/main/course/master-jquery-in-a-short-time/">
                                                                    <div className="menu-item-wrap"><span
                                                                        className="menu-item-title">Standard Sidebar</span>
                                                                    </div>
                                                                </a></li>
                                                            <li id="menu-item-128"
                                                                className="menu-item menu-item-type-post_type menu-item-object-lp_course menu-item-128">
                                                                <a href="https://maxcoach.thememove.com/main/course/introduction-to-javascript-for-beginners/">
                                                                    <div className="menu-item-wrap"><span
                                                                        className="menu-item-title">No Sidebar</span>
                                                                    </div>
                                                                </a></li>
                                                        </ul>
                                                    </li>
                                                </ul>
                                            </li>
                                            <li id="menu-item-1818"
                                                className="menu-item menu-item-type-custom menu-item-object-custom menu-item-1818 level-1">
                                                <a href="https://maxcoach.thememove.com/main/events/">
                                                    <div className="menu-item-wrap"><span
                                                        className="menu-item-title">Events</span></div>
                                                </a></li>
                                            <li id="menu-item-1652"
                                                className="menu-item menu-item-type-post_type menu-item-object-page menu-item-has-children menu-item-1652 level-1">
                                                <a href="https://maxcoach.thememove.com/main/blog/"
                                                   className="has-submenu" id="sm-15882651590520815-9"
                                                   aria-haspopup="true" aria-controls="sm-15882651590520815-10"
                                                   aria-expanded="false"><span className="sub-arrow">+</span>
                                                    <div className="menu-item-wrap"><span
                                                        className="menu-item-title">Blog</span><span
                                                        className="toggle-sub-menu"> </span></div>
                                                </a>
                                                <ul className="sub-menu children simple-menu sm-nowrap hide-animation"
                                                    id="sm-15882651590520815-10" role="group" aria-hidden="true"
                                                    aria-labelledby="sm-15882651590520815-9" aria-expanded="false"
                                                    style="width: auto; display: none; top: auto; left: 0px; margin-left: 0px; margin-top: 0px; min-width: 10em; max-width: 20em;">
                                                    <li id="menu-item-860"
                                                        className="menu-item menu-item-type-post_type menu-item-object-page menu-item-860">
                                                        <a href="https://maxcoach.thememove.com/main/blog-grid/">
                                                            <div className="menu-item-wrap"><span
                                                                className="menu-item-title">Blog Grid</span></div>
                                                        </a></li>
                                                    <li id="menu-item-859"
                                                        className="menu-item menu-item-type-post_type menu-item-object-page menu-item-859">
                                                        <a href="https://maxcoach.thememove.com/main/blog-masonry/">
                                                            <div className="menu-item-wrap"><span
                                                                className="menu-item-title">Blog Masonry</span></div>
                                                        </a></li>
                                                    <li id="menu-item-858"
                                                        className="menu-item menu-item-type-post_type menu-item-object-page menu-item-858">
                                                        <a href="https://maxcoach.thememove.com/main/blog-classic/">
                                                            <div className="menu-item-wrap"><span
                                                                className="menu-item-title">Blog Classic</span></div>
                                                        </a></li>
                                                    <li id="menu-item-857"
                                                        className="menu-item menu-item-type-post_type menu-item-object-page menu-item-857">
                                                        <a href="https://maxcoach.thememove.com/main/blog-list/">
                                                            <div className="menu-item-wrap"><span
                                                                className="menu-item-title">Blog List</span></div>
                                                        </a></li>
                                                </ul>
                                            </li>
                                            <li id="menu-item-1817"
                                                className="menu-item menu-item-type-post_type menu-item-object-page menu-item-has-children menu-item-1817 level-1">
                                                <a href="https://maxcoach.thememove.com/main/shop/"
                                                   className="has-submenu" id="sm-15882651590520815-11"
                                                   aria-haspopup="true" aria-controls="sm-15882651590520815-12"
                                                   aria-expanded="false"><span className="sub-arrow">+</span>
                                                    <div className="menu-item-wrap"><span
                                                        className="menu-item-title">Shop</span><span
                                                        className="toggle-sub-menu"> </span></div>
                                                </a>
                                                <ul className="sub-menu children simple-menu"
                                                    id="sm-15882651590520815-12" role="group" aria-hidden="true"
                                                    aria-labelledby="sm-15882651590520815-11" aria-expanded="false">
                                                    <li id="menu-item-1825"
                                                        className="menu-item menu-item-type-custom menu-item-object-custom menu-item-1825">
                                                        <a href="https://maxcoach.thememove.com/main/shop?shop_archive_preset=left-sidebar">
                                                            <div className="menu-item-wrap"><span
                                                                className="menu-item-title">Shop Left Sidebar</span>
                                                            </div>
                                                        </a></li>
                                                    <li id="menu-item-1826"
                                                        className="menu-item menu-item-type-custom menu-item-object-custom menu-item-1826">
                                                        <a href="https://maxcoach.thememove.com/main/shop?shop_archive_preset=right-sidebar">
                                                            <div className="menu-item-wrap"><span
                                                                className="menu-item-title">Shop Right Sidebar</span>
                                                            </div>
                                                        </a></li>
                                                    <li id="menu-item-1821"
                                                        className="menu-item menu-item-type-post_type menu-item-object-page menu-item-1821">
                                                        <a href="https://maxcoach.thememove.com/main/cart/">
                                                            <div className="menu-item-wrap"><span
                                                                className="menu-item-title">Cart</span></div>
                                                        </a></li>
                                                    <li id="menu-item-1823"
                                                        className="menu-item menu-item-type-post_type menu-item-object-page menu-item-1823">
                                                        <a href="https://maxcoach.thememove.com/main/wishlist/">
                                                            <div className="menu-item-wrap"><span
                                                                className="menu-item-title">Wishlist</span></div>
                                                        </a></li>
                                                    <li id="menu-item-1820"
                                                        className="menu-item menu-item-type-post_type menu-item-object-product menu-item-1820">
                                                        <a href="https://maxcoach.thememove.com/main/product/use-seo-to-boost-your-business/">
                                                            <div className="menu-item-wrap"><span
                                                                className="menu-item-title">Single Product</span></div>
                                                        </a></li>
                                                </ul>
                                            </li>
                                        </ul>
                                    </nav>
                                </div>


*/}
                            </div>
                        </Col>
                    </Row>
                </div>
            </div>
        </header>
    );
};

Header.propTypes = {
    siteTitle: PropTypes.string,
};

Header.defaultProps = {
    siteTitle: ``,
};

export default Header
