import React from "react"
import {Link} from "gatsby"

import SEO from "../components/seo"
import DefaultLayout from "../layout/default";
import {Container, Button, UncontrolledTooltip, Nav, NavItem, Col, NavLink, TabContent, Row, TabPane,} from "reactstrap"
import SecondaryHeader from "../components/secondaryheader";
import NormalHeader from "../components/normalheader";


const TwelvePrinciples = () => {
    return (
        <DefaultLayout>
            <SEO title="12 Principles of SQ"/>
            <NormalHeader title="12 Principles of SQ"/>
            <div className="subpage">
                <div className="section">
                    <Container>
                        <h3 className="title">12 Principles of SQ</h3>
                        <h5 className="description">
                            <h6><strong><em><span style={{color: "#d2308b"}}>How do you get leaders to learn to act from higher motivations that positively influence others and profit?</span></em></strong>
                            </h6>
                            By learning about our different quotients (Q’s), also known as our emotional, spiritual,
                            and intellectual intelligences, we can lead more sustainably and live more fulfilled
                            lives.<br/><br/>
                            One way to do this is to learn the 12 principles of spiritual intelligence (SQ). Leaders
                            that have done this have been able to apply these principles and are able to positively
                            influence those they work with. They become role models for more sustainable behavior
                            that results in a positive work culture.<br/><br/>
                            The below is more detail&nbsp;of the 12 principles of SQ:<br/><br/>
                            <a
                                href="http://danahzohar.com/www2/wp-content/uploads/2010/05/12_core.jpg"><img
                                className="size-full wp-image-465 aligncenter" title="12_core"
                                src={require("../images/12_core.jpg")} alt=""
                                width="611" height="395"
                            />
                            </a>
                            <br/><br/>
                            Another way is to make people conscious of the motivations that drive their behavior.
                            Most leaders are NOT aware of the lower motivations that are leading them such as, fear,
                            greed, power, ego, etc. When leaders are asked to take a motivation test they usually
                            come out smelling like a rose, because most people think our motivations are high. But
                            in a dialogue group or a coaching session where people are listening to and observing
                            each other, the group or coach can help create a greater awareness of what is truly
                            motivating each person’s behavior.<br/><br/>
                            Dialogue groups and coaching sessions can be done at various levels—a team, an entire
                            organization, a culture, a nation—to uncover the motivations of the people
                            involved.
                        </h5>
                    </Container>
                </div>
            </div>
        </DefaultLayout>
    )
};

export default TwelvePrinciples
