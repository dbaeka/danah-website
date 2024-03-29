import React from "react";
import PropTypes from "prop-types";
import {Container, Row, Nav, NavItem, NavLink} from "shards-react";
import {navigate} from "gatsby";

const MainFooter = ({contained, menuItems, copyright}) => (
    <footer className="main-footer d-flex p-2 px-3 bg-white border-top">
        <Container fluid={contained}>
            <Row>
                <Nav>
                    {menuItems.map((item, idx) => (
                        <NavItem key={idx}>
                            <NavLink tag={"a"} onClick={() => navigate("/")}>
                                {item.title}
                            </NavLink>
                        </NavItem>
                    ))}
                </Nav>
                <span className="copyright ml-auto my-auto mr-2">{copyright}</span>
            </Row>
        </Container>
    </footer>
);

MainFooter.propTypes = {
    /**
     * Whether the content is contained, or not.
     */
    contained: PropTypes.bool,
    /**
     * The menu items array.
     */
    menuItems: PropTypes.array,
    /**
     * The copyright info.
     */
    copyright: PropTypes.string
};

MainFooter.defaultProps = {
    contained: false,
    copyright: "Copyright © " + new Date().getFullYear(),
    menuItems: [
        {
            title: "Home",
            to: "/"
        },

    ]
};

export default MainFooter;
