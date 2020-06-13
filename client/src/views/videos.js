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
import {faEdit} from '@fortawesome/free-regular-svg-icons'
import {FontAwesomeIcon} from '@fortawesome/react-fontawesome'
import axios from 'axios';
import PageTitle from "../components/admin/PageTitle";
import {clean} from "../utils/clean"

class Videos extends React.Component {
    constructor(props) {
        super(props);

        this.state = {
            videos: [],
        };
    }

    componentDidMount() {
        axios({
            method: "GET",
            url: "http://localhost:8080/videos.php",
        }).then((response) => {
            if (response.data) {
                this.setState({videos: response.data.data})
            }
        })
    }

    redirectWP = () => {
        axios({
            method: "POST",
            url: "http://localhost:9090/wp_post_login.php",
            data: {username: "admin", action: "wp_login"},
            withCredentials: true
        }).then((response) => {
            if (response.data.state === 200) {
                const a = document.createElement("a");
                a.href = "http://localhost:9090/wp-admin/edit.php";
                a.target = "_blank";
                a.click();
            } else {
                console.log("Failed.")
            }
        })
    }

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
                            onClick={this.redirectWP}
                    >Add Video</Button>
                </Row>
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
                                            <td>{video.title}</td>
                                            <td>{video.raw_url && video.raw_url}</td>
                                            <td>
                                                <Button className="btn-table" theme="white">
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
