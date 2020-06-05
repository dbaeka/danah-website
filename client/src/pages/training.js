import React from "react"
import {Link} from "gatsby"

import SEO from "../components/seo"
import DefaultLayout from "../layout/default";
import {Container, Button, UncontrolledTooltip, Nav, NavItem, Col, NavLink, TabContent, Row, TabPane,} from "reactstrap"
import SecondaryHeader from "../components/secondaryheader";
import NormalHeader from "../components/normalheader";


const Training = () => {
    return (
        <DefaultLayout>
            <SEO title="Training Programs"/>
            <NormalHeader  position="50% 49%" image={require("../images/header3.jpg")} title="Training Programs"/>
            <div className="subpage">
                <div className="section">
                    <Container>
                        <h3 className="title">Training Programs</h3>
                        <h5 className="description">
                            <strong>At the core of Danah’s work is learning and unveiling your spiritual intelligence
                                (SQ). Spiritual intelligence is not about religion, it is the intelligence with which we
                                access our deepest meanings, values, purposes and highest motivations to lead great and
                                live more fulfilled. Danah and her team offer a series of tailor made
                            sessions to help train and develop more vision and value led leaders.&nbsp;Below are
                            some of her popular offerings:</strong><br/><br/>
                            <ul>
                                <li><strong>Full-day Master Class</strong>
                                    <ul>
                                        <li>Target audience is senior executives who are ready to think deeply about the
                                            future business success of their organization. It is for people in Strategy,
                                            HR and senior positions who believe that ‘soft’ issues are really very hard.
                                        </li>
                                        <li>The session will offer participants the insight and practical tools they
                                            need to change the way their organizations support, engage and value their
                                            people.
                                        </li>
                                        <li>Zohar will present a new way to diagnose the motivational and emotional
                                            state of a culture based on spiritual intelligence.
                                        </li>
                                        <li>Main focus will be a detailed investigation of the way three types of
                                            intelligence – rational, emotional and spiritual can be assessed, developed
                                            and integrated to maximize organizational performance at all levels, from
                                            the individual to the entire organization.
                                        </li>
                                    </ul>
                                </li>
                                <br/><br/>
                                <li><strong>Reawakening Leaders Session</strong>
                                    <ul>
                                        <li>Maximizing individual performance through understanding the relationship
                                            between IQ, EQ and SQ.
                                        </li>
                                        <li>Provides senior managers and leaders with the insight and practical tools
                                            they need to transform the way they lead for sustainable and peak
                                            development.
                                        </li>
                                        <li>The session involves a great deal of personal work with Danah Zohar to
                                            assess your individual leadership skills and areas of improvement.
                                        </li>
                                        <li>Participants will work in small groups with Danah to explore tangible ideas
                                            and examples that can be applied by the individual leader for maximum
                                            professional and personal effect.
                                        </li>
                                    </ul>
                                </li>
                                <br/><br/>
                                <li><strong>Other Training</strong>s
                                    <ul>
                                        <li>Two days of intensive, residential workshop/retreats</li>
                                        <li>Four hours of personal coaching on assessing your Q principles</li>
                                        <li>½ day teaching session on coaching/mentoring with Q concepts</li>
                                        <li>
                                            Small group and personal executive coaching is also available on request
                                        </li>
                                    </ul>
                                </li>
                            </ul>

                        </h5>
                        <h5 className="text-center description">
                            For more information about training services please email Danah Zohar, <a
                            href="mailto:contact@danahzohar.com">contact@danahzohar.com</a>
                        </h5>
                    </Container>
                </div>
            </div>
        </DefaultLayout>
    )
};
export default Training
