import React from "react";
import {
    Button,
    Modal,
    ModalBody,
    ModalHeader,
    Form,
    FormInput,
    FormRadio,
    FormGroup,
} from "shards-react";
import {Label} from "reactstrap";
import classnames from "classnames";
import validate from "../../utils/validate";
import {Actions} from "../../flux";
import DateTimePicker from 'react-datetime-picker';

export default class ModalEvent extends React.Component {

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
            start: {
                value: new Date(),
                valid: true,
                // validationRules: {
                //     isRequired: true
                // }
            },
            end: {
                value: new Date(new Date().setDate(new Date().getDate() + 1)),
                valid: true,
                // validationRules: {
                //     isRequired: true
                // }
            },
            all_day: {
                value: false,
                valid: true,
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
            start: {
                value: new Date(),
                valid: true,
                // validationRules: {
                //     isRequired: true
                // }
            },
            end: {
                value: new Date(new Date().setDate(new Date().getDate() + 1)),
                valid: true,
                // validationRules: {
                //     isRequired: true
                // }
            },
            all_day: {
                value: false,
                valid: true,
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

        if (name === "title") {
            updatedFormElement.valid = validate(value, updatedFormElement.validationRules);
        }

        updatedControls[name] = updatedFormElement;

        const {title} = this.state.formControls;
        const validated = title.valid;


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

        let formData = {};
        for (let formElementId in this.state.formControls) {
            formData[formElementId] = this.state.formControls[formElementId].value;
        }
        if (typeof formData.start === "object") {
            formData.start = formData.start.toISOString().slice(0, 19).replace('T', ' ');
            formData.end = formData.end.toISOString().slice(0, 19).replace('T', ' ');
        }

        if (this.state.edit) {
            formData["id"] = this.state.id;
            Actions.editEvent(formData);
        } else
            Actions.addEvent(formData);
        this.resetState(true)
    };

    handleDelete = () => {
        Actions.deleteEvent(this.state.id);
        this.resetState(true)
    }

    editData = (edit, data) => {
        if (edit) {
            const updatedControls = {
                ...this.state.formControls
            };
            let {title, end, start, all_day} = updatedControls;
            title.value = data.title;
            end.value = new Date(data.end);
            start.value = new Date(data.start);
            for (let inputIdentifier in updatedControls) {
                const temp = updatedControls[inputIdentifier];
                updatedControls[inputIdentifier].valid = validate(temp.value, temp.validationRules);
            }
            let formIsValid = start.valid && title.valid && end.valid && all_day.valid;
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
                        {(edit) ? "Edit Event" : "Add Evennt"}
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
                                    placeholder="Event Title"
                                    type="text"
                                    name="title"
                                    onChange={this.handleChange}
                                    value={this.state.formControls.title.value}
                                    onFocus={e => this.setState({titleFocused: true})}
                                    onBlur={e => this.setState({titleFocused: false})}
                                    valid={this.state.formControls.title.valid}
                                />
                            </FormGroup>
                            <FormGroup>
                                <Label for="start">Start Date</Label>
                                <br/>
                                <DateTimePicker
                                    value={this.state.formControls.start.value}
                                    name="start"
                                    onChange={(value) => this.handleChange({target: {name: "start", value: value}})}
                                />
                            </FormGroup>
                            <FormGroup>
                                <Label for="start">End Date</Label>
                                <br/>
                                <DateTimePicker
                                    value={this.state.formControls.end.value}
                                    name="end"
                                    onChange={(value) => this.handleChange({target: {name: "end", value: value}})}
                                />
                            </FormGroup>
                            <FormGroup
                            >
                                <Label for="all_day">Is Event All Day</Label>
                                <br/>
                                <FormRadio
                                    inline
                                    name="all_day"
                                    checked={(this.state.formControls.all_day.value === true)}
                                    onChange={() => this.handleChange({target: {name: "all_day", value: true}})}
                                >
                                    True
                                </FormRadio>
                                <FormRadio
                                    inline
                                    name="all_day"
                                    checked={(this.state.formControls.all_day.value === false)}
                                    onChange={() => this.handleChange({target: {name: "all_day", value: false}})}
                                >
                                    False
                                </FormRadio>
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