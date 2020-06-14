import React from "react";
import {
    Button,
    Modal,
    ModalBody,
    ModalHeader,
    Form,
    FormInput,
    FormGroup,
} from "shards-react";
import {Label} from "reactstrap";
import classnames from "classnames";
import axios from 'axios';
import lodash from 'lodash'
import validate from "../../utils/validate";
import {Actions} from "../../flux";
// import {devURL} from "../../utils/urls";

export default class ModalVideo extends React.Component {

    state = {
        formIsValid: false,
        validateValid: false,
        id: null,
        edit: false,
        formControls: {
            title: {
                value: '',
                valid: false,
                validationRules: {
                    isRequired: true
                }
            },
            video_url: {
                value: '',
                valid: false,
                validationRules: {
                    isRequired: true
                }
            },
            thumb_url: {
                value: '',
                valid: false,
                validationRules: {
                    isRequired: true
                }
            },
        }
    };

    resetState = (success) => {
        const formIsValid = false;
        const formControls = {
            title: {
                value: '',
                valid: false,
                validationRules: {
                    isRequired: true
                }
            },
            video_url: {
                value: '',
                valid: false,
                validationRules: {
                    isRequired: true
                }
            },
            thumb_url: {
                value: '',
                valid: false,
                validationRules: {
                    isRequired: true
                }
            },
        };
        this.setState({
            formControls: formControls,
            validateValid: false,
            formIsValid: formIsValid,
            id: null,
            edit: false
        });
        this.props.onExit("addModal", success);
    };

    handleChange = event => {
        const name = event.target.name;
        const value = event.target.value;

        const updatedControls = {
            ...this.state.formControls
        };
        const updatedFormElement = {
            ...updatedControls[name]
        };
        updatedFormElement.value = value;
        updatedFormElement.valid = validate(value, updatedFormElement.validationRules);

        updatedControls[name] = updatedFormElement;

        const {title, video_url, thumb_url} = this.state.formControls;
        const validated = video_url.valid && title.valid && thumb_url.valid;


        let formIsValid = validated;
        for (let inputIdentifier in updatedControls) {
            formIsValid = updatedControls[inputIdentifier].valid && formIsValid && this.state;
        }
        this.setState({
            formControls: updatedControls,
            formIsValid: formIsValid,
            validateValid: validated
        });
    };


    handleSubmit = event => {
        event.preventDefault();

        const formData = {};
        for (let formElementId in this.state.formControls) {
            formData[formElementId] = this.state.formControls[formElementId].value;
        }

        if (this.state.edit) {
            formData["id"] = this.state.id;
            Actions.editVideo(formData);
        } else
            Actions.addVideo(formData);
        this.resetState(true)
    };

    handleDelete = () => {
        Actions.deleteVideo(this.state.id);
        this.resetState(true)
    }

    editData = (edit, data) => {
        if (edit) {
            const updatedControls = {
                ...this.state.formControls
            };
            let {title, video_url, thumb_url} = updatedControls;
            title.value = data.title;
            video_url.value = data.raw_url;
            thumb_url.value = data.thumb_url;
            for (let inputIdentifier in updatedControls) {
                const temp = updatedControls[inputIdentifier];
                console.log(temp)
                updatedControls[inputIdentifier].valid = validate(temp.value, temp.validationRules);
                console.log( updatedControls[inputIdentifier].valid)
            }
            console.log(updatedControls)
            let formIsValid = video_url.valid && title.valid && thumb_url.valid;
            this.setState({id: data.id, edit: edit, formIsValid: formIsValid, formControls: updatedControls});
        } else
            this.resetState(false);
    }

    render() {
        const {edit} = this.props;
        return (
            <div>
                <Modal
                    open={this.props.toggleState}
                    size="md"
                    toggle={() => this.props.onExit("addModal", false)}
                >
                    <ModalHeader className="border-0 m-auto">
                        {(edit) ? "Edit Video" : "Add Video"}
                    </ModalHeader>
                    <ModalBody className="border-top">
                        <Form role="form">
                            <FormGroup
                                className={classnames("mb-3", {
                                    focused: this.state.titleFocused
                                })}
                            >
                                <Label for="title">Title</Label>
                                <FormInput
                                    placeholder="Video Title"
                                    type="text"
                                    name="title"
                                    onChange={this.handleChange}
                                    value={this.state.formControls.title.value}
                                    onFocus={e => this.setState({titleFocused: true})}
                                    onBlur={e => this.setState({titleFocused: false})}
                                    valid={this.state.formControls.title.valid}
                                />
                            </FormGroup>
                            <FormGroup
                                className={classnames("mb-3", {
                                    focused: this.state.vURLFocused
                                })}
                            >
                                <Label for="video_url">Video URL</Label>
                                <FormInput
                                    placeholder="Video URL"
                                    type="url"
                                    name="video_url"
                                    onChange={this.handleChange}
                                    value={this.state.formControls.video_url.value}
                                    onFocus={e => this.setState({vURLFocused: true})}
                                    onBlur={e => this.setState({vURLFocused: false})}
                                    valid={this.state.formControls.video_url.valid}
                                />
                            </FormGroup>
                            <FormGroup
                                className={classnames("mb-3", {
                                    focused: this.state.tURLFocused
                                })}
                            >
                                <Label for="thumb_url">Thumbnail URL</Label>
                                <FormInput
                                    placeholder="Thumbnail URL"
                                    type="url"
                                    name="thumb_url"
                                    onChange={this.handleChange}
                                    value={this.state.formControls.thumb_url.value}
                                    onFocus={e => this.setState({tURLFocused: true})}
                                    onBlur={e => this.setState({tURLFocused: false})}
                                    valid={this.state.formControls.thumb_url.valid}
                                />
                            </FormGroup>
                            <div className="text-right">
                                <Button className="my-4 mr-2" theme="secondary" type="button"
                                        onClick={() => {
                                            this.resetState(false)
                                        }}
                                >
                                    Cancel
                                </Button>
                                {(edit) ? <Button id="send" className="my-4"
                                                  onClick={this.handleDelete} theme="danger"
                                                  type="button">
                                    Delete
                                </Button> : ""
                                }
                                <Button id="send" className="my-4" disabled={!this.state.formIsValid}
                                        onClick={this.handleSubmit} color="primary"
                                        type="button">
                                    Save
                                </Button>
                            </div>
                        </Form>
                    </ModalBody>
                </Modal>
            </div>
        );
    }
}