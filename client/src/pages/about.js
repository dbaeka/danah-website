import React from "react"
import {Link} from "gatsby"

import SEO from "../components/seo"
import DefaultLayout from "../layout/default";
import {Container, Button, UncontrolledTooltip, Nav, NavItem, Col, NavLink, TabContent, Row, TabPane,} from "reactstrap"
import SecondaryHeader from "../components/secondaryheader";


const AboutPage = () => {
    return (
        <DefaultLayout>
            <SEO title="About"/>
            <SecondaryHeader/>
            <div className="subpage">
                <div className="section">
                    <Container>
                        <h3 className="title">About me</h3>
                        <h5 className="description">
                            Danah Zohar is a management thought leader, physicist, philosopher and author. Her
                            best-selling
                            books include Spiritual Capital: Wealth We Can Live By and SQ – Spiritual Intelligence, The
                            Ultimate Intelligence, which constitute ground-breaking work on SQ, spiritual intelligence
                            and
                            spiritual capital; ReWiring the Corporate Brain, The Quantum Society and The Quantum Self,
                            previous work which extends the language and principles of quantum physics into a new
                            understanding of human consciousness, psychology and social organization, particularly the
                            organization of companies.
                        </h5>
                        <h5 className="description">
                            Danah regularly speaks at leadership forums and works with corporate leadership teams
                            worldwide.
                            She has worked with the leadership initiatives of both local and national governments. Her
                            mission is to help create a sustainable future for society through the development of
                            corporate
                            and organizational leadership, purpose and motivation.
                        </h5>
                        <h5 className="description">
                            Danah Zohar was born and educated in the United States. She studied Physics and Philosophy
                            at
                            MIT, and did her postgraduate work in Philosophy, Religion & Psychology at Harvard
                            University.
                            Described by the Financial Times and Prentice Hall as “one of the world’s greatest
                            management
                            thinkers”, Danah has engaged with senior management at organizations including The Swedish
                            Forestry Commission, Volvo, Astra Pharmaceutical, Werner Lambert Pharmaceutical, Philip
                            Morris
                            Tobacco, Marks & Spencer, Shell, British Telecom, Motorola, Philips, Norwich Union Financial
                            Services, Merita Financial Services (Finland), Skandia Insurance and Financial Services, The
                            Bank of International Settlements, Scottish Enterprise, Fife Enterprise, BMW, McCann
                            Erikson,
                            Coca Cola, and McKinsey. She was on the faculty of Shell UK’s “Challenges for Change” senior
                            management training program and has addressed the leadership team of Shell USA’s
                            transformation
                            process for senior management. She recently worked with McKinsey’s new global spiritual
                            intelligence training initiative. Danah Zohar is currently writing a new book, Quantum
                            Intelligence, which aims to be the culmination of her life’s work. Danah currently lives in
                            Oxford, England with her extended family.
                        </h5>
                        <h5 className="description">
                            Danah Zohar lectures widely throughout the world at conferences organized by UNESCO, The
                            European Cultural Foundation, The Davos World Economic Forum, The World Business Academy,
                            YPO,
                            IFTDO (the International Federation of Training and Development Organizations), the British
                            Cabinet Office, Japan’s Council for the Growth of Future Generations, The American National
                            Education Association (NEA), Britain’s Work Foundation, and the Australian National
                            Government.
                            She has addressed members of The Swedish National Parliament and has worked with local
                            government representatives and educators in several countries.
                        </h5>
                        <Row>
                            <Col className="ml-auto mr-auto" xs="12">
                                <h4 className="title text-center">About Q's</h4>
                                <h5 className="description">
                                    <strong>Q</strong> stands for the integration of many things that are near and
                                    dear to Danah Zohar’s heart and work.<br/><br/>
                                    <strong>Q = Quantum</strong> physics,<strong> Questioning</strong> our lives,
                                    and&nbsp;<strong>Quest</strong> for&nbsp;happiness.&nbsp;<br/><br/>
                                    <strong>Q</strong> also symbolizes how our soul is constantly serving as
                                    a <strong>“cue”</strong> or compass to guide us to truth. If we learn to access
                                    and listen to our souls and hearts more, we can continuously use it as
                                    our <strong>“Q”</strong> to help us live happier professionally and personally.
                                    <br/><br/>
                                    This can be done by learning about our different <strong>Quotients</strong> that
                                    measure our
                                    intellectual <strong>(IQ),</strong>&nbsp;emotional <strong>(EQ),</strong> spiritual <strong>(SQ)</strong> and
                                    physical <strong>(PQ)</strong>&nbsp;intelligences. One way to do this is to
                                    learn the 12 principles of spiritual intelligence<strong> (SQ).</strong> Leaders
                                    that have done this have been able to apply these principles and are happier.
                                    They are&nbsp;able to positively influence those they work with. They become
                                    better role models for more sustainable behavior, which results in a positive
                                    work culture that is ultimately more profitable.
                                </h5>
                            </Col>
                            <Col className="ml-auto mr-auto" xs="12">
                                <h4 className="title text-center mt-0">Credo of a Great Leader</h4>
                                <h5 className="description">
                                    I believe global business has the money and the power
                                    to make a
                                    significant difference in today’s troubled world, and that by making
                                    that difference it can help itself as well as others. I envisage
                                    business raising its sights above the bottom line. I envisage
                                    business
                                    becoming a vocation, like the higher professions.
                                    <br/><br/>
                                    To make this possible I believe that business must add a moral
                                    dimension, becoming more service- and value-oriented and largely
                                    eliminating the assumed natural distinction between private
                                    enterprise
                                    and public institutions. I envisage business taking responsibility
                                    for
                                    the world in which it operates and from which it creates its wealth.
                                    And
                                    I envisage myself becoming one of those business leaders who are
                                    “servant leaders”–leaders who serve not just stockholders,
                                    colleagues,
                                    employees, products, and customers, but also the community, the
                                    planet,
                                    humanity, the future, and life itself.
                                </h5>
                            </Col>
                            <Col className="ml-auto mr-auto" xs="12">
                                <h4 className="title text-center">Would you like Danah Zohar to speak at your next event
                                    or
                                    organization?</h4>

                            </Col>
                            <h5 className="text-center description">
                                For speaking engagements, contact <a
                                href="mailto:contact@danahzohar.com">contact@danahzohar.com</a> or <a
                                href="mailto:bookings@danahzohar.com">bookings@danahzohar.com</a>
                                <br/><br/>
                                If you are interested in contacting Danah Zohar to coach, train or conduct workshops for
                                your organizational leaders please email <a
                                href="mailto:contact@danahzohar.com">contact@danahzohar.com</a>
                            </h5>
                        </Row>
                    </Container>
                </div>
            </div>
        </DefaultLayout>
    )
};

export default AboutPage
