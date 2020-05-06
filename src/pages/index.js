import React from "react"
import {Link} from "gatsby"

import DefaultLayout from "../layout/default"
import SEO from "../components/seo"
import Carousel from "../components/Carousel"
import AboutSection from "../components/sections/aboutSection";
import ExploreSection from "../components/sections/exploreSection";
import YoutubeSection from "../components/sections/youtubeSection";
import BookSection from "../components/sections/bookSection";
import VideoSection from "../components/sections/videoSection";
import LatestSection from "../components/sections/latestSection";

const IndexPage = () => (
    <DefaultLayout>
        <SEO title="Home"/>
        <Carousel/>
        <AboutSection/>
        <ExploreSection/>
        <YoutubeSection/>
        <BookSection/>
        <VideoSection/>
        <LatestSection/>
    </DefaultLayout>
);

export default IndexPage
