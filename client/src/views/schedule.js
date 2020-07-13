/* eslint jsx-a11y/anchor-is-valid: 0 */

import React from "react";
import {
    Container,
    Row,
    Col,
    Card,
    CardBody,
    CardFooter,
    Button, CardHeader
} from "shards-react";
import PageTitle from "../components/admin/PageTitle";
import Store from "../flux/store";
import {Actions} from "../flux";
import ModalEvent from "../components/admin/ModalEvent";
import SuccessNotificationModal from "../components/admin/SuccessNotificationModal";

class Schedule extends React.Component {
    constructor(props) {
        super(props);
        this.child = React.createRef();
        this.state = {
            events: Store.getEvents(),
            isEdit: false,
        };

        this.onChange = this.onChange.bind(this);

    }

    componentWillMount() {
        Store.addChangeListener(this.onChange);
    }

    componentWillUnmount() {
        Store.removeChangeListener(this.onChange);
    }

    componentDidMount() {
        Actions.getEvents();
    }

    onChange() {
        this.setState({
            ...this.state,
            events: Store.getEvents(),
        });
    }

    toggleModal = state => {
        this.setState({
            [state]: !this.state[state]
        });
    };

    myCallBack = (data, showNotif) => {
        this.toggleModal(data);
        if (showNotif)
            alert("Updated Successfully")
        // this.successmodal.toggleModal("notificationModal");
    };

    setChildData = (edit, data) => {
        this.child.current.editData(edit, data);
    };

    render() {
        const {
            events,
        } = this.state;

        return (
            <Container fluid className="main-content-container px-4">
                {/* Page Header */}
                <Row noGutters className="shard-page-header py-4" style={{justifyContent: "space-between"}}>
                    <PageTitle sm="4" title="Events" subtitle="Add/Edit" className="text-sm-left"/>
                    <Button size="sm"
                            onClick={() => {
                                this.setState({isEdit: false});
                                this.toggleModal("addModal");
                            }}
                    >
                        Add Event
                    </Button>
                </Row>
                <ModalEvent
                    ref={this.child}
                    onExit={this.myCallBack}
                    edit={this.state.isEdit}
                    toggleState={this.state.addModal}/>
                <SuccessNotificationModal
                    onRef={ref => (this.successmodal = ref)}
                />
                <Row>
                    <Col>
                        <Card small className="mb-4">
                            <CardHeader className="border-bottom">
                                <h6 className="m-0">EVENTS LIST</h6>
                            </CardHeader>
                            <CardBody className="p-0 pb-3">
                                <table className="table mb-0">
                                    <thead className="bg-light">
                                    <tr>
                                        <th scope="col" className="border-0">
                                            #
                                        </th>
                                        <th scope="col" className="border-0"
                                            style={{minWidth: "220px"}}
                                        >
                                            Title
                                        </th>
                                        <th scope="col" className="border-0"
                                            style={{width: "220px"}}
                                        >
                                            Start
                                        </th>
                                        <th scope="col" className="border-0"
                                            style={{width: "220px"}}
                                        >
                                            End
                                        </th>
                                        <th scope="col" className="border-0"
                                            style={{width: "80px"}}
                                        >
                                            All Day
                                        </th>
                                        <th
                                            style={{width: "80px"}}
                                        >
                                        </th>
                                    </tr>
                                    </thead>
                                    <tbody>
                                    {events && events.map((event, idx) => (
                                        <tr key={idx}>
                                            <td>{idx + 1}</td>
                                            <td
                                            >
                                                {event.title}
                                            </td>
                                            <td>{event.start && new Date(event.start).toLocaleDateString("en-US", {
                                                year: 'numeric',
                                                month: 'long',
                                                day: 'numeric',
                                                hour: "numeric",
                                                minute: "numeric"
                                            })}</td>
                                            <td>
                                                {event.start && new Date(event.end).toLocaleDateString("en-US", {
                                                    year: 'numeric',
                                                    month: 'long',
                                                    day: 'numeric',
                                                    hour: "numeric",
                                                    minute: "numeric"
                                                })}
                                            </td>
                                            <td>{event.all_day === "1" ? "True" : "False"}</td>
                                            <td>
                                                <Button className="btn-table" theme="white"
                                                        onClick={() => {
                                                            this.setState({
                                                                isEdit: true,
                                                            });
                                                            this.setChildData(true, events[idx])
                                                            this.toggleModal("addModal");
                                                        }}
                                                >
                                            <span className="">
                                                <i className="material-icons">more_vert</i>
                                            </span>{" "}
                                                    Edit
                                                </Button>
                                            </td>
                                        </tr>
                                    ))}
                                    </tbody>
                                </table>
                            </CardBody>
                        </Card>
                    </Col>
                </Row>
            </Container>
        );
    }
}

export default Schedule;
