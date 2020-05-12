import React from "react"
import {Link} from "gatsby"

import SEO from "../components/seo"
import DefaultLayout from "../layout/default";
import {Container, Button, UncontrolledTooltip, Nav, NavItem, Col, NavLink, TabContent, Row, TabPane,} from "reactstrap"
import SecondaryHeader from "../components/secondaryheader";
import NormalHeader from "../components/normalheader";


const ExperienceQs = () => {
    return (
        <DefaultLayout>
            <SEO title="Experience Q's"/>
            <NormalHeader title="Experience Q's"/>
            <div className="subpage">
                <div className="section">
                    <Container>
                        <h3 className="title">Experience Q's</h3>
                        <h5 className="description">
                            Executive coaches, HR personnel and&nbsp;leaders themselves&nbsp;have started playing a
                            key role&nbsp;in leading the way in raising the motivations that drive business culture.
                            They have a moral mission to help others become more conscious of their negative
                            motivations and behaviors, and by instilling healthier ones that will result in
                            sustainable success. The following illustrate some of the key principles that have been
                            put in place and have resulted in&nbsp;success:<br/><br/>
                            <strong>Instilling a sense of Holism</strong><br/>
                            Educating the CEO and other senior leaders to see that the business is not an island
                            unto itself and that they cannot afford to ignore what is outside. What business does
                            affects us all, and if driven only by greed and self-interest it damages not only its
                            own people, the wider community, and the environment, but it undermines itself. This
                            damages the bottom line. Unilever Asia’s commitment to improving local communities and
                            Coca Cola’s commitment to building health clinics in rural China exemplify a recognition
                            of this.<br/><br/>
                            <strong>Reframing</strong><br/>
                            Questioning the sacred cow of shareholder value and emphasising instead value to
                            customers, suppliers, and employees. British retailer John Lewis dedicates itself to
                            these, and is one of the few UK companies making a profit in the current crisis.
                            Replacing the goal of open-ended profit with the notion of a decent profit. Two
                            companies to embrace the principle of fair trade are international fruit and vegetable
                            distributor Chiquita Banana and Starbucks.<br/><br/>
                            <strong>Being Vision and Value Led</strong><br/>
                            Defining business as the wealth creator of wider society and accepting that corporate
                            taxes are a patriotic opportunity, not something to be avoided. Articulating company
                            values that support a sense of mission and higher service. Living our values adds
                            meaning to our lives and work. This boosts morale, creativity, and productivity.<br/><br/>
                            <strong>Having a Sense of Vocation</strong><br/>
                            Replacing arrogance with humility and encouraging business to join the higher
                            professions in serving society, the environment, and future generations. Redefining the
                            concept of CSR, as in BP’s ‘Beyond Petroleum’. The higher purpose of HR is expressed
                            eloquently by Aristotle: “It is clear that in matters of the economy, people are of
                            greater significance than material property—and their quality of greater concern than
                            that of the goods making up their wealth.” In fulfilling its moral mission, HR’s role in
                            people management can encompass people enrichment. A company that enriches its people
                            enriches itself and its community. The result shows, inevitably, in a healthy bottom
                            line.<br/><br/>
                            <strong>Making Positive Use of Adversity</strong><br/>
                            In the words of Nobel economist Amartya Sen, seeing in crisis “an opportunity to address
                            long-term problems where people are willing to reconsider established conventions”.
                            British food retailer Sainsbury’s is thriving during the crisis by introducing a
                            low-cost food line that preserves quality while giving customers better value.<br/><br/>
                        </h5>
                        <h5 className="text-center description">
                            If you are interested in engaging Danah Zohar to coach, train or conduct workshops for
                            your organizational leaders please email <a
                            href="mailto:contact@totalintelligence.com">contact@totalintelligence.com
                        </a> or&nbsp;
                            <a href="mailto:bookings@totalintelligence.com">bookings@totalintelligence.com
                            </a>.
                            <br/><br/>
                            <img className="alignleft size-full wp-image-592" title="TQ_pyramid"
                                 src={require("../images/TQ_pyramid.png")} alt=""
                                 width="611" height="504"
                            />
                        </h5>
                    </Container>
                </div>
            </div>
        </DefaultLayout>
    )
};

export default ExperienceQs
