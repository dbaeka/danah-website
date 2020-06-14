/* eslint jsx-a11y/anchor-is-valid: 0 */

import React from "react";
import {
    Container,
    Row,
    Col,
    Card,
    CardBody,
    CardHeader,
    Button
} from "shards-react";

import axios from 'axios';
import PageTitle from "../components/admin/PageTitle";
import SuccessNotificationModal from "../components/admin/SuccessNotificationModal";
import ModalVideo from "../components/admin/ModalVideo";
import Store from "../flux/store";
import {Actions} from "../flux";

class Videos extends React.Component {
    constructor(props) {
        super(props);
        this.child = React.createRef();
        this.state = {
            videos: Store.getVideos(),
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
        Actions.getVideos();
    }

    onChange() {
        this.setState({
            ...this.state,
            videos: Store.getVideos(),
        });
    }

    redirectWP = () => {
        axios({
            method: "POST",
            url: "",
            data: {username: "admin", action: "wp_login"},
            withCredentials: true
        }).then((response) => {
            if (response.data.state === 200) {
                const a = document.createElement("a");
                a.href = "";
                a.target = "_blank";
                a.click();
            } else {
                console.log("Failed.")
            }
        })
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
            videos,
        } = this.state;

        return (
            <Container fluid className="main-content-container px-4">
                {/* Page Header */}
                <Row noGutters className="shard-page-header py-4" style={{justifyContent: "space-between"}}>
                    <PageTitle sm="4" title="Videos" subtitle="Add/Edit" className="text-sm-left"/>
                    <Button size="sm"
                            onClick={() => {
                                this.setState({isEdit: false});
                                this.toggleModal("addModal");
                            }}
                    >
                        Add Video
                    </Button>
                </Row>
                <ModalVideo
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
                                <h6 className="m-0">Active Users</h6>
                            </CardHeader>
                            <CardBody className="p-0 pb-3">
                                <table className="table mb-0">
                                    <thead className="bg-light">
                                    <tr>
                                        <th scope="col" className="border-0">
                                            #
                                        </th>
                                        <th scope="col" className="border-0"
                                            style={{width: "100px"}}
                                        >
                                        </th>
                                        <th scope="col" className="border-0">
                                            Title
                                        </th>
                                        <th scope="col" className="border-0">
                                            Link
                                        </th>
                                        <th scope="col" className="border-0"
                                            style={{width: "50px"}}
                                        >
                                        </th>
                                    </tr>
                                    </thead>
                                    <tbody>
                                    {videos && videos.map((video, idx) => (
                                        <tr key={idx}>
                                            <td>{idx + 1}</td>
                                            <td>
                                                <a href={video.raw_url && video.raw_url}
                                                   target="_blank">
                                                    <img
                                                        src={video.thumb_url && video.thumb_url}
                                                    />
                                                </a>
                                            </td>
                                            <td
                                            >
                                                <a href={video.raw_url && video.raw_url}
                                                   target="_blank">{video.title}</a>
                                            </td>
                                            <td>{video.raw_url && video.raw_url}</td>
                                            <td>
                                                <Button className="btn-table" theme="white"
                                                        onClick={() => {
                                                            this.setState({
                                                                isEdit: true,
                                                            });
                                                            this.setChildData(true, videos[idx])
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

export default Videos;
