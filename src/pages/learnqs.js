import React from "react"
import {Link} from "gatsby"

import SEO from "../components/seo"
import DefaultLayout from "../layout/default";
import {Container, Button, UncontrolledTooltip, Nav, NavItem, Col, NavLink, TabContent, Row, TabPane,} from "reactstrap"
import SecondaryHeader from "../components/secondaryheader";
import NormalHeader from "../components/normalheader";


const LearnQs = () => {
    return (
        <DefaultLayout>
            <SEO title="Learn the Q's"/>
            <NormalHeader position="50% 9%" image={require("../images/header1.jpeg")} title="Learn the Q's"/>
            <div className="subpage">
                <div className="section">
                    <Container>
                        <h3 className="title">Learn the Q's</h3>
                        <h5 className="description">
                            <strong><em>What makes a great leader? Some say it is the ability to make tough
                                decisions. Others say great leadership is the ability to command and control or to
                                inspire loyalty. However, great leadership depends primarily on vision–not just any type
                                of vision, but one that we can appreciate intellectually, emotionally, and
                                spiritually.</em></strong>
                            <br/><br/>
                            A vision is something we reach for, something we aspire to, something that is the glue of
                            our enterprise, the driving force, the vitality within it. When we are touched by a
                            vision, our deepest values come into play and we have a sense of abiding purpose to our
                            enterprise. In our world today, the thing we are most lacking is leaders who can convey
                            true vision.<br/><br/>
                            One reason that visionary leadership is in short supply today is the value our society
                            places on one particular kind of capital–material capital. Too often the worth or value
                            of an enterprise is judged by how much money it earns. This obsession with material gain
                            has led to short-term thinking and the narrow pursuit of self-interest. It is true that
                            any kind of enterprise we want to engage in requires some kind of financial wealth if it
                            is to succeed in the short term. But for leadership to inspire long-term, sustainable
                            enterprises, it needs to pursue two other forms of capital as well: social and
                            spiritual. These three types of capital resemble the layers in a wedding cake. Material
                            capital is the top layer, social capital lies in the middle, and spiritual capital rests
                            on the bottom, supporting all three.<br/><br/>
                            According to political economist Francis Fukuyama, who wrote <em>Trust: The Social
                            Virtues and the Creation of Wealth</em>, social capital can be measured by the amount of
                            trust in a society, empathy people feel for each other, and commitment to the health of
                            the community. The health of the community, he says, can be measured by criteria such as
                            the rate of crime, divorce, illiteracy, and litigation.<br/><br/><br/>
                            <strong>A New Paradigm of Intelligence</strong><br/><br/>
                            Even more fundamentally, spiritual capital reflects what an individual or an organization
                            exists for, believes in, aspires to, and takes responsibility for. Our spiritual capital
                            includes our moral capital. Spiritual capital is a new paradigm that requires that we
                            radically change our mind-set about the philosophical foundations and practices of
                            leadership. This is not about religion or spiritual practices. Rather, this is about the
                            power a leader to achieve record results by inspiring people’s deepest meanings, values,
                            and purposes.
                            Leaders build all three forms of capital–material, social, and spiritual–by using their
                            own intelligence. But this is not just about IQ. &nbsp;<br/>
                            This includes the intelligence of
                            the mind, the heart, and the spirit, which correlate to the three types of capital:<br/>
                            <a href="http://danahzohar.com/www2/wp-content/uploads/2010/06/table_intelligence.jpg">
                                <img
                                    src={require("../images/table_intelligence.jpg")}
                                    alt="Table 1 summarizes the 3 types of intelligences (IQ, EQ, and SQ):"
                                    title="Table 1 summarizes the 3 types of intelligences (IQ, EQ, and SQ):"
                                    width="611" height="441" className=" mt-2 size-full wp-image-777"/>
                            </a>
                            <ul>
                                <li>IQ, or intelligence quotient, was discovered in the early 20th century and is tested
                                    using the Stanford-Binet Intelligence Scales. It refers to our rational, logical,
                                    rule-bound, problem-solving intelligence. It is supposed to make us bright or dim.
                                    It is also a style of rational, goal-oriented thinking. All of us use some IQ, or we
                                    wouldn’t be functional.
                                </li>
                                <br/>
                                <li>EQ refers to our emotional intelligence quotient. In the mid-1990s, in <em>Emotional
                                    Intelligence: Why It Can Matter More Than IQ</em>, Daniel Goleman articulated the
                                    kind of intelligence that our heart, or emotions, have. EQ is manifested in trust,
                                    empathy, self-awareness, and self-control, and in the ability to respond
                                    appropriately to the emotions of others. It’s a sense of where people are coming
                                    from; for example, if a boss or colleague seems to have had a fight at home before
                                    coming into the office that morning, it’s not the best time to ask for a pay raise
                                    or put a new idea across.
                                </li>
                                <br/>
                                <li>SQ, our spiritual intelligence quotient, underpins IQ and EQ. Spiritual intelligence
                                    is an ability to access higher meanings, values, abiding purposes, and unconscious
                                    aspects of the self and to embed these meanings, values, and purposes in living a
                                    richer and more creative life. Signs of high SQ include an ability to think out of
                                    the box, humility, and an access to energies that come from something beyond the
                                    ego, beyond just me and my day-to-day concerns. SQ is the ultimate intelligence of
                                    the visionary leader. It was the intelligence that guided men and women like
                                    Churchill, Gandhi, Nelson Mandela, Martin Luther King Jr., and Mother Teresa. The
                                    secret of their leadership was their ability to <em>inspire</em> people, to give
                                    them a sense of something worth struggling for.
                                </li>
                            </ul>
                            <br/><br/>
                            Table 1 summarizes the three types of intelligence.
                        </h5>
                    </Container>
                </div>
            </div>
        </DefaultLayout>
    )
};

export default LearnQs
