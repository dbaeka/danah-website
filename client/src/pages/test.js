import React from "react"
import {Link} from "gatsby"

import SEO from "../components/seo"
import DefaultLayout from "../layout/default";
import {Container, Button, UncontrolledTooltip, Nav, NavItem, Col, NavLink, TabContent, Row, TabPane,} from "reactstrap"
import SecondaryHeader from "../components/secondaryheader";
import NormalHeader from "../components/normalheader";


class Test extends React.Component {
    componentDidMount() {
        const script = document.createElement("script");
        script.src = "https://www.paypal.com/sdk/js?client-id=AReQTKD8IwAas4v6oBPgEQAsksSnwDyHlcCYhdJGvYPcXoP6ffrNmU-I0VSvtyRD0qpp6NseOh8Xj1eq&currency=USD";
        script.async = true;
        script.setAttribute("data-sdk-integration-source", "button-factory");
        script.onload = () => this.scriptLoaded();
        document.body.appendChild(script);
    }

    scriptLoaded() {
        const script2 = document.createElement("script");
        script2.src = "/js/paypal.js";
        script2.async = true;
        document.body.appendChild(script2);
    }

    render() {

        return (
            <DefaultLayout>
                <SEO title="SQ Assessment"/>
                <NormalHeader position="50% 9%" image={require("../images/header1.jpeg")} title="SQ Assessment"/>
                <div className="subpage">
                    <div className="section">
                        <Container>
                            <h3 className="title">What is an SQ Assessment?</h3>
                            <h5 className="description">
                                <strong><span style={{color: "#cc0066"}}>Introduction to Spiritual Intelligence (SQ) Psychometric Assessment</span></strong>
                                <br/><br/>
                                <strong><span style={{textDecoration: "underline"}}>What is the difference between IQ, EQ and SQ?</span></strong>
                                <br/><br/>
                                The concept of intelligence quotient (IQ) has been in use for over a century. IQ is a
                                measure of our rational, logical, rule-bound, abstract problem-solving intelligence and
                                refers to a style of rational, goal-oriented thinking. In the mid-1990s, emotional
                                intelligence (EQ) was increasingly seen as important: as Daniel Goleman defines it, EQ
                                enables us to assess the situation we are in and then to behave appropriately within it,
                                particularly to respond appropriately to the emotions of others. <br/><br/>
                                What is common to both IQ and EQ is that both intelligences enable us to play within the
                                boundaries—to play “finite games”. The work of Danah Zohar and Ian Marshall demonstrates
                                the importance of spiritual intelligence (SQ), which enables us to think “outside of the
                                box” and to play with the boundaries—to play an “infinite game”. SQ is a transformative
                                intelligence that allows us to break old paradigms and to invent new ones, to reframe
                                problems and situations, to dissolve old patterns and to be open to finding new ones. SQ
                                also represents our access to and need for deep meaning, fundamental values and a sense
                                of purpose, and the extent to which these influence our decisions and actions. It has
                                the force to address lower motivations and to shift us towards higher
                                motivations. <br/><br/>
                                <strong><span
                                    style={{textDecoration: "underline"}}>What will an SQ assessment measure?</span></strong>
                                <br/><br/>
                                Without reference to religious belief or practice, SQ represents the extent to which
                                higher values, meaning and a sense of purpose influence an individual’s decisions and
                                actions. <br/><br/>
                                The assessment measures attitudes and performance related to the twelve primary criteria
                                which define SQ, and which provide indicators of an individual’s: <br/><br/>
                                <ul>
                                    <li>moral sense – likelihood to be responsible &amp; ethical</li>
                                    <li>depth of a person’s values – likelihood to act from these</li>
                                    <li>open-mindedness – open to exploration &amp; diversity</li>
                                    <li>potential for creativity &amp; visionary leadership</li>
                                    <li>critical thinking – independence, thus courage to make tough decisions</li>
                                    <li>reflective thinking</li>
                                    <li>intuition</li>
                                </ul>
                                <br/><br/>
                                SQ also gives an individual the ability to become more conscious of the lower
                                motivations
                                driving him or her (i.e. fear, greed, ego) and how to transform these to higher
                                motivations that are more sustainable (i.e. creativity, serving the community,
                                etc.). <br/><br/>
                                <strong><span style={{textDecoration: "underline"}}>Do you want to discover your own SQ profile?</span></strong>
                                <br/><br/>
                                Simply follow the link below to purchase and complete your own individual SQ assessment
                                in 10-15 minutes. <br/><br/>
                                <div className="text-center">
                                    <h5><b>Cost: USD ($) 10.00</b></h5>
                                </div>
                                <div id="paypal-button-container1"></div>
                                {/*<table align="center" border="0" cellPadding="0" cellSpacing="0">*/}
                                {/*    <tbody>*/}
                                {/*    <tr>*/}
                                {/*        <td style={{paddingRight: "20px", textAlign: "center"}}>Pay in pounds sterling*/}
                                {/*            (GBP)*/}
                                {/*            <form action="https://www.paypal.com/cgi-bin/webscr" method="post">*/}
                                {/*                <input type="hidden" name="cmd" value="_s-xclick"/><br/>*/}
                                {/*                <input type="hidden" name="hosted_button_id" value="356KCG52NWJ48"/>*/}
                                {/*                <input type="image"*/}
                                {/*                       src="https://www.paypal.com/en_US/GB/i/btn/btn_buynowCC_LG.gif"*/}
                                {/*                       border="0" name="submit" alt="PayPal"/><br/>*/}
                                {/*                <img alt="" border="0"*/}
                                {/*                     src="https://www.paypal.com/en_GB/i/scr/pixel.gif"*/}
                                {/*                     width="1" height="1"/>*/}
                                {/*                <br/></form>*/}
                                {/*        </td>*/}
                                {/*        <td style={{textAlign: "center"}}>Pay in euros (EUR)*/}
                                {/*            <form action="https://www.paypal.com/cgi-bin/webscr" method="post">*/}
                                {/*                <input type="hidden" name="cmd" value="_s-xclick"/><br/>*/}
                                {/*                <input type="hidden" name="hosted_button_id" value="ECRN4SMNF78CA"/>*/}
                                {/*                <input type="image"*/}
                                {/*                       src="https://www.paypal.com/en_US/GB/i/btn/btn_buynowCC_LG.gif"*/}
                                {/*                       border="0" name="submit" alt="PayPal"/><br/>*/}
                                {/*                <img alt="" border="0"*/}
                                {/*                     src="https://www.paypal.com/en_GB/i/scr/pixel.gif"*/}
                                {/*                     width="1" height="1"/><br/>*/}
                                {/*            </form>*/}
                                {/*        </td>*/}
                                {/*    </tr>*/}
                                {/*    </tbody>*/}
                                {/*</table>*/}

                            </h5>
                            <h3 className="title">Scale of Motivations?</h3>
                            <h5 className="description">
                                <strong>What motivations are driving business leaders?</strong><br/><br/>
                                A majority of business leaders are operating from the four negative motivations of fear,
                                greed, anger, and self-assertion. However, most leaders are NOT aware of the lower
                                motivations that are leading them. In fact, when leaders are asked to take a motivation
                                test they usually come out smelling like a rose, because a majority of leaders perceive
                                their motivations are positive.<br/><br/>
                                Therefore, through facilitated dialogue groups or coaching sessions where people are
                                listening to and observing each other, the group or coach can help awaken leaders and
                                make them more conscious of their negative motivations. As well as provide insight into
                                how to transform their negative motivations to more positive motivations that will
                                result in more sustainable and profitable organizations.<br/><br/>
                                The only thing that can change behavior driven by negative motivations is behavior
                                driven
                                by higher, positive motivations—exploration, cooperation, personal and situational
                                mastery, creativity and higher service. Business leaders must become servant leaders
                                that serve employees, customers, the community, the planet, humanity, future
                                generations, and life itself. This new leadership ethic will require a revolution. Not a
                                revolution with guns and bullets, and, God forbid, not a regulatory revolution, but a
                                revolution in thought, and a consequent revolution in moral behavior.<br/><br/>
                                Business must become a vocation, like the higher professions, and capitalists’ sense of
                                wealth creation must expand to include spiritual capital—wealth accrued by leaders that
                                act on their highest aspirations and deepest values.<br/><br/>
                                <span id="more-152"></span><br/><br/>
                                Take the <strong>"Q&nbsp;Quiz" (SQ Assessment)</strong> on this website, which will help
                                you&nbsp;become
                                more conscious of your lower motivations
                                (i.e. fear, greed, ego) and how to transform them to higher motivations that are more
                                sustainable (i.e. creativity, serving the community, etc.).<br/><br/>
                                Simply follow the link below to purchase and complete your own individual SQ assessment
                                in 10-15 minutes.

                                <br/><br/>
                                <div className="text-center">
                                    <h5><b>Cost: USD ($) 10.00</b></h5>
                                </div>
                                <div id="paypal-button-container2"></div>
                                {/*<table align="center" border="0" cellPadding="0" cellSpacing="0">*/}
                                {/*    <tbody>*/}
                                {/*    <tr>*/}
                                {/*        <td style={{paddingRight: "20px", textAlign: "center"}}>Pay in pounds sterling*/}
                                {/*            (GBP)*/}
                                {/*            <form action="https://www.paypal.com/cgi-bin/webscr" method="post">*/}
                                {/*                <input type="hidden" name="cmd" value="_s-xclick"/><br/>*/}
                                {/*                <input type="hidden" name="hosted_button_id" value="356KCG52NWJ48"/>*/}
                                {/*                <input type="image"*/}
                                {/*                       src="https://www.paypal.com/en_US/GB/i/btn/btn_buynowCC_LG.gif"*/}
                                {/*                       border="0" name="submit" alt="PayPal"/><br/>*/}
                                {/*                <img alt="" border="0"*/}
                                {/*                     src="https://www.paypal.com/en_GB/i/scr/pixel.gif"*/}
                                {/*                     width="1" height="1"/>*/}
                                {/*                <br/></form>*/}
                                {/*        </td>*/}
                                {/*        <td style={{textAlign: "center"}}>Pay in euros (EUR)*/}
                                {/*            <form action="https://www.paypal.com/cgi-bin/webscr" method="post">*/}
                                {/*                <input type="hidden" name="cmd" value="_s-xclick"/><br/>*/}
                                {/*                <input type="hidden" name="hosted_button_id" value="ECRN4SMNF78CA"/>*/}
                                {/*                <input type="image"*/}
                                {/*                       src="https://www.paypal.com/en_US/GB/i/btn/btn_buynowCC_LG.gif"*/}
                                {/*                       border="0" name="submit" alt="PayPal"/><br/>*/}
                                {/*                <img alt="" border="0"*/}
                                {/*                     src="https://www.paypal.com/en_GB/i/scr/pixel.gif"*/}
                                {/*                     width="1" height="1"/><br/>*/}
                                {/*            </form>*/}
                                {/*        </td>*/}
                                {/*    </tr>*/}
                                {/*    </tbody>*/}
                                {/*</table>*/}
                            </h5>
                            <h5 className="text-center description">
                                For further information about the SQ assessment, including discounted prices for bulk
                                purchases of the assessment, please contact <a
                                href="mailto:contact@danahzohar.com">contact@danahzohar.com</a>
                            </h5>

                        </Container>
                    </div>
                </div>
            </DefaultLayout>
        )
    };
}

export default Test
