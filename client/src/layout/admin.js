/**
 * Layout component that queries for data
 * with Gatsby's useStaticQuery component
 *
 * See: https://www.gatsbyjs.org/docs/use-static-query/
 */

import React from "react"
import PropTypes from "prop-types"
import MainNavbar from "../components/admin/MainNavbar/MainNavbar";
import MainSidebar from "../components/admin/MainSidebar/MainSidebar";
import MainFooter from "../components/admin/MainFooter";
import {Container, Row, Col} from 'shards-react';

const AdminLayout = ({children}) => {

    return (
        <Container fluid>
            <Row>
                <MainSidebar/>
                <Col
                    className="main-content p-0"
                    lg={{size: 10, offset: 2}}
                    md={{size: 9, offset: 3}}
                    sm="12"
                    tag="main"
                >
                    <MainNavbar/>
                    {children}
                    {/*<MainFooter/>*/}
                </Col>
            </Row>
        </Container>
    )
};

AdminLayout.propTypes = {
    children: PropTypes.node.isRequired,
};

export default AdminLayout
