import React from "react"

import SEO from "../components/seo"
import DefaultLayout from "../layout/default";

const NotFoundPage = () => (
    <DefaultLayout>
        <SEO title="404: Not found"/>
        <h1>NOT FOUND</h1>
        <p>You just hit a route that doesn&#39;t exist... the sadness.</p>
    </DefaultLayout>
)

export default NotFoundPage
