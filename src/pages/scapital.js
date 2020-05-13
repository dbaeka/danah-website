import React from "react"
import {Link} from "gatsby"

import SEO from "../components/seo"
import DefaultLayout from "../layout/default";
import {Container, Button, UncontrolledTooltip, Nav, NavItem, Col, NavLink, TabContent, Row, TabPane,} from "reactstrap"
import SecondaryHeader from "../components/secondaryheader";
import NormalHeader from "../components/normalheader";


const SpiritualCapital = () => {
    return (
        <DefaultLayout>
            <SEO title="Spiritual Capital"/>
            <NormalHeader title="Spiritual Capital"/>
            <div className="subpage">
                <div className="section">
                    <Container>
                        <h3 className="title">Spiritual Capital</h3>
                        <h5 className="description">
                            Spiritual intelligence (SQ), spiritual capital, and sustainability are crucially
                            linked.<br/><br/>
                            SQ is our intelligence that we access to define our life purpose and search for meaning.
                            Therefore, spiritual capital reflects&nbsp;a leader’s&nbsp;or an organization’s
                            spiritual intelligence because it reflects what it&nbsp;exists for, believes in, aspires
                            to, and takes responsibility for.<br/><br/>
                            Thus a leader’s level of spiritual intelligence (SQ)has a direct impact
                            on&nbsp;the&nbsp;spiritual capital generated. Spirituals capital’s wealth of meaning,
                            values and higher motivation are necessary&nbsp;for sustainable capitalism and
                            sustainable society.<br/><br/>
                            Imagine two scenarios. The first is business as we know it today – all short-term
                            interest, short-term gain, isolationist thinking, with the material bottom line as king.
                            The second image is a business culture driven by fundamental values and a deep sense of
                            purpose in which wealth is accumulated to generate a decent profit while acting to raise
                            the common good. The emphasis is on ‘stake-holder value’, where stake-holders include
                            the human race, present and future, and the planet itself. These are the values of
                            Spiritual Capital. The crucial question is: How we can move from one scenario to the
                            other?<br/><br/>
                            In order to move from scenario one (bottom-line, destructive business) to scenario two
                            (sustainable business), we need to consider three types of intelligence to make the
                            leap. Intellectual intelligence (IQ) and Emotional Intelligence (EQ) are needed to
                            diagnose the current state, and then the twelve qualities of Spiritual Intelligence (SQ)
                            can be used to bring about the final transformation. Using the combination of our
                            different intelligences, IQ, EQ, and SQ, a more meaningful work life can be created that
                            will result in sustainable capitalism.<br/><br/>
                            The following table reflects the connection between three kinds of capital (material,
                            social and spiritual) and three major human intelligences (IQ, EQ and SQ):<br/><br/>
                            <table border="1" cellPadding="0" style={{
                                textAlign: "center",
                                width: "100%"
                            }}>
                                <tbody>
                                <tr>
                                    <td width="120"><strong>Capital</strong></td>
                                    <td width="200"><strong>Intelligence</strong></td>
                                    <td width="138"><strong>Function</strong></td>
                                </tr>
                                <tr>
                                    <td><span style={{color: "#000"}}>Material Capital</span></td>
                                    <td><span style={{color: "#000"}}>IQ: Rational Intelligence</span></td>
                                    <td width="138"><span style={{color: "#000"}}>What I think</span></td>
                                </tr>
                                <tr>
                                    <td>Social Capital</td>
                                    <td>EQ: Emotional Intelligence</td>
                                    <td width="138">What I feel</td>
                                </tr>
                                <tr>
                                    <td><span style={{color: "#ff00ff"}}>Spiritual Capital</span></td>
                                    <td><span style={{color: "#ff00ff"}}>SQ: Spiritual Intelligence</span></td>
                                    <td width="138">
                                        <span style={{color: "#ff00ff"}}>What I am</span></td>
                                </tr>
                                </tbody>
                            </table>

                        </h5>
                    </Container>
                </div>
            </div>
        </DefaultLayout>
    )
};
export default SpiritualCapital
