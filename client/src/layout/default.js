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

const DefaultLayout = ({children}) => {
    const data = useStaticQuery(graphql`
        query SiteTitleQuery {
            site {
                siteMetadata {
                    title
                }
            }
        }
    `)

    return (
        <div className="site">
            <Header siteTitle={data.site.siteMetadata.title}/>

            <div>{children}</div>

            <Footer siteTitle={data.site.siteMetadata.title}/>
        </div>
    )
};

DefaultLayout.propTypes = {
    children: PropTypes.node.isRequired,
};

export default DefaultLayout
