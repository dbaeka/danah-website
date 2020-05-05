import React from "react"
import {Link} from "gatsby"

import DefaultLayout from "../layout/default"
import SEO from "../components/seo"
import Carousel from "../components/Carousel"
import AboutSection from "../components/sections/aboutSection";

const IndexPage = () => (
    <DefaultLayout>
        <SEO title="Home"/>
        <Carousel/>
        <AboutSection/>
    </DefaultLayout>
);

export default IndexPage
