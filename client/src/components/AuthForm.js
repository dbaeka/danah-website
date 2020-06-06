import PropTypes from 'prop-types';
import React from 'react';
import {Button, Form, FormGroup, Input} from 'reactstrap';
import validate from "../utils/validate";
import classnames from "classnames";

class AuthForm extends React.Component {

    state = {
        formIsValid: false,
        formControls: {
            username: {
                value: '',
                valid: false,
                validationRules: {
                    minLength: 2,
                    isRequired: true
                }
            },
            password: {
                value: '',
                valid: false,
                validationRules: {
                    minLength: 6,
                    isRequired: true
                }
            },
        }
    };

    resetState = () => {
        const formIsValid = false;
        const formControls = {
            username: {
                value: '',
                valid: false,
                validationRules: {
                    minLength: 2,
                    isRequired: true
                }
            },
            password: {
                value: '',
                valid: false,
                validationRules: {
                    minLength: 6,
                    isRequired: true
                }
            },
        };
        this.setState({
            formControls: formControls,
            formIsValid: formIsValid
        });
    };


    handleSubmit = event => {
        event.preventDefault();

        // let all_filled = true;
        // $("input[required]").each(function () {
        //     if ($(this).val() == "") {
        //         $(this).parent().css("border", "1px solid red");
        //         all_filled = all_filled && false;
        //     }
        // });
        //
        // if (all_filled == false) {
        //     $("#action-feedback").html('');
        //     return;
        // }
        //
        // const formData = {};
        // for (let formElementId in this.state.formControls) {
        //     formData[formElementId] = this.state.formControls[formElementId].value;
        // }
        //
        // if (this.isSignUp) {
        //     if ($("#password").val() != $("#repassword").val() && this.isSignUp) {
        //         $("#action-feedback").html('Passwords do not match');
        //         return;
        //     }
        //
        //     if (!this.state.formControls.password.valid && !this.state.formControls.repassword.valid) {
        //         $("#action-feedback").html('Passwords too short!');
        //         return;
        //     }
        //
        //     formData.priority = env.DEFAULT_PRIORITY;
        //     formData.company_name = '';
        // }
        //
        // const endpoint = (this.isLogin) ? '/api/users/login/' : '/api/users/register/';
        // const requestURL = devURL + endpoint;
        // request(requestURL, {method: 'POST', body: formData})
        //     .then((response) => {
        //         auth.setToken(response.token, true);
        //         auth.setUserInfo(response.userInfo, true);
        //         //Load dashboard data:- resource list, total contribution (cost and power), total resource usage (usage use + hosts number, idle, vms)
        //         this.redirectUser();
        //     }).catch((err) => {
        //     console.log(err);
        // });
    };

    redirectUser = () => {
        this.props.history.push("/")
    };

    handleChange = event => {
        const name = event.target.name;
        let value = event.target.value;

        const updatedControls = {
            ...this.state.formControls
        };
        const updatedFormElement = {
            ...updatedControls[name]
        };

        updatedFormElement.value = value;
        updatedFormElement.valid = validate(value, updatedFormElement.validationRules);

        updatedControls[name] = updatedFormElement;

        let formIsValid = true;
        for (let inputIdentifier in updatedControls) {
            formIsValid = updatedControls[inputIdentifier].valid && formIsValid;
        }

        this.setState({
            formControls: updatedControls,
            formIsValid: formIsValid
        });
    };

    render() {
        const {
            usernameInputProps,
            passwordInputProps,
        } = this.props;

        return (
            <Form onSubmit={this.handleSubmit}>
                <FormGroup className={classnames({
                    focused: this.state.usernameFocused
                })}>
                    <Input
                        onChange={this.handleChange}
                        value={this.state.formControls.username.value}
                        onFocus={() => this.setState({usernameFocused: true})}
                        onBlur={() => this.setState({usernameFocused: false})}
                        required
                        {...usernameInputProps} />
                </FormGroup>
                <FormGroup className={classnames({
                    focused: this.state.passwordFocused
                })}>
                    <Input
                        onChange={this.handleChange}
                        value={this.state.formControls.password.value}
                        onFocus={() => this.setState({passwordFocused: true})}
                        onBlur={() => this.setState({passwordFocused: false})}
                        required
                        {...passwordInputProps} />
                </FormGroup>
                <Button
                    size="lg"
                    className="bg-dark border-0"
                    block
                    id="send"
                    onClick={this.handleSubmit}>
                    Login
                </Button>
                <span id="action-feedback" className="text-danger"></span>
            </Form>
        );
    }
}


AuthForm.propTypes = {
    usernameLabel: PropTypes.string,
    usernameInputProps: PropTypes.object,
    passwordLabel: PropTypes.string,
    passwordInputProps: PropTypes.object,
};

AuthForm.defaultProps = {
    usernameLabel: 'Username',
    usernameInputProps: {
        name: 'username',
        id: 'username',
        type: 'text',
        placeholder: 'username',
    },
    passwordLabel: 'Password',
    passwordInputProps: {
        name: 'password',
        id: 'password',
        autoComplete: 'off',
        type: 'password',
        placeholder: 'password',
    },
};

export default AuthForm;
