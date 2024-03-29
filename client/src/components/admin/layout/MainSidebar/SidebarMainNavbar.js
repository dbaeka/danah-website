import React from "react";
import PropTypes from "prop-types";
import {Navbar, NavbarBrand} from "shards-react";
import {Actions} from "../../../../flux";

class SidebarMainNavbar extends React.Component {
    constructor(props) {
        super(props);

        this.handleToggleSidebar = this.handleToggleSidebar.bind(this);
    }

    handleToggleSidebar() {
        Actions.toggleMenu();
    }

    render() {
        const {hideLogoText} = this.props;
        return (
            <div className="main-navbar">
                <Navbar
                    className="align-items-stretch bg-white flex-md-nowrap border-bottom p-0"
                    type="light"
                >
                    <a
                        className="w-100 mr-0"
                        href="#"
                        style={{lineHeight: "25px", textDecoration: "none", color: "#323232", fontWeight: "700"}}

                    >
                        <div className="d-table m-auto">
                            {!hideLogoText && (
                                <span className="d-none d-md-inline ml-1">
                  Admin Dashboard
                </span>
                            )}
                        </div>
                    </a>
                    {/* eslint-disable-next-line */}
                    <a
                        className="toggle-sidebar d-sm-inline d-md-none d-lg-none"
                        onClick={this.handleToggleSidebar}
                    >
                        <i className="material-icons">&#xE5C4;</i>
                    </a>
                </Navbar>
            </div>
        );
    }
}

SidebarMainNavbar.propTypes = {
    /**
     * Whether to hide the logo text, or not.
     */
    hideLogoText: PropTypes.bool
};

SidebarMainNavbar.defaultProps = {
    hideLogoText: false
};

export default SidebarMainNavbar;
