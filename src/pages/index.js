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
import TestimonialSection from "../components/sections/testimonialSection";
import GallerySection from "../components/sections/gallerySection";

class IndexPage extends React.Component {
    componentDidMount() {
        const script = document.createElement("script");
        script.src = "/js/popup.js";
        script.async = true;
        script.onload = () => this.scriptLoaded();
        document.body.appendChild(script);
    }

    scriptLoaded() {

    }

    render() {
        return (
            <DefaultLayout>
                <SEO title="Home"/>
                <Carousel/>
                {/*<a className="popup-youtube" href="http://www.youtube.com/watch?v=0O2aH4XLbto">Open YouTube video</a>*/}
                <AboutSection/>
                <LatestSection/>
                <BookSection/>
                <VideoSection/>
                <ExploreSection/>
                <TestimonialSection/>
                {/*<YoutubeSection/>*/}
                {/*<GallerySection/>*/}
            </DefaultLayout>
        )
    }
};

export default IndexPage
