import React from "react"
import {Link} from "gatsby"

import SEO from "../components/seo"
import DefaultLayout from "../layout/default";
import {Container, Button, UncontrolledTooltip, Nav, NavItem, Col, NavLink, TabContent, Row, TabPane,} from "reactstrap"
import SecondaryHeader from "../components/secondaryheader";
import NormalHeader from "../components/normalheader";


const WhatIsSQ = () => {
    return (
        <DefaultLayout>
            <SEO title="What is SQ?"/>
            <NormalHeader title="What is SQ?"/>
            <div className="subpage">
                <div className="section">
                    <Container>
                        <h3 className="title">What is SQ?</h3>
                        <h5 className="description">
                            <strong>Spiritual intelligence</strong> (SQ) is unfortunately often overlooked in
                            coaching and development. SQ is not about religion, it is related to that part of the
                            brain which allows us to hope and dream and visualize and to connect us to our purpose
                            in life. It is the trigger in our intelligence which entices us to seek meaning and a
                            greater good by differentiating between good and evil.<br/><br/>
                            SQ is the intelligence that makes us whole, that gives us out integrity. It is the soul’s
                            intelligence, the intelligence of the deep self. It is the intelligence with which we
                            ask fundamental questions and with which we reframe our answers. It is our
                            transformative intelligence.
                        </h5>
                    </Container>
                </div>
            </div>
        </DefaultLayout>
    )
};
export default WhatIsSQ
