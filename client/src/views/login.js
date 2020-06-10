import React from "react"
import {navigate} from "gatsby"
import {handleLogin, isLoggedIn} from "../services/auth"
import SEO from "../components/seo";
import {Col, Row, Form, Input, FormGroup, Button} from 'reactstrap';

class Login extends React.Component {
    state = {
        username: ``,
        password: ``,
        status: ``,
    }

    handleUpdate = event => {
        this.setState({
            [event.target.name]: event.target.value,
        })
    }

    handleSubmit = event => {
        event.preventDefault()
        handleLogin(this.state).then(
            (response) => {
                if (response !== false) {
                    navigate(`/admin/`)
                } else {
                    this.setState({
                        ...this.state,
                        status: "Incorrect credentials"
                    })
                }
            }
        )
    }

    render() {
        if (isLoggedIn()) {
            navigate(`/admin/`)
        }

        return (
            <div className="bg-primary">
                <SEO title="Login"/>
                <Row
                    className="mx-0"
                    style={{
                        height: '100vh',
                        justifyContent: 'center',
                        alignItems: 'center',
                        marginRight: "0px"
                    }}
                >
                    <Col md={6} lg={4} className="px-5 px-md-0">
                        <Form
                            className=""
                            method="post"
                            onSubmit={event => {
                                this.handleSubmit(event)
                            }}
                        >
                            <FormGroup>
                                <Input
                                    onChange={this.handleUpdate}
                                    type="text"
                                    name="username"
                                    placeholder="Username"
                                    required
                                />
                            </FormGroup>
                            <FormGroup>
                                <Input
                                    onChange={this.handleUpdate}
                                    type="password"
                                    name="password"
                                    placeholder="Password"
                                    required
                                />
                            </FormGroup>
                            <Button
                                size="lg"
                                className="bg-dark border-0"
                                block
                            >
                                Log In
                            </Button>
                            <div id="action-feedback"
                                 className="mt-3 bg-white font-weight-bold text-danger">
                                {this.state.status}
                            </div>
                        </Form>
                    </Col>
                </Row>
            </div>
        )
    }
}

export default Login