import React from "react"
import {Link} from "gatsby"

import SEO from "../components/seo"
import DefaultLayout from "../layout/default";

const SecondPage = () => (
    <DefaultLayout>
        <SEO title="Page two"/>
        <h1>Hi from the second page</h1>
        <p>Welcome to page 2</p>
        <Link to="/">Go back to the homepage</Link>
    </DefaultLayout>
)

export default SecondPage
