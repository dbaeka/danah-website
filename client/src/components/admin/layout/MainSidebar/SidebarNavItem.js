import React from "react";
import PropTypes from "prop-types";
import {NavItem, NavLink} from "shards-react";
import {navigate} from "gatsby";

const SidebarNavItem = ({item}) => (
    <NavItem>
        <NavLink tag={"a"} onClick={() => navigate(item.to)}>
            {item.htmlBefore && (
                <div
                    className="d-inline-block item-icon-wrapper"
                    dangerouslySetInnerHTML={{__html: item.htmlBefore}}
                />
            )}
            {item.title && <span>{item.title}</span>}
            {item.htmlAfter && (
                <div
                    className="d-inline-block item-icon-wrapper"
                    dangerouslySetInnerHTML={{__html: item.htmlAfter}}
                />
            )}
        </NavLink>
    </NavItem>
);

SidebarNavItem.propTypes = {
    /**
     * The item object.
     */
    item: PropTypes.object
};

export default SidebarNavItem;
