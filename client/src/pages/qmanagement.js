import React from "react"
import {Link} from "gatsby"

import SEO from "../components/seo"
import DefaultLayout from "../layout/default";
import {Container, Button, UncontrolledTooltip, Nav, NavItem, Col, NavLink, TabContent, Row, TabPane,} from "reactstrap"
import SecondaryHeader from "../components/secondaryheader";
import NormalHeader from "../components/normalheader";


const QuantumManagement = () => {
    return (
        <DefaultLayout>
            <SEO title="Quantum Management"/>
            <NormalHeader position="50% 9%" image={require("../images/header2.jpg")} title="Quantum Management"/>
            <div className="subpage">
                <div className="section">
                    <Container>
                        <h3 className="title">Quantum Management</h3>
                        <h5 className="description">
                            Drawing inspiration from quantum physics, innovative management thinker Danah Zohar offers a
                            powerful new model for business thinking and practice. "Quantum leaders," she says, like the
                            systems they have to manage, are poised at "the edge of chaos." They thrive on the potential
                            latent in uncertainty and are adept at unleashing the creativity of self-organization. More
                            important, they are vision- and value-led; they adapt quickly, are unafraid to play with the
                            boundaries and reinvent the rules, and celebrate diversity. Zohar points out that the
                            existing, business-as-usual paradigm owes a great deal to the outdated thinking,
                            assumptions, and values of Newtonian science, which gave rise to the Industrial Revolution.
                            Newtonian thinking assumes that corporations and markets are like machines--predictable,
                            stable, and controllable; they are best managed in a way that eliminates risk and assures
                            equilibrium. Unfortunately, as the global financial collapse of 2008 demonstrated, this way
                            of thinking is as obsolete as the steam engine.Further developing ideas she introduced in
                            her acclaimed Rewiring the Corporate Brain and Spiritual Capital, Zohar has written an
                            inspirational book that will motivate leaders to tap the full potential of their employees,
                            their businesses, and the customers they serve.
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
export default QuantumManagement
