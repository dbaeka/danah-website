/**
 * Layout component that queries for data
 * with Gatsby's useStaticQuery component
 *
 * See: https://www.gatsbyjs.org/docs/use-static-query/
 */

import React from "react"
import PropTypes from "prop-types"
import {useStaticQuery, graphql} from "gatsby"

import Header from "../components/header"
import Footer from "../components/footer";

const AdminLayout = ({children}) => {


    return (
        <div className="site">
            <div>{children}</div>
        </div>
    )
};

AdminLayout.propTypes = {
    children: PropTypes.node.isRequired,
};

export default AdminLayout
