import React from "react"
import {Link} from "gatsby"

import SEO from "../../components/seo"
import AdminLayout from "../../layout/admin";

class AdminIndex extends React.Component {


    render() {
        return (
            <AdminLayout>
                <SEO title="Home"/>
            </AdminLayout>
        )
    }
};

export default AdminIndex
