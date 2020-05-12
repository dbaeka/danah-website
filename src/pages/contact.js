import React from "react"
import {Link} from "gatsby"

import SEO from "../components/seo"
import DefaultLayout from "../layout/default";
import {Container, Button, UncontrolledTooltip, Nav, NavItem, Col, NavLink, TabContent, Row, TabPane,} from "reactstrap"
import SecondaryHeader from "../components/secondaryheader";
import NormalHeader from "../components/normalheader";


const Speaking = () => {
    return (
        <DefaultLayout>
            <SEO title="Speaking Engagement"/>
            <NormalHeader title="Speaking Engagement"/>
            <div className="subpage">
                <div className="section">
                    <Container>
                        <h3 className="title">Speaking Engagement</h3>
                        <h5 className="description">
                            Danah regularly speaks at leadership forums and works with corporate leadership teams
                            worldwide. She has worked with the leadership initiatives of both local and national
                            governments. She established The Oxford Academy of Total Intelligence as an educational
                            centre and consultancy, with a mission to create a sustainable future for society
                            through the development of corporate and organizational leadership, purpose and
                            motivation.<br/><br/>
                            Each presentation by Danah Zohar is a unique experience that is tailor made
                            to&nbsp;address specific needs. Whatever your requirements, we will
                            customize&nbsp;material that is guaranteed to transform participants
                            lives&nbsp;professionally and personally.<br/><br/>
                            Examples of previous&nbsp;speaking topics:<br/><br/>
                            <ul>
                                <li>Transformative Leadership: leading with vision, values, and a sense of higher
                                    purpose
                                </li>
                                <li>Spiritually Intelligent Leadership: how leaders can raise their own and employees’
                                    motivations using the 12 principles of spiritual intelligence.
                                </li>
                                <li>Path to Quantum Leadership: seven qualities of great leadership inspired by seven
                                    principles of the new science.
                                </li>
                                <li>Sustainable Capitalism: moving away from an emphasis on consumption and constant
                                    growth, and a philosophy of ‘I have, therefore I am’; how making the right moral
                                    choices and choosing a dedication to improve the quality of life can transform
                                    capitalism.
                                </li>
                                <li>Rewiring the Corporate Brain: we can alter the thinking behind business thinking and
                                    raise the intelligence of corporate culture.
                                </li>
                                <li>Total Intelligence: how, by perfecting and aligning our physical, emotional,
                                    rational, and spiritual intelligences we can live our whole lives at peak
                                    performance.
                                </li>
                                <li>A Quantum-Leap in Global Consciousness: how a break through to higher intelligence
                                    (’Total Intelligence’) can move humanity beyond localized and divisive tribalism,
                                    and an ethic of narrow self-interest, to a more holistic, compassionate, and
                                    all-embracing spirit of global citizenship and responsibility.
                                </li>
                                <li>Total Intelligence and the Fulfillment of Human Potential: considering the meaning,
                                    purpose, and perfection of human beings and human agency.
                                </li>
                                <li>Danah Zohar focuses on giving bespoke presentations and workshops to meet specific
                                    client’s needs.
                                </li>
                            </ul>
                        </h5>
                        <h5 className="text-center description">
                            Would you like Danah Zohar to speak at your next event or organization?<br/><br/>
                            For speaking engagements, contact <a
                            href="mailto:contact@danahzohar.com">contact@danahzohar.com</a> or <a
                            href="mailto:bookings@danahzohar.com">bookings@danahzohar.com</a><br/><br/>
                            If you are interested in engaging Danah Zohar to coach, train or conduct workshops for
                            your organizational leaders please email <a
                            href="mailto:contact@danahzohar.com">contact@danahzohar.com</a>
                        </h5>
                    </Container>
                </div>
            </div>
        </DefaultLayout>
    )
};
export default Speaking
