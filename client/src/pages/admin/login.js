import React from "react"
import {Link} from "gatsby"

import SEO from "../../components/seo"
import {Col, Row} from 'reactstrap';
import AuthForm from '../../components/AuthForm';


class Login extends React.Component {

    render() {
        return (
            <div className="bg-primary">
                <SEO title="Login"/>
                <Row
                    style={{
                        height: '100vh',
                        justifyContent: 'center',
                        alignItems: 'center',
                        marginRight: "0px"
                    }}>
                    <Col md={6} lg={4}>
                        <div>
                            <AuthForm/>
                        </div>
                    </Col>
                </Row>
            </div>
        )
    }
}


export default Login
