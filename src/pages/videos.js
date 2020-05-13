import React from "react"
import {Link} from "gatsby"

import SEO from "../components/seo"
import VideoList from '../components/video_list'
import VideoDetail from '../components/video_detail';
import DefaultLayout from "../layout/default";
import {Container, Button, UncontrolledTooltip, Nav, NavItem, Col, NavLink, TabContent, Row, TabPane,} from "reactstrap"
import SecondaryHeader from "../components/secondaryheader";
import NormalHeader from "../components/normalheader";


class Videos extends React.Component {
    constructor(props) {
        super(props);

        this.state = {
            videos: [],
            selectedVideo: null
        };
    }

    render() {
        return (
            <DefaultLayout>
                <SEO title="Videos"/>
                {/*<NormalHeader title="Videos"/>*/}
                <div className="subpage">
                    <div className="section">
                        <Container>
                            <h3 className="title">Videos</h3>
                            <VideoDetail video={this.state.selectedVideo}/>
                            <VideoList
                                onVideoSelect={userSelected => this.setState({selectedVideo: userSelected})}
                                videos={this.state.videos}/>
                        </Container>
                    </div>
                </div>
            </DefaultLayout>
        )
    }
};
export default Videos
